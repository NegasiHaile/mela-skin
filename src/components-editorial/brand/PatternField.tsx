"use client";

/*
  Duplicated from ../../components/brand/PatternField.tsx on purpose, exactly as
  BrandPattern is: each direction folder stands alone so the losing one can be
  deleted whole. The shared motion primitives live in @/motion, which is
  direction-neutral.
*/
import { m } from "framer-motion";
import { useRef } from "react";
import { useDriftY } from "@/motion";
import { BrandPattern } from "./BrandPattern";

/*
  The brand pattern as a section ground.

  `BrandPattern` draws the motif; this decides how it is worn. Three things
  turn a letterhead watermark into a web background without it becoming
  wallpaper:

  1. The sparkle colour of each tone IS the section's own background colour, so
     the interstices disappear into the ground and only the circles read. The
     pattern therefore never fights the copy for the same value.
  2. A mask fades it out where the type sits. `fade` picks which edge survives.
  3. It counter-scrolls a little (`drift`), so the ground has depth behind the
     content rather than moving locked to it — the same relationship the
     letterhead has with the sheet it is printed on.

  Sections that carry it must put their own content in a positioned wrapper
  (`relative`), because this layer is absolutely positioned and would otherwise
  paint over static in-flow content.
*/

/**
 * Circle gradient + interstice colour per section ground. Sampled to sit a few
 * percent off the ground itself; the drama comes from scale, not contrast.
 */
const TONES = {
  /** On --color-ms-field #74370c. The banner artwork's own relationship. */
  field: { from: "#5e2c09", to: "#966029", sparkle: "#7d3f11" },
  /** On --color-ms-espresso #31180a. */
  espresso: { from: "#2a1409", to: "#5b3116", sparkle: "#31180a" },
  /** On --color-ms-shell #fdfcf8. */
  shell: { from: "#f8f3ea", to: "#efe5d5", sparkle: "#fdfcf8" },
  /** On --color-ms-paper #f4efeb. */
  paper: { from: "#efe7dd", to: "#e6d9c8", sparkle: "#f4efeb" },
  /** On --color-ms-cream #f3e7d6. */
  cream: { from: "#ecdcc6", to: "#dfcbb0", sparkle: "#f3e7d6" },
  /** On --color-ms-panel #542b15 — the editorial direction's reversed cards. */
  panel: { from: "#452110", to: "#7d4520", sparkle: "#542b15" },
  /** On `bg-ms-sand/35` over paper, which resolves to about #ebe3d7. */
  sand: { from: "#e4dac9", to: "#d6c6ac", sparkle: "#ebe3d7" },
} as const;

/**
 * Where the pattern survives and where it gives way to flat ground. Named for
 * the edge that stays inked.
 */
const FADES = {
  none: undefined,
  edges:
    "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
  top: "linear-gradient(to bottom, #000 0%, transparent 72%)",
  bottom: "linear-gradient(to top, #000 0%, transparent 72%)",
  left: "linear-gradient(to right, #000 0%, #000 24%, transparent 66%)",
  right: "linear-gradient(to left, #000 0%, #000 24%, transparent 66%)",
  radial: "radial-gradient(72% 62% at 50% 46%, #000 0%, transparent 100%)",
} as const;

type Props = {
  /** Unique per instance — SVG defs are document-global. */
  id: string;
  tone: keyof typeof TONES;
  fade?: keyof typeof FADES;
  /** Tile width in px. Larger reads as architecture, smaller as texture. */
  scale?: number;
  /** 0-1. Light grounds want more than dark ones to read at all. */
  opacity?: number;
  /** Counter-scroll travel in px across the section's pass. 0 pins it. */
  drift?: number;
  className?: string;
};

export function PatternField({
  id,
  tone,
  fade = "edges",
  scale = 340,
  opacity = 0.6,
  drift = 40,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useDriftY(ref, drift);
  const mask = FADES[fade];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={
        mask
          ? { maskImage: mask, WebkitMaskImage: mask }
          : undefined
      }
    >
      {/*
        Overhangs the section top and bottom so the drift never exposes an
        edge. The overhang has to beat `drift` in px; 10% of any real section
        clears 40px comfortably.
      */}
      <m.div
        className="absolute inset-x-0 -inset-y-[10%]"
        style={{ opacity, ...(y ? { y } : {}) }}
      >
        <BrandPattern
          id={id}
          {...TONES[tone]}
          scale={scale}
          className="h-full w-full"
        />
      </m.div>
    </div>
  );
}
