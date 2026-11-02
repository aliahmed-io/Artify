"use client";
import { useState } from 'react';
import { toast } from 'sonner';
import { checkoutCredits } from '@/lib/actions/transaction.action';
import { Button } from '../ui/button';
export default function Checkout(props:{plan:string;amount:number;credits:number;buyerId:string}){const[busy,setBusy]=useState(false);return <form onSubmit={async e=>{e.preventDefault();setBusy(true);try{await checkoutCredits(props);}catch(error){if(error instanceof Error&&error.message==='NEXT_REDIRECT')throw error;toast.error(error instanceof Error?error.message:'Checkout could not connect. Please try again.');setBusy(false);}}}><Button disabled={busy} type="submit" className="w-full bg-crimson-gradient">{busy?'Opening checkout…':'Buy credits'}</Button></form>}
