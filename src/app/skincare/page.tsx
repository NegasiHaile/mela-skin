import type { Metadata } from "next";
import { BookingCta } from "@/components/BookingCta";
import { GoldDefs } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { Collection, Routine } from "@/components/Skincare";
import { ScrollProgress } from "@/motion";
import { SiteFooter } from "@/components/SiteFooter";
import { SKINCARE_PAGE, META } from "@/constants";
import { PillGhost, PillSolid } from "@/components/ui";

export const metadata: Metadata = {
  title: "Skincare",
  description: META.skincareDescription,
  alternates: { canonical: "/skincare" },
  keywords: META.skincareKeywords,
};

/*
  The fifth section of the structure Dr. Abseret Hailu set out at 00:17:24 on
  26 Aug: landing, about, medical, cosmetic, skincare, contact. The other five
  existed; this one did not.

  Shaped as a collection, which is what the reference sites do with their
  skincare sections — Abseret, 00:44:13: "here they do skincare collection on
  the bottom, if you see." Eight square tiles, then the routine underneath.

  Every product name is bracketed because the ranges have not been chosen; every
  category and every line of advice is real. Nothing on this page claims the
  clinic stocks a product it has not committed to.
*/
export default function Skincare() {
  return (
    <>
      <GoldDefs />
      <ScrollProgress />
      <main>
        <PageHero
          id="hero-skincare"
          eyebrow={SKINCARE_PAGE.eyebrow}
          title={SKINCARE_PAGE.title}
          lede={SKINCARE_PAGE.lede}
          aside={
            <div className="rounded-[20px] border border-ms-gold/30 bg-ms-espresso/35 p-7 backdrop-blur-sm">
              <p className="eyebrow text-ms-gold">{SKINCARE_PAGE.asideTitle}</p>
              <p className="mt-4 font-sans text-[16px] font-light leading-[1.8] text-ms-cream/85">
                {SKINCARE_PAGE.asideBody}
              </p>
            </div>
          }
        >
          <div className="flex flex-wrap gap-3.5">
            <PillSolid href="#collection" tone="dark" className="min-h-13 px-8">
              The collection
            </PillSolid>
            <PillGhost href="/contact" tone="dark" className="min-h-13 px-8">
              Ask what suits your skin
            </PillGhost>
          </div>
        </PageHero>

        <Collection />
        <Routine />
        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
