# Instructions for AI coding agents

This repo is Krillion's personal portfolio: a retro pixel-art, ocean-arcade themed static site (plain HTML, CSS and minimal JS, deployable on GitHub Pages) unless the owner says otherwise.

**Before writing or changing any UI, art, copy or content:**
1. Read `STYLE_GUIDE.md` in full and look at `assets/reference-scene.png`. Match that retro look.
2. Import `tokens.css` on every page. Use its CSS variables and the `.glitch`, `.pixel-box`, `.btn`, `.bob`, `.rise`, `.blink` patterns. Do not hardcode colors, fonts, spacing or radii.
3. Use the logo files in `/assets/` exactly as supplied. Pixel art must be scaled by whole numbers with `image-rendering: pixelated`.
4. Create any new decorative art as pixel art (inline SVG with `shape-rendering="crispEdges"` or canvas) using only palette colors.
5. Write all copy in the voice defined under "Voice and tone". No lorem ipsum.
6. Reuse one shared header and footer across all pages.

**Retro, but usable:** paragraphs always use Inter; Press Start 2P only for short headings; VT323 for UI labels. Animations use `steps()` and respect `prefers-reduced-motion`.

**Quality bar:** responsive from 360px up, dark and light mode, WCAG AA contrast, semantic HTML, keyboard accessible, no console errors, Lighthouse accessibility 95+.

**When something isn't covered,** choose what is closest to the spirit (16-bit, deep ocean, playful but clear) and mention the decision in your summary so the owner can update the guide.

**Placeholders to replace:** owner name, tagline, social links, project content, final logo. Mark invented placeholders with `<!-- TODO(owner) -->`.
