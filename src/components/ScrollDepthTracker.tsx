"use client";

import { useEffect, useRef } from "react";
import { pushDataLayer, trackScrollDepth } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 90];

export default function ScrollDepthTracker() {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    pushDataLayer({ event: "page_view" });

    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const percentScrolled = (window.scrollY / scrollable) * 100;

      for (const threshold of THRESHOLDS) {
        if (percentScrolled >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
