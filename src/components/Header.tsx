"use client"

import React, { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Bell,
  Settings,
  Search,
  ChevronDown,
  Layers,
  Check,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  User,
  LogOut,
  BookOpen,
  HelpCircle,
  Shield,
  Cpu,
  Sliders
} from "lucide-react"
import { projectsData } from "@/lib/projects"

interface HeaderProps {
  title?: React.ReactNode
  badge?: {
    text: string
    variant?: "primary" | "secondary" | "tertiary" | "default" | "destructive"
  }
  showSearch?: boolean
  searchPlaceholder?: string
  onSearchChange?: (val: string) => void
  actions?: React.ReactNode
}

export default function Header({
  title,
  badge,
  showSearch = false,
  searchPlaceholder = "Search registry...",
  onSearchChange,
  actions
}: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Active states for dropdowns
  const [showProjectDropdown, setShowProjectDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  // Profile local states
  const [fullName, setFullName] = useState("Alex Mercer")
  const [designation, setDesignation] = useState("Chief Architect")
  const [email, setEmail] = useState("operator-04@apex.swarm")
  const [avatarUrl, setAvatarUrl] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuAAISRsAirh2nXzOCeXwvsCE2p4N49oiN0aiSTQxDl4GUB9Wzn29qmg9cJ6DyklB9YPrA9FeG7LUqg8eLbzp6iOMhLiTFaqV0MGSHvX1Zh4BXhIcJ4bfKA9bPYpiSDaDCo73ERNfWkKGLJTO5cOXc26taaumBf0dnsBCuGDEm1fEfmJ8dSZLZNsOWye2NcgFRspAOafmIWZj6_Dw2XiiN2M070DHE9lojwnvdHt8T00RpKGtZR8t2xx850QP_FWLsV_KkymHdhXemk")

  useEffect(() => {
    const loadProfile = () => {
      const storedName = localStorage.getItem("operator_name")
      const storedDesignation = localStorage.getItem("operator_designation")
      const storedEmail = localStorage.getItem("operator_email")
      const storedAvatar = localStorage.getItem("operator_avatar")
      if (storedName) setFullName(storedName)
      if (storedDesignation) setDesignation(storedDesignation)
      if (storedEmail) setEmail(storedEmail)
      if (storedAvatar) setAvatarUrl(storedAvatar)
    }

    loadProfile()
    window.addEventListener("operator-profile-update", loadProfile)
    return () => {
      window.removeEventListener("operator-profile-update", loadProfile)
    }
  }, [])

  // Settings State (Mock Interactive)
  const [sdlcStrictness, setSdlcStrictness] = useState<number>(4)
  const [concurrencyLimit, setConcurrencyLimit] = useState<number>(24)

  useEffect(() => {
    const loadSettings = () => {
      const storedStrictness = localStorage.getItem("sdlc_strictness") || "4"
      const storedMaxParallel = localStorage.getItem("max_parallel_agents") || "24"

      setSdlcStrictness(Number(storedStrictness))
      setConcurrencyLimit(Number(storedMaxParallel))
    }

    loadSettings()
    window.addEventListener("apex-settings-update", loadSettings)
    return () => {
      window.removeEventListener("apex-settings-update", loadSettings)
    }
  }, [])

  const updateSetting = (key: string, value: string | number) => {
    localStorage.setItem(key, String(value))
    window.dispatchEvent(new Event("apex-settings-update"))
  }

  // Resolve current active project from URL or default to jsrm_erp
  const projectIdParam = searchParams?.get("projectId") || "jsrm_erp"
  const currentProject = projectsData.find(p => p.id === projectIdParam) || projectsData[0]

  // Dynamic notifications state
  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      type: "error",
      title: "CRITICAL FAILURE",
      desc: "Developer agent failed 2x on auth-svc build",
      time: "5m ago",
      read: false
    },
    {
      id: "n2",
      type: "warn",
      title: "HITL REQUIRED",
      desc: "Approval needed: schema migration for Catalog svc",
      time: "12m ago",
      read: false
    },
    {
      id: "n3",
      type: "success",
      title: "SYNC COMPLETED",
      desc: "Database backup completed sync to main cluster",
      time: "25m ago",
      read: true
    },
    {
      id: "n4",
      type: "info",
      title: "SERVICE RUNNING",
      desc: "Janitor Bot v1.2 garbage collector active",
      time: "1h ago",
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleProjectSelect = (projectId: string) => {
    setShowProjectDropdown(false)
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set("projectId", projectId)
    router.push(`${pathname}?${params.toString()}`)
  }

  const getBadgeColor = (variant?: string) => {
    switch (variant) {
      case "primary":
        return "bg-primary/10 border-primary/20 text-primary"
      case "secondary":
        return "bg-secondary/10 border-secondary/20 text-secondary"
      case "tertiary":
        return "bg-tertiary/10 border-tertiary/20 text-tertiary"
      case "destructive":
        return "bg-destructive/10 border-destructive/20 text-destructive"
      default:
        return "bg-zinc-800 border-zinc-700 text-zinc-400"
    }
  }

  const getDotPulseColor = (variant?: string) => {
    switch (variant) {
      case "primary":
        return "bg-primary"
      case "secondary":
        return "bg-secondary"
      case "tertiary":
        return "bg-tertiary"
      case "destructive":
        return "bg-destructive"
      default:
        return "bg-zinc-400"
    }
  }

  // Resolve page title based on title prop or current pathname
  const getPageTitle = () => {
    if (title) return title
    switch (pathname) {
      case "/":
        return "Dashboard"
      case "/workspace":
        return "Workspace"
      case "/projects":
        return "Projects Explorer"
      case "/settings":
        return "Global Settings"
      default:
        return "Aigentic Factory"
    }
  }
  const pageTitle = getPageTitle()

  const resolvedBadge = badge || {
    text: currentProject.status,
    variant: currentProject.statusType === "error" ? "destructive" : currentProject.statusType === "paused" ? "secondary" : "primary"
  }

  return (
    <header className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-40 bg-[#0b1326]/80 backdrop-blur-md border-b border-border/40">
      
      {/* Title & Badge & Search */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">

          {/* Project Switcher — only shown where a "current project" context is meaningful:
              the Project Workspace (its own dashboard) and the Projects Explorer.
              The global Mission Control dashboard (/) and Settings are project-agnostic. */}
          {(pathname === "/workspace" || pathname === "/projects") && (
            <>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProjectDropdown(!showProjectDropdown)
                    setShowNotifications(false)
                    setShowSettings(false)
                    setShowProfile(false)
                  }}
                  className="flex items-center gap-2 text-left font-black text-white uppercase tracking-widest hover:text-primary transition-colors text-lg"
                >
                  <span>{currentProject.name}</span>
                  <ChevronDown className="size-4 shrink-0 text-zinc-500" />
                </button>

                {showProjectDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProjectDropdown(false)} />
                    <div className="absolute left-0 mt-2 w-72 bg-[#0b1326] border border-border/40 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-100">
                      <div className="p-3 border-b border-border/10">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Select Workspace Context</span>
                      </div>
                      <div className="py-1">
                        {projectsData.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleProjectSelect(p.id)}
                            className={`w-full text-left px-4 py-3 hover:bg-white/5 flex items-center justify-between transition-colors border-l-2 ${
                              p.id === currentProject.id ? "bg-primary/5 text-primary border-l-primary" : "text-muted-foreground border-l-transparent"
                            }`}
                          >
                            <div>
                              <p className="font-semibold text-sm text-white">{p.name}</p>
                              <p className="text-[9px] font-mono text-zinc-500 truncate max-w-[200px]">{p.description}</p>
                            </div>
                            <span className="text-lg">{p.agentIcon}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <span className="text-zinc-600 font-mono text-sm mx-1">/</span>
            </>
          )}

          {/* Page/Section Title */}
          <div className="font-semibold text-sm text-muted-foreground uppercase tracking-wider font-mono">
            {pageTitle}
          </div>
          
          {resolvedBadge && (
            <div className={`flex items-center gap-1.5 ml-4 px-2 py-[2px] border rounded-full ${getBadgeColor(resolvedBadge.variant)}`}>
              <span className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getDotPulseColor(resolvedBadge.variant)}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${getDotPulseColor(resolvedBadge.variant)}`}></span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold">{resolvedBadge.text}</span>
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
      
      {/* Right Controls & Dropdowns */}
      <div className="flex items-center gap-4">
        {actions && <div className="flex items-center gap-3">{actions}</div>}

        <div className="flex items-center gap-3 relative text-muted-foreground">
          
          {/* 1. Notifications Trigger */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowSettings(false)
                setShowProfile(false)
                setShowProjectDropdown(false)
              }}
              className={`p-1.5 hover:text-primary transition-colors rounded-lg hover:bg-white/5 relative ${showNotifications ? "text-primary bg-white/5" : ""}`}
            >
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-3 w-80 bg-[#0b1326] border border-border/40 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-100">
                  <div className="p-3 border-b border-border/10 flex justify-between items-center bg-[#070b14]/50">
                    <span className="text-xs font-semibold text-white">System Events Log</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={handleMarkAllRead}
                        className="text-[9px] font-mono text-secondary hover:underline uppercase tracking-wider"
                      >
                        Dismiss All
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-border/10">
                    {notifications.map(n => (
                      <div 
                        key={n.id} 
                        className={`p-3 text-left transition-colors hover:bg-white/5 flex gap-2.5 items-start ${!n.read ? "bg-white/[0.02]" : ""}`}
                      >
                        <div className={`mt-0.5 p-1 rounded ${
                          n.type === "error" ? "bg-destructive/10 text-destructive" :
                          n.type === "warn" ? "bg-secondary/10 text-secondary" :
                          n.type === "success" ? "bg-tertiary/10 text-tertiary" :
                          "bg-primary/10 text-primary"
                        }`}>
                          {n.type === "error" ? <XCircle className="size-3.5" /> :
                           n.type === "warn" ? <AlertTriangle className="size-3.5" /> :
                           n.type === "success" ? <CheckCircle2 className="size-3.5" /> :
                           <Info className="size-3.5" />}
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs font-semibold text-white tracking-tight">{n.title}</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight">{n.desc}</p>
                          <span className="text-[8px] font-mono text-zinc-500 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-border/10 bg-[#070b14]/50 text-center">
                    <button 
                      onClick={() => {
                        setShowNotifications(false)
                        router.push(`/workspace?projectId=${currentProject.id}&tab=logs`)
                      }}
                      className="text-[10px] font-mono text-zinc-400 hover:text-white transition-colors"
                    >
                      Open Live Log Stream →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 2. Settings Trigger */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowSettings(!showSettings)
                setShowNotifications(false)
                setShowProfile(false)
                setShowProjectDropdown(false)
              }}
              className={`p-1.5 hover:text-primary transition-colors rounded-lg hover:bg-white/5 ${showSettings ? "text-primary bg-white/5" : ""}`}
            >
              <Settings className="size-4" />
            </button>

            {showSettings && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
                <div className="absolute right-0 mt-3 w-80 bg-[#0b1326] border border-border/40 rounded-xl shadow-2xl z-50 p-4 backdrop-blur-md text-left text-zinc-300 space-y-4 animate-in fade-in slide-in-from-top-1 duration-100">
                  <div>
                    <h4 className="text-xs font-black uppercase text-white tracking-wider mb-2">Platform Safeguards</h4>
                    <span className="text-[9px] font-mono text-zinc-500 block -mt-1 mb-3">Enforced policy parameters</span>
                  </div>

                  {/* Access Mode */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Access Mode</label>
                    <div className="bg-[#060b13] p-2 rounded-lg border border-border/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-primary">BYOK (Bring Your Own Key)</span>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase">Active</span>
                    </div>
                  </div>

                  {/* Concurrency Limit */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-zinc-400 uppercase tracking-widest">Max Workers</span>
                      <span className="text-white font-bold">{concurrencyLimit} Parallel</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="24" 
                      value={concurrencyLimit} 
                      onChange={(e) => updateSetting("max_parallel_agents", Number(e.target.value))}
                      className="w-full accent-primary bg-zinc-800 rounded-lg appearance-none h-1 cursor-pointer"
                    />
                  </div>

                  {/* SDLC Strictness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-zinc-400 uppercase tracking-widest">SDLC Rules Level</span>
                      <span className="text-secondary font-bold">Lvl {sdlcStrictness} Enforced</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      value={sdlcStrictness} 
                      onChange={(e) => updateSetting("sdlc_strictness", Number(e.target.value))}
                      className="w-full accent-secondary bg-zinc-800 rounded-lg appearance-none h-1 cursor-pointer"
                    />
                  </div>

                  <div className="pt-2 border-t border-border/10 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-zinc-500">Config: config.yaml</span>
                    <button 
                      onClick={() => {
                        setShowSettings(false)
                        router.push("/settings")
                      }} 
                      className="text-primary hover:underline"
                    >
                      Advanced Settings →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <span className="text-zinc-700 font-light">|</span>

          {/* 3. Profile Trigger */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowProfile(!showProfile)
                setShowNotifications(false)
                setShowSettings(false)
                setShowProjectDropdown(false)
              }}
              className="w-8 h-8 rounded-full bg-card border border-border/40 overflow-hidden focus:outline-none hover:border-primary/50 transition-colors"
            >
              <img 
                className="w-full h-full object-cover" 
                alt={fullName}
                src={avatarUrl}
              />
            </button>

            {showProfile && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                <div className="absolute right-0 mt-3 w-56 bg-[#0b1326] border border-border/40 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-md text-left text-zinc-300 animate-in fade-in slide-in-from-top-1 duration-100">
                  
                  {/* Profile Header */}
                  <div className="p-4 border-b border-border/10 bg-[#070b14]/50 flex flex-col items-center text-center">
                    <img 
                      className="size-12 rounded-full border border-primary/20 object-cover mb-2" 
                      alt={fullName}
                      src={avatarUrl}
                    />
                    <p className="font-semibold text-white text-sm truncate w-full">{fullName}</p>
                    <p className="text-[10px] font-mono text-zinc-400 mt-0.5 truncate w-full">{designation}</p>
                    <p className="text-[8px] font-mono text-zinc-500 mt-0.5 truncate w-full">{email}</p>
                    <div className="mt-2 inline-flex items-center gap-1 bg-secondary/10 border border-secondary/20 px-1.5 py-0.5 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                      <span className="text-[8px] font-mono font-bold text-secondary uppercase tracking-widest">Pro Operator</span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="p-1">
                    <button 
                      onClick={() => {
                        setShowProfile(false)
                        router.push(`/projects?projectId=${projectIdParam}`)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Layers className="size-3.5 text-zinc-500" />
                      Projects Fleet
                    </button>
                    <button
                      onClick={() => {
                        setShowProfile(false)
                        router.push(`/settings?tab=profile&projectId=${projectIdParam}`)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <User className="size-3.5 text-zinc-500" />
                      Profile Settings
                    </button>
                    <button 
                      onClick={() => {
                        setShowProfile(false)
                        router.push(`/settings?tab=security&projectId=${projectIdParam}`)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Shield className="size-3.5 text-zinc-500" />
                      Security Settings
                    </button>
                  </div>

                  {/* Sign Out */}
                  <div className="p-1 border-t border-border/10 bg-[#070b14]/20">
                    <button 
                      onClick={() => {
                        setShowProfile(false)
                        alert("Demo Session: Sign out simulated.")
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="size-3.5" />
                      Disconnect Session
                    </button>
                  </div>

                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}
