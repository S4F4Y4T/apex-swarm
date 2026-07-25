"use client"

import React, { Suspense } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  title?: React.ReactNode
  badge?: {
    text: string
    variant?: "primary" | "secondary" | "tertiary" | "default" | "destructive"
  }
  showSearch?: boolean
  searchPlaceholder?: string
  onSearchChange?: (val: string) => void
  headerActions?: React.ReactNode
  footerProps?: {
    status?: string
    cluster?: string
    uptime?: string
    latency?: string | number
  }
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export default function PageLayout({
  title,
  badge,
  showSearch = false,
  searchPlaceholder,
  onSearchChange,
  headerActions,
  footerProps,
  children,
  className,
  containerClassName
}: PageLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground flex flex-col font-sans antialiased relative w-full", containerClassName)}>
      <Suspense fallback={<div className="h-16 bg-[#0b1326]/80 border-b border-border/40 w-full" />}>
        <Header 
          title={title} 
          badge={badge} 
          showSearch={showSearch} 
          searchPlaceholder={searchPlaceholder} 
          onSearchChange={onSearchChange} 
          actions={headerActions} 
        />
      </Suspense>
      <main className={cn("p-6 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto flex-grow", className)}>
        {children}
      </main>
      <Footer {...footerProps} />
    </div>
  )
}
