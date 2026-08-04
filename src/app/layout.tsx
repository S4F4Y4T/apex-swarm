import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { HeaderProvider } from "@/components/HeaderContext";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic Software Factory",
  description: "Agentic Software Factory Dashboard - Built with Next.js, Tailwind, & Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground flex">
        <HeaderProvider>
          <Suspense fallback={<div className="w-64 bg-[#0b1326] border-r border-border/40" />}>
            <Sidebar />
          </Suspense>
          <div className="flex-grow ml-64 flex flex-col min-h-screen">
            <Suspense fallback={<div className="h-16 bg-[#0b1326]/80 border-b border-border/40 w-full" />}>
              <Header />
            </Suspense>
            {children}
          </div>
        </HeaderProvider>
      </body>
    </html>
  );
}

