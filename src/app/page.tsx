"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { 
  Activity, 
  AlertTriangle, 
  XCircle, 
  MessageSquare, 
  KanbanSquare, 
  Terminal, 
  Settings, 
  History, 
  ArrowRight,
  ChevronDown
} from "lucide-react"
import PageLayout from "@/components/PageLayout"
import { projectsData } from "@/lib/projects"

function DashboardContent() {
  const searchParams = useSearchParams()
  const selectedProjectId = searchParams?.get("projectId") || "jsrm_erp"
  const [cpuUsage, setCpuUsage] = useState<number>(64)
  const [memoryUsage, setMemoryUsage] = useState<number>(72)
  
  // Find current project config
  const currentProject = projectsData.find(p => p.id === selectedProjectId) || projectsData[0]

  // Simulate some live changes for metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const delta = Math.floor(Math.random() * 7) - 3
        return Math.min(Math.max(prev + delta, 40), 90)
      })
      setMemoryUsage(prev => {
        const delta = Math.floor(Math.random() * 5) - 2
        return Math.min(Math.max(prev + delta, 60), 85)
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Dynamic project-specific logs & alerts
  const getProjectData = (projectId: string) => {
    switch (projectId) {
      case "evore_backend":
        return {
          alerts: [
            { type: "warn", title: "HITL REQUIRED", desc: "Approve route caching strategy for v4.1", action: "Review", href: `/workspace?projectId=evore_backend&tab=chat` },
            { type: "info", title: "COMPILING READY", desc: "Build check passed on dev branch", action: "View", href: `/workspace?projectId=evore_backend&tab=logs` }
          ],
          logs: [
            { time: "11:15:30", level: "INFO", text: "Evore routing rules flushed to memory table.", color: "text-emerald-400" },
            { time: "11:12:14", level: "WARN", text: "Memory allocation warning on proxy service.", color: "text-amber-400" },
            { time: "11:05:00", level: "INFO", text: "Route compiler initialized successfully.", color: "text-primary" }
          ],
          chatDesc: "No pending replies",
          kanbanDesc: "3 in progress, 0 blocked",
          logsDesc: "542 events today",
          settingsDesc: "Standard SDLC active"
        }
      case "lambda_shadow":
        return {
          alerts: [
            { type: "warn", title: "HITL REQUIRED", desc: "Review rotated IAM policy overrides", action: "Review", href: `/workspace?projectId=lambda_shadow&tab=chat` }
          ],
          logs: [
            { time: "09:42:01", level: "WARN", text: "IAM policy validation requires signature verification.", color: "text-amber-400" },
            { time: "09:30:15", level: "INFO", text: "VPC gateway established with zero-trust credentials.", color: "text-primary" }
          ],
          chatDesc: "Idle",
          kanbanDesc: "0 in progress, 0 blocked",
          logsDesc: "12 events today",
          settingsDesc: "Zero-Trust Active"
        }
      case "quantum_bridge":
        return {
          alerts: [
            { type: "error", title: "CRITICAL FAILURE", desc: "Parallel branch divergence: 4 conflicts", action: "Resolve", href: `/workspace?projectId=quantum_bridge&tab=chat` },
            { type: "warn", title: "HITL REQUIRED", desc: "Approve state prune action on root branch", action: "Review", href: `/workspace?projectId=quantum_bridge&tab=chat` }
          ],
          logs: [
            { time: "12:01:45", level: "FAIL", text: "State divergence detected on branch alpha-4.", color: "text-rose-500" },
            { time: "11:58:22", level: "WARN", text: "HITL checkpoint hit: non-deterministic path.", color: "text-amber-400" },
            { time: "11:45:10", level: "INFO", text: "Synapse Alpha spawned 12 sub-agents.", color: "text-emerald-400" }
          ],
          chatDesc: "Awaiting decision matrix",
          kanbanDesc: "12 in progress, 2 blocked",
          logsDesc: "9,420 events today",
          settingsDesc: "High-variance mode enabled"
        }
      case "synth_logs":
        return {
          alerts: [
            { type: "info", title: "INITIALIZING", desc: "Compressing logs of previous test session", action: "View", href: `/workspace?projectId=synth_logs&tab=logs` }
          ],
          logs: [
            { time: "10:15:22", level: "INFO", text: "Log synthesizer routine running in background.", color: "text-primary" },
            { time: "10:00:00", level: "INFO", text: "Janitor Bot v1.2 garbage collector active.", color: "text-emerald-400" }
          ],
          chatDesc: "Idle",
          kanbanDesc: "1 in progress, 0 blocked",
          logsDesc: "42 events today",
          settingsDesc: "Log Sync Active"
        }
      case "jsrm_erp":
      default:
        return {
          alerts: [
            { type: "warn", title: "HITL REQUIRED", desc: "Approval needed: schema migration for Catalog svc", action: "Review", href: `/workspace?projectId=jsrm_erp&tab=chat` },
            { type: "error", title: "CRITICAL FAILURE", desc: "Developer agent failed 2x on auth svc build", action: "View", href: `/workspace?projectId=jsrm_erp&tab=logs` }
          ],
          logs: [
            { time: "10:42:01", level: "INFO", text: "Agent 'Builder' deployed v2.1.4", color: "text-emerald-400" },
            { time: "10:38:15", level: "FAIL", text: "Auth svc build timeout (attempt 2)", color: "text-rose-500" },
            { time: "10:30:00", level: "WARN", text: "Schema migration pending approval", color: "text-amber-400" },
            { time: "10:15:22", level: "INFO", text: "Database backup completed sync", color: "text-primary" }
          ],
          chatDesc: "Planner awaiting reply",
          kanbanDesc: "4 in progress, 1 blocked",
          logsDesc: "1,204 events today",
          settingsDesc: "DDaS · SDLC v2 active"
        }
    }
  }

  const projectExtra = getProjectData(selectedProjectId)

  const headerActions = (
    <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground">
      <div className="hidden xl:flex flex-col text-right">
        <span className="text-[10px] text-zinc-500">WORKSPACE ID</span>
        <span className="text-white">{currentProject.workspaceId}</span>
      </div>
      <span className="text-white/10 hidden sm:inline">|</span>
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-tertiary relative after:absolute after:inset-0 after:rounded-full after:bg-tertiary after:animate-ping"></span>
        <span className="text-[10px] font-semibold text-tertiary uppercase tracking-wider">Sync Active</span>
      </div>
      <span className="text-white/10 hidden sm:inline">|</span>
      <div className="flex flex-col text-right">
        <span className="text-[10px] text-zinc-500">BURN RATE</span>
        <span className="text-primary font-bold">{currentProject.burnRate}</span>
      </div>
    </div>
  )

  return (
    <PageLayout
      headerActions={headerActions}
      className="space-y-8 flex-grow"
    >
      {/* Important Notices */}
      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-400">Important Notices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectExtra.alerts.map((alert, index) => {
            const isError = alert.type === "error"
            const isWarn = alert.type === "warn"
            
            return (
              <div 
                key={index} 
                className={`bg-[#000000]/40 border backdrop-blur-md p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all border-t-2 ${
                  isError 
                    ? "border-t-destructive border-destructive/20 hover:border-destructive/40" 
                    : isWarn
                    ? "border-t-secondary border-secondary/20 hover:border-secondary/40"
                    : "border-t-primary border-primary/20 hover:border-primary/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg ${isError ? "bg-destructive/10 text-destructive" : isWarn ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>
                    {isError ? <XCircle className="size-5" /> : <AlertTriangle className="size-5" />}
                  </div>
                  <div>
                    <p className={`font-mono text-[10px] font-bold tracking-wider ${isError ? "text-destructive" : isWarn ? "text-secondary" : "text-primary"}`}>
                      {alert.title}
                    </p>
                    <p className="text-sm text-zinc-300 font-medium mt-0.5">{alert.desc}</p>
                  </div>
                </div>
                <Link href={alert.href}>
                  <button className={`shrink-0 px-4 py-1.5 rounded font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isError 
                      ? "border border-destructive text-destructive hover:bg-destructive/10" 
                      : isWarn
                      ? "bg-secondary text-background hover:brightness-110"
                      : "bg-primary text-background hover:brightness-110"
                  }`}>
                    <span>{alert.action}</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </Link>
              </div>
            )
          })}
          {projectExtra.alerts.length === 0 && (
            <div className="col-span-2 bg-[#000000]/20 border border-border/10 p-6 rounded-xl text-center text-zinc-500 font-mono text-xs">
              No active alerts or manual approvals pending for this unit.
            </div>
          )}
        </div>
      </section>

      {/* Stats Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tasks Stat */}
        <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-5 rounded-xl flex flex-col justify-between h-28 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Tasks completed</span>
            <span className="text-tertiary text-xs font-bold flex items-center">
              +{Math.round((currentProject.progress / currentProject.maxProgress) * 100)}%
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight mb-2">
              {currentProject.progress}/{currentProject.maxProgress}
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full shadow-[0_0_8px_rgba(76,215,246,0.5)] transition-all duration-1000" 
                style={{ width: `${(currentProject.progress / currentProject.maxProgress) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Agents Stat */}
        <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-5 rounded-xl flex flex-col justify-between h-28 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Agent Deployment</span>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="text-[9px] font-mono text-tertiary uppercase">Run</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-black text-white">{currentProject.agentName}</div>
          </div>
          <div className="text-[10px] font-mono text-zinc-500 uppercase">
            ACTIVE WORKSPACE AGENT: {currentProject.agentIcon}
          </div>
        </div>

        {/* Credits Stat */}
        <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-5 rounded-xl flex flex-col justify-between h-28 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Credits Used</span>
            <span className="text-zinc-500 font-mono text-[9px]">TOTAL LIMIT: 1000</span>
          </div>
          <div>
            <div className="text-2xl font-black text-primary tracking-tight">
              {currentProject.totalSpend}
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Autonomous burn tracking</p>
          </div>
        </div>

        {/* Uptime Stat */}
        <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-5 rounded-xl flex flex-col justify-between h-28 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Telemetry Uptime</span>
            <div className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">
              {currentProject.id === "jsrm_erp" ? "3d 4h" : currentProject.id === "evore_backend" ? "1d 12h" : "0d 0h"}
            </div>
            <p className="text-[10px] font-mono text-emerald-500 uppercase mt-1">ALL MODULES OPERATIONAL</p>
          </div>
        </div>
      </section>

      {/* Main Grid: Workspace navigation & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Cards (2x2 grid) */}
        <section className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Agent Chat */}
          <Link href={`/workspace?projectId=${currentProject.id}&tab=chat`} className="group">
            <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-6 rounded-xl flex flex-col justify-between min-h-[160px] relative overflow-hidden transition-all duration-300 hover:border-primary/40 active-glow group-hover:scale-[1.01]">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
              <div>
                <div className="flex items-center gap-2 mb-3 text-zinc-400 group-hover:text-primary transition-colors">
                  <MessageSquare className="size-4" />
                  <h3 className="font-mono text-[10px] uppercase tracking-wider font-bold">Agent Chat</h3>
                </div>
                <p className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {projectExtra.chatDesc}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <span className="font-mono text-[10px] text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                  Open Workspace <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Kanban Board */}
          <Link href={`/workspace?projectId=${currentProject.id}&tab=kanban`} className="group">
            <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-6 rounded-xl flex flex-col justify-between min-h-[160px] relative overflow-hidden transition-all duration-300 hover:border-primary/40 active-glow group-hover:scale-[1.01]">
              <div>
                <div className="flex items-center gap-2 mb-3 text-zinc-400 group-hover:text-primary transition-colors">
                  <KanbanSquare className="size-4" />
                  <h3 className="font-mono text-[10px] uppercase tracking-wider font-bold">Kanban Board</h3>
                </div>
                <p className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {projectExtra.kanbanDesc}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <span className="font-mono text-[10px] text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                  Open Workspace <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Live Logs */}
          <Link href={`/workspace?projectId=${currentProject.id}&tab=logs`} className="group">
            <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-6 rounded-xl flex flex-col justify-between min-h-[160px] relative overflow-hidden transition-all duration-300 hover:border-primary/40 active-glow group-hover:scale-[1.01]">
              <div>
                <div className="flex items-center gap-2 mb-3 text-zinc-400 group-hover:text-primary transition-colors">
                  <Terminal className="size-4" />
                  <h3 className="font-mono text-[10px] uppercase tracking-wider font-bold">Live Logs</h3>
                </div>
                <p className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {projectExtra.logsDesc}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <span className="font-mono text-[10px] text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                  Open Workspace <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Settings */}
          <Link href={`/workspace?projectId=${currentProject.id}&tab=settings`} className="group">
            <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-6 rounded-xl flex flex-col justify-between min-h-[160px] relative overflow-hidden transition-all duration-300 hover:border-primary/40 active-glow group-hover:scale-[1.01]">
              <div>
                <div className="flex items-center gap-2 mb-3 text-zinc-400 group-hover:text-primary transition-colors">
                  <Settings className="size-4" />
                  <h3 className="font-mono text-[10px] uppercase tracking-wider font-bold">Settings</h3>
                </div>
                <p className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {projectExtra.settingsDesc}
                </p>
              </div>
              <div className="flex justify-end pt-4">
                <span className="font-mono text-[10px] text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                  Open Settings <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          </Link>

        </section>

        {/* Recent Activity Feed */}
        <section className="bg-[#000000]/40 border border-border/20 backdrop-blur-md rounded-xl overflow-hidden flex flex-col min-h-[340px] hover:border-primary/30 transition-all">
          <div className="p-4 border-b border-border/10 flex justify-between items-center bg-surface-container-low/20">
            <div className="flex items-center gap-2">
              <History className="size-4 text-primary" />
              <h3 className="font-mono text-[10px] uppercase tracking-wider font-bold text-zinc-400">Recent Activity</h3>
            </div>
            <span className="font-mono text-[9px] text-zinc-500 uppercase">Realtime Feed</span>
          </div>
          
          <div className="flex-grow p-4 font-mono text-[11px] space-y-3.5 overflow-hidden">
            {projectExtra.logs.map((log, idx) => (
              <div key={idx} className="flex gap-2.5 items-start">
                <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                <span className={`font-bold shrink-0 text-[10px] ${
                  log.level === "FAIL" ? "text-destructive" : log.level === "WARN" ? "text-secondary" : log.level === "SUCCESS" ? "text-tertiary" : "text-primary"
                }`}>
                  {log.level}
                </span>
                <span className="text-zinc-300 truncate">{log.text}</span>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border/10 bg-surface-container-low/10">
            <Link href={`/workspace?projectId=${currentProject.id}&tab=logs`}>
              <button className="w-full text-center font-mono text-[10px] text-primary hover:underline font-bold transition-all py-1">
                Full log →
              </button>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-mono">LOADING SYSTEM...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
