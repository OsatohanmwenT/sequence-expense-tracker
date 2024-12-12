import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/app/providers";

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
    {
      path: './fonts/workSans/WorkSans-Thin.ttf',
      weight: "200",
      style: "normal"
    },
    {
      path: './fonts/workSans/WorkSans-ExtraLight.ttf',
      weight: "100",
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
      path: './fonts/Inter_18pt-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: './fonts/Inter_24pt-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
    // Bold
    {
      path: './fonts/Inter_18pt-Bold.ttf',
      style: 'normal',
      weight: '700',
    },
    {
      path: './fonts/Inter_24pt-Bold.ttf',
      style: 'normal',
      weight: '700',
    },

    // SemiBold
    {
      path: './fonts/Inter_18pt-SemiBold.ttf',
      style: 'normal',
      weight: '600',
    },
    {
      path: './fonts/Inter_24pt-SemiBold.ttf',
      style: 'normal',
      weight: '600',
    },

    // Light
    {
      path: './fonts/Inter_18pt-Light.ttf',
      style: 'normal',
      weight: '300',
    },
    {
      path: './fonts/Inter_24pt-Light.ttf',
      style: 'normal',
      weight: '300',
    },

    // ExtraLight
    {
      path: './fonts/Inter_18pt-ExtraLight.ttf',
      style: 'normal',
      weight: '200',
    },
    {
      path: './fonts/Inter_24pt-ExtraLight.ttf',
      style: 'normal',
      weight: '200',
    },

    // Thin
    {
      path: './fonts/Inter_18pt-Thin.ttf',
      style: 'normal',
      weight: '100',
    },
    {
      path: './fonts/Inter_24pt-Thin.ttf',
      style: 'normal',
      weight: '100',
    },

    // Black
    {
      path: './fonts/Inter_18pt-Black.ttf',
      style: 'normal',
      weight: '900',
    },
    {
      path: './fonts/Inter_24pt-Black.ttf',
      style: 'normal',
      weight: '900',
    },
  ],
  variable: '--font-inter',
});



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      </body>
    </html>
  );
}
