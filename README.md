# Saylor Beauty Spa — website

Single-page, conversion-focused marketing site for Saylor Beauty Spa (lash, nail & massage studio, owner: Prisca). Built with Next.js (App Router) + TypeScript + Tailwind CSS v4. Every call-to-action deep-links to WhatsApp; the whole site is one fast page designed to be the landing destination for Meta/Instagram ads.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # run the production build locally
npm run lint
```

Copy `.env.example` to `.env.local` to set analytics IDs / site URL for local testing (all optional — the site works with none of them set, it just won't fire pixel/GTM/GA4 events).

## Editing content (no code changes needed)

Everything editable — services, prices, testimonials, business hours, WhatsApp numbers, social links, SEO copy — lives in one file:

```
src/content/site.ts
```

Open it, edit the values between quotes, save, commit, and push to `main`. Coolify redeploys automatically. Anything marked `PLACEHOLDER` in that file is sample content and should be replaced with the real thing before the site is promoted in ads.

Things still marked placeholder, to confirm with Prisca:
- **Prices** for every service (currently indicative/sample).
- **Business hours** (currently a sensible guess: Mon–Fri 9–6, Sat 9–4, Sun closed).
- **Testimonials** (currently 3 sample quotes — swap for real client reviews).
- **Instagram/Facebook handles** (currently blank, so the footer social icons are hidden — add `social.instagram` / `social.facebook` URLs in `site.ts` to show them).
- **Address** — currently hidden (`business.showAddress = false`, appointment/WhatsApp-only). Set to `true` and fill in `business.address` if walk-ins should be advertised.

## Brand assets

### Logo
`public/images/logo/` holds the production logo set — `mark.jpg` (nav badge), `lockup-light.jpg` / `lockup-dark.jpg`, and `mono.jpg`. Wired into the nav badge (`src/components/Monogram.tsx`), browser favicon (`src/app/icon.tsx`), and the Open Graph share-image (`src/app/opengraph-image.tsx`). `logo-design-brief.md` documents the original design brief, kept for reference if the logo ever needs regenerating or extending (e.g. new sizes/formats).

### Photos
`src/content/site.ts` → `gallery` array. Photos flagged `isStock: true` are licensed Unsplash stock photography (free license, no attribution required) standing in for services — lash extensions, facials, massage — that don't have real client photos yet. They're visibly labeled "Reference photo" on the site. Swap each one out for a real Saylor Beauty Spa photo as soon as it exists, by changing its `src` and setting `isStock: false`.

To add new gallery photos: drop the image file into `public/images/gallery/`, then add an entry to the `gallery` array in `src/content/site.ts` with a descriptive `alt` text (used for accessibility and SEO).

## Updating WhatsApp numbers

Two ways, pick one:

1. **No rebuild needed:** set `NEXT_PUBLIC_WHATSAPP_NUMBER_1` / `NEXT_PUBLIC_WHATSAPP_NUMBER_2` as environment variables in Coolify (digits only, country code first, no `+`), then redeploy.
2. **Or edit directly:** change the fallback values in `src/content/site.ts` → `whatsapp.numbers`.

Every "Book on WhatsApp" button anywhere on the site is generated from `defaultBookingMessage()` in `src/lib/whatsapp.ts`, which pulls the business name from `site.ts` automatically.

## Analytics & tracking

Set these as environment variables (Coolify → app → Environment Variables, or `.env.local` for local dev). Leave any of them blank to disable that integration — nothing breaks if they're unset.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container (e.g. `GTM-XXXXXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta/Facebook Pixel ID |
| `NEXT_PUBLIC_GA4_ID` | GA4 Measurement ID (e.g. `G-XXXXXXXXXX`), wired directly for pageviews/events; can also be routed through GTM instead |
| `NEXT_PUBLIC_SITE_URL` | Full production URL, no trailing slash — used for canonical tags, Open Graph/Twitter cards, sitemap, robots.txt |

Events fired automatically (to `window.dataLayer`, and to the Meta Pixel as a custom event + a `Contact` conversion): `page_view`, `whatsapp_click` (tagged with `location` and `service`, e.g. `service_lash-extensions_whatsapp_click`), `gallery_image_view`, `scroll_25/50/75/90_percent`, `section_view` (services, gallery, testimonials, booking). UTM params (`utm_source`/`utm_medium`/`utm_campaign`) are captured from the landing URL and appended to the WhatsApp pre-filled message, since WhatsApp itself strips query strings.

**Next step once the domain is live:** a server-side Meta Conversions API integration would meaningfully improve tracking resilience against iOS14+ ad-tracking limits. Out of scope for this build — flagging here as recommended follow-up work.

## Deployment (Coolify)

Deployed on Coolify, auto-deploy on push to `main` at `https://github.com/chihwayi/saylor-beauty-spa.git`.

1. Coolify builds via the included `Dockerfile` (multi-stage, Next.js `standalone` output — small final image). Build stage runs `npm ci --include=dev` since Tailwind and TypeScript are devDependencies needed at build time.
2. The runtime stage sets `HOSTNAME=0.0.0.0` explicitly — Next's standalone `server.js` binds to `process.env.HOSTNAME`, and Docker sets that variable to the container ID by default, which breaks the loopback healthcheck if left unset.
3. Environment variables (analytics IDs, WhatsApp number overrides) are set in the Coolify UI — not hardcoded into the repo.
4. Coolify's built-in proxy handles HTTPS (Let's Encrypt) automatically via the assigned `sslip.io` domain, or a custom domain once DNS points at the server.
5. `/api/health` returns `{"status":"ok"}` — used for both Docker's `HEALTHCHECK` and Coolify's own healthcheck.

## Tech notes

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (theme tokens live in `src/app/globals.css` under `@theme`, not a `tailwind.config.ts` — this is Tailwind v4's native approach).
- No `framer-motion` — all motion is CSS-only (keyframes in `globals.css`), which is lighter and sufficient for the motion guardrails in the design brief (`prefers-reduced-motion` fully respected).
- Icons: `lucide-react`, except Instagram/Facebook (dropped from recent lucide-react releases) which are small hand-written inline SVGs in `Footer.tsx`.
- Images are served via `next/image` (automatic AVIF/WebP, lazy loading, responsive `sizes`) — the hero image is the one exception, loaded with `priority` since it's above the fold.
