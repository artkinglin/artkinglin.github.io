# Krillion Style Guide (machine-readable summary)

Full human-readable version: `Krillion_Style_Guide.docx`. If they disagree, ask the owner; do not guess.
Tokens and patterns: `tokens.css`. Depth meter logic: `depth.js`.
**Visual references (match these):** `assets/reference-homepage.png` (the intro/hero) and `assets/reference-tiers.png` (the full descent and its creatures). Also `assets/reference-scene.png` (early title-screen art).
Always import and use the tokens; never hardcode values.

## Brand in one line
Krillion: a retro pixel-art ocean dive. ONE page. Start on a boat at the surface, press BEGIN DESCENT, scroll down through ever-darker water, past creatures, to the seabed, with a depth ruler on the side.

## The one-page descent
One scrolling `index.html`. No other pages. Sections are depth tiers; the water darkens in pixel bands and a depth ruler on the right edge tracks meters.

| Tier | Depth | Section | Water | Creatures and scenery |
|---|---|---|---|---|
| Surface | 0 M | Intro (hero) | pale sky, waterline `--water-0`/`--water-1` | boat, sun, clouds, wavy waterline, tiny krill under the boat |
| Sunlit shallows | 50 M | About | `--water-2` #0379BC | light rays, bubbles, cyan fish, a school of tiny dark fish (`fish-tiny`) |
| Twilight | 300 M | Projects ("Level select") | `--water-3` #014180 | jellyfish, a big red krill drifting across, school of tiny fish |
| Midnight | 1000 M | Skills and writing | `--water-5` #011C4F | red squid, anglerfish with a glowing lure, faint plankton dots |
| Seabed | 1800 M | Contact ("Save point") and footer | `--water-7` #000923 (`--water-6` just above) | coral garden (red, pink, purple, blue), two krill, bubbles, cyan fish |

Zones are separated by a checkerboard `.dither` strip (set `--from`/`--to` to the zone colors). Water darkens in bands, never a smooth gradient. Creatures are decorative (`aria-hidden="true"`), sparse, and placed at the edges so they never cover text.
Intermediate ramp colors (`--water-4`, `--water-6`) are for dither strips and the seabed approach.

## Intro (Surface), copy from `reference-homepage.png`
- Full-viewport scene. Sky: pale blue (`--sky-top`) fading to near-white at the horizon (`.zone--sky`), pixel clouds (`assets/cloud.svg`, several sizes, slow `.drift`), the pixel sun top right with a soft glow (`.sun-glow`).
- **Wavy waterline** (pixel-stepped wave) with the **boat sitting on top of the water** (`assets/boat.svg`, 2-frame `.bob`), slightly left of center. Under the waterline the water is a muted blue (`--water-2` to `--water-3`) that fades to near-black (`--panel-deep`) at the bottom via the `.hero::after` vignette. A small red krill (`assets/krillion-mark.svg`, `.glow-red`) swims below the boat.
- **Title** KRILLION centered above the boat: `.glitch--outline` (hollow pink-stroke letters with a cyan offset).
- Under the title: `.subtitle` in spaced cyan caps (placeholder: "{ROLE} PORTFOLIO"), then one tagline in `--brine` Inter/VT323 with dot separators (placeholder: "{skill} · {skill} · {location}").
- At the bottom on the dark vignette: a small "▸ HOW TO EXPLORE" link (opens a short panel: "Scroll to dive. The deeper you go, the more you find."), then the big `.btn-primary` "▼ BEGIN DESCENT ▼" that scrolls to About. Below it, a row: `.label-mono` "{YEAR} EDITION" at left; `.btn-small` chips at right ("RESUME", "GITHUB").
- Optional sound toggle, top right: small square pixel speaker button, OFF by default, never autoplay audio.
- Scanline overlay (`.scanlines` on `body`) is on for the whole page.

## Depth meter (ruler)
Fixed on the RIGHT edge, vertically centered, as in the references: a tick ruler (long ticks every 20%, short every 4%) with the krill sprite as the marker, a readout (e.g. "300 M") above and the tier name. Markup: `<div class="depth-meter" data-depth-meter role="meter" aria-label="Depth" aria-valuemin="0" aria-valuemax="2000">` containing `[data-depth-readout]`, `[data-depth-zone]`, and `.depth-meter__track` with `<img data-depth-marker class="depth-meter__marker" src="assets/krillion-mark.svg" alt="">`. Load `depth.js` at the end of the body (updates in 10 M steps; sets `body[data-zone]`). On phones the zone name hides and the ruler narrows. Top bar links remain for keyboard navigation.

## Retro direction
Chunky pixels, square corners, hard offset shadows, stepped animation, limited palette. Retro is the style, not an excuse for bad usability: paragraphs use Inter and sit in panels. Game flavor lives in microcopy and decoration.

## Colors (sampled from the references; approximate)
| Token | Hex | Use |
|---|---|---|
| `--sky-top` / `--sky-horizon` | #90D7FC / #EAF4FB | Hero sky |
| `--sun` | #EBDAA4 | Sun (soft glow allowed) |
| `--water-0` .. `--water-7` | #0EC8F2 #00B0E1 #0379BC #014180 #002B62 #011C4F #000E31 #000923 | Depth ramp, surface to seabed |
| `--panel` / `--panel-deep` | #101D33 / #060F1B | Buttons, cards, meter boxes / hero vignette, footer |
| `--surf` | #0EC8F2 | Primary UI accent: frames, links, focus |
| `--cyan-text` | #3DD9F5 | Subtitle and tier labels |
| `--foam` / `--brine` | #DAF5FA / #93A6BE | Primary text / secondary text |
| `--border-dim` | #2A4466 | Quiet borders |
| `--krill-red` | #F42053 | The krill (matches the logo), squid, flag. Use sparingly; one red thing per screen draws the eye |
| `--glitch-pink` / `--glitch-cyan` | #F0739D / #3DD9F5 | Hero title stroke/offset only |
Creature colors (`--jelly*`, `--fish-cyan`, `--angler`, `--coral-*`) are for sprites only, never UI fills.
Proportion: mostly deep blues and near-black, text in foam/brine, accents rare.

## Typography
- **Press Start 2P** (`--font-display`): title and headings. UPPERCASE, line-height 1.3-1.4, about 6 words max, never under 14px, never paragraphs.
- **VT323** (`--font-ui`): subtitle (wide letter-spacing), buttons, labels, meter, tags. UPPERCASE, min 1rem.
- **Inter** (`--font-body`): all paragraphs, 1.0625rem, line-height 1.65, max 70ch.

## Layout
Max width 1120px inside each `.zone > .inner`. 8px grid, 4px game pixel. Mobile-first (640 / 960 / 1280). Zone padding 96px desktop, 48px mobile. Keep content clear of the meter on the right. **All paragraphs go inside `.pixel-box` panels.** Square corners, 4px borders, hard shadows. Pixel art scaled by whole numbers with `image-rendering: pixelated`.

## Top bar
Slim fixed bar after the hero scrolls away (transparent over the hero): krill mark left, anchor links (About, Projects, Skills, Contact) in VT323 right. Under 640px: MENU button.

## Components
- **Primary button** `.btn-primary`: dark `--panel` fill, 4px `--surf` frame, wide-spaced VT323 caps, ▼ arrows either side ("▼ BEGIN DESCENT ▼"). Use for the main CTA in each tier ("▼ KEEP DIVING ▼", "VIEW PROJECT").
- **Small chips** `.btn-small`: transparent, 2px `--border-dim`, brine text; hover cyan. **Labels** `.label-mono`.
- **Cards** `.pixel-box`: panel fill, 4px dim border, hard shadow; hover border goes cyan and lifts 2px.
- **Project card:** pixel cover or framed screenshot, title ("LEVEL 01"), one-sentence outcome, 3-5 tags, links "VIEW PROJECT" / "SOURCE".
- **Skill bars:** segmented pixel blocks. **Focus:** 4px `--surf` outline.

## Seabed footer (Contact)
Darkest zone. "SAVE POINT" heading, email, GitHub, LinkedIn as buttons, coral garden and krill along the bottom edge, VT323 line: "© {year} {Name}. Built with care. You reached the bottom." and a "▲ SURFACE" button that scrolls to the boat.

## Motion (stepped only)
`steps()` timing: boat bob, cloud drift, rising bubbles, slow fish swim, blinking prompt. Depth meter ticks in 10 M steps. Honor `prefers-reduced-motion` (stop all of it; the meter still updates). No flashing faster than 3 times per second.

## Voice and tone
Playful, upbeat, a little nerdy; clear first, cute second. First person ("I built"). Short sentences, plain words. Dive microcopy in small doses: "BEGIN DESCENT", "KEEP DIVING", "LEVEL 01", "SAVE POINT", "You reached the bottom."
- Do: "I build small tools that make big workflows calmer."
- Don't: "Passionate synergy-driven full-stack ninja delivering world-class solutions."
- Project blurbs: problem, what I did, result; lead with outcome and real numbers.
- At most one pun per page beyond the microcopy. Avoid: passionate, leverage, cutting-edge, rockstar, ninja, emoji in body copy, exclamation spam.
- Do not copy game-specific copy from the reference (daily prompts, timers, "rarer answers sink deeper"); the references show look only.

## Accessibility
WCAG AA, semantic landmarks with one headed `section` per tier, alt text on meaningful images, `aria-hidden` on decorative creatures, `role="meter"` on the depth gauge, keyboard links, visible focus, no info by color alone, reduced motion respected, sound off by default.

## Always
Use tokens. Responsive from 360px. Whole-number pixel scaling. Darken water in bands with dither strips. Keep text in panels and the meter on the right edge. Keep creatures decorative and sparse.

## Never
No rounded corners, blurred shadows, smooth gradients, glassmorphism. Soft glow only for the sun, krill, jellyfish and anglerfish lure. No separate pages, router or heavy framework. No colors outside the palette. No paragraphs in Press Start 2P or VT323. Never stretch, recolor or smooth the logo or sprites. No stock photos, no lorem ipsum.

## Logo and assets
**The logo is the owner's pixel-art krill** (red shrimp curled into a C, big white eye, two long antennae arching over the head, legs under the chin). Files: `assets/krillion-mark.svg` (krill only: use as favicon `<link rel="icon" href="assets/krillion-mark.svg">`, depth-meter marker, top-bar icon, tiny krill in the hero) and `assets/krillion-logo.svg` (krill + RGB-split pixel wordmark). The original artwork is `assets/krill-original.jpg` for reference only; never use the JPG on the page. The mark is portrait (53x72 pixel cells), so size it by width. Clear space 8 wordmark pixels; minimum 160px lockup / 32px wide mark; place on dark backgrounds. Never recolor, smooth, stretch or redraw the krill. The wordmark lettering is placeholder.
Sprites in `assets/`: `boat`, `sun`, `cloud`, `fish`, `fish-tiny`, `bubble`, `jellyfish`, `squid`, `anglerfish`, `coral-red`, `coral-pink`, `coral-purple`, `coral-blue`, `kelp` (all `.svg`). Make extra art as pixel-art SVG (rects, `shape-rendering="crispEdges"`) in palette colors.
