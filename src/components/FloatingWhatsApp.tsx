"use client";

import { buildWhatsAppLink, defaultBookingMessage } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { trackWhatsAppClick } from "@/lib/analytics";
import { useUtm } from "@/components/UtmProvider";

export default function FloatingWhatsApp() {
  const utm = useUtm();

  return (
    <a
      href={buildWhatsAppLink(defaultBookingMessage(), 0, utm)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating_button")}
      aria-label="Book on WhatsApp"
      className="fixed z-40 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] flex items-center justify-center size-14 rounded-full bg-haven-rose text-haven-white shadow-haven hover:bg-haven-plum hover:-translate-y-0.5 transition-all duration-150 animate-pulse-once"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
