"use client";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Aperture, ArrowUpRight } from 'lucide-react';
import { navLinks } from '@/constants';
export default function Sidebar(){const path=usePathname();return <aside className="sidebar"><Link href="/landingPage" className="wordmark"><Aperture/> artify<span>®</span></Link><p className="sidebar-caption">Your creative space</p><nav className="studio-navigation">{[{label:'Image editor',route:'/studio'},...navLinks.filter(l=>!l.route.endsWith('/video') && !(path === '/studio' && l.route === '/'))].map(l=><Link aria-current={path===l.route?'page':undefined} key={l.route} href={l.route}>{l.label}<ArrowUpRight size={15}/></Link>)}</nav><div className="sidebar-account"><SignedIn><UserButton showName/></SignedIn><SignedOut><Link href="/sign-in" className="violet-button">Sign in <ArrowUpRight size={18}/></Link></SignedOut></div></aside>}
