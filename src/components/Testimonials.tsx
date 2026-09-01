import { Star } from "lucide-react";
import { testimonials } from "@/content/site";
import SectionView from "@/components/SectionView";

export default function Testimonials() {
  return (
    <SectionView
      id="testimonials"
      section="testimonials"
      className="bg-haven-blush px-5 lg:px-16 py-16 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="font-display text-[1.75rem] md:text-[2.75rem] font-semibold text-haven-plum text-balance">
          What clients say
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="rounded-xl bg-haven-white p-7 border border-haven-plum/10"
            >
              <div className="flex gap-1" aria-hidden="true">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-haven-gold text-haven-gold" />
                ))}
              </div>
              <blockquote className="mt-4 text-haven-ink/85 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-haven-plum">
                {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SectionView>
  );
}
