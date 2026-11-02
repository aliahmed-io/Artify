"use server";
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { plans } from '@/constants';
import { getOrCreateUserByClerkId } from './user.actions';
import { fulfillCheckout } from '@/lib/payments';
export async function checkoutCredits(transaction:CheckoutTransactionParams){
 const {userId}=await auth();if(!userId)throw new Error('Sign in to buy credits.');
 const plan=plans.find(p=>p.name===transaction.plan&&p.price>0);if(!plan)throw new Error('Choose a valid credit package.');
 if(!process.env.STRIPE_SECRET_KEY||!process.env.NEXT_PUBLIC_SERVER_URL||!process.env.STRIPE_WEBHOOK_SECRET)throw new Error('Credit checkout is not configured yet. Please try again later.');
 const user=await getOrCreateUserByClerkId(userId),stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
 const session=await stripe.checkout.sessions.create({line_items:[{price_data:{currency:'usd',unit_amount:plan.price*100,product_data:{name:plan.name}},quantity:1}],metadata:{plan:plan.name,buyerId:String(user._id)},mode:'payment',success_url:`${process.env.NEXT_PUBLIC_SERVER_URL}/profile?success=true`,cancel_url:`${process.env.NEXT_PUBLIC_SERVER_URL}/credits?canceled=true`});
 redirect(session.url!);
}
export async function createTransaction(transaction:CreateTransactionParams){
 const {userId}=await auth();if(!userId||!process.env.STRIPE_SECRET_KEY)throw new Error('Unauthorized');
 const user=await getOrCreateUserByClerkId(userId),stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
 const session=await stripe.checkout.sessions.retrieve(transaction.stripeId);
 if(session.metadata?.buyerId!==String(user._id))throw new Error('Unauthorized');
 await fulfillCheckout(session);return {success:session.payment_status==='paid'};
}
