'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  GitFork,
  Plus,
} from 'lucide-react';
import HeroTitleEffect from './hero-title-effect';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const experience = [
  {
    period: '2025 - Present',
    company: 'AS Watson Group',
    role: 'Mobile Application Developer',
    location: 'Hong Kong',
    image: '/helmet.jpg',
    imageAlt: 'An archival illustration of an ornate ancient Greek helmet.',
    summary:
      'Building enterprise retail experiences where polished interfaces meet demanding release operations.',
    achievements: [
      'Architect and maintain Flutter applications with native Swift and Gradle bridges for high-volume consumer use.',
      'Introduced Shorebird over-the-air hotpatching, moving critical fixes from a 3–5 day store cycle to under 15 minutes.',
      'Tune rendering, memory, and background messaging so the experience stays fluid across a wide device range.',
    ],
  },
  {
    period: '2023 - 2025',
    company: 'Major Infrastructure Group',
    role: 'Programmer, DevOps & Infrastructure',
    location: 'Hong Kong',
    image: 'https://picsum.photos/seed/cloud-infrastructure/1920/1080',
    imageAlt: 'A quiet industrial structure suggesting resilient cloud infrastructure.',
    summary:
      'Created dependable delivery paths and observability foundations for production systems at infrastructure scale.',
    achievements: [
      'Engineered GitLab CI and ArgoCD workflows for repeatable multi-environment Kubernetes deployments.',
      'Managed AWS services, ingress, networking, and automated TLS renewal across production environments.',
      'Built ELK telemetry pipelines and maintained PostgreSQL and SQL Server data foundations.',
    ],
  },
];

const practices = [
  {
    title: 'Build',
    text: 'Cross-platform mobile experiences with the native depth to handle the difficult edges.',
    detail: 'Flutter, Swift, Gradle, Firebase',
    image: 'https://picsum.photos/seed/mobile-interface/1200/900',
  },
  {
    title: 'Ship',
    text: 'Delivery systems that make frequent releases predictable, observable, and recoverable.',
    detail: 'GitLab CI, ArgoCD, Shorebird, Kubernetes',
    image: 'https://picsum.photos/seed/release-pipeline/1200/900',
  },
  {
    title: 'Operate',
    text: 'Cloud foundations that stay legible when traffic, teams, and operational pressure increase.',
    detail: 'AWS, NGINX, ELK, PostgreSQL',
    image: 'https://picsum.photos/seed/observability-grid/1200/900',
  },
];

const workNotes = [
  {
    title: 'Make speed safe.',
    body: 'The best release system shortens the path to users without making recovery harder.',
  },
  {
    title: 'Design for real devices.',
    body: 'A polished interface earns its finish on the slow phone, the weak network, and the busy day.',
  },
  {
    title: 'Keep systems readable.',
    body: 'Infrastructure should explain itself clearly enough that the next engineer can act with confidence.',
  },
];

const marqueeItems = [
  'Flutter',
  'Shorebird',
  'Kubernetes',
  'AWS',
  'GitLab CI',
  'ArgoCD',
  'Firebase',
  'ELK',
];

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const [activePractice, setActivePractice] = useState(0);
  const [currentNote, setCurrentNote] = useState(0);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) {
        gsap.set('.hero-reveal, .experience-visual', {
          clearProps: 'all',
          opacity: 1,
          scale: 1,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.nav-reveal', { opacity: 0, y: -18, duration: 0.7 })
        .from(
          '.hero-reveal',
          { opacity: 0, y: 54, duration: 1.05, stagger: 0.12 },
          '-=0.25',
        );

      const media = gsap.matchMedia();

      media.add('(min-width: 900px)', () => {
        ScrollTrigger.create({
          trigger: '.experience-layout',
          start: 'top 11%',
          endTrigger: '.experience-list',
          end: 'bottom bottom-=80',
          pin: '.experience-intro',
          pinSpacing: false,
        });
      });

      gsap.utils.toArray<HTMLElement>('.experience-visual').forEach((visual) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: visual,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          })
          .fromTo(
            visual,
            { scale: 0.82, opacity: 0.35, filter: 'grayscale(1) brightness(0.55)' },
            {
              scale: 1,
              opacity: 1,
              filter: 'grayscale(0.9) brightness(0.9)',
              duration: 0.55,
              ease: 'none',
            },
          )
          .to(visual, {
            scale: 1.03,
            opacity: 0.22,
            filter: 'grayscale(1) brightness(0.45)',
            duration: 0.45,
            ease: 'none',
          });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  const moveNote = (direction: number) => {
    setCurrentNote((current) => (current + direction + workNotes.length) % workNotes.length);
  };

  return (
    <main ref={root} className="portfolio overflow-x-hidden w-full max-w-full">
      <header className="site-nav nav-reveal">
        <a className="wordmark" href="#top" aria-label="Jones Tse, return home">
          Jones Tse
        </a>
        <nav aria-label="Primary navigation">
          <a href="#experience">Experience</a>
          <a href="#practice">Practice</a>
          <a href="#contact">Contact</a>
        </nav>
        <a
          className="nav-external"
          href="https://github.com/chunghei0116"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker hero-reveal">Mobile developer / DevOps engineer / Hong Kong</p>
          <HeroTitleEffect />
          <p className="hero-lede hero-reveal">
            I build refined mobile products and the quiet infrastructure that keeps them moving.
          </p>
          <div className="hero-actions hero-reveal">
            <a className="button button-dark" href="#experience">
              View experience <ArrowDown aria-hidden="true" size={17} />
            </a>
            <a className="button button-light" href="#contact">
              Start a conversation <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i />
            </span>
          ))}
        </div>
      </div>

      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="experience-layout">
          <div className="experience-intro">
            <p className="section-kicker">Selected experience</p>
            <h2 id="experience-title">
              From interface
              <span>to infrastructure.</span>
            </h2>
            <p>
              Two disciplines, one standard: make complex systems feel considered, reliable, and
              easy to move forward.
            </p>
          </div>

          <div className="experience-list">
            {experience.map((job) => (
              <article className="experience-card" key={job.company}>
                <div
                  className="experience-visual"
                  role="img"
                  aria-label={job.imageAlt}
                  style={{ backgroundImage: `url(${job.image})` }}
                />
                <div className="experience-meta">
                  <p>{job.period}</p>
                  <p>{job.location}</p>
                </div>
                <h3>{job.company}</h3>
                <p className="experience-role">{job.role}</p>
                <p className="experience-summary">{job.summary}</p>
                <ul>
                  {job.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="capability-section" aria-labelledby="capability-title">
        <header className="capability-heading">
          <p className="section-kicker">Built across layers</p>
          <h2 id="capability-title">A release is only elegant when it keeps working after launch.</h2>
        </header>

        <div className="capability-grid grid-flow-dense">
          <article className="capability-card capability-lead">
            <p className="capability-quote">
              Mobile products built for the full release cycle.
              <span>Flutter craft, automated delivery, measured performance.</span>
            </p>
            <p className="capability-copy">
              I engineer scalable Flutter applications with thoughtful architecture, native iOS
              and Android integrations, automated CI/CD, testing, and store delivery. I tune
              rendering, startup time, memory, networking, and background work so every release
              remains fast and reliable across devices.
            </p>
          </article>
          <article className="capability-card capability-mobile">
            <p className="capability-index">DevOps</p>
            <h3>Infrastructure that ships with confidence.</h3>
            <p>
              GitHub Actions and GitLab CI pipelines, Docker images, Kubernetes, Argo CD GitOps,
              cloud infrastructure, and ELK logging and monitoring.
            </p>
          </article>
          <article className="capability-card capability-platform">
            <p className="capability-index">AI engineering</p>
            <h3>Agents that improve the loop.</h3>
            <p>
              Reusable agents, structured workflows, skills, MCP integrations, and loop
              engineering for continuous planning, implementation, verification, and improvement.
            </p>
          </article>
        </div>
      </section>

      <section className="practice-section" id="practice" aria-labelledby="practice-title">
        <header className="practice-heading">
          <p className="section-kicker">How the work moves</p>
          <h2 id="practice-title">Build. Ship. Operate.</h2>
        </header>

        <div className="practice-accordion">
          {practices.map((practice, index) => {
            const isActive = activePractice === index;

            return (
              <button
                className={`practice-panel group ${isActive ? 'is-active' : ''}`}
                key={practice.title}
                type="button"
                aria-expanded={isActive}
                onClick={() => setActivePractice(index)}
                onMouseEnter={() => setActivePractice(index)}
              >
                <span
                  className="practice-image group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `url(${practice.image})` }}
                  aria-hidden="true"
                />
                <span className="practice-shade" aria-hidden="true" />
                <span className="practice-panel-copy">
                  <span className="practice-title">
                    {practice.title}
                    <Plus aria-hidden="true" size={20} />
                  </span>
                  <span className="practice-text">{practice.text}</span>
                  <span className="practice-detail">{practice.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="notes-section" aria-labelledby="notes-title">
        <div className="note-portraits" aria-hidden="true">
          <span style={{ backgroundImage: 'url(https://picsum.photos/seed/detail-metal/400/500)' }} />
          <span style={{ backgroundImage: 'url(https://picsum.photos/seed/detail-glass/400/500)' }} />
          <span style={{ backgroundImage: 'url(https://picsum.photos/seed/detail-light/400/500)' }} />
        </div>

        <div className="note-carousel">
          <p className="section-kicker">Working notes</p>
          <h2 id="notes-title">The principles behind the output.</h2>
          <article key={currentNote} className="note-card">
            <p className="note-count">
              {String(currentNote + 1).padStart(2, '0')} / {String(workNotes.length).padStart(2, '0')}
            </p>
            <h3>{workNotes[currentNote].title}</h3>
            <p>{workNotes[currentNote].body}</p>
          </article>
          <div className="note-controls">
            <button type="button" onClick={() => moveNote(-1)} aria-label="Previous working note">
              <ArrowLeft aria-hidden="true" size={19} />
            </button>
            <button type="button" onClick={() => moveNote(1)} aria-label="Next working note">
              <ArrowRight aria-hidden="true" size={19} />
            </button>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <p className="section-kicker">Open to the right challenge</p>
        <h2 id="contact-title">
          Let&apos;s make the next
          <span>release feel effortless.</span>
        </h2>
        <a
          className="contact-link"
          href="https://github.com/chunghei0116"
          target="_blank"
          rel="noreferrer"
        >
          Start on GitHub <GitFork aria-hidden="true" size={20} />
        </a>
      </section>

      <footer className="site-footer">
        <p>Jones Tse, Hong Kong</p>
        <p>Mobile development, DevOps engineering</p>
        <a href="#top">Back to top <ArrowUpRight aria-hidden="true" size={14} /></a>
      </footer>
    </main>
  );
}
