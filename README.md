# Saylor Beauty Spa — website

Single-page, conversion-focused marketing site for Saylor Beauty Spa (lash, nail & massage studio, owner: Prisca). Built with Next.js (App Router) + TypeScript + Tailwind CSS v4. Every call-to-action deep-links to WhatsApp; the whole site is one fast page designed to be the landing destination for Meta/Instagram ads.

> **Rename note:** this business traded as "Beauty Haven" during early build and was renamed to **Saylor Beauty Spa** on 2026-09-01 (the old name was already in wide use by other salons in Zimbabwe). All copy/metadata now reflect the new name — see "Brand assets" below for the one thing still outstanding: a real logo.

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

Things still marked placeholder as of this build, to confirm with Prisca:
- **Prices** for every service (currently indicative/sample).
- **Business hours** (currently a sensible guess: Mon–Fri 9–6, Sat 9–4, Sun closed).
- **Testimonials** (currently 3 sample quotes — swap for real client reviews).
- **Instagram/Facebook handles** (currently blank, so the footer social icons are hidden — add `social.instagram` / `social.facebook` URLs in `site.ts` to show them).
- **Address** — currently hidden (`business.showAddress = false`, appointment/WhatsApp-only). Set to `true` and fill in `business.address` if walk-ins should be advertised.

## Brand assets

### Logo — action needed
The site currently has **no real logo** for Saylor Beauty Spa. The nav badge, browser favicon, and the Open Graph share-image all render a generated text monogram ("S" on a plum circle) as a placeholder. The original `beauty-haven-logo.jpeg` in the project root can't be reused — it has the old business name baked into the image pixels.

`logo-design-brief.md` (project root) is a ready-to-paste brief for an AI image generator (or a human designer) to produce the new logo, matching the site's plum/rose/gold editorial design system. Once real logo files exist, swap the placeholders in:

- `src/components/Monogram.tsx` — nav badge
- `src/app/icon.tsx` — favicon
- `src/app/opengraph-image.tsx` — link-preview share image
- `public/images/logo.jpeg` — replace the file (or add a new one and repoint the three files above)

### Photos
`src/content/site.ts` → `gallery` array. Photos flagged `isStock: true` are licensed Unsplash stock photography (free license, no attribution required) standing in for services — lash extensions, facials, massage — that don't have real client photos yet. They're visibly labeled "Reference photo" on the site. Swap each one out for a real Saylor Beauty Spa photo as soon as it exists, by changing its `src` and setting `isStock: false`.

Two of the real (non-stock) nail photos still carry a small "beauty haven" script watermark baked into the JPEG from the old business name — cosmetic only, but worth reshooting without a watermark app next time so it doesn't need cropping around.

To add new gallery photos: drop the image file into `public/images/gallery/`, then add an entry to the `gallery` array in `src/content/site.ts` with a descriptive `alt` text (used for accessibility and SEO).

## Updating WhatsApp numbers

Two ways, pick one:

1. **No rebuild needed:** set `NEXT_PUBLIC_WHATSAPP_NUMBER_1` / `NEXT_PUBLIC_WHATSAPP_NUMBER_2` as environment variables in Coolify (digits only, country code first, no `+`), then redeploy.
2. **Or edit directly:** change the fallback values in `src/content/site.ts` → `whatsapp.numbers`.

Every "Book on WhatsApp" button anywhere on the site is generated from `defaultBookingMessage()` in `src/lib/whatsapp.ts`, which pulls the business name from `site.ts` automatically — renaming the business again only requires editing `business.name` in one place.

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

1. Push to `main` on `https://github.com/chihwayi/saylor-beauty-spa.git` — Coolify is configured to auto-deploy on push (once the Coolify resource is created and pointed at this repo).
2. Coolify builds via the included `Dockerfile` (multi-stage, Next.js `standalone` output — small final image).
3. Set the environment variables listed above (and the WhatsApp number overrides, if used) in the Coolify UI — do not hardcode them into the repo.
4. Coolify's built-in proxy handles the custom domain + automatic SSL (Let's Encrypt) once DNS points at the server.
5. `/api/health` returns `{"status":"ok"}` — point Coolify's health check at this route.

**Not yet done as part of this build:** the actual GitHub push and Coolify resource setup. The credentials/SSH access this project's brief expected at `../coolify-nfra` weren't present on this machine when the site was built, so the repo has been prepared (Dockerfile, `.env.example`, health check, auto-deploy-ready) but not connected to a live Coolify instance or pushed to GitHub. To finish deployment: create the GitHub repo, push this code, then in Coolify create a new resource pointed at it and follow steps 3–5 above.

## Tech notes

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (theme tokens live in `src/app/globals.css` under `@theme`, not a `tailwind.config.ts` — this is Tailwind v4's native approach).
- No `framer-motion` — all motion is CSS-only (keyframes in `globals.css`), which is lighter and sufficient for the motion guardrails in the design brief (`prefers-reduced-motion` fully respected).
- Icons: `lucide-react`, except Instagram/Facebook (dropped from recent lucide-react releases) which are small hand-written inline SVGs in `Footer.tsx`.
- Images are served via `next/image` (automatic AVIF/WebP, lazy loading, responsive `sizes`) — the hero image is the one exception, loaded with `priority` since it's above the fold.
