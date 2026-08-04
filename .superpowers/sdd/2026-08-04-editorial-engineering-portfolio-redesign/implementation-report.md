# Editorial engineering portfolio implementation report

## Commits

- `46e361b` - `feat: deliver editorial engineering portfolio`
- `9b4fba5` - `docs: record editorial portfolio verification`
- `b579533` - `chore: include editorial infrastructure asset`
- `76e41e7` - `docs: list final editorial portfolio commits`
- `10c7849` - `fix: contain mobile hero headline`
- `56b31fd` - `fix: close final portfolio review findings`

The pre-existing `public/infrastructure-editorial.png` asset was preserved and staged with the implementation after final integration direction confirmed it as an intentional production asset.

## Implementation

- Replaced the monolithic client page with a server-rendered `page.tsx` composition and typed immutable content in `src/content/portfolio.ts` and `src/types/portfolio.ts`.
- Added focused server sections for navigation, hero, experience, capabilities, principles, and contact/footer.
- Added isolated client leaves for the mobile menu, experience contribution disclosures, and Build/Ship/Operate details.
- Rebuilt `globals.css` and `portfolio.css` around a light print-emulating paper, ink, slate, and moss token system. Removed the obsolete dark, purple, acid, marquee, hero reveal, and remote-placeholder generations.
- Kept the hiking-stick enhancement optional. The local reference image is server-visible first; Three.js is gated by viewport, Save-Data, device constraints, WebGL support, reduced motion, and intersection visibility.
- Added verified-origin parsing, conditional canonical/social metadata, JSON-LD for Jones Tse and the website, `robots.ts`, `sitemap.ts`, and the deliberate Turbopack root configuration.
- Removed `src/app/portfolio.tsx` and `src/app/hero-title-effect.tsx` after migration.
- Refreshed the README with the current stack, architecture, content editing rules, local asset requirements, and environment behavior.

## Verification

- `npm run lint` - passed.
- `npm run build` - passed. Routes generated: `/`, `/robots.txt`, `/sitemap.xml`, and `/_not-found`. The prior multi-lockfile Turbopack root warning did not recur.
- `git diff --check` - passed.
- Source hygiene scans for `picsum.photos`, `white-space: nowrap`, `hero-reveal`, obsolete purple/acid tokens, `backgroundImage`, em dash, and en dash characters - no matches in redesigned source, tokens, or README.
- Production HTML inspection - H1, primary work action, navigation, experience records, capabilities, practice summaries, principles, contact, and JSON-LD appear before JavaScript. Images use local optimized paths with explicit dimensions and responsive `sizes`.
- Browser-use production check with `npm run start -- -p 3010` - no page overflow at 320, 375, 768, 1024, 1440, or 1920 CSS pixels. Desktop H1 measured at two lines at 1024, 1440, and 1920; primary action was in the initial viewport. Mobile stacked copy and artifact without clipping.
- Browser interaction check - mobile menu opens with `aria-expanded`, focuses the first link, closes on Escape, restores trigger focus, and closes on link activation. Experience and practice disclosures update `aria-expanded`, `aria-controls`, and `hidden` state.
- Crawl checks without `NEXT_PUBLIC_SITE_URL` - robots allows the public site without blocking framework assets; sitemap is empty; no made-up canonical or social origin is emitted. With a verified origin, canonical, absolute social image URLs, sitemap, and sitemap reference are enabled.

## Design pre-flight audit

- Design read: developer portfolio for recruiters, hiring managers, and technical leaders, with calm editorial engineering language.
- Dials: DESIGN_VARIANCE 6, MOTION_INTENSITY 3, VISUAL_DENSITY 3.
- Theme lock: light only, matching the approved print-emulating direction.
- Accent lock: moss is the only interface accent. Rust is tokenized only for natural material use and is not used in controls or focus states.
- Typography uses Bodoni Moda through `next/font` for display and system sans/mono stacks for body and metadata. Body copy is 16px or larger with readable max widths.
- One icon family is used: installed Lucide React. Interactive targets use 44px minimum heights.
- No visible em dash or en dash characters. No random remote imagery, fake screenshots, invented contact channels, metrics, employers, or claims.
- Critical semantic content is server-rendered. Three.js remains a progressive visual enhancement and is hidden for small or constrained contexts.

## Concerns

- `public/infrastructure-editorial.png` is an intentional generated production asset and is included in the implementation commit.
- Lighthouse and a full assistive-technology audit were not available in this worktree session. Static and rendered keyboard checks passed; a final integration environment can run Lighthouse if required.
- Social image and canonical metadata intentionally remain absent when `NEXT_PUBLIC_SITE_URL` is unset to avoid inventing an origin. Set that variable only with a verified absolute production URL.

## Round 1 visual verification follow-up

- Finding: the mobile hero H1 could exceed its narrow column because its `ch` max width was wider than the available viewport, and page-level clipping masked the overrun.
- Fix: at the mobile breakpoint, the H1 now uses `width: 100%` and `max-width: 100%` with normal word-boundary wrapping. Desktop sizing and the two-line composition are unchanged. No body copy sizing or global overflow suppression changed.
- Verification: `npm run lint`, `npm run build`, and `git diff --check` passed after the focused CSS change.

## Final Sol review follow-up

- Removed the `/_next/` robots disallow so the generated crawl policy permits the framework assets required by the public page.
- Replaced the deprecated `next/image` `priority` prop with `preload` for the above-fold local artifact image.
- Removed global `overflow-x: clip`; the hiking-stick artifact keeps local `overflow: hidden` containment.
- Wrapped operating-model disclosure controls in semantic `h3` headings without changing their `aria-expanded`, `aria-controls`, or `hidden` behavior.
- Removed unused `@gsap/react` and `gsap` dependencies from `package.json` and `package-lock.json`.
- Moved Three/R3F/model code to `hiking-stick-canvas.tsx` and dynamically imports it from the client hero only after desktop, connection, hardware, and WebGL eligibility. The static image remains in the prerendered root HTML, and the production output emits the Three code in a separate chunk that is not part of the initial script tags.

## Final Sol verification

- `npm run lint` - passed.
- `npm run build` - passed. Routes generated: `/`, `/robots.txt`, `/sitemap.xml`, and `/_not-found`.
- `git diff --check` - passed.
- Production output inspection confirmed `hiking-stick-reference.png` in `.next/server/app/index.html`, no initial script tag for the Three chunk, and a separate `0ajo5.e5su-l-.js` chunk containing the Three/R3F model symbols.
- Targeted Sol re-review of `10c7849..56b31fd` found no unresolved Critical, Important, or Minor issues and returned Ready to merge: Yes.
- Parent re-ran lint, production build, and diff integrity checks after the review fixes. Real 390x844 and 320x720 CSS viewport checks showed document width equal to viewport width, with the headline and primary CTA contained in the initial viewport.
