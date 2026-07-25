"use client"

import React, { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import PageLayout from "@/components/PageLayout"
import { 
  Grid, 
  List, 
  AlertTriangle, 
  MoreVertical, 
  Cpu, 
  PlusCircle, 
  ArrowRight
} from "lucide-react"

import { projectsData } from "@/lib/projects"

function ProjectsExplorerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")

  const selectedProjectId = searchParams?.get("projectId") || "jsrm_erp"
  const viewType = (searchParams?.get("view") || "card") as "card" | "table"

  const setViewType = (view: "card" | "table") => {
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set("view", view)
    router.push(`/projects?${params.toString()}`)
  }

  const filteredProjects = projectsData.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const headerActions = (
    <div className="flex items-center gap-4">
      {/* View Switcher */}
      <div className="flex bg-surface-container rounded-lg p-1 border border-border/40">
        <button 
          onClick={() => setViewType("card")}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-mono transition-all ${viewType === "card" ? "bg-primary text-background font-bold" : "text-muted-foreground hover:text-white"}`}
        >
          <Grid className="size-3.5" />
          <span>Card View</span>
        </button>
        <button 
          onClick={() => setViewType("table")}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-mono transition-all ${viewType === "table" ? "bg-primary text-background font-bold" : "text-muted-foreground hover:text-white"}`}
        >
          <List className="size-3.5" />
          <span>Table View</span>
        </button>
      </div>

      <div className="h-6 w-[1px] bg-border/40 hidden sm:block"></div>

      <Link href={`/workspace?tab=chat&projectId=${selectedProjectId}`}>
        <button className="font-mono text-xs text-secondary-container flex items-center gap-1.5 px-3 py-1.5 bg-secondary-container/10 hover:bg-secondary-container/20 rounded border border-secondary-container/30 transition-all">
          <AlertTriangle className="size-3.5 fill-secondary-container" />
          <span className="font-bold">HITL ALERTS (2)</span>
        </button>
      </Link>
    </div>
  )

  return (
    <PageLayout
      title="Projects Explorer"
      headerActions={headerActions}
      showSearch={true}
      searchPlaceholder="Scan modules..."
      onSearchChange={(val) => setSearchQuery(val)}
      badge={{ text: "v2.4", variant: "tertiary" }}
      className="space-y-6 flex-grow"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/10 pb-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-widest">Active Factory Modules</h2>
          <p className="text-xs text-zinc-500 font-mono mt-1">Total Units: {projectsData.length} | Syncing via 2.4-ALPHA-3</p>
        </div>
        <div className="flex gap-3 text-xs font-mono text-zinc-500">
          <span className="text-zinc-400">ENV:</span>
          <span className="text-tertiary font-bold">PRODUCTION_STABLE</span>
        </div>
      </div>

      {viewType === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const isJSRM = proj.id === "jsrm_erp"
            const isSelected = proj.id === selectedProjectId
            
            // Build the card destination link, preserving view type and other parameters
            const cardHref = proj.href ? (proj.href.includes("?") ? `${proj.href}&view=${viewType}` : `${proj.href}?view=${viewType}`) : undefined;

            const CardWrapper = ({ children }: { children: React.ReactNode }) => {
              if (cardHref) {
                return <Link href={cardHref} className="block group">{children}</Link>
              }
              return <div className="group">{children}</div>
            }

            const borderClass = isSelected
              ? "border-primary bg-primary/5 ring-1 ring-primary/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              : proj.statusType === "error"
                ? "border-destructive/40 hover:border-destructive/60 bg-surface-container-low/40"
                : proj.statusType === "active"
                  ? "border-border/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 active-glow bg-surface-container-low/40"
                  : "border-border/20 opacity-80 hover:opacity-100 bg-surface-container-low/40"

            return (
              <CardWrapper key={proj.id}>
                <div className={`backdrop-blur-md p-6 rounded-xl flex flex-col justify-between min-h-[380px] transition-all duration-300 relative hover:scale-[1.01] ${borderClass}`}>
                  {/* Selected Indicator Badge */}
                  {isSelected && (
                    <div className="absolute -top-2.5 right-4 bg-primary text-background text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded border border-primary/20 tracking-wider">
                      Active Context
                    </div>
                  )}

                  <div>
                    {/* Path & Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${proj.statusType === "active" ? "bg-tertiary animate-pulse" : proj.statusType === "paused" ? "bg-secondary-container" : proj.statusType === "error" ? "bg-destructive animate-pulse" : "bg-primary/40"}`}></span>
                        <span className="font-mono text-[10px] text-zinc-500">{proj.path}</span>
                      </div>
                      <button className="text-zinc-500 hover:text-white transition-colors">
                        <MoreVertical className="size-4" />
                      </button>
                    </div>

                    {/* Title & Desc */}
                    <div className="mb-5">
                      <h3 className={`text-lg font-bold group-hover:text-primary transition-colors ${proj.statusType === "paused" ? "text-secondary-fixed-dim" : "text-white"}`}>
                        {proj.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{proj.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {proj.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                            tag.includes("ACTIVE") 
                              ? "bg-primary/10 border-primary/20 text-primary" 
                              : tag.includes("PAUSED")
                              ? "bg-secondary-container/10 border-secondary-container/20 text-secondary-container"
                              : tag.includes("INITIALIZING")
                              ? "bg-surface-container-highest border-outline-variant text-zinc-400"
                              : "bg-surface-container-highest border-border/20 text-zinc-400"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Agent Details */}
                    <div className="flex items-center gap-3 py-2 px-3 bg-surface-container-high/40 rounded-lg border border-border/10 mb-5">
                      <span className="text-lg">{proj.agentIcon}</span>
                      <div>
                        <p className="font-mono text-[9px] text-zinc-500">ACTIVE AGENT</p>
                        <p className="text-xs text-foreground font-semibold">{proj.agentName}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between font-mono text-[10px] mb-1.5">
                        <span className="text-zinc-500">TASK PROGRESS</span>
                        <span className={proj.statusType === "error" ? "text-destructive font-bold" : "text-tertiary font-bold"}>
                          {proj.progress}/{proj.maxProgress} ({Math.round((proj.progress / proj.maxProgress) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            proj.statusType === "error" 
                              ? "bg-destructive shadow-[0_0_8px_#ef4444aa]" 
                              : proj.statusType === "paused"
                              ? "bg-zinc-600"
                              : "bg-tertiary shadow-[0_0_8px_#10b981aa]"
                          }`} 
                          style={{ width: `${(proj.progress / proj.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Alert banner if exists */}
                    {proj.alert && (
                      <div className="bg-secondary-container/10 border-l-2 border-l-secondary-container p-2 rounded-r -mx-6 mb-4 flex items-center gap-2 animate-pulse">
                        <AlertTriangle className="size-3.5 text-secondary-container" />
                        <span className="font-mono text-[9px] text-secondary-container font-semibold">{proj.alert}</span>
                      </div>
                    )}

                    {/* Footer Info */}
                    <div className="pt-4 border-t border-border/10 flex justify-between items-center text-xs font-mono">
                      <div className="flex gap-4">
                        <div>
                          <p className="text-[9px] text-zinc-500">BURN RATE</p>
                          <p className={`font-semibold ${proj.statusType === "paused" ? "text-zinc-600" : "text-primary"}`}>{proj.burnRate}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-zinc-500">TOTAL SPEND</p>
                          <p className="font-semibold text-white">{proj.totalSpend}</p>
                        </div>
                      </div>
                      {isJSRM ? (
                        <span className="text-primary font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Enter Hub</span>
                          <ArrowRight className="size-3.5" />
                        </span>
                      ) : proj.alert ? (
                        <button className="px-3 py-1 bg-secondary text-background font-bold rounded font-mono text-[9px] hover:bg-[#ee9800] transition-all">
                          REVIEW
                        </button>
                      ) : (
                        <span className="text-zinc-500 text-[10px] uppercase font-semibold">
                          {proj.statusType === "initializing" ? "INITIALIZING" : proj.statusType === "paused" ? "SYSTEM IDLE" : "STABLE"}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </CardWrapper>
            )
          })}

          {/* WebGL Empty placeholder */}
          <div className="bg-surface-container-low/20 border border-dashed border-border/20 p-6 rounded-xl flex flex-col items-center justify-center min-h-[380px] text-center">
            <Cpu className="size-12 text-primary/30 mb-4 animate-pulse" />
            <p className="font-mono text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">Waiting for module initialization signal...</p>
            <button className="mt-4 px-4 py-1.5 bg-surface-container hover:bg-surface-bright text-xs text-white rounded border border-border/40 transition-colors">
              Initialize Unit
            </button>
          </div>

          {/* Add Project Card Placeholder */}
          <button className="group flex flex-col items-center justify-center border-2 border-dashed border-border/30 hover:border-primary/40 hover:bg-primary/5 rounded-xl transition-all min-h-[380px] p-6 text-center">
            <PlusCircle className="size-12 text-zinc-500 group-hover:text-primary mb-4 transition-colors" />
            <p className="font-semibold text-white group-hover:text-primary transition-colors">Deploy Module</p>
            <p className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-400 mt-2">AIGENTIC_CLI --init project_name</p>
          </button>

        </div>
      ) : (
        /* Table View */
        <div className="bg-surface-container-low/40 border border-border/20 backdrop-blur-md rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-surface-container-low/70 border-b border-border/10 text-zinc-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Path / ID</th>
                  <th className="p-4">Module Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Active Agent</th>
                  <th className="p-4">Task Progress</th>
                  <th className="p-4 text-right">Burn Rate</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/10 text-zinc-300">
                {filteredProjects.map((proj) => {
                  const isSelected = proj.id === selectedProjectId
                  const rowHref = proj.href ? (proj.href.includes("?") ? `${proj.href}&view=${viewType}` : `${proj.href}?view=${viewType}`) : undefined;
                  
                  return (
                    <tr 
                      key={proj.id} 
                      className={`transition-colors border-l-2 ${
                        isSelected 
                          ? "bg-primary/5 border-l-primary hover:bg-primary/10" 
                          : "border-l-transparent hover:bg-surface-container/20"
                      }`}
                    >
                      <td className="p-4 text-zinc-400 font-light">{proj.path}</td>
                      <td className="p-4 font-sans font-bold text-white text-sm">
                        <div className="flex items-center gap-2">
                          <span>{proj.name}</span>
                          {isSelected && (
                            <span className="text-[9px] font-mono bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded scale-90">
                              ACTIVE
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          proj.statusType === "active" 
                            ? "bg-primary/10 text-primary border border-primary/20" 
                            : proj.statusType === "paused"
                            ? "bg-secondary-container/10 text-secondary-container border border-secondary-container/20"
                            : proj.statusType === "error"
                            ? "bg-destructive/10 text-destructive border border-destructive/20 animate-pulse"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                        }`}>
                          {proj.status}
                        </span>
                      </td>
                      <td className="p-4 flex items-center gap-2">
                        <span>{proj.agentIcon}</span>
                        <span className="font-sans font-medium">{proj.agentName}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 w-32">
                          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${(proj.progress / proj.maxProgress) * 100}%` }}></div>
                          </div>
                          <span className="shrink-0">{proj.progress}/{proj.maxProgress}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right text-primary font-bold">{proj.burnRate}</td>
                      <td className="p-4 text-right">
                        {rowHref ? (
                          <Link href={rowHref}>
                            <button className="text-primary font-bold hover:underline flex items-center gap-1 justify-end ml-auto">
                              <span>Enter</span>
                              <ArrowRight className="size-3" />
                            </button>
                          </Link>
                        ) : proj.alert ? (
                          <button className="px-2 py-1 bg-secondary text-background font-bold rounded text-[9px] hover:brightness-110">
                            REVIEW
                          </button>
                        ) : (
                          <span className="text-zinc-600">--</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageLayout>
  )
}

export default function ProjectsExplorer() {
  return (
    <Suspense fallback={<div className="p-6 md:p-8 font-mono text-xs text-zinc-500 animate-pulse">Loading modules index...</div>}>
      <ProjectsExplorerContent />
    </Suspense>
  )
}
