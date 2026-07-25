"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  Activity, 
  DollarSign, 
  Clock, 
  Shield, 
  Zap, 
  AlertTriangle, 
  Play, 
  Terminal as TerminalIcon, 
  Check, 
  X, 
  ChevronRight, 
  Plus, 
  Search, 
  Bell, 
  Settings, 
  Radio,
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import PageLayout from "@/components/PageLayout"

interface SparklineData {
  id: number
  height: number
}

interface LogEntry {
  time: string
  level: "info" | "warning" | "error" | "success"
  text: string
}

export default function TelemetryPage() {
  // State for Sparkline
  const [sparkline, setSparkline] = useState<SparklineData[]>([
    { id: 1, height: 30 },
    { id: 2, height: 45 },
    { id: 3, height: 40 },
    { id: 4, height: 60 },
    { id: 5, height: 55 },
    { id: 6, height: 80 },
    { id: 7, height: 70 },
    { id: 8, height: 90 },
    { id: 9, height: 95 }
  ])

  // State for Velocity Chart
  const [velocity, setVelocity] = useState({
    planner: [15, 20, 10, 5, 20, 10],
    developer: [25, 20, 35, 40, 20, 30],
    auditor: [5, 10, 15, 20, 25, 30],
    tester: [10, 15, 20, 25, 15, 10]
  })

  // State for Active Wait Timer
  const [activeWait, setActiveWait] = useState(7932) // ~2h 12m 12s in seconds

  // State for Safeguard Console Logs
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: "15:02:12", level: "info", text: "ANALYZING AGENT 'TESTER_BETA' CALL STACK..." },
    { time: "15:02:14", level: "warning", text: "WARNING: CIRCULAR LOGIC DETECTED IN 'validation_retry_loop'." },
    { time: "15:02:14", level: "warning", text: "ITERATION COUNT: 14 | MAX_THRESHOLD: 10" },
    { time: "15:02:15", level: "error", text: "SAFEGUARD TRIGGERED: KILLING PROCESS ID #8841" },
    { time: "15:02:15", level: "success", text: "ROLLING BACK TRANSACTION: UUID_99A1-22" },
    { time: "15:02:16", level: "success", text: "STATE RESTORED TO T-minus 400ms." },
    { time: "15:10:01", level: "info", text: "MONITORING SYSTEM IDLE. ALL THREADS NOMINAL." }
  ])

  // Deployment Modal State
  const [isDeployOpen, setIsDeployOpen] = useState(false)
  const [newAgentName, setNewAgentName] = useState("")
  const [newAgentRole, setNewAgentRole] = useState("Developer")
  const [strictness, setStrictness] = useState(85)
  const [contextSize, setContextSize] = useState("16k")
  const [deployStep, setDeployStep] = useState(0) // 0: Idle, 1: Deploying, 2: Success
  const [deployLogs, setDeployLogs] = useState<string[]>([])

  // HITL Alert Trigger State
  const [hitlActive, setHitlActive] = useState(true)

  // Auto Scroll ref for terminal
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Sparkline auto-update
  useEffect(() => {
    const timer = setInterval(() => {
      setSparkline(prev => {
        const next = [...prev.slice(1)]
        next.push({
          id: Date.now(),
          height: Math.floor(Math.random() * 70) + 30
        })
        return next
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Velocity dynamic simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setVelocity(prev => ({
        planner: prev.planner.map(v => Math.max(5, Math.min(60, v + (Math.random() > 0.5 ? 5 : -5)))),
        developer: prev.developer.map(v => Math.max(5, Math.min(65, v + (Math.random() > 0.5 ? 8 : -8)))),
        auditor: prev.auditor.map(v => Math.max(5, Math.min(50, v + (Math.random() > 0.5 ? 4 : -4)))),
        tester: prev.tester.map(v => Math.max(5, Math.min(45, v + (Math.random() > 0.5 ? 6 : -6))))
      }))
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  // Active Wait Timer increment
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWait(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Safeguard console periodic events
  useEffect(() => {
    const sampleEvents = [
      { level: "info", text: "CHECKING SYSTEM REGISTRYINTEGRITY... PASS" },
      { level: "info", text: "SYNCING FILESYSTEM ARTIFACTS..." },
      { level: "success", text: "COMPLETED KANBAN TASK SYNC - ALL COLUMNS STABLE" },
      { level: "warning", text: "API INGESTION SPEED REDUCING (LATENCY: 54ms). STANDBY." },
      { level: "info", text: "RUNNING CRON SCHEDULER CHECKS..." },
      { level: "error", text: "PREVENTED OVERFLOW ON STACK RECURSION TARGET: BUILDER-X" },
      { level: "success", text: "RECOVERY RESOLVED - STANDBY THREAD TERMINATED" }
    ] as const

    const timer = setInterval(() => {
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)]
      const now = new Date()
      const timeStr = now.toTimeString().split(" ")[0]
      setLogs(prev => [...prev, { time: timeStr, level: randomEvent.level, text: randomEvent.text }])
    }, 7000)

    return () => clearInterval(timer)
  }, [])

  // Scroll to bottom of terminal when logs change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs, deployLogs])

  const formatDuration = (sec: number) => {
    const hrs = Math.floor(sec / 3600)
    const mins = Math.floor((sec % 3600) / 60)
    const secs = sec % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleDeployAgent = () => {
    if (!newAgentName.trim()) return

    setDeployStep(1)
    setDeployLogs([])

    const steps = [
      `Initializing agent container for '${newAgentName}'...`,
      `Injecting role policies for '${newAgentRole}'...`,
      `Setting context window allocation to ${contextSize}...`,
      `Configuring audit safety strictness parameters to ${strictness}%...`,
      `Registering callback handshake with main orchestrator kernel...`,
      `HANDSHAKE ACCEPTED: Routing active on workspace channel.`,
      `Agent '${newAgentName}' is now active and monitoring factory queues.`
    ]

    steps.forEach((stepText, index) => {
      setTimeout(() => {
        setDeployLogs(prev => [...prev, stepText])
        if (index === steps.length - 1) {
          setDeployStep(2)
          // Add to system logs
          const now = new Date()
          const timeStr = now.toTimeString().split(" ")[0]
          setLogs(prev => [
            ...prev,
            { time: timeStr, level: "success", text: `DEPLOYED NEW AGENT: ${newAgentName.toUpperCase()} (${newAgentRole.toUpperCase()})` }
          ])
        }
      }, (index + 1) * 800)
    })
  }

  const resetDeployForm = () => {
    setIsDeployOpen(false)
    setNewAgentName("")
    setDeployStep(0)
    setDeployLogs([])
  }

  return (
    <PageLayout
      title="Project Telemetry: Cattlesync Platform"
      badge={{ text: "Live Status", variant: "tertiary" }}
      headerActions={
        <button 
          onClick={() => setHitlActive(prev => !prev)}
          className={`px-3 py-1 font-mono text-[11px] font-bold rounded flex items-center gap-1.5 transition-transform scale-95 active:scale-90 ${
            hitlActive 
              ? "bg-secondary/10 text-secondary border border-secondary/30" 
              : "bg-zinc-800 text-zinc-500 border border-zinc-700"
          }`}
        >
          <AlertTriangle className="size-3.5" />
          {hitlActive ? "HITL Alerts Active" : "No Alerts"}
        </button>
      }
    >
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Credit Spend */}
          <div className="bg-[#171f33]/60 backdrop-blur-md border border-border/40 p-5 rounded-xl transition-all hover:shadow-[0_0_15px_-3px_rgba(76,215,246,0.15)] hover:border-primary/30">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Total Credit Spend</span>
              <DollarSign className="size-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-3xl font-bold text-primary tracking-tight">1,420</span>
              <span className="font-mono text-xs text-primary/60">CR</span>
            </div>
            <div className="mt-4 h-12 w-full flex items-end gap-[3px]">
              {sparkline.map((bar) => (
                <div 
                  key={bar.id} 
                  className="flex-1 bg-primary/20 hover:bg-primary transition-all duration-300 rounded-sm"
                  style={{ height: `${bar.height}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Card 2: SDK Execution */}
          <div className="bg-[#171f33]/60 backdrop-blur-md border border-border/40 p-5 rounded-xl transition-all hover:border-secondary/30">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">SDK Execution Time</span>
              <Clock className="size-4 text-secondary" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-3xl font-bold text-white tracking-tight">14h 32m</span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-grow h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-3/4 animate-pulse"></div>
              </div>
              <span className="font-mono text-xs font-semibold text-secondary">+12.4%</span>
            </div>
          </div>

          {/* Card 3: Efficiency */}
          <div className="bg-[#171f33]/60 backdrop-blur-md border border-border/40 p-5 rounded-xl transition-all hover:border-tertiary/30">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Agent Handoff Efficiency</span>
              <Zap className="size-4 text-tertiary" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-3xl font-bold text-tertiary tracking-tight">94.2</span>
              <span className="font-mono text-xs text-tertiary/60">%</span>
            </div>
            <div className="mt-6 text-muted-foreground font-mono text-[11px]">
              Avg Latency: <span className="text-white font-semibold">1.2s</span>
            </div>
          </div>

          {/* Card 4: Failure Rate */}
          <div className="bg-[#171f33]/60 backdrop-blur-md border border-border/40 p-5 rounded-xl transition-all hover:border-destructive/30">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Auditor Failure Rate</span>
              <Shield className="size-4 text-destructive" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-3xl font-bold text-destructive tracking-tight">3</span>
              <span className="font-mono text-xs text-destructive/60 ml-1">Interceptions</span>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive animate-ping"></span>
              <span className="font-mono text-[10px] text-destructive uppercase tracking-wider font-semibold">Requires Attention</span>
            </div>
          </div>

        </div>

        {/* Bento Layout Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Velocity Chart */}
          <div className="lg:col-span-8 bg-[#171f33]/60 backdrop-blur-md border border-border/40 rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 md:p-6 border-b border-border/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Credit &amp; Token Velocity</h3>
                <p className="font-mono text-xs text-muted-foreground">Real-time resource allocation by role</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <span className="font-mono text-[10px] text-muted-foreground">Planner</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span className="font-mono text-[10px] text-muted-foreground">Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="font-mono text-[10px] text-muted-foreground">Auditor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                  <span className="font-mono text-[10px] text-muted-foreground">Tester</span>
                </div>
              </div>
            </div>
            <div className="flex-grow min-h-[320px] p-6 relative flex items-end gap-1.5 md:gap-3 bg-gradient-to-t from-background/40 to-transparent">
              {/* Grid Y lines */}
              <div className="absolute inset-x-6 top-6 bottom-16 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-b border-white"></div>
                <div className="border-b border-white"></div>
                <div className="border-b border-white"></div>
                <div className="border-b border-white"></div>
              </div>

              {/* Chart columns */}
              {velocity.planner.map((_, index) => (
                <div key={index} className="flex-1 flex flex-col justify-end h-[240px] gap-[2px] group relative">
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-popover text-white border border-border/80 p-2 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-nowrap mb-2 shadow-xl">
                    <div className="text-purple-400">Planner: {velocity.planner[index]}%</div>
                    <div className="text-primary">Dev: {velocity.developer[index]}%</div>
                    <div className="text-secondary">Auditor: {velocity.auditor[index]}%</div>
                    <div className="text-tertiary">Tester: {velocity.tester[index]}%</div>
                  </div>

                  <div 
                    className="bg-tertiary/75 hover:bg-tertiary transition-all duration-300 rounded-sm"
                    style={{ height: `${velocity.tester[index]}%` }}
                  ></div>
                  <div 
                    className="bg-secondary/75 hover:bg-secondary transition-all duration-300 rounded-sm"
                    style={{ height: `${velocity.auditor[index]}%` }}
                  ></div>
                  <div 
                    className="bg-primary/75 hover:bg-primary transition-all duration-300 rounded-sm"
                    style={{ height: `${velocity.developer[index]}%` }}
                  ></div>
                  <div 
                    className="bg-purple-500/75 hover:bg-purple-500 transition-all duration-300 rounded-sm"
                    style={{ height: `${velocity.planner[index]}%` }}
                  ></div>
                </div>
              ))}

              {/* Axis Labels */}
              <div className="absolute bottom-4 inset-x-6 flex justify-between text-[9px] font-mono text-muted-foreground uppercase opacity-60">
                <span>08:00 AM</span>
                <span>10:00 AM</span>
                <span>12:00 PM</span>
                <span>02:00 PM</span>
                <span>04:00 PM</span>
                <span>Current</span>
              </div>
            </div>
          </div>

          {/* Human Intervention Gauge */}
          <div className="lg:col-span-4 bg-[#171f33]/60 backdrop-blur-md border border-border/40 rounded-xl p-6 flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full text-left">
              <h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Human Intervention Ratio</h3>
            </div>
            
            <div className="relative w-44 h-44 flex items-center justify-center my-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  className="text-zinc-800" 
                  cx="88" 
                  cy="88" 
                  fill="transparent" 
                  r="72" 
                  stroke="currentColor" 
                  strokeWidth="10"
                ></circle>
                <circle 
                  className="text-primary transition-all duration-1000" 
                  cx="88" 
                  cy="88" 
                  fill="transparent" 
                  r="72" 
                  stroke="currentColor" 
                  strokeDasharray="452" 
                  strokeDashoffset="352" // Represents 22%
                  strokeWidth="10"
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-bold text-white">22%</span>
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mt-1">Intervention</span>
              </div>
            </div>

            <div className="w-full space-y-3">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">Active Wait Time</span>
                <span className="text-primary font-bold">{formatDuration(activeWait)}</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[22%]"></div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center italic leading-tight">
                AI autonomy sustained for 78% of session. System currently waiting for HITL approval on production deployer task.
              </p>
            </div>
          </div>

          {/* Process Quality & Logs */}
          <div className="lg:col-span-6 bg-[#171f33]/60 backdrop-blur-md border border-border/40 rounded-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-border/40 flex items-center gap-2">
              <Shield className="size-4 text-secondary" />
              <h3 className="text-base font-bold text-white tracking-tight">Auditor Enforcement Index</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#131b2e] p-3 border border-border/30 rounded-lg">
                  <div className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Deviation Score</div>
                  <div className="font-mono text-lg font-bold text-secondary">4.2 <span className="text-xs text-muted-foreground font-normal">/ 10</span></div>
                </div>
                <div className="bg-[#131b2e] p-3 border border-border/30 rounded-lg">
                  <div className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Enforcement Success</div>
                  <div className="font-mono text-lg font-bold text-tertiary">100%</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-red-950/20 border-l-2 border-destructive rounded-r-lg">
                  <Shield className="size-4 text-destructive shrink-0 mt-0.5" />
                  <div className="flex-grow">
                    <div className="font-mono text-xs font-bold text-white uppercase">UNAUTHORIZED TOKEN ACCESS PREVENTED</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Agent 'Dev-04' attempted to read Production Vault parameters.</div>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 shrink-0">14:22:11</span>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-amber-950/20 border-l-2 border-secondary rounded-r-lg">
                  <Shield className="size-4 text-secondary shrink-0 mt-0.5" />
                  <div className="flex-grow">
                    <div className="font-mono text-xs font-bold text-white uppercase">NAMING CONVENTION CORRECTION</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Re-indexed 14 variables to match platform database schemas.</div>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 shrink-0">13:05:04</span>
                </div>
              </div>
            </div>
          </div>

          {/* Runaway Loop Safeguard */}
          <div className="lg:col-span-6 bg-black border border-border/40 rounded-xl overflow-hidden flex flex-col min-h-[300px]">
            <div className="px-4 py-2 bg-[#131b2e] flex items-center justify-between border-b border-border/20">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white font-bold">Safeguard Log: Recursive Prevention</span>
              </div>
              <span className="font-mono text-[9px] text-zinc-500 uppercase">v4.0_Safe_Kernel</span>
            </div>
            
            <div className="flex-grow p-4 font-mono text-xs text-tertiary overflow-y-auto max-h-[220px] space-y-1 select-none">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-2 leading-relaxed">
                  <span className="text-zinc-600">[{log.time}]</span>
                  <span className={
                    log.level === "error" ? "text-destructive font-semibold" :
                    log.level === "warning" ? "text-secondary" :
                    log.level === "success" ? "text-tertiary font-medium" :
                    "text-muted-foreground"
                  }>
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
              <div className="inline-block w-1.5 h-3 bg-tertiary animate-ping ml-1"></div>
            </div>

            <div className="p-3 border-t border-border/20 bg-[#060e20] flex flex-col sm:flex-row justify-between gap-2 text-[9px] font-mono text-muted-foreground uppercase">
              <span>Total Debug Loops Blocked Today: 12</span>
              <span>Savings: ~420.5 CR</span>
            </div>
          </div>

        </div>

        {/* Deploy New Agent Banner / CTA */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-tertiary/10 border border-primary/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Scale Orchestration Environment
            </h3>
            <p className="text-xs text-muted-foreground">
              Add specialized planner, developer, auditor, or testing units directly to active workspace queues.
            </p>
          </div>
          <button 
            onClick={() => setIsDeployOpen(true)}
            className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg text-xs hover:bg-primary/95 transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-primary/15"
          >
            <Plus className="size-4" />
            Deploy New Agent
          </button>
        </div>



      {/* Deploy Agent Dialog / Modal */}
      {isDeployOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-[100] animate-fadeIn">
          <div className="bg-[#171f33] border border-border/80 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl relative">
            <div className="p-5 border-b border-border/40 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Deploy Workspace Agent</h3>
              </div>
              <button 
                onClick={resetDeployForm}
                className="text-muted-foreground hover:text-white p-1 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {deployStep === 0 && (
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-muted-foreground uppercase">Agent Identifier</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Developer-06, Planner-Beta"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    className="w-full bg-[#131b2e] border border-border/60 rounded px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-muted-foreground uppercase">Target Role</label>
                    <select 
                      value={newAgentRole}
                      onChange={(e) => setNewAgentRole(e.target.value)}
                      className="w-full bg-[#131b2e] border border-border/60 rounded px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                    >
                      <option value="Planner">Planner</option>
                      <option value="Developer">Developer</option>
                      <option value="Auditor">Auditor</option>
                      <option value="Tester">Tester</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-muted-foreground uppercase">Context Allocation</label>
                    <select 
                      value={contextSize}
                      onChange={(e) => setContextSize(e.target.value)}
                      className="w-full bg-[#131b2e] border border-border/60 rounded px-3 py-2 text-xs focus:outline-none focus:border-primary text-white"
                    >
                      <option value="4k">4k tokens</option>
                      <option value="8k">8k tokens</option>
                      <option value="16k">16k tokens</option>
                      <option value="32k">32k tokens</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-muted-foreground uppercase">Auditor Strictness Compliance</span>
                    <span className="text-secondary font-bold">{strictness}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={strictness}
                    onChange={(e) => setStrictness(parseInt(e.target.value))}
                    className="w-full accent-secondary bg-zinc-800 h-1 rounded"
                  />
                  <p className="text-[9px] text-muted-foreground italic">
                    Strictness forces token/tool compliance checking to prevent infinite loops and unauthorized directory modification.
                  </p>
                </div>

                <div className="pt-4 border-t border-border/20 flex justify-end gap-3">
                  <button 
                    onClick={resetDeployForm}
                    className="px-4 py-2 border border-border/60 hover:bg-zinc-800 text-white font-medium rounded text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDeployAgent}
                    disabled={!newAgentName.trim()}
                    className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded text-xs hover:bg-primary/95 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Deploy Container
                  </button>
                </div>
              </div>
            )}

            {deployStep === 1 && (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                  <span className="text-xs font-mono text-white">Deploying container virtual machines...</span>
                </div>
                <div className="bg-black p-4 rounded border border-border/40 font-mono text-[11px] text-tertiary h-[180px] overflow-y-auto space-y-1">
                  {deployLogs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-zinc-600">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <div className="w-1 h-3 bg-tertiary animate-pulse inline-block"></div>
                </div>
              </div>
            )}

            {deployStep === 2 && (
              <div className="p-6 space-y-6 text-center">
                <div className="w-12 h-12 bg-tertiary/10 border border-tertiary/20 text-tertiary rounded-full flex items-center justify-center mx-auto">
                  <Check className="size-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Deployment Successful</h4>
                  <p className="text-xs text-muted-foreground">
                    Agent '{newAgentName}' has joined the live orchestrator group.
                  </p>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={resetDeployForm}
                    className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded text-xs hover:bg-primary/95 transition-colors"
                  >
                    Return to Telemetry
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </PageLayout>
  )
}
