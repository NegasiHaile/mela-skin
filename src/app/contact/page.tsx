import type { Metadata } from "next";
import { CONTACT, META, brand } from "@/constants";
import { Booking } from "@/components/Booking";
import { ClinicMap } from "@/components/ClinicMap";
import { GoldDefs } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { ScrollProgress } from "@/motion";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact & directions",
  description: META.contactDescription,
  alternates: { canonical: "/contact" },
  keywords: META.contactKeywords,
};

/*
  The one place on the site with a form on it.

  It used to close all five routes, which left this page nothing to be. Now the
  form lives here, every other route ends with a BookingCta band pointing at
  it, and the page carries the two things a contact page is actually for: how
  to reach a person, and how to find the building.
*/
export default function Contact() {
  return (
    <>
      <GoldDefs />
      <ScrollProgress />
      <main>
        <PageHero
          id="hero-contact"
          eyebrow={CONTACT.eyebrow}
          title={CONTACT.title}
          lede={CONTACT.lede}
          aside={
            <div className="flex flex-col gap-5 rounded-[20px] border border-ms-gold/30 bg-ms-espresso/35 p-7 backdrop-blur-sm">
              <p className="eyebrow text-ms-gold">Reach us directly</p>

              <a
                href={brand.phoneHref}
                className="group flex min-h-12 items-center justify-between gap-4 border-b border-ms-sand/15 font-display text-[1.4rem] leading-none text-ms-ivory transition-colors hover:text-ms-gold"
              >
                {brand.phone}
                <span
                  aria-hidden="true"
                  className="font-sans text-[13px] text-ms-gold transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>

              <a
                href={`mailto:${brand.email}`}
                className="group flex min-h-12 items-center justify-between gap-4 font-sans text-[16.5px] font-light text-ms-cream transition-colors hover:text-ms-ivory"
              >
                {brand.email}
                <span
                  aria-hidden="true"
                  className="text-[13px] text-ms-gold transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            </div>
          }
        />

        <Booking />
        <ClinicMap />
      </main>
      <SiteFooter />
    </>
  );
}
