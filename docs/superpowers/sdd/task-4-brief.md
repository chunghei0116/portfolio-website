# Task 4 Brief: Hero Section with Cloudscape & Swirling Petals

**Goal:** Create `src/components/HeroSection.tsx` rendering the hero banner, character artwork, drifting clouds, and swirling wildflower petal animation layers.

**Files to create:**
- `src/components/HeroSection.tsx`

**Key Requirements & Specifications:**
- Client component (`'use client'`).
- Title: *"Welcome to My Wandering Workshop"* in warm Ghibli heading typography (`#4A3525`).
- Subtitle: *"Software Alchemist & Digital Artisan crafting whimsical web experiences."*
- Call-to-Actions (CTAs):
  - Primary button: *"Explore Doorways"* (`bg-[#88B04B]` Sage green with brass gold border `#D4AF37`, hover lift + glow).
  - Secondary button: *"Send a Message"* (`bg-[#D4AF37]/20` Brass tint with brown border `#4A3525`).
- Art Assets & Layering:
  - Background image: `/images/hero-landscape.png` (soft alpine meadow under vast blue sky).
  - Character image: `/images/hero-character.png` (hand-painted Ghibli developer sitting under a tree reading spellbook).
  - Cloudscape animation: 2 floating cloud SVG overlay layers drifting slowly across the sky using Framer Motion or `@keyframes cloud-drift`.
  - Wildflower Petals: 6-8 floating CSS petal elements (`bg-[#9B72AA]` lavender & `bg-[#FDE1A9]` gold) with randomized offsets and `@keyframes petal-swirl` / `@keyframes float` animations.
- Badges: Brass compass badge ("Howl's Moving Castle Aesthetic", "Est. 2026").

**Instructions:**
1. Create `src/components/HeroSection.tsx`.
2. Write clean TypeScript React code adhering to Next.js 16 client component rules.
3. Test compilation with `npm run build`.
4. Commit changes with message `feat: add Ghibli hero section with cloud and petal animations`.
