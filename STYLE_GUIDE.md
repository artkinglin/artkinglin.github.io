# Krillion Style Guide (machine-readable summary)

Full human-readable version: `Krillion_Style_Guide.docx`. If they disagree, ask the owner; do not guess.
Tokens and reusable patterns live in `tokens.css`. Always import and use them; never hardcode values.
Visual reference: `assets/reference-scene.png` (the Krillion title screen). Match its look and mood.

## Brand in one line
Krillion: a retro pixel-art ocean arcade. A tiny pink krill swimming through 16-bit deep blue water, with a glitchy RGB-split title. Many small things adding up to something big.

## Retro direction (16-bit era, early-90s arcade and handheld feel)
- Chunky pixels, square corners, hard offset shadows, limited palette, stepped (frame-by-frame) animation.
- Retro is the *style*, not an excuse for bad usability: body text stays clean, readable and accessible.
- Game flavor lives in microcopy and decoration. Navigation and project info stay literal and clear.

## Colors (dark "deep sea" is default)
| Token | Hex | Use |
|---|---|---|
| `--abyss` | #000E2F | Page background, outlines, hard shadows |
| `--trench` | #001840 | Cards, header, footer |
| `--deep` | #043E75 | Borders, panels, hover surfaces |
| `--ocean` | #0078B8 | Mid-water blue: illustrations, secondary buttons, accent shadow |
| `--surf` | #0AC9F6 | Links, focus rings, key water accent |
| `--shallows` | #6EE5FA | Light highlights, hover text |
| `--foam` | #DAF5FA | Primary text |
| `--sun` | #F9FDDC | Rare bright highlight (sun, sparkles) |
| `--krill-pink` | #FF8FB1 | Primary accent: CTAs, the one thing to look at |
| `--glitch-magenta` / `--glitch-cyan` | #FF2E88 / #00E5FF | ONLY the RGB-split text offset on titles |
| `--brine` | #8FB8D0 | Secondary text |

Proportion: ~65% abyss/trench/deep, ~25% foam text, ~10% accents (pink rarest). Glitch colors never fill UI.
Daylight (light) mode: bg #DAF5FA, surface #FFFFFF, text/border #001840, accent #C41E64, accent-2 #005997 (see tokens.css). Support both.
Illustrations: use only palette colors, flat fills, optional 2-3 step dithering. No smooth gradients, blur or soft shadows.

## Typography
- **Press Start 2P** (`--font-display`): H1-H3, big numbers, logo-style moments. UPPERCASE, line-height 1.4, short text only (about 6 words max per heading). Never for paragraphs.
- **VT323** (`--font-ui`): nav, buttons, tags, labels, dates, footer fine print. Uppercase for buttons, min 1.125rem.
- **Inter** (`--font-body`): all paragraphs and long text. 1.0625rem, line-height 1.65, max 70ch.
- Glitch effect (`.glitch`) on the hero H1 only, and at most one other title per page.

## Layout
- Max content width 1120px. 8px grid, 4px "game pixel" (`--px`). Mobile-first; breakpoints 640 / 960 / 1280px.
- Section spacing 96px desktop, 48px mobile. Sections can be framed like game "levels" with a pixel divider.
- Square corners everywhere (`--radius: 0`). Borders 4px. Shadows are hard offsets (`--shadow-hard`), never blurred.
- Pixel art must use `image-rendering: pixelated` and be scaled by whole numbers (2x, 3x, 4x).

## Header
Sticky, `--trench` solid background, 4px bottom border in `--deep`. Left: logo lockup. Right: nav in VT323 uppercase (About, Projects, Writing, Contact) plus one pink `.btn` CTA ("Hire me" or "Contact"). Active link: pink underline made of 4px blocks. Under 640px: a "MENU" button opens a full-screen pixel-framed overlay.

## Footer
`--trench` background, 4px top border in `--deep`. Zones: mark + one-line tagline; nav; socials (GitHub, LinkedIn, email). Bottom row in VT323, `--brine`: "© {year} {Name}. Built with care. Press Start to begin again." Optional decoration: a pixel seabed strip with a tiny swaying kelp sprite.

## Components
- **Primary button** `.btn`: pink fill, abyss text, 4px abyss border, blue hard shadow; hover lifts 2px; active "presses" down. **Secondary:** transparent, 4px surf border, surf text.
- **Cards** `.pixel-box`: trench fill, 4px deep border, hard shadow. Hover: border to surf and lift 2px.
- **Tags:** VT323, uppercase, 2px border, square. **Progress/skill bars:** segmented pixel blocks like a health bar.
- **Project card:** pixel cover art or screenshot (pixelated frame), title in Press Start 2P (H3), one-sentence outcome, 3-5 tags, links "VIEW PROJECT" and "SOURCE".
- **Focus:** always 4px `--accent-2` outline with 4px offset.

## Imagery and graphics
Pixel-art underwater scenes: sun and pixel clouds at top, boat silhouette on the waterline, water darkening toward the bottom, rock and coral silhouettes, bubbles, small fish, and the pink krill as mascot. Screenshots get a 4px border and hard shadow. Icons: 16x16 or 24x24 pixel icons, flat palette colors.

## Motion (stepped, never smooth)
Use `steps()` timing only: 2-frame bob on the mascot, rising bubbles, blinking "PRESS START" prompt, optional typewriter effect on the hero line. No easing curves, no parallax blur. Always honor `prefers-reduced-motion`.

## Voice and tone
Playful, upbeat, a little nerdy; clear first, cute second. First person ("I built"). Short sentences, plain words, active voice. Game microcopy is welcome in small doses: "PRESS START", "LEVEL 01: Projects", "SAVE POINT" (contact), "HIGH SCORES" (results), "Game over? Try again." for errors.
- Do: "I build small tools that make big workflows calmer."
- Don't: "Passionate synergy-driven full-stack ninja delivering world-class solutions."
- Project blurbs: problem, then what I did, then result. Lead with outcome and real numbers.
- One game or ocean pun per page at most; never in project descriptions. Avoid: passionate, leverage, cutting-edge, rockstar, ninja. No emoji in body copy; no exclamation spam.

## Accessibility (non-negotiable)
WCAG AA contrast, semantic landmarks, alt text on all images (decorative pixel art gets empty alt), keyboard navigable, visible focus, no information by color alone, reduced motion respected, no flashing faster than 3 times per second. Press Start 2P text never smaller than 14px.

## Always
- Use tokens and patterns from `tokens.css`. Support dark and light mode. Responsive from 360px.
- Reuse the same header, footer, button and card patterns on every page.
- Keep pixel art crisp (whole-number scaling, `image-rendering: pixelated`).

## Never
- No rounded corners, blurred shadows, smooth gradients, glassmorphism or soft glows.
- No pure black (#000) or pure white as dark-mode background/text. No colors outside the palette.
- No paragraphs in Press Start 2P or VT323. No more than one glitch title area in view.
- Never stretch, recolor or smooth the logo or pixel art. No generic stock photos.
- No filler copy or lorem ipsum in final output.

## Logo
Files: `assets/krillion-logo.svg` (lockup: pixel krill + RGB-split pixel wordmark), `assets/krillion-mark.svg` (krill sprite only). Built from square pixels on a grid; keep `shape-rendering: crispEdges`. Clear space = 2 logo pixels x 4 on all sides. Minimum size: lockup 160px wide, mark 32px high. Use on abyss, trench or deep backgrounds (on light backgrounds, place on an abyss panel). Placeholder art: replace with final logo, keeping filenames.
