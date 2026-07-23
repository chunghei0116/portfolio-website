# Task 6 Brief: Howl's Magic Doorways Project Showcase

**Goal:** Create `src/components/ProjectsSection.tsx` featuring Howl's Magic Doorway 4-color magic dial selector (Green, Blue, Yellow, Black) to filter project cards presented as brass-framed polaroids.

**Files to create:**
- `src/components/ProjectsSection.tsx`

**Key Requirements & Specifications:**
- Client component (`'use client'`).
- Header: *"Howl's Magic Doorways"* with subtitle *"Select a color on the magic dial to open a new destination portal."*
- Howl's Magic Dial Selector:
  - An interactive brass color dial with 4 color positions:
    - 🟢 **Green** (`#88B04B`): Web Applications (e.g. *Calcifer's Forge*, *Valley of Wind UI*, *Apothecary API*)
    - 🔵 **Blue** (`#7EC8E3`): Mobile & Creative Tools (e.g. *Star Ocean Navigator*, *Cloudscape Canvas*)
    - 🟡 **Yellow** (`#FDE1A9`): UI/UX Experiments (e.g. *Spellbook Design System*, *Clockwork Motion*)
    - 🖤 **Black** (`#1C2833`): Mysterious Open Source Void (e.g. *Howl's Castle Engine*, *Spirit Protocol*)
  - Clicking a color rotates the dial indicator and filters the project cards grid.
- Project Cards:
  - Styled as brass-framed polaroid snapshots / magic portal doorways.
  - Image preview: `/images/magic-doorway.png` with color tinted overlay per portal.
  - Includes: Project Title, Description, Tech Stack tags (e.g. `React`, `Next.js`, `Tailwind`, `Framer Motion`), Live Demo link, and GitHub repository link (`lucide-react` icons `ExternalLink`, `Github`).
  - Hover animations: 3D tilt lift (`translate-y-[-6px]`), brass metallic glow, and portal preview zoom using Framer Motion.

**Instructions:**
1. Create `src/components/ProjectsSection.tsx`.
2. Write clean TypeScript React code adhering to Next.js 16 client component rules.
3. Test compilation with `npm run build`.
4. Commit changes with message `feat: add Howl's magic doorway projects showcase`.
