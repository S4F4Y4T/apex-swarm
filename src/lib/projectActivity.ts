export interface ProjectAlert {
  type: "error" | "warn" | "info"
  title: string
  desc: string
  action: string
  tab: "chat" | "kanban" | "logs" | "files" | "settings"
}

export interface ProjectLogEntry {
  time: string
  level: string
  text: string
  color: string
}

export interface ProjectActivity {
  alerts: ProjectAlert[]
  logs: ProjectLogEntry[]
  chatDesc: string
  kanbanDesc: string
  logsDesc: string
  settingsDesc: string
}

// Per-project mock activity feed (alerts + recent logs) used by each project's own
// workspace Overview tab, and aggregated across all projects for the global dashboard.
export const projectActivityData: Record<string, ProjectActivity> = {
  jsrm_erp: {
    alerts: [
      { type: "warn", title: "HITL REQUIRED", desc: "Approval needed: schema migration for Catalog svc", action: "Review", tab: "chat" },
      { type: "error", title: "CRITICAL FAILURE", desc: "Developer agent failed 2x on auth svc build", action: "View", tab: "logs" }
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
  },
  evore_backend: {
    alerts: [
      { type: "warn", title: "HITL REQUIRED", desc: "Approve route caching strategy for v4.1", action: "Review", tab: "chat" },
      { type: "info", title: "COMPILING READY", desc: "Build check passed on dev branch", action: "View", tab: "logs" }
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
  },
  lambda_shadow: {
    alerts: [
      { type: "warn", title: "HITL REQUIRED", desc: "Review rotated IAM policy overrides", action: "Review", tab: "chat" }
    ],
    logs: [
      { time: "09:42:01", level: "WARN", text: "IAM policy validation requires signature verification.", color: "text-amber-400" },
      { time: "09:30:15", level: "INFO", text: "VPC gateway established with zero-trust credentials.", color: "text-primary" }
    ],
    chatDesc: "Idle",
    kanbanDesc: "0 in progress, 0 blocked",
    logsDesc: "12 events today",
    settingsDesc: "Zero-Trust Active"
  },
  quantum_bridge: {
    alerts: [
      { type: "error", title: "CRITICAL FAILURE", desc: "Parallel branch divergence: 4 conflicts", action: "Resolve", tab: "chat" },
      { type: "warn", title: "HITL REQUIRED", desc: "Approve state prune action on root branch", action: "Review", tab: "chat" }
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
  },
  synth_logs: {
    alerts: [
      { type: "info", title: "INITIALIZING", desc: "Compressing logs of previous test session", action: "View", tab: "logs" }
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
}

export function getProjectActivity(projectId: string): ProjectActivity {
  return projectActivityData[projectId] ?? projectActivityData["jsrm_erp"]
}
