import { business, whatsapp } from "@/content/site";

export type WhatsAppNumberIndex = 0 | 1;

/**
 * Builds a wa.me deep link with a URL-encoded, context-specific pre-filled message.
 * Appends captured UTM params (if present) to the message so Prisca can see campaign
 * context even though WhatsApp itself strips query params from shared links.
 */
export function buildWhatsAppLink(
  message: string,
  numberIndex: WhatsAppNumberIndex = 0,
  utm?: string | null
): string {
  const number = whatsapp.numbers[numberIndex].e164;
  const fullMessage = utm ? `${message} (${utm})` : message;
  return `https://wa.me/${number}?text=${encodeURIComponent(fullMessage)}`;
}

export function defaultBookingMessage(service?: string) {
  return service
    ? `Hi ${business.name}, I'd like to book: ${service}.`
    : `Hi ${business.name}, I'd like to book an appointment.`;
}
