export interface Milestone {
  id: string;
  sym: string;
  name: string;
  year: number; // 2019 - 2026
  col: number;  // 1 - 8
  row: number;  // 1 - 6
  fam: "mobile" | "cicd" | "infra" | "security";
  famLabel: string;
  status: "Deploying" | "Active" | "Complete";
  platform: string;
  metric: string;
  metricLabel: string;
  notes: string;
}

export const milestones: Milestone[] = [
  // ---- 2023 ----
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
    name: "First Programmer Role",
    year: 2023,
    col: 5,
    row: 3,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "Docker & K8s",
    metric: "1st Job",
    metricLabel: "Full Time",
    notes: "Started first full-time role focused on K8s and DevOps. Containerized legacy platforms into Docker and migrated them to Kubernetes."
  },

  // ---- 2024 ----
  {
    id: "sa",
    sym: "St",
    name: "In-house Staff App",
    year: 2024,
    col: 6,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "iOS & Android",
    metric: "Primary",
    metricLabel: "Developer",
    notes: "Served as the primary developer for the in-house staff mobile application, driving feature development and stability."
  },
  {
    id: "ci",
    sym: "Cd",
    name: "App Store CI/CD",
    year: 2024,
    col: 6,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "App Store / Play Store",
    metric: "Automation",
    metricLabel: "Delivery",
    notes: "Kicked off automated CI/CD pipeline triggers for compilation, signing, and delivery directly to Apple App Store and Google Play."
  },
  {
    id: "go",
    sym: "Go",
    name: "ArgoCD GitOps Setup",
    year: 2024,
    col: 6,
    row: 4,
    fam: "infra",
    famLabel: "Cloud",
    status: "Complete",
    platform: "ArgoCD / Kubernetes",
    metric: "GitOps",
    metricLabel: "Infrastructure",
    notes: "Implemented GitOps-driven deployment workflow utilizing ArgoCD to keep Kubernetes cluster states in sync with Git repositories."
  },
  {
    id: "bg",
    sym: "Bg",
    name: "Blue-Green Deployment",
    year: 2024,
    col: 6,
    row: 5,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "Harbor / Kubernetes",
    metric: "Zero-Downtime",
    metricLabel: "Rollouts",
    notes: "Designed Kubernetes blue-green deployment pipelines integrated with a secure private Harbor container registry."
  },

  // ---- 2025 ----
  {
    id: "asw",
    sym: "As",
    name: "AS Watson Mobile Dev",
    year: 2025,
    col: 7,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "AS Watson",
    metric: "Join",
    metricLabel: "Mobile Dev",
    notes: "Joined AS Watson group as a Mobile Application Developer, taking ownership of customer-facing mobile applications."
  },
  {
    id: "crm",
    sym: "Cr",
    name: "Million-User CRM App",
    year: 2025,
    col: 7,
    row: 2,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Active",
    platform: "AS Watson CRM",
    metric: "1M+ MAU",
    metricLabel: "Active Users",
    notes: "Served as a core developer of the high-traffic CRM app supporting millions of monthly active users at AS Watson."
  },
  {
    id: "opt",
    sym: "Op",
    name: "Performance Optimization",
    year: 2025,
    col: 7,
    row: 3,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "iOS & Android",
    metric: "Optimized",
    metricLabel: "App Performance",
    notes: "Conducted extensive performance profiling and memory leak optimization on the million-user active app."
  },
  {
    id: "aws",
    sym: "Aw",
    name: "AWS Essentials",
    year: 2025,
    col: 7,
    row: 5,
    fam: "security",
    famLabel: "Personal Development",
    status: "Complete",
    platform: "Amazon Web Services",
    metric: "AWS",
    metricLabel: "Competency",
    notes: "Built core competency in Amazon Web Services infrastructure, networking, and serverless compute paradigms."
  },

  // ---- 2026 ----
  {
    id: "ai",
    sym: "Ai",
    name: "AI Workflow Integration",
    year: 2026,
    col: 8,
    row: 6,
    fam: "security",
    famLabel: "Personal Development",
    status: "Deploying",
    platform: "Workflow Automation",
    metric: "AI Agent",
    metricLabel: "Automation",
    notes: "Integrating AI models and agentic automation workflows into daily development processes and deployment gating."
  }
];
