# Jones Tse portfolio

An editorial engineering portfolio for Jones Tse, a Hong Kong mobile developer and DevOps engineer. The page keeps the essential story in server-rendered HTML, then adds small client islands for navigation and progressive disclosure.

## Stack

- Next.js 16.2.1 App Router with React Server Components
- React 19 and TypeScript
- Tailwind CSS 4 import pipeline with native CSS layout tokens
- Lucide React for the single icon family
- Three.js and React Three Fiber for the optional hiking-stick artifact

## Development

Install dependencies and start the local server:

```bash
npm ci
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm run start
```

## Architecture

- `src/app/page.tsx` is the server-rendered page composition and JSON-LD entry point.
- `src/content/portfolio.ts` is the only source for experience, capability, practice, and principle copy.
- `src/types/portfolio.ts` defines the immutable content contracts.
- `src/components/portfolio/` contains focused section components. `mobile-menu.tsx`, `experience-details.tsx`, and `operating-model.tsx` are the interactive client leaves.
- `src/app/globals.css` owns reset, tokens, focus behavior, and reduced-motion defaults.
- `src/app/portfolio.css` owns the editorial page layout and responsive section styles.
- `src/app/hiking-stick-hero.tsx` renders a static local reference first and enhances it with Three.js only when the device and viewport support it.

## Editing content and assets

Edit verified claims in `src/content/portfolio.ts`. Experience images live in `public/` and must have explicit dimensions, useful alt text, and a stable aspect ratio in their component. Do not add random remote placeholders, invented employers, metrics, contact channels, or confidential details.

`NEXT_PUBLIC_SITE_URL` is optional. Set it to a verified absolute `http:` or `https:` origin to enable canonical metadata, absolute social image URLs, the sitemap, and the sitemap reference in `robots.txt`. Without it, the site remains valid and does not invent an origin.

The page is intentionally light and print-emulating. Reduced-motion preferences disable transitions and continuous artifact motion while leaving all content available. The hiking-stick image remains the static fallback for small screens, Save-Data connections, constrained devices, and missing WebGL.
