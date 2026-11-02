import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { fulfillCheckout } from '@/lib/payments';
export const runtime='nodejs';
export async function POST(req:Request){
 const key=process.env.STRIPE_SECRET_KEY,secret=process.env.STRIPE_WEBHOOK_SECRET;
 if(!key||!secret)return NextResponse.json({error:'Payments are not configured'},{status:503});
 const signature=req.headers.get('stripe-signature');if(!signature)return NextResponse.json({error:'Missing signature'},{status:400});
 const stripe=new Stripe(key);let event:Stripe.Event;
 try{event=stripe.webhooks.constructEvent(await req.text(),signature,secret);}catch{return NextResponse.json({error:'Invalid signature'},{status:400});}
 try{if(event.type==='checkout.session.completed'||event.type==='checkout.session.async_payment_succeeded')await fulfillCheckout(event.data.object as Stripe.Checkout.Session);return NextResponse.json({received:true});}catch{return NextResponse.json({error:'Fulfillment failed; please retry'},{status:500});}
}
