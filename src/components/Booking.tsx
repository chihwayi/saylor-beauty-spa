import { Clock, MapPin } from "lucide-react";
import { business } from "@/content/site";
import WhatsAppCta from "@/components/WhatsAppCta";
import SectionView from "@/components/SectionView";
import { defaultBookingMessage } from "@/lib/whatsapp";

export default function Booking() {
  return (
    <SectionView
      id="booking"
      section="booking"
      className="bg-haven-plum px-5 lg:px-16 py-16 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <div>
          <h2 className="font-display text-[1.75rem] md:text-[2.75rem] font-semibold text-haven-white text-balance">
            Book your appointment
          </h2>
          <p className="mt-3 text-haven-blush max-w-md">
            Message {business.ownerName} directly — she&apos;ll confirm your slot on
            WhatsApp, usually within the hour.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <WhatsAppCta
              message={defaultBookingMessage()}
              location="booking_primary"
              numberIndex={0}
              size="lg"
            >
              Book with Prisca
            </WhatsAppCta>
            <WhatsAppCta
              message={defaultBookingMessage()}
              location="booking_secondary"
              numberIndex={1}
              variant="secondary"
              size="lg"
            >
              Book — Line 2
            </WhatsAppCta>
          </div>
        </div>

        <div className="rounded-xl bg-haven-white/5 border border-haven-white/15 p-7">
          <div className="flex items-start gap-3">
            <Clock className="size-5 text-haven-gold shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-display text-[1.25rem] font-semibold text-haven-white">
                Opening hours
              </h3>
              <dl className="mt-3 space-y-1.5 text-sm text-haven-blush">
                {business.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {business.showAddress && (
            <div className="flex items-start gap-3 mt-6 pt-6 border-t border-haven-white/15">
              <MapPin className="size-5 text-haven-gold shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-display text-[1.25rem] font-semibold text-haven-white">
                  Studio
                </h3>
                <p className="mt-2 text-sm text-haven-blush">{business.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionView>
  );
}
