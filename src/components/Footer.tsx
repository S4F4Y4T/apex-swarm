"use client"

import React from "react"
import { Radio } from "lucide-react"

interface FooterProps {
  status?: string
  cluster?: string
  uptime?: string
  latency?: string | number
}

export default function Footer({
  status = "Nominal",
  cluster = "US-EAST-1 (v2.4)",
  uptime = "142h 21m",
  latency = "24ms"
}: FooterProps) {
  return (
    <footer className="h-8 bg-[#060e20] border-t border-border/40 flex items-center px-6 justify-between text-[10px] font-mono text-muted-foreground select-none mt-auto">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
          <span className="uppercase text-white">System: {status}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Radio className="size-3 text-primary animate-pulse" />
          <span className="uppercase">Cluster: {cluster}</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span>Uptime: {uptime}</span>
        <div className="flex items-center gap-1">
          <span>Latency:</span>
          <span className="text-tertiary">{typeof latency === "number" ? `${latency}ms` : latency}</span>
        </div>
      </div>
    </footer>
  )
}
