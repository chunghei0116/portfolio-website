"use client";

import { useState, useEffect } from "react";

interface Milestone {
  id: string;
  sym: string;
  name: string;
  year: number; // 2019 - 2026
  col: number;  // 1 - 8
  row: number;  // 1 - 4
  fam: "mobile" | "cicd" | "infra" | "security";
  famLabel: string;
  status: "Deploying" | "Active" | "Complete";
  platform: string;
  metric: string;
  metricLabel: string;
  notes: string;
}

const milestones: Milestone[] = [
  // ---- Row 1: Mobile Client (mobile) ----
  {
    id: "kd",
    sym: "Kd",
    name: "Kotlin Offline Database",
    year: 2019,
    col: 1,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "Android (Kotlin)",
    metric: "100%",
    metricLabel: "Offline Sync",
    notes: "Shipped native Kotlin offline storage engine with SQLite cache and bi-directional synchronizer."
  },
  {
    id: "se",
    sym: "Se",
    name: "Socket Sync Engine",
    year: 2020,
    col: 2,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "iOS (Swift)",
    metric: "<15ms",
    metricLabel: "Socket Ping",
    notes: "Designed low-latency real-time socket client in Swift, managing local thread pooling and thread-safe store updates."
  },
  {
    id: "ui",
    sym: "Ui",
    name: "Unified App Client",
    year: 2021,
    col: 3,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "Swift / Kotlin",
    metric: "0.01%",
    metricLabel: "Crash Rate",
    notes: "Redesigned native mobile client interface with offline failover logic, ensuring 99.99% crash-free sessions."
  },
  {
    id: "nb",
    sym: "Nb",
    name: "JS-to-Native Bridge",
    year: 2022,
    col: 4,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "iOS & Android",
    metric: "3.5x",
    metricLabel: "Speedup",
    notes: "Engineered high-performance interprocess message bridge allowing hybrid web modules to invoke hardware-accelerated APIs."
  },
  {
    id: "fl",
    sym: "Fl",
    name: "Fastlane CD Pipelines",
    year: 2023,
    col: 5,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "Fastlane / Ruby",
    metric: "10m",
    metricLabel: "Release Time",
    notes: "Automated mobile provisioning profiles and certificate syncs. Replaced manual releases with zero-touch Fastlane triggers."
  },
  {
    id: "tc",
    sym: "Tc",
    name: "Native Telemetry Client",
    year: 2024,
    col: 6,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Active",
    platform: "iOS & Android",
    metric: "10M+",
    metricLabel: "Events / Day",
    notes: "Designed non-blocking telemetry tracer library compiling frame rates, CPU spikes, and stack traces directly to metrics clusters."
  },
  {
    id: "mc",
    sym: "Mc",
    name: "Mac Studio Runner Farm",
    year: 2025,
    col: 7,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Complete",
    platform: "macOS Cluster",
    metric: "16 Nodes",
    metricLabel: "Bare-Metal",
    notes: "Provisioned and automated a hardware cluster of Mac Studios on-premises for high-density parallel iOS compilation."
  },
  {
    id: "v26",
    sym: "V26",
    name: "Vol. 26 Delivery Framework",
    year: 2026,
    col: 8,
    row: 1,
    fam: "mobile",
    famLabel: "Mobile",
    status: "Deploying",
    platform: "Unified App Spec",
    metric: "1 click",
    metricLabel: "Promotion",
    notes: "Deploying standard compilation specifications for next-generation automated client-app delivery pipelines."
  },

  // ---- Row 2: DevOps (cicd) ----
  {
    id: "gl",
    sym: "Gl",
    name: "GitLab Build Automation",
    year: 2019,
    col: 1,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "GitLab CI",
    metric: "20 min",
    metricLabel: "Build Time",
    notes: "Set up the initial automated test and build pipeline for Android apk packaging, moving away from local manual exports."
  },
  {
    id: "da",
    sym: "Da",
    name: "Docker Build Agent Farm",
    year: 2020,
    col: 2,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "Docker / Linux",
    metric: "100%",
    metricLabel: "Clean States",
    notes: "Introduced isolated container-based compilers to eliminate artifacts and caching drift across build iterations."
  },
  {
    id: "tg",
    sym: "Tg",
    name: "AWS Multi-Region Transit",
    year: 2021,
    col: 3,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "AWS Transit Gateway",
    metric: "99.99%",
    metricLabel: "Route Uptime",
    notes: "Automated routing configurations across VPC meshes using automated pipeline deployments to ensure connectivity."
  },
  {
    id: "tf",
    sym: "Tf",
    name: "Terraform Infrastructure",
    year: 2022,
    col: 4,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "Terraform / AWS",
    metric: "150+",
    metricLabel: "Resources",
    notes: "Migrating whole cloud layout to reusable Terraform modules, guaranteeing repeatable staging and production stacks."
  },
  {
    id: "ek",
    sym: "Ek",
    name: "Kubernetes Orchestration",
    year: 2023,
    col: 5,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "AWS EKS",
    metric: "0s",
    metricLabel: "Downtime",
    notes: "Provisioned auto-scaling EKS cluster utilizing spot instances to balance costs and service resilience."
  },
  {
    id: "zt",
    sym: "Zt",
    name: "Zero-Trust Mesh Networks",
    year: 2024,
    col: 6,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Active",
    platform: "Boundary / Vault",
    metric: "Zero",
    metricLabel: "Static Keys",
    notes: "Integrated Vault Dynamic Secrets inside GitLab execution jobs. Replaced static tokens with temporary AWS IAM roles."
  },
  {
    id: "ko",
    sym: "Ko",
    name: "Ephemeral Sandbox Operator",
    year: 2025,
    col: 7,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Complete",
    platform: "Go / Kubernetes API",
    metric: "5 min",
    metricLabel: "TTL Expiry",
    notes: "Developed Go-based Kubernetes operator spinning up on-demand staging environments per PR and tearing them down after review."
  },
  {
    id: "hc",
    sym: "Hc",
    name: "Hybrid Cloud Control",
    year: 2026,
    col: 8,
    row: 2,
    fam: "cicd",
    famLabel: "DevOps",
    status: "Deploying",
    platform: "K3s / Bare-Metal",
    metric: "<5ms",
    metricLabel: "Internal Latency",
    notes: "Bridging AWS control panels with bare-metal on-premises Mac/Linux execution nodes through encrypted VPC tunnels."
  },

  // ---- Row 3: Cloud (infra) ----
  {
    id: "cc",
    sym: "Cc",
    name: "CI Cache Layer",
    year: 2019,
    col: 1,
    row: 3,
    fam: "infra",
    famLabel: "Cloud",
    status: "Complete",
    platform: "Docker Registry",
    metric: "-40%",
    metricLabel: "Build Time",
    notes: "Optimized Docker layer caching and intermediate layer compression, cutting standard job execution time substantially."
  },
  {
    id: "vh",
    sym: "Vh",
    name: "VM Android Emulator Host",
    year: 2020,
    col: 2,
    row: 3,
    fam: "infra",
    famLabel: "Cloud",
    status: "Complete",
    platform: "Linux KVM",
    metric: "12 Nodes",
    metricLabel: "Capacity",
    notes: "Migrated Android virtualization workloads onto high-performance bare-metal servers for parallel test capability."
  },
  {
    id: "vm",
    sym: "Vm",
    name: "VPC Transit Peering",
    year: 2021,
    col: 3,
    row: 3,
    fam: "infra",
    famLabel: "Cloud",
    status: "Complete",
    platform: "Terraform / AWS",
    metric: "12 VPCs",
    metricLabel: "Connected",
    notes: "Automated peer-to-peer VPC transit networks and secure network boundaries via code pipeline integration."
  },
  {
    id: "is",
    sym: "Is",
    name: "IaC Staging Pre-flight",
    year: 2022,
    col: 4,
    row: 3,
    fam: "infra",
    famLabel: "Cloud",
    status: "Complete",
    platform: "GitHub Actions",
    metric: "100%",
    metricLabel: "Plan Check",
    notes: "Introduced automated Terraform plan reviews and security vulnerability linting via GHA PR comments."
  },
  {
    id: "cn",
    sym: "Cn",
    name: "CDN Asset Edge",
    year: 2023,
    col: 5,
    row: 3,
    fam: "infra",
    famLabel: "Cloud",
    status: "Complete",
    platform: "CloudFront / S3",
    metric: "99.98%",
    metricLabel: "Cache Hit",
    notes: "Deployed global multi-region asset caching CDN endpoints for mobile applications, reducing latency globally."
  },
  {
    id: "ds",
    sym: "Ds",
    name: "DB Read-Replica Router",
    year: 2024,
    col: 6,
    row: 3,
    fam: "infra",
    famLabel: "Cloud",
    status: "Active",
    platform: "PostgreSQL / AWS",
    metric: "0s",
    metricLabel: "Failover TTL",
    notes: "Automated read-replica routing and automated database failover states, protecting critical user session data pools."
  },
  {
    id: "ac",
    sym: "Ac",
    name: "GitOps ArgoCD Stack",
    year: 2025,
    col: 7,
    row: 3,
    fam: "infra",
    famLabel: "Cloud",
    status: "Complete",
    platform: "ArgoCD / EKS",
    metric: "10s",
    metricLabel: "Sync Loop",
    notes: "Implemented GitOps-driven application rollouts on EKS using ArgoCD, aligning live states to Git source repositories."
  },
  {
    id: "co",
    sym: "Co",
    name: "Cloud Cost Pipeline",
    year: 2026,
    col: 8,
    row: 3,
    fam: "infra",
    famLabel: "Cloud",
    status: "Deploying",
    platform: "AWS Cost API",
    metric: "-35%",
    metricLabel: "Spend Limit",
    notes: "Deploying cost monitoring and automated cluster sleep timers saving monthly infrastructure expenditures."
  },

  // ---- Row 4: Personal Development (security) ----
  {
    id: "ad",
    sym: "Ad",
    name: "Android Developer Cert",
    year: 2019,
    col: 1,
    row: 4,
    fam: "security",
    famLabel: "Personal Development",
    status: "Complete",
    platform: "Google Cert",
    metric: "Pass",
    metricLabel: "Credential",
    notes: "Earned the official Associate Android Developer Certification from Google, validating native application design expertise."
  },
  {
    id: "os",
    sym: "Os",
    name: "Open Source FASTLANE",
    year: 2020,
    col: 2,
    row: 4,
    fam: "security",
    famLabel: "Personal Development",
    status: "Complete",
    platform: "GitHub Contributions",
    metric: "10+ PRs",
    metricLabel: "Merged",
    notes: "Contributed automation enhancements and build scripting features to Fastlane and community plugins."
  },
  {
    id: "me",
    sym: "Me",
    name: "Engineering Mentorship",
    year: 2021,
    col: 3,
    row: 4,
    fam: "security",
    famLabel: "Personal Development",
    status: "Complete",
    platform: "Internal Initiative",
    metric: "5 Juniors",
    metricLabel: "Mentored",
    notes: "Established peer mentoring circles for junior mobile developers, accelerating onboarding and pipeline literacy."
  },
  {
    id: "sa",
    sym: "Sa",
    name: "AWS Solutions Architect",
    year: 2022,
    col: 4,
    row: 4,
    fam: "security",
    famLabel: "Personal Development",
    status: "Complete",
    platform: "AWS Certification",
    metric: "Pass",
    metricLabel: "Credential",
    notes: "Completed AWS Certified Solutions Architect Associate (SAA-C03) testing to formalize enterprise cloud system routing models."
  },
  {
    id: "sp",
    sym: "Sp",
    name: "DevOps Community Speaker",
    year: 2023,
    col: 5,
    row: 4,
    fam: "security",
    famLabel: "Personal Development",
    status: "Complete",
    platform: "HK DevOps Meetup",
    metric: "150+",
    metricLabel: "Attendees",
    notes: "Presented a technical session on 'Scaling Bare-Metal Mac Studios for high-speed iOS build pipelines' at local meetup circles."
  },
  {
    id: "ck",
    sym: "Ck",
    name: "Kubernetes Administrator",
    year: 2024,
    col: 6,
    row: 4,
    fam: "security",
    famLabel: "Personal Development",
    status: "Complete",
    platform: "CNCF Certification",
    metric: "CKA",
    metricLabel: "Certified",
    notes: "Earned the Certified Kubernetes Administrator (CKA) designation to solidify orchestrator deployment expertise."
  },
  {
    id: "ta",
    sym: "Ta",
    name: "Zero-Trust Tech Author",
    year: 2025,
    col: 7,
    row: 4,
    fam: "security",
    famLabel: "Personal Development",
    status: "Complete",
    platform: "Medium / Dev.to",
    metric: "25k+",
    metricLabel: "Reads",
    notes: "Authored detailed engineering guides analyzing cluster-level Dynamic Secrets and secure runner execution design architectures."
  },
  {
    id: "tl",
    sym: "Tl",
    name: "Engineering Deliverables Lead",
    year: 2026,
    col: 8,
    row: 4,
    fam: "security",
    famLabel: "Personal Development",
    status: "Deploying",
    platform: "Tech Governance",
    metric: "Standard",
    metricLabel: "Implementation",
    notes: "Leading organizational steering committees to define secure and standard continuous integration guidelines for engineering groups."
  }
];

export default function Home() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"default" | "loading" | "success" | "error">("default");

  const selectMilestone = (m: Milestone) => {
    if (selectedMilestone && m.id === selectedMilestone.id) {
      setIsSwapping(true);
      setTimeout(() => {
        setSelectedMilestone(null);
        setIsSwapping(false);
      }, 180);
      return;
    }
    setIsSwapping(true);
    setTimeout(() => {
      setSelectedMilestone(m);
      setIsSwapping(false);
    }, 180);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !message.trim()) {
      setFormStatus("error");
      return;
    }
    setFormStatus("loading");
    setTimeout(() => {
      setFormStatus("success");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <>
      <header className="masthead" role="banner">
        <div className="masthead__inner">
          <a className="wordmark" href="#top" id="top">
            <span className="wordmark__mark" aria-hidden="true">Jt</span>
            <span className="wordmark__name">Jones Tse</span>
            <span className="wordmark__sub">Mobile &amp; DevOps Engineering</span>
          </a>
          <nav className="masthead__nav" aria-label="Primary">
            <a href="#reading">How to read the grid</a>
            <a href="#table">Milestone Index</a>
            <a href="#contact">Signal Terminal</a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Intro */}
        <section className="intro" aria-labelledby="intro-title">
          <p className="eyebrow">The Career Log &amp; Milestones</p>
          <h1 className="intro__title" id="intro-title">
            Eight years of pipelines, systems, and code in one grid.
          </h1>
          <p className="intro__lede">
            I don't write my resume as a chronological list of bullet points. A list flattens complex engineering decisions — scaling clusters, writing compilers, automated certs, and debugging network sockets — into a single line of text. Here is the grid: rows by system discipline, columns by year. Select a block to read its telemetry log.
          </p>

          <dl className="axes" aria-label="How the table is arranged">
            <div className="axes__row">
              <dt>Down the rows</dt>
              <dd>Discipline, from client-facing Mobile down to Cloud, DevOps, and Personal Development layers.</dd>
            </div>
            <div className="axes__row">
              <dt>Across the columns</dt>
              <dd>Timeline, from 2019 to the current 2026 deployment window.</dd>
            </div>
          </dl>
        </section>

        {/* Catalog */}
        <section className={`catalog ${selectedMilestone ? "catalog--has-selection" : ""}`} id="table" aria-labelledby="table-title">
          <h2 className="visually-hidden" id="table-title">The Career Milestones</h2>

          <div className="catalog__grid-wrap">
            {/* Legend */}
            <ul className="legend" id="reading" aria-label="Discipline groups">
              <li><span className="legend__chip legend__chip--mobile" aria-hidden="true"></span>Mobile</li>
              <li><span className="legend__chip legend__chip--cicd" aria-hidden="true"></span>DevOps</li>
              <li><span className="legend__chip legend__chip--infra" aria-hidden="true"></span>Cloud</li>
              <li><span className="legend__chip legend__chip--security" aria-hidden="true"></span>Personal Development</li>
            </ul>

            {/* Timeline Headers */}
            <div className="ptable-headers" aria-hidden="true">
              <div>2019</div>
              <div>2020</div>
              <div>2021</div>
              <div>2022</div>
              <div>2023</div>
              <div>2024</div>
              <div>2025</div>
              <div>2026</div>
            </div>

            {/* Periodic Table / Timeline */}
            <div className="ptable" role="list" aria-label="Career achievements by year and discipline">
              {milestones.map((m) => (
                <button
                  key={m.id}
                  className="cell"
                  data-fam={m.fam}
                  style={{ "--col": m.col, "--row": m.row } as React.CSSProperties}
                  role="listitem"
                  aria-pressed={selectedMilestone?.id === m.id}
                  onClick={() => selectMilestone(m)}
                >
                  <span className="cell__num">{m.year}</span>
                  <span className="cell__sym">{m.sym}</span>
                  <span className="cell__name">{m.name}</span>
                  <span className="cell__stat">{m.metric}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Assay Sidebar Panel */}
          {selectedMilestone ? (
            <>
              {/* Mobile Backdrop */}
              <div 
                className="fixed inset-0 bg-[oklch(25.5%_0.018_50_/_0.4)] backdrop-blur-sm z-[450] lg:hidden"
                onClick={() => {
                  setIsSwapping(true);
                  setTimeout(() => {
                    setSelectedMilestone(null);
                    setIsSwapping(false);
                  }, 180);
                }}
              />
              <aside className={`assay ${isSwapping ? "is-swapping" : ""}`} id="assay" aria-labelledby="assay-name" aria-live="polite">
                {/* Mobile Drag Handle */}
                <div className="assay__handle" aria-hidden="true" />

                <button 
                  className="absolute top-4 right-4 font-mono text-xs text-muted hover:text-accent cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSwapping(true);
                    setTimeout(() => {
                      setSelectedMilestone(null);
                      setIsSwapping(false);
                    }, 180);
                  }}
                  aria-label="Close details"
                >
                  [✕]
                </button>

                <p className="assay__eyebrow">
                  <span className="assay__index">{selectedMilestone.year} Log</span>
                  <span className="assay__fam">{selectedMilestone.famLabel}</span>
                </p>

                <div className="assay__plate" aria-hidden="true">
                  <span className="assay__sym">{selectedMilestone.sym}</span>
                </div>

                <h3 className="assay__name" id="assay-name">{selectedMilestone.name}</h3>
                <p className="assay__origin">{selectedMilestone.platform}</p>

                <dl className="assay__stats">
                  <div>
                    <dt>Primary Metric</dt>
                    <dd><span className="assay__caf">{selectedMilestone.metric}</span> <span className="assay__caf-note">{selectedMilestone.metricLabel}</span></dd>
                  </div>
                  <div>
                    <dt>Log Status</dt>
                    <dd
                      style={{
                        color:
                          selectedMilestone.status === "Deploying"
                            ? "var(--color-status-deploying)"
                            : selectedMilestone.status === "Active"
                            ? "var(--color-status-active)"
                            : "var(--color-status-complete)"
                      }}
                    >
                      {selectedMilestone.status}
                    </dd>
                  </div>
                </dl>

                <p className="assay__notes">
                  {selectedMilestone.notes}
                </p>

                <p className="assay__hint">Select any cell in the table to load its telemetry dossier.</p>
              </aside>
            </>
          ) : null}
        </section>

        {/* Closing statement */}
        <section className="coda" aria-labelledby="coda-title">
          <h2 className="coda__title" id="coda-title">
            Thirty-two modules, compiled and secure.
          </h2>
          <p className="coda__line">
            Infrastructure operations are not built on luck. They are built on automated gates, modular architecture, and deterministic deployment workflows.
          </p>
        </section>

        {/* Contact Form */}
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="text-center mb-8">
            <h2 id="contact-title" className="font-display text-xl font-semibold mb-2">Establish Connection</h2>
            <p className="text-sm font-serif text-ink-2">Transmission channel is open. Reach out via the secure form below to optimize pipeline architecture or scale build systems.</p>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="form-email">TRANS_EMAIL</label>
              <input
                className="form-input"
                id="form-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@organization.net"
                disabled={formStatus === "loading" || formStatus === "success"}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="form-message">MSG_DESCRIPTION</label>
              <textarea
                className="form-input min-h-[100px] resize-y"
                id="form-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your active pipeline issues or contract specifics..."
                disabled={formStatus === "loading" || formStatus === "success"}
                required
              />
            </div>
            <button
              className="btn-submit"
              type="submit"
              disabled={formStatus === "loading" || formStatus === "success"}
            >
              {formStatus === "loading" ? "TRANSMITTING..." : formStatus === "success" ? "✓ CONNECTION ESTABLISHED" : "ESTABLISH CONNECTION"}
            </button>

            {formStatus === "success" && (
              <p className="font-mono text-2xs text-accent mt-3 text-center">
                ✓ Connection established. Response pending on active log screen.
              </p>
            )}
            {formStatus === "error" && (
              <p className="font-mono text-2xs text-accent mt-3 text-center">
                ⚠ Error establishing link. Validate transmission formats.
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="max-w-[78rem] mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="site-footer__statement">
            Jones Tse keeps the pipelines green and the clusters scaling.
            <span className="site-footer__sub">Designed with Fraunces &amp; Newsreader. Built with Next.js &amp; Tailwind.</span>
          </p>
          <div className="flex gap-4 font-mono text-2xs uppercase tracking-wider text-muted">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
