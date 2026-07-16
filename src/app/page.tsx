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
      {/* N5 · Floating Navigation Pill */}
      <nav className="nav-floating" aria-label="Main Navigation">
        <a href="#hero" className={`nav-link ${activeSection === "hero" ? "is-active" : ""}`}>
          [01] SYSTEM
        </a>
        <a href="#experience" className={`nav-link ${activeSection === "experience" ? "is-active" : ""}`}>
          [02] LOGS
        </a>
        <a href="#projects" className={`nav-link ${activeSection === "projects" ? "is-active" : ""}`}>
          [03] STACK
        </a>
        <a href="#contact" className={`nav-link ${activeSection === "contact" ? "is-active" : ""}`}>
          [04] SIGNAL
        </a>
      </nav>

      {/* Main Page Layout */}
      <div className="max-w-[var(--page-max)] mx-auto px-[var(--page-gutter)] py-[var(--space-2xl)]">
        <main className="flex flex-col gap-[var(--space-3xl)] md:gap-[var(--space-4xl)]">
          
          {/* 01 · Hero Section (Dashboard Split) */}
          <section className="pt-8 hero-layout min-h-[70dvh] items-center" id="hero" aria-labelledby="hero-title">
                       {/* Left Column: Console status + 3D interactive nodes */}
            <div className="flex flex-col gap-4 w-full">
              <NetworkCanvas />
              
              {/* System Telemetry Console Well */}
              <div className="console-well w-full flex flex-col gap-3">
                <div className="console-header">
                  <span className="text-[10px] text-muted">TERMINAL_INSTANCE: AGY-01</span>
                  <div className="flex gap-1.5 items-center">
                    <span className="console-dot"></span>
                    <span className="console-dot"></span>
                    <span className="console-dot"></span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-[11px] leading-relaxed">
                  <p className="text-muted">// PIPELINE STATUS</p>
                  <div className="flex items-center gap-2">
                    <span>DEPLOYMENT:</span>
                    <span className="status-pill is-active">ONLINE</span>
                  </div>
                  <p>RUNS: 1,482 builds compiled successfully</p>
                  <p className="text-muted mt-2">// INFRASTRUCTURE DEFINITION</p>
                  <p>OS Target: iOS (Swift/UIKit/SwiftUI) · Android (Kotlin/Jetpack Compose)</p>
                  <p>Cloud & CI: AWS · Kubernetes · Terraform · GitHub Actions · GitLab CI</p>
                  <p className="text-muted mt-2">// RECENT TELEMETRY</p>
                  <p className="text-accent">✓ iOS build fastlane-release {"->"} App Store (Success)</p>
                  <p className="text-accent">✓ Android gradle-assemble {"->"} Google Play (Success)</p>
                  <p className="text-accent">✓ Terraform apply (Production VPS Cluster) {"->"} 0 errors</p>
                </div>
              </div>
            </div>

            {/* Profile Intro */}
            <div className="flex flex-col gap-6">
              <span className="mono-label">[ SYSTEMS DESIGN &amp; DEPLOYMENT ]</span>
              <h1 className="display-title text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05]" id="hero-title">
                Jones Tse
              </h1>
              <p className="font-sans text-md md:text-lg text-ink-2 leading-relaxed max-w-[55ch]">
                Mobile and DevOps Engineer bridging native client applications with automated cloud delivery. Specialized in low-latency CI/CD pipelines, high-density build infrastructure, and scalable system provisioning.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <a className="btn btn-primary" href="#contact">Hire/Contact</a>
                <a className="btn btn-secondary" href="#experience">View Logs</a>
              </div>
            </div>

          </section>

          {/* 02 · Experience Section (Step Ledger) */}
          <section className="pt-4 border-t border-rule" id="experience" aria-labelledby="exp-title">
            <div className="flex flex-col gap-2 mb-8">
              <span className="mono-label">[ RUNNING LOGS ]</span>
              <h2 className="display-title text-2xl" id="exp-title">Working Experience</h2>
            </div>

            <ol className="ledger" aria-label="Employment records">
              <li className="ledger-item">
                <span className="font-mono text-xs text-muted">2024 — PRESENT</span>
                <div>
                  <h3 className="font-display font-medium text-lg text-ink">Senior Mobile DevOps Engineer</h3>
                  <p className="text-sm text-neutral mb-2">Automated Platform Group</p>
                  <p className="text-sm text-ink-2 max-w-[65ch]">
                    Designed multi-platform runner pools using custom virtual machines, shortening iOS/Android test cycles. Managed cloud environments with Terraform, orchestrating Kubernetes pods to support high-density development runtimes.
                  </p>
                </div>
                <span className="status-pill is-active">ACTIVE</span>
              </li>
              <li className="ledger-item">
                <span className="font-mono text-xs text-muted">2021 — 2024</span>
                <div>
                  <h3 className="font-display font-medium text-lg text-ink">DevOps Engineer</h3>
                  <p className="text-sm text-neutral mb-2">Infrastructure &amp; Delivery</p>
                  <p className="text-sm text-ink-2 max-w-[65ch]">
                    Engineered Dockerized deployment templates, migrated legacy servers to AWS container tasks, and maintained Git-driven configuration pipelines. Handled server monitoring and zero-downtime database upgrades.
                  </p>
                </div>
                <span className="status-pill">RESOLVED</span>
              </li>
              <li className="ledger-item">
                <span className="font-mono text-xs text-muted">2019 — 2021</span>
                <div>
                  <h3 className="font-display font-medium text-lg text-ink">Mobile Application Developer</h3>
                  <p className="text-sm text-neutral mb-2">Native Client Studio</p>
                  <p className="text-sm text-ink-2 max-w-[65ch]">
                    Shipped production native applications for iOS (Swift) and Android (Kotlin). Implemented local data stores, push-notification frameworks, and modular UI patterns linked to REST/GraphQL APIs.
                  </p>
                </div>
                <span className="status-pill">RESOLVED</span>
              </li>
            </ol>
          </section>

          {/* 03 · Projects Section (Bento Grid) */}
          <section className="pt-4 border-t border-rule" id="projects" aria-labelledby="proj-title">
            <div className="flex flex-col gap-2 mb-8">
              <span className="mono-label">[ STATIC ASSETS ]</span>
              <h2 className="display-title text-2xl" id="proj-title">Technical Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Project 1 */}
              <div className="tech-card min-h-[220px]">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-accent uppercase tracking-wider">Mobile CI/CD Orchestrator</span>
                  <h3 className="font-display font-medium text-lg text-ink">Local Runner Daemon</h3>
                  <p className="font-sans text-sm text-ink-2 leading-relaxed">
                    A lightweight Go daemon executing mobile test suites locally on bare-metal Mac Studio clusters, cutting third-party cloud runtime dependencies.
                  </p>
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-rule-2">
                  <span className="font-mono text-[10px] text-muted">GO · SWIFT · SHELL</span>
                  <a href="https://github.com" className="font-mono text-[10px] text-accent font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                    CODEBASE ↳
                  </a>
                </div>
              </div>

              {/* Project 2 */}
              <div className="tech-card min-h-[220px]">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-muted uppercase tracking-wider">Cloud Infrastructure</span>
                  <h3 className="font-display font-medium text-lg text-ink">Zero-Trust K8s Operators</h3>
                  <p className="font-sans text-sm text-ink-2 leading-relaxed">
                    Custom Kubernetes controller dynamically managing developer test sandboxes on AWS EKS, enforcing network policies and automated environment expiry.
                  </p>
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-rule-2">
                  <span className="font-mono text-[10px] text-muted">TERRAFORM · K8S</span>
                  <a href="https://github.com" className="font-mono text-[10px] text-accent font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                    MANIFESTS ↳
                  </a>
                </div>
              </div>

              {/* Project 3 */}
              <div className="tech-card min-h-[220px]">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-accent uppercase tracking-wider">Native Android/iOS</span>
                  <h3 className="font-display font-medium text-lg text-ink">Telemetry Monitor App</h3>
                  <p className="font-sans text-sm text-ink-2 leading-relaxed">
                    A cross-platform app providing real-time notification alerts, server logs, and pipeline completion statuses direct to mobile devices.
                  </p>
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-rule-2">
                  <span className="font-mono text-[10px] text-muted">KOTLIN · SWIFTUI</span>
                  <a href="https://github.com" className="font-mono text-[10px] text-accent font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                    REPOSITORY ↳
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* 04 · Contact Section (Minimalist Form) */}
          <section className="pt-4 border-t border-rule" id="contact" aria-labelledby="contact-title">
            <span className="mono-label">[ ESTABLISH SIGNAL ]</span>
            <h2 className="display-title text-[clamp(1.75rem,4vw,2.75rem)] leading-none mt-2 mb-6" id="contact-title">
              Start Project / Hire
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col gap-4">
                <p className="font-sans text-md text-ink-2 leading-relaxed">
                  Looking to optimize your mobile development loops, automate container delivery, or deploy clean cloud architecture? Transmission open. Reach out via the terminal link or drop your details.
                </p>
                <div className="flex flex-col gap-2 font-mono text-xs text-neutral">
                  <p>EMAIL: jones.tse@example.dev</p>
                  <p>LOC: remote / HKSTP</p>
                </div>
              </div>

              {/* High contrast minimal form */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase text-muted" htmlFor="form-email">
                    Your transmission email
                  </label>
                  <input
                    className="input-text"
                    id="form-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    disabled={formStatus === "loading" || formStatus === "success"}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase text-muted" htmlFor="form-message">
                    Project parameters / Message
                  </label>
                  <textarea
                    className="input-text min-h-[100px] resize-y"
                    id="form-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe build requirements or role description..."
                    disabled={formStatus === "loading" || formStatus === "success"}
                    required
                  />
                </div>
                <div>
                  <button
                    className="btn btn-primary w-full sm:w-auto"
                    type="submit"
                    disabled={formStatus === "loading" || formStatus === "success"}
                  >
                    {formStatus === "loading" ? "TRANSMITTING..." : formStatus === "success" ? "TRANSMITTED" : "SEND MESSAGE"}
                  </button>
                </div>
                
                {formStatus === "success" && (
                  <p className="font-mono text-xs text-accent mt-2">
                    ✓ Signal established. Response pending.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="font-mono text-xs text-red-500 mt-2">
                    ⚠ Input validation failed. Please specify a valid email and description.
                  </p>
                )}
              </form>
            </div>
          </section>

        </main>

        {/* Footer (Ft2 Inline Single Line) */}
        <footer className="mt-24 pt-8 border-t border-rule flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral" role="contentinfo">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-ink">[JONESTSE]</span>
            <span className="text-[10px] uppercase tracking-wider">· BUILD: MMXXVI</span>
          </div>
          <p className="font-mono text-[10px]">
            © 2026. Provisioned on secure local cluster. All metrics subject to client validation.
          </p>
        </footer>
      </div>
    </>
  );
}
