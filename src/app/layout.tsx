"use client"; // Make this a Client Component

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clientReady, setClientReady] = useState(false);

  // Only apply dynamic classes after hydration
  useEffect(() => {
    setClientReady(true);
  }, []);

  return (
    <html lang="en">
      <body
        className={
          clientReady
            ? `${geistSans.variable} ${geistMono.variable} antialiased`
            : "antialiased" // fallback for SSR
        }
      >
        {children}
      </body>
    </html>
  );
}
