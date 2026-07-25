"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  Play, 
  Square, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  KanbanSquare, 
  MessageSquare, 
  Settings, 
  Database, 
  TrendingUp, 
  Send, 
  Cpu, 
  Layers, 
  DollarSign, 
  XCircle, 
  Plus, 
  RefreshCw, 
  Sliders, 
  Eye, 
  X,
  Check,
  Circle
} from "lucide-react"

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card"

import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Types
interface LogMessage {
  id: string
  timestamp: string
  level: "info" | "warning" | "error" | "success"
  source: string
  message: string
}

interface ChatMessage {
  id: string
  sender: "user" | "agent"
  agentName?: string
  avatar?: string
  message: string
  timestamp: string
  status?: "running" | "done" | "waiting"
}

interface KanbanTask {
  id: string
  title: string
  agent: string
  agentAvatar: string
  status: "backlog" | "analysis" | "progress" | "verification" | "done"
  priority: "low" | "medium" | "high" | "critical"
  progress: number
}

export default function Dashboard() {
  // Active tab state
  const [activeTab, setActiveTab] = useState<string>("kanban")

  // System stats state
  const [cpuUsage, setCpuUsage] = useState<number>(42)
  const [memoryUsage, setMemoryUsage] = useState<number>(68)
  const [activeAgentsCount, setActiveAgentsCount] = useState<number>(3)
  const [latency, setLatency] = useState<number>(124)
  const [totalCost, setTotalCost] = useState<number>(142.50)

  // HITL (Human-in-the-loop) Approval State
  const [hitlPending, setHitlPending] = useState<boolean>(true)
  const [hitlStatus, setHitlStatus] = useState<"pending" | "approved" | "rejected">("pending")

  // Kanban Tasks
  const [tasks, setTasks] = useState<KanbanTask[]>([
    {
      id: "t1",
      title: "Sync local database schema to staging server",
      agent: "Cattlesync Agent",
      agentAvatar: "🐮",
      status: "verification",
      priority: "high",
      progress: 90
    },
    {
      id: "t2",
      title: "Investigate Jest test runner memory leaks",
      agent: "QA Architect",
      agentAvatar: "🔍",
      status: "progress",
      priority: "medium",
      progress: 65
    },
    {
      id: "t3",
      title: "Deploy ERP Dashboard core module API",
      agent: "ERP Deployer",
      agentAvatar: "🚀",
      status: "progress",
      priority: "critical",
      progress: 40
    },
    {
      id: "t4",
      title: "Refactor telemetry pipeline hooks",
      agent: "Telemetry Agent",
      agentAvatar: "📈",
      status: "analysis",
      priority: "low",
      progress: 15
    },
    {
      id: "t5",
      title: "Configure security secrets rotating cron",
      agent: "SecOps Agent",
      agentAvatar: "🛡️",
      status: "backlog",
      priority: "high",
      progress: 0
    }
  ])

  // Logs state
  const [logs, setLogs] = useState<LogMessage[]>([
    { id: "l1", timestamp: "15:07:05", level: "info", source: "System", message: "Initialize Agentic Software Factory orchestrator..." },
    { id: "l2", timestamp: "15:07:06", level: "success", source: "DB", message: "Connected to PostgreSQL database instance." },
    { id: "l3", timestamp: "15:07:12", level: "info", source: "Cattlesync", message: "Cattlesync Agent triggered for schema migration task." },
    { id: "l4", timestamp: "15:07:15", level: "warning", source: "QA Architect", message: "Jest test suite reported 12% memory usage elevation." },
    { id: "l5", timestamp: "15:07:30", level: "info", source: "System", message: "HITL event created: ERP Deployer requires production deployment approval." },
  ])

  const [logFilter, setLogFilter] = useState<string>("all")

  // Chat state
  const [chatInput, setChatInput] = useState<string>("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "c1",
      sender: "agent",
      agentName: "Factory Lead",
      avatar: "⚙️",
      message: "Welcome operator! I'm Factory Lead. What modules or automated pipelines would you like to run today? You can monitor telemetry, view code tasks on the Kanban board, or check live logs.",
      timestamp: "15:07:10"
    }
  ])

  const [isTyping, setIsTyping] = useState<boolean>(false)

  // Factory Settings state
  const [companyName, setCompanyName] = useState<string>("JSRM Enterprises Ltd.")
  const [missionScope, setMissionScope] = useState<string>("Enterprise resource planning automation with a focus on supply chain transparency and autonomous fiscal reconciliation.")
  const [voiceTone, setVoiceTone] = useState<string>("Technical Professional (High Density)")
  const [strictnessLevel, setStrictnessLevel] = useState<number>(4)
  const [unitTestsEnforced, setUnitTestsEnforced] = useState<boolean>(true)
  const [docsGenerationEnforced, setDocsGenerationEnforced] = useState<boolean>(true)
  const [ddasEnabled, setDdasEnabled] = useState<boolean>(false)
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false)

  // Auto-scroll for logs and chat
  const logsEndRef = useRef<HTMLDivElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeTab === "logs") {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs, activeTab])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Simulate Telemetry adjustments
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const delta = Math.floor(Math.random() * 9) - 4
        return Math.min(Math.max(prev + delta, 15), 95)
      })
      setMemoryUsage(prev => {
        const delta = Math.floor(Math.random() * 3) - 1
        return Math.min(Math.max(prev + delta, 50), 85)
      })
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 15) - 7
        return Math.min(Math.max(prev + delta, 90), 220)
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Auto-generate some log entries occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      const sources = ["System", "Cattlesync", "ERP Deployer", "SecOps Agent", "Telemetry Agent"]
      const source = sources[Math.floor(Math.random() * sources.length)]
      
      const infos = [
        "Analyzing project directory schema patterns.",
        "Resource utilization metrics flushed to telemetry storage.",
        "Checking health endpoints for deployment services.",
        "Scraping logs from local agent workers.",
        "Updating build status mapping details."
      ]
      
      const now = new Date()
      const timestamp = now.toTimeString().split(' ')[0]
      
      setLogs(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          timestamp,
          level: "info",
          source,
          message: infos[Math.floor(Math.random() * infos.length)]
        }
      ])
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Handle human-in-the-loop approval
  const handleApproval = (approved: boolean) => {
    const now = new Date()
    const timestamp = now.toTimeString().split(' ')[0]

    if (approved) {
      setHitlStatus("approved")
      setHitlPending(false)
      
      // Update Kanban task status for ERP Deployer
      setTasks(prev => 
        prev.map(t => t.id === "t3" ? { ...t, status: "done", progress: 100 } : t)
      )

      // Add to logs
      setLogs(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          timestamp,
          level: "success",
          source: "ERP Deployer",
          message: "HITL APPROVED: Deployment of ERP core module API initiated. Status: Deployed."
        }
      ])

      // Add agent chat message
      setChatMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "agent",
          agentName: "ERP Deployer",
          avatar: "🚀",
          message: "Thank you for the approval! The ERP Dashboard core module has been compiled and deployed successfully to production. Pipeline health: 100%.",
          timestamp
        }
      ])

      setTotalCost(prev => prev + 0.15)
    } else {
      setHitlStatus("rejected")
      setHitlPending(false)

      setTasks(prev => 
        prev.map(t => t.id === "t3" ? { ...t, progress: 40, priority: "high" } : t)
      )

      setLogs(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          timestamp,
          level: "error",
          source: "ERP Deployer",
          message: "HITL REJECTED: Deployment of ERP core module API aborted by operator request."
        }
      ])

      setChatMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "agent",
          agentName: "ERP Deployer",
          avatar: "🚀",
          message: "Understood. The production deployment has been aborted. I have reverted the pipeline state to 'Pending Manual Intervention' and flagged the task priority.",
          timestamp
        }
      ])
    }
  }

  // Handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const now = new Date()
    const timestamp = now.toTimeString().split(' ')[0]

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      message: chatInput,
      timestamp
    }

    setChatMessages(prev => [...prev, userMsg])
    const currentInput = chatInput.toLowerCase()
    setChatInput("")
    setIsTyping(true)

    // Simulate Agent responses based on keyword input
    setTimeout(() => {
      let reply = ""
      let senderName = "Factory Lead"
      let avatar = "⚙️"

      if (currentInput.includes("cattlesync") || currentInput.includes("sync")) {
        senderName = "Cattlesync Agent"
        avatar = "🐮"
        reply = "I am actively monitoring the staging sync pipeline. DB schemas are 98% aligned. Would you like me to trigger a dry-run check or view full reports?"
      } else if (currentInput.includes("task") || currentInput.includes("kanban") || currentInput.includes("add")) {
        // Add a new task dynamically as proof of interaction!
        const newTaskId = "t" + (tasks.length + 1)
        const newTask: KanbanTask = {
          id: newTaskId,
          title: "Optimize API router compression weights",
          agent: "Performance Agent",
          agentAvatar: "⚡",
          status: "backlog",
          priority: "medium",
          progress: 0
        }
        setTasks(prev => [...prev, newTask])
        
        reply = `Certainly! I've added a new task to the backlog: "Optimize API router compression weights". You can check it under the Kanban Board view.`
        
        setLogs(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            timestamp,
            level: "success",
            source: "System",
            message: `User created new backlog task: ${newTask.title}`
          }
        ])
      } else if (currentInput.includes("status") || currentInput.includes("health")) {
        reply = `The factory systems are currently healthy. Current CPU usage is ${cpuUsage}%, Memory load is ${memoryUsage}%. The ERP deployment task was ${hitlStatus === "approved" ? "successfully deployed" : "halted"}.`
      } else if (currentInput.includes("settings") || currentInput.includes("rules") || currentInput.includes("scope")) {
        reply = `Current Factory Settings: Entity Name: "${companyName}", SDLC Strictness: Level ${strictnessLevel}. Unit tests are ${unitTestsEnforced ? "ENFORCED" : "OPTIONAL"}. Docs generation is ${docsGenerationEnforced ? "ENFORCED" : "OPTIONAL"}.`
      } else if (currentInput.includes("log") || currentInput.includes("error")) {
        reply = "There is one active warning regarding Jest runner memory leaks. I recommend scheduling an optimization run to profile the garbage collection cycle."
      } else {
        reply = "I've registered your instructions. Initiating a scan on active agent channels. Let me know if you want me to update the Kanban board, trigger logs, or check telemetry."
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "agent",
          agentName: senderName,
          avatar,
          message: reply,
          timestamp
        }
      ])
      setIsTyping(false)
      setTotalCost(prev => prev + 0.04)
    }, 1500)
  }

  // Filtered Logs
  const filteredLogs = logs.filter(log => {
    if (logFilter === "all") return true
    return log.level === logFilter
  })

  // Kanban task column sorting
  const getTasksByStatus = (status: KanbanTask["status"]) => {
    return tasks.filter(task => task.status === status)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      
      {/* Top Premium Header */}
      <header className="border-b border-border/40 bg-background/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/20">
            <Layers className="size-5 text-primary-foreground font-bold" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Agentic Software Factory <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">ACTIVE</Badge>
            </h1>
            <p className="text-xs text-muted-foreground font-mono">Project Workspace ID: 4292011975347891523</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-tertiary relative after:absolute after:inset-0 after:rounded-full after:bg-tertiary after:animate-ping"></span>
            <span className="text-xs font-mono font-semibold text-tertiary uppercase tracking-wider">Live System Sync</span>
          </div>
          <span className="text-white/10 hidden sm:inline">|</span>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-muted-foreground">CREDITS CONSUMPTION:</span>
            <span className="text-secondary font-bold">${totalCost.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid Layout */}
      <main className="max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow">
        
        {/* Left Sidebar: Telemetry & METRICS (1 Column wide on desktop) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* HITL Human Intervention Required Alert */}
          {hitlPending && (
            <Card className="border-secondary/40 bg-secondary/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-secondary flex items-center gap-2 text-sm font-semibold">
                  <AlertTriangle className="size-4 shrink-0" />
                  Manual Approval Pending
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  ERP Deployer / production build
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  The automated test validation has passed. Production deployment authorization is requested for the ERP core module.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 justify-end pt-3 bg-secondary/10 border-t border-secondary/20">
                <Button 
                  size="xs" 
                  variant="destructive" 
                  onClick={() => handleApproval(false)}
                >
                  <X className="size-3" />
                  Reject
                </Button>
                <Button 
                  size="xs" 
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  onClick={() => handleApproval(true)}
                >
                  <Check className="size-3" />
                  Approve
                </Button>
              </CardFooter>
            </Card>
          )}

          {!hitlPending && (
            <Card className={`border-t-4 ${hitlStatus === "approved" ? "border-t-tertiary bg-tertiary/5" : "border-t-destructive bg-destructive/5"}`}>
              <CardHeader className="pb-2">
                <CardTitle className={`flex items-center gap-2 text-sm font-semibold ${hitlStatus === "approved" ? "text-tertiary" : "text-destructive"}`}>
                  {hitlStatus === "approved" ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
                  HITL Decided
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3 text-xs text-muted-foreground">
                Action on ERP deployment was <strong>{hitlStatus.toUpperCase()}</strong>. System registers updated pipeline nodes.
              </CardContent>
            </Card>
          )}

          {/* Live Telemetry Card */}
          <Card>
            <CardHeader className="border-b border-border/10 pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Activity className="size-4 text-primary" />
                Live Telemetry
              </CardTitle>
              <CardDescription className="text-[10px] font-mono text-muted-foreground uppercase">
                Ghost in the Machine Logs
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col gap-4">
              
              {/* CPU */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-muted-foreground"><Cpu className="size-3.5" /> CPU LOAD</span>
                  <span className="font-bold text-white">{cpuUsage}%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-1000" 
                    style={{ width: `${cpuUsage}%` }}
                  ></div>
                </div>
              </div>

              {/* Memory */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-muted-foreground"><Database className="size-3.5" /> MEMORY UTIL</span>
                  <span className="font-bold text-white">{memoryUsage}%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-tertiary h-full transition-all duration-1000" 
                    style={{ width: `${memoryUsage}%` }}
                  ></div>
                </div>
              </div>

              {/* Latency */}
              <div className="flex justify-between items-center border-t border-border/10 pt-3 text-xs font-mono">
                <span className="text-muted-foreground">NODE LATENCY:</span>
                <span className="text-white font-bold">{latency} ms</span>
              </div>

              {/* Active instances */}
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-muted-foreground">RUNNING AGENTS:</span>
                <span className="text-primary font-bold">{activeAgentsCount} nodes</span>
              </div>
            </CardContent>
          </Card>

          {/* System Overview Details */}
          <Card className="bg-surface-container/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground font-mono uppercase">
                Active Modules Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs font-mono flex flex-col gap-2.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cattlesync Sync:</span>
                <Badge className="bg-tertiary/10 text-tertiary border-tertiary/20 hover:bg-tertiary/20">Synced</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ERP Deployment:</span>
                <Badge className={hitlStatus === "approved" ? "bg-tertiary/10 text-tertiary border-tertiary/20" : "bg-secondary/10 text-secondary border-secondary/20"}>
                  {hitlStatus === "approved" ? "Deployed" : "Suspended"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">QA Leak Check:</span>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20">Investigating</Badge>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Side: Interaction Console & Workspace Tabs (3 Columns wide) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-4">
              <TabsList className="bg-muted/50 p-0.5">
                <TabsTrigger value="kanban" className="data-active:bg-background">
                  <KanbanSquare className="size-4" data-icon="inline-start" />
                  Kanban Board
                </TabsTrigger>
                <TabsTrigger value="logs" className="data-active:bg-background">
                  <Terminal className="size-4" data-icon="inline-start" />
                  Live Logs
                </TabsTrigger>
                <TabsTrigger value="chat" className="data-active:bg-background">
                  <MessageSquare className="size-4" data-icon="inline-start" />
                  Agent Chat
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-active:bg-background">
                  <Settings className="size-4" data-icon="inline-start" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">Current View:</span>
                <Badge variant="outline" className="border-border font-mono text-[10px] text-white">
                  {activeTab.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* TAB 1: KANBAN BOARD */}
            <TabsContent value="kanban" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                
                {/* Column: Backlog */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-border/20 pb-2">
                    <span className="text-xs font-mono font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                      <Circle className="size-3 text-slate-500 fill-slate-500" />
                      Backlog ({getTasksByStatus("backlog").length})
                    </span>
                    <Button 
                      size="icon-xs" 
                      variant="ghost"
                      onClick={() => {
                        const newTaskId = "t" + (tasks.length + 1)
                        const newTask: KanbanTask = {
                          id: newTaskId,
                          title: "Flush cache logs and optimize buffers",
                          agent: "System Agent",
                          agentAvatar: "🤖",
                          status: "backlog",
                          priority: "low",
                          progress: 0
                        }
                        setTasks(prev => [...prev, newTask])
                      }}
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-col gap-3 min-h-[300px]">
                    {getTasksByStatus("backlog").map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    {getTasksByStatus("backlog").length === 0 && (
                      <div className="text-center py-8 text-xs text-muted-foreground border border-dashed border-border/20 rounded-lg">
                        No backlog tasks
                      </div>
                    )}
                  </div>
                </div>

                {/* Column: Agent Analysis */}
                <div className="flex flex-col gap-3">
                  <div className="border-b border-border/20 pb-2">
                    <span className="text-xs font-mono font-bold text-primary uppercase flex items-center gap-1.5">
                      <Circle className="size-3 text-primary fill-primary" />
                      Analysis ({getTasksByStatus("analysis").length})
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-3 min-h-[300px]">
                    {getTasksByStatus("analysis").map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    {getTasksByStatus("analysis").length === 0 && (
                      <div className="text-center py-8 text-xs text-muted-foreground border border-dashed border-border/20 rounded-lg">
                        Empty column
                      </div>
                    )}
                  </div>
                </div>

                {/* Column: In-Progress */}
                <div className="flex flex-col gap-3">
                  <div className="border-b border-border/20 pb-2">
                    <span className="text-xs font-mono font-bold text-secondary uppercase flex items-center gap-1.5">
                      <Circle className="size-3 text-secondary fill-secondary" />
                      Running ({getTasksByStatus("progress").length})
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-3 min-h-[300px]">
                    {getTasksByStatus("progress").map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    {getTasksByStatus("progress").length === 0 && (
                      <div className="text-center py-8 text-xs text-muted-foreground border border-dashed border-border/20 rounded-lg">
                        No running agents
                      </div>
                    )}
                  </div>
                </div>

                {/* Column: Verification */}
                <div className="flex flex-col gap-3">
                  <div className="border-b border-border/20 pb-2">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase flex items-center gap-1.5">
                      <Circle className="size-3 text-blue-400 fill-blue-400" />
                      Verification ({getTasksByStatus("verification").length})
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-3 min-h-[300px]">
                    {getTasksByStatus("verification").map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    {getTasksByStatus("verification").length === 0 && (
                      <div className="text-center py-8 text-xs text-muted-foreground border border-dashed border-border/20 rounded-lg">
                        No pending verify
                      </div>
                    )}
                  </div>
                </div>

                {/* Column: Deployed */}
                <div className="flex flex-col gap-3">
                  <div className="border-b border-border/20 pb-2">
                    <span className="text-xs font-mono font-bold text-tertiary uppercase flex items-center gap-1.5">
                      <Circle className="size-3 text-tertiary fill-tertiary" />
                      Deployed ({getTasksByStatus("done").length})
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-3 min-h-[300px]">
                    {getTasksByStatus("done").map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    {getTasksByStatus("done").length === 0 && (
                      <div className="text-center py-8 text-xs text-muted-foreground border border-dashed border-border/20 rounded-lg">
                        Empty column
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </TabsContent>

            {/* TAB 2: LIVE LOGS TERMINAL */}
            <TabsContent value="logs" className="mt-0">
              <Card className="bg-black border border-border/40 rounded-xl flex flex-col h-[500px]">
                
                {/* Console Top Action Bar */}
                <div className="bg-zinc-950 border-b border-border/20 px-4 py-3 flex flex-wrap justify-between items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5">
                      <Terminal className="size-3.5 text-primary" />
                      factory-orchestrator-shell
                    </span>
                  </div>
                  
                  {/* Filter buttons */}
                  <div className="flex items-center gap-2">
                    <Button 
                      size="xs" 
                      variant={logFilter === "all" ? "default" : "ghost"}
                      onClick={() => setLogFilter("all")}
                      className="font-mono text-[10px]"
                    >
                      All
                    </Button>
                    <Button 
                      size="xs" 
                      variant={logFilter === "info" ? "default" : "ghost"}
                      onClick={() => setLogFilter("info")}
                      className="font-mono text-[10px] text-primary"
                    >
                      Info
                    </Button>
                    <Button 
                      size="xs" 
                      variant={logFilter === "warning" ? "default" : "ghost"}
                      onClick={() => setLogFilter("warning")}
                      className="font-mono text-[10px] text-secondary"
                    >
                      Warn
                    </Button>
                    <Button 
                      size="xs" 
                      variant={logFilter === "error" ? "default" : "ghost"}
                      onClick={() => setLogFilter("error")}
                      className="font-mono text-[10px] text-destructive"
                    >
                      Error
                    </Button>
                    <Button 
                      size="xs" 
                      variant={logFilter === "success" ? "default" : "ghost"}
                      onClick={() => setLogFilter("success")}
                      className="font-mono text-[10px] text-tertiary"
                    >
                      Success
                    </Button>
                  </div>
                </div>

                {/* Console Output Stream */}
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs flex flex-col gap-2 bg-black select-text">
                  {filteredLogs.map(log => {
                    let levelColor = "text-muted-foreground"
                    if (log.level === "success") levelColor = "text-tertiary"
                    if (log.level === "warning") levelColor = "text-secondary font-semibold"
                    if (log.level === "error") levelColor = "text-destructive font-semibold"

                    return (
                      <div key={log.id} className="flex gap-4 hover:bg-white/5 py-0.5 px-1 rounded transition-colors">
                        <span className="text-zinc-600 select-none">{log.timestamp}</span>
                        <span className={`w-14 uppercase font-semibold shrink-0 select-none ${levelColor}`}>
                          [{log.level}]
                        </span>
                        <span className="text-primary/70 w-24 shrink-0 select-none">
                          {log.source}:
                        </span>
                        <span className="text-zinc-300 break-all">{log.message}</span>
                      </div>
                    )
                  })}
                  <div ref={logsEndRef}></div>
                </div>

                {/* Footer Console Control */}
                <div className="bg-zinc-950 border-t border-border/20 px-4 py-2.5 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>Press ESC to focus terminal input</span>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-tertiary rounded-full animate-pulse"></span>
                    <span>ONLINE</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* TAB 3: AGENT CHAT */}
            <TabsContent value="chat" className="mt-0">
              <Card className="border border-border/40 rounded-xl flex flex-col h-[500px]">
                
                {/* Chat header */}
                <div className="px-4 py-3 border-b border-border/10 flex items-center justify-between bg-surface-container/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚙️</span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Factory Lead Orchestrator</h4>
                      <p className="text-[10px] text-muted-foreground font-mono">AUTONOMOUS COORDINATOR CHANNEL</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-tertiary/20 text-tertiary font-mono text-[10px]">
                    ONLINE
                  </Badge>
                </div>

                {/* Chat Messages Scroll Container */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-background/20">
                  {chatMessages.map(msg => {
                    const isAgent = msg.sender === "agent"
                    return (
                      <div 
                        key={msg.id} 
                        className={`flex gap-3 max-w-[85%] ${!isAgent ? "ml-auto flex-row-reverse" : ""}`}
                      >
                        {isAgent && (
                          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border text-sm shrink-0">
                            {msg.avatar || "🤖"}
                          </div>
                        )}
                        
                        <div className="flex flex-col gap-1">
                          {isAgent && (
                            <span className="text-[10px] font-mono text-primary font-bold">
                              {msg.agentName}
                            </span>
                          )}
                          <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                            isAgent 
                              ? "bg-surface border border-border/60 text-zinc-100" 
                              : "bg-primary text-primary-foreground font-medium"
                          }`}>
                            {msg.message}
                          </div>
                          <span className={`text-[9px] font-mono text-zinc-600 ${!isAgent ? "text-right" : ""}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                  
                  {isTyping && (
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border text-sm shrink-0">
                        🤖
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-primary font-bold">Agent processing</span>
                        <div className="p-3 rounded-lg bg-surface border border-border/60 text-xs text-muted-foreground flex gap-1.5 items-center">
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-100"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-200"></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef}></div>
                </div>

                {/* Chat Input Footer */}
                <form onSubmit={handleChatSubmit} className="p-3 border-t border-border/10 bg-surface/50 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Command active agents (e.g. 'cattlesync sync', 'add task', 'status')..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-background border border-border/60 rounded-lg px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-primary placeholder:text-zinc-600"
                  />
                  <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-mono text-xs">
                    <Send className="size-3.5" />
                    SEND
                  </Button>
                </form>

              </Card>
            </TabsContent>

            {/* TAB 4: FACTORY SETTINGS */}
            <TabsContent value="settings" className="mt-0">
              <Card className="border border-border/40 rounded-xl flex flex-col bg-surface/30">
                <div className="p-6 border-b border-border/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container/50">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Settings className="size-5 text-primary animate-spin-slow" />
                      Factory Configuration & Rules
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Define core behavioral limits and mission guidelines for autonomous agents.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setCompanyName("JSRM Enterprises Ltd.")
                        setMissionScope("Enterprise resource planning automation with a focus on supply chain transparency.")
                        setStrictnessLevel(4)
                        setUnitTestsEnforced(true)
                        setDocsGenerationEnforced(true)
                        setDdasEnabled(false)
                      }}
                      className="text-xs h-8"
                    >
                      Reset
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground font-mono font-bold text-xs h-8"
                      onClick={() => {
                        setIsSavingSettings(true)
                        setTimeout(() => {
                          setIsSavingSettings(false)
                          const now = new Date()
                          const timestamp = now.toTimeString().split(' ')[0]
                          setLogs(prev => [
                            ...prev,
                            {
                              id: Math.random().toString(),
                              timestamp,
                              level: "success",
                              source: "System",
                              message: `SETTINGS UPDATED: Strictness set to Level ${strictnessLevel}. Tests: ${unitTestsEnforced ? "ON" : "OFF"}.`
                            }
                          ])
                          setChatMessages(prev => [
                            ...prev,
                            {
                              id: Math.random().toString(),
                              sender: "agent",
                              agentName: "Factory Lead",
                              avatar: "⚙️",
                              message: `Factory rules updated. I have broadcasted the new configuration to all active sub-agents. Agent autonomy strictness level calibrated to ${strictnessLevel}/5.`,
                              timestamp
                            }
                          ])
                        }, 800)
                      }}
                      disabled={isSavingSettings}
                    >
                      {isSavingSettings ? "SAVING..." : "SAVE CHANGES"}
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Organization Scope */}
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-muted-foreground uppercase block">
                        Entity Name
                      </label>
                      <input 
                        type="text" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-background/50 border border-border/60 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary placeholder:text-zinc-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-muted-foreground uppercase block">
                        Mission Scope Description
                      </label>
                      <textarea 
                        rows={4}
                        value={missionScope}
                        onChange={(e) => setMissionScope(e.target.value)}
                        className="w-full bg-background/50 border border-border/60 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary resize-none placeholder:text-zinc-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-muted-foreground uppercase block">
                        Agent Communication Tone
                      </label>
                      <select 
                        value={voiceTone}
                        onChange={(e) => setVoiceTone(e.target.value)}
                        className="w-full bg-background/50 border border-border/60 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                      >
                        <option value="Technical Professional (High Density)">Technical Professional (High Density)</option>
                        <option value="Friendly Assistant">Friendly Assistant</option>
                        <option value="Strictly Formal">Strictly Formal</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Column: Protocols & Constraints */}
                  <div className="flex flex-col gap-5">
                    
                    {/* SDLC Strictness slider */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-mono font-bold">
                        <span className="text-zinc-400 uppercase">SDLC Strictness level</span>
                        <span className="text-primary">LVL {strictnessLevel}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="5"
                        value={strictnessLevel}
                        onChange={(e) => setStrictnessLevel(Number(e.target.value))}
                        className="w-full accent-primary bg-background/60 rounded-lg h-2 cursor-pointer"
                      />
                      <div className="flex justify-between font-mono text-[9px] text-muted-foreground">
                        <span>FLEXIBLE</span>
                        <span>STRICT RULES</span>
                      </div>
                    </div>

                    {/* Checkboxes/toggles */}
                    <div className="space-y-4 pt-2 border-t border-border/10">
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-zinc-200">Enforce Unit Test Verification</span>
                          <span className="text-[10px] text-muted-foreground">Require test execution before merge</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={unitTestsEnforced}
                          onChange={(e) => setUnitTestsEnforced(e.target.checked)}
                          className="w-4 h-4 rounded text-primary bg-background border-border accent-primary focus:ring-primary focus:ring-1 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-zinc-200">Enforce Automatic Docs Generation</span>
                          <span className="text-[10px] text-muted-foreground">Agents compile and update Markdown artifacts</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={docsGenerationEnforced}
                          onChange={(e) => setDocsGenerationEnforced(e.target.checked)}
                          className="w-4 h-4 rounded text-primary bg-background border-border accent-primary focus:ring-primary focus:ring-1 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-zinc-200">Data-Delivery-as-Service (DDaS)</span>
                          <span className="text-[10px] text-muted-foreground">Integrate external API delivery nodes</span>
                        </div>
                        <input 
                          type="checkbox"
                          checked={ddasEnabled}
                          onChange={(e) => setDdasEnabled(e.target.checked)}
                          className="w-4 h-4 rounded text-primary bg-background border-border accent-primary focus:ring-primary focus:ring-1 cursor-pointer"
                        />
                      </div>

                    </div>

                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

          {/* Lower Details Panel (Billing limits and credits logs) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <DollarSign className="size-4 text-secondary" />
                  Credit Projections
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                We are currently running in Dark Factory orchestration mode. Calculated consumption is <strong>$0.04/token execution</strong>. Current monthly forecast: $280.00 / $500.00 limit.
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Sliders className="size-4 text-primary" />
                  System Calibration
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span>AGENT AUTONOMY DEPTH:</span>
                  <span className="text-primary font-bold">LVL 4</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span>SAFETY SHIELD MATRIX:</span>
                  <span className="text-tertiary font-bold">ONLINE</span>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>

      </main>

      {/* Full Footer */}
      <footer className="border-t border-border/40 py-6 bg-background/30 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">circle_notifications</span>
            <span>Agentic Software Factory v1.2.0 • Built with Next.js & Shadcn</span>
          </div>
          <div>
            © 2026 Dark Factory Systems Inc.
          </div>
        </div>
      </footer>

    </div>
  )
}

// Kanban Task Card Component
function TaskCard({ task }: { task: KanbanTask }) {
  let priorityColor = "bg-slate-500/10 text-slate-400 border-slate-500/20"
  if (task.priority === "medium") priorityColor = "bg-primary/10 text-primary border-primary/20"
  if (task.priority === "high") priorityColor = "bg-secondary/10 text-secondary border-secondary/20"
  if (task.priority === "critical") priorityColor = "bg-destructive/10 text-destructive border-destructive/20"

  return (
    <Card className="border border-border/40 bg-surface/50 hover:bg-surface transition-colors p-3.5 flex flex-col gap-3 group">
      <div className="flex justify-between items-start gap-2">
        <Badge variant="outline" className={`text-[9px] px-1.5 py-0.5 font-mono ${priorityColor}`}>
          {task.priority.toUpperCase()}
        </Badge>
        <span className="text-sm select-none">{task.agentAvatar}</span>
      </div>
      
      <p className="text-xs font-medium text-white group-hover:text-primary transition-colors leading-relaxed">
        {task.title}
      </p>

      <div className="flex flex-col gap-1.5 border-t border-border/10 pt-2.5">
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>{task.agent}</span>
          <span className="font-bold">{task.progress}%</span>
        </div>
        <div className="w-full bg-background h-1 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-500" 
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>
    </Card>
  )
}
