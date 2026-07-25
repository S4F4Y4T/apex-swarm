"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TelemetryRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace("/")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-zinc-400 font-mono text-xs">
      <div className="flex flex-col items-center gap-3">
        <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span>Redirecting to Apex Swarm Control Deck...</span>
      </div>
    </div>
  )
}
