import Link from "next/link";
import type { ReactNode } from "react";
import { Sparkle } from "./brand/Marks";
import { DrawRule, Lines } from "@/motion";

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

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className ?? ""}`}>{children}</p>;
}

/**
 * Section heading. The gold hairline draws itself in from the left, then the
 * words rise out from behind their own masks — so the head announces the
 * section rather than simply being present when you arrive at it.
 *
 * `title` is a plain string, not a node: `Lines` has to split it into words to
 * mask them individually.
 */
export function SectionHead({
  title,
  tone = "light",
  className,
  rule = true,
}: {
  title: string;
  tone?: "light" | "dark";
  className?: string;
  /** Set false where the head sits tight under other ornament. */
  rule?: boolean;
}) {
  const head = tone === "dark" ? "text-ms-ivory" : "text-ms-cocoa";

  return (
    <div className={className}>
      {rule ? <DrawRule className="hairline-gold mb-7 w-full max-w-[220px]" /> : null}
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
 * The paragraph that sits under a section head. One size larger than body copy
 * and held to about 60 characters a line, because it is the only thing between
 * a heading and a wall of cards and it has to be read rather than skimmed.
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
      className={`max-w-[62ch] font-sans text-[18px] font-light leading-[1.75] sm:text-[19px] lg:text-[20px] lg:leading-[1.8] ${skin} ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/**
 * A highlighted aside. Used for the things a visitor genuinely needs to see
 * and would otherwise scroll past — the caution on skin tags, the note on what
 * a consultation covers, the one service that is not bookable yet.
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
      {eyebrow ? <p className={`eyebrow mb-2.5 ${label}`}>{eyebrow}</p> : null}
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
      : "border-ms-bronze/25 bg-gradient-to-br from-ms-shell to-ms-sand/55 text-ms-bronze";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3.5 border ${skin} ${className ?? ""}`}
    >
      <Sparkle width={14} height={28} fill="url(#ms-gold)" className="opacity-60" />
      <span className="eyebrow px-6 text-center font-normal">{label}</span>
    </div>
  );
}
