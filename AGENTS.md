# Instructions for AI coding agents

This repo is Krillion's portfolio: ONE retro pixel-art page (plain HTML, CSS, minimal JS, GitHub Pages). The intro is a boat sitting on top of the water; pressing BEGIN DESCENT or scrolling takes you down through darkening water tiers, past sea creatures, to the seabed, with a depth ruler fixed on the right edge.

**Before writing or changing anything:**
1. Read `STYLE_GUIDE.md` in full, especially "The one-page descent" and "Intro". Study `assets/reference-homepage.png` (hero) and `assets/reference-tiers.png` (full descent). Match their look.
2. Build a single `index.html` (plus `styles.css` and `script.js` if needed). No framework, no router, no extra pages.
3. The logo is the krill in `assets/krillion-mark.svg` (and `krillion-logo.svg` with wordmark). Never redraw or recolor it. Use the mark as favicon and depth-meter marker.
3b. Import `tokens.css`. Use its variables and classes (`.zone--*`, `.hero`, `.dither`, `.rays`, `.depth-meter*`, `.glitch--outline`, `.subtitle`, `.btn-primary`, `.btn-small`, `.label-mono`, `.pixel-box`, `.bob`, `.drift`, `.swim`, `.rise`, `.blink`, `.scanlines`). Never hardcode colors, fonts, spacing or radii.
4. Load `depth.js` at the end of the body and include the `[data-depth-meter]` markup from the style guide.
5. Use the sprites in `/assets/` as supplied (whole-number scaling, `image-rendering: pixelated`). Place creatures per the tier table, decoratively and with `aria-hidden="true"`. Draw any extra art as pixel-art SVG in palette colors.
6. All paragraphs go inside `.pixel-box` panels. Keep content clear of the meter on the right.
7. Write copy in the voice from the style guide. Do not reuse game-specific text from the reference images. No lorem ipsum.

**Sections in order:** Surface (hero), Shallows (About), Twilight (Projects), Midnight (Skills and writing), Seabed (Contact and footer).

**Quality bar:** responsive from 360px up, WCAG AA contrast, semantic HTML, keyboard accessible, `prefers-reduced-motion` respected, stepped animations only, sound off by default, no console errors, Lighthouse accessibility 95+.

**When something isn't covered,** pick what best fits the spirit (16-bit, deep ocean, playful but clear) and mention the choice in your summary.

**Placeholders to replace:** owner name, role, tagline, social links, project content, final logo. Mark invented placeholders with `<!-- TODO(owner) -->`.
