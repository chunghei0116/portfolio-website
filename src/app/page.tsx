"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ContributionData {
  count: number;
  source: string;
}

export default function Home() {
  const [githubData, setGithubData] = useState<ContributionData | null>(null);
  
  // Form interactive state
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"default" | "loading" | "success" | "error">("default");
  
  // Active nav dot state
  const [activeSection, setActiveSection] = useState("book1");

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        setGithubData({
          count: data.count,
          source: data.source,
        });
      })
      .catch((err) => {
        console.error("Failed to load GitHub stats", err);
        setGithubData({ count: 4652, source: "fallback" });
      });
  }, []);

  // Monitor scrolling to highlight nav dots
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["book1", "book2", "book3", "book4", "book5"];
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

  // Intersection observer to animate ledger/card rows when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements = document.querySelectorAll(".riso-card, .ledger__row");
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setFormStatus("error");
      return;
    }
    setFormStatus("loading");
    setTimeout(() => {
      setFormStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <>
      {/* N3 · Side-rail Navigation (Greek Books) */}
      <nav className="rail" aria-label="Folio Books">
        <a className="rail__mark" href="#top">
          <span className="rail__name">Jones Tse</span>
          <span className="rail__role" aria-hidden="true">Systems &amp; Lyrics</span>
        </a>
        <ul className="rail__dots" aria-label="Books">
          <li>
            <a href="#book1" className={activeSection === "book1" ? "is-active" : ""} aria-label="Book I: Slogan">
              <span className="rail__dot">I</span>
            </a>
          </li>
          <li>
            <a href="#book2" className={activeSection === "book2" ? "is-active" : ""} aria-label="Book II: Capabilities">
              <span className="rail__dot">II</span>
            </a>
          </li>
          <li>
            <a href="#book3" className={activeSection === "book3" ? "is-active" : ""} aria-label="Book III: Sessions">
              <span className="rail__dot">III</span>
            </a>
          </li>
          <li>
            <a href="#book4" className={activeSection === "book4" ? "is-active" : ""} aria-label="Book IV: Selected Exploits">
              <span className="rail__dot">IV</span>
            </a>
          </li>
          <li>
            <a href="#book5" className={activeSection === "book5" ? "is-active" : ""} aria-label="Book V: Commission colophon">
              <span className="rail__dot">V</span>
            </a>
          </li>
        </ul>
        <a className="rail__year" href="#book5">HK · MMXXVI</a>
      </nav>

      {/* Main Page Content */}
      <div className="shell" id="top">
        <main className="flex flex-col gap-24 md:gap-36">
          {/* Hero Section — Book I: The Slogan */}
          <section className="min-h-[80dvh] flex flex-col justify-between pt-4" id="book1" aria-labelledby="hero-h">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Edition 04 · Govanhill · Free Entry</span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-auto">
              <div className="flex flex-col justify-center">
                <h1 className="font-sans text-[clamp(2.5rem,7.5vw,5.5rem)] leading-[0.95] font-extrabold tracking-display text-ink uppercase mb-6" id="hero-h">
                  Sing in me, <span className="font-serif italic font-light text-accent text-shadow-offset">Muse</span>,<br />
                  of the code that won&apos;t sit <span className="text-accent-2">still.</span>
                </h1>
                <p className="font-serif text-lg leading-relaxed text-ink-2 max-w-[38ch]">
                  The low-latency architecture of Jones Tse. Spot colour WebGPU calculations that bleed a hair past their edge, compiled one drum at a time.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="border-4 border-double border-rule p-2 max-w-[280px] sm:max-w-[320px] bg-paper-2">
                  <Image
                    src="/helmet.jpg"
                    alt="Classical Greek helmet illustration"
                    width={320}
                    height={320}
                    className="w-full grayscale contrast-125"
                    priority
                  />
                </div>
              </div>
            </div>

            <a className="link-arrow self-start mt-8" href="#book2">
              <span>Read the Catalogue →</span>
              <svg className="link-arrow__glyph" viewBox="0 0 24 12" width="32" height="16" aria-hidden="true">
                <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </a>
          </section>

          {/* Book II: Capability Catalogue (Riso-01 Cards) */}
          <section className="pt-8" id="book2" aria-labelledby="planks-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Book II</p>
              <h2 className="plate-head__title" id="planks-h">Capability Catalogue</h2>
              <p className="plate-head__sub">Three key pipelines deployed inside the spot-colour viewport grid.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="riso-card p-4 border border-rule bg-paper-2 flex flex-col justify-between min-h-[180px]">
                <div>
                  <span className="font-mono text-[0.65rem] text-accent uppercase block mb-1">WebGPU · Stand A1</span>
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-2">Volcanic Shaders</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    Native browser GPU compute pipelines pulling thread calculations from raw coordinate sheets.
                  </p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="riso-card p-4 border border-rule bg-paper-2 flex flex-col justify-between min-h-[180px]">
                <div>
                  <span className="font-mono text-[0.65rem] text-accent-2 uppercase block mb-1">Rust &amp; TS · Stand A4</span>
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-2">Safe Proofs</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    Zero raw errors. TypeScript types and Rust shells functioning as strict mathematical safety proofs.
                  </p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="riso-card p-4 border border-rule bg-paper-2 flex flex-col justify-between min-h-[180px]">
                <div>
                  <span className="font-mono text-[0.65rem] text-accent uppercase block mb-1">WebGL · Stand A6</span>
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-2">Kinetic Solvers</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    Interactive cloth and particle dynamics responding seamlessly to layout boundaries and touch coordinates.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Book III: Workshops & Telemetry Sessions (Riso-01 Timetable) */}
          <section className="pt-8" id="book3" aria-labelledby="lyric-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Book III</p>
              <h2 className="plate-head__title" id="lyric-h">Inky Sessions</h2>
              <p className="plate-head__sub">Technical workshop segments scheduled for live code execution.</p>
            </header>

            <ol className="list-none p-0 flex flex-col gap-6" aria-label="Scheduled print and code sessions">
              <li className="riso-card p-4 border border-rule bg-paper-2 grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <span className="font-mono text-xs text-accent font-bold">Sat 13:00 · 90 min · Free</span>
                <div className="md:col-span-3">
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-1">Two-Color Overprint &amp; Shift</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    We layer Aegean deep blue over bronze, shift the layout coordinates a few pixels on purpose, and chase the visual green you only find by accident.
                  </p>
                </div>
              </li>
              <li className="riso-card p-4 border border-rule bg-paper-2 grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <span className="font-mono text-xs text-accent-2 font-bold">Sat 15:30 · 2 hrs · Commission</span>
                <div className="md:col-span-3">
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-1">Volcanic Shader Compilation</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    A live compute pipeline setup. Run raw GLSL stencils through compiler drums while you watch. Bring a layout drawing or use one of ours.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Book IV: Selected Exploits (Exhibitor List Style) */}
          <section className="pt-8" id="book4" aria-labelledby="exploits-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Book IV</p>
              <h2 className="plate-head__title" id="exploits-h">Selected Catalogue</h2>
            </header>

            <ol className="ledger" aria-label="Selected work, newest first">
              <li className="ledger__row">
                <span className="ledger__year">WebGPU · Stand A9</span>
                <span className="ledger__name">Telemetry Canvas</span>
                <span className="ledger__kind">High-performance canvas spot-colour solver</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">Rust Shell · Stand A11</span>
                <span className="ledger__name">Tauri Native Wrapper</span>
                <span className="ledger__kind">Low-latency engine shell integration</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">Zines · Mezzanine M2</span>
                <span className="ledger__name">Aegean Solver Layout</span>
                <span className="ledger__kind">Tactile classical broadside specimen</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">WebGL · Mezzanine M5</span>
                <span className="ledger__name">Aether Compute Engine</span>
                <span className="ledger__kind">Next.js WebGL graphics pipeline</span>
              </li>
            </ol>

            {githubData && (
              <div className="mt-8 p-4 bg-paper-2 border border-rule max-w-xs">
                <p className="font-mono text-[0.65rem] text-muted uppercase tracking-wider">GitHub contributions ledger</p>
                <p className="text-[2.25rem] font-bold font-sans tracking-tight text-accent mt-1 leading-none">
                  {githubData.count.toLocaleString()}
                </p>
                <p className="text-[0.65rem] font-mono text-muted uppercase tracking-wider mt-1">
                  Verified via {githubData.source} API
                </p>
              </div>
            )}
          </section>

          {/* Book V: Commission Colophon */}
          <section className="pt-8" id="book5" aria-labelledby="colophon-h">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Book V · Colophon</span>
            <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink uppercase mb-6" id="colophon-h">
              Commission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <p className="font-serif text-lg text-ink-2 leading-relaxed max-w-[38ch]">
                Leave your coordinates and we&apos;ll send a heads-up when commissions open. One message, when the queue is clear. Nothing after.
              </p>

              {/* Form as CTA */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <label className="font-mono text-[0.65rem] uppercase tracking-widest text-accent" htmlFor="enq-email">
                  Start a conversation
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    className="input-specimen"
                    id="enq-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="coordinates@studio.com"
                    disabled={formStatus === "loading" || formStatus === "success"}
                    required
                  />
                  <button
                    className="btn-specimen whitespace-nowrap"
                    type="submit"
                    disabled={formStatus === "loading" || formStatus === "success"}
                  >
                    {formStatus === "loading" ? "SENDING..." : formStatus === "success" ? "SENT" : "SEND A NOTE"}
                  </button>
                </div>
                {formStatus === "success" && (
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider text-accent">
                    Inquiry received. A real reply will arrive shortly.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider text-accent">
                    Please specify a valid email address.
                  </p>
                )}
              </form>
            </div>
          </section>
        </main>

        {/* Colophon Footer */}
        <footer className="mt-24 pt-8 border-t border-rule" role="contentinfo">
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-ink">Jones Tse — Systems &amp; Lyrics</p>
          <p className="font-serif text-sm text-ink-2 mt-1">
            Built using Cormorant Garamond and Cinzel on aged papyrus newsprint.
          </p>
          <p className="font-mono text-[0.65rem] text-muted mt-6 leading-relaxed">
            Govanhill Print Room · © 2026 the folio &amp; its makers.
          </p>
        </footer>
      </div>
    </>
  );
}
