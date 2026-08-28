import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { brand, nav } from "@/constants";
import type { NavChild, NavItem, NavList } from "@/constants";
import { Wordmark } from "./brand/Marks";
import { Mount } from "@/motion";
import { PillGhost, Wrap } from "./ui";

/*
  One header for every route.

  It does not stick. That is deliberate: the nav scrolls away and the page gets
  the full screen. The long pages carry their own in-page section nav instead,
  which is the thing you actually want pinned while scanning sixty priced items.

  THE PANELS (lg and up). Two of the four items open one.

  Treatments is a pair of picture cards. Medical and cosmetic used to sit side
  by side in the bar, which asked a visitor to know which half of dermatology
  their problem belonged to before they could click anything.

  Treatment menu is a list: the five menu sections, each with how many
  treatments it holds and how they are sold. Deliberately not a second set of
  cards -- the question there is what the clinic offers and in what shape, and a
  photograph cannot answer it, so the panel is shaped like the menu it opens
  into.

  Both run through one `Dropdown` shell, so only the contents differ and the
  open and close behaviour cannot drift apart. It opens on `group-hover` and on
  `group-focus-within`, so it works with a pointer, with a keyboard, and with
  no JavaScript at all. Three details hold it together:

  - The panel is positioned against its own trigger: the group is `relative`,
    which beats the transform Framer Motion writes onto the wrapper further up.
    Treatments is the first item in the bar, so its panel lands exactly where
    it did when the whole nav was the anchor; the narrower list panel now
    follows the item it belongs to instead of the left edge of the nav. 38rem
    and 24rem are the widest each can be and still clear the right gutter at
    1024px, where the nav starts furthest right relative to the viewport.
  - The gap between the bar and the card is the panel's own transparent
    padding, so the pointer never leaves the group on the way down. Take the
    padding off and the menu closes as you reach for it.
  - `invisible`, not `opacity-0` alone. Visibility hidden takes the links out
    of the accessibility tree and out of tab order until the panel is open.

  THE MOBILE MENU (below lg). A <details> panel dropping the full width of the
  screen, with both panelled items as nested <details> inside it -- same rows,
  no pictures, since the panel is already as wide as the screen. Still no
  JavaScript. The panel is `absolute inset-x-0 top-full` against the header's
  own wrapper, which is why neither the <details> nor `Wrap` may carry
  `relative`, and nothing between them may carry a transform.
*/

type CardItem = NavItem & { children: NavChild[] };
type ListItem = NavItem & { list: NavList };

/** The two items that open a panel rather than only navigating. */
const opensPanel = (item: NavItem) => Boolean(item.children || item.list);

/**
 * The trigger, the hover and focus mechanics, and the panel's position and
 * card. Everything both dropdowns have in common; `children` is the only part
 * that differs, and `width` the only thing either has to tune.
 */
function Dropdown({
  item,
  linkClass,
  width,
  children,
}: {
  item: NavItem;
  linkClass: string;
  width: string;
  children: ReactNode;
}) {
  return (
    <div className="group/menu relative">
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

      <div
        className={`invisible absolute left-0 top-full z-50 translate-y-[-6px] pt-4 opacity-0 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100 ${width}`}
      >
        <div className="overflow-hidden rounded-[20px] bg-ms-espresso shadow-[0_36px_70px_-28px_rgba(44,25,11,0.8)]">
          {children}
        </div>
      </div>
    </div>
  );
}

/*
  One row per treatment, and the row is the link. The picture is inside it
  rather than in a column of its own, so the image and the words it belongs to
  are the same target: there is no dead strip on the left where a click does
  nothing.

  No border, and one hairline dividing the two rows, running the full width
  with the image included. The 20px radius comes from the shell, whose
  `overflow-hidden` is what makes the pictures follow those corners instead of
  squaring them off again.

  Both files are dense 3:2 collages of labelled treatments and none of those
  labels can be read at this size. Centre-cropping is what makes them work
  anyway, landing the medical one on the clinician and patient and the cosmetic
  one on the model.
*/
function TreatmentCards({ item }: { item: CardItem }) {
  return (
    <>
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
    </>
  );
}

/*
  The five menu sections. Each row carries the two things worth knowing before
  opening a page of sixty treatments: how much is in the section, and whether it
  is one-off work or a course. The count is read out of the menu data, so it
  cannot disagree with the page it links into.

  There used to be a from-price on the right of every row. It went with the rest
  of the pricing on 27 Aug -- see the header of constants/menu.ts.

  The last row goes to the whole page. The trigger above already does, but a
  visitor with the panel open has no way of knowing that, and reaching back up
  to a word that looks like a label is not a thing to ask of anyone.
*/
function MenuList({ item }: { item: ListItem }) {
  return (
    <ul>
      {item.list.rows.map((row, index) => (
        <li key={row.href}>
          <Link
            href={row.href}
            className={`group/row flex items-baseline justify-between gap-5 px-6 py-4 transition-colors hover:bg-ms-panel/70 ${
              index > 0 ? "border-t border-ms-sand/15" : ""
            }`}
          >
            <span className="min-w-0">
              <span className="block font-display text-[1.15rem] leading-none text-ms-ivory">
                {row.label}
              </span>
              <span className="mt-2 block font-sans text-[12px] tracking-[0.02em] text-ms-cream/55">
                {row.meta}
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-2.5 font-sans text-[13px] tracking-[0.01em] text-ms-gold">
              {row.offered}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/row:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </Link>
        </li>
      ))}

      <li>
        <Link
          href={item.list.all.href}
          className="group/row flex items-center justify-between gap-5 border-t border-ms-sand/25 bg-ms-panel/45 px-6 py-4 transition-colors hover:bg-ms-panel/85"
        >
          <span className="font-sans text-[11.5px] uppercase tracking-[0.18em] text-ms-cream/75">
            {item.list.all.label}
          </span>
          <span
            aria-hidden="true"
            className="font-sans text-[13px] text-ms-gold transition-transform duration-300 group-hover/row:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </li>
    </ul>
  );
}

/**
 * Either panel, flattened for the mobile menu: a name and a line under it,
 * inside a nested <details>. The card panel's line is its description; the
 * list panel's is its count and how it sells, joined, because at this width
 * there is nothing to gain from holding the second half out to the right.
 */
function MobileGroup({ item }: { item: NavItem }) {
  const links = item.children
    ? item.children.map((child) => ({
        label: child.label,
        href: child.href,
        note: child.description,
      }))
    : item.list
      ? [
          ...item.list.rows.map((row) => ({
            label: row.label,
            href: row.href,
            note: `${row.meta} · ${row.offered}`,
          })),
          { label: item.list.all.label, href: item.list.all.href, note: "" },
        ]
      : [];

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
        {links.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block border-l border-ms-gold/30 py-4 pl-5"
          >
            <span className="block font-display text-[1.25rem] leading-none text-ms-cream">
              {child.label}
            </span>
            {child.note ? (
              <span className="mt-2.5 block font-sans text-[14px] font-light leading-[1.6] text-ms-sand/75">
                {child.note}
              </span>
            ) : null}
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

  /*
    The dark tone got stronger when the home hero gained a photograph behind it.
    On the flat field colour cream at 80% was comfortable; over a picture the
    nav's right-hand items sat on the brightest part of the frame and were the
    weakest thing on the screen. Full cream now.

    The hero carries a top scrim as well (HeroBackground.tsx, layer 3); the two
    together are what make the bar legible wherever the picture happens to be
    bright. Neither on its own was enough.
  */
  const link = dark
    ? "text-ms-cream hover:text-ms-ivory"
    : "text-ms-espresso/70 hover:text-ms-cocoa";
  const burger = dark ? "border-ms-cream/55" : "border-ms-bronze/40";
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
              <Wordmark size="md" tone={dark ? "text-ms-ivory" : "text-ms-cocoa"} />
            </span>
            <span className="hidden xl:inline-flex">
              <Wordmark size="lg" tone={dark ? "text-ms-ivory" : "text-ms-cocoa"} />
            </span>
          </Link>
        </Mount>

        <Mount delay={0.12} y={-14} className="hidden lg:block">
          <nav
            aria-label="Primary"
            className="flex items-center gap-6 xl:gap-9"
          >
            {nav.map((item) => {
              if (item.children) {
                return (
                  <Dropdown
                    key={item.href}
                    item={item}
                    linkClass={link}
                    width="w-[min(38rem,calc(100vw-3rem))]"
                  >
                    <TreatmentCards item={item as CardItem} />
                  </Dropdown>
                );
              }

              if (item.list) {
                return (
                  <Dropdown
                    key={item.href}
                    item={item}
                    linkClass={link}
                    width="w-[min(24rem,calc(100vw-3rem))]"
                  >
                    <MenuList item={item as ListItem} />
                  </Dropdown>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-sans text-[12px] uppercase tracking-[0.17em] transition-colors ${link}`}
                >
                  {item.label}
                </Link>
              );
            })}
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
          {/*
            The pill, and nothing beside it. A phone number used to sit to its
            left from `2xl` up; it went with the Contact item, for the same
            reason. The bar had three ways to reach the clinic within a few
            centimetres of each other, and the one that matters on a desktop is
            the button. Tap-to-call is still in the mobile menu, where it is the
            shortest route to an appointment rather than a third duplicate.
          */}
          <Mount delay={0.18} y={-14} className="hidden items-center gap-3 sm:flex">
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
            <div className="menu-drop scrollbar-hide absolute inset-x-0 top-full z-50 max-h-[calc(100svh-5rem)] overflow-y-auto overscroll-contain bg-ms-espresso shadow-[0_32px_64px_-24px_rgba(44,25,11,0.75)]">
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
                    {opensPanel(item) ? (
                      <MobileGroup item={item} />
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
