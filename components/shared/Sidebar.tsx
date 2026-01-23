"use client"

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Grouped navigation structure
const navGroups = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Image Tools",
    items: [
      { label: "Image Restore", route: "/transformations/add/restore" },
      { label: "Generative Fill", route: "/transformations/add/fill" },
      { label: "Object Remove", route: "/transformations/add/remove" },
      { label: "Object Recolor", route: "/transformations/add/recolor" },
      { label: "Background Remove", route: "/transformations/add/removeBackground" },
      { label: "Image Upscaling", route: "/transformations/add/upscale" },
    ],
  },
  {
    label: "AI Generation",
    items: [
      { label: "Image Generation", route: "/transformations/add/generation" },
      { label: "Video Generation", route: "/transformations/add/video" },
    ],
  },
];

const bottomLinks = [
  { label: "Profile", route: "/profile" },
  { label: "Buy Credits", route: "/credits" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const handleGroupHover = (label: string) => {
    setOpenGroup(label);
  };

  const handleGroupLeave = () => {
    setOpenGroup(null);
  };

  const isGroupActive = (items: { route: string }[]) => {
    return items.some(item => item.route === pathname);
  };

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image src="/assets/images/artify-logo.png" alt="logo" width={120} height={32} className="object-contain" />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {/* Home Link */}
              <li className={`sidebar-nav_element ${pathname === '/' ? 'bg-crimson-gradient text-white' : 'text-gray-700'}`}>
                <Link className="sidebar-link" href="/">
                  Home
                </Link>
              </li>

              {/* Grouped Navigation */}
              {navGroups.slice(1).map((group) => (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => handleGroupHover(group.label)}
                  onMouseLeave={handleGroupLeave}
                >
                  <div className={`sidebar-nav_element cursor-pointer ${isGroupActive(group.items || []) ? 'bg-crimson-gradient text-white' : 'text-gray-700'}`}>
                    <span className="sidebar-link flex items-center justify-between w-full">
                      {group.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${openGroup === group.label ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </div>

                  {/* Dropdown */}
                  {openGroup === group.label && group.items && (
                    <ul className="absolute left-full top-0 ml-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-left-2 duration-200">
                      {group.items.map((item) => (
                        <li key={item.route}>
                          <Link
                            href={item.route}
                            className={`block px-4 py-2.5 text-sm transition-colors ${pathname === item.route ? 'bg-crimson-100 text-crimson-600 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Bottom Links */}
            <ul className="sidebar-nav_elements">
              {bottomLinks.map((link) => (
                <li
                  key={link.route}
                  className={`sidebar-nav_element ${pathname === link.route ? 'bg-crimson-gradient text-white' : 'text-gray-700'}`}
                >
                  <Link className="sidebar-link" href={link.route}>
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl='/' showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-crimson-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar