import Link from "next/link";
import type { ReactNode } from "react";
import { Sparkle } from "./brand/Marks";
import { Lines } from "@/motion";

/**
 * Primitives for the immersive direction: full-bleed sections flooded with a
 * single colour, wide-tracked Larken caps, pill controls. No cards, no
 * gutters — the opposite of /editorial, which uses floating rounded panels.
 */

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative ${className ?? ""}`}>
      {children}
    </section>
  );
}

export function Wrap({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-14 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/**
 * Section heading: the words rise out from behind their own masks, so the head
 * announces the section rather than simply being present when you arrive at it.
 *
 * A GOLD HAIRLINE USED TO DRAW ITSELF IN ABOVE THE WORDS, 220px of it, and it
 * has gone. Once the bands started ramping into each other it was the only
 * horizontal line left near a boundary, and a line sitting a hundred pixels
 * under a join that is deliberately soft reads as the separator that join is
 * trying not to be. The colour change is the division now, and it does not need
 * announcing twice.
 *
 * `title` is a plain string, not a node: `Lines` has to split it into words to
 * mask them individually.
 */
export function SectionHead({
  title,
  tone = "light",
  className,
}: {
  title: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const head = tone === "dark" ? "text-ms-ivory" : "text-ms-cocoa";

  return (
    <div className={className}>
      <h2 className={`display-caps text-[clamp(2.15rem,4vw,3.5rem)] ${head}`}>
        <Lines text={title} />
      </h2>
    </div>
  );
}

const PILL =
  "inline-flex min-h-12 items-center justify-center rounded-full px-8 font-sans text-[12.5px] font-medium uppercase tracking-[0.14em] transition-colors duration-200";

export function PillSolid({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const skin =
    tone === "dark"
      ? "bg-ms-ivory text-ms-field hover:bg-ms-sand"
      : "bg-ms-field text-ms-ivory hover:bg-ms-panel";
  return (
    <Link href={href} className={`${PILL} ${skin} ${className ?? ""}`}>
      {children}
    </Link>
  );
}

export function PillGhost({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const skin =
    tone === "dark"
      ? "border border-ms-ivory/55 text-ms-ivory hover:border-ms-ivory hover:bg-ms-ivory/10"
      : "border border-ms-bronze/45 text-ms-cocoa hover:border-ms-cocoa";
  return (
    <Link href={href} className={`${PILL} ${skin} ${className ?? ""}`}>
      {children}
    </Link>
  );
}

/**
 * The paragraph that sits under a section head. It is the only thing between a
 * heading and a wall of cards, so it is set to be read rather than skimmed.
 *
 * IT WENT UP A SIZE AND IN A MEASURE ON 1 SEP — 18/19/20px at 62 characters to
 * 19/21/23 at 54. Both halves of that are the same change: the ledes were cut to
 * roughly two thirds of their length, and a shorter line of larger type is what
 * that buys. 54ch is still inside the 45-75 the typographic rule of thumb gives,
 * and at 23px it is about nine words a line.
 */
export function Lede({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const skin = tone === "dark" ? "text-ms-cream/85" : "text-ms-espresso/80";
  return (
    <p
      className={`max-w-[54ch] font-sans text-[19px] font-light leading-[1.7] sm:text-[21px] lg:text-[23px] lg:leading-[1.65] ${skin} ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/**
 * A highlighted aside. Used for the things a visitor genuinely needs to see
 * and would otherwise scroll past — the caution on skin tags, the note on what
 * a consultation covers, the one service that is not bookable yet.
 *
 * ITS LABEL IS LARKEN, NOT TRACKED CAPS. "On deeper skin" appears ten times on
 * /medical-dermatology, which made it the most repeated small title on the site
 * and the clearest instance of the thing the 1 Sep note was about. The label
 * still earns its place — inside a coloured box it is what tells you why the box
 * is there — so it was set as a heading rather than removed.
 */
export function Callout({
  eyebrow,
  children,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const skin =
    tone === "dark"
      ? "border-ms-gold/35 bg-ms-espresso/40 text-ms-cream/85"
      : "border-ms-terracotta/30 bg-ms-cream/70 text-ms-espresso/85";
  const label = tone === "dark" ? "text-ms-gold" : "text-ms-terracotta-deep";

  return (
    <div
      className={`rounded-r-[10px] border-l-2 py-5 pl-5 pr-5 sm:pl-6 sm:pr-6 ${skin} ${className ?? ""}`}
    >
      {eyebrow ? (
        <p
          className={`mb-2.5 font-display text-[1.2rem] leading-[1.2] ${label}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <div className="font-sans text-[16px] font-light leading-[1.8] sm:text-[16.5px]">
        {children}
      </div>
    </div>
  );
}

/**
 * A visibly unfinished slot. Every photograph the clinic has not supplied yet
 * renders as one of these rather than as stock imagery, so nothing ships
 * looking finished when it is not.
 */
export function PhotoSlot({
  label,
  className,
  tone = "light",
}: {
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const skin =
    tone === "dark"
      ? "border-ms-sand/30 bg-gradient-to-br from-ms-panel to-ms-espresso text-ms-sand/85"
      : "border-ms-bronze/35 bg-gradient-to-br from-ms-shell to-ms-sand/55 text-ms-terracotta-deep";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3.5 border ${skin} ${className ?? ""}`}
    >
      <Sparkle width={14} height={28} fill="url(#ms-gold)" className="opacity-60" />
      <span className="eyebrow px-6 text-center font-normal">{label}</span>
    </div>
  );
}
