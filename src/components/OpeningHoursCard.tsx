"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getGroupedHours, getOpenStatus, getTodayWeekday, type OpenStatus } from "@/lib/hours";
import type { Weekday } from "@/content/site";

const groupedHours = getGroupedHours();

export default function OpeningHoursCard() {
  // Rendered client-side only: the studio's open/closed state depends on the current
  // moment in Africa/Harare time, which a statically-generated page can't know at build time.
  const [status, setStatus] = useState<OpenStatus | null>(null);
  const [today, setToday] = useState<Weekday | null>(null);

  useEffect(() => {
    const tick = () => {
      setStatus(getOpenStatus());
      setToday(getTodayWeekday());
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-start gap-3">
      <Clock className="size-5 text-haven-gold shrink-0 mt-0.5" aria-hidden="true" />
      <div className="w-full">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3 className="font-display text-[1.25rem] font-semibold text-haven-white">
            Opening hours
          </h3>
          {status && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                status.isOpen
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "bg-haven-white/10 text-haven-blush"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${status.isOpen ? "bg-emerald-400" : "bg-haven-blush/50"}`}
                aria-hidden="true"
              />
              {status.label}
            </span>
          )}
        </div>
        {status && <p className="mt-1 text-xs text-haven-blush/80">{status.detail}</p>}

        <dl className="mt-3 space-y-1.5 text-sm text-haven-blush">
          {groupedHours.map((g) => {
            const isToday = today != null && g.days.includes(today);
            return (
              <div
                key={g.label}
                className={`flex justify-between gap-4 rounded-md px-1.5 -mx-1.5 py-0.5 ${
                  isToday ? "bg-haven-white/10 text-haven-white font-medium" : ""
                }`}
              >
                <dt>{g.label}</dt>
                <dd>{g.time}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
