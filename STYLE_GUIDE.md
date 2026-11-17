# KRILLION — COMPLETE STYLE GUIDE

## 1. Project Overview

Krillion is a personal Computer Science portfolio presented as an immersive, retro pixel-art underwater exploration experience.

The website is a single-page interactive descent. Visitors begin on a boat at the ocean's surface, press BEGIN DESCENT, and scroll through increasingly deep ocean environments to discover the portfolio.

The experience should feel like exploring an underwater game world while functioning as a polished professional portfolio.

**Primary objectives:**
- Showcase software engineering, AI/ML, and technical projects.
- Communicate technical skills, engineering experience, and measurable accomplishments.
- Create a memorable visual identity that differentiates the portfolio.
- Make professional information easy for recruiters and hiring managers to find.
- Maintain excellent usability, accessibility, and performance.

**Core philosophy:**

The underwater game is the presentation layer, not the product itself. Technical accomplishments are the primary focus. Game elements should enhance exploration without distracting from professional content.

---

## 2. Core Experience: The One-Page Descent

Build one scrolling `index.html`. Do not create separate pages or introduce a router.

The experience follows a continuous underwater descent:

1. Visitors arrive at the surface and see the boat, ocean, and KRILLION title.
2. Visitors press BEGIN DESCENT or scroll down.
3. The environment progressively darkens as they descend.
4. Each depth tier introduces a different portfolio section.
5. The right-side depth meter tracks their position.
6. Visitors reach the seabed, where they find contact information and professional links.

Sections should feel like different underwater environments, not disconnected website pages.

### Depth tiers and portfolio structure

| Tier | Depth | Points | Portfolio section |
|---|---:|---:|---|
| Plankton | 100 M | 10 | Early descent milestone |
| Too Clever | 150 M | 15 | Introduction / Hero |
| Schooler | 300 M | 30 | About |
| Rare | 600 M | 60 | Projects |
| Deep Cut | 850 M | 85 | Skills & Experience |
| One in a Krillion | 1,000 M | 100 | Contact / Seabed |

### Environmental progression

| Depth | Water appearance | Creatures and scenery |
|---|---|---|
| Surface | Pale sky and light blue water | Boat, sun, clouds, tiny krill |
| 300 M | `--water-2` #0379BC | Light rays, bubbles, cyan fish, tiny dark fish |
| 600 M | `--water-3` #014180 | Jellyfish, large drifting red krill, tiny fish |
| 850 M | `--water-5` #011C4F | Red squid, anglerfish, glowing lure, plankton |
| 1,000 M | `--water-7` #000923 | Coral garden, two krill, bubbles, cyan fish |

Use intermediate ramp colors `--water-4` and `--water-6` for transitions and the seabed approach.

Zones are separated by checkerboard `.dither` strips. Set `--from` and `--to` to the appropriate zone colors.

Water must darken in distinct pixel-art bands, never through a smooth gradient.

Creatures are decorative, sparse, and positioned along the edges so they never obstruct text or important interactions.

---

## 3. Visual Identity and Art Direction

**Overall aesthetic:** Retro pixel-art ocean exploration.

The website should resemble a carefully designed 2D underwater adventure game.

Visual characteristics:
- Chunky pixel artwork.
- Square corners.
- Hard offset shadows.
- Stepped animations.
- Limited color palette.
- Pixelated image rendering.
- Dark ocean environments.
- Subtle glowing effects on selected creatures.
- Minimal, intentional UI decoration.

The design should feel cohesive rather than cluttered.

Retro styling should never compromise usability. Body text must remain readable, buttons must be recognizable, and professional content must be easy to scan.

---

## 4. Depth Meter

The depth meter is a persistent navigation and progression element.

**Position:** Fixed to the RIGHT edge of the viewport, vertically centered.

### Appearance

The meter contains:
- A vertical tick ruler.
- Long ticks every 20%.
- Short ticks every 4%.
- The krill sprite as the moving position marker.
- Current depth readout above the ruler (e.g., `300 M`).
- Current tier name.
- Current tier point value.
- Optional next-tier milestone information.

Use `assets/krillion-mark.svg` as the marker. Never redraw, recolor, stretch, or smooth the original sprite.

### Depth milestones

- Plankton: 10 points at 100 M.
- Too Clever: 15 points at 150 M.
- Schooler: 30 points at 300 M.
- Rare: 60 points at 600 M.
- Deep Cut: 85 points at 850 M.
- One in a Krillion: 100 points at 1,000 M.

The points represent the value associated with each tier. Do not imply that they are cumulative unless a separate cumulative scoring system is explicitly implemented.

### Markup

`<div class="depth-meter" data-depth-meter role="meter" aria-label="Depth" aria-valuemin="0" aria-valuemax="1000">`

Contains:
- `[data-depth-readout]`
- `[data-depth-zone]`
- `[data-depth-points]`
- `.depth-meter__track`
  - `<img data-depth-marker class="depth-meter__marker" src="assets/krillion-mark.svg" alt="">`

### Behavior

Load `depth.js` at the end of the body.

- Track the user's scroll position and convert it into depth.
- Update the displayed depth in 10 M increments.
- Move the krill marker proportionally along the ruler.
- Update the tier name and points when a milestone is reached.
- Update `body[data-zone]` whenever the active tier changes.
- Display the next milestone when appropriate.
- Keep the depth meter synchronized with the active portfolio section.
- Update accessible meter values and descriptions dynamically.

The meter should reflect actual page progression rather than assuming that every section has the same height.

### Tier transition animations

When a user reaches a new tier:

- Briefly animate the krill marker with a stepped movement or bounce.
- Highlight the newly reached tier.
- Display a small notification such as `NEW TIER UNLOCKED: RARE`.
- Briefly emphasize the associated point value.
- Transition the surrounding water and scenery to the new zone.
- Avoid blocking scrolling or interrupting navigation.

Animations must be subtle and fast. Never force the user to wait for an animation before continuing.

### Mobile behavior

- Hide the tier name and point value on narrow screens.
- Keep the depth readout and krill marker visible.
- Narrow the ruler and shorten tick marks.
- Ensure the meter does not overlap important content.
- Keep the meter fixed to the right edge and vertically centered.

---

## 5. Intro / Surface Experience

The homepage should immediately establish the underwater theme.

Match `assets/reference-homepage.png`.

### Environment

- Full-viewport hero scene.
- Pale blue sky using `--sky-top`.
- Near-white horizon using `--sky-horizon`.
- Pixel clouds using `assets/cloud.svg`.
- Slow stepped cloud drift.
- Pixel sun positioned in the upper right.
- Soft sun glow using `.sun-glow`.
- Wavy pixel-stepped waterline.
- Boat sitting on top of the water using `assets/boat.svg`.
- Boat positioned slightly left of center.
- Two-frame stepped `.bob` animation.
- Small red krill swimming beneath the boat.

Underwater, use muted blue water that gradually darkens toward `--panel-deep` through the `.hero::after` vignette.

### Typography and content

Center the title:

`KRILLION`

Use `.glitch--outline` with hollow pink-stroke letters and cyan offset.

Below the title:
- Spaced cyan uppercase subtitle.
- Placeholder: `{ROLE} PORTFOLIO`.
- One short tagline in `--brine`.
- Placeholder: `{skill} · {skill} · {location}`.

At the bottom of the hero:

- `▸ HOW TO EXPLORE` link.
- Opens a short explanation: "Scroll to dive. The deeper you go, the more you find."
- Primary CTA: `▼ BEGIN DESCENT ▼`.
- CTA scrolls to the About section.
- Small `{YEAR} EDITION` label.
- RESUME and GITHUB chips.

Optional sound toggle in the top right. Sound must be OFF by default. Never autoplay audio.

Use the `.scanlines` overlay across the page.

---

## 6. Portfolio Content and Sections

Professional content takes priority over decorative game elements.

Every section should have a clear heading, concise introduction, and useful technical information.

### About — Schooler, 300 M

Purpose: Introduce the developer and establish technical interests.

Include:
- Short personal introduction.
- Computer Science interests.
- Areas of technical specialization.
- Relevant background and experience.
- What kinds of problems the developer enjoys solving.

Keep the writing natural, specific, and concise.

Avoid generic descriptions such as "passionate about technology."

### Projects — Rare, 600 M

This is the most important section of the portfolio.

Projects should receive the greatest visual and informational emphasis.

Each project card should contain:

1. Project name.
2. One-sentence description of the problem being solved.
3. Technical approach and architecture.
4. Technologies and programming languages.
5. Specific individual contributions.
6. Quantifiable results or performance improvements, where available.
7. GitHub link.
8. Live demo or additional project link, if available.

Use project identifiers such as `LEVEL 01`, `LEVEL 02`, and `LEVEL 03` to reinforce the game theme.

Project descriptions should explain what was built, how it works, what technical challenges were addressed, and what results were achieved.

Do not exaggerate results or claim contributions that were not personally completed.

Use pixel-art covers, framed screenshots, or custom illustrations where appropriate.

### Skills and Experience — Deep Cut, 850 M

Purpose: Communicate technical breadth and practical experience.

Include:
- Programming languages.
- Frameworks and libraries.
- Development tools.
- AI/ML technologies.
- Software engineering experience.
- Relevant internships, research, and technical work.

Use segmented pixel-style skill bars where appropriate.

Do not use arbitrary skill percentages unless they have a meaningful basis.

Prioritize actual experience and demonstrated technical ability over decorative ratings.

Include concise descriptions of relevant experience and individual responsibilities.

### Contact — One in a Krillion, 1,000 M

The final destination is the seabed.

Use the darkest ocean environment.

Include:
- SAVE POINT heading.
- Email contact.
- GitHub.
- LinkedIn.
- Resume access.
- Coral garden along the bottom.
- Two krill.
- Bubbles and cyan fish.

Footer text:

`© {year} {Name}. Built with care. You reached the bottom.`

Include a `▲ SURFACE` button that smoothly returns to the boat, respecting reduced-motion preferences.

---

## 7. Recruiter Experience and Navigation

The portfolio must remain easy to navigate for recruiters and hiring managers.

The game experience must never become an obstacle to accessing professional information.

### Top navigation

A slim fixed navigation bar appears after the hero scrolls away.

Contains:
- Krill mark on the left.
- About.
- Projects.
- Skills.
- Contact.
- Resume.
- GitHub.
- LinkedIn.

Use VT323 for navigation labels.

Under 640px, collapse navigation into a MENU button.

### Navigation requirements

- All links must navigate to the correct section.
- Maintain keyboard accessibility.
- Provide visible focus indicators.
- Support direct navigation to Projects and other important sections.
- Keep resume access readily available.
- Ensure the depth meter does not interfere with the navigation bar.

Recruiters should be able to locate projects, experience, resume, and contact information without having to explore every section manually.

---

## 8. Components

### Primary buttons

`.btn-primary`

- Dark `--panel` fill.
- 4px `--surf` frame.
- Wide-spaced VT323 uppercase lettering.
- Hard pixel-style shadows.
- ▼ arrows on either side.

Examples:
- `▼ BEGIN DESCENT ▼`
- `▼ KEEP DIVING ▼`
- `VIEW PROJECT`

### Small chips

`.btn-small`

- Transparent background.
- 2px `--border-dim` border.
- Brine text.
- Cyan hover state.

Used for RESUME, GITHUB, and secondary actions.

### Labels

`.label-mono`

Use for small metadata, section identifiers, dates, and edition labels.

### Cards

`.pixel-box`

- `--panel` background.
- 4px dim border.
- Hard offset shadow.
- Square corners.
- Cyan hover border.
- Slight 2px upward hover movement.

All paragraphs must be placed inside `.pixel-box` panels.

### Project cards

- Pixel-art cover or framed screenshot.
- Project identifier.
- Project title.
- One-sentence outcome.
- Technical description.
- 3–5 technology tags.
- VIEW PROJECT and SOURCE links.

### Skill bars

Use segmented pixel blocks to represent technical categories.

Keep the design visually consistent with the rest of the portfolio.

---

## 9. Colors and Design Tokens

Always import and use the existing tokens from `tokens.css`.

Never hardcode values when an appropriate token exists.

### Color palette

| Token | Hex | Purpose |
|---|---|---|
| `--sky-top` | #90D7FC | Hero sky |
| `--sky-horizon` | #EAF4FB | Horizon |
| `--sun` | #EBDAA4 | Sun |
| `--water-0` | #0EC8F2 | Surface water |
| `--water-1` | #00B0E1 | Shallow water |
| `--water-2` | #0379BC | About |
| `--water-3` | #014180 | Projects |
| `--water-4` | #002B62 | Transition |
| `--water-5` | #011C4F | Skills |
| `--water-6` | #000E31 | Deep transition |
| `--water-7` | #000923 | Seabed |
| `--panel` | #101D33 | Cards and buttons |
| `--panel-deep` | #060F1B | Deep panels |
| `--surf` | #0EC8F2 | Primary UI accent |
| `--cyan-text` | #3DD9F5 | Labels |
| `--foam` | #DAF5FA | Primary text |
| `--brine` | #93A6BE | Secondary text |
| `--border-dim` | #2A4466 | Quiet borders |
| `--krill-red` | #F42053 | Krill and selected creatures |
| `--glitch-pink` | #F0739D | Hero title |
| `--glitch-cyan` | #3DD9F5 | Hero title offset |

Creature colors (`--jelly*`, `--fish-cyan`, `--angler`, `--coral-*`) are reserved for sprites and must never be used as general UI fills.

### Color proportions

- Primarily deep blues and near-black.
- Text in foam and brine.
- Cyan for important interface elements.
- Red used sparingly.

The krill red should remain a distinctive accent. One red focal element per screen is generally sufficient.

---

## 10. Typography

Use three primary typefaces.

### Press Start 2P — `--font-display`

For:
- Main title.
- Section headings.
- Important game-style labels.

Rules:
- Uppercase.
- Line-height 1.3–1.4.
- Approximately six words maximum per heading.
- Never below 14px.
- Never use for paragraphs.

### VT323 — `--font-ui`

For:
- Navigation.
- Buttons.
- Depth meter.
- Subtitles.
- Labels.
- Tags.
- Small metadata.

Rules:
- Uppercase.
- Minimum 1rem.
- Use letter spacing where appropriate.

### Inter — `--font-body`

For:
- All paragraphs.
- Technical descriptions.
- Project explanations.
- Experience descriptions.

Rules:
- 1.0625rem base size.
- Line-height 1.65.
- Maximum width 70ch.

Professional information must remain easy to read. Pixel fonts are for the visual identity, not long-form content.

---

## 11. Layout and Responsiveness

- Maximum content width: 1120px.
- Main content inside `.zone > .inner`.
- 8px spacing grid.
- 4px game pixel grid.
- Mobile-first implementation.
- Breakpoints: 640px, 960px, and 1280px.
- Zone padding: 96px desktop, 48px mobile.
- Keep content clear of the right-side depth meter.
- All paragraphs inside `.pixel-box` panels.
- Square corners and 4px borders.
- Hard offset shadows.
- Pixel art scaled using whole-number multiples.
- Use `image-rendering: pixelated` for pixel artwork.

Support screen widths starting at 360px.

Do not allow horizontal overflow or overlapping content.

---

## 12. Motion and Animations

All animations should use stepped pixel-game timing.

Use CSS `steps()` timing functions.

Possible animations:
- Boat bobbing.
- Cloud drifting.
- Rising bubbles.
- Slow fish swimming.
- Blinking prompts.
- Krill marker movement.
- Tier unlock transitions.
- Subtle creature animations.

Animations should be slow, intentional, and visually consistent.

Never use:
- Flashing faster than three times per second.
- Excessive bouncing.
- Distracting continuous animations.
- Animations that prevent scrolling.
- Smooth gradient transitions between ocean zones.

Respect `prefers-reduced-motion`.

When reduced motion is enabled, stop decorative animations and use immediate or minimal transitions. The depth meter must continue updating.

---

## 13. Accessibility

Accessibility is a core requirement, not an optional enhancement.

- WCAG AA contrast.
- Semantic landmarks.
- One headed `<section>` per portfolio tier.
- Meaningful alt text for informative images.
- `aria-hidden="true"` on decorative creatures.
- `role="meter"` for the depth gauge.
- Dynamic accessible depth values.
- Keyboard-accessible navigation.
- Visible focus indicators.
- No information communicated through color alone.
- Reduced-motion support.
- Sound disabled by default.
- Functional mobile navigation.
- Sufficient touch-target sizes.

The entire portfolio must remain usable without a mouse.

---

## 14. Performance and Implementation

Keep the implementation lightweight.

- Use HTML, CSS, and vanilla JavaScript.
- No separate pages.
- No router.
- No unnecessary heavy frameworks.
- Avoid unnecessary dependencies.
- Optimize SVG and other assets.
- Avoid large uncompressed images.
- Use efficient scroll handling for depth updates.
- Avoid unnecessary DOM manipulation.
- Ensure animations do not create excessive layout recalculation.
- Lazy-load appropriate below-the-fold imagery.
- Preserve smooth and responsive scrolling.

Use the existing `depth.js` for depth tracking and tier updates.

Use `tokens.css` for all design tokens.

Do not introduce a new design system when an existing token or component already fulfills the requirement.

---

## 15. Voice and Tone

The writing should feel playful, upbeat, slightly nerdy, and technically confident.

**Priority: Clear first, cute second.**

Use first person when describing personal work.

Good:
- "I built small tools that make big workflows calmer."
- "Developed an image recognition pipeline using..."
- "Reduced inference errors by..."

Avoid:
- "Passionate synergy-driven full-stack ninja."
- "Leveraging cutting-edge solutions."
- Generic descriptions that could apply to any developer.

### Project descriptions

Follow this structure:

1. Problem: What needed to be solved?
2. Implementation: What did you build?
3. Technical contribution: What did you personally implement?
4. Result: What changed, improved, or was achieved?

Lead with outcomes and real numbers whenever possible.

Use game-themed microcopy in small doses:
- BEGIN DESCENT
- KEEP DIVING
- LEVEL 01
- SAVE POINT
- NEW TIER UNLOCKED

At most one additional pun per page beyond standard game microcopy.

Avoid excessive exclamation marks, unnecessary emojis in professional content, and overly playful descriptions of technical accomplishments.

---

## 16. Logo and Assets

The logo is the owner's original pixel-art krill.

The krill is a red shrimp curled into a C, with:
- One large white eye.
- Two long antennae arching over the head.
- Legs beneath the chin.

### Official assets

- `assets/krillion-mark.svg`: Krill mark only.
- `assets/krillion-logo.svg`: Krill with RGB-split pixel wordmark.
- `assets/krill-original.jpg`: Original artwork reference only.

Use `krillion-mark.svg` for:
- Favicon.
- Depth meter marker.
- Top navigation icon.
- Tiny krill in the hero.

Never use the original JPG directly on the page.

### Logo rules

- Never recolor.
- Never stretch.
- Never smooth.
- Never redraw.
- Preserve original proportions.
- Use portrait dimensions (53 × 72 pixel cells).
- Size by width.
- Maintain 8 wordmark pixels of clear space.
- Minimum 160px lockup and 32px wide mark.
- Prefer dark backgrounds.

### Existing sprites

Use the existing SVG assets:

- `boat.svg`
- `sun.svg`
- `cloud.svg`
- `bubble.svg`
- `jellyfish.svg`
- `squid.svg`
- `anglerfish.svg`
- `kelp.svg`

Additional artwork must be pixel-art SVG using palette colors, rectangles, and `shape-rendering="crispEdges"`.

---

## 17. Visual References

Match the existing visual references:

- `assets/reference-homepage.png`: Intro and hero.
- `assets/reference-tiers.png`: Full descent and underwater creatures.
- `assets/reference-scene.png`: Early title-screen artwork.

These references establish the intended visual direction.

Do not copy game-specific text or mechanics from the references. They are visual references only.

Always import and use the existing design tokens.

If a reference and a written instruction appear to conflict, preserve the established visual direction and ask for clarification rather than silently inventing a replacement.

---

## 18. Always

- Keep the website as one continuous underwater descent.
- Make technical projects the centerpiece.
- Use the original krill artwork.
- Import and use design tokens.
- Keep the depth meter fixed to the right edge.
- Maintain the six depth milestones.
- Darken water in distinct bands.
- Use checkerboard dither transitions.
- Keep paragraphs readable and inside panels.
- Make professional links easy to find.
- Keep creatures decorative and sparse.
- Support keyboard navigation and reduced motion.
- Make the site responsive from 360px.
- Prioritize real technical accomplishments over decorative content.

---

## 19. Never

- No rounded corners.
- No blurred shadows.
- No smooth gradient water transitions.
- No glassmorphism.
- No unnecessary animations.
- No stock photos.
- No lorem ipsum.
- No separate pages or router.
- No colors outside the established palette.
- No paragraphs in Press Start 2P or VT323.
- No recoloring, stretching, smoothing, or redrawing official sprites.
- No creatures covering text.
- No important professional information hidden behind game mechanics.
- No unnecessary complexity or heavy frameworks.
- No fabricated project results or technical claims.
- No forcing recruiters to complete the descent to find the resume or contact information.

---

## 20. Final Design Principle

Krillion should feel like discovering an underwater world while exploring a developer's technical journey.

The visual experience should be memorable. The projects should be impressive. The information should be accessible.

**A recruiter should remember the ocean, but leave remembering the engineering.**