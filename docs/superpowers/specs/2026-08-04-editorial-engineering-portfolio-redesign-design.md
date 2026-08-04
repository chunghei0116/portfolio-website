# Editorial Engineering Portfolio Redesign

- **Date:** 2026-08-04
- **Status:** Approved
- **Direction:** Editorial Expedition with Precision Field System discipline

## Purpose

Redesign Jones Tse's portfolio into a modern, production-ready reading experience that communicates mobile engineering and DevOps depth without presenting every detail at once. The site should feel authored, calm, credible, and technically precise. Its personality comes from editorial typography, disciplined composition, and one restrained hiking-stick artifact rather than constant effects.

## Current problems

- The hero's main message can become effectively invisible on desktop and clips horizontally on mobile.
- The mobile navigation overflows rather than adapting to a small viewport.
- Long sections compete at similar visual weight, producing reading fatigue and an unclear path through the page.
- Animation and WebGL can gate or obscure essential content.
- Remote placeholder imagery weakens credibility and makes the portfolio feel unfinished.
- `src/app/portfolio.tsx` mixes content, layout, interaction, and animation in one large client component.
- `src/app/globals.css` contains overlapping generations of theme rules, making the cascade difficult to reason about.
- Metadata and README content no longer fully describe the current application.

## Experience principles

1. **Identity before spectacle.** Name, role, value proposition, and primary action are visible on the first server-rendered frame.
2. **Proof before detail.** Readers see concise outcomes, dates, roles, and capabilities before choosing to expand supporting detail.
3. **One reading path.** The sequence is identity, proof, selected experience, capabilities, operating model, principles, and contact.
4. **Motion is optional.** Motion enhances orientation but never controls access to content.
5. **Real assets only.** Use intentional local artwork or abstract locally generated treatments; no random remote image services.
6. **Design restraint signals seniority.** Typography, spacing, contrast, and interaction quality carry the visual identity.

## Information architecture

### Navigation

- Brand link returns to the page top.
- Primary links: Work, Practice, Contact.
- GitHub remains a secondary external action.
- Desktop uses an inline navigation bar.
- Mobile uses the brand plus an accessible menu button and a dismissible menu panel.
- Add a skip link before navigation.

### Hero

- A short eyebrow identifies Jones as a mobile developer and DevOps engineer in Hong Kong.
- One H1 communicates that he builds refined mobile products and the systems that keep them shipping.
- One supporting sentence provides context.
- Primary action moves to selected work; secondary action moves to contact.
- A compact proof strip presents key domains such as Flutter, delivery systems, and cloud operations.
- The hiking stick is framed as a quiet field artifact on desktop and follows the copy on mobile. It must never overlap essential text.

### Selected experience

- Each experience entry exposes company, role, period, location, one outcome-led summary, and compact contribution tags.
- Up to three deeper achievements remain available through an accessible disclosure.
- Do not invent clients, products, metrics, or confidential details.
- Replace all remote placeholders with deterministic local visuals or typographic art panels.

### Capabilities

- Present three pillars: Mobile Products, Delivery Systems, and Cloud Operations.
- Each pillar contains a short statement and a compact technology line.
- AI workflow engineering may appear as a supporting practice, not as a competing fourth identity.

### Operating model

- Preserve Build, Ship, Operate.
- All three short summaries remain visible at once.
- Deeper detail opens through real buttons with associated regions and `aria-expanded`.
- Hover may preview a panel on pointer devices, but click and keyboard behavior remain authoritative.

### Working principles

- Present the existing principles as a readable editorial list on mobile.
- Larger screens may use a manually controlled snap rail.
- Do not auto-advance or hide text behind timing.

### Contact and footer

- End with one dominant invitation to start a conversation.
- GitHub remains available as a secondary channel.
- Do not add an email address, LinkedIn profile, availability claim, or downloadable résumé unless a verified value already exists in the repository.

## Visual system

- Palette: warm paper or mineral-tinted neutral surfaces, near-black ink, restrained moss or oxidized-rust accent, and one cool slate family for secondary information.
- Avoid purple/blue AI gradients, glassmorphism, neon glows, and abrupt unrelated dark sections.
- Typography: an editorial display face for major headings, a highly readable sans-serif for body text, and restrained mono metadata. Use locally available or `next/font`-supported fonts with valid loading behavior.
- Body copy is at least 16px, uses comfortable line height, and is constrained to roughly 60–72 characters.
- Layout uses a maximum-width editorial grid, asymmetry where it supports hierarchy, and an 8px-based spacing rhythm.
- Headlines wrap naturally with `text-wrap: balance`; paragraphs use `text-wrap: pretty` where supported.
- Decorative surfaces use subtle grain and tonal contrast rather than generic shadows or repeated rounded cards.
- Touch targets are at least 44 by 44 CSS pixels.

## Responsive behavior

- Validate at 320, 375, 768, 1024, 1440, and 1920 CSS pixels plus 200% browser zoom.
- No page-level horizontal overflow at any supported width.
- Mobile navigation does not expose an off-screen inline link row.
- The hero is stacked on mobile, with text first and artifact second in a reserved aspect-ratio frame.
- At wider sizes the hero uses an approximate 7/5 text-to-art split.
- Experience and capability layouts move from one column to intentional asymmetric grids only when reading widths remain comfortable.
- Use `min-height: 100svh` only for the hero when its content fits naturally; never use viewport height to create empty scroll distance.
- Avoid `white-space: nowrap` on primary copy and avoid clipping as a responsive strategy.

## Accessibility and motion

- Use semantic landmarks, one H1, ordered headings, a skip link, visible focus states, and meaningful link/button labels.
- The mobile menu supports Escape, focus restoration, and correct `aria-expanded`/`aria-controls` state.
- Disclosures use buttons and associated regions; decorative canvas content is hidden from assistive technology.
- Meaningful images have useful alt text; abstract decorative images use empty alt text or CSS backgrounds with no false semantics.
- Meet WCAG AA contrast for text and controls.
- Critical content is visible before JavaScript and without animation.
- `prefers-reduced-motion: reduce` disables continuous motion, animated scrolling, staggered reveals, and canvas motion.
- Save-Data, missing WebGL, small screens, or constrained devices receive a static artifact treatment.
- If Three.js remains, cap DPR, pause when offscreen or hidden, and dispose resources on unmount.

## Architecture

- Keep `src/app/page.tsx` server-rendered and compose server components by default.
- Move portfolio content into `src/content/portfolio.ts` with explicit TypeScript contracts.
- Split sections into focused components under `src/components/portfolio/`.
- Limit client components to the mobile menu, disclosures, manual carousel controls, and optional artifact enhancement.
- Consolidate global styling into a single token/base system plus clearly owned section styles. Remove obsolete selector generations instead of stacking overrides.
- Read the installed Next.js 16 documentation under `node_modules/next/dist/docs/` before changing metadata, images, fonts, or client boundaries.

## Production readiness

- Add complete title/description, canonical metadata when a verified production URL exists, Open Graph/Twitter data, icons, `robots.ts`, `sitemap.ts`, and Person/WebSite JSON-LD without inventing an origin.
- Use local optimized images with explicit dimensions and responsive `sizes`.
- Keep semantic hero content outside any dynamically loaded Three.js bundle.
- Reserve media dimensions to prevent layout shift.
- Refresh README with the actual stack, architecture, scripts, and content/asset editing guidance.
- Configure the Next.js project root deliberately if the existing multi-lockfile warning is reproducible and supported by the installed documentation.

## Verification and acceptance criteria

- `npm run lint` exits successfully.
- `npm run build` exits successfully with no hydration errors.
- H1 and primary action appear in the initial HTML and remain visible in the first viewport.
- Navigation, menu, disclosures, and manual controls work by keyboard.
- Reduced-motion mode contains no continuous motion.
- There is no horizontal overflow at 320px or 200% zoom.
- No random remote placeholders, broken links, missing meaningful alt text, or invented claims remain.
- `globals.css` has one authoritative token/base system and no duplicated theme generation.
- The production page has no runtime console errors.
- Target Lighthouse scores on a representative production mobile profile: Performance 90+, Accessibility 95+, Best Practices 95+, and SEO 95+.
- Core Web Vitals targets: LCP under 2.5 seconds, CLS under 0.1, and INP under 200 milliseconds under representative conditions.
