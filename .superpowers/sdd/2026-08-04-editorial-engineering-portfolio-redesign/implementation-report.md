# Editorial engineering portfolio implementation report

## Commits

- `46e361b` - `feat: deliver editorial engineering portfolio`

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
- Crawl checks without `NEXT_PUBLIC_SITE_URL` - robots allows `/` and disallows `/_next/`; sitemap is empty; no made-up canonical or social origin is emitted. With a verified origin, canonical, absolute social image URLs, sitemap, and sitemap reference are enabled.

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
