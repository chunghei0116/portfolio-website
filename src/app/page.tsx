import { ArrowDownRight, ArrowUpRight, GitFork, Mail } from 'lucide-react';
import { HeroCanvas } from '../components/hero-canvas';

const projects = [
  { title: 'Signal / Field', type: 'Product direction', note: 'Turning difficult systems into calm, legible tools for people who need them to work.', className: 'project--lead' },
  { title: 'Soft Infrastructure', type: 'Platform work', note: 'A considered interface layer for dense operational work.', className: 'project--blue' },
  { title: 'Useful Oddities', type: 'Experiments', note: 'Small, sharp explorations in interaction, language, and motion.', className: 'project--light' },
];

const chapters = [
  ['Now', 'Building the systems behind an excellent experience.', 'Product-minded engineering across the web stack, from the first model to the final interaction.'],
  ['Previously', 'Making complex work feel near-effortless.', 'A practice shaped by collaboration, close listening, and a refusal to leave rough edges unexamined.'],
  ['Always', 'Keeping a playground for curious ideas.', 'Independent tools and experiments where new visual languages can earn their keep.'],
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="nav-wrap" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Home">JT</a>
        <div className="nav-links"><a href="#work">Work</a><a href="#practice">Practice</a><a href="#contact">Contact</a></div>
        <a className="nav-contact" href="mailto:hello@example.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker">Independent product engineer</p>
          <h1>Digital work with a <span className="inline-orb" aria-hidden="true" /> human pull.</h1>
          <p className="hero-intro">I shape product experiences that make dense ideas feel immediate, useful, and a little more alive.</p>
          <div className="hero-actions"><a className="button button--light" href="#work">See selected work <ArrowDownRight size={17} /></a><a className="underlink" href="#contact">Start a conversation</a></div>
        </div>
        <div className="canvas-frame" aria-label="An interactive three-dimensional sculpture. Move your pointer to influence it."><HeroCanvas /><span className="canvas-note">Move through the field</span></div>
      </section>

      <div className="marquee" aria-hidden="true"><div>Product thinking <i>•</i> System design <i>•</i> Creative engineering <i>•</i> Product thinking <i>•</i> System design <i>•</i> Creative engineering <i>•</i></div></div>

      <section className="work-section" id="work">
        <header className="section-intro"><p className="kicker">Selected projects</p><h2>Work that pulls its weight — and leaves a mark.</h2></header>
        <div className="project-grid">
          {projects.map((project) => <article className={`project-card ${project.className}`} key={project.title}><span>{project.type}</span><div><h3>{project.title}</h3><p>{project.note}</p></div><a href="#contact" aria-label={`Discuss ${project.title}`}><ArrowUpRight size={24} /></a></article>)}
        </div>
      </section>

      <section className="practice-section" id="practice">
        <div className="practice-title"><p className="kicker">How I work</p><h2>Clarity takes craft.</h2></div>
        <div className="chapter-list">{chapters.map(([time, title, body], index) => <article className="chapter" key={time}><span>0{index + 1} / {time}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="contact-section" id="contact"><p className="kicker">An open invitation</p><h2>Have a project<br />with gravity?</h2><a className="contact-link" href="mailto:hello@example.com">hello@example.com <ArrowUpRight /></a></section>

      <footer><p>Made with care, from Hong Kong.</p><div><a href="https://github.com/your-handle" target="_blank" rel="noreferrer"><GitFork size={15} /> GitHub</a><a href="mailto:hello@example.com"><Mail size={15} /> Email</a></div></footer>
    </main>
  );
}
