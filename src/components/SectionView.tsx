"use client";

import { useEffect, useRef } from "react";
import { trackSectionView } from "@/lib/analytics";

export default function SectionView({
  id,
  section,
  className,
  children,
}: {
  id: string;
  section: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            trackSectionView(section);
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [section]);

  return (
    <section id={id} ref={ref} className={className}>
      {children}
    </section>
  );
}
