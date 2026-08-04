"use client"

import React from "react"
import Link from "next/link"
import {
  AlertTriangle,
  XCircle,
  History,
  ArrowRight,
  FolderKanban,
  Bot,
  DollarSign,
  ShieldAlert
} from "lucide-react"
import PageLayout from "@/components/PageLayout"
import { projectsData } from "@/lib/projects"
import { getProjectActivity } from "@/lib/projectActivity"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

function parseSpend(spend: string): number {
  const cleaned = spend.replace(/[^0-9.]/g, "")
  return parseFloat(cleaned) || 0
}

export default function Dashboard() {
  // Aggregate, system-wide figures — this page is not scoped to any single project.
  const activeProjectsCount = projectsData.filter(p => p.statusType === "active").length
  const totalUsage = projectsData.reduce((sum, p) => sum + parseSpend(p.totalSpend), 0)

  // Merge per-project alerts into one global Attention Required Queue, tagged with project.
  const globalAlerts = projectsData.flatMap(p =>
    getProjectActivity(p.id).alerts.map(alert => ({
      ...alert,
      projectId: p.id,
      projectName: p.name
    }))
  )
  const openHitlCount = globalAlerts.filter(a => a.title === "HITL REQUIRED").length

  // Merge per-project recent logs into one global activity feed, tagged with project, newest first.
  const globalActivity = projectsData
    .flatMap(p =>
      getProjectActivity(p.id).logs.map(log => ({ ...log, projectName: p.name }))
    )
    .sort((a, b) => b.time.localeCompare(a.time))
    .slice(0, 8)

  const headerActions = (
    <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-tertiary relative after:absolute after:inset-0 after:rounded-full after:bg-tertiary after:animate-ping"></span>
        <span className="text-[10px] font-semibold text-tertiary uppercase tracking-wider">All Systems Synced</span>
      </div>
      <span className="text-white/10 hidden sm:inline">|</span>
      <div className="flex flex-col text-right">
        <span className="text-[10px] text-zinc-500">FLEET SIZE</span>
        <span className="text-primary font-bold">{projectsData.length} Projects</span>
      </div>
    </div>
  )

  return (
    <PageLayout
      title="Mission Control"
      badge={{ text: "SYSTEM NOMINAL", variant: "tertiary" }}
      headerActions={headerActions}
      className="space-y-8 flex-grow"
    >
      {/* Attention Required Queue (global) */}
      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-400">Attention Required Queue</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {globalAlerts.map((alert, index) => {
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
                    <div className="flex items-center gap-2">
                      <p className={`font-mono text-[10px] font-bold tracking-wider ${isError ? "text-destructive" : isWarn ? "text-secondary" : "text-primary"}`}>
                        {alert.title}
                      </p>
                      <span className="font-mono text-[9px] text-zinc-500 uppercase">· {alert.projectName}</span>
                    </div>
                    <p className="text-sm text-zinc-300 font-medium mt-0.5">{alert.desc}</p>
                  </div>
                </div>
                <Link href={`/workspace?projectId=${alert.projectId}&tab=${alert.tab}`}>
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
          {globalAlerts.length === 0 && (
            <div className="col-span-2 bg-[#000000]/20 border border-border/10 p-6 rounded-xl text-center text-zinc-500 font-mono text-xs">
              No active alerts or manual approvals pending across the fleet.
            </div>
          )}
        </div>
      </section>

      {/* Stats Strip (aggregate, fleet-wide) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-5 rounded-xl flex flex-col justify-between h-28 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Active Projects</span>
            <FolderKanban className="size-4 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">
              {activeProjectsCount}/{projectsData.length}
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Currently in development</p>
          </div>
        </div>

        <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-5 rounded-xl flex flex-col justify-between h-28 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Agents Deployed</span>
            <Bot className="size-4 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{projectsData.length}</div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Across all projects</p>
          </div>
        </div>

        <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-5 rounded-xl flex flex-col justify-between h-28 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Total Usage</span>
            <span className="text-zinc-500 font-mono text-[9px]">BYOK</span>
          </div>
          <div>
            <div className="text-2xl font-black text-primary tracking-tight">
              ${totalUsage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Fleet-wide spend estimate</p>
          </div>
        </div>

        <div className="bg-[#000000]/40 border border-border/20 backdrop-blur-md p-5 rounded-xl flex flex-col justify-between h-28 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Open HITL Tickets</span>
            <ShieldAlert className="size-4 text-secondary" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{openHitlCount}</div>
            <p className="text-[10px] font-mono text-secondary uppercase mt-1">Awaiting operator approval</p>
          </div>
        </div>
      </section>

      {/* Project Fleet Matrix & Global Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Fleet Matrix */}
        <section className="lg:col-span-2 bg-[#000000]/40 border border-border/20 backdrop-blur-md rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border/10 flex justify-between items-center bg-surface-container-low/20">
            <h3 className="font-mono text-[10px] uppercase tracking-wider font-bold text-zinc-400">Project Fleet Matrix</h3>
            <Link href="/projects" className="font-mono text-[10px] text-primary hover:underline font-bold">
              Full Explorer →
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsData.map(p => (
                <TableRow key={p.id} className="cursor-pointer">
                  <TableCell className="font-semibold text-white">
                    <Link href={`/workspace?projectId=${p.id}`} className="hover:text-primary transition-colors">
                      {p.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      p.statusType === "active"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : p.statusType === "paused"
                        ? "bg-secondary-container/10 text-secondary-container border border-secondary-container/20"
                        : p.statusType === "error"
                        ? "bg-destructive/10 text-destructive border border-destructive/20"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    }`}>
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-300">
                    {p.agentIcon} {p.agentName}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-zinc-300">
                    {p.progress}/{p.maxProgress}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-white">
                    {p.totalSpend}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* Global Activity Feed */}
        <section className="bg-[#000000]/40 border border-border/20 backdrop-blur-md rounded-xl overflow-hidden flex flex-col min-h-[340px] hover:border-primary/30 transition-all">
          <div className="p-4 border-b border-border/10 flex justify-between items-center bg-surface-container-low/20">
            <div className="flex items-center gap-2">
              <History className="size-4 text-primary" />
              <h3 className="font-mono text-[10px] uppercase tracking-wider font-bold text-zinc-400">Global Activity</h3>
            </div>
            <span className="font-mono text-[9px] text-zinc-500 uppercase">Fleet-Wide Feed</span>
          </div>

          <div className="flex-grow p-4 font-mono text-[11px] space-y-3.5 overflow-hidden">
            {globalActivity.map((log, idx) => (
              <div key={idx} className="flex flex-col gap-0.5">
                <div className="flex gap-2.5 items-start">
                  <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                  <span className={`font-bold shrink-0 text-[10px] ${
                    log.level === "FAIL" ? "text-destructive" : log.level === "WARN" ? "text-secondary" : log.level === "SUCCESS" ? "text-tertiary" : "text-primary"
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-zinc-300 truncate">{log.text}</span>
                </div>
                <span className="pl-[4.5rem] text-[9px] text-zinc-600 uppercase">{log.projectName}</span>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border/10 bg-surface-container-low/10">
            <Link href="/projects">
              <button className="w-full text-center font-mono text-[10px] text-primary hover:underline font-bold transition-all py-1">
                View All Projects →
              </button>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
