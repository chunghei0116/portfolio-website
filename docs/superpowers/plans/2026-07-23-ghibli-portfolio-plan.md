# Howl's Moving Castle Ghibli Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Studio Ghibli inspired developer/creator portfolio website with a "Howl's Moving Castle" cloudscape, wildflower meadow, and subtle steampunk aesthetic using Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

**Architecture:** A modular client/server component structure in Next.js App Router. Global styling via `src/app/globals.css` providing custom Ghibli design tokens, floating keyframe animations, and organic SVG hand-painted container borders.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, `generate_image`.

## Global Constraints

- Primary Sky Blue: `#7EC8E3`
- Primary Sunset Gold: `#FDE1A9`
- Cloud White: `#F7F9FA`
- Brass Gold: `#D4AF37`
- Sage Green: `#88B04B`
- Wildflower Lavender: `#9B72AA`
- Dark Ink Blue: `#1C2833`
- Warm Rustic Brown: `#4A3525`
- No realistic or stock photo imagery — all visuals must be hand-painted Studio Ghibli style art cells.

---

### Task 1: Visual Art Asset Generation

**Files:**
- Create: `public/images/hero-landscape.png`
- Create: `public/images/hero-character.png`
- Create: `public/images/magic-doorway.png`
- Create: `public/images/parchment-texture.png`

**Interfaces:**
- Consumes: `generate_image` tool prompts
- Produces: PNG visual assets in `public/images/` for components to consume via `next/image` or CSS background

- [ ] **Step 1: Generate Hero Landscape image**
  Use `generate_image` with prompt: "Studio Ghibli hand-painted anime landscape background, lush alpine wildflower meadow overflowing with yellow and lavender blossoms, soft rolling hills, vast soft blue sky with fluffy cumulus clouds and distant floating castle, Hayao Miyazaki watercolor animation cell style."
  Save asset as `public/images/hero-landscape.png`.

- [ ] **Step 2: Generate Hero Character image**
  Use `generate_image` with prompt: "Studio Ghibli hand-painted anime character, young software developer holding a brass-bound leather spell book, sitting under a windblown tree on a grassy hill, warm nostalgic Miyazaki art style."
  Save asset as `public/images/hero-character.png`.

- [ ] **Step 3: Generate Magic Doorway Portal image**
  Use `generate_image` with prompt: "Studio Ghibli hand-painted magic portal doorway opening to a calm magical sea with floating sky islands and soft sunset glow, Howl's moving castle door portal style."
  Save asset as `public/images/magic-doorway.png`.

- [ ] **Step 4: Generate Parchment Texture image**
  Use `generate_image` with prompt: "High quality seamless hand-painted aged parchment paper texture, vintage paper background with soft cream and warm tan tones, Ghibli journal paper style."
  Save asset as `public/images/parchment-texture.png`.

- [ ] **Step 5: Commit assets**
  `git add public/images/`
  `git commit -m "feat: generate Studio Ghibli visual art assets"`

---

### Task 2: Ghibli Design Tokens & Global CSS Configuration

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Palette tokens & animation keyframes
- Produces: CSS utility classes (`.ghibli-parchment`, `.ghibli-brass-border`, `.ghibli-font-serif`, `@keyframes float`, `@keyframes petal-swirl`)

- [ ] **Step 1: Write CSS variables & keyframe animations in globals.css**
  Define `:root` color tokens (`--sky-blue`, `--sunset-gold`, `--brass-gold`, `--sage-green`, `--wildflower-lavender`, `--dark-ink`, `--rustic-brown`).
  Add `@keyframes float`, `@keyframes petal-swirl`, `@keyframes cloud-drift`, `@keyframes seal-press`.
  Add hand-painted irregular border utility styles and parchment card styles.

- [ ] **Step 2: Verify CSS builds cleanly**
  Run `npm run build` to confirm CSS syntax validity.

- [ ] **Step 3: Commit CSS configuration**
  `git add src/app/globals.css`
  `git commit -m "style: configure Studio Ghibli design tokens and keyframes"`

---

### Task 3: Floating Wooden Signpost Navigation Bar

**Files:**
- Create: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: Smooth scroll anchor targets (`#hero`, `#about`, `#projects`, `#skills`, `#contact`)
- Produces: Sticky/floating responsive header navigation bar

- [ ] **Step 1: Create Navbar component**
  Implement wooden signpost styling with brass chain pegs.
  Add desktop links & mobile toggle drawer with Framer Motion transitions.

- [ ] **Step 2: Commit Navbar**
  `git add src/components/Navbar.tsx`
  `git commit -m "feat: add floating signpost navbar component"`

---

### Task 4: Hero Section with Cloudscape & Swirling Petals

**Files:**
- Create: `src/components/HeroSection.tsx`

**Interfaces:**
- Consumes: `public/images/hero-landscape.png`, `public/images/hero-character.png`
- Produces: Responsive hero banner with floating clouds and swirling petal particle effect

- [ ] **Step 1: Create HeroSection component**
  Render headline "Welcome to My Wandering Workshop", subtitle, CTA buttons ("Explore Projects", "Send a Message").
  Add background landscape, character art cell, floating clouds (`@keyframes cloud-drift`), and animated CSS petal elements.

- [ ] **Step 2: Commit HeroSection**
  `git add src/components/HeroSection.tsx`
  `git commit -m "feat: add Ghibli hero section with cloud and petal animations"`

---

### Task 5: Aged Parchment About Me Section

**Files:**
- Create: `src/components/AboutSection.tsx`

**Interfaces:**
- Consumes: `public/images/parchment-texture.png`
- Produces: Interactive "Alchemist's Journal" about card with field notes tab toggle

- [ ] **Step 1: Create AboutSection component**
  Render parchment container with brass corner cap accents.
  Include story-driven bio ("The Alchemist's Journal"), core engineering values, and interactive tab toggle ("Journal Entry" / "Field Notes").

- [ ] **Step 2: Commit AboutSection**
  `git add src/components/AboutSection.tsx`
  `git commit -m "feat: add aged parchment about section"`

---

### Task 6: Howl's Magic Doorways Project Showcase

**Files:**
- Create: `src/components/ProjectsSection.tsx`

**Interfaces:**
- Consumes: Project data array, `public/images/magic-doorway.png`
- Produces: Magic Doorway color dial selector & brass polaroid project cards grid

- [ ] **Step 1: Create ProjectsSection component**
  Build 4-color magic dial (Green, Blue, Yellow, Black) to filter projects by category (Web Apps, Creative Tools, UI Experiments, Open Source).
  Render brass-framed project cards with hover tilt, portal glow, live demo link, and GitHub link.

- [ ] **Step 2: Commit ProjectsSection**
  `git add src/components/ProjectsSection.tsx`
  `git commit -m "feat: add Howl's magic doorway projects showcase"`

---

### Task 7: Skills & Magic Matrix Section

**Files:**
- Create: `src/components/SkillsSection.tsx`

**Interfaces:**
- Consumes: Technical skills data grouped by Ghibli element
- Produces: Categorized magic badge cards with hover spirit glow

- [ ] **Step 1: Create SkillsSection component**
  Group skills into 🌬️ Wind Magic (Performance), 🔨 Master Crafting (Frontend), 🧪 Digital Alchemy (Backend), 🔥 Calcifer's Ember (DevOps).
  Render interactive skill badges with proficiency indicators and Ghibli icons.

- [ ] **Step 2: Commit SkillsSection**
  `git add src/components/SkillsSection.tsx`
  `git commit -m "feat: add Ghibli themed skills magic section"`

---

### Task 8: Wax-Sealed Contact Section

**Files:**
- Create: `src/components/ContactSection.tsx`

**Interfaces:**
- Consumes: Form state & submit handler
- Produces: Interactive wax-sealed letter card & paper airplane send interaction

- [ ] **Step 1: Create ContactSection component**
  Design parchment letter card with brass border.
  Add interactive name, email, and message inputs.
  Add wax-seal press submit button with paper airplane sending success state.

- [ ] **Step 2: Commit ContactSection**
  `git add src/components/ContactSection.tsx`
  `git commit -m "feat: add wax-sealed letter contact section"`

---

### Task 9: Brass Compass Footer

**Files:**
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: Social links & copyright
- Produces: Minimal Ghibli footer with compass rose motif

- [ ] **Step 1: Create Footer component**
  Render brass compass icon, copyright message, and social links (GitHub, LinkedIn, Twitter/X).

- [ ] **Step 2: Commit Footer**
  `git add src/components/Footer.tsx`
  `git commit -m "feat: add Ghibli brass compass footer component"`

---

### Task 10: Page Assembly & Build Verification

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: All section components
- Produces: Fully functional Ghibli portfolio website

- [ ] **Step 1: Assemble components in src/app/page.tsx**
  Import Navbar, HeroSection, AboutSection, ProjectsSection, SkillsSection, ContactSection, Footer.

- [ ] **Step 2: Update Metadata in src/app/layout.tsx**
  Configure page title "Wandering Workshop | Ghibli Portfolio", meta description, and font configurations.

- [ ] **Step 3: Run build & lint checks**
  Run `npm run build` to verify clean compilation without errors.

- [ ] **Step 4: Commit final page assembly**
  `git add src/app/page.tsx src/app/layout.tsx`
  `git commit -m "feat: assemble complete Ghibli portfolio page"`
