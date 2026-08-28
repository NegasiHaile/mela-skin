import type { Metadata } from "next";
import { BookingCta } from "@/components/BookingCta";
import { Conditions, ConditionIndex } from "@/components/Conditions";
import { GoldDefs } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { PatternField } from "@/components/brand/PatternField";
import { ScrollProgress, Stagger, StaggerItem } from "@/motion";
import { SiteFooter } from "@/components/SiteFooter";
import { MEDICAL_PAGE, META } from "@/constants";
import { Lede, PillGhost, PillSolid, SectionHead, Wrap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Medical dermatology",
  description: META.medicalDescription,
  alternates: { canonical: "/medical-dermatology" },
  keywords: META.medicalKeywords,
};

/*
  The medical half of the offering, from Resources/more-info.md. Ten named
  conditions, each with its own anchor, so a search result or a WhatsApp link
  can land someone directly on the entry they need.
*/

export default function MedicalDermatology() {
  return (
    <>
      <GoldDefs />
      <ScrollProgress />
      <main>
        <PageHero
          id="hero-medical"
          eyebrow={MEDICAL_PAGE.eyebrow}
          title={MEDICAL_PAGE.title}
          lede={MEDICAL_PAGE.lede}
          aside={
            <div className="rounded-[20px] border border-ms-gold/30 bg-ms-espresso/35 p-7 backdrop-blur-sm">
              <p className="eyebrow text-ms-gold">{MEDICAL_PAGE.asideTitle}</p>
              <p className="mt-4 font-sans text-[16px] font-light leading-[1.8] text-ms-cream/85">
                {MEDICAL_PAGE.asideBody}
              </p>
            </div>
          }
        >
          <div className="flex flex-wrap gap-3.5">
            <PillSolid href="/contact" tone="dark" className="min-h-13 px-8">
              Book a consultation
            </PillSolid>
            <PillGhost href="/cosmetic-dermatology" tone="dark" className="min-h-13 px-8">
              Cosmetic dermatology
            </PillGhost>
          </div>
        </PageHero>

        <ConditionIndex />
        <Conditions />

        <section className="relative overflow-hidden bg-ms-cream py-24 lg:py-32">
          <PatternField tone="cream" />

          <Wrap className="relative">
            <div className="max-w-[700px]">
              <SectionHead title={MEDICAL_PAGE.prepTitle} />
              <Lede className="mt-7">{MEDICAL_PAGE.prepLede}</Lede>
            </div>

            <Stagger
              as="ol"
              step={0.12}
              className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-3 lg:mt-16"
            >
              {MEDICAL_PAGE.prep.map((item, index) => (
                <StaggerItem
                  as="li"
                  key={item.title}
                  y={24}
                  className="border-t border-ms-bronze/25 pt-7"
                >
                  <span className="font-display text-[2.4rem] font-light leading-none text-ms-terracotta">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-caps mt-5 text-[19px] text-ms-cocoa">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-sans text-[16px] font-light leading-[1.8] text-ms-espresso/80">
                    {item.body}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </Wrap>
        </section>

        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
