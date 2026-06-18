# Resume Card Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the career timeline cards into a Brutalist Coordinate Grid layout (Option A) and update description copy.

**Architecture:** Replace the custom vertical line and circular nodes timeline with a structured coordinate grid data-table system. Consistently update the data array and layouts in both the homepage career timeline and the about page experience card.

**Tech Stack:** Next.js 16, React, TailwindCSS, TypeScript.

---

### Task 1: Redesign TechSection.tsx Timeline UI and Copy

**Files:**
- Modify: `src/components/ui/TechSection.tsx`

- [ ] **Step 1: Replace history data array and timeline HTML block**
Update the data array with the new professional copy, and swap the timeline vertical line rendering block for a brutalist coordinate grid layout.

Replace `const history` and the timeline list block in [TechSection.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/components/ui/TechSection.tsx) with:

```tsx
const history = [
  {
    year: "2025 — PRESENT",
    role: "MOBILE APPLICATION DEVELOPER",
    company: "AS Watson Group",
    desc: "Lead Flutter developer responsible for the 1M+ active user CRM application in Hong Kong. Engineered high-availability client architectures and optimized core module load times."
  },
  {
    year: "2023 — 2025",
    role: "PROGRAMMER",
    company: "Asia Allied Infrastructure Group",
    desc: "Architected secure procurement portals, internal staff platforms, and managed enterprise-grade app store deployments. Set up GitLab/ArgoCD pipelines and EKS container administration."
  },
  {
    year: "2021",
    role: "SUMMER INTERN",
    company: "EMSD HKSAR",
    desc: "Collaborated with senior System Analysts to patch, debug, and develop new public-facing features on government municipal websites."
  }
];
```

And update the render JSX for the timeline:

```tsx
            {/* Brutalist Coordinate Grid Timeline */}
            <div className="flex flex-col border-t-2 border-black divide-y-2 divide-black/10 mt-6">
              {history.map((node) => (
                <div key={node.year} className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Metadata Coordinate block */}
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-2.5 min-w-[150px]">
                    <span className="font-mono text-[11px] font-black uppercase tracking-wider bg-accent-blue text-white border-2 border-black px-2.5 py-1.5 shadow-[2px_2px_0px_#000000] select-none">
                      [ {node.year} ]
                    </span>
                  </div>

                  {/* Right Content Block */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans font-[950] text-xl text-foreground tracking-tight uppercase">
                        {node.role}
                      </span>
                      <span className="text-black/30 font-mono text-xs font-bold select-none">&mdash;&gt;</span>
                      <span className="font-mono text-xs font-black text-accent-blue uppercase tracking-widest">
                        {node.company}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/80 font-semibold mt-2.5 max-w-2xl">
                      {node.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
```

- [ ] **Step 2: Commit changes**
Run:
```bash
git add src/components/ui/TechSection.tsx
git commit -m "style: redesign homepage TechSection to use Option A Brutalist Grid layout and updated copy"
```

---

### Task 2: Redesign about/page.tsx Timeline UI and Copy

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Replace experience timeline grid on About page**
Modify the timeline layout inside the about page card to match the Coordinate Grid.

Replace the `TIMELINE // WORK RECORD` block in [page.tsx](file:///Users/jones.tse/development/personal/portfolio-website/src/app/about/page.tsx) with:

```tsx
        {/* Timeline / Experience */}
        <BentoCard className="col-span-1 md:col-span-3 min-h-[300px]">
          <h3 className="text-2xl font-[950] uppercase mb-4 border-b-2 border-black pb-2">
            TIMELINE // WORK RECORD
          </h3>
          <div className="flex flex-col divide-y-2 divide-black/10">
            <div className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-black text-white border border-black px-2 py-1 select-none">
                  [ 2025 — PRES ]
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-black text-sm uppercase text-black">Mobile Application Developer</h4>
                  <span className="text-black/30 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-bold text-accent-blue uppercase">AS Watson Group</span>
                </div>
                <p className="mt-2 text-xs font-bold leading-relaxed text-moss-shadow">
                  Lead Flutter developer responsible for the 1M+ active user CRM application in Hong Kong. Engineered high-availability client architectures and optimized core module load times.
                </p>
              </div>
            </div>

            <div className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-accent-blue text-white border border-black px-2 py-1 select-none">
                  [ 2023 — 2025 ]
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-black text-sm uppercase text-black">Programmer</h4>
                  <span className="text-black/30 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-bold text-accent-blue uppercase">Asia Allied Infrastructure Group</span>
                </div>
                <p className="mt-2 text-xs font-bold leading-relaxed text-moss-shadow">
                  Architected secure procurement portals, internal staff platforms, and managed enterprise-grade app store deployments. Set up GitLab/ArgoCD pipelines and EKS container administration.
                </p>
              </div>
            </div>

            <div className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="min-w-[150px]">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-white text-black border border-black px-2 py-1 select-none">
                  [ 2021 ]
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-black text-sm uppercase text-black">Summer Intern</h4>
                  <span className="text-black/30 font-mono text-xs select-none">&mdash;&gt;</span>
                  <span className="font-mono text-xs font-bold text-accent-blue uppercase">EMSD HKSAR</span>
                </div>
                <p className="mt-2 text-xs font-bold leading-relaxed text-moss-shadow">
                  Collaborated with senior System Analysts to patch, debug, and develop new public-facing features on government municipal websites.
                </p>
              </div>
            </div>
          </div>
        </BentoCard>
```

- [ ] **Step 2: Commit changes**
Run:
```bash
git add src/app/about/page.tsx
git commit -m "style: align About page timeline card UI with Brutalist Grid layout and updated copy"
```

---

### Task 3: Validate Build Compilation

- [ ] **Step 1: Run TypeScript compiler**
Run: `npx tsc --noEmit`
Expected: Return code 0 (success) with no type errors.
