# Task 8 Brief: Wax-Sealed Contact Section

**Goal:** Create `src/components/ContactSection.tsx` styled as a wax-sealed letter card ("Send a Flying Message") with interactive inputs and a paper airplane sending animation state.

**Files to create:**
- `src/components/ContactSection.tsx`

**Key Requirements & Specifications:**
- Client component (`'use client'`).
- Header: *"Send a Flying Message"* with subhead *"Dispatch a letter to the Wandering Workshop. A spirit will deliver it shortly."*
- Card Styling: Aged parchment envelope / letter card (`.ghibli-parchment`), brass trim, and rustic ink typography.
- Form Inputs:
  - *"Your Name / Realm"* (`<input>` with dark ink border, placeholder: "e.g., Howl Jenkins").
  - *"Your Magic Mail / Email"* (`<input>` with dark ink border, placeholder: "e.g., howl@wandering-castle.io").
  - *"Your Message / Dispatch"* (`<textarea>` with dark ink border, 4 rows, placeholder: "Describe your project or magical quest...").
- Interactive Action Button:
  - Styled as a wax seal press button (`bg-[#9B72AA]` Wildflower Lavender / `#D4AF37` Brass Gold, with a circular wax stamp icon).
  - Submit state: Pressing the button triggers a paper airplane / flying letter animation (`@keyframes float`, envelope folding/flying upwards) and displays a success notification: *"Message dispatched on the wind! Thank you for reaching out."*
- Contact Info Badges: Location badge ("Wandering Castle, Cloud Realm"), Direct Email link, Availability status indicator ("Open for new endeavors & collaborations").

**Instructions:**
1. Create `src/components/ContactSection.tsx`.
2. Write clean TypeScript React code adhering to Next.js 16 client component rules.
3. Test compilation with `npm run build`.
4. Commit changes with message `feat: add wax-sealed letter contact section`.
