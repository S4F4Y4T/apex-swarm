"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface HeaderBadge {
  text: string
  variant?: "primary" | "secondary" | "tertiary" | "default" | "destructive"
}

export interface HeaderConfig {
  title?: React.ReactNode
  badge?: HeaderBadge
  showSearch?: boolean
  searchPlaceholder?: string
  onSearchChange?: (val: string) => void
  actions?: React.ReactNode
}

interface HeaderContextType {
  config: HeaderConfig
  setHeaderConfig: (config: HeaderConfig) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<HeaderConfig>({})

  return (
    <HeaderContext.Provider value={{ config, setHeaderConfig: setConfig }}>
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeaderContext() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider")
  }
  return context
}
