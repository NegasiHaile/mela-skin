import { CONDITIONS, MEDICAL_PAGE } from "@/constants";
import { Icon } from "./icons";
import { PatternField } from "./brand/PatternField";
import { Stagger, StaggerItem } from "@/motion";
import { Callout, Wrap } from "./ui";

/*
  The index bar, then the ten conditions it jumps to, one card each, all in
  one section.

  Every card answers the same three questions in the same order — what it is,
  how it behaves on melanin-rich skin, what the first appointment is for — so
  a reader who has scanned one knows where to look in the next. That regularity
  is the whole point of the layout; it is a reference page, not an essay.

  Two columns at lg rather than three or four. A condition entry runs to about
  a hundred and forty words and three columns would set that at a width nobody
  reads comfortably.

  Anchors are per-slug and carry scroll-mt so a jump from the index above (or
  from the home page index) does not land the heading under the top of the
  viewport.

  THE INDEX BAR IS `sticky` NOW, on request, so a reader partway down a long
  reference page can still jump straight to another condition rather than
  scrolling back up first. The visual idea is borrowed from MenuBoard.tsx's
  own sticky filter bar, the only other sticky element on the site — but not
  the mechanics wholesale: that bar turns out not to actually stick (see the
  next point), so this one was built and tested against scroll rather than
  assumed to work because something that looks similar does. Three things:

    - `top-20 sm:top-24 lg:top-28` matches the fixed header's own height
      exactly (SiteHeader.tsx -> BAR_HEIGHT), so the bar comes to rest just
      under the header rather than beneath it or with a gap above it.
    - `data-no-lazy` on the section, not just on this page's hero. A sticky
      element only stays sticky within its own containing block, and
      `content-visibility: auto` (globals.css's default for every section)
      can break that containment — which is exactly why ConditionIndex and
      Conditions are ONE section now rather than two: the bar needs the whole
      card grid in its containing block to stay pinned all the way through
      it, not just through its own few lines.
    - NO `overflow-hidden` ON THE SECTION -- see the note beside it below.
      `overflow: hidden` on any ancestor breaks `position: sticky` on a
      descendant, in every tested browser, and MenuBoard's section carries
      exactly that property. Measured with a headless browser rather than
      taken on faith: MenuBoard's own "sticky" bar moves pixel-for-pixel with
      the scroll and never once catches, which is what sent this note looking
      for the actual cause instead of copying a broken pattern a second time.

  ONE SOLID `bg-ms-shell`, NOT A BLUR. MenuBoard's bar sits above a dense
  table and reads as glass over it; this bar and everything scrolling under it
  are the same flat `ms-shell`; a hairline underneath is enough to say the bar
  is a separate, pinned thing without needing translucency to do it.

  ConditionIndex AND Conditions SHARE ONE TONE, `ms-shell` -- first of the
  page's shell/paper/cream rotation (see the note in app/page.tsx) -- rather
  than each taking the next step in turn. The index bar is a header for the
  list beneath it, not a separate subject, which is also the argument for
  merging them into one section now that the bar has to stay put.
*/

export function Conditions() {
  return (
    <section data-no-lazy className="relative">
      {/*
        NO `overflow-hidden` ON THIS SECTION, unlike almost every other one on
        the site -- PatternField clips its own overhang already (its wrapper
        div is `absolute inset-0 overflow-hidden` on itself; see
        components/brand/PatternField.tsx), so the section never needed the
        property for the pattern's sake. It matters more than tidiness here:
        `overflow: hidden` on ANY ancestor of a `position: sticky` element
        breaks that element's stickiness, which is exactly what was happening
        to the index bar below until this came off.
      */}
      <PatternField tone="light" />

      <div className="sticky top-20 z-30 border-b border-ms-bronze/20 bg-ms-shell sm:top-24 lg:top-28">
        <Wrap className="relative z-10">
          <Stagger step={0.04} delay={0.08} className="flex flex-wrap gap-2.5 py-5 lg:py-6">
            {CONDITIONS.map((condition) => (
              <StaggerItem key={condition.slug} y={12}>
                <a
                  href={`#${condition.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-ms-bronze/30 px-5 font-sans text-[13.5px] tracking-[0.01em] text-ms-espresso/85 transition-colors hover:border-ms-terracotta/60 hover:bg-ms-cream hover:text-ms-cocoa"
                >
                  {condition.title}
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Wrap>
      </div>

      <Wrap className="relative z-10 py-16 lg:py-20">
        <Stagger step={0.09} className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {CONDITIONS.map((condition, index) => (
            <StaggerItem
              as="article"
              key={condition.slug}
              y={28}
              id={condition.slug}
              className="scroll-mt-24 rounded-[24px] border border-ms-bronze/20 bg-ms-shell/90 p-7 sm:p-9 lg:p-10 lg:scroll-mt-28"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <Icon
                    name={condition.icon}
                    className="mt-1.5 shrink-0 text-ms-terracotta-deep"
                  />
                  <h2 className="font-display text-[1.75rem] leading-[1.15] tracking-[-0.01em] text-ms-cocoa sm:text-[2rem]">
                    {condition.title}
                  </h2>
                </div>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-display text-[1.6rem] font-light leading-none text-ms-terracotta/70"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-6 font-display text-[21px] italic leading-[1.45] text-ms-terracotta-deep sm:text-[23px]">
                {condition.summary}
              </p>

              <p className="mt-6 font-sans text-[17.5px] font-light leading-[1.7] text-ms-espresso/85">
                {condition.what}
              </p>

              {condition.deeper ? (
                <Callout eyebrow={condition.noteLabel ?? "On deeper skin"} className="mt-7">
                  {condition.deeper}
                </Callout>
              ) : null}

              <div className="mt-7 border-t border-ms-bronze/20 pt-6">
                <p className="font-display text-[1.3rem] leading-[1.2] text-ms-cocoa">
                  At your appointment
                </p>
                <p className="mt-3 font-sans text-[17.5px] font-light leading-[1.7] text-ms-espresso/85">
                  {condition.approach}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
