import type { Metadata } from "next";


import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";



export const metadata: Metadata = {
  title: "Artify",
  description: "Your creative space for AI images, restoration, and private image editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary: '#7346ed' }
    }}>
      <html lang="en">
        <body suppressHydrationWarning className="font-IBMPlex antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
