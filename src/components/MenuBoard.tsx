import { MENU, sectionItemCount, sectionOffering } from "@/constants";
import type { MenuSection } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Reveal } from "@/motion";
import { Wrap } from "./ui";

/*
  The treatment menu, as a table.

  WHAT THIS USED TO BE. Sixty cards, each carrying a large lead price and three
  course rates underneath it. Every one of those cards existed to hold figures,
  and the figures are gone — the 26 Aug 2026 meeting took pricing off the site
  (see the header of constants/menu.ts). A grid of sixty cards holding two
  fields each is a lot of furniture for very little content, and it was already
  the thing Mo flagged at 00:47:02: "my concern with the draft is that it's too
  busy. Even when I look at it, I'm not sure what exactly to look at."

  So it is a table now, which is what a menu is. The brief was explicit about
  it: display the menu in an easy way, a responsive table.

  Four decisions carry the layout.

  1. ONE TABLE PER SECTION, two columns: what the treatment is, and how it is
     sold. Nothing else. A visitor scanning sixty rows is looking for a name
     they already have in mind, and every extra column is something between them
     and it.

  2. THE PRINTED SHEET'S GROUPS SURVIVE, as `<tbody>` row-group headers rather
     than as separate tables. Renewal / Brightening / Age defying is a real
     distinction on the clinic's own sheet and it is how someone browsing
     facials narrows down. One `<tbody>` per group is also what tells a screen
     reader the rows belong together.

  3. IT COLLAPSES RATHER THAN SCROLLS ON A PHONE. Below `sm` the cells become
     blocks: the treatment name on its line, its formats beneath. Same markup,
     no second rendering of the list, and no horizontal scroll on the one device
     most of this clinic's traffic will arrive on. `sm` and up it is a real
     two-column table, inside an `overflow-x-auto` wrapper so a long treatment
     name can never push the page wide.

  4. NOTHING IS BEHIND A CLICK. No accordions, no "show prices". That was true
     of the old version for a different reason and it stays true.

  Everything here is read from constants/menu.ts, a transcription of the
  clinic's printed 2025 sheet. This file decides only how it is worn.
*/

/**
 * `Single session` / `Course of 5` / `2 areas` / `4cc`, as chips.
 *
 * Chips rather than a comma list because they are a set of alternatives, not a
 * sentence, and because at a glance the number of chips tells you how much
 * flexibility a treatment has before you have read any of them.
 */
function Formats({ formats }: { formats: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5 sm:justify-end">
      {formats.map((format) => (
        <li
          key={format}
          className="rounded-full border border-ms-bronze/25 bg-ms-shell/70 px-3 py-1 font-sans text-[12.5px] font-light leading-[1.5] text-ms-espresso/80"
        >
          {format}
        </li>
      ))}
    </ul>
  );
}

function SectionTable({ section }: { section: MenuSection }) {
  return (
    /*
      The scroll container is the wrapper, not the table, so the table can still
      be `w-full` at every width. Without it a long name in a narrow column
      forces the whole page to scroll sideways instead of just this block.
    */
    <div className="mt-12 overflow-x-auto lg:mt-14">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          {section.title} — {sectionItemCount(section)} treatments and how each
          one is offered
        </caption>

        {/*
          Hidden below `sm`, where the cells are stacked blocks and a header row
          would be labelling a column that is not there. `sr-only` rather than
          `hidden` so the header cells stay in the accessibility tree at every
          width — a screen-reader table with no column names is much worse than
          a visually redundant header row.
        */}
        <thead className="sr-only sm:not-sr-only">
          <tr className="border-b border-ms-bronze/30">
            <th
              scope="col"
              className="pb-3 pr-6 font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-ms-terracotta-deep"
            >
              Treatment
            </th>
            <th
              scope="col"
              className="pb-3 text-right font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-ms-terracotta-deep"
            >
              Offered as
            </th>
          </tr>
        </thead>

        {section.groups.map((group) => (
          <tbody key={group.name} className="border-b border-ms-bronze/20">
            <tr>
              {/*
                The group heading spans both columns and is a `th` with
                `scope="colgroup"`, which is what makes "Renewal" read as the
                heading for the rows under it rather than as a treatment with no
                formats.
              */}
              <th
                scope="colgroup"
                colSpan={2}
                className="pb-4 pt-9 text-left font-display text-[1.4rem] font-normal leading-none tracking-[-0.01em] text-ms-cocoa sm:text-[1.55rem]"
              >
                <span className="flex items-center gap-5">
                  <span className="shrink-0">{group.name}</span>
                  <span
                    aria-hidden="true"
                    className="hairline-gold hidden flex-1 sm:block"
                  />
                </span>
              </th>
            </tr>

            {group.items.map((item) => (
              <tr
                key={item.name}
                className="border-t border-ms-bronze/15 transition-colors hover:bg-ms-cream/45"
              >
                {/*
                  `block sm:table-cell` is the whole responsive mechanism. Below
                  `sm` both cells are blocks and stack; from `sm` they revert to
                  table cells and sit side by side. `align-baseline` keeps a
                  two-line treatment name lined up with its first chip row.
                */}
                <th
                  scope="row"
                  className="block pt-4 pr-6 text-left align-baseline font-display text-[1.2rem] font-normal leading-[1.3] tracking-[-0.01em] text-ms-cocoa sm:table-cell sm:py-5 sm:text-[1.3rem]"
                >
                  {item.name}
                </th>
                <td className="block pb-4 pt-2.5 align-baseline sm:table-cell sm:py-5 sm:pl-6 sm:text-right">
                  <Formats formats={item.formats} />
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

export function MenuNav() {
  return (
    <div className="sticky top-0 z-30 border-b border-ms-bronze/20 bg-ms-shell/95 backdrop-blur-md">
      <Wrap>
        <nav
          aria-label="Treatment menu sections"
          className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto py-3.5 sm:py-4"
        >
          {MENU.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-ms-bronze/30 px-5 font-sans text-[13.5px] tracking-[0.01em] text-ms-espresso/85 transition-colors hover:border-ms-terracotta/60 hover:bg-ms-cream hover:text-ms-cocoa"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </Wrap>
    </div>
  );
}

export function MenuBoard() {
  return (
    <>
      {MENU.map((section, index) => {
        const count = sectionItemCount(section);
        const offering = sectionOffering(section);

        return (
          <section
            key={section.id}
            id={section.id}
            className={`relative scroll-mt-20 overflow-hidden py-20 lg:py-28 ${
              index % 2 === 0 ? "bg-ms-paper" : "bg-ms-shell"
            }`}
          >
            {/*
              Held well back — 0.5 against the 0.85 the card grid used to carry.
              A watermark behind sixty rows of ruled type is the one place on
              this site where the pattern competes with the content instead of
              sitting under it.
            */}
            <PatternField tone={index % 2 === 0 ? "paper" : "shell"} />

            <Wrap className="relative">
              <Reveal y={20}>
                <div className="max-w-[640px]">
                  <p className="eyebrow text-ms-terracotta-deep">
                    {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; Menu
                  </p>
                  <h2 className="display-caps mt-5 text-[clamp(2rem,3.6vw,3rem)] text-ms-cocoa">
                    {section.title}
                  </h2>
                  <p className="mt-6 font-sans text-[17.5px] font-light leading-[1.8] text-ms-espresso/80 lg:text-[18.5px]">
                    {section.blurb}
                  </p>

                  {/*
                    The section in one line before sixty rows of it: how many
                    treatments, and how they are sold. Both derived, so neither
                    can end up describing a section that no longer looks like
                    that.
                  */}
                  <p className="mt-6 font-sans text-[14.5px] font-light leading-[1.6] tracking-[0.01em] text-ms-espresso/70">
                    {count} treatment{count === 1 ? "" : "s"}, offered as{" "}
                    {offering}.
                  </p>
                </div>
              </Reveal>

              <SectionTable section={section} />
            </Wrap>
          </section>
        );
      })}
    </>
  );
}
