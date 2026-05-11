# Multivariable Calculus: Why We Need a 3D Compass

An interactive, web-based, 10-slide story explaining multivariable calculus to a complete beginner. Built with **Next.js 16**, **React Three Fiber**, **Framer Motion**, and **Tailwind v4**.

The metaphor: a person needs to meet his friend "North." On flat ground a normal compass is enough. In front of a mountain with a tunnel through it, the same "north" leads to two very different elevations — so we need a *3D compass*. That 3D compass is the **gradient**.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Navigating the deck

| Key                       | Action                       |
| ------------------------- | ---------------------------- |
| `→` / `Space` / `PageDown`| Next slide                   |
| `←` / `PageUp`            | Previous slide               |
| `Home` / `End`            | First / last slide           |
| **Outline** (top-left)    | Jump to any slide            |
| **Download PNG** (top-right) | Export current slide at 1920×1080 |

Slides are deep-linkable: `?slide=7` reloads at slide 7.

## Exporting assets for Google Slides

Every slide ships with **two** export buttons in the top-right:

- **Download PNG** — single still frame at exactly **1920 × 1080**. Use for static slides (1, 2, 4, 6, 7, 8, 9).
- **Download GIF** — captures ~3 seconds of the slide at 12 fps (1280 px wide) and encodes it client-side via `gif.js`. Use for slides whose value comes from motion (1's wiggling compass, 3 and 10's path tracing, the rotating 3D surfaces). Drop the GIF straight into Google Slides via **Insert › Image** — animation survives the trip.

Workflow:

1. `npm run dev`
2. Step through each slide
3. Click **Download PNG** (or **GIF**) per slide
4. Drag the resulting files into your Google Slides deck

Because every visual is an inline React/SVG component (or a r3f scene), exports are always crisp regardless of size — there are no pre-rendered binary assets in the repo.

## Slide map

| # | Slide | Visual |
| - | ----- | ------ |
| 1 | Title — Why we need a 3D compass | Mountain + tunnel + confused compass |
| 2 | Normal calculus: one path | Flat path + `y = f(x)` curve |
| 3 | The problem | Same scene, two routes (tunnel vs uphill) |
| 4 | One variable vs many | 2D curve / 3D surface split |
| 5 | Introducing the 3D compass | Hill with candidate arrows → best |
| 6 | Partial derivatives | Hill with `fx` and `fy` arrows |
| 7 | The gradient | `∇f = ⟨fx, fy⟩`, combined amber arrow |
| 8 | Contour map view | Top-down with perpendicular gradient |
| 9 | Example: `f = x² + y²` | Bowl with point (1,2) and ⟨2,4⟩ |
| 10| Recap | Character confident with glowing 3D compass |

## Project structure

```
app/
  layout.tsx          # Inter font, palette, body shell
  page.tsx            # mounts <DeckShell />
  globals.css         # Tailwind v4 + custom CSS vars
  slides/
    index.ts          # ordered slide registry
    Slide01Title.tsx … Slide10Recap.tsx
components/
  DeckShell.tsx       # keyboard nav, URL sync, side rail, progress
  SlideFrame.tsx      # 16:9 frame (forwardRef → html-to-image target)
  ExportButton.tsx    # PNG export at 1920×1080
  visuals/
    Character.tsx
    CompassIcon.tsx   # animated needle
    MountainScene.tsx # intro / choice / victory variants
    CurveXY.tsx       # 2D y = f(x) curve
    ContourMap.tsx    # SVG contour rings + true-perpendicular ∇f
    Hill3D.tsx        # r3f hill, modes: many / best / partials / gradient
    Bowl3D.tsx        # r3f z = x² + y²
    ArrowField.tsx    # animated candidate-directions fan
lib/
  palette.ts          # shared color tokens
```

## Color palette

| Token | Hex | Use |
| ----- | --- | --- |
| `background` | `#FBF8F3` | Page background |
| `ink` | `#1F2A44` | Body text, character lines |
| `amber` | `#F59E0B` | Primary accent: gradient, "best uphill" |
| `teal` | `#0EA5A4` | Secondary: paths, `fx` |
| `slate` | `#94A3B8` | Helper lines, faded arrows |

## Scripts

```bash
npm run dev      # next dev (Turbopack) on :3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Tech

- **Next.js 16** App Router (Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **react-three-fiber** + **@react-three/drei**
- **framer-motion**
- **html-to-image** for PNG export
