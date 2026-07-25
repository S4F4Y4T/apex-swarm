# Product Requirements Document (PRD): The Dark Factory Platform

- **Document Version:** 1.0.0
- **Status:** Baseline Specification
- **Product Concept:** Autonomous Software Factory with Enforced Agentic Process Boundaries

---

## 1. Executive Summary & Core Philosophy

### 1.1 Vision
The Dark Factory Platform democratizes software creation by providing an autonomous, multi-agent engine that builds production-grade software without requiring technical or product development expertise from the end user.

### 1.2 The Problem
Unstructured AI coding ("vibe coding") lacks standardized processes, architectural guardrails, and compliance oversight. This leads to agent drift, broken syntax loops, bloated context windows, unmaintainable codebases, and unpredicted credit consumption.

### 1.3 The Solution
A centralized platform that enforces Document-Driven Agentic Software (DDaS) principles, brand guidelines, and strict SDLC standards. By executing agents inside isolated file-system sandboxes via the OpenCode SDK and orchestrating them through the Model Context Protocol (MCP), the platform transforms high-level intent into deterministic software outputs under a controlled credit economy.

---

## 2. System Architecture & Core Components

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             ZEROCLAW ORCHESTRATOR                                │
│          (Translates User Intent, Manages State, Enforces Process Gates)          │
└─────────┬──────────────────────────────────────────────────────────────┬─────────┘
          │                                                              │
          │ (MCP Protocol / JSON-RPC 2.0)                                │ (Reads Manifest)
          ▼                                                              ▼
┌──────────────────────────────────────┐               ┌───────────────────────────┐
│            OPENCODE SDK              │               │     ENFORCED .skills/     │
│   (Dynamic Agent Process Runtime)    │               │  Company Profile & Brand  │
├──────────────────────────────────────┤               │  SDLC & Testing Protocols │
│  🤖 Planner   │  🤖 Auditor          │               │  DDaS Matrix Guidelines   │
│  🤖 Developer │  🤖 Tester           │               └─────────────┬─────────────┘
└─────────┬────────────────────────────┘                             │
          │                                                          │
          ▼                                                          ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         ISOLATED PROJECT DIRECTORY                               │
│                         /projects/[project_id]/                                  │
│   ├── .skills/          (Injected Guardrails & Process Standards)              │
│   ├── workspace/        (Generated Application Codebase & Artifacts)             │
│   └── logs/             (Raw Stdout/Stderr & Audit Trails)                       │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 The Orchestrator (Zeroclaw)
* **Role:** The master supervisor and state machine for all projects.
* **Responsibilities:** Analyzes incoming user goals, spawns agent fleets, assigns tasks, controls sequential handoffs, manages Human-in-the-Loop (HITL) triggers, and enforces credit limits.

### 2.2 Execution Protocol (MCP & OpenCode SDK)
* **Model Context Protocol (MCP):** Acts as the standard communication bus. Zeroclaw uses MCP to query tools, read workspace resources, pass contexts, and update statuses across agents.
* **OpenCode SDK:** Programmatically initializes, executes, and spins down lightweight, isolated agent processes on demand.

### 2.3 Agent Fleet Roles
* **Planner / Interviewer Agent:** Conducts discovery sessions with the user to refine specifications into actionable DDas artifacts.
* **Auditor Agent:** Reviews software design and code against `.skills` policies. Intercepts non-compliant diffs before merge.
* **Developer Agent:** Writes, refactors, and updates code inside the workspace sandbox.
* **Tester Agent:** Executes unit, integration, and syntax tests, streaming results back to the Auditor.

---

## 3. Directory Isolation & Enforced .skills

### 3.1 Project File-System Structure
Every project provisioning creates an isolated root directory on the system:

```plaintext
/projects/[project_id]/
├── .skills/
│   ├── company_profile.json
│   ├── brand_guidelines.md
│   ├── sdlc_rules.yaml
│   └── ddas_schema.json
├── workspace/
│   └── [Generated Application Source Code]
└── logs/
    └── execution_stream.log
```

### 3.2 The `.skills` Policy Engine
Agents launched via the OpenCode SDK are bound to the local `.skills/` directory. An agent cannot modify files or execute commands that violate the configurations defined in these files:
* **Company Profile:** Domain rules, regulatory compliance, vocabulary.
* **Brand Guidelines:** Visual styling constraints, allowed UI component libraries, theme tokens.
* **SDLC Rules:** Mandatory unit test coverage metrics, linting standards, maximum iteration loops.
* **DDaS Schema:** The structural specification requiring every feature to be documented prior to implementation.

---

## 4. Credit-Based Billing & Resource Engine

### 4.1 Credit Consumption Tiers
To abstract token complexity into a transparent utility currency, operations burn credits based on task intensity:

| Tier Level | Operations | Credit Multiplier |
| :--- | :--- | :--- |
| **Tier 1: Orchestration** | Zeroclaw state changes, task routing via MCP | Low (~0.1 CR / action) |
| **Tier 2: Planning & Audit** | DDaS processing, architecture review, interview parsing | Medium (~0.5 CR / min) |
| **Tier 3: Execution & Test** | Code generation passes, automated test suites, syntax loops | High (~1.2 - 2.0 CR / min) |

### 4.2 Infrastructure Profiles
* **Platform-Hosted Infrastructure (Default):** Platform manages API compute across LLMs; credits are deducted directly from the user's wallet balance.
* **Bring Your Own Key (BYOK):** User supplies API keys for underlying providers (e.g., Anthropic, OpenAI). The platform charges a flat orchestration fee for Zeroclaw and MCP infrastructure usage.

### 4.3 Runaway Safeguards & Cost Guardrails
* **Max Concurrency Limits:** User-defined ceiling on simultaneous OpenCode SDK instances.
* **Runaway Loop Protection:** If an agent fails automated compilation/testing $N$ consecutive times (default: 5 attempts), Zeroclaw freezes the process, cuts credit burn, and creates an HITL ticket.
* **Pre-Flight Estimations:** Phase transitions (e.g., Planning $\rightarrow$ Development) trigger a projected cost calculation requiring user approval if it exceeds pre-set thresholds.

---

## 5. UI/UX Functional Specifications

### 5.1 Global Dashboard (Mission Control)
* **Entry Point:** The root URL (`/`) serves as the primary system entry point and central dashboard.
* **Metrics Header:** Real-time summary cards displaying Active Executions, Credit Fuel Gauge (with live burn rate chart and estimated runway time), and Action Required Badge.
* **Attention Required Queue (HITL):** High-priority card feed listing paused pipelines (e.g., `Cattlesync -> Planner -> Awaiting Database Schema Approval`). Offers a single-click "Jump to Interview" button.
* **Project Fleet Matrix:** Dual-view table or card grid detailing project names, system sandbox paths, active agents, current SDLC phase, and 24-hour credit burn.
* **Navigation Architecture:** Simplified layout optimized for focus. System-wide telemetry details have been decoupled from the primary sidebar navigation menu to minimize noise and concentrate interaction on project workflows.

### 5.2 Project Workspace Views
* **Access:** Users select active hubs via a project dropdown switcher in the Dashboard or access via the Projects explorer.
* **Pre-Flight Config & Skills:** Dashboard to map specific LLMs to agent roles (e.g., Claude 3.5 Sonnet for Developer, GPT-4o for Planner) and upload/edit `.skills` files.
* **Interactive Factory Board (Kanban):**
  * **Columns:** Backlog $\rightarrow$ In-Progress $\rightarrow$ Auditing $\rightarrow$ Human Verification $\rightarrow$ Done.
  * Cards show active agent badges (`[🤖 Developer]`), task progress, and local working directory sub-paths.
* **Interaction Hub:**
  * **Left Panel:** Real-time read-only tree view of `/projects/[project_id]/workspace/`.
  * **Right Panel:** Structured chat interface for interviews with the Planner Agent, featuring dynamic input controls (radio options, checkboxes) generated by the agent.
  * **Live Factory Terminal & Log:** Monospaced stream of MCP stdio/stdout, equipped with log level filters (INFO, WARN, CRITICAL) and a Git-style code diff inspector.

---

## 6. Functional Workflows & Sequence

```
[User Brief] ──► (Create Project) ──► [Provision /projects/id/]
                                              │
                                              ▼
                                 [Inject .skills Configuration]
                                              │
                                              ▼
[Planner Interview] ◄──(OpenCode SDK)─── [Zeroclaw Core]
         │                                    │
         ▼                                    ▼
[DDas Specs Approved] ───────────────► [Invoke Developer Agent]
                                              │
                                              ▼
                                   [Execute Code Changes]
                                              │
                                              ▼
[HITL Escalation] ◄───(Failure > 5x)─── [Auditor & Tester]
         │                                    │
         ▼                                    ▼ (Pass)
[Human Approval] ────────────────────► [Merge to Workspace / Done]
```

1. **Initialization:** User enters prompt $\rightarrow$ Zeroclaw provisions `/projects/[project_id]/` $\rightarrow$ populates `.skills/`.
2. **Discovery:** Zeroclaw launches Planner agent via OpenCode SDK $\rightarrow$ Planner interviews user in Interaction Hub $\rightarrow$ finalizes DDas specification document.
3. **Execution & Gatekeeping:** Zeroclaw delegates tasks to Developer agent $\rightarrow$ Developer writes code in `/workspace/` $\rightarrow$ Auditor agent evaluates diff against `.skills/` guidelines $\rightarrow$ Tester agent runs automated suites.
4. **Completion or Escalation:** Upon passing quality checks, task moves to Done. If tests fail repeatedly or explicit user input is needed, Zeroclaw pauses execution and alerts the user via the HITL queue.

---

## 7. Non-Functional Requirements (NFRs)

* **Performance & Latency:** Dashboard state updates via MCP/WebSocket must reflect within $< 200\text{ ms}$ of local agent log output.
* **Security & Isolation:** Agents are strictly restricted to their designated project root path using system sandboxing; file system traversal outside `/projects/[project_id]/` is blocked.
* **Reliability & Crash Recovery:** In the event of a system or process interruption, Zeroclaw restores project state from the last committed DDas checkpoint.
* **Scalability:** The orchestration layer supports up to 50 concurrent OpenCode SDK worker instances per workspace node without log dropping or state desynchronization.