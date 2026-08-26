import Image from "next/image";
import Link from "next/link";
import { brand, nav } from "@/constants";
import type { NavChild, NavItem } from "@/constants";
import { Wordmark } from "./brand/Marks";
import { Mount } from "@/motion";
import { PillGhost, Wrap } from "./ui";

/*
  One header for every route.

  It does not stick. That is deliberate: the nav scrolls away and the page gets
  the full screen. The long pages carry their own in-page section nav instead,
  which is the thing you actually want pinned while scanning sixty priced items.

  THE TREATMENTS PANEL (lg and up). Medical and cosmetic used to sit side by
  side in the bar, which asked a visitor to know which half of dermatology
  their problem belonged to before they could click anything. They are one
  panel now: a picture, and a line each saying what the difference is.

  It opens on `group-hover` and on `group-focus-within`, so it works with a
  pointer, with a keyboard, and with no JavaScript at all. Three details hold
  it together:

  - The panel is positioned against the <nav>, not against the trigger. The nav
    is `relative`; the trigger sits inside a Framer Motion wrapper that writes
    a transform, and a transformed element becomes the containing block for
    absolutely positioned children. Anchoring to the nav also keeps a 46rem
    panel on screen at 1024px, which centring on the trigger does not. 38rem
    is the widest it can be and still clear the right gutter at 1024, where the
    nav starts furthest right relative to the viewport.
  - The gap between the bar and the card is the panel's own transparent
    padding, so the pointer never leaves the group on the way down. Take the
    padding off and the menu closes as you reach for it.
  - `invisible`, not `opacity-0` alone. Visibility hidden takes the links out
    of the accessibility tree and out of tab order until the panel is open.

  THE MOBILE MENU (below lg). A <details> panel dropping the full width of the
  screen, with the treatments group as a nested <details> inside it. Still no
  JavaScript. The panel is `absolute inset-x-0 top-full` against the header's
  own wrapper, which is why neither the <details> nor `Wrap` may carry
  `relative`, and nothing between them may carry a transform.
*/

type GroupItem = NavItem & { children: NavChild[] };

function DesktopDropdown({
  item,
  linkClass,
}: {
  item: GroupItem;
  linkClass: string;
}) {
  return (
    <div className="group/menu">
      <Link
        href={item.href}
        aria-haspopup="true"
        className={`inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.17em] transition-colors ${linkClass}`}
      >
        {item.label}
        <span
          aria-hidden="true"
          className="text-[7px] leading-none transition-transform duration-300 group-hover/menu:rotate-180 group-focus-within/menu:rotate-180"
        >
          &#9660;
        </span>
      </Link>

      <div className="invisible absolute left-0 top-full z-50 w-[min(38rem,calc(100vw-3rem))] translate-y-[-6px] pt-4 opacity-0 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100">
        {/*
          One row per treatment, and the row is the link. The picture is inside
          it rather than in a column of its own, so the image and the words it
          belongs to are the same target: there is no dead strip on the left
          where a click does nothing.

          No border, no corner radius. A single hairline divides the two rows
          and runs the full width, image included.

          Both files are dense 3:2 collages of labelled treatments and none of
          those labels can be read at this size. Centre-cropping is what makes
          them work anyway, landing the medical one on the clinician and
          patient and the cosmetic one on the model.
        */}
        <div className="overflow-hidden bg-ms-espresso shadow-[0_36px_70px_-28px_rgba(20,9,3,0.8)]">
          {item.children.map((child, index) => (
            <Link
              key={child.href}
              href={child.href}
              className={`group/row grid grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] transition-colors hover:bg-ms-panel/70 ${
                index > 0 ? "border-t border-ms-sand/20" : ""
              }`}
            >
              <span className="relative block min-h-[8.75rem] overflow-hidden bg-ms-panel">
                <Image
                  src={child.image}
                  alt={child.imageAlt}
                  fill
                  sizes="240px"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ms-espresso/75"
                />
              </span>

              <span className="flex flex-col justify-center px-6 py-6">
                <span className="flex items-center gap-2.5">
                  <span className="font-display text-[1.3rem] leading-none text-ms-ivory">
                    {child.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-sans text-[13px] text-ms-gold transition-transform duration-300 group-hover/row:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
                <span className="mt-2.5 block max-w-[40ch] font-sans text-[14px] font-light leading-[1.65] text-ms-cream/70">
                  {child.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileGroup({ item }: { item: GroupItem }) {
  return (
    <details className="group/sub border-b border-ms-sand/15">
      <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
        <span className="font-display text-[1.7rem] leading-none tracking-[-0.01em] text-ms-ivory">
          {item.label}
        </span>
        <span
          aria-hidden="true"
          className="font-sans text-[10px] leading-none text-ms-gold transition-transform duration-300 group-open/sub:rotate-180"
        >
          &#9660;
        </span>
      </summary>

      <div className="pb-5">
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block border-l border-ms-gold/30 py-4 pl-5"
          >
            <span className="block font-display text-[1.25rem] leading-none text-ms-cream">
              {child.label}
            </span>
            <span className="mt-2.5 block font-sans text-[14px] font-light leading-[1.6] text-ms-sand/75">
              {child.description}
            </span>
          </Link>
        ))}
      </div>
    </details>
  );
}

export function SiteHeader({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  const link = dark
    ? "text-ms-cream/80 hover:text-ms-ivory"
    : "text-ms-espresso/70 hover:text-ms-cocoa";
  const phone = dark
    ? "text-ms-sand hover:text-ms-ivory"
    : "text-ms-bronze hover:text-ms-cocoa";
  const burger = dark ? "border-ms-sand/40" : "border-ms-bronze/40";
  const bar = dark ? "bg-ms-cream" : "bg-ms-cocoa";

  return (
    <div className="relative z-40 shrink-0">
      <Wrap className="pointer-events-auto flex items-center justify-between gap-4 py-4 sm:py-6 lg:py-7">
        <Mount delay={0.05} y={-14} className="shrink-0">
          {/*
            Two sizes, and the big one waits for `xl`. With the pill gone below
            640px the lockup reads at `md` all the way down to 360px; at the
            other end, 332px of lockup plus the nav plus the pill does not fit
            a 1024px bar, and the nav silently wraps to two lines.
          */}
          <Link href="/" aria-label={`${brand.name} home`} className="block">
            <span className="xl:hidden">
              <Wordmark size="md" tone={dark ? "text-ms-ivory" : "text-ms-cocoa"} priority />
            </span>
            <span className="hidden xl:inline-flex">
              <Wordmark size="lg" tone={dark ? "text-ms-ivory" : "text-ms-cocoa"} priority />
            </span>
          </Link>
        </Mount>

        <Mount delay={0.12} y={-14} className="hidden lg:block">
          <nav
            aria-label="Primary"
            className="relative flex items-center gap-6 xl:gap-9"
          >
            {nav.map((item) =>
              item.children ? (
                <DesktopDropdown
                  key={item.href}
                  item={item as GroupItem}
                  linkClass={link}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-sans text-[12px] uppercase tracking-[0.17em] transition-colors ${link}`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </Mount>

        {/*
          The <details> is a sibling of the Mount, not a child of it. Framer
          Motion writes a `transform` onto whatever it animates, and a
          transformed element becomes the containing block for absolutely
          positioned descendants, which would snap the full-width panel back to
          the width of the burger.
        */}
        <div className="flex shrink-0 items-center gap-3">
          <Mount delay={0.18} y={-14} className="hidden items-center gap-3 sm:flex">
            <a
              href={brand.phoneHref}
              className={`hidden font-sans text-[13.5px] tracking-[0.03em] transition-colors 2xl:inline ${phone}`}
            >
              {brand.phone}
            </a>

            <PillGhost
              href="/contact"
              tone={tone}
              className="min-h-13 px-7 text-[13px] lg:min-h-14 lg:px-9 lg:text-[13.5px]"
            >
              Book now
            </PillGhost>
          </Mount>

          <details className="group lg:hidden [&>summary::-webkit-details-marker]:hidden">
            <summary
              aria-label="Menu"
              className={`flex size-12 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-full border transition-colors ${burger}`}
            >
              <span
                className={`h-px w-5 origin-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:translate-y-[6px] group-open:rotate-45 ${bar}`}
              />
              <span
                className={`h-px w-5 transition-opacity duration-200 group-open:opacity-0 ${bar}`}
              />
              <span
                className={`h-px w-5 origin-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:-translate-y-[6px] group-open:-rotate-45 ${bar}`}
              />
            </summary>

            {/*
              `max-h` plus its own scroll. With the treatments group expanded
              the panel is taller than the space under the bar on a short
              phone, and the sections it drops into are `overflow-hidden`, so
              without this the booking button is simply cut off.
            */}
            <div className="menu-drop scrollbar-hide absolute inset-x-0 top-full z-50 max-h-[calc(100svh-5rem)] overflow-y-auto overscroll-contain bg-ms-espresso shadow-[0_32px_64px_-24px_rgba(20,9,3,0.75)]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ms-gold/60 to-transparent"
              />

              <nav aria-label="Primary" className="relative px-6 pt-2 sm:px-10">
                {nav.map((item, index) => (
                  <div
                    key={item.href}
                    className="menu-row"
                    style={{ animationDelay: `${0.06 + index * 0.05}s` }}
                  >
                    {item.children ? (
                      <MobileGroup item={item as GroupItem} />
                    ) : (
                      <Link
                        href={item.href}
                        className="group/row flex min-h-[72px] items-center justify-between gap-6 border-b border-ms-sand/15 py-4"
                      >
                        <span className="font-display text-[1.7rem] leading-none tracking-[-0.01em] text-ms-ivory">
                          {item.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-sans text-[15px] text-ms-gold transition-transform duration-300 group-hover/row:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </Link>
                    )}
                  </div>
                ))}

                {/*
                  A gold hairline rather than another sand one. The rows above
                  are places to go and the two below are ways to reach a person;
                  same rhythm, different kind of thing, and the rule is what
                  says so without a heading.
                */}
                <a
                  href={brand.phoneHref}
                  style={{ animationDelay: `${0.06 + nav.length * 0.05}s` }}
                  className="menu-row mt-1 flex min-h-[64px] items-center justify-between gap-6 border-b border-ms-sand/15 border-t-ms-gold/30 pb-3 pt-4 [border-top-width:1px]"
                >
                  <span className="font-display text-[1.25rem] leading-none text-ms-cream">
                    {brand.phone}
                  </span>
                  <span className="eyebrow text-ms-gold">Call</span>
                </a>

                <a
                  href={`mailto:${brand.email}`}
                  style={{ animationDelay: `${0.06 + (nav.length + 1) * 0.05}s` }}
                  className="menu-row flex min-h-[64px] items-center justify-between gap-6 py-3"
                >
                  <span className="font-sans text-[16.5px] font-light text-ms-cream">
                    {brand.email}
                  </span>
                  <span className="eyebrow text-ms-gold">Email</span>
                </a>
              </nav>

              <div
                style={{ animationDelay: `${0.06 + (nav.length + 2) * 0.05}s` }}
                className="menu-row relative px-6 pb-7 pt-5 sm:px-10"
              >
                <Link
                  href="/contact"
                  className="flex min-h-14 w-full items-center justify-center rounded-full bg-ms-ivory px-8 font-sans text-[12.5px] font-medium uppercase tracking-[0.16em] text-ms-field transition-colors hover:bg-ms-sand"
                >
                  Book a consultation
                </Link>
              </div>
            </div>
          </details>
        </div>
      </Wrap>
    </div>
  );
}
