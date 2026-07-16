"use client";

import { useState, useEffect } from "react";

import { milestones, type Milestone } from "../data/milestones";

const skillLogs: Record<string, string> = {
  Docker: "SYS_LOG: Containerized legacy platforms; setup multi-stage configurations.",
  Kubernetes: "SYS_LOG: Orchestrated multi-node clusters and managed Helm templates.",
  ArgoCD: "SYS_LOG: Configured GitOps continuous delivery sync loops on K8s.",
  "GitLab CI": "SYS_LOG: Built auto-tagging CI/CD release build pipelines.",
  "ELK Stack": "SYS_LOG: Set up elastic telemetry parsing for container log streams.",
  "AWS Cloud": "SYS_LOG: Implemented transit gateway routing and secure serverless hosting.",
  CKAD: "SYS_LOG: Standardizing developer containerized operations certification.",

  Flutter: "SYS_LOG: Primary cross-platform SDK for major user CRM application.",
  Shorebird: "SYS_LOG: Wired automated OTA code pushes to bypass review queues.",
  "Firebase FCM": "SYS_LOG: Configured platform-native push messaging templates.",
  "iOS Dev": "SYS_LOG: Programmed native iOS bridges and Xcode build scripts.",
  "Android Native": "SYS_LOG: Tuned Gradle dependencies and configured flavor splits.",
  Tauri: "SYS_LOG: Evaluating lightweight webview-based desktop native integrations.",

  React: "SYS_LOG: Engineered high-performance JSpreadsheet grid views.",
  "Next.js": "SYS_LOG: Leveraged server-side compilation for deterministic portfolios.",
  TypeScript: "SYS_LOG: Wrote strict typings and type-safe schemas across repositories.",
  JavaScript: "SYS_LOG: Created shell automation scripts and node utilities.",
  "HTML / CSS": "SYS_LOG: Coded responsive fluid visual layouts.",
  "SCSS / Sass": "SYS_LOG: Managed modular design system tokens via preprocessors.",

  PostgreSQL: "SYS_LOG: Maintained relational schemas and optimized complex indexing.",
  MongoDB: "SYS_LOG: Engineered unstructured document stores for event metadata.",
  "SQL Server": "SYS_LOG: Query profiling and legacy database tuning.",
  "Linux CLI": "SYS_LOG: Written bash scripts for auto-renewing security configurations.",
  "VS Code": "SYS_LOG: Integrated static analysis linters and debugging environments.",
  "macOS / Win": "SYS_LOG: Cross-compiled artifacts for desktop targets."
};

export default function Home() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);


  const getSymbol = (name: string) => {
    if (name.toUpperCase().startsWith("AWS")) return "Aw";
    const cleaned = name.replace(/[^a-zA-Z0-9]/g, "");
    if (cleaned.length >= 2) {
      return cleaned[0].toUpperCase() + cleaned[1].toLowerCase();
    }
    return name.substring(0, 2);
  };

  const getCategoryAbbr = (fam: string) => {
    switch (fam) {
      case "mobile": return "MOB";
      case "cicd": return "DEVOPS";
      case "infra": return "CLOUD";
      case "security": return "GROWTH";
      default: return "";
    }
  };
  const [isSwapping, setIsSwapping] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"devops" | "mobile" | "web" | "data">("devops");
  const [skillsSwapping, setSkillsSwapping] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"default" | "loading" | "success" | "error">("default");

  const handleTabChange = (cat: "devops" | "mobile" | "web" | "data") => {
    if (cat === activeCategory) return;
    setSkillsSwapping(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setSkillsSwapping(false);
    }, 150);
  };

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
            <a href="#skills">Technical Registry</a>
            <a href="#contact">Signal Terminal</a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Intro */}
        <section className="intro" aria-labelledby="intro-title">
          <p className="eyebrow">The Career Log &amp; Milestones</p>
          <h1 className="intro__title" id="intro-title">
            A structured timeline of systems, platforms, and code.
          </h1>
          <p className="intro__lede">
            I don't write my resume as a chronological list of bullet points. A list flattens complex engineering decisions — scaling clusters, writing compilers, automated certs, and debugging network sockets — into a single line of text. Here is the grid: rows by year, columns by season. Select a block to read its telemetry log.
          </p>

          <dl className="axes" aria-label="How the table is arranged">
            <div className="axes__row">
              <dt>Down the rows</dt>
              <dd>Timeline, from 2023 at the top row down to the current 2026 deployment window.</dd>
            </div>
            <div className="axes__row">
              <dt>Across the columns</dt>
              <dd>Chronological seasons, split into Spring, Summer, Fall, and Winter columns.</dd>
            </div>
          </dl>
        </section>

        {/* Catalog */}
        <section className={`catalog ${selectedMilestone ? "catalog--has-selection" : ""}`} id="table" aria-labelledby="table-title">
          <h2 className="visually-hidden" id="table-title">The Career Milestones</h2>

          <div className="catalog__grid-wrap">
            {/* Legend */}
            <ul className="legend" id="reading" aria-label="Year segments">
              <li><span className="legend__chip legend__chip--2023" aria-hidden="true"></span>2023</li>
              <li><span className="legend__chip legend__chip--2024" aria-hidden="true"></span>2024</li>
              <li><span className="legend__chip legend__chip--2025" aria-hidden="true"></span>2025</li>
              <li><span className="legend__chip legend__chip--2026" aria-hidden="true"></span>2026</li>
            </ul>

            {/* Timeline Headers */}
            <div className="ptable-headers-main" aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', gap: 'var(--space-2xs)', borderBottom: '1px solid var(--color-line-2)', paddingBottom: '4px', textTransform: 'uppercase', fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', letterSpacing: '0.04em' }}>
              <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>Spring</div>
              <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>Summer</div>
              <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>Fall</div>
              <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>Winter</div>
            </div>
            <div className="ptable-headers" aria-hidden="true" style={{ marginTop: '4px' }}>
              <div>SP I</div>
              <div>SP II</div>
              <div>SU I</div>
              <div>SU II</div>
              <div>FA I</div>
              <div>FA II</div>
              <div>WI I</div>
              <div>WI II</div>
            </div>

            {/* Periodic Table / Timeline */}
            <div className="ptable" role="list" aria-label="Career achievements by year and discipline">
              {milestones.map((m) => (
                <button
                  key={m.id}
                  className="cell"
                  data-year={m.year}
                  style={{ "--col": m.col, "--row": m.row } as React.CSSProperties}
                  role="listitem"
                  aria-pressed={selectedMilestone?.id === m.id}
                  onClick={() => selectMilestone(m)}
                >
                  <span className="cell__num">{getCategoryAbbr(m.fam)}</span>
                  <span className="cell__sym">{getSymbol(m.name)}</span>
                  <span className="cell__name">{m.name}</span>
                  <span className="cell__stat">{m.year}</span>
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
                  <span className="assay__sym">{getSymbol(selectedMilestone.name)}</span>
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
            Fifteen modules, compiled and secure.
          </h2>
          <p className="coda__line">
            Infrastructure operations are not built on luck. They are built on automated gates, modular architecture, and deterministic deployment workflows.
          </p>
        </section>

        {/* Skills Section */}
        <section className="skills-section" id="skills" aria-labelledby="skills-title">
          <div className="skills-header mb-8">
            <span className="eyebrow">Inventory of Disciplines</span>
            <h2 id="skills-title" className="font-display text-2xl font-semibold mt-2 mb-3">Technical Registry</h2>
            <p className="text-sm font-serif text-ink-2 max-w-prose">
              Filter our systems engineering directory by core operational layers. Hover on elements to view telemetry logs.
            </p>
          </div>

          <div className="skills-console">
            {/* Tabs Selector Row */}
            <div className="skills-tabs" role="tablist" aria-label="Systems layers">
              <button
                role="tab"
                aria-selected={activeCategory === "devops"}
                onClick={() => handleTabChange("devops")}
                className={`skills-tab ${activeCategory === "devops" ? "is-active" : ""}`}
              >
                <span className="skills-tab__num">01 /</span> DevOps
              </button>
              <button
                role="tab"
                aria-selected={activeCategory === "mobile"}
                onClick={() => handleTabChange("mobile")}
                className={`skills-tab ${activeCategory === "mobile" ? "is-active" : ""}`}
              >
                <span className="skills-tab__num">02 /</span> Mobile
              </button>
              <button
                role="tab"
                aria-selected={activeCategory === "web"}
                onClick={() => handleTabChange("web")}
                className={`skills-tab ${activeCategory === "web" ? "is-active" : ""}`}
              >
                <span className="skills-tab__num">03 /</span> Web Systems
              </button>
              <button
                role="tab"
                aria-selected={activeCategory === "data"}
                onClick={() => handleTabChange("data")}
                className={`skills-tab ${activeCategory === "data" ? "is-active" : ""}`}
              >
                <span className="skills-tab__num">04 /</span> Platform
              </button>
            </div>

            {/* Display Box */}
            <div className="skills-display">
              <div className={`skills-display__tags ${skillsSwapping ? "is-swapping" : ""}`}>
                {activeCategory === "devops" && (
                  <>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("Docker")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Dk</span>Docker</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("Kubernetes")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">K8</span>Kubernetes</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("ArgoCD")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Go</span>ArgoCD</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("GitLab CI")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Gl</span>GitLab CI</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("ELK Stack")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Ek</span>ELK Stack</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("AWS Cloud")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Aw</span>AWS Cloud</span>
                    <span className="skills-tag skills-tag--interest" onMouseEnter={() => setHoveredSkill("CKAD")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Ck</span>CKAD</span>
                  </>
                )}
                {activeCategory === "mobile" && (
                  <>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("Flutter")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Fl</span>Flutter</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("Shorebird")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Sb</span>Shorebird</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("Firebase FCM")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Fc</span>Firebase FCM</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("iOS Dev")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Io</span>iOS Dev</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("Android Native")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">An</span>Android Native</span>
                    <span className="skills-tag skills-tag--interest" onMouseEnter={() => setHoveredSkill("Tauri")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Ta</span>Tauri</span>
                  </>
                )}
                {activeCategory === "web" && (
                  <>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("React")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Rt</span>React</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("Next.js")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Nx</span>Next.js</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("TypeScript")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Ts</span>TypeScript</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("JavaScript")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Js</span>JavaScript</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("HTML / CSS")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Ht</span>HTML / CSS</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("SCSS / Sass")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Sc</span>SCSS / Sass</span>
                  </>
                )}
                {activeCategory === "data" && (
                  <>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("PostgreSQL")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Pg</span>PostgreSQL</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("MongoDB")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Mg</span>MongoDB</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("SQL Server")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Ms</span>SQL Server</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("Linux CLI")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Lx</span>Linux CLI</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("VS Code")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Vs</span>VS Code</span>
                    <span className="skills-tag" onMouseEnter={() => setHoveredSkill("macOS / Win")} onMouseLeave={() => setHoveredSkill(null)}><span className="skills-tag__sym">Os</span>macOS / Win</span>
                  </>
                )}
              </div>
            </div>

            {/* Readout Console Bar */}
            <div className="skills-console__readout font-mono">
              <span className="skills-console__prompt" aria-hidden="true">&gt;</span>{" "}
              {hoveredSkill ? skillLogs[hoveredSkill] : "SYS_LOG: System telemetry active. Hover over any technology element to load registry details."}
            </div>
          </div>
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

            <div className="form-status-container" aria-live="polite">
              {formStatus === "success" && (
                <p className="font-mono text-2xs text-accent text-center animate-fade-in">
                  ✓ Connection established. Response pending on active log screen.
                </p>
              )}
              {formStatus === "error" && (
                <p className="font-mono text-2xs text-accent text-center animate-fade-in">
                  ⚠ Error establishing link. Validate transmission formats.
                </p>
              )}
            </div>
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
