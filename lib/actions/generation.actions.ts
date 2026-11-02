"use server";
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/database/mongoose';
import User from '@/lib/database/models/user.model';
import { z } from 'zod';
const schema=z.object({prompt:z.string().trim().min(3).max(2000),aspectRatio:z.enum(['1:1','3:4','9:16']).default('1:1')});
export async function generateImage(input:unknown):Promise<{image?:string;error?:string}>{
 const {userId}=await auth();if(!userId)return {error:'Sign in to generate an image.'};
 const parsed=schema.safeParse(input);if(!parsed.success)return {error:'Enter a prompt between 3 and 2,000 characters and choose a supported size.'};
 const key=process.env.GEMINI_API_KEY;if(!key)return {error:'AI generation is not configured yet. The site owner needs to connect a Gemini API key. You can use the image editor in the meantime.'};
 await connectToDatabase();const user=await User.findOneAndUpdate({clerkId:userId,creditBalance:{$gte:1}},{$inc:{creditBalance:-1}},{new:true});if(!user)return {error:'You need at least one credit to generate an image.'};
 try{const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_IMAGE_MODEL||'gemini-2.5-flash-image'}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({contents:[{parts:[{text:parsed.data.prompt}]}],generationConfig:{responseModalities:['TEXT','IMAGE'],imageConfig:{aspectRatio:parsed.data.aspectRatio}}}),signal:AbortSignal.timeout(120000)});if(!response.ok)throw new Error('provider');const data=await response.json();const part=data.candidates?.[0]?.content?.parts?.find((p:{inlineData?:{mimeType:string;data:string}})=>p.inlineData?.mimeType?.startsWith('image/'));if(!part)throw new Error('empty');return {image:`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`};}catch{await User.updateOne({_id:user._id},{$inc:{creditBalance:1}});return {error:'The image could not be generated. Try a different prompt or try again later. Your credit was returned.'};}
}
