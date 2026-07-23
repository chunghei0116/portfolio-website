# Task 2 Brief: Ghibli Design Tokens & Global CSS Configuration

**Goal:** Configure global Ghibli design tokens, floating animations, custom scrollbars, and hand-painted SVG/CSS border utilities in `src/app/globals.css`.

**Files to modify:**
- `src/app/globals.css`

**Design Tokens to include:**
- Palette CSS variables:
  - `--sky-blue: #7EC8E3`
  - `--sunset-gold: #FDE1A9`
  - `--cloud-white: #F7F9FA`
  - `--brass-gold: #D4AF37`
  - `--sage-green: #88B04B`
  - `--wildflower-lavender: #9B72AA`
  - `--dark-ink: #1C2833`
  - `--rustic-brown: #4A3525`
- Fonts:
  - Configure Google Fonts imports or fallback serif fonts for Ghibli headings (`Playfair Display`, `Cinzel`, `Georgia`, `serif`) and clean body text (`Inter`, `sans-serif`).

- Keyframe Animations:
  - `@keyframes float`: gentle 3-second vertical floating movement for cards and badges.
  - `@keyframes cloud-drift`: slow 45-second horizontal cloud movement across background.
  - `@keyframes petal-swirl`: diagonal swirling motion for wildflower petals.
  - `@keyframes brass-glow`: subtle pulsing metallic highlight effect.
  - `@keyframes wax-seal-press`: stamp press scale animation.

- Custom Utilities & Classes:
  - `.ghibli-bg-gradient`: Sky blue fading into sunset gold & cloud white.
  - `.ghibli-parchment`: Aged paper background container with texture overlay, soft rounded corners, warm ink text (`#1C2833`), and subtle shadow.
  - `.ghibli-brass-card`: Metallic brass border glow with rustic brown outline.
  - `.ghibli-heading`: Styled serif heading with rustic brown color and warm text shadow.
  - `.ghibli-scrollbar`: Styled thin brass/scroll track.

**Instructions:**
1. Update `src/app/globals.css` with these exact design tokens and CSS animations.
2. Test building using `npm run build` or CSS compilation check.
3. Commit changes with message `style: configure Studio Ghibli design tokens and keyframes`.
