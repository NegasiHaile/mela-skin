import type { ReactNode } from "react";
import { PatternField } from "./brand/PatternField";
import { SiteHeader } from "./SiteHeader";
import { Lines, Mount, MountItem, MountStagger } from "@/motion";
import { Wrap } from "./ui";

/*
  The opening band on every route that is not the home page.

  It is the home hero's ground — flooded ms-field, the letterhead motif held
  low behind the type — at about half the height, so a subpage announces itself
  in the same voice without pretending to be a landing page. Nothing here waits
  on a scroll trigger; it is all above the fold, so the entrance runs on mount.

  Lives in its own file rather than in ui.tsx because it pulls in SiteHeader,
  which pulls in ui.tsx. One direction only.

  `data-no-lazy` opts this out of the site-wide `content-visibility: auto`
  rule in globals.css: the mobile menu panel SiteHeader carries is absolutely
  positioned out of this section, and the containment that rule implies would
  clip it.
*/

export function PageHero({
  id,
  eyebrow,
  title,
  lede,
  aside,
  children,
}: {
  /** Unique per route — PatternField keys its SVG defs off this. */
  id: string;
  eyebrow: string;
  /** Plain string: `Lines` splits it into words to mask them individually. */
  title: string;
  lede: string;
  /** Optional figure or stat block, right-hand column at lg. */
  aside?: ReactNode;
  /** Buttons, chips, anything below the lede. */
  children?: ReactNode;
}) {
  return (
    <section data-no-lazy className="relative overflow-hidden bg-ms-field">
      <PatternField tone="field" />

      {/*
        `z-40`, NOT THE USUAL `z-10` EVERY OTHER SECTION'S CONTENT WRAPPER
        USES, and the difference matters here specifically because
        `SiteHeader`'s fixed header lives inside this one.

        `position: fixed` escapes normal layout, but it does NOT escape
        stacking context rules: a fixed element still stacks according to the
        nearest ancestor that establishes one, which for the header is THIS
        div (`relative` plus a real `z-index` creates one; the section around
        it stays `z-index: auto`, so it does not). Nearly every other section
        on the site wraps its own content in the identical `relative z-10`,
        and when a page's later section is `position: relative` with
        `z-index: auto` too (true of every plain section here), that later
        `z-10` wrapper sits in the SAME shared stacking context as this one --
        at which point two contexts tied on z-index resolve by DOM order, and
        the LATER one wins. The header's own `z-50` never even enters that
        comparison: it is scoped inside this div's local context, so it counts
        for nothing once this whole div has already lost.

        THAT IS WHY THE TREATMENTS-MENU TABLE COULD PAINT OVER THE HEADER. Its
        section's `relative z-10` wrapper (app/treatment-menu/page.tsx) comes
        later in the document than this one, tied it on z-index, and won by
        DOM order whenever the table scrolled up far enough to overlap the
        header's own screen position -- confirmed with a headless browser by
        checking which element actually sat at that point on screen, not
        assumed from the z-index numbers alone. `z-40` here beats every
        ordinary section's `z-10` outright, so the header's whole stacking
        context wins regardless of where it falls in the document -- which is
        the property a persistent, page-spanning header actually needs.
      */}
      <div className="relative z-40">
        <SiteHeader tone="dark" />

        <Wrap className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-28 lg:pt-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/*
              `lg:col-span-7` ONLY WHEN THERE IS AN ASIDE TO SHARE THE ROW
              WITH. Medical dermatology dropped its aside on request (the "How
              to read this page" card); without this, the text column would
              have stayed at 7 of 12 and left the other five empty rather than
              reclaiming them.
            */}
            <MountStagger
              step={0.11}
              delay={0.2}
              className={aside ? "lg:col-span-7" : "lg:col-span-12"}
            >
              {/*
                THE SUBJECT USED TO SIT ABOVE THE TITLE in 12px tracked caps —
                "Medical dermatology" over the page's own h1. It has gone with
                every other label of that kind (1 Sep: the small titles "makes
                it AI generated UI"). It is not lost: it stays in front of the
                heading for anything reading the page rather than looking at
                it, the lede's first clause says it in words, and the top bar
                now marks which page you are on.
              */}
              <h1 className="display-caps text-[clamp(2.5rem,6.2vw,4.6rem)] text-ms-ivory">
                <span className="sr-only">{eyebrow}. </span>
                <Lines text={title} />
              </h1>

              <MountItem>
                <p className="mt-7 max-w-[58ch] font-sans text-[18px] font-light leading-[1.8] text-ms-cream/85 sm:text-[19.5px] lg:text-[21px]">
                  {lede}
                </p>
              </MountItem>

              {children ? <MountItem className="mt-10">{children}</MountItem> : null}
            </MountStagger>

            {aside ? (
              <Mount delay={0.4} y={24} className="lg:col-span-4 lg:col-start-9 lg:pt-4">
                {aside}
              </Mount>
            ) : null}
          </div>
        </Wrap>
      </div>
    </section>
  );
}
