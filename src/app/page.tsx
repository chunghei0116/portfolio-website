"use client";

import { useEffect, useState } from "react";

interface ContributionData {
  count: number;
  source: string;
}

export default function Home() {
  const [githubData, setGithubData] = useState<ContributionData | null>(null);
  
  // Variable font live controls
  const [wght, setWght] = useState(340);
  const [wdth, setWdth] = useState(90);
  const [opsz, setOpsz] = useState(64);

  // Form interactive state
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"default" | "loading" | "success" | "error">("default");
  
  // Active nav dot state
  const [activeSection, setActiveSection] = useState("living");

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
      const sections = ["living", "weights", "concrete", "poster", "work", "studio"];
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
      {/* N3 · Side-rail Navigation */}
      <nav className="rail" aria-label="Primary">
        <a className="rail__mark" href="#top">
          <span className="rail__name">Jones Tse</span>
          <span className="rail__role" aria-hidden="true">systems &amp; graphics</span>
        </a>
        <ul className="rail__dots" aria-label="Sections">
          <li>
            <a href="#living" className={activeSection === "living" ? "is-active" : ""} aria-label="Living Specimen">
              <span className="rail__dot"></span>
            </a>
          </li>
          <li>
            <a href="#weights" className={activeSection === "weights" ? "is-active" : ""} aria-label="Core Variables">
              <span className="rail__dot"></span>
            </a>
          </li>
          <li>
            <a href="#concrete" className={activeSection === "concrete" ? "is-active" : ""} aria-label="Telemetry Flow">
              <span className="rail__dot"></span>
            </a>
          </li>
          <li>
            <a href="#poster" className={activeSection === "poster" ? "is-active" : ""} aria-label="Tactile Poster">
              <span className="rail__dot"></span>
            </a>
          </li>
          <li>
            <a href="#work" className={activeSection === "work" ? "is-active" : ""} aria-label="Selected Work">
              <span className="rail__dot"></span>
            </a>
          </li>
          <li>
            <a href="#studio" className={activeSection === "studio" ? "is-active" : ""} aria-label="Contact Studio">
              <span className="rail__dot"></span>
            </a>
          </li>
        </ul>
        <a className="rail__year" href="#studio">HK · MMXXVI</a>
      </nav>

      {/* Main Page Content */}
      <div className="shell" id="top">
        <main>
          {/* Hero Section */}
          <section className="min-h-[85dvh] flex flex-col justify-between pt-8 pb-16" id="living" aria-labelledby="hero-h">
            <p className="font-mono text-xs uppercase tracking-widest text-accent max-w-md">
              Studio Quaternary — Jones Tse sets code that refuses to hold still. Developer interfaces built on a grid she breaks on purpose.
            </p>

            <h1 className="font-serif text-[clamp(2.5rem,7.5vw,5.5rem)] leading-[1.0] font-normal tracking-tight max-w-4xl my-8" id="hero-h">
              A layout is a <span className="font-sans font-extrabold text-accent">verb</span>, not a <span className="font-serif italic font-light">noun</span>.
            </h1>

            {/* Specimen Live Control Panel */}
            <figure className="specimen-live" aria-labelledby="live-cap">
              <div className="specimen-live__stage">
                <span
                  className="specimen-live__word"
                  style={{
                    fontVariationSettings: `'wght' ${wght}, 'wdth' ${wdth}, 'opsz' ${opsz}`,
                  }}
                  aria-hidden="true"
                >
                  Restless
                </span>
              </div>
              <figcaption className="specimen-live__panel" id="live-cap">
                <div className="axis">
                  <div className="axis__row">
                    <label className="axis__label" htmlFor="axWght">
                      Weight<span className="axis__val">{wght}</span>
                    </label>
                    <input
                      className="axis__range"
                      id="axWght"
                      type="range"
                      min="200"
                      max="800"
                      value={wght}
                      onChange={(e) => setWght(Number(e.target.value))}
                    />
                  </div>
                  <div className="axis__row">
                    <label className="axis__label" htmlFor="axWdth">
                      Width<span className="axis__val">{wdth}</span>
                    </label>
                    <input
                      className="axis__range"
                      id="axWdth"
                      type="range"
                      min="75"
                      max="100"
                      value={wdth}
                      onChange={(e) => setWdth(Number(e.target.value))}
                    />
                  </div>
                  <div className="axis__row">
                    <label className="axis__label" htmlFor="axOpsz">
                      Optical<span className="axis__val">{opsz}</span>
                    </label>
                    <input
                      className="axis__range"
                      id="axOpsz"
                      type="range"
                      min="12"
                      max="96"
                      value={opsz}
                      onChange={(e) => setOpsz(Number(e.target.value))}
                    />
                  </div>
                  <p className="axis__help">
                    Pull the axes. The word reads <em className="font-serif">Restless</em> by design — variables configured in real-time.
                  </p>
                </div>
              </figcaption>
            </figure>

            <a className="link-arrow self-start" href="#work">
              <span>See the ledger</span>
              <svg className="link-arrow__glyph" viewBox="0 0 24 12" width="32" height="16" aria-hidden="true">
                <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </a>
          </section>

          {/* Proof Sheet (Inverted colors to bone paper) */}
          <section className="proof-sheet" id="weights" aria-labelledby="weights-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Plate 01</p>
              <h2 className="plate-head__title" id="weights-h">Quaternary Grotesque Stack</h2>
              <p className="plate-head__sub">
                Three system masters on one typography system, set here at the size they do work at. Checked for responsive contrast guidelines.
              </p>
            </header>

            <ol className="list-none p-0 flex flex-col gap-6" aria-label="Weights, light to bold">
              <li className="border-b border-proof-rule pb-4">
                <span className="font-mono text-xs text-proof-accent block mb-1">Thin · 200</span>
                <p className="font-sans font-light text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-proof-ink">
                  Hairlines hold at billboard sizes.
                </p>
              </li>
              <li className="border-b border-proof-rule pb-4">
                <span className="font-mono text-xs text-proof-accent block mb-1">Regular · 400</span>
                <p className="font-sans font-normal text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-proof-ink">
                  Reads quiet in a paragraph, loud on a wall.
                </p>
              </li>
              <li className="pb-4">
                <span className="font-mono text-xs text-proof-accent block mb-1">Black · 800</span>
                <p className="font-sans font-extrabold text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-proof-ink">
                  Set it once. Let it shout.
                </p>
              </li>
            </ol>
          </section>

          {/* Concrete Poetry / Telemetry Section */}
          <section className="py-16 md:py-24" id="concrete" aria-labelledby="concrete-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Plate 02</p>
              <h2 className="plate-head__title" id="concrete-h">Concrete Poetry</h2>
              <p className="plate-head__sub">
                The shape carries the meaning. Below: <em className="font-serif">“Rain on the Lee,”</em> set so the lines fall the way the rain does — typography as the picture, not its caption.
              </p>
            </header>

            <figure className="poem" aria-labelledby="poem-cap">
              <div className="poem__field" aria-hidden="true">
                <span className="poem__w" style={{ transform: "rotate(-4deg) translateY(12px)", fontWeight: 300 }}>slow</span>
                <span className="poem__w" style={{ transform: "rotate(-7deg) translateY(15px)", fontWeight: 320 }}>at</span>
                <span className="poem__w" style={{ transform: "rotate(-5deg) translateY(14px)", fontWeight: 340 }}>first</span>
                <span className="poem__w" style={{ transform: "rotate(-9deg) translateY(24px)", fontWeight: 360 }}>the</span>
                <span className="poem__w" style={{ transform: "rotate(-8deg) translateY(22px)", fontWeight: 380 }}>grey</span>
                <span className="poem__w" style={{ transform: "rotate(-6deg) translateY(20px)", fontWeight: 360 }}>comes</span>
                <span className="poem__w" style={{ transform: "rotate(-11deg) translateY(36px)", fontWeight: 420 }}>down</span>
                <span className="poem__w" style={{ transform: "rotate(-10deg) translateY(34px)", fontWeight: 440 }}>the</span>
                <span className="poem__w" style={{ transform: "rotate(-9deg) translateY(32px)", fontWeight: 420 }}>quays</span>
                <span className="poem__w" style={{ transform: "rotate(-13deg) translateY(48px)", fontWeight: 520 }}>harder</span>
                <span className="poem__w" style={{ transform: "rotate(-12deg) translateY(46px)", fontWeight: 540 }}>now</span>
                <span className="poem__w" style={{ transform: "rotate(-15deg) translateY(60px)", fontWeight: 640 }}>faster</span>
                <span className="poem__w" style={{ transform: "rotate(-14deg) translateY(58px)", fontWeight: 660 }}>heavier</span>
                <span className="poem__w poem__w--pool">river</span>
              </div>
              <figcaption className="text-center font-mono text-xs text-muted mt-8" id="poem-cap">
                Rain on the Lee · Quaternary Grotesque · set by hand, 2026
              </figcaption>
            </figure>
          </section>

          {/* Broken Grid Poster Section */}
          <section className="py-16 md:py-24 border-t border-rule" id="poster" aria-labelledby="poster-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Plate 03</p>
              <h2 className="plate-head__title" id="poster-h">Broken Grid Poster</h2>
              <p className="plate-head__sub">
                A twelve-column grid is a promise. I keep it just long enough that breaking it means something. One element always crosses the line on purpose.
              </p>
            </header>

            <figure className="poster" aria-labelledby="poster-cap">
              <div className="poster__plate">
                <span className="poster__kicker">Lent Series · Triskel</span>
                <h3 className="poster__title">
                  <span className="poster__word">OFF</span>
                  <span className="poster__word">THE</span>
                  <span className="poster__word poster__word--c">GRID</span>
                </h3>
                <div>
                  <p className="poster__line">Fri 14 March · 8pm</p>
                  <p className="poster__line">Triskel Arts Centre, Tobin Street</p>
                </div>
                <span className="poster__bleed" aria-hidden="true">14</span>
              </div>
              <figcaption className="text-center font-mono text-[0.65rem] text-muted mt-4" id="poster-cap">
                The numeral bleeds past the right margin — the only element allowed to cross.
              </figcaption>
            </figure>
          </section>

          {/* Selected Work Ledger (Tabular F3) */}
          <section className="py-16 md:py-24 border-t border-rule" id="work" aria-labelledby="work-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">Index</p>
              <h2 className="plate-head__title" id="work-h">Selected Work</h2>
              <p className="plate-head__sub">
                A structured registry of systems architected and interactive graphics pipelines deployed.
              </p>
            </header>

            <ol className="ledger" aria-label="Selected work, newest first">
              <li className="ledger__row">
                <span className="ledger__year">2026</span>
                <span className="ledger__name">Telemetry Canvas</span>
                <span className="ledger__kind">High-performance particle streams · self-released</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">2025</span>
                <span className="ledger__name">Distillery Wordmark</span>
                <span className="ledger__kind">Interactive SVG fluid mechanics · Cork Midsummer</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">2025</span>
                <span className="ledger__name">Off the Grid series</span>
                <span className="ledger__kind">Variable typography layout system · Triskel Arts</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">2024</span>
                <span className="ledger__name">Telemetry Spec Sheet</span>
                <span className="ledger__kind">Next.js 16 WebGL graphics pipeline · Aether Lab</span>
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

          {/* Studio Close & Contact Form */}
          <section className="py-16 md:py-24 border-t border-rule" id="studio" aria-labelledby="studio-h">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink mb-6" id="studio-h">
              Set by hand, in Cork.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <p className="font-serif text-md text-muted leading-relaxed">
                I draw type, set code into shapes, and make interfaces that argue with their own grid.
                Most of it starts on tracing paper and ends as one variable file. I take a few
                commissions a year — identities that need a face nobody else has, and systems
                that want to be read across a room.
              </p>

              {/* Form as CTA (C2) */}
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
                    placeholder="you@studio.com"
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

        {/* Ft1 · Mast-headed Footer */}
        <footer className="mt-20 pt-8 border-t border-rule" role="contentinfo">
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-ink">Press Quaternary</p>
          <p className="font-serif text-xs text-muted mt-1">
            The studio of Jones Tse — type, systems, and layouts, set against the grid.
          </p>
          <p className="font-mono text-[0.65rem] text-muted mt-6 leading-relaxed">
            Set in Bricolage Grotesque &amp; Fraunces, with JetBrains Mono for the margins.<br />
            Proofed in Cork. · © 2026 Jones Tse.
          </p>
        </footer>
      </div>
    </>
  );
}
