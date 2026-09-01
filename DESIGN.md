# Saylor Beauty Spa — Design System

Source of truth for visual decisions on the marketing site. Restates and finalizes §2 of `beauty-haven-website-spec.md` after reviewing the real logo and gallery photography supplied in the project root.

> **2026-09-01 rename note:** the business traded as "Beauty Haven" in the original brief and has since been renamed **Saylor Beauty Spa** (the old name was in wide use by other salons in Zimbabwe). All copy, metadata, and analytics event naming below now use the new name. The palette/typography/layout decisions are unaffected — only the wordmark and the logo file need to change. The nav/footer/OG-image/favicon currently render a generated text monogram ("S") in place of a real logo until a new logo is supplied — see `logo-design-brief.md` for the brief written for that redesign.

## Two-pass process note (per `frontend-design` skill)

**Pass 1 — brainstorm against the brief.** The spec's decided palette (plum/rose/blush/cream/gold) is a deliberate, editorial "premium boutique spa" system: one dark, one accent, one soft fill, one background, one metallic spot color. It was designed specifically to avoid the "generic pink Canva template" look called out in §1.

**Critique against generic-AI-design tells + real assets.** The supplied logo (`beauty-haven-logo.jpeg`) is a circular badge with a coral/salmon braided-hair silhouette, a navy-to-magenta gradient ring, and navy/coral wordmark — itself a fairly generic Canva-style badge (gradient ring, stock display font, drop-shadow). Lifting its literal colors (hot navy + magenta + coral) site-wide would *reintroduce* the generic-template look the brief explicitly warns against, and would clash with the "editorial magazine" tone requested in §2.1. The supplied gallery photography is real client work (nails), shot on-phone with mixed lighting and cluttered backgrounds — valuable as proof/trust content, but not hero-grade "editorial" photography on its own.

**Revision / decision:** Keep the §2.2 plum/rose/blush/cream/gold system as the site-wide UI palette — it's the more premium, more cohesive system and matches the brief's stated tone better than the logo's native palette. Use the actual logo file as a standalone mark only (nav + footer, on a neutral cream circular plate so its internal navy/magenta/coral doesn't fight the UI). Use the real gallery photography throughout (hero + gallery grid), art-directed with crops, the plum gradient scrim called for in §2.5, and consistent warm color grading via a subtle CSS filter, so the mixed-quality source photos read as one intentional set rather than a phone dump. This keeps "real assets are source of truth" (§7.3) while protecting the premium system — flagged here for review rather than silently deviating.

## 2.2 Color tokens

| Token | Hex | Role |
|---|---|---|
| `haven-plum` | `#3D1F2B` | Primary dark — headlines, footer bg, hero scrim |
| `haven-rose` | `#B5495B` | Primary accent — CTAs, links, active states |
| `haven-blush` | `#F2DCD8` | Soft section backgrounds, card fills |
| `haven-cream` | `#FBF6F1` | Main page background |
| `haven-gold` | `#C79A5B` | Spot accent only — hairline dividers, star ratings |
| `haven-ink` | `#231318` | Body text |
| `haven-white` | `#FFFFFF` | Cards/surfaces on dark, button text on rose |

Rule: `haven-gold` max 1–2 uses per screen, never a background/repeated decoration. WhatsApp CTAs are always `haven-rose` → hover `haven-plum`, `haven-white` text — visually distinct from every other button.

## Typography

- Display/headline: **Fraunces** (variable, warm editorial serif) — wordmark, h1/h2, hero headline.
- Body/UI: **Inter** — body copy, nav, buttons, labels.
- Loaded via `next/font/google`, `display: swap`, Latin subset only.
- Scale (mobile → desktop): H1 `2.25rem → 4rem`, H2 `1.75rem → 2.75rem`, H3 `1.25rem → 1.5rem`, body `1rem → 1.0625rem`, small `0.875rem`. Line-height 1.1–1.15 display, 1.6 body.
- No all-caps eyebrows, no middle-dot meta strings, no arrow glyphs on buttons.

## Layout

- Max content width `1280px`; side padding `1.25rem` mobile → `4rem` desktop.
- Section rhythm: `4rem` mobile / `7rem` desktop vertical padding, alternating `haven-cream` / `haven-blush`.
- Radius: `0.75rem` cards/images, `999px` pill on all buttons.
- Shadow: single `shadow-haven` token (`0 8px 30px -10px rgba(61,31,43,0.18)`) — floating WhatsApp button + hovered cards only.

## Signature moment

Full-bleed hero photo (real nail-art close-up, warm-graded) right two-thirds desktop / full-bleed mobile, `Fraunces` wordmark + headline over a `haven-plum` gradient scrim left/top, one `haven-gold` hairline divider under the headline.

## Motion

- One orchestrated hero load-in (~500ms, single ease).
- Button hover: rose→plum + `translateY(-2px)`, 150ms. Gallery hover: scale `1.02`.
- Floating WhatsApp button: single pulse 1s after load, then still.
- `prefers-reduced-motion: reduce` disables all transform/scale, keeps opacity fades only.

## Imagery

Real photography only. Icons: single consistent set (Phosphor, light/duotone), recolored `haven-plum`/`haven-gold`, never mixed styles.

## Known gaps to flag for Prisca

- No lash-extension or massage-room photography was supplied — gallery currently shows nail work only. Swap in real lash/massage photos as soon as available (see `README.md`).
- Two gallery source photos carry a small "Photoshop Express" / prior watermark baked into the JPEG — cosmetic only, not reproduced by the site, but worth reshooting without a watermark app next time.
