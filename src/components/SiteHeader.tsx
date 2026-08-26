import Link from "next/link";
import { brand, nav } from "@/constants";
import { Wordmark } from "./brand/Marks";
import { Mount } from "@/motion";
import { PillGhost, Wrap } from "./ui";

/*
  One header for every route.

  The site used to be a single page, so the hero carried a wordmark and a
  booking pill and that was the whole of it. With medical, cosmetic and the
  priced menu on their own routes, the same bar has to work on all four — and
  it has to work on the field colour (home hero, dark) and on paper (every
  subpage, light) without becoming two components.

  It does not stick. That is deliberate and unchanged: the nav scrolls away and
  the page gets the full screen. The long pages carry their own in-page section
  nav instead, which is the thing you actually want pinned while scanning sixty
  priced items.

  Narrow screens get a <details> disclosure rather than a JS drawer — no
  hydration needed, and it works before the bundle lands.
*/

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
    <Wrap className="pointer-events-auto flex shrink-0 items-center justify-between gap-4 py-4 sm:py-6 lg:py-7">
      <Mount delay={0.05} y={-14} className="shrink-0">
        <Link href="/" aria-label={`${brand.name} home`} className="block">
          <span className="sm:hidden">
            <Wordmark size="sm" tone={dark ? "text-ms-ivory" : "text-ms-cocoa"} priority />
          </span>
          <span className="hidden sm:inline-flex lg:hidden">
            <Wordmark size="md" tone={dark ? "text-ms-ivory" : "text-ms-cocoa"} priority />
          </span>
          <span className="hidden lg:inline-flex">
            <Wordmark size="lg" tone={dark ? "text-ms-ivory" : "text-ms-cocoa"} priority />
          </span>
        </Link>
      </Mount>

      <Mount delay={0.12} y={-14} className="hidden lg:block">
        <nav aria-label="Primary" className="flex items-center gap-9">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-sans text-[12px] uppercase tracking-[0.17em] transition-colors ${link}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Mount>

      <Mount delay={0.18} y={-14} className="flex shrink-0 items-center gap-3">
        <a
          href={brand.phoneHref}
          className={`hidden font-sans text-[13.5px] tracking-[0.03em] transition-colors xl:inline ${phone}`}
        >
          {brand.phone}
        </a>

        <PillGhost
          href="#book"
          tone={tone}
          className="min-h-11 px-6 text-[12px] sm:min-h-13 sm:px-7 sm:text-[13px] lg:min-h-14 lg:px-9 lg:text-[13.5px]"
        >
          <span className="sm:hidden">Book</span>
          <span className="hidden sm:inline">Book now</span>
        </PillGhost>

        <details className="relative lg:hidden [&_summary::-webkit-details-marker]:hidden">
          <summary
            aria-label="Open menu"
            className={`flex size-11 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-full border ${burger}`}
          >
            <span className={`h-px w-4 ${bar}`} />
            <span className={`h-px w-4 ${bar}`} />
            <span className={`h-px w-4 ${bar}`} />
          </summary>
          <nav
            aria-label="Primary"
            className="absolute right-0 top-[calc(100%+0.85rem)] z-50 flex w-64 flex-col rounded-[14px] border border-ms-bronze/25 bg-ms-ivory p-1.5 shadow-[0_22px_50px_-20px_rgba(49,24,10,0.6)]"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-12 items-center rounded-[9px] px-4 font-sans text-[12px] uppercase tracking-[0.17em] text-ms-cocoa hover:bg-ms-cream"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={brand.phoneHref}
              className="mt-1 flex min-h-12 items-center border-t border-ms-bronze/20 px-4 font-sans text-[14px] text-ms-bronze"
            >
              {brand.phone}
            </a>
          </nav>
        </details>
      </Mount>
    </Wrap>
  );
}
