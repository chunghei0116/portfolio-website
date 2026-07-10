"use client";

import { useState, useEffect } from "react";
import BentoCard from "./BentoCard";

interface Day {
  color: string;
  contributionCount: number;
  date: string;
}

const projects = [
  {
    title: "Project Alpha: Automation Engines",
    category: "Study 01 // DevOps Infrastructure",
    description: "Architecting high-availability infrastructure deployments. Leveraging declarative container orchestration, immutable GitOps workflows, and hermetic cloud delivery pipelines.",
    tags: ["Kubernetes", "Docker", "GitOps", "AWS"],
    repoUrl: "https://github.com/chunghei0116",
  },
  {
    title: "Project Beta: Native Crafts",
    category: "Study 02 // Cross-Platform Systems",
    description: "Designing performant native mobile applications and desktop tooling. Prioritizing memory safety, low overhead execution, and refined tactile gesture interactions.",
    tags: ["Flutter", "Dart", "Rust", "Tauri"],
    repoUrl: "https://github.com/chunghei0116",
  },
];

export default function BentoGrid() {
  const [githubCount, setGithubCount] = useState<string>("4.8K+");
  const [contributions, setContributions] = useState<Day[][]>([]);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data.count) {
          const num = Number(data.count);
          if (num >= 1000) {
            setGithubCount(`${(num / 1000).toFixed(1)}K+`);
          } else {
            setGithubCount(`${num}+`);
          }
        }
        if (Array.isArray(data.contributions)) {
          setContributions(data.contributions);
        }
      })
      .catch((err) => {
        console.error("Error fetching github count", err);
      });
  }, []);

  return (
    <section id="projects" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 scroll-mt-24 select-none">
      <div className="grid grid-cols-12 gap-8 auto-rows-min">
        
        {/* Card A: Profile Introduction (col-span-8) */}
        <BentoCard className="col-span-12 md:col-span-8 flex flex-col justify-between min-h-[260px] bg-card-bg">
          <div>
            <span className="text-sepia-mono">HUMANIST SYNOPSIS</span>
            <h3 className="font-serif italic text-3xl sm:text-4xl md:text-5xl mt-6 text-foreground/90 font-medium">
              The Union of Art and Logic
            </h3>
            <p className="font-serif text-sm md:text-base leading-relaxed text-sepia-dim mt-4 max-w-[65ch]">
              Like the classical scholars of Florence, I believe system architecture is a creative discipline. Writing robust code is the translation of geometry, rhythm, and clean structural logic into digital machines.
            </p>
          </div>
          <div className="border-t border-foreground/10 pt-4 mt-6 flex justify-between items-center text-sepia-mono text-[9px]">
            <span>DESIGN &amp; CODEX</span>
            <span>JONES TSE © 2026</span>
          </div>
        </BentoCard>

        {/* Card B: GitHub Stat (col-span-4) */}
        <BentoCard className="col-span-12 md:col-span-4 flex flex-col justify-between min-h-[260px] bg-card-bg">
          <div>
            <span className="text-sepia-mono">TELEMETRY SYSTEM</span>
            <div className="mt-8">
              <h3 className="font-serif text-5xl sm:text-6xl md:text-7xl text-accent-terracotta leading-none">
                {githubCount}
              </h3>
              <p className="font-serif italic text-sm text-sepia-dim mt-3">
                Calculated Year-to-Date commits across public and private corporate codex records.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/chunghei0116"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-widest text-accent-gold border-t border-foreground/10 pt-4 group"
          >
            <span>VIEW REPOSITORY</span>
            <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">→</span>
          </a>
        </BentoCard>

        {/* Card C: GitHub Grid (col-span-12) */}
        {contributions.length > 0 && (
          <BentoCard className="col-span-12 flex flex-col justify-between bg-card-bg overflow-hidden" disableHover>
            <div>
              <span className="text-sepia-mono">ANNAL OF CONTRIBUTIONS // 52 WEEKS</span>
              <div className="mt-6 overflow-x-auto pb-2 scrollbar-thin">
                <div className="flex gap-[3px] min-w-max">
                  {contributions.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, dIdx) => {
                        // Map contribution color to Renaissance warm colors
                        let bg = "bg-foreground/5";
                        if (day.contributionCount > 0) {
                          if (day.contributionCount < 3) bg = "bg-accent-gold/20";
                          else if (day.contributionCount < 6) bg = "bg-accent-gold/50";
                          else if (day.contributionCount < 10) bg = "bg-accent-gold/85";
                          else bg = "bg-accent-terracotta/90";
                        }
                        return (
                          <div
                            key={dIdx}
                            className={`w-[9px] h-[9px] rounded-sm transition-all duration-300 ${bg}`}
                            title={`${day.contributionCount} contributions on ${day.date}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-foreground/10 pt-4 mt-6 flex justify-between items-center text-sepia-mono text-[8px]">
              <span>TIERED TELEMETRY ACTIVE</span>
              <div className="flex items-center gap-2">
                <span>LESS</span>
                <div className="w-2.5 h-2.5 bg-foreground/5 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-accent-gold/20 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-accent-gold/50 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-accent-gold/85 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-accent-terracotta/90 rounded-sm" />
                <span>MORE</span>
              </div>
            </div>
          </BentoCard>
        )}

        {/* Project Studies (col-span-6 each) */}
        {projects.map((project, idx) => (
          <BentoCard key={idx} className="col-span-12 md:col-span-6 flex flex-col justify-between min-h-[300px] bg-card-bg">
            <div>
              <span className="text-sepia-mono">{project.category}</span>
              <h3 className="font-serif text-2xl sm:text-3xl mt-4 text-foreground/90 font-medium leading-tight">
                {project.title}
              </h3>
              <p className="font-serif text-sm leading-relaxed text-sepia-dim mt-4">
                {project.description}
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] font-bold uppercase tracking-widest text-sepia-dim bg-foreground/5 border border-foreground/5 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-widest text-accent-terracotta border-t border-foreground/10 pt-4 group"
              >
                <span>STUDY THE SOURCE</span>
                <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">→</span>
              </a>
            </div>
          </BentoCard>
        ))}

      </div>
    </section>
  );
}
