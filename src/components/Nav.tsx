"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { business } from "@/content/site";
import WhatsAppCta from "@/components/WhatsAppCta";
import { defaultBookingMessage } from "@/lib/whatsapp";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#booking", label: "Book Now" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-haven-cream/90 backdrop-blur border-b border-haven-plum/10">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-16 h-18 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <span className="relative size-11 rounded-full overflow-hidden shadow-sm">
            <Image
              src="/images/logo/mark.jpg"
              alt={`${business.name} logo`}
              fill
              sizes="44px"
              className="object-cover scale-110"
            />
          </span>
          <span className="font-display text-lg font-semibold text-haven-plum tracking-tight">
            {business.name}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-haven-ink hover:text-haven-rose transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppCta
            message={defaultBookingMessage()}
            location="nav"
          >
            Book on WhatsApp
          </WhatsAppCta>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-haven-plum"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="md:hidden border-t border-haven-plum/10 bg-haven-cream px-5 py-4 flex flex-col gap-4"
          aria-label="Mobile"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-haven-ink"
            >
              {link.label}
            </a>
          ))}
          <WhatsAppCta
            message={defaultBookingMessage()}
            location="nav_mobile"
            className="w-full"
          >
            Book on WhatsApp
          </WhatsAppCta>
        </nav>
      )}
    </header>
  );
}
