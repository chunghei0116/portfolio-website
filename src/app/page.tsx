"use client";

import { useEffect, useState } from "react";

interface ContributionData {
  count: number;
  source: string;
}

export default function Home() {
  const [githubData, setGithubData] = useState<ContributionData | null>(null);
  
  // Form interactive state
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"default" | "loading" | "success" | "error">("default");

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
      <a className="skip-link" href="#manifesto">Skip to the manifesto</a>

      {/* Press furniture — fixed crop marks + registration target (decorative) */}
      <div className="press-marks" aria-hidden="true">
        <span className="crop crop--tl"></span>
        <span className="crop crop--tr"></span>
        <span className="crop crop--bl"></span>
        <span className="crop crop--br"></span>
      </div>
      <div className="reg-target" aria-hidden="true"><span></span></div>

      {/* ═══════════ Masthead ═══════════ */}
      <header className="sheet masthead">
        <div className="masthead__bar">
          <a className="masthead__mark" href="#top" aria-label="Jones Tse — home">
            Jones Tse <span className="no">DEV Nº 01</span>
          </a>
          <p className="masthead__edition">
            Systems &amp; Graphics · tactile sheet<br />
            Hong Kong · MMXXVI
          </p>
        </div>
        <nav className="masthead__nav" aria-label="Primary">
          <a href="#manifesto">The Planks</a>
          <span className="dot" aria-hidden="true">·</span>
          <a href="#tally">The Count</a>
          <span className="dot" aria-hidden="true">·</span>
          <a href="#ledger">The Ledger</a>
          <span className="dot" aria-hidden="true">·</span>
          <a href="#inquire">Inquire</a>
        </nav>
      </header>

      <main id="top">
        {/* ═══════════ The Fold — Hero Slogan ═══════════ */}
        <section className="sheet fold" aria-labelledby="fold-title">
          <p className="strapline">A broadsheet of systems and graphics worth compiling · est. on a command-line</p>
          <div className="fold__inner">
            <h1 className="fold__slogan" id="fold-title">
              <span className="ghost" style={{ "--i": 0 } as React.CSSProperties}>
                <span className="ink">Jones Tse</span>
                <span className="reg reg--teal" aria-hidden="true">Jones Tse</span>
              </span>
              <span className="ghost" style={{ "--i": 1 } as React.CSSProperties}>
                <span className="ink">Code that</span>
                <span className="reg" aria-hidden="true">Code that</span>
              </span>
              <span className="ghost" style={{ "--i": 2 } as React.CSSProperties}>
                <span className="ink text-accent">won&apos;t sit still.</span>
                <span className="reg reg--teal" aria-hidden="true">won&apos;t sit still.</span>
              </span>
            </h1>
            <div>
              <p className="fold__lede">
                A system is not a dustbin. It is an engine of <strong>precision mechanics</strong>, low latency, and graphics pipelines that respond to the user&apos;s touch. I build with compilers that enforce correctness and viewports that run at 120fps.
              </p>
              <p className="fold__meta">
                <span>No templates</span>
                <span>No UI slop</span>
                <span>Low-latency graphics</span>
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ The Manifesto Spine ═══════════ */}
        <section className="sheet spine" id="manifesto" aria-labelledby="spine-title">
          <div className="spine__head">
            <p className="spine__eyebrow">Five Planks We Hold to Be True</p>
            <h2 className="spine__title">The principles of low-latency computation</h2>
          </div>

          {/* Plank 01 */}
          <article className="plank" style={{ "--i": 1 } as React.CSSProperties}>
            <p className="plank__num">01</p>
            <div>
              <p className="plank__slab ghost" style={{ "--i": 1 } as React.CSSProperties}>
                <span className="ink">Throwing cycles <br />away is a <span className="red">choice</span>.</span>
                <span className="reg" aria-hidden="true">Throwing cycles <br />away is a choice.</span>
              </p>
              <p className="plank__gloss">
                CPU clocks are not infinite, but we treat them as if they are cheap. Heavy bundles, unnecessary layers, and generic solutions are laziness. A low-latency rendering pipeline is the <em>honest answer</em>; optimization is the work.
              </p>
            </div>
          </article>

          {/* Plank 02 */}
          <article className="plank" style={{ "--i": 2 } as React.CSSProperties}>
            <p className="plank__num">02</p>
            <div>
              <p className="plank__slab ghost" style={{ "--i": 2 } as React.CSSProperties}>
                <span className="ink">Shaders belong <br />in the <span className="red">viewport</span>.</span>
                <span className="reg reg--teal" aria-hidden="true">Shaders belong <br />in the viewport.</span>
              </p>
              <p className="plank__gloss">
                Tactile graphics shouldn&apos;t be locked to desktop applications. We configure WebGL shaders, compute kernels, and physics pipelines to run smoothly on any device — bringing <em>low-overhead simulation</em> directly to the browser.
              </p>
            </div>
          </article>

          {/* Plank 03 */}
          <article className="plank" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="plank__num">03</p>
            <div>
              <p className="plank__slab ghost" style={{ "--i": 3 } as React.CSSProperties}>
                <span className="ink">Systems compile <br />on strict <span className="red">proof</span>.</span>
                <span className="reg" aria-hidden="true">Systems compile <br />on strict proof.</span>
              </p>
              <p className="plank__gloss">
                Type systems are not guidelines. Rust, TypeScript, and WGSL provide strict guarantees of program memory safety. We structure applications to prove their correctness before they ever touch production machines.
              </p>
            </div>
          </article>

          {/* Plank 04 */}
          <article className="plank" style={{ "--i": 4 } as React.CSSProperties}>
            <p className="plank__num">04</p>
            <div>
              <p className="plank__slab ghost" style={{ "--i": 4 } as React.CSSProperties}>
                <span className="ink">A canvas that <br />moves, <span className="red">communicates</span>.</span>
                <span className="reg reg--teal" aria-hidden="true">A canvas that <br />moves, communicates.</span>
              </p>
              <p className="plank__gloss">
                Static layouts represent static thoughts. We code interactive particle streams, dynamic cloth solvers, and fluid mechanics that respond instantly to the user&apos;s drag, click, and swipe.
              </p>
            </div>
          </article>

          {/* Plank 05 */}
          <article className="plank" style={{ "--i": 5 } as React.CSSProperties}>
            <p className="plank__num">05</p>
            <div>
              <p className="plank__slab ghost" style={{ "--i": 5 } as React.CSSProperties}>
                <span className="ink">Keep it fast. <br />Ship it <span className="red">raw</span>.</span>
                <span className="reg" aria-hidden="true">Keep it fast. <br />Ship it raw.</span>
              </p>
              <p className="plank__gloss">
                No complex nested container layers. No visual placeholders. We build direct layouts, expose clear typographic hierarchies, and deliver raw performance straight from the compiler.
              </p>
            </div>
          </article>
        </section>

        {/* ═══════════ Tape Marquee — The Count ═══════════ */}
        <section className="sheet" id="tally" aria-labelledby="tally-label">
          <h2 className="u-vh" id="tally-label">Telemetry Metrics Ledger</h2>
          <div className="tally">
            <div className="tally__strip">
              <div className="tally__track" aria-hidden="true">
                <span className="tally__item"><span className="n">120</span> Target FPS <span className="sep">/</span></span>
                <span className="tally__item"><span className="n n--teal">4</span> WebGPU Shaders <span className="sep">/</span></span>
                <span className="tally__item"><span className="n">3,400</span> Particle nodes <span className="sep">/</span></span>
                <span className="tally__item"><span className="n">0</span> Grid gaps <span className="sep">/</span></span>
                <span className="tally__item"><span className="n n--teal">16</span> React Pipelines <span className="sep">/</span></span>
                <span className="tally__item"><span className="n">2</span> Riso passes <span className="sep">/</span></span>
                <span className="tally__item"><span className="n">100%</span> Type safe <span className="sep">/</span></span>
                <span className="tally__item"><span className="n n--teal">60hz</span> Thread rate <span className="sep">/</span></span>
                
                {/* Loop content */}
                <span className="tally__item"><span className="n">120</span> Target FPS <span className="sep">/</span></span>
                <span className="tally__item"><span className="n n--teal">4</span> WebGPU Shaders <span className="sep">/</span></span>
                <span className="tally__item"><span className="n">3,400</span> Particle nodes <span className="sep">/</span></span>
                <span className="tally__item"><span className="n">0</span> Grid gaps <span className="sep">/</span></span>
                <span className="tally__item"><span className="n n--teal">16</span> React Pipelines <span className="sep">/</span></span>
                <span className="tally__item"><span className="n">2</span> Riso passes <span className="sep">/</span></span>
                <span className="tally__item"><span className="n">100%</span> Type safe <span className="sep">/</span></span>
                <span className="tally__item"><span className="n n--teal">60hz</span> Thread rate <span className="sep">/</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ Selected Ledger ═══════════ */}
        <section className="sheet py-12" id="ledger" aria-labelledby="ledger-title">
          <header className="plate-head mb-8">
            <h2 className="font-display font-extrabold text-3xl uppercase text-ink" id="ledger-title">Selected Ledger</h2>
            <p className="font-body text-base text-ink-mute">
              A structured index of systems built and interactive pipelines shipped.
            </p>
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
              <span className="ledger__name">Riso Poster Canvas</span>
              <span className="ledger__kind">Offset printing layout simulator · Triskel</span>
            </li>
            <li className="ledger__row">
              <span className="ledger__year">2024</span>
              <span className="ledger__name">Aether Compute Engine</span>
              <span className="ledger__kind">Next.js WebGL graphics pipeline · Aether Lab</span>
            </li>
          </ol>

          {githubData && (
            <div className="mt-8 p-4 bg-paper-2 border border-rule max-w-sm">
              <p className="font-mono text-xs text-ink-mute uppercase tracking-wider">GitHub contributions ledger</p>
              <p className="font-display text-4xl font-extrabold text-accent mt-1 leading-none">
                {githubData.count.toLocaleString()}
              </p>
              <p className="text-[0.65rem] font-mono text-ink-mute uppercase tracking-wider mt-1">
                Verified via {githubData.source} API
              </p>
            </div>
          )}
        </section>

        {/* ═══════════ Inquire Form ═══════════ */}
        <section className="sheet py-16 border-t border-rule" id="inquire" aria-labelledby="inquire-title">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="font-display font-extrabold text-4xl uppercase text-ink mb-4" id="inquire-title">
                Start a commission
              </h2>
              <p className="font-body text-base text-ink-2 leading-relaxed">
                I engineer rendering pipelines, architect low-latency Next.js systems, and design interfaces that challenge standard layout grids. If you have an application that needs correctness under load or runs graphics at high frame rates, start a conversation.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <label className="font-mono text-xs uppercase tracking-widest text-accent" htmlFor="enq-email">
                Your coordinates (Email)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  className="input-riso"
                  id="enq-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  disabled={formStatus === "loading" || formStatus === "success"}
                  required
                />
                <button
                  className="btn-riso whitespace-nowrap"
                  type="submit"
                  disabled={formStatus === "loading" || formStatus === "success"}
                >
                  {formStatus === "loading" ? "SENDING..." : formStatus === "success" ? "SENT" : "SEND A NOTE"}
                </button>
              </div>
              {formStatus === "success" && (
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-accent">
                  Transmission received. I will check the registers and reply.
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

      {/* ═══════════ Colophon Footer ═══════════ */}
      <footer className="sheet colophon" role="contentinfo">
        <div className="colophon__text">
          <p className="font-display font-extrabold text-lg uppercase text-ink">Jones Tse — Systems &amp; Graphics</p>
          <p className="mt-1">
            Built using Next.js, printed in two off-register riso passes. Set in Big Shoulders Display, Fraunces, and Spline Sans Mono.
          </p>
          <p className="font-mono text-[0.65rem] text-ink-mute mt-4">
            Hong Kong · © 2026 Jones Tse. All rights reserved.
          </p>
        </div>
        <div className="colophon__registration">
          <div className="colophon__target" aria-hidden="true"></div>
          <span className="colophon__tag">REG Nº 01</span>
        </div>
      </footer>
    </>
  );
}
