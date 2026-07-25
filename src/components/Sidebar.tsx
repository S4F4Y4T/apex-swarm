"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  DollarSign, 
  Settings, 
  FileText, 
  HelpCircle,
  FolderOpen,
  User,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchQuery(window.location.search)
      
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
      isActive: pathname === "/"
    },
    {
      label: "Projects",
      href: "/projects",
      icon: FolderOpen,
      isActive: pathname === "/projects" || pathname.startsWith("/workspace")
    },
    {
      label: "Billing",
      href: "/billing",
      icon: DollarSign,
      isActive: pathname === "/billing"
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      isActive: pathname === "/settings"
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

      {/* Chief Architect User Profile & Help links at the bottom */}
      <div className="p-4 border-t border-border/10 flex flex-col gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-surface-container-low/50 rounded-lg border border-border/10">
          <img 
            alt="User Workspace Profile" 
            className="w-8 h-8 rounded-full border border-primary/20 object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAISRsAirh2nXzOCeXwvsCE2p4N49oiN0aiSTQxDl4GUB9Wzn29qmg9cJ6DyklB9YPrA9FeG7LUqg8eLbzp6iOMhLiTFaqV0MGSHvX1Zh4BXhIcJ4bfKA9bPYpiSDaDCo73ERNfWkKGLJTO5cOXc26taaumBf0dnsBCuGDEm1fEfmJ8dSZLZNsOWye2NcgFRspAOafmIWZj6_Dw2XiiN2M070DHE9lojwnvdHt8T00RpKGtZR8t2xx850QP_FWLsV_KkymHdhXemk"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-xs text-foreground truncate">Chief Architect</p>
            <p className="text-[10px] text-zinc-500 font-mono">Operator #04</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs text-muted-foreground hover:text-primary transition-colors">
            <FileText className="size-3.5" />
            <span>Documentation</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs text-muted-foreground hover:text-primary transition-colors">
            <HelpCircle className="size-3.5" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
