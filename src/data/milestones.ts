export interface Milestone {
  id: string;
  sym: string;
  name: string;
  year: number; // 2023 - 2026
  col: number;  // 1 - 8 (Spring 1-2, Summer 3-4, Fall 5-6, Winter 7-8)
  row: number;  // 1 - 4 (2023, 2024, 2025, 2026)
  fam: "mobile" | "cicd" | "infra" | "security";
  famLabel: string;
  status: "Deploying" | "Active" | "Complete";
  platform: string;
  metric: string;
  metricLabel: string;
  notes: string;
}

export const milestones: Milestone[] = [
  // ---- 2023 (Row 1) ----
  {
    id: "vr",
    sym: "Vr",
    name: "Medical VR Project",
    year: 2023,
    col: 5,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile & Web",
    status: "Complete",
    platform: "Three.js / WebGL",
    metric: "FYP",
    metricLabel: "Academic Project",
    notes: "Developed a web-based Medical VR platform using Three.js and WebGL for interactive 3D anatomy visualization during FYP."
  },
  {
    id: "ft",
    sym: "Pg",
    name: "K8s DevOps Programmer",
    year: 2023,
    col: 6,
    row: 1,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "Docker & Kubernetes",
    metric: "AAI/ChunWo",
    metricLabel: "First Job",
    notes: "Began first full-time role at Chun Wo. Containerized legacy enterprise platforms into Docker and initiated migration pipelines to Kubernetes clusters."
  },

  // ---- 2024 (Row 2) ----
  {
    id: "sa",
    sym: "Sf",
    name: "AAI Staff Portal App",
    year: 2024,
    col: 1,
    row: 2,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "Flutter / iOS & Android",
    metric: "Primary",
    metricLabel: "Developer",
    notes: "Served as the primary developer for the AAI Staff Portal App. Built robust native bridges and unified notifications using Firebase Cloud Messaging."
  },
  {
    id: "ci",
    sym: "Fl",
    name: "Fastlane CI/CD Automation",
    year: 2024,
    col: 2,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "Fastlane / Gitlab CI",
    metric: "Auto",
    metricLabel: "Build Gating",
    notes: "Configured Fastlane pipelines with Git tag-triggered builds to automate versioning and code-signed exports directly to App Store Connect and Google Play."
  },
  {
    id: "go",
    sym: "Go",
    name: "ArgoCD GitOps Setup",
    year: 2024,
    col: 3,
    row: 2,
    fam: "infra",
    famLabel: "Cloud",
    status: "Complete",
    platform: "ArgoCD & Helm",
    metric: "UAT/Prod",
    metricLabel: "Sync Loops",
    notes: "Set up GitOps pipelines via ArgoCD. Automated K8s application sync loops using customized Helm values templates."
  },
  {
    id: "sb",
    sym: "Sh",
    name: "Shorebird & Unpub Systems",
    year: 2024,
    col: 4,
    row: 2,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "Shorebird / Unpub",
    metric: "OTA",
    metricLabel: "Hot Fixes",
    notes: "Integrated Shorebird for over-the-air (OTA) code patching to bypass App Store reviews, and configured an Unpub private Dart package repository."
  },
  {
    id: "bg",
    sym: "Bg",
    name: "Blue-Green & Harbor",
    year: 2024,
    col: 5,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "Harbor / K8s",
    metric: "Zero",
    metricLabel: "Downtime",
    notes: "Orchestrated zero-downtime Blue-Green rollouts in Kubernetes combined with secure image tagging on a private Harbor container registry."
  },
  {
    id: "cis",
    sym: "Cs",
    name: "CIS JSpreadsheet Editor",
    year: 2024,
    col: 6,
    row: 2,
    fam: "infra",
    famLabel: "Web",
    status: "Complete",
    platform: "React / JSpreadsheet",
    metric: "BQ / IP",
    metricLabel: "Finance Modules",
    notes: "Built the Contractor Information System (CIS) frontend, implementing high-performance spreadsheet modules for Bill of Quantities (BQ) and payment assessments."
  },

  // ---- 2025 (Row 3) ----
  {
    id: "asw",
    sym: "As",
    name: "AS Watson Mobile Dev",
    year: 2025,
    col: 1,
    row: 3,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "AS Watson",
    metric: "Join",
    metricLabel: "Mobile Developer",
    notes: "Joined AS Watson group as a Mobile Application Developer, transitioning to customer-facing ecommerce and CRM applications."
  },
  {
    id: "aws",
    sym: "Aw",
    name: "AWS Cloud Essentials",
    year: 2025,
    col: 2,
    row: 3,
    fam: "security",
    famLabel: "Personal Development",
    status: "Complete",
    platform: "Amazon Web Services",
    metric: "AWS",
    metricLabel: "Competency",
    notes: "Expanded skills to cover core AWS cloud architecture, VPC peering, and secure serverless hosting environments."
  },
  {
    id: "crm",
    sym: "Cr",
    name: "Million-User CRM App",
    year: 2025,
    col: 3,
    row: 3,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Active",
    platform: "AS Watson CRM",
    metric: "1M+ MAU",
    metricLabel: "Active Users",
    notes: "Core developer of the high-traffic AS Watson CRM app supporting over a million monthly active users."
  },
  {
    id: "opt",
    sym: "Op",
    name: "App Perf Optimization",
    year: 2025,
    col: 7,
    row: 3,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "iOS & Android",
    metric: "Optimized",
    metricLabel: "App Performance",
    notes: "Conducted extensive profiling and performance optimization, resolving critical memory leaks and UI lag on high-volume CRM apps."
  },

  // ---- 2026 (Row 4) ----
  {
    id: "ai",
    sym: "Ai",
    name: "AI Workflow Integration",
    year: 2026,
    col: 1,
    row: 4,
    fam: "security",
    famLabel: "Personal Development",
    status: "Deploying",
    platform: "Workflow Automation",
    metric: "AI Agent",
    metricLabel: "Automation",
    notes: "Integrating AI models and agentic automation workflows into daily development processes and deployment gating."
  }
];
