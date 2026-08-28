"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { DrawRule, EASE } from "@/motion";
import { Sparkle } from "./brand/Marks";

/**
 * The page is a stack of rounded cards floating on `ms-paper`, so almost
 * everything below is about that shell: `Shell` sets the outer gutter, `Card`
 * is the rounded surface, `Inner` the padding inside one.
 *
 * Motion lives in `Card` rather than in the sections, because in this
 * direction the card IS the section. Each one settles onto the paper as it
 * enters — a short rise out of a 1.5% underscale, which reads as a sheet being
 * laid down rather than as a block sliding in. Everything inside a card then
 * staggers against that single arrival, so the page has one rhythm and not
 * nine competing ones.
 */

export function Shell({ children }: { children: ReactNode }) {
  return <div className="px-3 sm:px-5 lg:px-6">{children}</div>;
}

export function Card({
  children,
  className,
  as = "section",
  id,
  still = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "footer" | "div";
  id?: string;
  /** Opt out of the arrival — for the hero, which is already on screen. */
  still?: boolean;
}) {
  const Tag = m[as];

  return (
    <Tag
      id={id}
      data-motion={still ? undefined : ""}
      className={`relative overflow-hidden rounded-[22px] shadow-[0_1px_2px_rgba(49,24,10,0.04),0_18px_40px_-24px_rgba(49,24,10,0.16)] ${className ?? ""}`}
      {...(still
        ? {}
        : {
            initial: { opacity: 0, y: 34, scale: 0.985 },
            whileInView: { opacity: 1, y: 0, scale: 1 },
            viewport: { once: true, margin: "0px 0px -10% 0px" },
            transition: { duration: 0.9, ease: EASE },
          })}
    >
      {children}
    </Tag>
  );
}

export function Inner({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative px-7 py-16 sm:px-10 lg:px-16 lg:py-24 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function SectionLabel({
  index,
  children,
  tone = "light",
}: {
  index: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const accent = tone === "dark" ? "text-ms-terracotta" : "text-ms-terracotta-deep";
  const muted = tone === "dark" ? "text-ms-sand" : "text-ms-bronze";
  const rule = tone === "dark" ? "bg-ms-sand/40" : "bg-ms-bronze/40";

  return (
    <div className="flex items-center gap-3.5">
      <span className={`eyebrow ${accent}`}>{index}</span>
      <DrawRule className={`h-px w-8 ${rule}`} />
      <span className={`eyebrow font-normal ${muted}`}>{children}</span>
    </div>
  );
}

/** Display heading. `accent` renders in Larken italic, in the brand terracotta. */
export function Display({
  children,
  accent,
  after,
  className,
  tone = "light",
}: {
  children: ReactNode;
  accent?: string;
  after?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const base = tone === "dark" ? "text-ms-ivory" : "text-ms-cocoa";
  return (
    <span className={`font-display font-normal ${base} ${className ?? ""}`}>
      {children}
      {accent && (
        <>
          {" "}
          <em
            className={`italic ${tone === "dark" ? "text-ms-caramel" : "text-ms-terracotta"}`}
          >
            {accent}
          </em>
        </>
      )}
      {after ? ` ${after}` : null}
    </span>
  );
}

const BUTTON_BASE =
  "inline-flex min-h-12 items-center justify-center rounded-[3px] px-8 font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200";

export function ButtonPrimary({
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
      ? "bg-ms-sand text-ms-panel hover:bg-ms-ivory"
      : "bg-ms-panel text-ms-ivory hover:bg-ms-espresso";

  return (
    <a href={href} className={`${BUTTON_BASE} ${skin} ${className ?? ""}`}>
      {children}
    </a>
  );
}

export function ButtonGhost({
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
      ? "border border-ms-sand/40 text-ms-cream hover:border-ms-sand hover:bg-ms-ivory/5"
      : "border border-ms-bronze/40 text-ms-cocoa hover:border-ms-cocoa";

  return (
    <a href={href} className={`${BUTTON_BASE} ${skin} ${className ?? ""}`}>
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
  rounded = "rounded-[18px]",
}: {
  label: string;
  className?: string;
  tone?: "light" | "dark";
  rounded?: string;
}) {
  const skin =
    tone === "dark"
      ? "border-ms-sand/25 bg-gradient-to-br from-ms-cocoa to-ms-espresso text-ms-sand/70"
      : "border-ms-bronze/25 bg-gradient-to-br from-ms-ivory to-ms-sand/50 text-ms-bronze";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3.5 border ${rounded} ${skin} ${className ?? ""}`}
    >
      <Sparkle width={14} height={28} fill="url(#ms-gold)" className="opacity-60" />
      <span className="eyebrow px-6 text-center font-normal">{label}</span>
    </div>
  );
}
