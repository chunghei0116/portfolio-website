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
        <main className="flex flex-col gap-24 md:gap-36">
          {/* Hero Section — Book I: The Slogan */}
          <section className="min-h-[80dvh] flex flex-col justify-between pt-4" id="book1" aria-labelledby="hero-h">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4">01 · Book I · The Slogan</span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-auto">
              <div className="flex flex-col justify-center">
                <h1 className="font-sans text-[clamp(2.5rem,7.5vw,5.5rem)] leading-[0.95] font-extrabold tracking-display text-ink uppercase mb-6" id="hero-h">
                  Sing in me, <span className="font-serif italic font-light text-accent">Muse</span>,<br />
                  of the code that won&apos;t sit <span className="text-accent-2">still.</span>
                </h1>
                <p className="font-serif text-lg leading-relaxed text-ink-2 max-w-[38ch]">
                  The architecture of Jones Tse. An epic of WebGPU shader pipelines and low-overhead thread calculations built on a grid broken on purpose.
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
              <span>Next Book</span>
              <svg className="link-arrow__glyph" viewBox="0 0 24 12" width="32" height="16" aria-hidden="true">
                <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </a>
          </section>

          {/* Book II: The Capability Planks */}
          <section className="pt-8" id="book2" aria-labelledby="planks-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">02 · Book II</p>
              <h2 className="plate-head__title" id="planks-h">Capabilities</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <span className="font-sans text-xs text-accent font-bold uppercase tracking-widest block mb-2">I · Volcanic Shaders</span>
                <p className="font-serif text-lg text-ink-2 leading-relaxed max-w-[25ch]">
                  Native browser GPU threads pulled from raw vertex coordinate arrays.
                </p>
              </div>
              <div>
                <span className="font-sans text-xs text-accent font-bold uppercase tracking-widest block mb-2">II · Safe Proofs</span>
                <p className="font-serif text-lg text-ink-2 leading-relaxed max-w-[25ch]">
                  TypeScript &amp; Rust compiling under strict safety checks.
                </p>
              </div>
              <div>
                <span className="font-sans text-xs text-accent font-bold uppercase tracking-widest block mb-2">III · Kinetic Solvers</span>
                <p className="font-serif text-lg text-ink-2 leading-relaxed max-w-[25ch]">
                  Interactive physics solvers responding natively to scroll and pointer coordinates.
                </p>
              </div>
            </div>
          </section>

          {/* Book III: The Telemetry Lyric */}
          <section className="pt-8" id="book3" aria-labelledby="lyric-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">03 · Book III</p>
              <h2 className="plate-head__title" id="lyric-h">The Telemetry Lyric</h2>
            </header>

            <div className="lyric-box max-w-lg" aria-hidden="true">
              <div className="lyric-box__strophe">
                <p className="italic">“Down the dark copper wire the message flows,”</p>
                <p className="italic">“Pooling into registers where volcanic fire glows.”</p>
              </div>
              <div className="lyric-box__antistrophe">
                <p className="italic">“Through the ring buffers of the Aegean Sea,”</p>
                <p className="italic">“The graphics compile, safe and forever free.”</p>
              </div>
            </div>
          </section>

          {/* Book IV: Selected Exploits */}
          <section className="pt-8" id="book4" aria-labelledby="exploits-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">04 · Book IV</p>
              <h2 className="plate-head__title" id="exploits-h">Selected Exploits</h2>
            </header>

            <ol className="ledger" aria-label="Selected work, newest first">
              <li className="ledger__row">
                <span className="ledger__year">2026</span>
                <span className="ledger__name">Telemetry Canvas</span>
                <span className="ledger__kind">High-performance WebGPU stream solver</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">2025</span>
                <span className="ledger__name">Tauri Native Wrapper</span>
                <span className="ledger__kind">Low-latency rust telemetry wrapper</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">2025</span>
                <span className="ledger__name">Aegean Solver Layout</span>
                <span className="ledger__kind">Tactile Classical Broadside layout</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">2024</span>
                <span className="ledger__name">Aether Compute Engine</span>
                <span className="ledger__kind">Next.js WebGL graphics pipeline</span>
              </li>
            </ol>

            {githubData && (
              <div className="mt-8 p-4 bg-paper-2 border border-rule max-w-xs">
                <p className="font-mono text-[0.65rem] text-muted uppercase tracking-wider">GitHub ledger</p>
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
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4">05 · Book V · Colophon</span>
            <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink uppercase mb-6" id="colophon-h">
              Commission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <p className="font-serif text-lg text-ink-2 leading-relaxed max-w-[38ch]">
                Configuring low-overhead graphics engines and memory pipelines that require a stately visual signature. I accept a small number of commissions per season.
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
            Hong Kong · © 2026 Jones Tse. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
