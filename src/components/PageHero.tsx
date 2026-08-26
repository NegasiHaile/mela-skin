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
    <section className="relative overflow-hidden bg-ms-field">
      <PatternField
        id={id}
        tone="field"
        fade="bottom"
        scale={420}
        opacity={0.55}
        drift={24}
      />

      <div className="relative z-10">
        <SiteHeader tone="dark" />

        <Wrap className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-28 lg:pt-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <MountStagger step={0.11} delay={0.2} className="lg:col-span-7">
              <MountItem y={18}>
                <p className="eyebrow text-ms-gold">{eyebrow}</p>
              </MountItem>

              <h1 className="display-caps mt-6 text-[clamp(2.5rem,6.2vw,4.6rem)] text-ms-ivory">
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
