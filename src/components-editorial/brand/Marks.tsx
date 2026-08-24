/**
 * Brand marks — real artwork from Resources/Marketing/Social Media,
 * processed to a tight transparent PNG (outer cream removed, ring edge-to-edge).
 */
import Image from "next/image";
import { brand } from "@/lib/brand";

const SPARKLE_PATH =
  "M6 0C6.35 7.2 8.8 11.5 12 12C8.8 12.5 6.35 16.8 6 24C5.65 16.8 3.2 12.5 0 12C3.2 11.5 5.65 7.2 6 0Z";

export function Sparkle({
  className,
  width = 12,
  height = 24,
  fill = "currentColor",
}: {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={SPARKLE_PATH} fill={fill} />
    </svg>
  );
}

/** Gold ramp for any remaining SVG accents. Rendered once near the page root. */
export function GoldDefs() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ms-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8c6a1e" />
          <stop offset="16%" stopColor="#ebd693" />
          <stop offset="34%" stopColor="#b8912f" />
          <stop offset="54%" stopColor="#f4e7b6" />
          <stop offset="74%" stopColor="#a87f22" />
          <stop offset="100%" stopColor="#dcbc63" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Official gold monogram — transparent outside the ring, no side padding. */
export function Monogram({
  size = 132,
  className,
  title,
  priority = false,
}: {
  size?: number;
  className?: string;
  title?: string;
  priority?: boolean;
}) {
  const label = title ?? `${brand.name} monogram`;
  return (
    <Image
      src="/brand/logo.png"
      alt={title ? label : ""}
      width={size}
      height={size}
      priority={priority}
      className={className}
      aria-hidden={title ? undefined : true}
    />
  );
}

const WORDMARK_SCALE = {
  sm: { mark: 28, gap: "gap-2" },
  md: { mark: 40, gap: "gap-2.5" },
  lg: { mark: 56, gap: "gap-3" },
} as const;

/**
 * Header / footer lockup: official monogram + Larken wordmark.
 * Uses the processed logo PNG so the gold mark matches social artwork.
 */
export function Wordmark({
  className,
  size = "md",
  descriptor = true,
  tone = "text-ms-cocoa",
  align = "left",
  showMark = true,
  priority = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  descriptor?: boolean;
  tone?: string;
  align?: "left" | "center";
  showMark?: boolean;
  priority?: boolean;
}) {
  const scale = {
    sm: { mark: "text-lg", tracking: "0.02em", desc: "text-[7px]" },
    md: { mark: "text-2xl", tracking: "0.02em", desc: "text-[8px]" },
    lg: { mark: "text-5xl", tracking: "0.015em", desc: "text-[11px]" },
  }[size];
  const markPx = WORDMARK_SCALE[size].mark;

  return (
    <span
      className={`inline-flex items-center ${WORDMARK_SCALE[size].gap} ${align === "center" ? "justify-center" : ""} ${className ?? ""}`}
    >
      {showMark && (
        <Monogram size={markPx} priority={priority} className="shrink-0" />
      )}
      <span
        className={`inline-flex flex-col ${align === "center" ? "items-center text-center" : ""} ${tone}`}
      >
        <span className="inline-flex items-start">
          <span
            className={`font-display font-bold uppercase leading-none ${scale.mark}`}
            style={{ letterSpacing: scale.tracking }}
          >
            Mela Skin
          </span>
          <span
            aria-hidden="true"
            className="ml-[0.35em] mt-[0.15em] text-[0.42em] leading-none opacity-70"
          >
            ®
          </span>
        </span>
        {descriptor && (
          <span
            className={`mt-[0.5em] font-sans font-medium uppercase leading-none ${scale.desc}`}
            style={{ letterSpacing: "0.18em" }}
          >
            Dermatology &amp; Cosmetic Clinic
          </span>
        )}
      </span>
    </span>
  );
}

/** Raster wordmark lockup (transparent) for places that need the artwork as-is. */
export function WordmarkImage({
  className,
  width = 220,
  priority = false,
}: {
  className?: string;
  width?: number;
  priority?: boolean;
}) {
  const height = Math.round(width * (249 / 1200));
  return (
    <Image
      src="/brand/logo-wordmark.png"
      alt={brand.name}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
