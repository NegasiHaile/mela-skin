import type { Metadata } from "next";
import Image from "next/image";
import { BookingCta } from "@/components/BookingCta";
import { CosmeticFamilies } from "@/components/CosmeticFamilies";
import { PatternField } from "@/components/brand/PatternField";
import { GoldDefs } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { Reveal, Wipe } from "@/motion";
import { SiteFooter } from "@/components/SiteFooter";
import { COSMETIC_PAGE, META } from "@/constants";
import { Lede, PillGhost, PillSolid, SectionHead, Wrap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cosmetic dermatology",
  description: META.cosmeticDescription,
  alternates: { canonical: "/cosmetic-dermatology" },
  keywords: META.cosmeticKeywords,
};

export default function CosmeticDermatology() {
  return (
    <>
      <GoldDefs />
      <main>
        <PageHero
          id="hero-cosmetic"
          eyebrow={COSMETIC_PAGE.eyebrow}
          title={COSMETIC_PAGE.title}
          lede={COSMETIC_PAGE.lede}
          aside={
            <dl className="grid gap-5 rounded-[20px] border border-ms-gold/30 bg-ms-espresso/35 p-7 backdrop-blur-sm">
              {COSMETIC_PAGE.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between gap-5"
                >
                  <dt className="font-sans text-[13.5px] font-light text-ms-cream/80">
                    {stat.label}
                  </dt>
                  <dd className="shrink-0 font-display text-[1.6rem] leading-none text-ms-gold">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          }
        >
          <div className="flex flex-wrap gap-3.5">
            <PillSolid
              href="/treatment-menu"
              tone="dark"
              className="min-h-13 px-8"
            >
              The treatments menu
            </PillSolid>
            <PillGhost href="/contact" tone="dark" className="min-h-13 px-8">
              Book an appointment
            </PillGhost>
          </div>
        </PageHero>

        {/*
          COLOUR: the site's shell/paper/cream rotation -- see the note in
          app/page.tsx. CosmeticFamilies=shell, this closing section=paper,
          BookingCta=cream (always, on every route: see its own note).
        */}
        <CosmeticFamilies />

        <section className="relative overflow-hidden py-24 lg:py-32">
          <PatternField tone="light" />

          <Wrap className="relative z-10">
            <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-6">
                <SectionHead title={COSMETIC_PAGE.closingTitle} />
                <Lede className="mt-7">{COSMETIC_PAGE.closingLede}</Lede>

                <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3.5">
                  <PillSolid href="/treatment-menu" className="min-h-13 px-8">
                    The treatments menu
                  </PillSolid>
                  <PillGhost
                    href="/medical-dermatology"
                    className="min-h-13 px-8"
                  >
                    Medical dermatology
                  </PillGhost>
                </Reveal>
              </div>

              <Wipe className="lg:col-span-5 lg:col-start-8">
                <div className="relative h-[320px] w-full overflow-hidden rounded-[24px] ring-1 ring-ms-bronze/25 sm:h-[400px]">
                  <Image
                    src="/images/dermatology-skin-care-treatment-collage.webp"
                    alt="Cosmetic dermatology treatments at Mela Skin"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-center"
                  />
                </div>
              </Wipe>
            </div>
          </Wrap>
        </section>

        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
