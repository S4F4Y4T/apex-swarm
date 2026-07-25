export interface ProjectConfig {
  id: string
  path: string
  name: string
  description: string
  status: string
  statusType: "active" | "paused" | "initializing" | "error"
  tags: string[]
  agentName: string
  agentIcon: string
  progress: number
  maxProgress: number
  burnRate: string
  totalSpend: string
  workspaceId: string
  companyName: string
  missionScope: string
  alert?: string
  href?: string
}

export const projectsData: ProjectConfig[] = [
  {
    id: "jsrm_erp",
    path: "/projects/jsrm_erp/",
    name: "JSRM ERP",
    description: "Core enterprise resource planning engine with live client sync pipelines.",
    status: "ACTIVE DEVELOPMENT",
    statusType: "active",
    tags: ["ACTIVE DEVELOPMENT", "SDLC-STRICT"],
    agentName: "ERP Deployer",
    agentIcon: "🚀",
    progress: 14,
    maxProgress: 22,
    burnRate: "1.15 CR/m",
    totalSpend: "420.00 CR",
    workspaceId: "4292011975347891523",
    companyName: "JSRM Enterprises Ltd.",
    missionScope: "Enterprise resource planning automation with a focus on supply chain transparency and autonomous fiscal reconciliation.",
    href: "/" // JSRM ERP Dashboard page is /
  },
  {
    id: "evore_backend",
    path: "/projects/evore_backend/",
    name: "Project Evore: Core",
    description: "Automated microservices orchestration layer with redundant routing protocols.",
    status: "ACTIVE DEVELOPMENT",
    statusType: "active",
    tags: ["ACTIVE DEVELOPMENT", "SDLC-STRICT"],
    agentName: "Lead Developer Agent v4",
    agentIcon: "🤖",
    progress: 14,
    maxProgress: 21,
    burnRate: "0.82 CR/m",
    totalSpend: "1,402.12 CR",
    workspaceId: "8172948201948201938",
    companyName: "Evore Core Labs",
    missionScope: "Automated microservices orchestration layer with redundant routing protocols.",
    href: "/workspace?projectId=evore_backend"
  },
  {
    id: "lambda_shadow",
    path: "/projects/lambda_shadow/",
    name: "Lambda Shadow",
    description: "Edge computing wrapper for serverless deployments on dark infrastructure.",
    status: "PAUSED: AUTH_WAIT",
    statusType: "paused",
    tags: ["PAUSED: AUTH_WAIT", "ZERO-TRUST-NET"],
    agentName: "Infra Auditor",
    agentIcon: "🕵️",
    progress: 9,
    maxProgress: 42,
    burnRate: "0.00 CR/m",
    totalSpend: "312.45 CR",
    workspaceId: "9018471049281048201",
    companyName: "Lambda Shadow Operations",
    missionScope: "Edge computing wrapper for serverless deployments on dark infrastructure.",
    href: "/workspace?projectId=lambda_shadow"
  },
  {
    id: "quantum_bridge",
    path: "/projects/quantum_bridge/",
    name: "Quantum Bridge",
    description: "Interface for non-deterministic agent decision branching and pruning.",
    status: "ACTIVE DEVELOPMENT",
    statusType: "active",
    tags: ["ACTIVE DEVELOPMENT", "HIGH-VAR-ALLOW"],
    agentName: "Synthesizer Alpha",
    agentIcon: "🧠",
    progress: 38,
    maxProgress: 40,
    burnRate: "2.44 CR/m",
    totalSpend: "8,990.00 CR",
    workspaceId: "1029481029481029381",
    companyName: "Quantum Branching Inc.",
    missionScope: "Interface for non-deterministic agent decision branching and pruning.",
    alert: "BRANCH CONFLICT: HITL APPROVAL REQ.",
    href: "/workspace?projectId=quantum_bridge"
  },
  {
    id: "synth_logs",
    path: "/projects/synth_logs/",
    name: "Log Synthesizer",
    description: "Internal utility for cleaning and classifying massive agent trace logs.",
    status: "INITIALIZING",
    statusType: "initializing",
    tags: ["INITIALIZING"],
    agentName: "Janitor Bot v1.2",
    agentIcon: "🧹",
    progress: 45,
    maxProgress: 100,
    burnRate: "EST 0.1 CR/m",
    totalSpend: "0.00 CR",
    workspaceId: "3049182049182049182",
    companyName: "Log Synthesis Utility",
    missionScope: "Internal utility for cleaning and classifying massive agent trace logs.",
    href: "/workspace?projectId=synth_logs"
  }
]
