"use client";

import { useState, useEffect } from "react";

import { milestones, type Milestone } from "../data/milestones";

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

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Disable page scroll when element card / assay bottom sheet is opened
  useEffect(() => {
    if (selectedMilestone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMilestone]);

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

  const navigateMilestone = (direction: "prev" | "next") => {
    if (!selectedMilestone) return;
    const currentIndex = milestones.findIndex((m) => m.id === selectedMilestone.id);
    if (currentIndex === -1) return;

    let targetIndex: number;
    if (direction === "prev") {
      targetIndex = (currentIndex - 1 + milestones.length) % milestones.length;
    } else {
      targetIndex = (currentIndex + 1) % milestones.length;
    }

    setIsSwapping(true);
    setTimeout(() => {
      setSelectedMilestone(milestones[targetIndex]);
      setIsSwapping(false);
    }, 140);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> Go to Next element
      navigateMilestone("next");
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Go to Prev element
      navigateMilestone("prev");
    }
    setTouchStartX(null);
    setTouchEndX(null);
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
            <a href="#experience">Career</a>
            <a href="#contact">Terminal</a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hallmark Playful Hero Section */}
        <section className="intro hero-section hero-section--playful" aria-labelledby="intro-title">
          <div className="hero-badge-row mb-4 flex-wrap gap-2">
            <span className="playful-pill playful-pill--accent font-typewriter">
              ✦ HONG KONG — MOBILE &amp; CLOUD ENGINEER
            </span>
            <span className="playful-pill playful-pill--status font-typewriter">
              <span className="hero-status-dot" aria-hidden="true" />
              OPERATIONAL // SHOREBIRD OTA &amp; K8S CLUSTER
            </span>
          </div>

          <h1 className="intro__title intro__title--playful font-display" id="intro-title">
            Building soft, fast &amp; resilient software.
          </h1>

          <div className="hero-punchline hero-punchline--playful flex flex-wrap gap-2 my-4">
            <span className="playful-tag-chip">⚡ 60 FPS FLUTTER</span>
            <span className="playful-tag-chip">🚀 SHOREBIRD OTA</span>
            <span className="playful-tag-chip">☸ KUBERNETES K8S</span>
          </div>

          <p className="intro__lede font-serif text-lg leading-relaxed max-w-2xl my-4">
            Hey, I'm <strong className="text-ink font-bold">Jones Tse</strong>! I engineer high-performance cross-platform mobile apps, native Swift/Gradle bridges, and automated zero-downtime cloud infrastructure.
          </p>

          {/* Action Row */}
          <div className="hero-actions my-8">
            <a href="#table" className="btn-playful-primary font-display">
              <span>↳ Explore Milestones</span>
            </a>
            <a href="#contact" className="btn-playful-secondary font-display">
              <span>✉ Establish Connection</span>
            </a>
          </div>

          {/* Micro Stat Proof Bar */}
          <div className="hero-stats-bar playful-stats-bar grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-hairline my-8">
            <div className="stat-card stat-card--playful">
              <span className="stat-val font-display">8+ YRS</span>
              <span className="stat-label font-typewriter">ENGINEERING EXP</span>
            </div>
            <div className="stat-card stat-card--playful">
              <span className="stat-val font-display">60 FPS</span>
              <span className="stat-label font-typewriter">NATIVE MOBILE UX</span>
            </div>
            <div className="stat-card stat-card--playful">
              <span className="stat-val font-display">100%</span>
              <span className="stat-label font-typewriter">CI/CD PIPELINES</span>
            </div>
            <div className="stat-card stat-card--playful">
              <span className="stat-val font-display">ZERO</span>
              <span className="stat-label font-typewriter">DOWNTIME RELEASES</span>
            </div>
          </div>

          {/* Grid Axes Guide */}
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
              <aside
                className={`assay ${isSwapping ? "is-swapping" : ""}`}
                id="assay"
                aria-labelledby="assay-name"
                aria-live="polite"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Mobile Drag Handle */}
                <div className="assay__handle" aria-hidden="true" />

                {/* Navigation and Close Controls Row */}
                <div className="absolute top-3 right-4 flex items-center gap-2 z-10">
                  <button
                    onClick={() => navigateMilestone("prev")}
                    className="assay__nav-btn assay__nav-btn--prev font-typewriter"
                    aria-label="Previous element"
                    title="Previous element (Swipe Right)"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => navigateMilestone("next")}
                    className="assay__nav-btn assay__nav-btn--next font-typewriter"
                    aria-label="Next element"
                    title="Next element (Swipe Left)"
                  >
                    →
                  </button>
                  <button 
                    className="font-mono text-xs text-muted hover:text-accent cursor-pointer ml-1"
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
                </div>

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
          <div className="experience-header">
            <div className="experience-header__tag font-typewriter">
              <span>02 // CAREER RECORD</span>
            </div>
            <h2 id="experience-title" className="experience-header__title font-display">
              Work Experience
            </h2>
            <p className="experience-header__lede font-serif">
              A chronological log of production engineering roles, scaling cross-platform mobile applications and maintaining resilient cloud infrastructure.
            </p>
          </div>

          <div className="experience-list">
            {/* Job 1 */}
            <article className="experience-card">
              <img src="/images/as_watson_logo.svg" alt="" className="experience-card__watermark" aria-hidden="true" />
              <header className="experience-card__header">
                <div className="experience-card__meta">
                  <span className="experience-card__date font-typewriter">2025 – PRESENT</span>
                  <span className="experience-card__type font-typewriter">FULL-TIME // HK</span>
                </div>
                <h3 className="experience-card__company font-display">AS Watson Group</h3>
                <p className="experience-card__role font-typewriter">Mobile Application Developer</p>
              </header>

              <div className="experience-card__body">
                <ul className="experience-card__bullets font-serif">
                  <li>
                    <span className="bullet-glyph font-typewriter" aria-hidden="true">↳</span>
                    Architected and maintained enterprise retail mobile applications using Flutter and native Swift/Gradle MethodChannels for high-volume consumer traffic.
                  </li>
                  <li>
                    <span className="bullet-glyph font-typewriter" aria-hidden="true">↳</span>
                    Implemented Shorebird Over-The-Air (OTA) hotpatching, reducing critical patch deployment cycles from 3–5 app store approval days down to under 15 minutes.
                  </li>
                  <li>
                    <span className="bullet-glyph font-typewriter" aria-hidden="true">↳</span>
                    Optimized widget tree rendering pipelines and memory profiling, sustaining consistent 60 FPS animations across low-tier and mid-range devices.
                  </li>
                  <li>
                    <span className="bullet-glyph font-typewriter" aria-hidden="true">↳</span>
                    Integrated Firebase Cloud Messaging (FCM) payload handlers and background messaging routines for targeted multi-region push notifications.
                  </li>
                </ul>
              </div>
            </article>

            {/* Job 2 */}
            <article className="experience-card">
              <img src="/images/infra_group_logo.svg" alt="" className="experience-card__watermark" aria-hidden="true" />
              <header className="experience-card__header">
                <div className="experience-card__meta">
                  <span className="experience-card__date font-typewriter">2023 – 2025</span>
                  <span className="experience-card__type font-typewriter">FULL-TIME // HK</span>
                </div>
                <h3 className="experience-card__company font-display">Major Infrastructure Group</h3>
                <p className="experience-card__role font-typewriter">Programmer (DevOps &amp; Infrastructure)</p>
              </header>

              <div className="experience-card__body">
                <ul className="experience-card__bullets font-serif">
                  <li>
                    <span className="bullet-glyph font-typewriter" aria-hidden="true">↳</span>
                    Engineered declarative GitOps CI/CD delivery pipelines using GitLab CI and ArgoCD for automated multi-environment Kubernetes cluster deployments.
                  </li>
                  <li>
                    <span className="bullet-glyph font-typewriter" aria-hidden="true">↳</span>
                    Managed AWS cloud infrastructure (ECS, S3, Transit Gateway networking) and configured NGINX ingress controllers with SSL/TLS auto-renewal routines.
                  </li>
                  <li>
                    <span className="bullet-glyph font-typewriter" aria-hidden="true">↳</span>
                    Constructed centralized log stream telemetry pipelines using the ELK stack (Elasticsearch, Logstash, Kibana) for live application monitoring.
                  </li>
                  <li>
                    <span className="bullet-glyph font-typewriter" aria-hidden="true">↳</span>
                    Maintained high-availability PostgreSQL and SQL Server database schemas, tuning queries and automated backup policies for production systems.
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-header mb-8">
            <div className="font-typewriter text-xs text-accent tracking-widest uppercase mb-2">
              03 // COMMUNICATIONS TERMINAL
            </div>
            <h2 id="contact-title" className="font-display text-2xl font-bold text-ink mb-2">Establish Connection</h2>
            <p className="text-sm font-serif text-ink-2 max-w-xl">Transmission channel is open. Reach out via the secure form below to discuss mobile engineering, cloud infrastructure, or build pipeline optimization.</p>
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
