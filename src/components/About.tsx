import Image from "next/image";
import { business } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="bg-haven-cream px-5 lg:px-16 py-16 md:py-28">
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden order-2 md:order-1">
          <Image
            src="/images/gallery/nail-art-03.jpg"
            alt={`Client showing off a fresh nail set from ${business.name}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-display text-[1.75rem] md:text-[2.75rem] font-semibold text-haven-plum text-balance">
            About {business.ownerName}
          </h2>
          <div className="mt-4 h-px w-16 bg-haven-gold" aria-hidden="true" />
          <p className="mt-6 text-haven-ink/85 leading-relaxed">
            {business.ownerName} founded {business.name} to bring boutique-studio
            care to every appointment in Harare — meticulous lash and nail
            work that leaves every client with the same promise behind the
            name: look well, feel well, be well.
          </p>
          <p className="mt-4 text-haven-ink/85 leading-relaxed">
            Booking is simple by design — message {business.ownerName} directly on
            WhatsApp, and she&apos;ll confirm your slot personally.
          </p>
        </div>
      </div>
    </section>
  );
}
