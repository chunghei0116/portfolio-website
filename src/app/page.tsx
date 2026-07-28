import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, GitFork } from 'lucide-react';

const focusAreas = [
  { title: 'Product engineering', body: 'Frontend systems that make complex products feel direct, fast, and understandable.' },
  { title: 'Cloud and DevOps', body: 'Deployment workflows, platform foundations, and operational practices built for reliable change.' },
  { title: 'Technical direction', body: 'Clear decisions across product, design, and infrastructure when the work needs one accountable view.' },
];

const workingPrinciples = [
  ['Make the path clear', 'Start from the user, the team, and the constraint that matters most.'],
  ['Automate the repeatable', 'Build delivery and operations around reliable systems, not heroic manual effort.'],
  ['Keep the system legible', 'Leave behind code, interfaces, and documentation that make the next decision easier.'],
];

export default function Home() {
  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <a className="site-mark" href="#top" aria-label="Jones Tse home">JT</a>
        <nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#approach">Approach</a><a href="#contact">Contact</a></nav>
        <a className="header-github" href="https://github.com/chunghei0116" target="_blank" rel="noreferrer">GitHub <GitFork aria-hidden="true" size={16} /></a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Developer and DevOps engineer</p>
          <h1 id="hero-title">BUILD CALM<br />SYSTEMS.</h1>
          <p className="hero-lede">I design, build, and run reliable digital products for teams that need software to hold up under real work.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">View work <ArrowDownRight aria-hidden="true" size={17} /></a><a className="text-link" href="#contact">Contact me <ArrowUpRight aria-hidden="true" size={17} /></a></div>
        </div>
        <figure className="hero-visual"><Image src="/devops-hero.png" alt="A brushed metal server rack in a quiet architectural space." fill priority sizes="(min-width: 900px) 48vw, 100vw" /></figure>
      </section>

      <section className="intro-section" aria-labelledby="intro-title"><h2 id="intro-title">Technical work should feel steady, not dramatic.</h2><p>I work where product engineering and operational discipline meet. The goal is simple: useful software, reliable delivery, and systems people can trust.</p></section>

      <section className="focus-section" id="work" aria-labelledby="focus-title">
        <div className="section-heading"><p className="eyebrow">What I do</p><h2 id="focus-title">From product surface<br />to platform foundation.</h2></div>
        <div className="focus-grid">{focusAreas.map((area, index) => <article className={`focus-card focus-card-${index + 1}`} key={area.title}><h3>{area.title}</h3><p>{area.body}</p></article>)}</div>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title">
        <div className="section-heading"><h2 id="approach-title">A practical way<br />to move work forward.</h2></div>
        <div className="principle-list">{workingPrinciples.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><p className="eyebrow">Available for the right challenge</p><h2 id="contact-title">Let&apos;s make the<br />next release easier.</h2><a className="button button-primary" href="https://github.com/chunghei0116" target="_blank" rel="noreferrer">Start on GitHub <GitFork aria-hidden="true" size={17} /></a></section>
      <footer className="site-footer"><p>Jones Tse</p><a href="https://github.com/chunghei0116" target="_blank" rel="noreferrer">github.com/chunghei0116</a></footer>
    </main>
  );
}
