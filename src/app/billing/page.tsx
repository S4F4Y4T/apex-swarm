"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  DollarSign, 
  Zap, 
  ArrowRight, 
  Terminal as TerminalIcon, 
  Play, 
  Pause,
  RefreshCw,
  Check
} from "lucide-react"
import PageLayout from "@/components/PageLayout"

interface TerminalLog {
  time: string
  text: string
  type: "info" | "success" | "warn" | "accent"
}

interface AgentConsumption {
  id: string
  name: string
  cost: number
  description: string
  agentName: string
  isActive: boolean
  role: "dev" | "auditor" | "tester" | "planner"
}

export default function BillingPage() {
  // Available Credit Balance
  const [balance, setBalance] = useState(3760.00)
  const [selectedTier, setSelectedTier] = useState(1000)
  const [isTransferring, setIsTransferring] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState(false)

  // Agent consumption list
  const [agents, setAgents] = useState<AgentConsumption[]>([
    {
      id: "1",
      name: "Alpha Data Scraper",
      cost: 120,
      description: "Continuous monitoring of 14 target domains.",
      agentName: "Extractor_Prime",
      isActive: true,
      role: "dev"
    },
    {
      id: "2",
      name: "Q3 Financial Report Gen",
      cost: 45,
      description: "Batch processing transactional ledger data.",
      agentName: "Calc_Node_A",
      isActive: true,
      role: "planner"
    },
    {
      id: "3",
      name: "Auto Lint Safeguard Daemon",
      cost: 85,
      description: "Static analysis and auto-reindexing validation.",
      agentName: "Auditor_Core",
      isActive: true,
      role: "auditor"
    }
  ])

  // Pre-flight terminal logs
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    { time: "08:42:11", text: "INIT pre_flight_estimation()", type: "info" },
    { time: "08:42:12", text: "Analyzing dependency graph [34 nodes]...", type: "info" },
    { time: "08:42:12", text: "Node #12 (Deep Data Merge) high token variance.", type: "warn" },
    { time: "08:42:14", text: "Estimating Cognitive Load... Complete.", type: "success" },
    { time: "08:42:15", text: "--- CORE LOGIC PHASE COST PROJECTION ---", type: "accent" },
    { time: "08:42:15", text: "Estimated Tokens: 450K IN / 120K OUT", type: "info" },
    { time: "08:42:15", text: "Projected Orchestration Time: 4.2m", type: "info" },
    { time: "08:42:15", text: "TOTAL ESTIMATE: 28.5 Credits", type: "success" },
    { time: "08:42:16", text: "Actual (Last Run): 29.1 Credits (± 2.1%)", type: "info" }
  ])

  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Simulation of active compute costs subtracting from balance slowly
  useEffect(() => {
    const timer = setInterval(() => {
      // Calculate active rate per second
      const activeDailyCost = agents
        .filter(a => a.isActive)
        .reduce((acc, curr) => acc + curr.cost, 0)
      
      const costPerSec = activeDailyCost / 86400 // convert daily cost to per second
      
      setBalance(prev => Math.max(0, prev - costPerSec))
    }, 1000)

    return () => clearInterval(timer)
  }, [agents])

  // Terminal log additions
  useEffect(() => {
    const sampleLogs = [
      { text: "Recalculating runtime cognitive load multipliers...", type: "info" as const },
      { text: "Handshake completed with central telemetry node.", type: "success" as const },
      { text: "Credit utilization quota warnings reset.", type: "success" as const },
      { text: "Executing pre-flight lock checks on Sandbox-B...", type: "info" as const },
      { text: "Estimated compute overhead matches limits (± 0.4%).", type: "success" as const },
      { text: "Warning: High request volume detected. Scaled ratelimits.", type: "warn" as const }
    ]

    const timer = setInterval(() => {
      const log = sampleLogs[Math.floor(Math.random() * sampleLogs.length)]
      const now = new Date()
      const timeStr = now.toTimeString().split(" ")[0]
      setTerminalLogs(prev => [...prev, { time: timeStr, text: log.text, type: log.type }])
    }, 9000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [terminalLogs])

  const handleExecuteTransfer = () => {
    setIsTransferring(true)
    setTimeout(() => {
      setBalance(prev => prev + selectedTier)
      setIsTransferring(false)
      setTransferSuccess(true)
      
      // Log in terminal
      const now = new Date()
      const timeStr = now.toTimeString().split(" ")[0]
      setTerminalLogs(prev => [
        ...prev,
        { time: timeStr, text: `BALANCE ADJUSTED: SUCCESSFUL DEPOSIT OF $${selectedTier}.00`, type: "success" }
      ])

      setTimeout(() => setTransferSuccess(false), 3000)
    }, 1500)
  }

  const toggleAgent = (id: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.isActive
        // Log status change
        const now = new Date()
        const timeStr = now.toTimeString().split(" ")[0]
        setTerminalLogs(prevLogs => [
          ...prevLogs,
          { time: timeStr, text: `CONTAINER '${a.name.toUpperCase()}' STATE CHANGE -> ${nextState ? "ONLINE" : "OFFLINE"}`, type: nextState ? "success" : "warn" }
        ])
        return { ...a, isActive: nextState }
      }
      return a
    }))
  }

  const activeDailyCost = agents
    .filter(a => a.isActive)
    .reduce((acc, curr) => acc + curr.cost, 0)

  return (
    <PageLayout
      title="Billing & Compute Capacity"
      badge={{ text: "Engine Online", variant: "tertiary" }}
    >
        
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="font-semibold text-xl text-white tracking-tight">Utility Dashboard</h2>
            <p className="font-mono text-xs text-muted-foreground mt-1">ENGINE STATUS: <span className="text-tertiary">ONLINE</span> // CYCLE: 8842</p>
          </div>
        </div>

        {/* Balance & Top-Up Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Current Balance */}
          <div className="lg:col-span-4 bg-[#171f33]/60 backdrop-blur-md border border-border/40 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-transparent"></div>
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Available Credits</span>
              <div className="relative flex items-center justify-center w-4 h-4">
                <div className="absolute w-full h-full rounded-full bg-tertiary/20 animate-ping"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
              </div>
            </div>
            <div className="font-mono text-4xl font-extrabold text-primary tracking-tight">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Based on active consumption of <span className="text-white font-medium">{activeDailyCost} CR/day</span>, you have approx. <span className="text-white font-medium">{(balance / (activeDailyCost || 1)).toFixed(1)} days</span> of capacity remaining.
            </p>
          </div>

          {/* Top-Up Inject Compute */}
          <div className="lg:col-span-8 bg-[#171f33]/60 backdrop-blur-md border border-border/40 p-6 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="size-4 text-primary animate-pulse" />
                Inject Compute Capacity
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Provision additional computational credits directly to the global factory environment pool.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-4 mt-2">
              <div className="w-full sm:flex-1">
                <label className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider mb-2 block">Select Tier</label>
                <div className="flex gap-2">
                  {[500, 1000, 5000].map((tier) => (
                    <button 
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`flex-1 py-2 rounded text-xs font-mono font-medium transition-all ${
                        selectedTier === tier 
                          ? "bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(76,215,246,0.2)]" 
                          : "bg-[#131b2e] border border-border/60 text-muted-foreground hover:text-white hover:border-primary/50"
                      }`}
                    >
                      +${tier.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={handleExecuteTransfer}
                disabled={isTransferring}
                className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold py-2 px-6 rounded text-xs transition-all h-[36px] flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary/95 hover:shadow-[0_0_15px_rgba(76,215,246,0.2)]"
              >
                {isTransferring ? (
                  <>
                    <RefreshCw className="size-3.5 animate-spin" />
                    Executing...
                  </>
                ) : transferSuccess ? (
                  <>
                    <Check className="size-3.5 text-tertiary" />
                    Success!
                  </>
                ) : (
                  <>
                    Execute Transfer
                    <ArrowRight className="size-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Consumption breakdown & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Consumption Chart */}
          <div className="bg-[#171f33]/60 backdrop-blur-md border border-border/40 p-6 rounded-xl">
            <h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6">30-Day Consumption by Tier</h3>
            
            <div className="space-y-5">
              {/* Orchestration */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-white">Orchestration (Manager Agents)</span>
                  <span className="text-primary font-semibold">1,240 CR</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: "45%" }}></div>
                </div>
              </div>

              {/* Cognitive */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-white">Cognitive (LLM Inference)</span>
                  <span className="text-purple-400 font-semibold">890 CR</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: "32%" }}></div>
                </div>
              </div>

              {/* Execution */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-white">Execution (Tools &amp; Scripts)</span>
                  <span className="text-secondary font-semibold">420 CR</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-2 rounded-full transition-all duration-500" style={{ width: "15%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-flight estimations terminal */}
          <div className="bg-black border border-border/40 rounded-xl p-4 font-mono text-xs flex flex-col h-64 overflow-hidden relative">
            <div className="flex justify-between items-center border-b border-border/20 pb-2 mb-2">
              <span className="text-muted-foreground uppercase text-[9px] tracking-wider">Terminal / Pre-Flight Core Logic</span>
              <TerminalIcon className="size-3.5 text-zinc-500" />
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-1 text-zinc-400 terminal-scroll">
              {terminalLogs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-zinc-600">[{log.time}]</span>
                  <span className={
                    log.type === "warn" ? "text-secondary font-semibold" :
                    log.type === "success" ? "text-tertiary" :
                    log.type === "accent" ? "text-white font-bold" :
                    "text-zinc-400"
                  }>
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
              <div className="inline-block w-1.5 h-3 bg-tertiary animate-pulse ml-1"></div>
            </div>
          </div>

        </div>

        {/* Active deployments cards */}
        <div>
          <h3 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4">Active Deployments Consuming Credits</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div 
                key={agent.id}
                className={`bg-[#171f33]/60 backdrop-blur-md rounded-lg border border-border/40 p-5 transition-all relative ${
                  agent.isActive 
                    ? agent.role === "dev" ? "border-t-2 border-t-primary" :
                      agent.role === "auditor" ? "border-t-2 border-t-secondary" :
                      "border-t-2 border-t-tertiary"
                    : "border-t-2 border-t-zinc-600 opacity-60"
                }`}
              >
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h4 className="font-bold text-white text-sm">{agent.name}</h4>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded shrink-0 ${
                    agent.isActive 
                      ? agent.role === "dev" ? "text-primary bg-primary/10" :
                        agent.role === "auditor" ? "text-secondary bg-secondary/10" :
                        "text-tertiary bg-tertiary/10"
                      : "text-zinc-500 bg-zinc-800"
                  }`}>
                    -{agent.cost} CR/d
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4 min-h-[32px]">{agent.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center border border-border/30 relative">
                      <span className="font-mono text-[8px] text-white">AI</span>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-background ${
                        agent.isActive ? "bg-tertiary" : "bg-zinc-500"
                      }`}></span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">Agent: {agent.agentName}</span>
                  </div>

                  <button 
                    onClick={() => toggleAgent(agent.id)}
                    className={`p-1.5 rounded border transition-colors ${
                      agent.isActive 
                        ? "border-border hover:bg-zinc-800 text-muted-foreground hover:text-white" 
                        : "border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                    title={agent.isActive ? "Pause Container" : "Resume Container"}
                  >
                    {agent.isActive ? <Pause className="size-3" /> : <Play className="size-3" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

    </PageLayout>
  )
}
