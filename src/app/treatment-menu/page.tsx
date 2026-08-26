import type { Metadata } from "next";
import { Booking } from "@/components/Booking";
import { Faq } from "@/components/Faq";
import { GoldDefs } from "@/components/brand/Marks";
import { MenuBoard, MenuNav } from "@/components/MenuBoard";
import { PageHero } from "@/components/PageHero";
import { ScrollProgress } from "@/motion";
import { SiteFooter } from "@/components/SiteFooter";
import { MENU, MENU_PAGE, META } from "@/constants";
import { PillGhost, PillSolid } from "@/components/ui";

export const metadata: Metadata = {
  title: "Treatment menu & prices",
  description: META.menuDescription,
  alternates: { canonical: "/treatment-menu" },
  keywords: META.menuKeywords,
};

/*
  The whole priced menu on one route, from Resources/REVISED MENU OF GLO365 -
  2025.pdf by way of lib/menu.ts. Five sections, sixty-odd treatments, nothing
  behind an enquiry form.
*/

export default function TreatmentMenu() {
  return (
    <>
      <GoldDefs />
      <ScrollProgress />
      <main>
        <PageHero
          id="hero-menu"
          eyebrow={MENU_PAGE.eyebrow}
          title={MENU_PAGE.title}
          lede={MENU_PAGE.lede}
          aside={
            <dl className="flex flex-col gap-6 rounded-[20px] border border-ms-gold/30 bg-ms-espresso/35 p-7 backdrop-blur-sm">
              <p className="eyebrow text-ms-gold">{MENU_PAGE.rulesTitle}</p>
              {MENU_PAGE.rules.map((rule) => (
                <div key={rule.label}>
                  <dt className="font-display text-[1.25rem] leading-none text-ms-ivory">
                    {rule.label}
                  </dt>
                  <dd className="mt-2.5 font-sans text-[15.5px] font-light leading-[1.7] text-ms-cream/80">
                    {rule.body}
                  </dd>
                </div>
              ))}
            </dl>
          }
        >
          <div className="flex flex-wrap gap-3.5">
            <PillSolid href={`#${MENU[0].id}`} tone="dark" className="min-h-13 px-8">
              Start at facials
            </PillSolid>
            <PillGhost href="#book" tone="dark" className="min-h-13 px-8">
              Book a consultation
            </PillGhost>
          </div>
        </PageHero>

        {/*
          MenuNav is `position: sticky`, and a sticky element only travels
          inside its containing block. Wrapping the two together is what stops
          the category chips following the reader down through the FAQ, the
          booking form and the footer, where they mean nothing.
        */}
        <div>
          <MenuNav />
          <MenuBoard />
        </div>

        <Faq
          title={MENU_PAGE.faqTitle}
          lede={MENU_PAGE.faqLede}
          items={MENU_PAGE.faq}
        />

        <Booking />
      </main>
      <SiteFooter />
    </>
  );
}
