"use client";

import { useEffect, useState } from "react";

interface ContributionData {
  count: number;
  source: string;
}

export default function Home() {
  const [githubData, setGithubData] = useState<ContributionData | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus("error");
      return;
    }
    setFormStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16 text-foreground relative z-10">
      {/* N6 Newspaper Masthead */}
      <header className="nav-mast">
        <p className="mast-line">EDITION NO. 42 · JULY 2026 · HONG KONG</p>
        <h1 className="mast-name font-serif">THE PORTFOLIO</h1>
        <nav className="mast-nav" aria-label="Primary">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Selected Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <hr className="mast-rule double" aria-hidden="true" />
      </header>

      {/* Marquee Hero Statement */}
      <section className="my-12 md:my-20">
        <h2 className="font-serif text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9] font-medium tracking-tight text-balance">
          SYSTEMS SET WITH <span className="text-accent-blue font-sans font-bold">CARE</span>, DEVELOPED FOR <span className="font-serif italic font-normal text-accent-gold">PERFORMANCE</span>.
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-2xl font-serif text-ink-2 leading-relaxed">
          I build high-performance web systems, interactive 3D visualizations, and responsive developer interfaces with tactile attention to mechanical and aesthetic details.
        </p>
      </section>

      {/* Broadsheet Grid */}
      <div className="broadsheet-grid">
        {/* Sidebar Info */}
        <aside className="broadsheet-sidebar flex flex-col gap-8" id="about">
          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-muted border-b border-rule pb-2 mb-4">THE ENGINEER</h3>
            <p className="font-serif text-base leading-relaxed text-ink-2 mb-4">
              Jones Tse is a full-stack engineer and graphics specialist focused on building low-latency web architecture and rich user interactions.
            </p>
            <div className="flex gap-2">
              <a href="#contact" className="btn-press">HIRE / CONTACT</a>
              <a href="https://github.com/chunghei0116" target="_blank" rel="noopener noreferrer" className="btn-press">GITHUB</a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-muted border-b border-rule pb-2 mb-4">CAPABILITIES</h3>
            <ul className="flex flex-wrap gap-2">
              <li className="px-2 py-1 bg-paper-3 border border-rule text-xs font-mono uppercase text-ink-2">Next.js</li>
              <li className="px-2 py-1 bg-paper-3 border border-rule text-xs font-mono uppercase text-ink-2">TypeScript</li>
              <li className="px-2 py-1 bg-paper-3 border border-rule text-xs font-mono uppercase text-ink-2">React / R3F</li>
              <li className="px-2 py-1 bg-paper-3 border border-rule text-xs font-mono uppercase text-ink-2">Three.js</li>
              <li className="px-2 py-1 bg-paper-3 border border-rule text-xs font-mono uppercase text-ink-2">Tailwind CSS</li>
              <li className="px-2 py-1 bg-paper-3 border border-rule text-xs font-mono uppercase text-ink-2">Rust / Tauri</li>
              <li className="px-2 py-1 bg-paper-3 border border-rule text-xs font-mono uppercase text-ink-2">WebGPU / GLSL</li>
              <li className="px-2 py-1 bg-paper-3 border border-rule text-xs font-mono uppercase text-ink-2">Node.js</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-muted border-b border-rule pb-2 mb-4">STATISTICAL RECORD</h3>
            <div className="p-4 bg-paper-2 border border-rule">
              <p className="text-[2.5rem] font-bold font-sans tracking-tight text-accent-blue leading-none">
                {githubData ? githubData.count.toLocaleString() : "4,652"}
              </p>
              <p className="text-xs font-serif uppercase tracking-wider text-muted mt-2">
                Total GitHub Contributions (2023 - 2026)
              </p>
              <p className="text-[0.65rem] font-mono text-muted uppercase tracking-wider mt-1">
                Source: {githubData ? githubData.source : "Loading..."} API
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex flex-col gap-12">
          {/* F3 Experience Tabular Spec Sheet */}
          <section id="experience">
            <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-muted border-b border-rule pb-2 mb-6">PROFESSIONAL RECORD</h3>
            <table className="spec-sheet tnum">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Role & Firm</th>
                  <th>Core Practice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono text-sm pr-4">2025 — Pres.</td>
                  <td>
                    <div className="font-serif font-bold text-base text-ink">Senior Frontend Architect</div>
                    <div className="text-sm text-muted">Aether Graphics Lab</div>
                  </td>
                  <td className="text-sm text-ink-2">
                    Led development of a high-performance WebGL-based visualization pipeline that reduced canvas render overhead by 42%. Maintained Next.js design systems across multiple product verticals.
                  </td>
                </tr>
                <tr>
                  <td className="font-mono text-sm pr-4">2023 — 2025</td>
                  <td>
                    <div className="font-serif font-bold text-base text-ink">Full Stack Engineer</div>
                    <div className="text-sm text-muted">CoreLogic Systems</div>
                  </td>
                  <td className="text-sm text-ink-2">
                    Shipped a responsive telemetry dashboard processing 12M events daily. Integrated Tauri native wrappers and optimized Next.js server-side caching routines.
                  </td>
                </tr>
                <tr>
                  <td className="font-mono text-sm pr-4">2022 — 2023</td>
                  <td>
                    <div className="font-serif font-bold text-base text-ink">Software Developer</div>
                    <div className="text-sm text-muted">Apex Creative Co.</div>
                  </td>
                  <td className="text-sm text-ink-2">
                    Developed bespoke web experiences using Three.js and custom shaders. Worked closely with design leads to match complex grid layouts and motion specifications.
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Selected Projects */}
          <section id="projects">
            <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-muted border-b border-rule pb-2 mb-6">SELECTED WORK</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-paper-2 border border-rule flex flex-col justify-between">
                <div>
                  <span className="text-[0.65rem] font-mono uppercase text-muted tracking-widest">Interactive 3D Simulation</span>
                  <h4 className="font-serif font-bold text-lg text-ink mt-1 mb-2">Renaissance Cloth Physics</h4>
                  <p className="text-xs text-ink-2 leading-relaxed font-sans mb-4">
                    A real-time fabric solver using Cannon.js and custom procedural canvas threads on top of WebGL lights.
                  </p>
                </div>
                <a href="https://github.com/chunghei0116/portfolio-website" target="_blank" rel="noopener noreferrer" className="btn-press self-start mt-4">VIEW CODE →</a>
              </div>

              <div className="p-6 bg-paper-2 border border-rule flex flex-col justify-between">
                <div>
                  <span className="text-[0.65rem] font-mono uppercase text-muted tracking-widest">Graphics Pipeline</span>
                  <h4 className="font-serif font-bold text-lg text-ink mt-1 mb-2">WebGPU Compute Shader Wave</h4>
                  <p className="text-xs text-ink-2 leading-relaxed font-sans mb-4">
                    Experimental particle ocean simulation using WGSL compute pipelines for fluid particle simulation at 120fps.
                  </p>
                </div>
                <a href="https://github.com/chunghei0116" target="_blank" rel="noopener noreferrer" className="btn-press self-start mt-4">EXPLORE PROJECT →</a>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="border-t border-rule pt-8 mt-4">
            <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-muted pb-2 mb-6">HIRE / CONTACT INQUIRY</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="input-editorial"
                  disabled={formStatus === "loading" || formStatus === "success"}
                />
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="input-editorial"
                  disabled={formStatus === "loading" || formStatus === "success"}
                />
              </div>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                placeholder="Inquiry or Project Details..."
                rows={4}
                className="input-editorial w-full"
                disabled={formStatus === "loading" || formStatus === "success"}
              />
              <button
                type="submit"
                className="btn-press self-start"
                disabled={formStatus === "loading" || formStatus === "success"}
              >
                {formStatus === "loading" ? "SENDING..." : formStatus === "success" ? "SENT SUCCESSFULLY" : "SUBMIT INQUIRY"}
              </button>
              {formStatus === "error" && (
                <p className="text-xs font-mono text-accent-blue uppercase tracking-wider">Please fill in all fields.</p>
              )}
            </form>
          </section>
        </main>
      </div>

      {/* Ft2 Footer Inline Rule Single Line */}
      <footer className="mt-20 pt-8 border-t border-rule text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">
          © 2026 JONES TSE · DESIGN PRINCIPLES: RETRENCHMENT & RESTRAINT · MIT LICENSE
        </p>
      </footer>
    </div>
  );
}
