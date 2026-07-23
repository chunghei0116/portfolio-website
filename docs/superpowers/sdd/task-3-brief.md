# Task 3 Brief: Floating Wooden Signpost Navigation Bar

**Goal:** Create a suspended wooden/brass signpost style navigation bar in `src/components/Navbar.tsx` with smooth scroll links and a mobile toggle menu.

**Files to create:**
- `src/components/Navbar.tsx`

**Key Requirements & Specifications:**
- Client component (`'use client'`).
- Aesthetic: Minimalist wooden signpost floating near top of screen suspended by subtle brass chain motifs (`#D4AF37`). Aged wood texture background with rounded organic edges (`bg-[#4A3525]/90` backdrop blur, text `#FDE1A9`).
- Navigation Links: `[Home] (#hero)`, `[About] (#about)`, `[Projects] (#projects)`, `[Skills] (#skills)`, `[Contact] (#contact)`.
- Interactive Behavior:
  - Active section highlight (scroll listener updating active state).
  - Hover states: Signpost labels lift slightly (`translate-y-[-2px]`), subtle brass glow (`#D4AF37`).
  - Mobile menu toggle: Wooden signpost drawer opening on mobile devices with smooth Framer Motion animations.
- Icons: Use `Compass`, `Feather`, `Sparkles`, `Scroll`, `Send`, `Menu`, `X` from `lucide-react`.

**Instructions:**
1. Create `src/components/Navbar.tsx`.
2. Write clean TypeScript React code adhering to Next.js 16 client component rules.
3. Test compilation with `npm run build`.
4. Commit changes with message `feat: add floating signpost navbar component`.
