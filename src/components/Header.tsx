"use client"

import React from "react"
import { Bell, Settings, Search } from "lucide-react"

interface HeaderProps {
  title?: string
  badge?: {
    text: string
    variant?: "primary" | "secondary" | "tertiary" | "default"
  }
  showSearch?: boolean
  searchPlaceholder?: string
  onSearchChange?: (val: string) => void
  actions?: React.ReactNode
}

export default function Header({
  title = "Aigentic Factory",
  badge,
  showSearch = false,
  searchPlaceholder = "Search registry...",
  onSearchChange,
  actions
}: HeaderProps) {
  
  const getBadgeColor = (variant?: string) => {
    switch (variant) {
      case "primary":
        return "bg-primary/10 border-primary/20 text-primary"
      case "secondary":
        return "bg-secondary/10 border-secondary/20 text-secondary"
      case "tertiary":
        return "bg-tertiary/10 border-tertiary/20 text-tertiary"
      default:
        return "bg-zinc-800 border-zinc-700 text-zinc-400"
    }
  };

  const getDotPulseColor = (variant?: string) => {
    switch (variant) {
      case "primary":
        return "bg-primary"
      case "secondary":
        return "bg-secondary"
      case "tertiary":
        return "bg-tertiary"
      default:
        return "bg-zinc-400"
    }
  };

  return (
    <header className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-40 bg-[#0b1326]/80 backdrop-blur-md border-b border-border/40">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-lg text-white tracking-tight">{title}</h2>
          
          {badge && (
            <div className={`flex items-center gap-1.5 ml-4 px-2 py-[2px] border rounded-full ${getBadgeColor(badge.variant)}`}>
              <span className={`relative flex h-1.5 w-1.5`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getDotPulseColor(badge.variant)}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${getDotPulseColor(badge.variant)}`}></span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold">{badge.text}</span>
            </div>
          )}
        </div>

        {showSearch && (
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <input 
              type="text" 
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="bg-[#171f33] border border-border/20 text-xs text-foreground rounded-full pl-9 pr-4 py-1.5 w-64 focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground"
            />
          </div>
        )}

        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          <span className="text-zinc-500">|</span>
          <a className="text-muted-foreground hover:text-primary transition-colors" href="#">Network</a>
          <a className="text-muted-foreground hover:text-primary transition-colors" href="#">Registry</a>
          <a className="text-muted-foreground hover:text-primary transition-colors" href="#">Vault</a>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {actions && <div className="flex items-center gap-3">{actions}</div>}

        <div className="flex items-center gap-2 text-muted-foreground">
          <button className="p-1 hover:text-primary transition-colors">
            <Bell className="size-4" />
          </button>
          <button className="p-1 hover:text-primary transition-colors">
            <Settings className="size-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-card border border-border/40 overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Architect"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAISRsAirh2nXzOCeXwvsCE2p4N49oiN0aiSTQxDl4GUB9Wzn29qmg9cJ6DyklB9YPrA9FeG7LUqg8eLbzp6iOMhLiTFaqV0MGSHvX1Zh4BXhIcJ4bfKA9bPYpiSDaDCo73ERNfWkKGLJTO5cOXc26taaumBf0dnsBCuGDEm1fEfmJ8dSZLZNsOWye2NcgFRspAOafmIWZj6_Dw2XiiN2M070DHE9lojwnvdHt8T00RpKGtZR8t2xx850QP_FWLsV_KkymHdhXemk"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
