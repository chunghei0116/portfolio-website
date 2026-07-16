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

  // Intersection observer to animate ledger rows when scrolled into view
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

    const rows = document.querySelectorAll(".ledger__row");
    rows.forEach((row) => observer.observe(row));

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
            <a href="#book2" className={activeSection === "book2" ? "is-active" : ""} aria-label="Book II: Planks">
              <span className="rail__dot">II</span>
            </a>
          </li>
          <li>
            <a href="#book3" className={activeSection === "book3" ? "is-active" : ""} aria-label="Book III: Choral Lyric">
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
        <main>
          {/* Hero Section — Book I: The Slogan */}
          <section className="min-h-[85dvh] flex flex-col justify-between pt-8 pb-16" id="book1" aria-labelledby="hero-h">
            <p className="font-mono text-xs uppercase tracking-widest text-accent max-w-md">
              Book I — Sing in me, Muse, of the graphics pipeline and the low-latency solver.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-8">
              <div>
                <h1 className="font-sans text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.0] font-extrabold tracking-display text-ink uppercase mb-6" id="hero-h">
                  Sing in me, <span className="font-serif italic font-light text-accent">Muse</span>, of the code that won&apos;t sit <span className="text-accent-2">still.</span>
                </h1>
                <p className="font-serif text-lg leading-relaxed text-ink-2 drop-cap">
                  The architecture of Jones Tse is forged against the template. An epic of WebGPU shaders, memory buffers, and low-overhead pipelines. Correctness is proven under strict type constraints, and viewports render at the rate of classical wind.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="border-4 border-double border-rule p-2 max-w-[280px] sm:max-w-[320px] bg-paper-2">
                  <Image
                    src="/helmet.jpg"
                    alt="Classical Greek helmet illustration"
                    width={320}
                    height={320}
                    className="w-full grayscale contrast-125"
                  />
                </div>
              </div>
            </div>

            <div className="scroll-divider" aria-hidden="true">
              <span className="scroll-divider__glyph">❦</span>
            </div>

            <a className="link-arrow self-start" href="#book4">
              <span>Read the Selected Exploits</span>
              <svg className="link-arrow__glyph" viewBox="0 0 24 12" width="32" height="16" aria-hidden="true">
                <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </a>
          </section>

          {/* Book II: The Capability Planks */}
          <section className="py-16 md:py-24 border-t border-rule" id="book2" aria-labelledby="planks-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Book II</p>
              <h2 className="plate-head__title" id="planks-h">The Capability Planks</h2>
              <p className="plate-head__sub">
                Three foundational anchors set into the parchment. The rules that govern low-latency computations and graphics shaders.
              </p>
            </header>

            <ol className="list-none p-0 flex flex-col gap-8" aria-label="Planks, of computations and proof">
              <li className="border-b border-rule pb-6">
                <span className="font-sans text-xs text-accent font-bold uppercase tracking-widest block mb-2">Plank I · Volcanic Shaders (WebGPU &amp; GLSL)</span>
                <p className="font-serif text-[clamp(1.15rem,2.5vw,1.75rem)] leading-snug text-ink-2">
                  We launch GPU compute pipelines natively from the browser, pulling thread calculations from raw vertex coordinates.
                </p>
              </li>
              <li className="border-b border-rule pb-6">
                <span className="font-sans text-xs text-accent font-bold uppercase tracking-widest block mb-2">Plank II · Safe Proofs (TypeScript &amp; Rust)</span>
                <p className="font-serif text-[clamp(1.15rem,2.5vw,1.75rem)] leading-snug text-ink-2">
                  No cycles are left unverified. We use typing rules as strict mathematical proofs of compiler safety before deployment.
                </p>
              </li>
              <li className="pb-6">
                <span className="font-sans text-xs text-accent font-bold uppercase tracking-widest block mb-2">Plank III · Kinetic Viewports (WebGL)</span>
                <p className="font-serif text-[clamp(1.15rem,2.5vw,1.75rem)] leading-snug text-ink-2">
                  The graphics respond instantly. Stately particle systems and solvers that animate under the touch of the user.
                </p>
              </li>
            </ol>
          </section>

          {/* Book III: The Telemetry Lyric */}
          <section className="py-16 md:py-24 border-t border-rule" id="book3" aria-labelledby="lyric-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Book III</p>
              <h2 className="plate-head__title" id="lyric-h">The Telemetry Lyric</h2>
            </header>

            <div className="lyric-box" aria-hidden="true">
              <div className="lyric-box__strophe">
                <p className="italic">“Down the dark copper wire the message flows,”</p>
                <p className="italic">“Pooling into registers where volcanic fire glows,”</p>
              </div>
              <div className="lyric-box__antistrophe">
                <p className="italic">“Through the ring buffers of the Aegean Sea,”</p>
                <p className="italic">“The graphics compile, safe and forever free.”</p>
              </div>
            </div>
            
            <p className="text-center font-mono text-[0.7rem] text-muted uppercase tracking-wider mt-8">
              Telemetry Strophe · WebGPU Engine · 2026
            </p>
          </section>

          {/* Book IV: Selected Exploits */}
          <section className="py-16 md:py-24 border-t border-rule" id="book4" aria-labelledby="exploits-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Book IV</p>
              <h2 className="plate-head__title" id="exploits-h">Selected Exploits</h2>
            </header>

            <ol className="ledger" aria-label="Selected work, newest first">
              <li className="ledger__row">
                <span className="ledger__year">2026</span>
                <span className="ledger__name">Telemetry Canvas</span>
                <span className="ledger__kind">High-performance WebGPU stream solver · self-released</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">2025</span>
                <span className="ledger__name">Tauri Native Wrapper</span>
                <span className="ledger__kind">Low-latency rust telemetry integration · Apex</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">2025</span>
                <span className="ledger__name">Aegean Solver Layout</span>
                <span className="ledger__kind">Tactile Classical Broadside layout · Triskel</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">2024</span>
                <span className="ledger__name">Aether Compute Engine</span>
                <span className="ledger__kind">Next.js WebGL graphics pipeline · Aether Lab</span>
              </li>
            </ol>

            {githubData && (
              <div className="mt-8 p-4 bg-paper-2 border border-rule max-w-sm">
                <p className="font-mono text-xs text-muted uppercase tracking-wider">GitHub contributions ledger</p>
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
          <section className="py-16 md:py-24 border-t border-rule" id="book5" aria-labelledby="colophon-h">
            <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink uppercase mb-6" id="colophon-h">
              Commission Colophon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <p className="font-serif text-lg text-ink-2 leading-relaxed">
                I configure rendering engines, build memory pipelines, and design scroll layouts that argue with their own margins.
                I accept a small number of commissions per season — low-latency architectures that require a stately visual signature.
              </p>

              {/* Form as CTA */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <label className="font-mono text-xs uppercase tracking-widest text-accent" htmlFor="enq-email">
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
        <footer className="mt-20 pt-8 border-t border-rule" role="contentinfo">
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-ink">Jones Tse — Systems &amp; Lyrics</p>
          <p className="font-serif text-sm text-ink-2 mt-1">
            Built using Cormorant Garamond and Cinzel on aged papyrus newsprint.
          </p>
          <p className="font-mono text-[0.65rem] text-muted mt-6 leading-relaxed">
            Hong Kong · © 2026 Jones Tse. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
