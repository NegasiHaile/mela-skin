import type { ReactNode } from "react";
import { Sparkle } from "./brand/Marks";

/**
 * Primitives for the immersive direction: full-bleed sections flooded with a
 * single colour, wide-tracked Larken caps, pill controls. No cards, no
 * gutters — the opposite of /editorial, which uses floating rounded panels.
 */

/** Scroll-timeline stagger classes (`.reveal-d1`…`-d3`). Index 0 is unstaggered. */
export function revealStagger(index: number): string {
  if (index <= 0) return "";
  return `reveal-d${Math.min(index, 3)}`;
}

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

export function SectionHead({
  title,
  tone = "light",
  className,
}: {
  title: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const head = tone === "dark" ? "text-ms-ivory" : "text-ms-cocoa";

  return (
    <div className={className}>
      <h2
        className={`display-caps text-[clamp(2.15rem,4vw,3.5rem)] ${head}`}
      >
        {title}
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
    <a href={href} className={`${PILL} ${skin} ${className ?? ""}`}>
      {children}
    </a>
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
    <a href={href} className={`${PILL} ${skin} ${className ?? ""}`}>
      {children}
    </a>
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
