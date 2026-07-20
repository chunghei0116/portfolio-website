"use client";

import { useState, useEffect } from "react";

import { milestones, type Milestone } from "../data/milestones";
import TechRegistryFlipBoard from "../components/TechRegistryFlipBoard";

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
            <a href="#reading">Grid Guide</a>
            <a href="#table">Milestones</a>
            <a href="#skills">Registry</a>
            <a href="#contact">Terminal</a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Intro */}
        <section className="intro" aria-labelledby="intro-title">
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
                className="fixed inset-0 bg-[color-mix(in_oklch,var(--color-paper)_85%,transparent)] backdrop-blur-sm z-[450] lg:hidden"
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

        {/* Work Experience Section */}
        <section className="experience-section" id="experience" aria-labelledby="experience-title">
          <div className="experience-header mb-8">
            <h2 id="experience-title" className="font-display text-2xl font-semibold mb-3">Work Experience</h2>
            <p className="text-sm font-serif text-ink-2 max-w-prose">
              Operational track record scaling enterprise systems, automating deployment gates, and engineering mobile applications.
            </p>
          </div>

          <div className="experience-list">
            {/* Job 1 */}
            <div className="experience-item">
              <div className="experience-item__meta">
                <span className="experience-item__date font-mono">2025 – Present</span>
                <h3 className="experience-item__company font-display">AS Watson Group</h3>
                <span className="experience-item__role font-mono">Mobile Application Developer</span>
              </div>
              <div className="experience-item__details">
                <ul className="experience-bullets font-serif text-sm text-ink-2">
                  <li>Core Developer of the CRM mobile application supporting over 1 million active users (MAU).</li>
                  <li>Conducted performance profiling and memory leak optimization on high-volume consumer apps.</li>
                  <li>Integrated Firebase Cloud Messaging (FCM) templates and push delivery networks.</li>
                  <li>Automated Shorebird OTA hot patching pipelines to bypass store reviews and fast-track fixes.</li>
                </ul>
              </div>
            </div>

            {/* Job 2 */}
            <div className="experience-item">
              <div className="experience-item__meta">
                <span className="experience-item__date font-mono">2023 – 2025</span>
                <h3 className="experience-item__company font-display">Major Infrastructure &amp; Construction Group</h3>
                <span className="experience-item__role font-mono">Programmer (DevOps &amp; Infrastructure)</span>
              </div>
              <div className="experience-item__details">
                <ul className="experience-bullets font-serif text-sm text-ink-2">
                  <li>Containerized legacy enterprise systems into Docker and migrated hosting architecture to Kubernetes.</li>
                  <li>Primary developer for in-house enterprise staff mobile app and contractor platform systems.</li>
                  <li>Designed ArgoCD GitOps sync loops and Kubernetes Blue-Green automated rollout gates.</li>
                  <li>Configured Fastlane and GitLab CI build gating for automated App Store and Google Play delivery.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section (Airport Split-Flap Departure Board) */}
        <section className="skills-section" id="skills" aria-labelledby="skills-title">
          <TechRegistryFlipBoard />
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
            <span className="site-footer__sub">Designed with Bricolage Grotesque &amp; Newsreader. Built with Next.js &amp; Tailwind.</span>
          </p>
          <div className="flex gap-4 font-mono text-2xs uppercase tracking-wider text-muted">
            <a href="https://github.com/chunghei0116" target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
