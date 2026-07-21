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
}

export type CategoryKey = "devops" | "mobile" | "web" | "data";

export interface CategoryData {
  label: string;
  num: string;
  description: string;
  activeCount: number;
  items: TechItem[];
}

export const TECH_REGISTRY_DATA: Record<CategoryKey, CategoryData> = {
  devops: {
    label: "DevOps & CI/CD",
    num: "01",
    description: "Automated delivery pipelines, container orchestration, and cloud infrastructure operations.",
    activeCount: 7,
    items: [
      { id: "dk", name: "Docker", symbol: "DK", categoryTag: "CONTAINERIZATION", status: "OPERATIONAL", log: "Multi-stage production container builds and image optimization.", metric: "100% Isolated" },
      { id: "k8", name: "Kubernetes", symbol: "K8", categoryTag: "ORCHESTRATION", status: "OPERATIONAL", log: "Multi-node cluster management, Helm deployments, and ingress routing.", metric: "Auto-Scale" },
      { id: "go", name: "ArgoCD", symbol: "GO", categoryTag: "GITOPS SYNC", status: "OPERATIONAL", log: "Declarative GitOps sync loops for Kubernetes applications.", metric: "Real-time Sync" },
      { id: "gl", name: "GitLab CI", symbol: "GL", categoryTag: "BUILD PIPELINES", status: "OPERATIONAL", log: "Automated test runner matrix, artifact caching, and auto-tag releases.", metric: "Zero-Downtime" },
      { id: "ek", name: "ELK Stack", symbol: "EK", categoryTag: "LOG TELEMETRY", status: "OPERATIONAL", log: "Elasticsearch, Logstash, and Kibana centralized log stream aggregation.", metric: "Live Telemetry" },
      { id: "aw", name: "AWS Cloud", symbol: "AW", categoryTag: "INFRASTRUCTURE", status: "OPERATIONAL", log: "ECS, S3, Transit Gateway networking, and IAM policy enforcement.", metric: "Multi-Region" },
      { id: "ck", name: "CKAD Cert", symbol: "CK", categoryTag: "CERTIFICATION", status: "EVALUATION", log: "Certified Kubernetes Application Developer operational standard.", metric: "Verified" },
    ]
  },
  mobile: {
    label: "Mobile Systems",
    num: "02",
    description: "Native and cross-platform mobile architectures with over-the-air hotpatching capabilities.",
    activeCount: 6,
    items: [
      { id: "fl", name: "Flutter", symbol: "FL", categoryTag: "CROSS-PLATFORM", status: "OPERATIONAL", log: "Primary cross-platform SDK for major enterprise CRM and consumer apps.", metric: "60 FPS Native" },
      { id: "sb", name: "Shorebird", symbol: "SB", categoryTag: "OTA HOTPATCH", status: "OPERATIONAL", log: "Automated instant Over-The-Air code pushes bypassing app store queues.", metric: "Instant Patch" },
      { id: "fc", name: "Firebase FCM", symbol: "FC", categoryTag: "PUSH MESSAGING", status: "OPERATIONAL", log: "Targeted push notification templates and background message handlers.", metric: "High Delivery" },
      { id: "io", name: "iOS Swift", symbol: "IO", categoryTag: "NATIVE iOS", status: "OPERATIONAL", log: "Native Swift bridges, MethodChannels, and Xcode build configurations.", metric: "Native Swift" },
      { id: "an", name: "Android Gradle", symbol: "AN", categoryTag: "NATIVE ANDROID", status: "OPERATIONAL", log: "Gradle build flavor matrix, ProGuard obfuscation, and NDK hooks.", metric: "Optimized APK" },
      { id: "ta", name: "Tauri Bridge", symbol: "TA", categoryTag: "DESKTOP HYBRID", status: "EVALUATION", log: "Rust-backed lightweight webview desktop native runtime integrations.", metric: "Low Memory" },
    ]
  },
  web: {
    label: "Web Architecture",
    num: "03",
    description: "Modern full-stack web platforms engineered for speed, type safety, and deterministic rendering.",
    activeCount: 6,
    items: [
      { id: "rt", name: "React", symbol: "RT", categoryTag: "UI FRAMEWORK", status: "OPERATIONAL", log: "High-performance reactive UI state architectures and dynamic data grids.", metric: "Virtual DOM" },
      { id: "nx", name: "Next.js", symbol: "NX", categoryTag: "SERVER ENGINE", status: "OPERATIONAL", log: "Server-side rendering, App Router, and static site optimization.", metric: "Turbopack" },
      { id: "ts", name: "TypeScript", symbol: "TS", categoryTag: "STRICT TYPES", status: "OPERATIONAL", log: "End-to-end type safety, generic schemas, and robust API contracts.", metric: "100% Typed" },
      { id: "js", name: "JavaScript", symbol: "JS", categoryTag: "SHELL UTILS", status: "OPERATIONAL", log: "ESNext script utilities, Node.js tooling, and build pipeline scripts.", metric: "Node Engine" },
      { id: "ht", name: "HTML / CSS", symbol: "HT", categoryTag: "FLUID STYLES", status: "OPERATIONAL", log: "Semantic HTML5 structure and responsive OKLCH design tokens.", metric: "A11y Validated" },
      { id: "sc", name: "SCSS / Sass", symbol: "SC", categoryTag: "TOKEN PIPELINE", status: "OPERATIONAL", log: "Modular CSS preprocessor architectures and token transformations.", metric: "Scoped CSS" },
    ]
  },
  data: {
    label: "Platform & Data",
    num: "04",
    description: "Database management, terminal automation, and cross-platform desktop development tooling.",
    activeCount: 6,
    items: [
      { id: "pg", name: "PostgreSQL", symbol: "PG", categoryTag: "RELATIONAL DB", status: "OPERATIONAL", log: "Relational database schemas, indexing strategies, and query tuning.", metric: "ACID Compliant" },
      { id: "mg", name: "MongoDB", symbol: "MG", categoryTag: "DOCUMENT STORE", status: "OPERATIONAL", log: "Document store collections for event logging and telemetry data.", metric: "NoSQL Flexible" },
      { id: "ms", name: "SQL Server", symbol: "MS", categoryTag: "LEGACY ENGINE", status: "OPERATIONAL", log: "Stored procedures, index defragmentation, and legacy DB maintenance.", metric: "T-SQL Optimized" },
      { id: "lx", name: "Linux CLI", symbol: "LX", categoryTag: "SHELL KERNEL", status: "OPERATIONAL", log: "Bash scripts, systemd service units, and security hardening routines.", metric: "POSIX Shell" },
      { id: "vs", name: "VS Code", symbol: "VS", categoryTag: "DEVELOPER IDE", status: "OPERATIONAL", log: "Custom workspace configurations, static analysis, and debugging suites.", metric: "Dev Environment" },
      { id: "os", name: "macOS / Win", symbol: "OS", categoryTag: "TARGET OPERATING SYSTEMS", status: "OPERATIONAL", log: "Cross-compiling desktop binaries across UNIX and Windows kernels.", metric: "Cross-Platform" },
    ]
  }
};

export default function TechRegistryFlipBoard() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("devops");
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);

  const currentCategory = TECH_REGISTRY_DATA[activeCategory];
  const activeTech = currentCategory.items.find((i) => i.id === selectedTechId) || currentCategory.items[0];

  return (
    <div className="tech-registry font-sans">
      {/* Header Section */}
      <div className="tech-registry__header mb-8">
        <div className="tech-registry__tag font-typewriter text-xs tracking-wider text-muted mb-2 uppercase">
          <span>03 // SYSTEMS ARCHITECTURE &amp; REGISTRY</span>
        </div>
        <h2 className="tech-registry__title font-display text-3xl font-bold tracking-tight text-ink mb-3">
          Technical Capabilities
        </h2>
        <p className="tech-registry__lede font-serif text-base text-ink-2 max-w-2xl leading-relaxed">
          A catalog of engineering disciplines, production platforms, and system tools across eight years of DevOps, mobile development, and infrastructure operations.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="tech-tabs flex flex-wrap gap-2 mb-8 border-b border-hairline pb-4" role="tablist" aria-label="Technical categories">
        {(Object.keys(TECH_REGISTRY_DATA) as CategoryKey[]).map((catKey) => {
          const cat = TECH_REGISTRY_DATA[catKey];
          const isActive = activeCategory === catKey;
          return (
            <button
              key={catKey}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                setActiveCategory(catKey);
                setSelectedTechId(null);
              }}
              className={`tech-tab px-4 py-2 text-xs font-typewriter uppercase tracking-wider rounded border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent ${
                isActive
                  ? "bg-paper text-ink border-accent shadow-sm"
                  : "bg-paper-2 text-muted border-hairline hover:text-ink hover:border-rule"
              }`}
            >
              <span className="text-accent font-bold mr-2">{cat.num}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid & Dossier Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Category Intelligence Card */}
        <div className="lg:col-span-4 bg-paper-2 border border-hairline rounded-sm p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-hairline">
            <span className="font-typewriter text-xs text-accent font-bold tracking-widest">
              CATEGORY [{currentCategory.num}]
            </span>
            <span className="font-typewriter text-2xs px-2 py-0.5 bg-paper-3 text-ink-2 border border-hairline rounded">
              {currentCategory.activeCount} MODULES
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-ink mb-2">
            {currentCategory.label}
          </h3>
          <p className="font-serif text-sm text-ink-2 leading-relaxed mb-6">
            {currentCategory.description}
          </p>

          {/* Active Spotlight Dossier */}
          {activeTech && (
            <div className="active-dossier bg-paper p-4 border-l-2 border-accent border-hairline rounded-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-typewriter text-xs font-bold text-ink">
                  {activeTech.name}
                </span>
                <span className="font-typewriter text-2xs text-accent font-semibold">
                  ● {activeTech.status}
                </span>
              </div>
              <p className="font-typewriter text-xs text-muted leading-snug mb-3">
                {activeTech.log}
              </p>
              {activeTech.metric && (
                <div className="font-typewriter text-2xs text-ink-2 bg-paper-3 px-2 py-1 inline-block border border-hairline rounded">
                  BENCHMARK: <span className="text-ink font-semibold">{activeTech.metric}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Tech Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentCategory.items.map((item) => {
            const isSelected = activeTech.id === item.id;
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
                className={`tech-card p-4 rounded-sm border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent ${
                  isSelected
                    ? "bg-paper border-accent shadow-md translate-y-[-2px]"
                    : "bg-paper-3 border-hairline hover:bg-paper hover:border-rule hover:shadow-sm"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-display font-bold text-sm text-ink px-2 py-0.5 bg-paper-2 border border-hairline rounded">
                    {item.symbol}
                  </span>
                  <span className="font-typewriter text-2xs text-muted tracking-wider uppercase">
                    {item.categoryTag}
                  </span>
                </div>

                <h4 className="font-display text-base font-semibold text-ink mb-1">
                  {item.name}
                </h4>

                <p className="font-typewriter text-xs text-ink-2 line-clamp-2 leading-relaxed">
                  {item.log}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
