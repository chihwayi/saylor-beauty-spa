import Image from "next/image";
import { business } from "@/content/site";
import WhatsAppCta from "@/components/WhatsAppCta";
import { defaultBookingMessage } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92svh] flex items-end md:items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/nail-art-06-hero.jpg"
          alt="Close-up of hand-painted gel nail art at Saylor Beauty Spa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_30%] md:object-[65%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-haven-plum via-haven-plum/80 md:via-haven-plum/55 to-haven-plum/10 md:to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1280px] w-full px-5 lg:px-16 pb-14 pt-32 md:py-32">
        <div className="max-w-xl animate-rise-fade opacity-0">
          <h1 className="font-display text-[2.25rem] leading-[1.1] md:text-[4rem] font-semibold text-haven-white text-balance">
            {business.name}
          </h1>
          <p className="mt-2 text-sm font-medium uppercase tracking-wide text-haven-gold">
            Nail Salon &amp; Lash Studio in Harare
          </p>
          <div
            className="mt-4 h-px w-20 bg-haven-gold"
            aria-hidden="true"
          />
          <p className="mt-5 text-base md:text-lg text-haven-blush max-w-md text-pretty">
            {business.valueProposition}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <WhatsAppCta
              message={defaultBookingMessage()}
              location="hero"
              size="lg"
            >
              Book on WhatsApp
            </WhatsAppCta>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-haven-white/70 text-haven-white px-8 py-4 text-base font-medium hover:bg-haven-white/10 hover:-translate-y-0.5 transition-all duration-150"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
