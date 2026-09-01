/**
 * Single source of truth for editable site copy.
 * Non-developers: edit the values below (keep the quotes) and push to `main` — Coolify redeploys automatically.
 * Anything marked PLACEHOLDER is sample content and should be swapped for the real thing before launch.
 */

export const business = {
  name: "Saylor Beauty Spa",
  tagline: "Look Well, Feel Well, Be Well",
  valueProposition: "Premium lash, nail & massage therapy — booked in one tap.",
  ownerName: "Prisca",
  // Set to false to hide the address/map and stay appointment-only (recommended for now).
  showAddress: false,
  address: "PLACEHOLDER — ask Prisca for the studio address if walk-ins are welcome",
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { days: "Saturday", time: "9:00 AM – 4:00 PM" },
    { days: "Sunday", time: "Closed" },
  ], // PLACEHOLDER — confirm real hours with Prisca
};

export const whatsapp = {
  // Overridable via NEXT_PUBLIC_WHATSAPP_NUMBER_1/2 (digits only, country code first, no "+")
  // so the numbers can be changed per-deploy without editing this file.
  numbers: [
    { label: "Book with Prisca", e164: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_1 || "263717242438" },
    { label: "Book — Line 2", e164: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_2 || "263774165704" },
  ],
};

export type ServiceCategory =
  | "Lashes"
  | "Nails"
  | "Massage"
  | "More";

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  priceFrom: string; // e.g. "$25" — PLACEHOLDER pricing, confirm with Prisca before launch
  image?: string;
}

// PLACEHOLDER pricing — confirm the real service list & prices with Prisca before going live.
export const services: Service[] = [
  {
    id: "lash-extensions",
    category: "Lashes",
    name: "Eyelash Extensions",
    description: "Classic, hybrid or volume lash sets, tailored to your natural eye shape.",
    priceFrom: "$25",
    image: "/images/gallery/lash-closeup-stock.jpg",
  },
  {
    id: "lash-lift",
    category: "Lashes",
    name: "Lash Lift & Tint",
    description: "A natural, no-extension curl and tint that lasts weeks without upkeep.",
    priceFrom: "$20",
    image: "/images/gallery/lash-lift-stock.jpg",
  },
  {
    id: "manicure",
    category: "Nails",
    name: "Manicure",
    description: "Classic or gel manicure with cuticle care and a flawless finish.",
    priceFrom: "$10",
    image: "/images/gallery/nail-art-05.jpg",
  },
  {
    id: "pedicure",
    category: "Nails",
    name: "Pedicure",
    description: "Relaxing soak, exfoliation and polish to keep your feet camera-ready.",
    priceFrom: "$12",
  },
  {
    id: "nail-art",
    category: "Nails",
    name: "Nail Art / Gel & Acrylic",
    description: "Custom gel or acrylic sets — French tips, chrome, hand-painted art and more.",
    priceFrom: "$15",
    image: "/images/gallery/nail-art-06-hero.jpg",
  },
  {
    id: "massage",
    category: "Massage",
    name: "Full Body & Relaxation Massage",
    description: "Swedish and deep-tissue techniques to release tension and restore calm.",
    priceFrom: "$30",
    image: "/images/gallery/massage-spa-stock.jpg",
  },
  {
    id: "facials",
    category: "More",
    name: "Facials",
    description: "Coming soon — ask on WhatsApp about availability. Cleansing, exfoliating and hydrating facials tailored to your skin.",
    priceFrom: "TBC",
    image: "/images/gallery/facial-mask-stock.jpg",
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

// PLACEHOLDER testimonials — swap for real client quotes/ratings before launch.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Prisca has the gentlest hands and the best eye for detail — my lashes have never looked so natural yet full.",
    author: "Tanya M.",
    rating: 5,
  },
  {
    id: "t2",
    quote: "Booked over WhatsApp in two minutes and was seen the same week. The nail art lasted a full month.",
    author: "Rufaro K.",
    rating: 5,
  },
  {
    id: "t3",
    quote: "The massage room is so calming — exactly the reset I needed. Already booked my next appointment.",
    author: "Chiedza P.",
    rating: 5,
  },
];

export const social = {
  // PLACEHOLDER — add real handles once supplied.
  instagram: "",
  facebook: "",
};

// `isStock: true` items are licensed stock photography (free Unsplash License, no attribution
// required) used to represent services — lashes, facials, massage — that Saylor Beauty Spa doesn't
// yet have real client photos for. Swap each one out for a real studio photo as soon as it's
// available; until then they're clearly flagged in the UI so nothing is presented as real client work.
// Note: two of the real (non-stock) photos below still carry a small "beauty haven" script
// watermark baked into the JPEG from the old business name — flagged in README, reshoot when possible.
export const gallery = [
  { src: "/images/gallery/nail-art-06-hero.jpg", alt: "Gel nail art with French tips and hand-painted detail at Saylor Beauty Spa", isStock: false },
  { src: "/images/gallery/lash-closeup-stock.jpg", alt: "Close-up of long, natural-looking eyelash extensions", isStock: true },
  { src: "/images/gallery/nail-art-03.jpg", alt: "Purple French-tip acrylic nails with charm details at Saylor Beauty Spa", isStock: false },
  { src: "/images/gallery/facial-treatment-stock.jpg", alt: "Client relaxing during a facial massage treatment", isStock: true },
  { src: "/images/gallery/nail-art-07.jpg", alt: "Bow nail art on green French-tip acrylics at Saylor Beauty Spa", isStock: false },
  { src: "/images/gallery/massage-back-stock.jpg", alt: "Therapist performing a relaxing back massage", isStock: true },
  { src: "/images/gallery/nail-art-01.jpg", alt: "Gold French-tip gel manicure at Saylor Beauty Spa", isStock: false },
  { src: "/images/gallery/nail-art-02.jpg", alt: "Long gel manicure with fine gold tips at Saylor Beauty Spa", isStock: false },
  { src: "/images/gallery/facial-mask-stock.jpg", alt: "Client receiving a hydrating facial mask treatment", isStock: true },
  { src: "/images/gallery/nail-art-08.jpg", alt: "Coral French-tip manicure at Saylor Beauty Spa", isStock: false },
  { src: "/images/gallery/massage-spa-stock.jpg", alt: "Relaxing spa massage in a calm, warmly lit room", isStock: true },
  { src: "/images/gallery/nail-art-04.jpg", alt: "Clear gel nail extensions in progress at Saylor Beauty Spa", isStock: false },
] as const;

export const seo = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://saylorbeautyspa.example.com", // PLACEHOLDER — set NEXT_PUBLIC_SITE_URL once domain is live
  title: "Saylor Beauty Spa — Lash, Nail & Massage Studio | Book on WhatsApp",
  description:
    "Saylor Beauty Spa is a premium boutique lash, nail and massage studio run by Prisca. Book your appointment instantly on WhatsApp.",
};
