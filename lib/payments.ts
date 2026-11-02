import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/database/mongoose';
import User from '@/lib/database/models/user.model';
import { plans } from '@/constants';
export async function fulfillCheckout(session:Stripe.Checkout.Session){
 if(session.payment_status!=='paid')return;
 const plan=plans.find(p=>p.price>0&&p.name===session.metadata?.plan);
 const buyerId=session.metadata?.buyerId;
 if(!plan||!buyerId||! /^[a-f\d]{24}$/i.test(buyerId)||session.amount_total!==plan.price*100||session.currency!=='usd')throw new Error('Invalid checkout');
 await connectToDatabase();
 const result=await User.updateOne({_id:buyerId,fulfilledCheckouts:{$ne:session.id}},{$inc:{creditBalance:plan.credits},$addToSet:{fulfilledCheckouts:session.id}});
 if(!result.matchedCount && !(await User.exists({_id:buyerId})))throw new Error('Buyer unavailable');
}
