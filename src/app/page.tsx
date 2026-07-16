"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const NetworkCanvas = dynamic(() => import("../components/NetworkCanvas"), {
  ssr: false,
});

export default function Home() {
  // Form interactive state
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"default" | "loading" | "success" | "error">("default");
  
  // Active nav dot state
  const [activeSection, setActiveSection] = useState("hero");

  // Monitor scrolling to highlight nav links
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "experience", "projects", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* ───── Top Ticker — Telemetry Marquee ───── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span><strong>SFO</strong> San Francisco 24ms</span>
          <span><strong>LHR</strong> London 38ms</span>
          <span><strong>HND</strong> Tokyo 12ms</span>
          <span><strong>CDG</strong> Paris 42ms</span>
          <span><strong>SIN</strong> Singapore 64ms</span>
          <span><strong>HKG</strong> Hong Kong 8ms</span>
          {/* duplicated track for seamless loop */}
          <span><strong>SFO</strong> San Francisco 24ms</span>
          <span><strong>LHR</strong> London 38ms</span>
          <span><strong>HND</strong> Tokyo 12ms</span>
          <span><strong>CDG</strong> Paris 42ms</span>
          <span><strong>SIN</strong> Singapore 64ms</span>
          <span><strong>HKG</strong> Hong Kong 8ms</span>
        </div>
      </div>

      {/* ───── Masthead · N9 edge-aligned minimal ───── */}
      <header className="shell">
        <nav className="masthead" aria-label="Primary">
          <a href="#" className="wordmark" aria-label="Jones Tse, home">JONESTSE</a>
          <span className="masthead-meta">DevOps &amp; Mobile Spec &middot; MMXXVI</span>
          <div className="masthead-links">
            <a href="#hero" className={activeSection === "hero" ? "is-active" : ""}>System</a>
            <a href="#experience" className={activeSection === "experience" ? "is-active" : ""}>Logs</a>
            <a href="#projects" className={activeSection === "projects" ? "is-active" : ""}>Stack</a>
            <a href="#contact" className={activeSection === "contact" ? "is-active" : ""}>Signal</a>
          </div>
        </nav>
      </header>

      {/* ───── Main content ───── */}
      <main>
        
        {/* ───── Hero · Marquee with departures board ───── */}
        <section className="shell hero" id="hero" aria-labelledby="hero-title">
          <div className="hero-strip" aria-hidden="false">
            <span className="live">LIVE &middot; cluster status</span>
            <span>All systems nominal</span>
            <span>05 projects active</span>
          </div>

          <div className="hero-composition">
            <div>
              <h1 id="hero-title" className="hero-title">
                Deploy the code.<br />
                <em>We&rsquo;ll scale the rest.</em><span className="tonk">↗ vol.26</span>
              </h1>
              <p className="hero-sub">
                Jones Tse builds systems for mobile applications. Connecting native iOS/Android builds to containerized clusters and zero-trust cloud pipelines.
              </p>
            </div>

            <aside className="hero-stamp" aria-label="Deployment stamp">
              <span className="sm">Target Platform</span>
              <span className="lg">HYBRID CLOUD</span>
              <span className="sm">Provisioned with Terraform</span>
              <span className="num">VOL. 26 &middot; 16.JUL.26</span>
            </aside>
          </div>

          {/* Interactive 3D Nodes */}
          <div className="mb-6">
            <NetworkCanvas />
          </div>

          {/* Live Departures Board */}
          <div className="board" role="table" aria-label="Infrastructure deployment states">
            <div className="board-head" role="row">
              <span role="columnheader" aria-label="Status icon"></span>
              <span role="columnheader">ID</span>
              <span role="columnheader">Infrastructure Environment</span>
              <span role="columnheader">Provider</span>
              <span role="columnheader">Status</span>
              <span role="columnheader" style={{ textAlign: "right" }}>Ping</span>
            </div>

            <div className="board-row" data-status="boarding" role="row">
              <svg className="board-glyph text-accent" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <circle cx="8" cy="8" r="3" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M12.8 3.2l-1.4 1.4M4.6 11.4l-1.4 1.4" strokeLinecap="round" />
              </svg>
              <span className="board-time" role="cell">06:42</span>
              <span className="board-dest" role="cell">iOS Telemetry Client <small>&middot; Swift, automated fastlane releases</small></span>
              <span className="board-code" role="cell">App Store</span>
              <span className="board-status" role="cell">Deploying</span>
              <span className="board-fare" role="cell">12ms <small>to apple.com</small></span>
            </div>

            <div className="board-row" data-status="ontime" role="row">
              <svg className="board-glyph" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <circle cx="8" cy="8" r="3" />
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2" strokeLinecap="round" />
              </svg>
              <span className="board-time" role="cell">09:15</span>
              <span className="board-dest" role="cell">Zero-Trust Kubernetes <small>&middot; custom ingress, automated sandbox expiry</small></span>
              <span className="board-code" role="cell">AWS EKS</span>
              <span className="board-status" role="cell">On time</span>
              <span className="board-fare" role="cell">24ms <small>to us-east</small></span>
            </div>

            <div className="board-row" data-status="ontime" role="row">
              <svg className="board-glyph" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <circle cx="8" cy="8" r="4" fill="currentColor" />
              </svg>
              <span className="board-time" role="cell">11:30</span>
              <span className="board-dest" role="cell">Local Runner Daemon <small>&middot; bare-metal Mac Studio runner clusters</small></span>
              <span className="board-code" role="cell">Orchestrator</span>
              <span className="board-status" role="cell">On time</span>
              <span className="board-fare" role="cell">2ms <small>local cluster</small></span>
            </div>

            <div className="board-row" data-status="open" role="row">
              <svg className="board-glyph" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M11 2.5A5.5 5.5 0 1 0 13.5 11 4.5 4.5 0 0 1 11 2.5Z" fill="currentColor" stroke="none" />
              </svg>
              <span className="board-time" role="cell">17:55</span>
              <span className="board-dest" role="cell">Multi-region VPC Mesh <small>&middot; global VPN tunnel, site-to-site transit</small></span>
              <span className="board-code" role="cell">Terraform</span>
              <span className="board-status" role="cell">Standby</span>
              <span className="board-fare" role="cell">38ms <small>to eu-west</small></span>
            </div>
          </div>

          <div className="board-foot">
            <span>All latency metrics are compiled in real-time.</span>
            <span>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to interrupt.</span>
          </div>

          <div className="hero-cta">
            <a href="#contact" className="btn">Request integration &middot; 15 min</a>
            <a href="#projects" className="btn-ghost">Explore open source codebase</a>
          </div>
        </section>

        {/* ───── Pitch ───── */}
        <section className="shell pitch" aria-labelledby="pitch-label">
          <div className="pitch-grid">
            <p id="pitch-label" className="pitch-label">01 &mdash; Philosophy</p>
            <div className="pitch-body">
              <p>
                Most delivery setups dump binaries into a folder and hope for the best. We do the opposite.
                We construct <em>automated gates</em>. Custom runners, automated test execution, and deployment hooks that run smoothly before a single line lands on production.
              </p>
              <p>
                You focus on writing features. We engineer the pipeline &mdash; container nodes, load balances, certificate authorities, and deployment scripts that respect the network. No manual builds, no SSH key chasing, no <em>it worked on my machine</em> excuses.
              </p>
            </div>
          </div>
        </section>

        {/* ───── Picks / Experience Section ───── */}
        <section className="shell picks" id="experience" aria-labelledby="exp-title">
          <div className="picks-head">
            <h2 id="exp-title">Experience <em>set in motion.</em></h2>
            <span className="count">LogsMMXXVI &mdash; Spring &rsquo;26</span>
          </div>

          <div className="picks-grid">
            <article className="pick">
              <p className="pick-num"><span>ACTIVE</span><span>2024 — Pres</span></p>
              <div className="pick-figure">
                <span className="font-mono text-xl text-accent font-black">AWS / TERRAFORM</span>
              </div>
              <h3 className="pick-title">Senior DevOps <small>Mobile Platforms</small></h3>
              <p className="pick-body">Automated mobile test runtimes using container orchestration, custom bare-metal virtual machines, and high-density build workflows.</p>
              <p className="pick-meta"><span>Active</span><strong>0 errors</strong></p>
            </article>

            <article className="pick">
              <p className="pick-num"><span>RESOLVED</span><span>2021 — 2024</span></p>
              <div className="pick-figure">
                <span className="font-mono text-xl text-ink font-black">DOCKER / CLOUD</span>
              </div>
              <h3 className="pick-title">DevOps Engineer <small>Delivery Infra</small></h3>
              <p className="pick-body">Migrated legacy server suites to auto-scaling container configurations, enforcing zero-trust network gates and secrets isolation.</p>
              <p className="pick-meta"><span>Complete</span><strong>100% migrated</strong></p>
            </article>

            <article className="pick">
              <p className="pick-num"><span>RESOLVED</span><span>2019 — 2021</span></p>
              <div className="pick-figure">
                <span className="font-mono text-xl text-ink font-black">SWIFT / KOTLIN</span>
              </div>
              <h3 className="pick-title">App Developer <small>Native Client</small></h3>
              <p className="pick-body">Shipped production native systems for iOS and Android, designing locally isolated storage engines and real-time socket connections.</p>
              <p className="pick-meta"><span>Complete</span><strong>0.01% crash rate</strong></p>
            </article>
          </div>
        </section>

        {/* ───── Projects / Process ───── */}
        <section className="process" id="projects" aria-labelledby="process-head">
          <div className="process-shell">
            <p id="process-head" className="process-head">02 &mdash; Deployment Loop</p>

            <div className="process-grid">
              <div className="stage">
                <p className="stage-num">01<small>&middot; local compile</small></p>
                <h3>Clean workspace.</h3>
                <p>Run Fastlane, code sign certificates locally, compile gradle profiles, and package assets safely.</p>
              </div>
              <div className="stage">
                <p className="stage-num">02<small>&middot; runner check</small></p>
                <h3>Automated testing.</h3>
                <p>Bare-metal Mac servers pick up tasks instantly. Parallel unit and UI tests complete within minutes.</p>
              </div>
              <div className="stage">
                <p className="stage-num">03<small>&middot; zero downtime</small></p>
                <h3>Global deployment.</h3>
                <p>Terraform schedules container rollouts. Zero-downtime routing swaps traffic nodes, serving users with zero interruptions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Contact / Form Section ───── */}
        <section className="shell final-cta" id="contact">
          <div className="max-w-[700px] mx-auto text-center mb-10">
            <h2 className="text-[clamp(1.75rem,5vw,3rem)] leading-none mb-6">
              Next deployment window <em>in 47 hours.</em>
            </h2>
            <p className="font-serif text-ink-2 mb-8">
              Transmission open. Reach out via the secure form below to optimize your native mobile delivery setups, secure your container structures, or scale cloud nodes.
            </p>
          </div>

          <div className="max-w-[500px] mx-auto">
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[10px] uppercase text-muted" htmlFor="form-email">
                  TRANS_EMAIL
                </label>
                <input
                  className="input-text"
                  id="form-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@organization.net"
                  disabled={formStatus === "loading" || formStatus === "success"}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[10px] uppercase text-muted" htmlFor="form-message">
                  MSG_DESCRIPTION
                </label>
                <textarea
                  className="input-text min-h-[100px] resize-y"
                  id="form-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your active pipeline issues or contract specifics..."
                  disabled={formStatus === "loading" || formStatus === "success"}
                  required
                />
              </div>
              <div>
                <button
                  className="btn w-full"
                  type="submit"
                  disabled={formStatus === "loading" || formStatus === "success"}
                >
                  {formStatus === "loading" ? "TRANSMITTING..." : formStatus === "success" ? "TRANSMITTED" : "ESTABLISH CONNECTION"}
                </button>
              </div>
              
              {formStatus === "success" && (
                <p className="font-mono text-xs text-accent mt-2 text-center">
                  ✓ Connection established. Response pending on active log screen.
                </p>
              )}
              {formStatus === "error" && (
                <p className="font-mono text-xs text-accent mt-2 text-center">
                  ⚠ Error establishing link. Validate transmission formats.
                </p>
              )}
            </form>
          </div>
        </section>

      </main>

      {/* ───── Footer · Ft4 dense colophon ───── */}
      <footer className="shell colophon">
        <div className="colophon-head">
          <a href="#" className="wordmark">JONESTSE</a>
          <em>Systems &amp; Mobile Infrastructure Automation. &mdash; Remote / HKSTP</em>
        </div>

        <dl className="colophon-grid">
          <div className="col-block">
            <dt>Focus Areas</dt>
            <dd><a href="#hero">iOS &amp; Android CI/CD</a></dd>
            <dd><a href="#hero">Infrastructure as Code</a></dd>
            <dd><a href="#hero">Kubernetes Operators</a></dd>
            <dd><a href="#hero">Bare-Metal Mac Runners</a></dd>
          </div>

          <div className="col-block">
            <dt>Engineering Logs</dt>
            <dd><a href="#experience">Active Positions</a></dd>
            <dd><a href="#projects">Deployment Stages</a></dd>
            <dd><a href="https://github.com" target="_blank" rel="noopener noreferrer">Open Source Modules</a></dd>
            <dd><a href="https://github.com" target="_blank" rel="noopener noreferrer">Infrastructure Manifests</a></dd>
          </div>

          <div className="col-block">
            <dt>Specifications</dt>
            <dd>AWS Target Group</dd>
            <dd>Zero-Trust Ingress</dd>
            <dd>GitLab Runners</dd>
            <dd>Fastlane Certs</dd>
          </div>

          <div className="col-block">
            <dt>Secure Signals</dt>
            <dd>jones.tse@example.dev</dd>
            <dd>HKSTP, Shatin</dd>
            <dd><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub Profile</a></dd>
            <dd><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></dd>
          </div>
        </dl>

        <div className="colophon-foot">
          <span className="lead">&copy; 2026 Jones Tse.</span>
          <span>Set in Bricolage Grotesque &amp; Newsreader. Built with Next.js &amp; Tailwind.</span>
          <span>v2.6 &middot; Summer &rsquo;26</span>
        </div>
      </footer>
    </>
  );
}
