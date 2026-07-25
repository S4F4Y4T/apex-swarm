"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import PageLayout from "@/components/PageLayout"
import {
  MemoryStick as MemoryIcon,
  Key,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  User,
  Lock,
  Terminal,
  Volume2,
  VolumeX,
  Sliders,
  Server,
  Check,
  XCircle
} from "lucide-react"

function SettingsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const projectId = searchParams?.get("projectId") || "jsrm_erp"
  const activeTab = searchParams?.get("tab") || "system"

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set("tab", tab)
    router.push(`/settings?${params.toString()}`)
  }

  // System State
  const [openaiKey, setOpenaiKey] = useState("")
  const [anthropicKey, setAnthropicKey] = useState("")
  const [googleKey, setGoogleKey] = useState("")
  const [showOpenai, setShowOpenai] = useState(false)
  const [showAnthropic, setShowAnthropic] = useState(false)
  const [showGoogle, setShowGoogle] = useState(false)
  const [maxParallelAgents, setMaxParallelAgents] = useState(24)
  const [runawayProtection, setRunawayProtection] = useState(5)
  const [hitlAlertBanners, setHitlAlertBanners] = useState(true)
  const [agentLifecycleEvents, setAgentLifecycleEvents] = useState(false)

  // Test Connection States
  const [openaiStatus, setOpenaiStatus] = useState<"valid" | "invalid" | "unchecked">("unchecked")
  const [anthropicStatus, setAnthropicStatus] = useState<"valid" | "invalid" | "unchecked">("unchecked")
  const [googleStatus, setGoogleStatus] = useState<"valid" | "invalid" | "unchecked">("unchecked")

  const [testingOpenai, setTestingOpenai] = useState(false)
  const [testingAnthropic, setTestingAnthropic] = useState(false)
  const [testingGoogle, setTestingGoogle] = useState(false)

  // Profile State
  const [fullName, setFullName] = useState("Alex Mercer")
  const [designation, setDesignation] = useState("Chief Architect")
  const [operatorId, setOperatorId] = useState("Operator #04")
  const [email, setEmail] = useState("operator-04@apex.swarm")
  const [avatarUrl, setAvatarUrl] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuAAISRsAirh2nXzOCeXwvsCE2p4N49oiN0aiSTQxDl4GUB9Wzn29qmg9cJ6DyklB9YPrA9FeG7LUqg8eLbzp6iOMhLiTFaqV0MGSHvX1Zh4BXhIcJ4bfKA9bPYpiSDaDCo73ERNfWkKGLJTO5cOXc26taaumBf0dnsBCuGDEm1fEfmJ8dSZLZNsOWye2NcgFRspAOafmIWZj6_Dw2XiiN2M070DHE9lojwnvdHt8T00RpKGtZR8t2xx850QP_FWLsV_KkymHdhXemk")
  const [themeMode, setThemeMode] = useState<"dark" | "glass" | "high-contrast">("dark")
  const [audioNotifs, setAudioNotifs] = useState(true)
  const [refreshRate, setRefreshRate] = useState("5s")

  // Password / Security States
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Security State
  const [sshKey, setSshKey] = useState("ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDc9a/J5wFmXl6D1t/zO...")
  const [encryptionProfile, setEncryptionProfile] = useState("AES-256-GCM")
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [ipWhitelist, setIpWhitelist] = useState("192.168.1.*, 10.0.0.*")

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Initialize from LocalStorage
  useEffect(() => {
    const storedName = localStorage.getItem("operator_name")
    const storedDesignation = localStorage.getItem("operator_designation")
    const storedOperatorId = localStorage.getItem("operator_id")
    const storedEmail = localStorage.getItem("operator_email")
    const storedAvatar = localStorage.getItem("operator_avatar")
    if (storedName) setFullName(storedName)
    if (storedDesignation) setDesignation(storedDesignation)
    if (storedOperatorId) setOperatorId(storedOperatorId)
    if (storedEmail) setEmail(storedEmail)
    if (storedAvatar) setAvatarUrl(storedAvatar)

    // Load system settings
    const loadSettings = () => {
      const storedOpenaiKey = localStorage.getItem("openai_key") || ""
      const storedAnthropicKey = localStorage.getItem("anthropic_key") || ""
      const storedGoogleKey = localStorage.getItem("google_key") || ""
      const storedMaxParallel = localStorage.getItem("max_parallel_agents") || "24"
      const storedRunaway = localStorage.getItem("runaway_protection") || "5"

      setOpenaiKey(storedOpenaiKey)
      setAnthropicKey(storedAnthropicKey)
      setGoogleKey(storedGoogleKey)
      setMaxParallelAgents(Number(storedMaxParallel))
      setRunawayProtection(Number(storedRunaway))

      if (storedOpenaiKey) setOpenaiStatus("valid")
      if (storedAnthropicKey) setAnthropicStatus("valid")
      if (storedGoogleKey) setGoogleStatus("valid")
    }

    loadSettings()
    window.addEventListener("apex-settings-update", loadSettings)
    return () => {
      window.removeEventListener("apex-settings-update", loadSettings)
    }
  }, [])

  const handleTestConnection = (provider: "openai" | "anthropic" | "google", key: string) => {
    if (provider === "openai") {
      setTestingOpenai(true)
      setTimeout(() => {
        setTestingOpenai(false)
        if (key.startsWith("sk-") && key.length > 10) {
          setOpenaiStatus("valid")
        } else {
          setOpenaiStatus("invalid")
        }
      }, 1200)
    } else if (provider === "anthropic") {
      setTestingAnthropic(true)
      setTimeout(() => {
        setTestingAnthropic(false)
        if (key.startsWith("sk-ant-") && key.length > 15) {
          setAnthropicStatus("valid")
        } else {
          setAnthropicStatus("invalid")
        }
      }, 1200)
    } else if (provider === "google") {
      setTestingGoogle(true)
      setTimeout(() => {
        setTestingGoogle(false)
        if (key.length > 5) {
          setGoogleStatus("valid")
        } else {
          setGoogleStatus("invalid")
        }
      }, 1200)
    }
  }

  const handleApply = () => {
    localStorage.setItem("operator_name", fullName)
    localStorage.setItem("operator_designation", designation)
    localStorage.setItem("operator_id", operatorId)
    localStorage.setItem("operator_email", email)
    localStorage.setItem("operator_avatar", avatarUrl)

    // Save system settings
    localStorage.setItem("openai_key", openaiKey)
    localStorage.setItem("anthropic_key", anthropicKey)
    localStorage.setItem("google_key", googleKey)
    localStorage.setItem("max_parallel_agents", String(maxParallelAgents))
    localStorage.setItem("runaway_protection", String(runawayProtection))
    
    // Dispatch update events
    window.dispatchEvent(new Event("operator-profile-update"))
    window.dispatchEvent(new Event("apex-settings-update"))

    setToastMessage(`Configuration applied to ${activeTab.toUpperCase()} settings`)
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  const handleDiscard = () => {
    if (activeTab === "system") {
      setOpenaiKey("")
      setAnthropicKey("")
      setGoogleKey("")
      setMaxParallelAgents(24)
      setRunawayProtection(5)
      setHitlAlertBanners(true)
      setAgentLifecycleEvents(false)
      setOpenaiStatus("unchecked")
      setAnthropicStatus("unchecked")
      setGoogleStatus("unchecked")
    } else if (activeTab === "profile") {
      setFullName("Alex Mercer")
      setDesignation("Chief Architect")
      setOperatorId("Operator #04")
      setEmail("operator-04@apex.swarm")
      setAvatarUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuAAISRsAirh2nXzOCeXwvsCE2p4N49oiN0aiSTQxDl4GUB9Wzn29qmg9cJ6DyklB9YPrA9FeG7LUqg8eLbzp6iOMhLiTFaqV0MGSHvX1Zh4BXhIcJ4bfKA9bPYpiSDaDCo73ERNfWkKGLJTO5cOXc26taaumBf0dnsBCuGDEm1fEfmJ8dSZLZNsOWye2NcgFRspAOafmIWZj6_Dw2XiiN2M070DHE9lojwnvdHt8T00RpKGtZR8t2xx850QP_FWLsV_KkymHdhXemk")
      setThemeMode("dark")
      setAudioNotifs(true)
      setRefreshRate("5s")
      localStorage.removeItem("operator_name")
      localStorage.removeItem("operator_designation")
      localStorage.removeItem("operator_id")
      localStorage.removeItem("operator_email")
      localStorage.removeItem("operator_avatar")
      window.dispatchEvent(new Event("operator-profile-update"))
    } else if (activeTab === "security") {
      setEncryptionProfile("AES-256-GCM")
      setMfaEnabled(true)
      setIpWhitelist("192.168.1.*, 10.0.0.*")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
    setToastMessage("Settings reset to defaults")
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  return (
    <PageLayout
      title="Global Settings"
      showSearch={false}
      badge={{ 
        text: activeTab === "system" ? "SYSTEM CONFIG" : activeTab === "profile" ? "OPERATOR PROFILE" : "SECURITY & ACCESS", 
        variant: activeTab === "security" ? "destructive" : "primary" 
      }}
      className="space-y-6 flex-grow"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/10 pb-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-widest">Global Configuration</h2>
          <p className="text-xs text-zinc-500 font-mono mt-1">Manage core factory parameters, LLM orchestration, and safety protocols.</p>
        </div>
        <div className="flex gap-3 text-xs font-mono text-zinc-500">
          <span className="text-zinc-400">REGISTRY:</span>
          <span className="text-primary font-bold">100% SYNCED</span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-border/10 gap-2">
        <button 
          onClick={() => handleTabChange("system")}
          className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider border-b-2 transition-all -mb-[2px] flex items-center gap-2 ${
            activeTab === "system" 
              ? "border-primary text-primary font-bold" 
              : "border-transparent text-muted-foreground hover:text-white"
          }`}
        >
          <Server className="size-3.5" />
          <span>System Config</span>
        </button>
        <button 
          onClick={() => handleTabChange("profile")}
          className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider border-b-2 transition-all -mb-[2px] flex items-center gap-2 ${
            activeTab === "profile" 
              ? "border-primary text-primary font-bold" 
              : "border-transparent text-muted-foreground hover:text-white"
          }`}
        >
          <User className="size-3.5" />
          <span>Operator Profile</span>
        </button>
        <button 
          onClick={() => handleTabChange("security")}
          className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider border-b-2 transition-all -mb-[2px] flex items-center gap-2 ${
            activeTab === "security" 
              ? "border-primary text-primary font-bold" 
              : "border-transparent text-muted-foreground hover:text-white"
          }`}
        >
          <Shield className="size-3.5" />
          <span>Security & Access</span>
        </button>
      </div>

      {/* Content depending on selected tab */}
      {activeTab === "system" && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column: LLM Provider & API Keys */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            
            {/* LLM Provider Panel */}
            <section className="bg-surface-container-low/40 border border-border/20 backdrop-blur-md rounded-xl p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border/10 pb-4">
                <div className="flex items-center gap-2">
                  <MemoryIcon className="size-5 text-primary" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">LLM Orchestration</h3>
                </div>
                <span className="font-mono text-[10px] px-2.5 py-0.5 bg-surface-container-high rounded border border-border/40 text-zinc-400">
                  ACTIVE: BYOK
                </span>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border border-primary/20 bg-primary/5">
                <Key className="size-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-primary block">Bring Your Own Key</span>
                  <p className="font-mono text-[10px] text-zinc-500 leading-relaxed mt-1">
                    Every agent connects directly to the provider APIs below using your own credentials. There is no platform-hosted billing mode.
                  </p>
                </div>
              </div>

              {/* BYOK Config Area */}
              <div className="pt-6 border-t border-dashed border-border/10">
                <h4 className="font-mono text-[10px] text-zinc-400 font-bold mb-4 uppercase tracking-wider">Provider Credentials</h4>
                <div className="space-y-3">
                  {/* OpenAI */}
                  <div className="flex flex-col gap-3 bg-surface-container-low/60 p-4 rounded-lg border border-border/10">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="w-36 font-mono text-xs text-white flex items-center gap-2 shrink-0">
                        <Sparkles className="size-3.5 text-primary animate-pulse" />
                        <span>OpenAI API</span>
                      </div>
                      <div className="flex-1 relative flex items-center">
                        <input 
                          type={showOpenai ? "text" : "password"}
                          value={openaiKey}
                          onChange={(e) => setOpenaiKey(e.target.value)}
                          className="w-full bg-surface-container-lowest/80 border border-border/20 rounded px-3 py-1.5 pr-10 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 disabled:opacity-50 transition-colors"
                          placeholder="sk-..."
                        />
                        <button 
                          type="button"
                          onClick={() => setShowOpenai(!showOpenai)}
                          className="absolute right-3 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showOpenai ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-0 md:pl-36">
                      <button
                        type="button"
                        onClick={() => handleTestConnection("openai", openaiKey)}
                        disabled={!openaiKey || testingOpenai}
                        className="px-3 py-1 text-[10px] font-mono uppercase bg-primary/10 hover:bg-primary/20 text-primary rounded border border-primary/20 transition-all disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {testingOpenai ? "Testing..." : "Test Connection"}
                      </button>
                      <div className="text-[10px] font-mono uppercase flex items-center gap-1">
                        {openaiStatus === "valid" && <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="size-3" /> Valid Connection</span>}
                        {openaiStatus === "invalid" && <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="size-3" /> Invalid Key</span>}
                        {openaiStatus === "unchecked" && <span className="text-zinc-500">Unchecked</span>}
                      </div>
                    </div>
                  </div>

                  {/* Anthropic */}
                  <div className="flex flex-col gap-3 bg-surface-container-low/60 p-4 rounded-lg border border-border/10">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="w-36 font-mono text-xs text-white flex items-center gap-2 shrink-0">
                        <Sparkles className="size-3.5 text-secondary-container animate-pulse" />
                        <span>Anthropic API</span>
                      </div>
                      <div className="flex-1 relative flex items-center">
                        <input 
                          type={showAnthropic ? "text" : "password"}
                          value={anthropicKey}
                          onChange={(e) => setAnthropicKey(e.target.value)}
                          className="w-full bg-surface-container-lowest/80 border border-border/20 rounded px-3 py-1.5 pr-10 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 disabled:opacity-50 transition-colors"
                          placeholder="sk-ant-..."
                        />
                        <button 
                          type="button"
                          onClick={() => setShowAnthropic(!showAnthropic)}
                          className="absolute right-3 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showAnthropic ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-0 md:pl-36">
                      <button
                        type="button"
                        onClick={() => handleTestConnection("anthropic", anthropicKey)}
                        disabled={!anthropicKey || testingAnthropic}
                        className="px-3 py-1 text-[10px] font-mono uppercase bg-primary/10 hover:bg-primary/20 text-primary rounded border border-primary/20 transition-all disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {testingAnthropic ? "Testing..." : "Test Connection"}
                      </button>
                      <div className="text-[10px] font-mono uppercase flex items-center gap-1">
                        {anthropicStatus === "valid" && <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="size-3" /> Valid Connection</span>}
                        {anthropicStatus === "invalid" && <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="size-3" /> Invalid Key</span>}
                        {anthropicStatus === "unchecked" && <span className="text-zinc-500">Unchecked</span>}
                      </div>
                    </div>
                  </div>

                  {/* Google */}
                  <div className="flex flex-col gap-3 bg-surface-container-low/60 p-4 rounded-lg border border-border/10">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="w-36 font-mono text-xs text-white flex items-center gap-2 shrink-0">
                        <Sparkles className="size-3.5 text-tertiary animate-pulse" />
                        <span>Google GenAI</span>
                      </div>
                      <div className="flex-1 relative flex items-center">
                        <input 
                          type={showGoogle ? "text" : "password"}
                          value={googleKey}
                          onChange={(e) => setGoogleKey(e.target.value)}
                          className="w-full bg-surface-container-lowest/80 border border-border/20 rounded px-3 py-1.5 pr-10 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 disabled:opacity-50 transition-colors"
                          placeholder="AIzaSy..."
                        />
                        <button 
                          type="button"
                          onClick={() => setShowGoogle(!showGoogle)}
                          className="absolute right-3 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showGoogle ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-0 md:pl-36">
                      <button
                        type="button"
                        onClick={() => handleTestConnection("google", googleKey)}
                        disabled={!googleKey || testingGoogle}
                        className="px-3 py-1 text-[10px] font-mono uppercase bg-primary/10 hover:bg-primary/20 text-primary rounded border border-primary/20 transition-all disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {testingGoogle ? "Testing..." : "Test Connection"}
                      </button>
                      <div className="text-[10px] font-mono uppercase flex items-center gap-1">
                        {googleStatus === "valid" && <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="size-3" /> Valid Connection</span>}
                        {googleStatus === "invalid" && <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="size-3" /> Invalid Key</span>}
                        {googleStatus === "unchecked" && <span className="text-zinc-500">Unchecked</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Guardrails & Notifications */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            
            {/* Global Guardrails Panel */}
            <section className="bg-surface-container-low/40 border border-border/20 backdrop-blur-md rounded-xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-border/10 pb-4 mb-1">
                <Shield className="size-5 text-tertiary" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Global Guardrails</h3>
              </div>

              {/* Max Parallel Agents Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-sans text-zinc-200 font-semibold">Max Parallel Agents</label>
                  <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    {maxParallelAgents}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={maxParallelAgents}
                  onChange={(e) => setMaxParallelAgents(Number(e.target.value))}
                  className="w-full h-1 bg-border/40 rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between font-mono text-[9px] text-zinc-500">
                  <span>1</span>
                  <span>100</span>
                </div>
              </div>

              <hr className="border-border/10 my-1" />

              {/* Runaway Protection Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <label className="font-sans text-zinc-200 font-semibold block">Runaway Protection</label>
                    <span className="font-mono text-[9px] text-zinc-500">Pause after N failed loops</span>
                  </div>
                  <span className="font-mono font-bold text-secondary-container bg-secondary-container/10 px-2 py-0.5 rounded border border-secondary-container/20">
                    {runawayProtection}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={runawayProtection}
                  onChange={(e) => setRunawayProtection(Number(e.target.value))}
                  className="w-full h-1 bg-border/40 rounded-lg appearance-none cursor-pointer accent-secondary-container" 
                />
                <div className="flex justify-between font-mono text-[9px] text-zinc-500">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>
            </section>

            {/* Notifications Panel */}
            <section className="bg-surface-container-low/40 border border-border/20 backdrop-blur-md rounded-xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-border/10 pb-4 mb-1">
                <Bell className="size-5 text-white" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">System Notifications</h3>
              </div>

              <div className="space-y-4">
                {/* Toggle 1 */}
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-xs font-sans text-zinc-200 font-semibold block">HITL Alert Banners</span>
                    <span className="font-mono text-[9px] text-zinc-500 leading-relaxed block mt-0.5">
                      Require explicit approval for state changes
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHitlAlertBanners(!hitlAlertBanners)}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      hitlAlertBanners ? "bg-primary" : "bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        hitlAlertBanners ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 2 */}
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-xs font-sans text-zinc-200 font-semibold block">Agent Lifecycle Events</span>
                    <span className="font-mono text-[9px] text-zinc-500 leading-relaxed block mt-0.5">
                      Notify on agent spawn/termination
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAgentLifecycleEvents(!agentLifecycleEvents)}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      agentLifecycleEvents ? "bg-primary" : "bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        agentLifecycleEvents ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column: Designation Form */}
          <div className="xl:col-span-8">
            <section className="bg-surface-container-low/40 border border-border/20 backdrop-blur-md rounded-xl p-6 flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-border/10 pb-4">
                <User className="size-5 text-primary" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Operator Identity</h3>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Operator Full Name</label>
                  <input 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-[#171f33] border border-border/20 rounded px-3 py-2 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Designation / Role</label>
                    <input 
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="bg-[#171f33] border border-border/20 rounded px-3 py-2 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Operator Code Name</label>
                    <input 
                      type="text"
                      value={operatorId}
                      onChange={(e) => setOperatorId(e.target.value)}
                      className="bg-[#171f33]/50 border border-border/15 rounded px-3 py-2 font-mono text-xs text-zinc-400 cursor-not-allowed focus:outline-none"
                      disabled
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Communications Endpoint (Email)</label>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#171f33] border border-border/20 rounded px-3 py-2 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Swarm Avatar Endpoint URL</label>
                  <input 
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="bg-[#171f33] border border-border/20 rounded px-3 py-2 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">Access Capabilities</label>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white uppercase">PRO_ADMIN_FLEET</p>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Full deployment, container orchestration, and bypass authorization token generator</p>
                    </div>
                    <span className="text-[9px] font-mono font-black uppercase bg-primary text-background px-2.5 py-1 rounded">ROOT_LEVEL</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Preferences */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <section className="bg-surface-container-low/40 border border-border/20 backdrop-blur-md rounded-xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-border/10 pb-4 mb-1">
                <Sliders className="size-5 text-tertiary" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Interface Preferences</h3>
              </div>

              {/* Theme Settings */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Dashboard Theme Profile</label>
                <div className="flex flex-col gap-2 bg-[#060b13] p-2 rounded-lg border border-border/10">
                  {(["dark", "glass", "high-contrast"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setThemeMode(mode)}
                      className={`text-[10px] text-left px-3 py-2 rounded font-mono font-bold uppercase transition-all flex justify-between items-center ${
                        themeMode === mode ? "bg-primary text-background font-bold" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{mode === "dark" ? "Opaque Dark" : mode === "glass" ? "Glassmorphic Translucent" : "High Contrast Tech"}</span>
                      {themeMode === mode && <span className="text-[8px] border border-background/20 px-1 rounded">ACTIVE</span>}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-border/10 my-1" />

              {/* Audio Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-sans text-zinc-200 font-semibold block">Haptic / Sound Alerts</span>
                  <span className="font-mono text-[9px] text-zinc-500 block mt-0.5">Audio signal on task warning</span>
                </div>
                <button
                  onClick={() => setAudioNotifs(!audioNotifs)}
                  className={`p-2 rounded-lg border transition-all ${
                    audioNotifs ? "bg-primary/10 border-primary text-primary" : "bg-zinc-800 border-zinc-700 text-zinc-500"
                  }`}
                >
                  {audioNotifs ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
                </button>
              </div>

              {/* Refresh Rate Selector */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-zinc-400 uppercase tracking-widest">Telemetry Refresh Rate</span>
                  <span className="text-white font-bold">{refreshRate}</span>
                </div>
                <select 
                  value={refreshRate}
                  onChange={(e) => setRefreshRate(e.target.value)}
                  className="w-full bg-[#171f33] border border-border/20 text-xs text-white rounded px-3 py-1.5 font-mono focus:outline-none focus:border-primary"
                >
                  <option value="1s">1s (Real-Time)</option>
                  <option value="5s">5s (Optimal)</option>
                  <option value="15s">15s (Power Saver)</option>
                  <option value="none">Manual Refresh</option>
                </select>
              </div>
            </section>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column: Security Keys */}
          <div className="xl:col-span-8">
            <section className="bg-surface-container-low/40 border border-border/20 backdrop-blur-md rounded-xl p-6 flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-border/10 pb-4">
                <Lock className="size-5 text-destructive" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Swarm Authentication & Keys</h3>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Active Swarm SSH Authorized Public Key</label>
                  <textarea 
                    rows={4}
                    value={sshKey}
                    onChange={(e) => setSshKey(e.target.value)}
                    className="bg-[#171f33] border border-border/20 rounded p-3 font-mono text-[10px] leading-relaxed text-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Vault Encryption Cipher</label>
                    <select 
                      value={encryptionProfile}
                      onChange={(e) => setEncryptionProfile(e.target.value)}
                      className="bg-[#171f33] border border-border/20 text-xs text-white rounded px-3 py-2 font-mono focus:outline-none"
                    >
                      <option value="AES-256-GCM">AES-256-GCM (Standard)</option>
                      <option value="ChaCha20-Poly1305">ChaCha20-Poly1305 (Mobile)</option>
                      <option value="FIPS-140-3">FIPS-140-3 Compliance Mode</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Swarm IP Whitelist</label>
                    <input 
                      type="text"
                      value={ipWhitelist}
                      onChange={(e) => setIpWhitelist(e.target.value)}
                      className="bg-[#171f33] border border-border/20 rounded px-3 py-2 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none"
                      placeholder="e.g. 192.168.1.*"
                    />
                  </div>
                </div>

                {/* Password Management */}
                <div className="pt-4 border-t border-border/10">
                  <h4 className="font-mono text-xs text-white font-bold mb-3 uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="size-4 text-primary" />
                    Change Account Password
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5 relative">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Current Password</label>
                      <div className="relative flex items-center">
                        <input 
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full bg-[#171f33] border border-border/20 rounded px-3 py-2 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none pr-8"
                          placeholder="••••••••"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-2.5 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showCurrentPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 relative">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">New Password</label>
                      <div className="relative flex items-center">
                        <input 
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-[#171f33] border border-border/20 rounded px-3 py-2 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none pr-8"
                          placeholder="New secret key"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-2.5 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 relative">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Confirm New Password</label>
                      <div className="relative flex items-center">
                        <input 
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-[#171f33] border border-border/20 rounded px-3 py-2 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 focus:outline-none pr-8"
                          placeholder="Verify key"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2.5 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!currentPassword || !newPassword || !confirmPassword) {
                          alert("All password fields are required.")
                          return
                        }
                        if (newPassword !== confirmPassword) {
                          alert("New password and confirmation do not match.")
                          return
                        }
                        alert("Password updated successfully (Simulation).")
                        setCurrentPassword("")
                        setNewPassword("")
                        setConfirmPassword("")
                      }}
                      className="px-3.5 py-1.5 bg-primary/10 border border-primary/30 hover:bg-primary/20 text-primary font-bold text-xs rounded uppercase font-mono tracking-wider transition-all"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-ping"></span>
                        Emergency Vault Lockout
                      </p>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Instantly clear all server credentials and terminate all active runner processes.</p>
                    </div>
                    <button className="px-3 py-1 bg-destructive hover:bg-destructive-hover text-white font-bold text-[10px] rounded uppercase font-mono tracking-wider transition-colors">
                      ACTIVATE LOCKOUT
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sessions */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <section className="bg-surface-container-low/40 border border-border/20 backdrop-blur-md rounded-xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-border/10 pb-4 mb-1">
                <Terminal className="size-5 text-white" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Active Swarm Sessions</h3>
              </div>

              {/* MFA Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-sans text-zinc-200 font-semibold block">Swarm Multi-Factor Auth</span>
                  <span className="font-mono text-[9px] text-zinc-500 block mt-0.5">Enforce MFA token validation</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    mfaEnabled ? "bg-primary" : "bg-zinc-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      mfaEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <hr className="border-border/10 my-1" />

              {/* Sessions List */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Authorized Operators</span>
                
                <div className="bg-surface-container-high/40 border border-border/10 p-2.5 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <User className="size-4 text-zinc-400" />
                    <div>
                      <p className="text-[10px] font-semibold text-white">Operator #04 (YOU)</p>
                      <p className="text-[8px] font-mono text-zinc-500">IP: 192.168.1.104 | Active now</p>
                    </div>
                  </div>
                  <span className="text-[8px] bg-primary/20 text-primary border border-primary/30 px-1 rounded uppercase font-mono scale-90">Current</span>
                </div>

                <div className="bg-surface-container-high/40 border border-border/10 p-2.5 rounded-lg flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-2.5">
                    <User className="size-4 text-zinc-400" />
                    <div>
                      <p className="text-[10px] font-semibold text-white">System Janitor Bot</p>
                      <p className="text-[8px] font-mono text-zinc-500">Internal Loop | Idle for 12m</p>
                    </div>
                  </div>
                  <span className="text-[8px] bg-zinc-800 text-zinc-400 border border-zinc-700 px-1 rounded uppercase font-mono scale-90">Daemon</span>
                </div>
              </div>

              <button 
                onClick={() => alert("All alternate sessions terminated.")}
                className="w-full mt-2 py-1.5 border border-border/40 hover:border-destructive/40 hover:bg-destructive/10 text-xs text-zinc-300 hover:text-destructive rounded font-mono transition-all"
              >
                REVOKE ALL OTHER RUNNERS
              </button>
            </section>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-border/10">
        <button 
          onClick={handleDiscard}
          className="px-4 py-2 rounded font-mono text-xs border border-border/30 text-zinc-300 hover:text-white hover:bg-surface-bright/20 transition-all flex items-center gap-1.5"
        >
          <RotateCcw className="size-3.5" />
          <span>Discard Changes</span>
        </button>
        <button 
          onClick={handleApply}
          className="px-4 py-2 rounded bg-primary text-background font-black font-mono text-xs hover:brightness-110 shadow-[0_0_12px_rgba(76,215,246,0.3)] transition-all flex items-center gap-1.5"
        >
          <Save className="size-3.5" />
          <span>Apply Configuration</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-12 right-6 bg-surface-container-high border border-primary/30 p-3 rounded-lg shadow-xl backdrop-blur-md flex items-center gap-2.5 z-50 animate-bounce">
          <CheckCircle2 className="size-5 text-tertiary" />
          <span className="font-mono text-xs text-white font-medium">{toastMessage}</span>
        </div>
      )}
    </PageLayout>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="p-6 md:p-8 font-mono text-xs text-zinc-500 animate-pulse">Loading settings...</div>}>
      <SettingsPageContent />
    </Suspense>
  )
}
