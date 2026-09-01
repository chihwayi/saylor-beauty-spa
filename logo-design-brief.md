# Saylor Beauty Spa — Logo Design Brief

Written to hand to an AI image generator (Gemini, Nano Banana, etc.) or a human designer to produce the new logo. The current placeholder logo (`beauty-haven-logo.jpeg`) belongs to the old business name and can't be reused — everything below is for a clean, from-scratch mark for **Saylor Beauty Spa**.

---

## 1. The brand, in one paragraph

Saylor Beauty Spa is a boutique lash, nail, and massage-therapy studio (owner: Prisca) in Zimbabwe, positioned as premium and editorial rather than a typical strip-mall nail bar. The website it needs to sit on is deliberately restrained and magazine-like — warm plum and rose tones, a serif display typeface, a single hairline gold accent — not a bright, busy, "girly Canva template" look. The logo should read as quietly expensive: the kind of mark you'd find on a boutique spa's door plaque, not a sticker on a mirror.

## 2. What to avoid (the old logo's mistakes)

The previous "Beauty Haven" logo was a circular badge with a gradient ring (navy fading into hot magenta/pink), a coral braided-hair silhouette of a woman's profile, and a bold sans wordmark with a drop shadow. It read as a generic, free Canva salon-logo template. Specifically avoid:

- Rainbow/multi-hue gradient rings or borders.
- Stock "woman's face/profile silhouette" clip-art — overused in the beauty-salon logo space.
- Drop shadows, bevels, or glossy 3D effects.
- More than 2–3 colors total.
- Script/cursive "beauty salon" fonts (e.g. anything that looks like a nail-polish label).
- Any literal eyelash, nail-polish-bottle, or spa-stone clipart icon — too on-the-nose.

## 3. Design direction

- **Feel:** quiet luxury, boutique, editorial — think a high-end hotel spa or a fashion-adjacent beauty studio, not a strip-mall salon.
- **Form:** a wordmark-led design (the name "Saylor" carries most of the weight — it reads as a proper name, almost fashion-house-like, e.g. how a perfume or atelier brand would set its own name). A small, restrained mark/monogram can accompany it but shouldn't dominate.
- **Monogram option (if a symbol is wanted at all):** a single abstract initial "S" — rendered as a clean, slightly custom serif or a minimal line-drawn curve (echoing an "S" the way a ribbon or a single brushstroke would, but flat/vector, not literal ribbon clipart) — never a full illustrated woman/face.
- **Composition:** should work as (a) a horizontal lockup — mark + wordmark side by side, for the website nav and letterhead — and (b) a standalone circular or square mark alone, for social media profile photos and the favicon, where the wordmark won't be legible at small sizes.

## 4. Typography

- Primary reference typeface used sitewide: **Fraunces** — a warm, editorial serif with soft, slightly quirky contrast (not a rigid classic serif like Times, not a script). The wordmark doesn't need to literally be set in Fraunces, but should share its character: warm, a little soft in the curves, confident weight, feminine without being decorative or script-y.
- No condensed, no ultra-thin hairline type (needs to survive shrinking to a ~40px social avatar).
- Avoid any typeface that reads as "handwritten calligraphy" or "nail salon signage."

## 5. Color palette (use these exact hexes, or a tight variation)

| Token | Hex | Role |
|---|---|---|
| Plum (primary dark) | `#3D1F2B` | Main ink color / dark background version |
| Rose (accent) | `#B5495B` | Optional single accent — use sparingly |
| Cream (background) | `#FBF6F1` | Light background version |
| Gold (spot metallic) | `#C79A5B` | At most one thin accent line, dot, or stroke — never a fill |

Rule of thumb: the logo should work as a **single ink color on cream** (plum-on-cream) as its primary version, with the gold used only as one small, restrained detail (e.g. a single fine line under/through the mark) — not a gradient, not a full-color illustration.

## 6. What to explicitly generate

Ask for all of the following as separate outputs from the same concept, so they can be dropped straight into the website and socials without further editing:

1. **Primary horizontal lockup** — mark + "Saylor Beauty Spa" wordmark, plum ink on transparent/cream background. For the website header and printed materials.
2. **Standalone mark only** (no wordmark) — square canvas, centered, generous padding — for use as a circular crop. This becomes the website favicon, WhatsApp Business profile photo, and Instagram/Facebook profile photo (all of which crop to a circle, so keep the important content within the center ~80% of the frame).
3. **Reversed / light-on-dark version** — cream or white ink on a plum (`#3D1F2B`) solid background — for the site's dark footer and for dark-mode social banners.
4. **Monochrome black version** — for contexts where color isn't available (e.g. embroidery on towels/uniforms, stamped receipts).

Formats: vector-quality PNG at minimum 2000×2000px (transparent background) for each version above, so they can be resized down for favicon/social use without quality loss.

## 7. Where each version will actually be used (for context, not to be included in the artwork)

- Website nav bar (small, ~44px tall) and footer.
- Browser favicon / tab icon (very small, circular-safe area matters).
- Open Graph / link-preview share image (logo sits inside a 1200×630 card).
- Instagram, Facebook, and WhatsApp Business profile photos (all circular crops).
- Printed material Prisca may produce later (business cards, appointment cards).

## 8. One-paragraph prompt you can paste directly into an image generator

> Design a minimalist, boutique logo for "Saylor Beauty Spa," a premium lash, nail, and massage-therapy studio. Editorial, quiet-luxury aesthetic — think a high-end hotel spa or fashion atelier, not a typical nail-salon template. Use a warm, confident serif wordmark for "Saylor Beauty Spa" (character similar to the typeface Fraunces: soft contrast, warm curves, not script, not condensed). Optionally pair it with a small, abstract, flat monogram "S" — no illustrated woman's face/profile, no clipart icons of nails/lashes/polish bottles, no gradients, no drop shadows or 3D bevels. Color palette: deep plum ink (#3D1F2B) as the primary color on a warm cream background (#FBF6F1), with at most one thin gold (#C79A5B) accent line or dot — never a full gold fill. Deliver a horizontal lockup version and a separate square/circular standalone mark version (content centered, safe for circular cropping), plus a reversed cream-on-plum version. Flat vector style, transparent background, no photographic textures.

---

## 9. After the new logo arrives

Once the real logo files are dropped into the project (see `README.md` → "Brand assets"), the generated placeholders should be swapped out in code:

- `src/components/Monogram.tsx` (nav badge) → replace with `next/image` pointing at the new standalone mark.
- `src/app/icon.tsx` (favicon) → replace with a static icon file or regenerate from the new mark.
- `src/app/opengraph-image.tsx` (share-link preview image) → swap the generated monogram circle for the real logo file, same pattern as before.
- `public/images/logo.jpeg` → replace the file itself (or add a new one and update the three references above).
