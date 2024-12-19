import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/app/providers";
import {Toaster} from "@/components/ui/toaster";

const workSans = localFont({
  src: [
    {
      path: './fonts/workSans/WorkSans-Black.ttf',
      weight: "900",
      style: "normal"
    },
    {
      path: './fonts/workSans/WorkSans-ExtraBold.ttf',
      weight: "800",
      style: "normal"
    },
    {
      path: './fonts/workSans/WorkSans-Bold.ttf',
      weight: "700",
      style: "normal"
    },
    {
      path: './fonts/workSans/WorkSans-SemiBold.ttf',
      weight: "600",
      style: "normal"
    },
    {
      path: './fonts/workSans/WorkSans-Medium.ttf',
      weight: "500",
      style: "normal"
    },
    {
      path: './fonts/workSans/WorkSans-Regular.ttf',
      weight: "400",
      style: "normal"
    },
  ],
  variable: '--font-work-sans',
})

const helvetica = localFont({
  src: [
    {
      path: './fonts/Helvetica/Helvetica.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: './fonts/Helvetica/Helvetica-Bold.ttf',
      style: "normal",
      weight: "700"
    }
  ],
  variable: '--font-helvetica',
})

const inter = localFont({
  src: [
    // Regular
    {
      path: './fonts/Inter_18pt-Medium.ttf',
      style: 'normal',
      weight: '400',
    },
    // Bold
    {
      path: './fonts/Inter_18pt-Bold.ttf',
      style: 'normal',
      weight: '700',
    },

    // SemiBold
    {
      path: './fonts/Inter_18pt-SemiBold.ttf',
      style: 'normal',
      weight: '600',
    },
  ],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Sequence",
  description: "Finance management solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helvetica.variable} ${workSans.variable} ${inter.variable}`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
