"use client";
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import TitleContext from "@/components/hooks/nameContext";
import { useState } from "react";

const inter = Hanken_Grotesk({ weight: '400', subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [actualTitle, setTitle ] = useState("");

  return (
    <html lang="en">
      <TitleContext.Provider value={{actualTitle, setTitle}}>
        <body className={inter.className}>
          <div className="fixed flex text-2xl items-center z-50 md:text-7xl w-full bg-green-300 py-2">
            <Image src={'/logo.svg'} className="mx-5" alt="logo" width={100} height={100} />
            <div>EIBERTEK</div>
            <div className="fixed right-8 md:text-4xl capitalize">{actualTitle}</div>
          </div>
          {children}
        </body>
      </TitleContext.Provider>
    </html>
  );
}
