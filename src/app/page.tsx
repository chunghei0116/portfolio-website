import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, GitFork, Mail } from 'lucide-react';

const projects = [
  {
    title: 'Signal / Field',
    type: 'Product direction',
    note: 'Turning difficult systems into calm, legible tools for people who need them to work.',
  },
  {
    title: 'Soft Infrastructure',
    type: 'Platform work',
    note: 'A considered interface layer for dense operational work.',
  },
  {
    title: 'Useful Oddities',
    type: 'Experiments',
    note: 'Small, sharp explorations in interaction, language, and motion.',
  },
];

const chapters = [
  ['I', 'Find the true shape of the problem.', 'Start with the real constraint, the people around it, and the decision that must become easier.'],
  ['II', 'Make the system speak plainly.', 'Turn product logic into interfaces, flows, and code that hold together under use.'],
  ['III', 'Leave room for the next chapter.', 'Build flexible foundations so good work can keep changing without losing its bearing.'],
];

export default function Home() {
  return (
    <main className="odyssey-shell">
      <header className="odyssey-masthead">
        <p className="odyssey-mastline">Hong Kong · Independent digital practice · MMXXVI</p>
        <a className="odyssey-name" href="#top" aria-label="Return to the beginning">Jones Tse</a>
        <nav className="odyssey-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#practice">Practice</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="odyssey-hero" id="top" aria-labelledby="hero-title">
        <Image
          className="odyssey-hero-art"
          src="/homeric-hero.png"
          alt="A classical figure overlooking a coastal city at sunset, holding an architectural drawing."
          fill
          priority
          sizes="100vw"
        />
        <div className="odyssey-hero-shade" aria-hidden="true" />
        <div className="odyssey-hero-copy">
          <p className="odyssey-hero-kicker">Product engineer · systems &amp; interface</p>
          <h1 id="hero-title">CODE FOR<br />THE LONG<br /><span>ODYSSEY.</span></h1>
        </div>
        <p className="odyssey-caption">Plate I · A practice for useful digital work</p>
        <a className="odyssey-scroll" href="#work">Read the record <ArrowDownRight aria-hidden="true" size={18} /></a>
      </section>

      <section className="odyssey-prologue" aria-labelledby="prologue-title">
        <p className="odyssey-prologue-mark">01</p>
        <div>
          <h2 id="prologue-title">I make ambitious products feel inevitable.</h2>
          <p>I work across product thinking, system design, and front-end engineering—helping teams turn difficult ideas into clear, durable experiences.</p>
          <div className="odyssey-prologue-links">
            <a className="odyssey-link" href="#contact">Discuss a contract <ArrowUpRight aria-hidden="true" size={17} /></a>
            <a className="odyssey-link" href="https://github.com/chunghei0116" target="_blank" rel="noreferrer">View GitHub <GitFork aria-hidden="true" size={17} /></a>
          </div>
        </div>
      </section>

      <section className="odyssey-work" id="work" aria-labelledby="work-title">
        <header className="odyssey-section-head">
          <p>Selected work</p>
          <h2 id="work-title">A record of<br />things made clear.</h2>
        </header>
        <div className="odyssey-projects">
          {projects.map((project, index) => (
            <article className="odyssey-project" key={project.title}>
              <p className="odyssey-index">0{index + 1}</p>
              <div>
                <p className="odyssey-project-type">{project.type}</p>
                <h3>{project.title}</h3>
              </div>
              <p className="odyssey-project-note">{project.note}</p>
              <a href="#contact" aria-label={`Discuss ${project.title}`}><ArrowUpRight aria-hidden="true" size={24} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="odyssey-practice" id="practice" aria-labelledby="practice-title">
        <div className="odyssey-practice-intro">
          <p>How I work</p>
          <h2 id="practice-title">A disciplined<br />way forward.</h2>
        </div>
        <ol className="odyssey-chapters">
          {chapters.map(([numeral, title, body]) => (
            <li key={numeral}>
              <p>{numeral}</p>
              <div><h3>{title}</h3><p>{body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="odyssey-contact" id="contact" aria-labelledby="contact-title">
        <p>Begin a conversation</p>
        <h2 id="contact-title">Have a project<br />worth carrying<br />home?</h2>
        <div className="odyssey-contact-links">
          <a href="https://github.com/chunghei0116" target="_blank" rel="noreferrer">Find me on GitHub <GitFork aria-hidden="true" size={20} /></a>
          <a href="mailto:hello@example.com">Send an email <Mail aria-hidden="true" size={20} /></a>
        </div>
      </section>

      <footer className="odyssey-footer">
        <p className="odyssey-footer-name">Jones Tse</p>
        <p>Product systems, considered from Hong Kong.</p>
        <a href="#top">Return to the beginning ↑</a>
      </footer>
    </main>
  );
}
