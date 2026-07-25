"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Activity, 
  DollarSign, 
  Settings, 
  FileText, 
  HelpCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchQuery(window.location.search)
      
      // Listen to popstate or navigation events
      const handleLocationChange = () => {
        setSearchQuery(window.location.search)
      }
      window.addEventListener("popstate", handleLocationChange)
      return () => window.removeEventListener("popstate", handleLocationChange)
    }
  }, [pathname])

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      isActive: pathname === "/" && !searchQuery.includes("tab=settings")
    },
    {
      label: "Telemetry",
      href: "/telemetry",
      icon: Activity,
      isActive: pathname === "/telemetry"
    },
    {
      label: "Billing",
      href: "/billing",
      icon: DollarSign,
      isActive: pathname === "/billing"
    },
    {
      label: "Settings",
      href: "/?tab=settings",
      icon: Settings,
      isActive: pathname === "/" && searchQuery.includes("tab=settings")
    }
  ]

  return (
    <aside className="w-64 bg-[#0b1326] border-r border-border/40 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6 flex flex-col gap-1 border-b border-border/10">
        <h1 className="text-xl font-bold tracking-tighter text-primary leading-none">Aigentic Factory</h1>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Autonomous v2.4</span>
      </div>

      <nav className="flex-grow p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                // Manually trigger location change state update for same-page query param navigation
                if (item.href.startsWith("/?")) {
                  setTimeout(() => setSearchQuery(item.href.substring(1)), 50)
                } else if (item.href === "/") {
                  setTimeout(() => setSearchQuery(""), 50)
                }
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200",
                item.isActive 
                  ? "text-primary font-bold bg-primary/10 border-r-2 border-primary" 
                  : "text-muted-foreground hover:bg-surface-bright/20 hover:text-primary"
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border/10 flex flex-col gap-1">
        <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs text-muted-foreground hover:text-primary transition-colors">
          <FileText className="size-3.5" />
          <span>Documentation</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs text-muted-foreground hover:text-primary transition-colors">
          <HelpCircle className="size-3.5" />
          <span>Support</span>
        </Link>
      </div>
    </aside>
  )
}
