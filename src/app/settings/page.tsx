"use client"

import React, { useState } from "react"
import PageLayout from "@/components/PageLayout"
import { 
  MemoryStick as MemoryIcon, 
  Cloud, 
  Key, 
  Eye, 
  EyeOff, 
  Shield, 
  Bell, 
  Save, 
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Trash2
} from "lucide-react"

export default function SettingsPage() {
  const [llmProvider, setLlmProvider] = useState<"hosted" | "byok">("hosted")
  const [openaiKey, setOpenaiKey] = useState("sk-proj-7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p")
  const [anthropicKey, setAnthropicKey] = useState("")
  const [googleKey, setGoogleKey] = useState("")

  const [showOpenai, setShowOpenai] = useState(false)
  const [showAnthropic, setShowAnthropic] = useState(false)
  const [showGoogle, setShowGoogle] = useState(false)

  const [maxParallelAgents, setMaxParallelAgents] = useState(24)
  const [runawayProtection, setRunawayProtection] = useState(5)

  const [hitlAlertBanners, setHitlAlertBanners] = useState(true)
  const [agentLifecycleEvents, setAgentLifecycleEvents] = useState(false)

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleApply = () => {
    setToastMessage("Configuration successfully written to database")
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  const handleDiscard = () => {
    setLlmProvider("hosted")
    setOpenaiKey("sk-proj-7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p")
    setAnthropicKey("")
    setGoogleKey("")
    setMaxParallelAgents(24)
    setRunawayProtection(5)
    setHitlAlertBanners(true)
    setAgentLifecycleEvents(false)
    
    setToastMessage("Configuration reset to defaults")
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  return (
    <PageLayout
      title="Global Settings"
      showSearch={false}
      badge={{ text: "SYSTEM CONFIG", variant: "primary" }}
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

      {/* Bento Grid Layout */}
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
                ACTIVE: {llmProvider === "hosted" ? "PLATFORM" : "BYOK"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hosted Card */}
              <label 
                className={`relative flex cursor-pointer p-5 rounded-lg border transition-all duration-300 ${
                  llmProvider === "hosted" 
                    ? "border-primary bg-primary/5 shadow-[0_0_12px_rgba(76,215,246,0.05)]" 
                    : "border-border/20 bg-surface-container-low/40 hover:bg-surface-bright/20"
                }`}
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className={`size-4 ${llmProvider === "hosted" ? "text-primary" : "text-zinc-400"}`} />
                    <span className={`text-sm font-bold ${llmProvider === "hosted" ? "text-primary" : "text-white"}`}>Platform-Hosted</span>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-500 leading-relaxed">
                    Utilize built-in Aigentic compute clusters. Best for rapid deployment and shared billing.
                  </p>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="llm_provider" 
                    checked={llmProvider === "hosted"}
                    onChange={() => setLlmProvider("hosted")}
                    className="form-radio text-primary focus:ring-primary bg-surface border-border/20 h-4.5 w-4.5 cursor-pointer"
                  />
                </div>
              </label>

              {/* BYOK Card */}
              <label 
                className={`relative flex cursor-pointer p-5 rounded-lg border transition-all duration-300 ${
                  llmProvider === "byok" 
                    ? "border-primary bg-primary/5 shadow-[0_0_12px_rgba(76,215,246,0.05)]" 
                    : "border-border/20 bg-surface-container-low/40 hover:bg-surface-bright/20"
                }`}
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className={`size-4 ${llmProvider === "byok" ? "text-primary" : "text-zinc-400"}`} />
                    <span className={`text-sm font-bold ${llmProvider === "byok" ? "text-primary" : "text-white"}`}>Bring Your Own Key</span>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-500 leading-relaxed">
                    Direct connection to provider APIs. Maximum privacy and distinct billing control.
                  </p>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="llm_provider" 
                    checked={llmProvider === "byok"}
                    onChange={() => setLlmProvider("byok")}
                    className="form-radio text-primary focus:ring-primary bg-surface border-border/20 h-4.5 w-4.5 cursor-pointer"
                  />
                </div>
              </label>
            </div>

            {/* BYOK Config Area */}
            <div className={`pt-6 border-t border-dashed border-border/10 transition-all duration-300 ${
              llmProvider === "byok" ? "opacity-100" : "opacity-40 pointer-events-none"
            }`}>
              <h4 className="font-mono text-[10px] text-zinc-400 font-bold mb-4 uppercase tracking-wider">Provider Credentials</h4>
              <div className="space-y-3">
                {/* OpenAI */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 bg-surface-container-low/60 p-3 rounded-lg border border-border/10">
                  <div className="w-36 font-mono text-xs text-white flex items-center gap-2 shrink-0">
                    <Sparkles className="size-3.5 text-primary animate-pulse" />
                    <span>OpenAI API</span>
                  </div>
                  <div className="flex-1 relative flex items-center">
                    <input 
                      type={showOpenai ? "text" : "password"}
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      disabled={llmProvider !== "byok"}
                      className="w-full bg-surface-container-lowest/80 border border-border/20 rounded px-3 py-1.5 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 disabled:opacity-50 transition-colors"
                      placeholder="sk-..."
                    />
                    <button 
                      type="button"
                      onClick={() => setShowOpenai(!showOpenai)}
                      disabled={llmProvider !== "byok"}
                      className="absolute right-3 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showOpenai ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Anthropic */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 bg-surface-container-low/60 p-3 rounded-lg border border-border/10">
                  <div className="w-36 font-mono text-xs text-white flex items-center gap-2 shrink-0">
                    <Sparkles className="size-3.5 text-secondary-container animate-pulse" />
                    <span>Anthropic API</span>
                  </div>
                  <div className="flex-1 relative flex items-center">
                    <input 
                      type={showAnthropic ? "text" : "password"}
                      value={anthropicKey}
                      onChange={(e) => setAnthropicKey(e.target.value)}
                      disabled={llmProvider !== "byok"}
                      className="w-full bg-surface-container-lowest/80 border border-border/20 rounded px-3 py-1.5 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 disabled:opacity-50 transition-colors"
                      placeholder="sk-ant-..."
                    />
                    <button 
                      type="button"
                      onClick={() => setShowAnthropic(!showAnthropic)}
                      disabled={llmProvider !== "byok"}
                      className="absolute right-3 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showAnthropic ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Google */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 bg-surface-container-low/60 p-3 rounded-lg border border-border/10">
                  <div className="w-36 font-mono text-xs text-white flex items-center gap-2 shrink-0">
                    <Sparkles className="size-3.5 text-tertiary animate-pulse" />
                    <span>Google GenAI</span>
                  </div>
                  <div className="flex-1 relative flex items-center">
                    <input 
                      type={showGoogle ? "text" : "password"}
                      value={googleKey}
                      onChange={(e) => setGoogleKey(e.target.value)}
                      disabled={llmProvider !== "byok"}
                      className="w-full bg-surface-container-lowest/80 border border-border/20 rounded px-3 py-1.5 font-mono text-xs text-white focus:border-primary focus:ring-1 focus:ring-primary/40 disabled:opacity-50 transition-colors"
                      placeholder="AIzaSy..."
                    />
                    <button 
                      type="button"
                      onClick={() => setShowGoogle(!showGoogle)}
                      disabled={llmProvider !== "byok"}
                      className="absolute right-3 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showGoogle ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
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
