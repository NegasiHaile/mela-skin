"use client";

import { useMemo, useState } from "react";
import { MENU, MENU_ITEM_COUNT, sectionRows } from "@/constants";
import { Icon } from "./icons";
import { Wrap } from "./ui";

/*
  The service menu: one table, category filters above it.

  WHAT THIS REPLACED. A table with a formats column, then a ruled list, then five
  rails of cards, then this table with a search box. The table is the right shape:
  fifty-nine services with three facts each is tabular data, and a reader
  hunting for one of them wants rows. What the first table lacked was a way to cut
  it down.

  THE FILTER IS THE WAY DOWN, and it does two things at once:

    the ticked sections   stay open, and their rows take the section's tint
    everything else       collapses to its header row, still labelled and still
                          counted, so a reader can see what they have put away

  Nothing ticked means everything open, which is the state the page loads in. The
  first thing anyone does on a menu is look at all of it.

  Collapsing rather than hiding matters: a section that vanished would leave a
  reader thinking the menu is five items long. A header row saying "05 Add-ons, 8
  services" says the opposite, and it is the thing to click to get them back.

  THE TINTS ARE MEASURED, not picked. The brand is a single hue family, so five
  tints that stay apart took a search over the palette rather than an eye: every
  pair is at least 29 apart in RGB distance, each is at least 26 from the untinted
  row, and the least contrasty of them still holds 7.39:1 for the service name
  and 8.38:1 for the meta. That last number is why the meta ink is espresso and
  not terracotta, which fails AA on the two darkest tints.

  The control is also the legend: unticked, a checkbox carries a swatch of the
  colour it would apply; ticked, the pill fills with that colour. So there is no
  key to read, and no ticked state that cannot be seen.

  RESPONSIVE. Below `md` the table stops being one: `thead` is hidden and every
  row becomes a block with the name on its own line and the two meta cells
  labelled under it. Three columns do not fit 390px, and the usual fix — let it
  scroll sideways — hides the column saying how a service is sold, which is the
  whole reason that column exists.

  `md` and not `sm`. At 640 the three columns technically fit, and every one of
  them wraps: 210px for a name like "Express Hydra Cleanser" and 103px for "1, 5,
  10 or 20 sessions". A table whose every cell is two lines high is not more
  legible than the stack it replaced.

  Everything is read from constants/menu.ts, a transcription of the clinic's
  printed 2025 sheet. This file decides only how it is worn.
*/

/**
 * The row fill when a category is ticked. Also the checkbox's swatch.
 *
 * Tint is a rendering choice for this table specifically, so it stays local;
 * the icon it used to carry alongside is `section.icon` now, one definition
 * in constants/menu.ts that the home page reads too.
 */
const TINT: Record<string, string> = {
  facials: "bg-ms-sand/18",
  rejuvenation: "bg-ms-bronze/45",
  "body-hair": "bg-ms-terracotta/45",
  injectables: "bg-ms-gold/75",
  "add-ons": "bg-ms-terracotta-deep/18",
};

/** Read where a section id is missing from TINT, so the page cannot break. */
const FALLBACK_TINT = "bg-ms-cream";

/** Cell padding, shared so the head and the body cannot drift apart. */
const CELL = "px-5 py-3.5 md:px-6 md:py-4";

/** The two meta cells' label, shown only where the column heading is not. */
const META_LABEL =
  "mr-2 font-sans text-[9.5px] font-medium uppercase tracking-[0.18em] text-ms-espresso/70 md:hidden";

const META_VALUE =
  "font-sans text-[14px] font-light text-ms-espresso/85 md:text-[14.5px]";

const COL_HEAD = `font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ms-terracotta-deep ${CELL}`;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      className={`size-3.5 shrink-0 transition-transform duration-300 ${
        open ? "" : "-rotate-90"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.6 4.9 7 9.3l4.4-4.4" />
    </svg>
  );
}

function CategoryFilter({
  id,
  title,
  tint,
  on,
  onToggle,
}: {
  id: string;
  title: string;
  tint: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <label htmlFor={`filter-${id}`} className="shrink-0 cursor-pointer">
      {/*
        A real checkbox, visually hidden rather than replaced. It keeps the tab
        stop, the space-bar toggle and the checked state a screen reader reads
        out; the pill beside it is only paint. `peer-*` styles that pill off the
        input's state, which is why the input has to come first.
      */}
      <input
        id={`filter-${id}`}
        type="checkbox"
        className="peer sr-only"
        checked={on}
        onChange={onToggle}
      />
      {/*
        Ticked, the pill fills with the very colour it puts on the rows, so the
        control doubles as the legend. A border-only checked state was tried and
        could not be seen: five ticked pills looked like five unticked ones. The
        swatch becomes a tick when it is on, because a swatch drawn in the fill
        colour on top of that fill is invisible.
      */}
      <span
        className={`inline-flex min-h-11 items-center gap-2.5 rounded-full border px-4 font-sans text-[13.5px] tracking-[0.01em] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ms-terracotta peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ms-shell ${
          on
            ? `border-ms-cocoa/45 text-ms-cocoa ${tint}`
            : "border-ms-bronze/30 text-ms-espresso/85 peer-hover:border-ms-terracotta/60"
        }`}
      >
        {on ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 14 14"
            className="size-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.4 7.6 5.5 10.7 11.6 3.9" />
          </svg>
        ) : (
          <span
            aria-hidden="true"
            className={`size-3.5 shrink-0 rounded-full ring-1 ring-ms-cocoa/20 ${tint}`}
          />
        )}
        {title}
      </span>
    </label>
  );
}

/**
 * The contents of a section's header row.
 *
 * Split out because it is rendered either as plain text or inside a button, and
 * the two have to look identical: the only difference a reader should see is the
 * chevron, which only means something once something is collapsed.
 */
function SectionLabel({
  title,
  icon,
  count,
  filtering,
  open,
}: {
  title: string;
  icon: string;
  count: number;
  filtering: boolean;
  open: boolean;
}) {
  return (
    /*
      Two boxes, not one wrapping row. The label wraps inside its own box and the
      action is pinned outside it, because in a single wrapping row a long title
      like "Skin rejuvenation" pushed the chevron onto a line of its own and the
      collapsed headers came out at ragged heights.
    */
    <span className="flex w-full items-center gap-x-4">
      <span className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
        {/*
          NO "01" ANY MORE, on request -- it numbered the sections against an
          order nothing else on the page counts by, and duplicated what the
          filter bar above already establishes by position.

          THE ICON IS `size-8`, LARGER THAN ITS OWN 26px DEFAULT, on request:
          it used to run `size-5` (20px), smaller than default and smaller
          than the title beside it, which is backwards for the one glyph that
          is supposed to identify the section at a glance. At `size-8` it
          reads as the heavier of the two marks in the row, the way the icon
          plate does everywhere else this icon set appears (TreatmentMedia.tsx,
          much larger again there, but the same idea: the mark leads).
        */}
        <Icon name={icon} className="size-8 shrink-0 text-ms-terracotta-deep" />
        <span className="display-caps text-[17px] text-ms-cocoa md:text-[18px]">
          {title}
        </span>
        <span className="font-sans text-[12.5px] font-light text-ms-espresso/70">
          {count} service{count === 1 ? "" : "s"}
        </span>
      </span>
      {filtering ? (
        <span className="ml-auto flex shrink-0 items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-ms-terracotta-deep">
          {/*
            Both words are actions, because the row is a button either way. The
            word goes on a phone and the chevron stays: a long title and its count
            already take two lines there, and the word made a third.
          */}
          <span className="hidden sm:inline">{open ? "Hide" : "Show"}</span>
          <Chevron open={open} />
        </span>
      ) : null}
    </span>
  );
}

export function MenuBoard() {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());

  /* The rows never change, so they are built from the menu once. */
  const sections = useMemo(
    () => MENU.map((section) => ({ section, rows: sectionRows(section) })),
    [],
  );

  /*
    Nothing ticked is not the same as everything ticked. With nothing ticked the
    whole menu is open and nothing is tinted; ticking is what closes the rest.
  */
  const filtering = picked.size > 0;
  const isOpen = (id: string) => !filtering || picked.has(id);

  function toggle(id: string) {
    let opening = false;
    setPicked((current) => {
      const next = new Set(current);
      if (!next.delete(id)) {
        next.add(id);
        opening = true;
      }
      return next;
    });

    /*
      Opening a section moves two things into view, because collapsing four
      sections can shorten the page by thousands of pixels and leave a reader
      wherever the browser clamps them.

        the section  so ticking Add-ons actually shows Add-ons
        its pill     which can be off the end of the row on a phone, where the
                     filters scroll sideways and the tick was made from a header

      `block: "nearest"` on the pill so it never moves the page vertically, only
      the row it lives in. Both are skipped under reduced motion, which is what
      the smooth scroll is for.
    */
    if (!opening) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const behavior = smooth ? "smooth" : "auto";
    requestAnimationFrame(() => {
      document
        .getElementById(`filter-${id}`)
        ?.closest("label")
        ?.scrollIntoView({ behavior, block: "nearest", inline: "nearest" });
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
    });
  }

  return (
    <>
      {/*
        Sticky under the site header, not under the top of the viewport: the
        header is fixed, so `top-0` would park this bar behind it. The offsets
        are SiteHeader's own `h-20 sm:h-24 lg:h-28`.

        Sticky at all, because the point of a filter is to change your mind about
        it halfway down a long table.

        `overflow-x-clip` is load-bearing, not tidiness. The category row scrolls
        sideways inside itself on a phone, and its clip does not survive this
        sticky, backdrop-filtered boundary: the bar reported a 627px scrollable
        width and dragged the whole document sideways with it, 237px of it at
        390px wide. `clip` rather than `hidden` because `hidden` on one axis
        forces the other to `auto`, which would make this bar a vertical scroll
        container too.
      */}
      {/*
        IT IS 55% CREAM AND NOT 95% SHELL, because the ground it travels over
        stopped being one colour on 2 Sep.

        This bar's section used to be a flat `bg-ms-shell`, so a nearly opaque
        shell bar matched it exactly the whole way down. The page ground is one
        shell-to-linen gradient now (globals.css -> .ms-ground) and this board is
        about 3,900px of it, so by the bottom of the table the ground behind the
        bar is roughly `#eddcc4` — and a 95% shell bar over that is 49 units of
        blue too light. A pale box sliding down a warm page.

        Cream at 55% is the midpoint of the ramp at about half strength, so it is
        within about ten units of the ground at BOTH ends instead of matching at
        one and missing at the other. With the blur doing the separating, what is
        left reads as glass over the page rather than as a panel on top of it.
      */}
      <div className="sticky top-20 z-30 overflow-x-clip border-b border-ms-bronze/20 bg-ms-cream/55 backdrop-blur-md sm:top-24 lg:top-28">
        <Wrap>
          <div className="flex items-center gap-3 py-3.5 sm:gap-4 md:py-4">
            <p className="hidden shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ms-terracotta-deep lg:block">
              Sections
            </p>

            {/*
              One line on a phone, scrolled sideways rather than wrapped to three
              rows: this bar is sticky, and a sticky bar eating a third of a small
              screen is worse than one that scrolls.
            */}
            <div
              role="group"
              aria-label="Show only these sections"
              className="scrollbar-hide -mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
            >
              {MENU.map((section) => (
                <CategoryFilter
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  tint={TINT[section.id] ?? FALLBACK_TINT}
                  on={picked.has(section.id)}
                  onToggle={() => toggle(section.id)}
                />
              ))}
            </div>

            {filtering ? (
              <button
                type="button"
                onClick={() => setPicked(new Set())}
                className="min-h-11 shrink-0 rounded-full px-2 font-sans text-[13px] tracking-[0.01em] text-ms-terracotta-deep underline decoration-ms-bronze/40 underline-offset-4 transition-colors hover:text-ms-cocoa focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-terracotta sm:px-3"
              >
                Show all
              </button>
            ) : null}
          </div>
        </Wrap>
      </div>

      <section className="relative overflow-hidden py-14 lg:py-20">
        <Wrap className="relative">
          {/*
            THE FILTERED-STATE MESSAGE ("32 of 58 services, 2 sections
            collapsed") CAME OFF ON REQUEST -- this line now states the same
            total regardless of what is ticked, rather than switching to a
            running count of what is currently shown. `aria-live` came off
            with it: it existed only to announce that changing count, and a
            line that no longer changes has nothing for a screen reader to
            announce.

            `MENU_ITEM_COUNT` and `MENU.length` ARE ALREADY LIVE, not typed
            numbers -- the first is `MENU.reduce(...)` over every section's
            rows and the second is the array's own length (both in
            constants/menu.ts), so a service or a whole section added or
            removed there updates this line without anyone finding it here.
          */}
          <p className="mb-5 font-sans text-[13.5px] font-light tracking-[0.02em] text-ms-espresso/70">
            {MENU_ITEM_COUNT} services across {MENU.length} sections
          </p>

          <div className="overflow-hidden rounded-[20px] border border-ms-bronze/25 bg-ms-shell shadow-[0_24px_60px_-44px_rgba(44,25,11,0.5)]">
            <table className="block w-full border-collapse text-left md:table">
              <caption className="sr-only">
                Every service on the Mela Skin menu, by section, with its type
                and how it is sold. Prices are quoted at consultation.
              </caption>

              {/*
                Proportioned rather than left to the content. Auto layout gave the
                names a narrow column and pushed "Sold as" to the far right edge
                with 300px of nothing in front of it, because the widest cell in
                each column was setting the width.
              */}
              <colgroup className="hidden md:table-column-group">
                <col className="w-[44%]" />
                <col className="w-[24%]" />
                <col className="w-[32%]" />
              </colgroup>

              <thead className="hidden md:table-header-group">
                <tr className="border-b border-ms-bronze/30 bg-ms-paper">
                  <th scope="col" className={COL_HEAD}>
                    Service
                  </th>
                  <th scope="col" className={COL_HEAD}>
                    Type
                  </th>
                  <th scope="col" className={COL_HEAD}>
                    Sold as
                  </th>
                </tr>
              </thead>

              {sections.map(({ section, rows }) => {
                const on = picked.has(section.id);
                const open = isOpen(section.id);
                const label = (
                  <SectionLabel
                    title={section.title}
                    icon={section.icon}
                    count={rows.length}
                    filtering={filtering}
                    open={open}
                  />
                );

                return (
                  /*
                    One tbody per section, carrying the section's id so the hero
                    button and any deep link still land on it.

                    `scroll-mt` here is ONLY the filter bar. The site header is
                    handled once for the whole site by `scroll-padding-top` on
                    `html`, and counting it again here would overshoot every jump
                    by the height of the header.
                  */
                  <tbody
                    key={section.id}
                    id={section.id}
                    className="block scroll-mt-[76px] md:table-row-group"
                  >
                    {/*
                      Cocoa rather than bronze on the header's rules: on the two
                      darkest tints a bronze hairline disappears, and then the
                      header stops reading as a header exactly when its section is
                      the one being looked at.
                    */}
                    <tr
                      className={`block border-y border-ms-cocoa/20 md:table-row ${
                        on ? (TINT[section.id] ?? FALLBACK_TINT) : "bg-ms-paper"
                      }`}
                    >
                      <th
                        scope="colgroup"
                        colSpan={3}
                        className={`block p-0 text-left md:table-cell`}
                      >
                        {/*
                          A button only while something is collapsed. With nothing
                          ticked every section is already open, and a control whose
                          only effect is to close four other sections is not what a
                          reader clicking a heading expects.
                        */}
                        {filtering ? (
                          <button
                            type="button"
                            onClick={() => toggle(section.id)}
                            aria-expanded={open}
                            className={`flex w-full cursor-pointer text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ms-terracotta ${
                              on ? "" : "hover:bg-ms-cream/60"
                            } ${CELL}`}
                          >
                            {label}
                          </button>
                        ) : (
                          <span className={`block ${CELL}`}>{label}</span>
                        )}
                      </th>
                    </tr>

                    {open
                      ? rows.map((row) => (
                          <tr
                            key={row.name}
                            className={`block border-b border-ms-bronze/15 md:table-row ${
                              on ? (TINT[section.id] ?? FALLBACK_TINT) : ""
                            }`}
                          >
                            <td
                              className={`block pb-0 md:table-cell md:pb-4 md:align-top ${CELL}`}
                            >
                              <span className="font-display text-[1.15rem] leading-[1.3] tracking-[-0.01em] text-ms-cocoa md:text-[1.2rem]">
                                {row.name}
                              </span>
                            </td>

                            {/*
                              On a phone these two carry their own labels, because
                              the headings they belong to are not on screen.
                              Espresso rather than bronze or terracotta: those fail
                              AA on the two darkest tints, and one label has to
                              hold on all five.
                            */}
                            <td
                              className={`block pb-0 pt-2 md:table-cell md:pt-4 md:align-top ${CELL}`}
                            >
                              <span className={META_LABEL}>Type</span>
                              <span className={META_VALUE}>{row.group}</span>
                            </td>

                            <td
                              className={`block pt-1.5 md:table-cell md:pt-4 md:align-top ${CELL}`}
                            >
                              <span className={META_LABEL}>Sold as</span>
                              <span className={META_VALUE}>{row.offering}</span>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                );
              })}
            </table>
          </div>
        </Wrap>
      </section>
    </>
  );
}
