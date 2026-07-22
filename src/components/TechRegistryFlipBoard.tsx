"use client";

/* Hallmark · component: TechRegistryFlipBoard · theme: custom · genre: editorial · macrostructure: custom-03
 * states: default · hover · focus · active · disabled · loading · error · success
 * contrast: pass (46–50)
 */

import { useState } from "react";

export interface TechItem {
  id: string;
  name: string;
  symbol: string;
  categoryTag: string;
  status: "OPERATIONAL" | "ACTIVE" | "EVALUATION";
  log: string;
  metric?: string;
  level?: string;
}

export type CategoryKey = "all" | "devops" | "mobile" | "web" | "data";

export interface CategoryData {
  label: string;
  num: string;
  description: string;
  items: TechItem[];
}

export const ALL_TECH_ITEMS: TechItem[] = [
  // DevOps
  { id: "dk", name: "Docker", symbol: "DK", categoryTag: "CONTAINERIZATION", status: "OPERATIONAL", log: "Multi-stage production container builds and image size optimization.", metric: "100% Isolated", level: "EXPERT" },
  { id: "k8", name: "Kubernetes", symbol: "K8", categoryTag: "ORCHESTRATION", status: "OPERATIONAL", log: "Multi-node cluster management, Helm deployments, and ingress routing.", metric: "Auto-Scale", level: "ADVANCED" },
  { id: "go", name: "ArgoCD", symbol: "GO", categoryTag: "GITOPS SYNC", status: "OPERATIONAL", log: "Declarative GitOps sync loops for automated Kubernetes application delivery.", metric: "Real-time Sync", level: "ADVANCED" },
  { id: "gl", name: "GitLab CI", symbol: "GL", categoryTag: "BUILD PIPELINES", status: "OPERATIONAL", log: "Automated test runner matrix, artifact caching, and auto-tag release pipelines.", metric: "Zero-Downtime", level: "EXPERT" },
  { id: "ek", name: "ELK Stack", symbol: "EK", categoryTag: "LOG TELEMETRY", status: "OPERATIONAL", log: "Elasticsearch, Logstash, and Kibana centralized log stream aggregation.", metric: "Live Telemetry", level: "ADVANCED" },
  { id: "aw", name: "AWS Cloud", symbol: "AW", categoryTag: "INFRASTRUCTURE", status: "OPERATIONAL", log: "ECS, S3, Transit Gateway networking, and IAM policy enforcement.", metric: "Multi-Region", level: "ADVANCED" },
  { id: "ck", name: "CKAD Cert", symbol: "CK", categoryTag: "CERTIFICATION", status: "EVALUATION", log: "Certified Kubernetes Application Developer operational standard.", metric: "Verified", level: "PROFICIENT" },

  // Mobile
  { id: "fl", name: "Flutter", symbol: "FL", categoryTag: "CROSS-PLATFORM", status: "OPERATIONAL", log: "Primary cross-platform SDK for major enterprise CRM and consumer mobile apps.", metric: "60 FPS Native", level: "EXPERT" },
  { id: "sb", name: "Shorebird", symbol: "SB", categoryTag: "OTA HOTPATCH", status: "OPERATIONAL", log: "Automated instant Over-The-Air code pushes bypassing app store queues.", metric: "Instant Patch", level: "EXPERT" },
  { id: "fc", name: "Firebase FCM", symbol: "FC", categoryTag: "PUSH MESSAGING", status: "OPERATIONAL", log: "Targeted push notification templates and background message handlers.", metric: "High Delivery", level: "EXPERT" },
  { id: "io", name: "iOS Swift", symbol: "IO", categoryTag: "NATIVE iOS", status: "OPERATIONAL", log: "Native Swift bridges, MethodChannels, and Xcode build configurations.", metric: "Native Swift", level: "ADVANCED" },
  { id: "an", name: "Android Gradle", symbol: "AN", categoryTag: "NATIVE ANDROID", status: "OPERATIONAL", log: "Gradle build flavor matrix, ProGuard obfuscation, and NDK hooks.", metric: "Optimized APK", level: "ADVANCED" },
  { id: "ta", name: "Tauri Bridge", symbol: "TA", categoryTag: "DESKTOP HYBRID", status: "EVALUATION", log: "Rust-backed lightweight webview desktop native runtime integrations.", metric: "Low Memory", level: "PROFICIENT" },

  // Web
  { id: "rt", name: "React", symbol: "RT", categoryTag: "UI FRAMEWORK", status: "OPERATIONAL", log: "High-performance reactive UI state architectures and dynamic data grids.", metric: "Virtual DOM", level: "EXPERT" },
  { id: "nx", name: "Next.js", symbol: "NX", categoryTag: "SERVER ENGINE", status: "OPERATIONAL", log: "Server-side rendering, App Router, and static site optimization.", metric: "Turbopack", level: "EXPERT" },
  { id: "ts", name: "TypeScript", symbol: "TS", categoryTag: "STRICT TYPES", status: "OPERATIONAL", log: "End-to-end type safety, generic schemas, and robust API contracts.", metric: "100% Typed", level: "EXPERT" },
  { id: "js", name: "JavaScript", symbol: "JS", categoryTag: "SHELL UTILS", status: "OPERATIONAL", log: "ESNext script utilities, Node.js tooling, and build pipeline scripts.", metric: "Node Engine", level: "EXPERT" },
  { id: "ht", name: "HTML / CSS", symbol: "HT", categoryTag: "FLUID STYLES", status: "OPERATIONAL", log: "Semantic HTML5 structure and responsive OKLCH design tokens.", metric: "A11y Validated", level: "EXPERT" },
  { id: "sc", name: "SCSS / Sass", symbol: "SC", categoryTag: "TOKEN PIPELINE", status: "OPERATIONAL", log: "Modular CSS preprocessor architectures and token transformations.", metric: "Scoped CSS", level: "EXPERT" },

  // Data & Infrastructure
  { id: "pg", name: "PostgreSQL", symbol: "PG", categoryTag: "RELATIONAL DB", status: "OPERATIONAL", log: "Relational database schemas, indexing strategies, and query tuning.", metric: "ACID Compliant", level: "EXPERT" },
  { id: "mg", name: "MongoDB", symbol: "MG", categoryTag: "DOCUMENT STORE", status: "OPERATIONAL", log: "Document store collections for event logging and telemetry data.", metric: "NoSQL Flexible", level: "ADVANCED" },
  { id: "ms", name: "SQL Server", symbol: "MS", categoryTag: "LEGACY ENGINE", status: "OPERATIONAL", log: "Stored procedures, index defragmentation, and legacy DB maintenance.", metric: "T-SQL Optimized", level: "ADVANCED" },
  { id: "lx", name: "Linux CLI", symbol: "LX", categoryTag: "SHELL KERNEL", status: "OPERATIONAL", log: "Bash scripts, systemd service units, and security hardening routines.", metric: "POSIX Shell", level: "EXPERT" },
  { id: "vs", name: "VS Code", symbol: "VS", categoryTag: "DEVELOPER IDE", status: "OPERATIONAL", log: "Custom workspace configurations, static analysis, and debugging suites.", metric: "Dev Environment", level: "EXPERT" },
  { id: "os", name: "macOS / Win", symbol: "OS", categoryTag: "TARGET OPERATING SYSTEMS", status: "OPERATIONAL", log: "Cross-compiling desktop binaries across UNIX and Windows kernels.", metric: "Cross-Platform", level: "EXPERT" },
];

export const CATEGORIES_MAP: Record<Exclude<CategoryKey, "all">, { label: string; num: string; description: string }> = {
  devops: {
    label: "DevOps & Cloud",
    num: "01",
    description: "Automated delivery pipelines, container orchestration, and multi-region infrastructure."
  },
  mobile: {
    label: "Mobile Architecture",
    num: "02",
    description: "Cross-platform Flutter SDK, over-the-air hotpatching, and native Swift/Gradle bridges."
  },
  web: {
    label: "Web Systems",
    num: "03",
    description: "Server-side Next.js applications, strict TypeScript schemas, and responsive visual design."
  },
  data: {
    label: "Data & Systems",
    num: "04",
    description: "Relational/NoSQL database engines, Linux kernel automation, and cross-platform desktop targets."
  }
};

export default function TechRegistryFlipBoard() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [activeView, setActiveView] = useState<"grid" | "pipeline">("grid");
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);

  const filteredItems = activeCategory === "all"
    ? ALL_TECH_ITEMS
    : ALL_TECH_ITEMS.filter((item) => {
        if (activeCategory === "devops") return ["dk", "k8", "go", "gl", "ek", "aw", "ck"].includes(item.id);
        if (activeCategory === "mobile") return ["fl", "sb", "fc", "io", "an", "ta"].includes(item.id);
        if (activeCategory === "web") return ["rt", "nx", "ts", "js", "ht", "sc"].includes(item.id);
        if (activeCategory === "data") return ["pg", "mg", "ms", "lx", "vs", "os"].includes(item.id);
        return true;
      });

  const activeTech = ALL_TECH_ITEMS.find((i) => i.id === selectedTechId) || filteredItems[0];

  return (
    <div className="font-sans max-w-full">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-hairline gap-4">
        <div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Production Tech Stack
          </h2>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-paper-2 p-1 border border-hairline rounded">
          <button
            onClick={() => setActiveView("grid")}
            className={`px-3 py-1 text-xs font-typewriter uppercase tracking-wider rounded transition-colors duration-200 cursor-pointer ${
              activeView === "grid"
                ? "bg-paper text-ink font-bold shadow-xs border border-hairline"
                : "text-muted hover:text-ink"
            }`}
          >
            ⊞ Matrix Grid
          </button>
          <button
            onClick={() => setActiveView("pipeline")}
            className={`px-3 py-1 text-xs font-typewriter uppercase tracking-wider rounded transition-colors duration-200 cursor-pointer ${
              activeView === "pipeline"
                ? "bg-paper text-ink font-bold shadow-xs border border-hairline"
                : "text-muted hover:text-ink"
            }`}
          >
            ⇄ Pipeline Map
          </button>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 no-scrollbar" role="tablist" aria-label="Category Filter">
        <button
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => {
            setActiveCategory("all");
            setSelectedTechId(null);
          }}
          className={`flex-shrink-0 px-4 py-2 text-xs font-typewriter uppercase tracking-wider rounded border transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent ${
            activeCategory === "all"
              ? "bg-paper text-ink border-accent font-bold shadow-xs"
              : "bg-paper-2 text-muted border-hairline hover:text-ink hover:border-rule"
          }`}
        >
          <span>ALL MODULES ({ALL_TECH_ITEMS.length})</span>
        </button>

        {(Object.keys(CATEGORIES_MAP) as Exclude<CategoryKey, "all">[]).map((catKey) => {
          const cat = CATEGORIES_MAP[catKey];
          const isActive = activeCategory === catKey;
          return (
            <button
              key={catKey}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveCategory(catKey);
                setSelectedTechId(null);
              }}
              className={`flex-shrink-0 px-4 py-2 text-xs font-typewriter uppercase tracking-wider rounded border transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent ${
                isActive
                  ? "bg-paper text-ink border-accent font-bold shadow-xs"
                  : "bg-paper-2 text-muted border-hairline hover:text-ink hover:border-rule"
              }`}
            >
              <span className="text-accent font-bold mr-1.5">{cat.num}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* View 1: Matrix Grid View */}
      {activeView === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const isSelected = activeTech?.id === item.id;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedTechId(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedTechId(item.id);
                  }
                }}
                className={`p-5 rounded border transition-[background-color,border-color,transform,box-shadow] duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent relative overflow-hidden group ${
                  isSelected
                    ? "bg-paper-3 border-accent shadow-md translate-y-[-2px]"
                    : "bg-paper-2 border-hairline hover:bg-paper-3 hover:border-rule hover:shadow-sm"
                }`}
              >

                {/* Top Badge & Status Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold text-xs px-2 py-0.5 bg-paper-3 text-ink border border-hairline rounded">
                    {item.symbol}
                  </span>
                  <span className="font-typewriter text-2xs text-muted tracking-wider uppercase">
                    {item.categoryTag}
                  </span>
                </div>

                {/* Tech Title */}
                <h3 className="font-display text-lg font-bold text-ink mb-2">
                  {item.name}
                </h3>

                {/* Description Narrative */}
                <p className="font-typewriter text-xs text-ink-2 leading-relaxed mb-4 line-clamp-3">
                  {item.log}
                </p>

                {/* Bottom Metric Badge */}
                <div className="flex items-center justify-between pt-3 border-t border-hairline mt-auto">
                  {item.metric ? (
                    <span className="font-typewriter text-2xs text-ink bg-paper-3 px-2 py-0.5 border border-hairline rounded font-semibold">
                      {item.metric}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="font-typewriter text-2xs text-accent font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 2: Pipeline Map View */}
      {activeView === "pipeline" && (
        <div className="pipeline-map bg-paper-2 border border-hairline rounded p-6">
          <div className="mb-6 pb-4 border-b border-hairline">
            <h3 className="font-display text-xl font-bold text-ink mb-1">
              End-to-End System Pipeline Architecture
            </h3>
            <p className="font-serif text-sm text-ink-2">
              Visualizing data flow across developer IDE, frontend applications, backend services, and cloud DevOps infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1: Workstation & Tooling */}
            <div className="pipeline-node bg-paper p-4 border border-hairline rounded">
              <span className="font-typewriter text-2xs text-accent font-bold block mb-1">01 // WORKSTATION</span>
              <h4 className="font-display font-bold text-base text-ink mb-2">Dev Environments</h4>
              <ul className="font-typewriter text-xs text-ink-2 space-y-1">
                <li>• Linux CLI / Bash Kernel</li>
                <li>• VS Code IDE Automation</li>
                <li>• macOS &amp; Windows Kernels</li>
              </ul>
            </div>

            {/* Step 2: Client Apps */}
            <div className="pipeline-node bg-paper p-4 border border-hairline rounded">
              <span className="font-typewriter text-2xs text-accent font-bold block mb-1">02 // CLIENT APPS</span>
              <h4 className="font-display font-bold text-base text-ink mb-2">Mobile &amp; Web UI</h4>
              <ul className="font-typewriter text-xs text-ink-2 space-y-1">
                <li>• Flutter Cross-Platform</li>
                <li>• Native Swift &amp; Gradle</li>
                <li>• Next.js Server App Router</li>
              </ul>
            </div>

            {/* Step 3: Platform Data */}
            <div className="pipeline-node bg-paper p-4 border border-hairline rounded">
              <span className="font-typewriter text-2xs text-accent font-bold block mb-1">03 // PLATFORM DATA</span>
              <h4 className="font-display font-bold text-base text-ink mb-2">Databases &amp; Persistence</h4>
              <ul className="font-typewriter text-xs text-ink-2 space-y-1">
                <li>• PostgreSQL Relational DB</li>
                <li>• MongoDB Document Store</li>
                <li>• SQL Server Legacy Engine</li>
              </ul>
            </div>

            {/* Step 4: Cloud DevOps */}
            <div className="pipeline-node bg-paper p-4 border border-hairline rounded">
              <span className="font-typewriter text-2xs text-accent font-bold block mb-1">04 // CLOUD DEVOPS</span>
              <h4 className="font-display font-bold text-base text-ink mb-2">CI/CD &amp; Infrastructure</h4>
              <ul className="font-typewriter text-xs text-ink-2 space-y-1">
                <li>• Docker &amp; Kubernetes K8s</li>
                <li>• ArgoCD GitOps Sync</li>
                <li>• AWS Cloud &amp; GitLab CI</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
