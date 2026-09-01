# Beauty Haven — Website Build Specification

**For:** Claude Code (autonomous build + deploy)
**Client:** Beauty Haven, owned by Prisca
**Deployment target:** Personal server, Coolify already installed
**Goal:** A single, extremely polished, conversion-optimized one-page (or short multi-section) website for a beauty therapy business, built to perform flawlessly as the landing destination for paid ads (Meta/Facebook, Instagram, WhatsApp) and organic/browser traffic, on every device.

---

## 0. How to use this document

1. Read this entire file before writing code.
2. Load and follow `frontend-design` skill guidance for the visual design pass (palette, type, layout, restraint). Do the two-pass process: brainstorm a design token plan, critique it against the "generic AI design" tells listed in that skill, revise, **then** build.
3. If a `pptx`/`docx`/`pdf`/`xlsx` skill is present, ignore it — this is a pure web build.
4. If Prisca's logo, real photos, or brand colors are supplied separately, they override anything guessed here — ask the user for them before finalizing the palette if not yet provided.
5. Treat "ruthless" in this brief as **ruthlessly effective marketing engineering** — fast, trackable, high-converting, impossible to bounce off of by accident — not aggressive/spammy UX. Never implement dark patterns, fake urgency, disguised ads, or anything that would get the Meta Pixel/WhatsApp Business account banned. Aggressive on performance and tracking, honest and beautiful on the surface.

---

## 1. Business & content brief

- **Business name:** Beauty Haven
- **Owner / face of the brand:** Prisca
- **Services offered** (confirm final list/pricing with the user before shipping, use this as the working set):
  - Eyelash extensions / lash lifts
  - Manicure
  - Pedicure
  - Nail art / gel/acrylic nails
  - Full body & relaxation massages (specify types if provided: Swedish, deep tissue, hot stone, etc.)
  - Add any other services the user supplies (facials, waxing, etc. — leave clearly marked placeholder sections so they're trivial to add later)
- **Primary contact channel:** WhatsApp (this is the #1 conversion action on the whole site)
  - WhatsApp number 1: `+263 71 724 2438`
  - WhatsApp number 2: `+263 77 416 5704`
  - Every CTA should deep-link to `https://wa.me/263717242438` and `https://wa.me/263774165704` with a **pre-filled message** per context (e.g. `?text=Hi%20Beauty%20Haven%2C%20I%27d%20like%20to%20book%20a%20lash%20appointment`). Offer both numbers (e.g. two WhatsApp buttons labeled "Book with Prisca" / "Book — Line 2", or one primary + one shown on hover/tap "having trouble? try our second line").
- **Location / service area:** ask user; include an address/map embed only if they want walk-ins, otherwise keep it appointment/WhatsApp-only.
- **Tone:** warm, feminine, premium/boutique — not childish, not generic "pink Canva template." Think high-end spa/beauty studio, not a nail-salon strip-mall flyer.

---

## 2. Visual design direction — decided design system

This section is a **decision**, not a menu — Claude Code should implement this directly rather than re-brainstorming from scratch. Still run it past the `frontend-design` skill's critique step once (confirm nothing here reads as a generic default; adjust only if something genuinely clashes with real logo colors once supplied), then build.

### 2.1 Concept
Premium boutique beauty studio — editorial-magazine energy, not a "girly" template. The wordmark and headlines should feel like they belong on the cover of a high-end beauty/lifestyle publication; the UI around it stays quiet, warm, and confident.

### 2.2 Color palette (named tokens — wire these into `tailwind.config.ts` as custom colors, replacing the default palette entirely)

| Token | Hex | Role |
|---|---|---|
| `haven-plum` | `#3D1F2B` | Primary dark — headlines on light backgrounds, footer background |
| `haven-rose` | `#B5495B` | Primary accent — CTA buttons, links, active states |
| `haven-blush` | `#F2DCD8` | Soft section backgrounds, card fills |
| `haven-cream` | `#FBF6F1` | Main page background |
| `haven-gold` | `#C79A5B` | Sparingly used metallic accent — dividers, icon strokes, hover glow, testimonial stars |
| `haven-ink` | `#231318` | Body text color (near-black with a warm plum undertone, not pure black) |
| `haven-white` | `#FFFFFF` | Cards/surfaces on dark sections, button text on rose |

Rules: `haven-gold` is a **spot accent only** (max one or two uses per screen — e.g. a hairline divider under the hero headline, star ratings) — never a background or a repeated decorative element. WhatsApp CTA buttons use `haven-rose` background with `haven-white` text (and a `haven-plum` hover-darken state), so they stay visually distinct from every other button on the page — the eye should always know instantly where "the WhatsApp button" is.

If a logo is supplied with different brand colors (see §7.3), treat the logo as source of truth and re-derive this table around it before final build — keep the same *structure* (one dark, one accent, one soft fill, one background, one metallic spot color) even if exact hexes shift.

### 2.3 Typography

- **Display/headline typeface:** `Fraunces` (variable serif, warm and editorial, has a slightly quirky/soft-contrast personality that reads feminine without being a script font). Use for: wordmark "Beauty Haven", all `<h1>`/`<h2>` section headings, hero headline.
- **Body/UI typeface:** `Inter` or `General Sans` for body copy, nav, buttons, form/CTA labels — clean, warm, highly legible at small sizes on mobile.
- Load both via `next/font/google` (or self-hosted files if the user supplies `General Sans`), `display: swap`, subset to Latin only to keep payload small.
- Type scale (mobile → desktop, rem): H1 `2.25 → 4rem`, H2 `1.75 → 2.75rem`, H3 `1.25 → 1.5rem`, body `1rem → 1.0625rem`, small/labels `0.875rem`. Line-height: 1.1–1.15 for display headings, 1.6 for body serif-adjacent warmth.
- No ALL-CAPS eyebrow labels, no middle-dot meta strings, no arrow glyphs on buttons — buttons say exactly what happens, e.g. "Book on WhatsApp", "View Services".

### 2.4 Layout system
- Max content width `1280px`, generous side padding (`1.25rem` mobile → `4rem` desktop).
- Section vertical rhythm: `4rem` mobile / `7rem` desktop padding top+bottom per section, alternating `haven-cream` and `haven-blush` backgrounds section-to-section for gentle visual separation without hard borders.
- Border radius system: soft and welcoming but not bubbly — `0.75rem` on cards/images, `999px` (pill) on all buttons (the pill shape becomes a consistent, intentional "this is tappable" signal site-wide, distinct from the softer card radius).
- Shadows: one soft, warm-toned shadow token (`shadow-haven`: `0 8px 30px -10px rgba(61,31,43,0.18)`), used only on the floating WhatsApp button and hovered gallery/service cards — not stamped on every element.

### 2.5 Signature moment
Full-bleed hero: real photo of a treatment in progress (lash or nail close-up, warm lighting) on the right two-thirds of the viewport (desktop) or full-bleed background (mobile) with the `Fraunces` wordmark and headline set directly over a subtle `haven-plum` gradient scrim on the left/top for contrast. A single `haven-gold` hairline divider sits under the headline. This is the one bold moment — everything else stays disciplined.

### 2.6 Motion
- One orchestrated hero load-in (headline + CTA fade/rise together, ~500ms, single easing curve).
- Hover: buttons darken (`haven-rose` → `haven-plum`) with a slight lift (`translateY(-2px)`) over 150ms; gallery images scale `1.02` on hover.
- Floating WhatsApp button: one gentle single pulse 1s after page load to draw the eye, then stays still (never loops).
- Respect `prefers-reduced-motion: reduce` — disable all transform/scale motion, keep opacity fades only.

### 2.7 Imagery
Real photography only (logo + photos supplied by user, see §7.3) — no stock-photo clichés, no illustrated/line-art icons as hero content. Icons used for UI (e.g. service category glyphs) should be a single consistent icon set (e.g. Phosphor or Lucide, "light/duotone" weight) recolored to `haven-plum`/`haven-gold`, never mixed styles.

Deliver `DESIGN.md` in the repo restating this system (it's already fully specified here — `DESIGN.md` can be a direct copy/summary of §2) so it's easy to review against the live build.

---

## 3. Site structure (single page, section-anchored)

Keep it to **one fast-loading page** with smooth-scroll anchor navigation — ideal for ad landing pages (one URL, no funnel drop-off between pages).

1. **Sticky nav / header** — logo (placeholder until user supplies), anchor links (Services, Gallery, About, Book Now), a persistent "Book on WhatsApp" button always visible.
2. **Hero** — the signature visual moment. Business name, one-line value proposition, primary WhatsApp CTA button, secondary CTA (e.g. "View Services").
3. **Services** — clean grid/list of each service with short description, indicative price (if provided), and a "Book this" WhatsApp CTA per service (pre-filled message naming that specific service — this dramatically improves ad-to-conversion tracking and lead quality).
4. **Gallery** — grid of real work photos (lash sets, nails, massage room) — build as a responsive masonry/grid with lightbox, lazy-loaded.
5. **About Prisca** — short bio/story section, builds trust before the ask.
6. **Testimonials** — placeholder structure for 3–6 client quotes/ratings (ask user for real ones, or leave clearly marked sample content).
7. **Booking / Contact** — the main conversion section: two large WhatsApp buttons (one per number) with pre-filled messages, plus optional Instagram/Facebook links if supplied, plus operating hours.
8. **Sticky floating WhatsApp button** — persistent on all viewports (bottom-right on desktop, safe-area-aware on mobile), always visible, pulses subtly once on load only (not repeatedly — avoid annoying motion).
9. **Footer** — business name, both WhatsApp numbers as tappable links, social links, copyright.

---

## 4. Tech stack

- **Framework:** Next.js (App Router), TypeScript, React 18+.
- **Styling:** Tailwind CSS with a custom theme extending the design tokens from `DESIGN.md` (colors, fonts, spacing) — no default Tailwind palette left in place.
- **Fonts:** self-hosted or `next/font` with the two chosen typefaces (e.g. via Google Fonts or supplied font files) — avoid render-blocking font loads; use `font-display: swap`.
- **Images:** `next/image` for all photography — automatic responsive sizing, lazy loading, blur placeholder.
- **Animation:** Framer Motion (or CSS-only) used sparingly per the motion guardrails above.
- **Forms (if a contact form is added in addition to WhatsApp):** simple serverless route or a form service — keep WhatsApp as the primary CTA regardless.
- **Deployment target:** static export or Node server via Docker, deployed through **Coolify** on the user's own server (see §7).

---

## 5. "Ruthless" ad/marketing engineering requirements

This is the section that makes the site fit for real ad spend. Implement all of it, cleanly, without breaking site speed or looking spammy:

### 5.1 Tracking & pixels
- **Meta Pixel** (Facebook/Instagram/WhatsApp ads) — install via `next/script`, fire `PageView` on load and a custom `Lead` (or `Contact`) event on every WhatsApp button click, keyed per section (e.g. `hero_whatsapp_click`, `service_lashes_whatsapp_click`) so ad performance can be attributed per service.
- **Google Tag Manager** container as the single source of truth for tags — wire GA4 through GTM so future pixels/tags can be added without a redeploy.
- **GA4** — pageviews, scroll depth, outbound WhatsApp click events, section-visibility events (which service section a visitor lingered on).
- **UTM parameter capture** — persist `utm_source/medium/campaign` from the landing URL into the WhatsApp pre-filled message or into a hidden dataLayer push, so Prisca can tell which ad brought each enquiry even though WhatsApp itself won't carry UTM data.
- **Server-side / Conversions API note:** flag in the repo README that a Meta Conversions API (server-side) integration is a strong next step for iOS14+ tracking resilience once the domain is live — out of scope for v1 unless the user asks.

### 5.2 Speed & Core Web Vitals (ad platforms reward and require this)
- Target **LCP < 2.5s, CLS ~0, INP < 200ms** on 4G mobile.
- Compress and serve all images as AVIF/WebP with `next/image`.
- Preload the hero image and critical fonts; defer everything else (analytics scripts loaded with `strategy="afterInteractive"` or `"lazyOnload"`).
- No layout shift from ads/pixels loading — reserve space for all async content.
- Lighthouse score target: 90+ on Performance, 100 on Best Practices/SEO/Accessibility for mobile.

### 5.3 SEO & shareability (organic + how the link looks when shared on WhatsApp/Facebook)
- Full `<title>`, meta description, canonical URL.
- Open Graph + Twitter Card tags with a custom share image (1200×630) featuring the logo/branding — this is exactly what renders when someone shares the link in WhatsApp or Facebook, so it must look intentional, not a random screenshot.
- `schema.org` **LocalBusiness** / **BeautySalon** structured data (JSON-LD) with name, services, phone, hours, geo (once address confirmed).
- `sitemap.xml`, `robots.txt`.
- Semantic HTML headings (one `<h1>` — the business name/value prop in the hero — then a clean `<h2>` per section).

### 5.4 Conversion design details
- Every WhatsApp CTA uses the `wa.me` deep link format with URL-encoded pre-filled text specific to context.
- Buttons large enough for thumb-tap on mobile (min 44×44px target), high color contrast against background, visible on the very first screen without scrolling (hero CTA above the fold on all breakpoints).
- No popups, no exit-intent modals, no auto-playing sound/video — these hurt ad-platform quality scores and feel the opposite of "premium."
- Fast tap-to-WhatsApp-app behavior on mobile (native app intent, not just a browser tab) — verify `wa.me` links open the app directly on iOS/Android.

### 5.5 Analytics events checklist (implement all)
- `page_view`
- `whatsapp_click` (with `location` and `service` params)
- `gallery_image_view`
- `scroll_75_percent`
- `section_view` for Services, Testimonials, Booking (via IntersectionObserver)

---

## 6. Responsiveness & device coverage

- Breakpoints: mobile (360–428px), large mobile/small tablet (~600px), tablet (768–1024px), laptop (1280px), large desktop (1536px+).
- Design mobile-first — the majority of Facebook/WhatsApp ad traffic will be mobile.
- Test the floating WhatsApp button against iOS safe-area insets and Android gesture-nav bars.
- Verify in Facebook's in-app browser and Instagram's in-app browser specifically (these are the actual browsers ad clicks open in, and they behave differently from Safari/Chrome — test `wa.me` deep-linking works from inside them).

---

## 7. Deployment (Coolify, self-hosted)

### 7.1 Git setup
Initialize the repo and push to GitHub with:

```bash
git remote add origin https://github.com/chihwayi/beauty-haven.git
git branch -M main
git push -u origin main
```

Do this as one of the first steps (after scaffolding the Next.js app and an initial commit), so Coolify can be pointed at the remote early and every subsequent step deploys via normal commits/pushes to `main`.

### 7.2 Coolify infrastructure access
The Coolify instance config, SSH access, and keys needed to connect this repo to the server are already available locally at:

```
../personal/coolify-nfra
```

Read whatever is in that path (SSH keys, Coolify API tokens/URLs, server details) to authenticate and configure the deployment — do not ask the user to re-paste credentials that are already present there. Treat everything in that folder as sensitive: never print key contents to chat/logs, never commit it into the `beauty-haven` repo, and add it (or its parent) to `.gitignore` if it's anywhere near the project directory.

### 7.3 Logo & brand assets
The logo file (and any other supplied brand assets/photos) will be placed in the project folder alongside this spec file. Before starting the design pass, check the project root for a logo file and any image assets — use the real logo/photos as the source of truth for the design system in §2 (re-derive palette from the logo if its colors differ from the placeholder table in §2.2), and slot real photos into the hero/gallery per §2.7 instead of placeholders wherever they're present. If a logo file isn't found, proceed with the §2 palette as specified and flag clearly in the PR/README that a logo still needs to be dropped in.

### 7.4 Build & deploy steps
1. Containerize the app with a production-ready multi-stage `Dockerfile` (Next.js standalone output mode for a small image).
2. Add a `docker-compose.yml` or Coolify-native build config as appropriate.
3. Environment variables to externalize (never hardcode): `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA4_ID`, WhatsApp numbers (so they can be changed without a rebuild), site URL for canonical/OG tags.
4. Set up the app as a new resource in Coolify (using the access from §7.2) pointing at `https://github.com/chihwayi/beauty-haven.git`; configure auto-deploy on push to `main`.
5. Configure the custom domain in Coolify with automatic SSL (Let's Encrypt via Coolify's built-in proxy).
6. Add a health-check endpoint (`/api/health`) so Coolify can monitor uptime.
7. Document in `README.md`: how to update copy/images/prices without touching code (ideally isolate all editable content — services list, prices, testimonials — into a single typed content file, e.g. `content/site.ts`, so the user or a non-developer can edit it later).

---

## 8. Accessibility & quality floor (non-negotiable even on a "short" project)

- Visible keyboard focus states on every interactive element.
- Sufficient color contrast (WCAG AA) even within the chosen feminine palette — test the accent colors against backgrounds.
- Alt text on every image (placeholder pattern ready for real photos: `"[Service name] at Beauty Haven — [description]"`).
- `prefers-reduced-motion` respected for all animation.
- Semantic landmarks (`<nav>`, `<main>`, `<footer>`) and correct heading order for screen readers.

---

## 9. Deliverables checklist for Claude Code

- [ ] `DESIGN.md` — token plan + one-paragraph critique/revision note per the frontend-design skill process
- [ ] Working Next.js app, fully responsive, with all sections from §3
- [ ] `content/site.ts` (or equivalent) isolating all editable copy, prices, services, testimonials
- [ ] Meta Pixel + GTM + GA4 wired with the event list in §5.5
- [ ] Open Graph share image + JSON-LD structured data
- [ ] Lighthouse report (mobile) showing target scores from §5.2
- [ ] Dockerfile + Coolify deployment config, documented `.env.example`
- [ ] `README.md` covering: local dev, adding real photos/logo, editing content, updating WhatsApp numbers/prices, and how to deploy (push to `main` → Coolify auto-deploys)
- [ ] Confirm with the user before final deploy: real logo, real photos, final services/prices, testimonials, business hours, and exact palette approval (show a screenshot/preview first)

---

## 10. Open questions to resolve with the user before/while building

The design system (§2), git remote (§7.1), Coolify access (§7.2), and logo location (§7.3) are already decided — Claude Code should proceed directly on those without asking. Still confirm:

- Exact service list + prices (USD? ZWL? both?)
- Business hours and whether walk-ins/address should be shown
- Real photos for hero/gallery beyond whatever's dropped in the project folder — source/generate tasteful, clearly-flagged placeholders for anything missing
- Instagram/Facebook page handles to link in footer
- Domain name already owned, and whether DNS is already pointed at the Coolify server
- Do both WhatsApp numbers get equal prominence, or is one primary and one backup?
