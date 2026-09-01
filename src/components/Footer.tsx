import Image from "next/image";
import { business, social, whatsapp } from "@/content/site";
import { buildWhatsAppLink, defaultBookingMessage } from "@/lib/whatsapp";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5" aria-hidden="true">
      <path d="M15 8.5h-2c-.8 0-1.5.7-1.5 1.5v2h3.3l-.5 3h-2.8v7h-3v-7H8v-3h1.5v-2.3C9.5 7.5 11 6 13.5 6H15v2.5z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-haven-plum text-haven-blush px-5 lg:px-16 py-12">
      <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row md:justify-between gap-8">
        <div>
          <Image
            src="/images/logo/lockup-dark.jpg"
            alt={business.name}
            width={220}
            height={123}
            className="w-44 h-auto -ml-1"
          />
          <p className="mt-3 text-sm max-w-xs">{business.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-haven-white uppercase tracking-wide">
            WhatsApp
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {whatsapp.numbers.map((n, i) => (
              <li key={n.e164}>
                <a
                  href={buildWhatsAppLink(defaultBookingMessage(), i as 0 | 1)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-haven-gold transition-colors"
                >
                  {n.label}: +{n.e164}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {(social.instagram || social.facebook) && (
          <div>
            <h3 className="text-sm font-medium text-haven-white uppercase tracking-wide">
              Follow
            </h3>
            <div className="mt-3 flex gap-4">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${business.name} on Instagram`}
                  className="hover:text-haven-gold transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${business.name} on Facebook`}
                  className="hover:text-haven-gold transition-colors"
                >
                  <FacebookIcon />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-[1280px] mt-10 pt-6 border-t border-haven-white/10 text-xs text-haven-blush/70">
        © {year} {business.name}. All rights reserved.
      </div>
    </footer>
  );
}
