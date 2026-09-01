"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/content/site";
import { trackGalleryImageView } from "@/lib/analytics";
import SectionView from "@/components/SectionView";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % gallery.length));

  useEffect(() => {
    if (activeIndex === null) return;
    trackGalleryImageView(activeIndex, gallery[activeIndex].alt);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <SectionView
      id="gallery"
      section="gallery"
      className="bg-haven-blush px-5 lg:px-16 py-16 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="font-display text-[1.75rem] md:text-[2.75rem] font-semibold text-haven-plum text-balance">
          Gallery
        </h2>
        <p className="mt-3 text-haven-ink/80 max-w-lg">
          Real work from the studio — plus a few reference photos, clearly marked, while
          we build out our full lash and facial portfolio.
        </p>

        <div className="mt-10 columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {gallery.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative mb-4 block w-full overflow-hidden rounded-xl group break-inside-avoid"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={800}
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {item.isStock && (
                <span className="absolute bottom-2 left-2 rounded-full bg-haven-plum/80 px-2.5 py-1 text-[0.6875rem] font-medium text-haven-white">
                  Reference photo
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-haven-plum/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-5 right-5 text-haven-white p-2 hover:text-haven-gold transition-colors"
          >
            <X className="size-7" />
          </button>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 md:left-8 text-haven-white p-2 hover:text-haven-gold transition-colors"
          >
            <ChevronLeft className="size-8" />
          </button>
          <div className="relative max-w-3xl w-full max-h-[80vh] aspect-[3/4]">
            <Image
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 md:right-8 text-haven-white p-2 hover:text-haven-gold transition-colors"
          >
            <ChevronRight className="size-8" />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-haven-blush text-sm max-w-md text-center px-4">
            {gallery[activeIndex].alt}
          </p>
        </div>
      )}
    </SectionView>
  );
}
