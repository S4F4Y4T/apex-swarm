"use client"

import React, { useEffect } from "react"
import Footer from "./Footer"
import { useHeaderContext, HeaderBadge } from "./HeaderContext"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  title?: React.ReactNode
  badge?: HeaderBadge
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
  const { setHeaderConfig } = useHeaderContext()

  useEffect(() => {
    setHeaderConfig({
      title,
      badge,
      showSearch,
      searchPlaceholder,
      onSearchChange,
      actions: headerActions
    })
    return () => {
      setHeaderConfig({})
    }
  }, [title, badge, showSearch, searchPlaceholder, onSearchChange, headerActions, setHeaderConfig])

  return (
    <div className={cn("min-h-screen text-foreground flex flex-col font-sans antialiased relative w-full", containerClassName)}>
      <main className={cn("p-6 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto flex-grow", className)}>
        {children}
      </main>
      <Footer {...footerProps} />
    </div>
  )
}

