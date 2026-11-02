"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Aperture, Menu, X } from 'lucide-react';
import { navLinks } from '@/constants';
export default function MobileNav(){const path=usePathname();const[open,setOpen]=useState(false);return <header className="header"><Link href="/landingPage" className="wordmark"><Aperture/> artify®</Link><button aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>{open&&<nav className="mobile-menu">{[{label:'Image editor',route:'/studio'},...navLinks.filter(l=>!l.route.endsWith('/video') && !(path === '/studio' && l.route === '/'))].map(l=><Link onClick={()=>setOpen(false)} key={l.route} href={l.route}>{l.label}</Link>)}</nav>}</header>}
