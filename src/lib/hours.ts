import { openingHours, type DaySchedule, type Weekday } from "@/content/site";

// Zimbabwe (CAT) is a fixed UTC+2 offset year-round — no DST — so computing "is the
// studio open" from the visitor's own clock would be wrong for anyone outside Harare.
// Always resolve the current day/time in the studio's timezone instead.
const STUDIO_TIMEZONE = "Africa/Harare";

const WEEK_ORDER: Weekday[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DISPLAY_ORDER: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}:00 ${period}` : `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function getStudioNow(now: Date): { weekday: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: STUDIO_TIMEZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")!.value as Weekday;
  // hour can read "24" for midnight in some environments — normalize.
  const hour = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")!.value);
  return { weekday, minutes: hour * 60 + minute };
}

function scheduleFor(day: Weekday): DaySchedule {
  return openingHours.find((h) => h.day === day)!;
}

export interface OpenStatus {
  isOpen: boolean;
  label: "Open now" | "Closed";
  detail: string;
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { weekday, minutes } = getStudioNow(now);
  const todayIndex = WEEK_ORDER.indexOf(weekday);
  const today = scheduleFor(weekday);

  if (today.open && today.close) {
    const openMin = toMinutes(today.open);
    const closeMin = toMinutes(today.close);
    if (minutes >= openMin && minutes < closeMin) {
      return { isOpen: true, label: "Open now", detail: `Closes at ${formatTime(today.close)}` };
    }
    if (minutes < openMin) {
      return { isOpen: false, label: "Closed", detail: `Opens today at ${formatTime(today.open)}` };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const nextDay = WEEK_ORDER[(todayIndex + i) % 7];
    const next = scheduleFor(nextDay);
    if (next.open) {
      const when = i === 1 ? "tomorrow" : nextDay;
      return { isOpen: false, label: "Closed", detail: `Opens ${when} at ${formatTime(next.open)}` };
    }
  }

  return { isOpen: false, label: "Closed", detail: "Message us on WhatsApp for availability" };
}

export function getTodayWeekday(now: Date = new Date()): Weekday {
  return getStudioNow(now).weekday;
}

export interface GroupedHours {
  label: string;
  time: string;
  days: Weekday[];
}

// Merges consecutive days that share identical hours (e.g. Mon–Fri) into one display row,
// so editing openingHours per-day in site.ts never requires manually re-grouping the UI.
export function getGroupedHours(): GroupedHours[] {
  const sorted = DISPLAY_ORDER.map(scheduleFor);
  const groups: GroupedHours[] = [];

  for (const entry of sorted) {
    const timeLabel = entry.open && entry.close ? `${formatTime(entry.open)} – ${formatTime(entry.close)}` : "Closed";
    const last = groups[groups.length - 1];
    if (last && last.time === timeLabel) {
      last.days.push(entry.day);
    } else {
      groups.push({ label: entry.day, time: timeLabel, days: [entry.day] });
    }
  }

  return groups.map((g) => ({
    ...g,
    label: g.days.length > 1 ? `${g.days[0]} – ${g.days[g.days.length - 1]}` : g.days[0],
  }));
}
