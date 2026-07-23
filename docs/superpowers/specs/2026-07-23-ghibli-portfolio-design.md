# Design Specification: Howl's Moving Castle Ghibli Portfolio Website

## 1. Overview & Vision
A developer/creator portfolio website designed with a Studio Ghibli art style inspired by *Howl's Moving Castle* (Cloudscapes, Wildflower Meadows, and subtle Steampunk aesthetics). Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## 2. Visual Theme & Design System
- **Background**: Soft gradient from vast alpine sky blue (`#7EC8E3`) into warm sunset gold (`#FDE1A9`) and cloud white (`#F7F9FA`).
- **Color Palette**:
  - Sky Blue: `#7EC8E3`
  - Sunset Gold: `#FDE1A9`
  - Cloud White: `#F7F9FA`
  - Brass Gold: `#D4AF37`
  - Sage Green: `#88B04B`
  - Wildflower Lavender: `#9B72AA`
  - Dark Ink Blue: `#1C2833`
  - Warm Rustic Brown: `#4A3525`
- **Textures & Borders**: Aged parchment textures, brass metallic corner caps, organic SVG border outlines, warm drop shadows, and hand-painted Ghibli artwork.

## 3. Architecture & Components

### `Navbar` (`src/components/Navbar.tsx`)
- Floating signpost bar suspended by brass chain motifs.
- Smooth scrolling links to `#hero`, `#about`, `#projects`, `#skills`, `#contact`.
- Active section highlight and mobile signpost drawer.

### `HeroSection` (`src/components/HeroSection.tsx`)
- Title: "Welcome to My Wandering Workshop".
- Subtitle: "Software Alchemist & Digital Artisan crafting whimsical web experiences."
- Hand-painted Ghibli character and meadow illustration.
- Floating CSS/Framer Motion layers: drifting clouds and swirling wildflower petals.

### `AboutSection` (`src/components/AboutSection.tsx`)
- Styled as an aged parchment journal card with brass corner details ("The Alchemist's Journal").
- Interactive "Field Notes" tab toggle with vintage stamp badges.

### `ProjectsSection` (`src/components/ProjectsSection.tsx`)
- Howl's Magic Doorway interactive 4-color magic dial selector (Green, Blue, Yellow, Black) for project filtering.
- Grid of project cards styled as brass-framed polaroids/magic doorway portals.
- Hover tilt and brass glow effects.

### `SkillsSection` (`src/components/SkillsSection.tsx`)
- Categorized Ghibli element magic matrix:
  - 🌬️ Wind Magic (Performance & Web Vitals)
  - 🔨 Master Crafting (Frontend: React, Next.js, Tailwind, TypeScript)
  - 🧪 Digital Alchemy (Backend: Node.js, APIs, Databases)
  - 🔥 Calcifer's Ember (DevOps, Cloud, CI/CD)
- Custom badges with hover glow and spirit indicators.

### `ContactSection` (`src/components/ContactSection.tsx`)
- Styled as a wax-sealed letter card ("Send a Flying Message").
- Dark ink input styling on parchment background.
- Interactive wax-seal button and paper airplane flying state.

### `Footer` (`src/components/Footer.tsx`)
- Minimalist Ghibli brass compass design, copyright notice, social links (GitHub, LinkedIn, Twitter/X).

## 4. Art Assets Generation Strategy
Custom Studio Ghibli hand-painted artwork will be generated using `generate_image` tool and saved in `public/images/`:
- `public/images/hero-landscape.jpg`
- `public/images/hero-character.jpg`
- `public/images/magic-doorway.jpg`
- `public/images/parchment-texture.jpg`

## 5. Technical Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React Icons
