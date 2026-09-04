import type { Metadata } from "next";
import { BookingCta } from "@/components/BookingCta";
import { Faq } from "@/components/Faq";
import { PatternField } from "@/components/brand/PatternField";
import { GoldDefs } from "@/components/brand/Marks";
import { MenuBoard } from "@/components/MenuBoard";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { MENU, MENU_PAGE, META } from "@/constants";
import { PillGhost, PillSolid } from "@/components/ui";

export const metadata: Metadata = {
  title: "Treatment menu",
  description: META.menuDescription,
  alternates: { canonical: "/treatment-menu" },
  keywords: META.menuKeywords,
};

/*
  The whole menu on one route, from Resources/REVISED MENU OF GLO365 - 2025.pdf
  by way of constants/menu.ts. Five sections, sixty-odd treatments, set as a
  responsive table.

  It carried prices until 27 Aug 2026. It does not now — see the header of
  constants/menu.ts for the decision and who made it. What replaced them is how
  each treatment is sold, which is the part of a price list that is still useful
  when the figure is quoted at a consultation instead.
*/

export default function TreatmentMenu() {
  return (
    <>
      <GoldDefs />
      <main>
        <PageHero
          id="hero-menu"
          eyebrow={MENU_PAGE.eyebrow}
          title={MENU_PAGE.title}
          lede={MENU_PAGE.lede}
        >
          <div className="flex flex-wrap gap-3.5">
            <PillSolid
              href={`#${MENU[0].id}`}
              tone="dark"
              className="min-h-13 px-8"
            >
              Start at {MENU[0].title.toLowerCase()}
            </PillSolid>
            <PillGhost href="/contact" tone="dark" className="min-h-13 px-8">
              Book an appointment
            </PillGhost>
          </div>
        </PageHero>

        {/*
          COLOUR: the site's shell/paper/cream rotation -- see the note in
          app/page.tsx. This section=shell, Faq=paper, BookingCta=cream.

          MenuBoard's filter bar is `position: sticky`, and a sticky element
          only travels inside its containing block -- this section is what
          stops the filters following the reader down through the FAQ, the
          booking form and the footer, where there is no table left to filter.

          `data-no-lazy` opts this section out of the site-wide
          `content-visibility: auto` rule in globals.css:
          `content-visibility: auto` on an ancestor of a sticky element can
          break the sticky positioning it depends on, which is exactly what
          this section exists to protect.

          NO `overflow-hidden` HERE, UNLIKE ALMOST EVERY OTHER SECTION ON THE
          SITE, and removing it is what actually made the filter bar sticky --
          it was never working before this. `overflow: hidden` on ANY ancestor
          of a `position: sticky` element breaks that element's stickiness, in
          every tested browser, and this section had it. It did not need it:
          PatternField clips its own overhang on itself already (its wrapper
          div is `absolute inset-0 overflow-hidden`; see
          components/brand/PatternField.tsx), so the property here was never
          doing anything for the pattern -- it was only ever quietly breaking
          the one thing in this section that depends on not having it. Proven
          with a headless-browser scroll test, not assumed: before this
          change the bar moved pixel-for-pixel with the page and never once
          caught at its `top-*` offset; after it, it does.
        */}
        <section data-no-lazy className="relative">
          <PatternField tone="light" />
          <div className="relative z-10">
            <MenuBoard />
          </div>
        </section>

        <Faq
          title={MENU_PAGE.faqTitle}
          lede={MENU_PAGE.faqLede}
          items={MENU_PAGE.faq}
        />

        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
