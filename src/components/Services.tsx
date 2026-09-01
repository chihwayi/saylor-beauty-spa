import Image from "next/image";
import { business, services } from "@/content/site";
import WhatsAppCta from "@/components/WhatsAppCta";
import SectionView from "@/components/SectionView";
import { defaultBookingMessage } from "@/lib/whatsapp";

export default function Services() {
  return (
    <SectionView
      id="services"
      section="services"
      className="bg-haven-cream px-5 lg:px-16 py-16 md:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <h2 className="font-display text-[1.75rem] md:text-[2.75rem] font-semibold text-haven-plum text-balance">
            Services
          </h2>
          <p className="mt-3 text-haven-ink/80 max-w-lg">
            Every treatment is booked directly with Prisca — tap a service below to
            check availability on WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col rounded-xl bg-haven-white overflow-hidden border border-haven-plum/10 hover:shadow-haven transition-shadow duration-200"
            >
              {service.image && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.name} at ${business.name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-6">
                <span className="text-xs font-medium uppercase tracking-wide text-haven-rose">
                  {service.category}
                </span>
                <h3 className="font-display text-[1.25rem] md:text-[1.5rem] font-semibold text-haven-plum mt-1">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-haven-ink/75 flex-1">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-haven-ink/70">
                    {service.priceFrom === "TBC" ? "Price on request" : `From ${service.priceFrom}`}
                  </span>
                </div>
                <WhatsAppCta
                  message={defaultBookingMessage(service.name)}
                  location={`service_${service.id}`}
                  service={service.id}
                  variant="secondary"
                  className="mt-4 w-full"
                >
                  Book this
                </WhatsAppCta>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionView>
  );
}
