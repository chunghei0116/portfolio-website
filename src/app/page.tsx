"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // Form interactive state
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"default" | "loading" | "success" | "error">("default");
  
  // Active nav dot state
  const [activeSection, setActiveSection] = useState("top-section");

  // Monitor scrolling to highlight nav dots
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top-section", "catalogue", "programme", "workshops", "visit"];
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
          <span className="rail__name">Off-Register</span>
          <span className="rail__role" aria-hidden="true">Riso Print Fair</span>
        </a>
        <ul className="rail__dots" aria-label="Sections">
          <li>
            <a href="#top-section" className={activeSection === "top-section" ? "is-active" : ""} aria-label="Top">
              <span className="rail__dot">I</span>
            </a>
          </li>
          <li>
            <a href="#catalogue" className={activeSection === "catalogue" ? "is-active" : ""} aria-label="Exhibitors">
              <span className="rail__dot">II</span>
            </a>
          </li>
          <li>
            <a href="#programme" className={activeSection === "programme" ? "is-active" : ""} aria-label="Programme">
              <span className="rail__dot">III</span>
            </a>
          </li>
          <li>
            <a href="#workshops" className={activeSection === "workshops" ? "is-active" : ""} aria-label="Workshops">
              <span className="rail__dot">IV</span>
            </a>
          </li>
          <li>
            <a href="#visit" className={activeSection === "visit" ? "is-active" : ""} aria-label="Visit">
              <span className="rail__dot">V</span>
            </a>
          </li>
        </ul>
        <a className="rail__year" href="#visit">GLA · MMXXVI</a>
      </nav>

      {/* Main Page Content */}
      <div className="shell" id="top">
        <main className="flex flex-col gap-24 md:gap-36">
          {/* Hero Section */}
          <section className="min-h-[80dvh] flex flex-col justify-between pt-4" id="top-section" aria-labelledby="hero-h">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
              Edition 04 · Govanhill · 18–19 October 2026 · Free entry
            </span>

            <div className="my-auto max-w-4xl">
              <h1 className="font-sans text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-extrabold tracking-display text-ink uppercase mb-6" id="hero-h">
                Off-Register<br />
                A Risograph <span className="font-serif italic font-light text-accent">Print Fair</span>
              </h1>
              <p className="font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] leading-relaxed text-ink-2 mb-8 max-w-[34ch] drop-cap">
                Two days · One drum at a time. Design like print: warm, off-register, intentional. For one weekend the Pulp Yard fills with spot colour — Greek bronze that won&apos;t sit still, Aegean deep blue that bleeds a hair past its edge, paper you can smell. Come turn the drum.
              </p>
              <div className="flex flex-wrap gap-4">
                <a className="btn-specimen" href="#visit">Plan your visit</a>
                <a className="link-arrow self-center" href="#catalogue">
                  <span>Read the exhibitor list</span>
                  <svg className="link-arrow__glyph" viewBox="0 0 24 12" width="32" height="16" aria-hidden="true">
                    <path d="M0 6h22M17 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="scroll-divider" aria-hidden="true">
              <span className="scroll-divider__glyph">❦</span>
            </div>
          </section>

          {/* Catalogue / Exhibitors Section */}
          <section className="pt-8" id="catalogue" aria-labelledby="catalogue-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">02</p>
              <h2 className="plate-head__title" id="catalogue-h">Exhibitors</h2>
              <p className="plate-head__sub">Thirty-four studios · Hall A &amp; the Mezzanine · updated 2 Oct</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="riso-card p-4 border border-rule bg-paper-2 flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className="font-mono text-[0.65rem] text-accent uppercase block mb-1">Working press · Stand A1</span>
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-2">Brae &amp; Drum</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    A live two-colour MZ. Pull a print, keep it wet.
                  </p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="riso-card p-4 border border-rule bg-paper-2 flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className="font-mono text-[0.65rem] text-accent-2 uppercase block mb-1">Zines · Stand A4</span>
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-2">Saltmarket Editions</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    Perfect-bound photo zines, two spot colours, no black.
                  </p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="riso-card p-4 border border-rule bg-paper-2 flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className="font-mono text-[0.65rem] text-accent uppercase block mb-1">Posters · Stand A6</span>
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-2">Mono No Aware Press</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    A2 gig posters. Bronze ink that glows under the museum strip lights.
                  </p>
                </div>
              </div>
              {/* Card 4 */}
              <div className="riso-card p-4 border border-rule bg-paper-2 flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className="font-mono text-[0.65rem] text-accent-2 uppercase block mb-1">Comics · Stand A9</span>
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-2">Tenement Comics</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    Riso-printed shorts about the close, the bin store, the No. 6 bus.
                  </p>
                </div>
              </div>
              {/* Card 5 */}
              <div className="riso-card p-4 border border-rule bg-paper-2 flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className="font-mono text-[0.65rem] text-accent uppercase block mb-1">Zines · Stand A11</span>
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-2">Verdigris &amp; Co</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    Botanical risographs on grey speckle stock. Aegean blue on blue.
                  </p>
                </div>
              </div>
              {/* Card 6 */}
              <div className="riso-card p-4 border border-rule bg-paper-2 flex flex-col justify-between min-h-[160px]">
                <div>
                  <span className="font-mono text-[0.65rem] text-accent-2 uppercase block mb-1">Posters · Stand A13</span>
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-2">Halftone Social Club</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    Big dot screens, on purpose. Bring a loupe.
                  </p>
                </div>
              </div>
            </div>
            
            <p className="font-serif text-sm text-muted italic mt-8 text-center">
              … and twenty-five more, from Govan Letterpress to Fluoro Bakery.
            </p>
          </section>

          {/* Programme Section */}
          <section className="pt-8" id="programme" aria-labelledby="programme-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">03</p>
              <h2 className="plate-head__title" id="programme-h">Programme</h2>
              <p className="plate-head__sub">Talks on the Mezzanine · printing in Hall A · all free, drop in</p>
            </header>

            <ol className="ledger" aria-label="Scheduled fair program">
              <li className="ledger__row">
                <span className="ledger__year">8:30 PM</span>
                <span className="ledger__name">Opening Keynote</span>
                <span className="ledger__kind">A short talk on printing under constraint. Twelve minutes.</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">9:00 PM</span>
                <span className="ledger__name">Live Launch · 01</span>
                <span className="ledger__kind">A new way to map layout coordinates. Embargo lifts at the door.</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">9:45 PM</span>
                <span className="ledger__name">Spot coding demonstration</span>
                <span className="ledger__kind">Live overprint generation · no slides. Forty-five minutes.</span>
              </li>
              <li className="ledger__row">
                <span className="ledger__year">11:30 PM</span>
                <span className="ledger__name">Live Launch · 02</span>
                <span className="ledger__kind">Open-source print solver. Bring a laptop to follow along.</span>
              </li>
            </ol>
          </section>

          {/* Workshops Section */}
          <section className="pt-8" id="workshops" aria-labelledby="workshops-h">
            <header className="plate-head">
              <p className="plate-head__no" aria-hidden="true">04</p>
              <h2 className="plate-head__title" id="workshops-h">Workshops</h2>
              <p className="plate-head__sub">Small groups · materials included · book at the door</p>
            </header>

            <ol className="list-none p-0 flex flex-col gap-6" aria-label="Scheduled workshops">
              <li className="riso-card p-4 border border-rule bg-paper-2 grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <span className="font-mono text-xs text-accent font-bold">Sat 13:00 · 90 min · £18</span>
                <div className="md:col-span-3">
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-1">Make a one-colour mini-zine</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    Draw it, fold it, run it through the press, staple it. You leave with twenty copies of an eight-page zine and ink under at least one fingernail.
                  </p>
                </div>
              </li>
              <li className="riso-card p-4 border border-rule bg-paper-2 grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <span className="font-mono text-xs text-accent-2 font-bold">Sat 15:30 · 2 hrs · £26</span>
                <div className="md:col-span-3">
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-1">Two-colour overprint &amp; offset</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    The whole point of riso is the misregister. We&apos;ll layer Aegean blue over bronze, shift the paper a few millimetres on purpose, and chase the green you can only get by accident.
                  </p>
                </div>
              </li>
              <li className="riso-card p-4 border border-rule bg-paper-2 grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <span className="font-mono text-xs text-accent font-bold">Sun 15:00 · 60 min · Free</span>
                <div className="md:col-span-3">
                  <h3 className="font-sans font-bold text-lg text-ink uppercase mb-1">Kids&apos; print hour</h3>
                  <p className="font-serif text-sm text-ink-2 leading-relaxed">
                    One colour, big shapes, no precious objects. Little ones cut a stencil and pull their own poster to take home. Aprons supplied.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Visit Section */}
          <section className="pt-8" id="visit" aria-labelledby="visit-h">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4">05 · Visit</span>
            <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] leading-none text-ink uppercase mb-6" id="visit-h">
              Plan Your Visit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <p className="font-serif text-lg text-ink-2 leading-relaxed max-w-[38ch]">
                Free entry, both days. No ticket needed — but leave your email and we&apos;ll send the floor plan, the full A–Z of studios, and a heads-up when workshop places open. One message, the week before. Nothing after.
              </p>

              {/* Form as CTA */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <label className="font-mono text-[0.65rem] uppercase tracking-widest text-accent" htmlFor="enq-email">
                  Get updates
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    className="input-specimen"
                    id="enq-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ink@studio.com"
                    disabled={formStatus === "loading" || formStatus === "success"}
                    required
                  />
                  <button
                    className="btn-specimen whitespace-nowrap"
                    type="submit"
                    disabled={formStatus === "loading" || formStatus === "success"}
                  >
                    {formStatus === "loading" ? "SENDING..." : formStatus === "success" ? "SENT" : "SUBSCRIBE"}
                  </button>
                </div>
                {formStatus === "success" && (
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider text-accent">
                    Subscription active. Floor maps will arrive in October.
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

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-rule" role="contentinfo">
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-ink">OFF-REGISTER</p>
          <p className="font-serif text-sm text-ink-2 mt-1">
            A risograph print fair, run by volunteers from the Govanhill print room since 2022.
          </p>
          <p className="font-mono text-[0.65rem] text-muted mt-6 leading-relaxed">
            The Pulp Yard · 31 Calder Street, Glasgow G42 7RA. © 2026 the fair &amp; its makers.
          </p>
        </footer>
      </div>
    </>
  );
}
