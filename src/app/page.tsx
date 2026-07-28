const projects = [
  {
    number: 'I',
    title: 'Case study one',
    type: 'Product engineering',
    note: 'Add a project title, your role, and the problem you helped solve.',
    tone: 'terracotta',
  },
  {
    number: 'II',
    title: 'Case study two',
    type: 'Platform work',
    note: 'Use this space for an experience that shows your technical depth.',
    tone: 'cobalt',
  },
  {
    number: 'III',
    title: 'Case study three',
    type: 'Creative build',
    note: 'Add something curious, collaborative, or especially well-crafted.',
    tone: 'olive',
  },
];

export default function Home() {
  return (
    <main>
      <nav className="masthead" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Home">JT</a>
        <div className="masthead__links">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="masthead__github" href="https://github.com/your-handle" target="_blank" rel="noreferrer">GitHub ↗</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="hero__eyebrow">Developer portfolio · available for considered work</p>
          <h1>Builds with<br /><span>mythic</span> intent.</h1>
          <p className="hero__intro">I make thoughtful digital products, from the first sketch to the last shipped detail.</p>
          <a className="text-link" href="#work">See selected work <span aria-hidden="true">↓</span></a>
        </div>
        <figure className="hero__art">
          <Image src="/greek-hero.svg" alt="An original Greek-inspired illustration of a messenger holding a tablet." width={760} height={950} priority />
          <figcaption>Method, not mythology: clear thinking, careful craft.</figcaption>
        </figure>
      </section>

      <section className="portfolio" id="work" aria-labelledby="work-heading">
        <header className="section-head">
          <p>Selected work</p>
          <h2 id="work-heading">A small index of things made well.</h2>
        </header>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project project--${project.tone}`} key={project.number}>
              <div className="project__topline"><span>{project.number}</span><span>{project.type}</span></div>
              <div className="project__orb" aria-hidden="true"><span /></div>
              <h3>{project.title}</h3>
              <p>{project.note}</p>
              <a href="#contact">Discuss this kind of work <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="experience" id="experience" aria-labelledby="experience-heading">
        <header className="section-head section-head--light">
          <p>Experience</p>
          <h2 id="experience-heading">A working history, ready for your chapters.</h2>
        </header>
        <div className="experience__rows">
          <article><span>Now</span><h3>Your current role</h3><p>Add your company, remit, and the kind of problems you own.</p></article>
          <article><span>Before</span><h3>Previous chapter</h3><p>Add the experience that best shows progression and collaboration.</p></article>
          <article><span>Always</span><h3>Independent work</h3><p>Use this row for contracting, open source, or a practice you maintain.</p></article>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-heading">
        <p>Let&apos;s make the next chapter</p>
        <h2 id="contact-heading">Have a project<br />worth telling?</h2>
        <div className="contact__actions">
          <a className="button" href="mailto:your@email.com">Start a conversation <span aria-hidden="true">↗</span></a>
          <a className="text-link text-link--dark" href="https://github.com/your-handle" target="_blank" rel="noreferrer">Find me on GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="footer">
        <p>Yours in craft,<br /><strong>Your Name</strong></p>
        <p>Replace the placeholders with your own work, experience, email, and GitHub handle.</p>
      </footer>
    </main>
  );
}
import Image from 'next/image';
