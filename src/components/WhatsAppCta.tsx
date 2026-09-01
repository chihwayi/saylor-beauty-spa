"use client";

import { MessageCircle } from "lucide-react";
import clsx from "clsx";
import { buildWhatsAppLink, type WhatsAppNumberIndex } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { useUtm } from "@/components/UtmProvider";

interface WhatsAppCtaProps {
  message: string;
  location: string;
  service?: string;
  numberIndex?: WhatsAppNumberIndex;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
}

export default function WhatsAppCta({
  message,
  location,
  service,
  numberIndex = 0,
  children,
  variant = "primary",
  size = "md",
  icon = true,
  className,
}: WhatsAppCtaProps) {
  const utm = useUtm();

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-150 ease-out min-h-11 focus-visible:outline-2 focus-visible:outline-haven-gold";

  const variants = {
    primary:
      "bg-haven-rose text-haven-white hover:bg-haven-plum hover:-translate-y-0.5 shadow-haven",
    secondary:
      "bg-haven-cream text-haven-plum border border-haven-plum/20 hover:bg-haven-blush hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-haven-white border border-haven-white/70 hover:bg-haven-white/10 hover:-translate-y-0.5",
  };

  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <a
      href={buildWhatsAppLink(message, numberIndex, utm)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(location, service)}
      className={clsx(base, variants[variant], sizes[size], className)}
    >
      {icon && <MessageCircle className="size-4" aria-hidden="true" />}
      {children}
    </a>
  );
}
