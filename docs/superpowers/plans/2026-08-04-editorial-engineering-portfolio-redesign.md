# Editorial Engineering Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the text-heavy, fragile immersive portfolio with a production-ready editorial engineering portfolio whose critical content is readable, responsive, accessible, and server-rendered.

**Architecture:** `src/app/page.tsx` becomes a Server Component that composes focused portfolio sections from typed local content. Small client islands own the mobile menu, disclosures, and optional Three.js artifact; the semantic page never depends on those islands. Styling is rebuilt around one token/base layer in `globals.css` and one clearly owned portfolio layer in `portfolio.css`.

**Tech Stack:** Next.js 16.2.1 App Router, React 19.2.4 Server and Client Components, TypeScript, Tailwind CSS 4 import pipeline, CSS Grid, `next/font`, `next/image`, Lucide React, React Three Fiber/Three.js as optional enhancement.

## Global Constraints

- Direction: Editorial Expedition with Precision Field System discipline.
- Preserve the meaning of existing content and do not invent companies, products, metrics, clients, contact channels, availability claims, or confidential details.
- Essential identity, work, capability, and contact content must be present in server-rendered HTML and visible without JavaScript.
- No `picsum.photos` or other random remote placeholder imagery.
- Body copy is at least 16px and constrained to roughly 60–72 characters per line.
- Touch targets are at least 44 by 44 CSS pixels.
- No page-level horizontal overflow at 320px, 375px, or 200% zoom.
- `prefers-reduced-motion: reduce` disables continuous motion and reveal gating.
- Read installed Next.js documentation under `node_modules/next/dist/docs/` before changing server/client boundaries, fonts, images, metadata, or Turbopack configuration.
- Do not add a canonical origin or sitemap URL unless `NEXT_PUBLIC_SITE_URL` supplies a verified absolute `http:` or `https:` origin.
- Use semicolons and single quotes in TypeScript/TSX to match the current application style.

---

## File structure

- `src/app/layout.tsx` — root fonts, metadata, viewport, and global style imports.
- `src/app/page.tsx` — server-rendered page composition and JSON-LD.
- `src/app/globals.css` — reset, tokens, base typography, focus, reduced-motion, and shared utilities only.
- `src/app/portfolio.css` — all page- and section-specific layout and component styles.
- `src/app/robots.ts` — crawl policy and optional sitemap reference.
- `src/app/sitemap.ts` — returns the root URL only when a verified site origin exists.
- `src/content/portfolio.ts` — typed, immutable portfolio content.
- `src/types/portfolio.ts` — shared content contracts.
- `src/lib/site-url.ts` — validates the optional production origin.
- `src/components/portfolio/site-nav.tsx` — server shell containing the mobile navigation client island.
- `src/components/portfolio/mobile-menu.tsx` — mobile menu state, Escape behavior, and focus restoration.
- `src/components/portfolio/hero.tsx` — semantic hero copy, actions, proof line, and artifact frame.
- `src/components/portfolio/experience-section.tsx` — work entries and disclosure islands.
- `src/components/portfolio/experience-details.tsx` — accessible client disclosure for achievements.
- `src/components/portfolio/capabilities-section.tsx` — three capability pillars.
- `src/components/portfolio/operating-model.tsx` — accessible Build/Ship/Operate client disclosure.
- `src/components/portfolio/principles-section.tsx` — static editorial working principles.
- `src/components/portfolio/contact-footer.tsx` — final CTA and footer.
- `src/app/hiking-stick-hero.tsx` — retained optional Three.js artifact, visually retuned and isolated.
- `README.md` — accurate current architecture and editing guide.
- Remove after migration: `src/app/portfolio.tsx`, `src/app/hero-title-effect.tsx`.

---

### Task 1: Typed content and server-rendered page shell

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/content/portfolio.ts`
- Create: `src/components/portfolio/site-nav.tsx`
- Create: `src/components/portfolio/hero.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `portfolioContent: PortfolioContent`.
- Produces: `SiteNav(): JSX.Element` and `Hero(): JSX.Element` Server Components.
- The content contract uses `readonly` arrays and the exact keys shown below.

- [ ] **Step 1: Define the content contracts**

```ts
export interface ExperienceItem {
  readonly period: string;
  readonly company: string;
  readonly role: string;
  readonly location: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly achievements: readonly string[];
}

export interface CapabilityItem {
  readonly index: string;
  readonly title: string;
  readonly summary: string;
  readonly tools: readonly string[];
}

export interface PracticeItem {
  readonly title: 'Build' | 'Ship' | 'Operate';
  readonly summary: string;
  readonly detail: string;
  readonly tools: readonly string[];
}

export interface PrincipleItem {
  readonly title: string;
  readonly body: string;
}

export interface PortfolioContent {
  readonly experience: readonly ExperienceItem[];
  readonly capabilities: readonly CapabilityItem[];
  readonly practices: readonly PracticeItem[];
  readonly principles: readonly PrincipleItem[];
}
```

- [ ] **Step 2: Move and edit existing content into `portfolioContent`**

Use the existing two experience records and existing claims as the source. Map `/helmet.jpg` to AS Watson Group and `/devops-hero.png` to Major Infrastructure Group. Use these tags without adding claims: `Flutter`, `Swift`, `Gradle`, `Shorebird` for the first record and `GitLab CI`, `Argo CD`, `Kubernetes`, `AWS`, `ELK` for the second. Preserve the three existing working-note titles and bodies. Derive the three capability pillars only from the existing capability copy.

```ts
import type { PortfolioContent } from '@/types/portfolio';

export const portfolioContent = {
  experience: [
    {
      period: '2025 - Present',
      company: 'AS Watson Group',
      role: 'Mobile Application Developer',
      location: 'Hong Kong',
      image: '/helmet.jpg',
      imageAlt: 'An archival illustration of an ornate ancient Greek helmet.',
      summary: 'Building enterprise retail experiences where polished interfaces meet demanding release operations.',
      tags: ['Flutter', 'Swift', 'Gradle', 'Shorebird'],
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
      image: '/devops-hero.png',
      imageAlt: 'An abstract technical landscape representing cloud infrastructure and delivery systems.',
      summary: 'Created dependable delivery paths and observability foundations for production systems at infrastructure scale.',
      tags: ['GitLab CI', 'Argo CD', 'Kubernetes', 'AWS', 'ELK'],
      achievements: [
        'Engineered GitLab CI and ArgoCD workflows for repeatable multi-environment Kubernetes deployments.',
        'Managed AWS services, ingress, networking, and automated TLS renewal across production environments.',
        'Built ELK telemetry pipelines and maintained PostgreSQL and SQL Server data foundations.',
      ],
    },
  ],
  capabilities: [
    {
      index: '01',
      title: 'Mobile products',
      summary: 'Scalable Flutter applications with thoughtful architecture, native integrations, testing, and measured performance.',
      tools: ['Flutter', 'Swift', 'Gradle', 'Firebase'],
    },
    {
      index: '02',
      title: 'Delivery systems',
      summary: 'Automated release paths that make frequent changes predictable, observable, and recoverable.',
      tools: ['GitHub Actions', 'GitLab CI', 'Argo CD', 'Shorebird'],
    },
    {
      index: '03',
      title: 'Cloud operations',
      summary: 'Cloud foundations and telemetry that remain legible under traffic, team, and operational pressure.',
      tools: ['AWS', 'Kubernetes', 'NGINX', 'ELK', 'PostgreSQL'],
    },
  ],
  practices: [
    {
      title: 'Build',
      summary: 'Cross-platform mobile experiences with the native depth to handle the difficult edges.',
      detail: 'Architecture, native bridges, testing, performance, and behavior across real devices.',
      tools: ['Flutter', 'Swift', 'Gradle', 'Firebase'],
    },
    {
      title: 'Ship',
      summary: 'Delivery systems that make frequent releases predictable, observable, and recoverable.',
      detail: 'Repeatable pipelines, staged delivery, hotpatching, and deployment confidence.',
      tools: ['GitLab CI', 'Argo CD', 'Shorebird', 'Kubernetes'],
    },
    {
      title: 'Operate',
      summary: 'Cloud foundations that stay legible when traffic, teams, and operational pressure increase.',
      detail: 'Infrastructure, ingress, telemetry, databases, and clear operational feedback.',
      tools: ['AWS', 'NGINX', 'ELK', 'PostgreSQL'],
    },
  ],
  principles: [
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
  ],
} as const satisfies PortfolioContent;
```

- [ ] **Step 3: Build the semantic navigation and hero shell**

The hero H1 must be plain HTML text with natural wrapping. Use this copy:

```tsx
<h1>Mobile products, engineered to keep moving.</h1>
<p>
  I design and build refined Flutter experiences—and the delivery systems,
  cloud foundations, and operational tooling that keep every release dependable.
</p>
```

Use `#work`, `#practice`, and `#contact` anchors. Keep the GitHub URL `https://github.com/chunghei0116`. Include `<a className="skip-link" href="#main-content">Skip to content</a>` before the header.

- [ ] **Step 4: Compose the initial Server Component page**

```tsx
import Hero from '@/components/portfolio/hero';
import SiteNav from '@/components/portfolio/site-nav';

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Verify the server shell**

Run: `npm run lint`

Expected: exit code 0; no client directive in `page.tsx`, `site-nav.tsx`, or `hero.tsx`; exactly one H1.

- [ ] **Step 6: Commit the content and shell**

```bash
git add src/types/portfolio.ts src/content/portfolio.ts src/components/portfolio/site-nav.tsx src/components/portfolio/hero.tsx src/app/page.tsx
git commit -m "refactor: establish editorial portfolio shell"
```

---

### Task 2: Authoritative visual system, responsive navigation, and artifact

**Files:**
- Replace: `tokens.css`
- Replace: `src/app/globals.css`
- Create: `src/app/portfolio.css`
- Modify: `src/app/layout.tsx`
- Create: `src/components/portfolio/mobile-menu.tsx`
- Modify: `src/components/portfolio/site-nav.tsx`
- Modify: `src/components/portfolio/hero.tsx`
- Modify: `src/app/hiking-stick-hero.tsx`

**Interfaces:**
- Produces CSS variables `--paper`, `--paper-deep`, `--ink`, `--muted`, `--line`, `--moss`, `--rust`, `--focus`, `--font-display`, `--font-sans`, `--font-mono`, `--page-width`, `--gutter`, and `--ease-out`.
- Produces `MobileMenu(): JSX.Element` with `aria-controls="mobile-navigation"`.
- `Hero` renders the artifact inside `.hero-artifact` after semantic copy in DOM order.

- [ ] **Step 1: Replace the token system with exact values**

```css
:root {
  --paper: #f3f0e8;
  --paper-deep: #e5dfd2;
  --surface: #ebe6dc;
  --ink: #1b1d1a;
  --muted: #62675f;
  --line: rgb(27 29 26 / 0.16);
  --line-strong: rgb(27 29 26 / 0.34);
  --moss: #46584b;
  --rust: #8a4f35;
  --focus: #1f5944;
  --page-width: 90rem;
  --gutter: clamp(1.125rem, 4vw, 4.5rem);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

- [ ] **Step 2: Rebuild global CSS as reset/base/utilities only**

Include the Tailwind import, token import, box sizing, body defaults, selection, focus-visible, skip-link behavior, `.sr-only`, and global reduced-motion override. Do not carry forward section selectors, purple/acid colors, duplicated selectors, or scroll-trigger opacity defaults.

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Configure fonts and import both global style owners**

Retain the existing `Bodoni_Moda` display font via `next/font/google`, rename its variable to `--font-display`, and use a system sans/mono stack in tokens to avoid adding another network-fetched family. Import `globals.css` and `portfolio.css` from `layout.tsx`.

- [ ] **Step 4: Implement the mobile menu client island**

```tsx
'use client';

export default function MobileMenu() {
  // State controls one button and one panel.
  // Escape closes the panel and restores focus to the trigger.
  // Clicking any navigation link closes the panel.
  // The trigger exposes aria-expanded and aria-controls.
}
```

Use a visually clear `Menu`/`X` icon from Lucide. The desktop navigation remains server-rendered and CSS hides the correct variant at the `48rem` breakpoint.

- [ ] **Step 5: Implement the editorial hero layout**

At `min-width: 64rem`, use a 12-column grid with copy spanning 7 columns and the artifact spanning 5. Below `48rem`, stack copy then artifact. Use `clamp(3.25rem, 8vw, 8.75rem)` with line-height no tighter than `0.9`; never use `white-space: nowrap`. Reserve an artifact aspect ratio and keep the canvas inside it.

- [ ] **Step 6: Retune the Three.js artifact as optional enhancement**

Keep the current stick geometry and disposal behavior. Change materials/lights to walnut, graphite, muted moss, and warm silver. Use `dpr={[1, 1.35]}`. Keep `frameloop="demand"` for reduced motion. Add visibility/intersection handling so the continuous loop runs only when visible; if that cannot be implemented without destabilizing the component, render the existing static reference image below `48rem` and keep the canvas desktop-only.

- [ ] **Step 7: Verify layout and interaction source invariants**

Run:

```bash
npm run lint
rg -n "white-space:\s*nowrap|picsum\.photos|hero-reveal" src tokens.css
```

Expected: lint exits 0; `rg` produces no matches in the redesigned source.

- [ ] **Step 8: Commit the visual foundation**

```bash
git add tokens.css src/app/globals.css src/app/portfolio.css src/app/layout.tsx src/app/hiking-stick-hero.tsx src/components/portfolio/mobile-menu.tsx src/components/portfolio/site-nav.tsx src/components/portfolio/hero.tsx
git commit -m "feat: build responsive editorial hero"
```

---

### Task 3: Experience and capability hierarchy

**Files:**
- Create: `src/components/portfolio/experience-details.tsx`
- Create: `src/components/portfolio/experience-section.tsx`
- Create: `src/components/portfolio/capabilities-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/portfolio.css`

**Interfaces:**
- `ExperienceSection({ items }: { items: readonly ExperienceItem[] }): JSX.Element`.
- `ExperienceDetails({ achievements, company }: { achievements: readonly string[]; company: string }): JSX.Element`.
- `CapabilitiesSection({ items }: { items: readonly CapabilityItem[] }): JSX.Element`.

- [ ] **Step 1: Implement the experience disclosure client island**

```tsx
'use client';

export default function ExperienceDetails({ achievements, company }: Props) {
  // Button label toggles between “Read contribution details” and “Hide contribution details”.
  // aria-expanded mirrors state and aria-controls points to a stable useId-based region.
  // The region remains in DOM and uses hidden={!open}.
}
```

- [ ] **Step 2: Implement experience cards with local images**

Use `next/image` with explicit `sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 42vw"`. Render metadata, company, role, summary, tag list, and the disclosure. AS Watson uses `/helmet.jpg`; Major Infrastructure Group uses `/devops-hero.png`. Keep image aspect ratio stable and do not use CSS background images for meaningful experience artwork.

- [ ] **Step 3: Implement the three capability pillars**

Render an ordered `01`, `02`, `03` system with one short paragraph and a comma-separated tool line per pillar. Use CSS Grid with one column below `48rem` and an asymmetric 5/7 composition above `64rem` rather than three equal cards.

- [ ] **Step 4: Add both sections to the server page**

```tsx
<ExperienceSection items={portfolioContent.experience} />
<CapabilitiesSection items={portfolioContent.capabilities} />
```

Place experience in `<section id="work" aria-labelledby="work-title">` and capabilities immediately after it.

- [ ] **Step 5: Verify content and media**

Run:

```bash
npm run lint
rg -n "picsum\.photos|backgroundImage" src/components/portfolio src/content
```

Expected: lint exits 0; no random remote image or meaningful-image background usage.

- [ ] **Step 6: Commit experience and capability sections**

```bash
git add src/components/portfolio/experience-details.tsx src/components/portfolio/experience-section.tsx src/components/portfolio/capabilities-section.tsx src/app/page.tsx src/app/portfolio.css
git commit -m "feat: add scannable experience and capabilities"
```

---

### Task 4: Operating model, principles, and contact completion

**Files:**
- Create: `src/components/portfolio/operating-model.tsx`
- Create: `src/components/portfolio/principles-section.tsx`
- Create: `src/components/portfolio/contact-footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/portfolio.css`
- Remove: `src/app/portfolio.tsx`
- Remove: `src/app/hero-title-effect.tsx`

**Interfaces:**
- `OperatingModel({ items }: { items: readonly PracticeItem[] }): JSX.Element` client component.
- `PrinciplesSection({ items }: { items: readonly PrincipleItem[] }): JSX.Element` Server Component.
- `ContactFooter(): JSX.Element` Server Component.

- [ ] **Step 1: Implement Build/Ship/Operate as an accessible disclosure group**

All three titles and summaries are visible without interaction. Each row has a button whose `aria-expanded` state controls a stable associated detail region. On desktop, the active row may change its adjacent visual field; on mobile the details remain in normal document flow. Click and keyboard behavior govern state; hover must not be the only activation path.

- [ ] **Step 2: Implement principles as a static editorial sequence**

Render all three existing principles as numbered articles. Use a single-column list below `48rem`; above it, use a CSS scroll-snap row only if all text remains keyboard reachable and no JavaScript is needed. Never auto-advance.

- [ ] **Step 3: Implement the contact close**

Use the heading `Let’s make the next release feel effortless.` with one GitHub CTA to the verified existing profile. Add a compact footer containing `Jones Tse`, `Hong Kong`, `Mobile development`, and `DevOps engineering`, plus a back-to-top link.

- [ ] **Step 4: Complete the page composition and remove obsolete monoliths**

```tsx
<OperatingModel items={portfolioContent.practices} />
<PrinciplesSection items={portfolioContent.principles} />
<ContactFooter />
```

Delete `portfolio.tsx` and `hero-title-effect.tsx` after no imports reference them. Keep `hiking-stick-hero.tsx` as the only Three.js section enhancement.

- [ ] **Step 5: Verify the complete source hierarchy**

Run:

```bash
npm run lint
rg -n "picsum\.photos|hero-title-effect|from './portfolio'|from \"./portfolio\"" src
```

Expected: lint exits 0; `rg` returns no matches.

- [ ] **Step 6: Commit the completed reading experience**

```bash
git add -A src/app src/components/portfolio src/content src/types
git commit -m "feat: complete editorial portfolio narrative"
```

---

### Task 5: Metadata, structured data, crawl files, configuration, and documentation

**Files:**
- Create: `src/lib/site-url.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `next.config.ts`
- Replace: `README.md`

**Interfaces:**
- `getSiteUrl(): URL | null` returns a URL only for a valid absolute `http:` or `https:` `NEXT_PUBLIC_SITE_URL`.
- Metadata must not emit a made-up canonical URL.
- JSON-LD uses `Person` and `WebSite` types, includes only verified identity/profile facts, and is escaped with `.replace(/</g, '\\u003c')` before `dangerouslySetInnerHTML`.

- [ ] **Step 1: Implement verified-origin parsing**

```ts
export function getSiteUrl(): URL | null {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Complete static metadata**

Use title `Jones Tse — Mobile Developer & DevOps Engineer` and the existing verified description. Configure title template, authors, creator, category, robots, and Open Graph/Twitter text. Set `metadataBase`, alternates canonical, and absolute social URLs only when `getSiteUrl()` returns a URL.

- [ ] **Step 3: Add crawl files that behave without an invented origin**

`robots.ts` always allows `/` and disallows `/_next/`; include a sitemap URL only when a site URL exists. `sitemap.ts` returns an empty array without a site URL and otherwise returns the root with `changeFrequency: 'monthly'` and `priority: 1`.

- [ ] **Step 4: Add verified JSON-LD to the server page**

Include `name: 'Jones Tse'`, `jobTitle: ['Mobile Application Developer', 'DevOps Engineer']`, `homeLocation` with `name: 'Hong Kong'`, and `sameAs: ['https://github.com/chunghei0116']`. Include the site URL only when verified. Do not add employer ownership, email, or social profiles not already verified.

- [ ] **Step 5: Fix the Turbopack root warning using the installed Next.js 16 API**

```ts
import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
```

If `process.cwd()` is not stable under the project build command, use `path.resolve(__dirname)` only after confirming TypeScript module support in the installed config runtime.

- [ ] **Step 6: Replace README with accurate project guidance**

Document the current stack, `npm run dev`, `npm run lint`, and `npm run build`; explain section components, `src/content/portfolio.ts`, local asset requirements, `NEXT_PUBLIC_SITE_URL`, reduced-motion behavior, and the rule against invented/remote placeholder content.

- [ ] **Step 7: Verify production files**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit 0; the earlier multi-lockfile root warning is absent; no metadata or sitemap build error occurs without `NEXT_PUBLIC_SITE_URL`.

- [ ] **Step 8: Commit production readiness**

```bash
git add src/lib/site-url.ts src/app/robots.ts src/app/sitemap.ts src/app/layout.tsx src/app/page.tsx next.config.ts README.md
git commit -m "feat: prepare portfolio for production discovery"
```

---

### Task 6: Responsive, accessibility, runtime, and final quality verification

**Files:**
- Modify as findings require: `src/app/globals.css`
- Modify as findings require: `src/app/portfolio.css`
- Modify as findings require: `src/components/portfolio/*.tsx`
- Modify as findings require: `src/app/hiking-stick-hero.tsx`

**Interfaces:**
- Produces a clean lint/build and screenshot evidence at the required viewport matrix.
- No new visual direction or content claims are authorized in this task.

- [ ] **Step 1: Run fresh static and production verification**

```bash
npm run lint
npm run build
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 2: Run the production server and inspect the actual page**

Run `npm run start` after the build on an available local port. Verify the initial HTML contains the H1 and primary `#work` action. Inspect the browser console for hydration, WebGL, image, and accessibility errors.

- [ ] **Step 3: Verify the viewport matrix**

Capture or inspect 320, 375, 768, 1024, 1440, and 1920 CSS pixel widths. At each width verify:

```text
- no horizontal page overflow
- H1 and primary action are visible and naturally wrapped
- navigation is usable without clipping
- body text is at least 16px and line length remains readable
- local images preserve aspect ratio without layout shift
- all buttons and links remain at least 44px in the touch layout
```

- [ ] **Step 4: Verify keyboard and motion behavior**

Keyboard through skip link, navigation, mobile menu, every experience disclosure, every operating-model disclosure, GitHub CTA, and back-to-top link. Verify Escape closes the mobile menu and returns focus. Emulate `prefers-reduced-motion: reduce` and confirm there is no continuous canvas or CSS motion.

- [ ] **Step 5: Run content and source hygiene checks**

```bash
rg -n "picsum\.photos|TODO|TBD|white-space:\s*nowrap|hero-reveal|#8b7cff|#b9ff72" src tokens.css README.md
git status --short
```

Expected: no prohibited pattern matches; status contains only intentional final verification fixes.

- [ ] **Step 6: Fix verified findings and re-run the full gate**

For each visual/runtime issue, make the smallest in-scope change. Then re-run `npm run lint`, `npm run build`, `git diff --check`, the affected viewport screenshots, keyboard flow, and reduced-motion check.

- [ ] **Step 7: Commit final quality fixes if any**

```bash
git add -A
git commit -m "fix: close portfolio quality gaps"
```

Skip this commit only when Task 6 produces no file changes.
