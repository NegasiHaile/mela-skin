"use client";

import { useEffect, useRef } from "react";
import { TILE_H, patternTileUrl } from "./BrandPattern";

/*
  The brand pattern as a section ground.

  `BrandPattern` builds the tile; this decides how it is worn. The whole job is
  now one thing: make every section's lattice line up with the section above it,
  so the pattern reads as ONE image running down the page with the colour
  changing at each boundary — rather than as a motif that restarts at every
  section, which is what it did before.

  Three things had to become identical everywhere for that to work, and all
  three used to be per-section props:

    scale   One tile size for the whole site (BrandPattern.TILE_W). Two sections
            at 400 and 620 can never line up, whatever else is done.
    drift   The counter-scroll is now global and identical for every layer, set
            once on :root by <PatternDrift>. Per-section parallax was, by
            definition, per-section phase drift.
    fade    Gone. A mask that fades the pattern out towards a section edge puts
            a gap at exactly the join we are trying to make invisible.

  WHAT IS STILL PER SECTION: the colour, which is the point. Each tone's sparkle
  colour IS the section's own background, so the interstices disappear into the
  ground and only the circles read.

  THERE IS NO `espresso` TONE any more. `--color-ms-espresso` and
  `--color-ms-field` are the same value now (see globals.css), so a second dark
  tone would have been the field tone under another name — and a tone whose
  sparkle colour does not match its section's ground is the one way to make this
  layer visible as a layer. The two sections that used it take `field`.

  THE PHASE. A repeating background starts at the element's own top-left, so two
  stacked sections both start a fresh tile and the lattice jumps at the boundary.
  The fix is to offset each one by how far down the document it sits:

      background-position-y = -(distance from the top of the document mod TILE_H)

  which lands every section on the tile the page-wide lattice would have there.
  It is measured rather than derived because section heights depend on content,
  fonts and images, so a ResizeObserver on the body re-measures when anything
  above a section changes height. Before hydration each section falls back to
  starting its own tile, which is exactly the old behaviour — the pattern is
  never missing, only briefly out of phase.

  THE OVERHANG IS EXACTLY ONE TILE, top and bottom. That is not a round number
  picked for comfort: an overhang of any other size would shift the tile origin
  and have to be corrected for in the phase. At exactly TILE_H the correction is
  a no-op, because (docTop - TILE_H) mod TILE_H equals docTop mod TILE_H.

  Sections that carry a `PatternField` must be `relative overflow-hidden` and
  put their own content in a positioned wrapper, because this layer is
  absolutely positioned and would otherwise paint over static in-flow content.
*/

/**
 * Circle gradient, interstice colour and strength per section ground.
 *
 * Each pair is the ground itself mixed a fixed amount toward the palette's
 * darkest and its bronze, so every tone sits a few percent off its own ground —
 * the drama comes from scale, not from contrast. All values are mixes of
 * official palette colours, so retuning the palette retunes these.
 *
 * `opacity` moved in here from a prop. It was set at 34 call sites and drifted
 * to seven different values for four grounds; one number per tone is one number
 * to tune.
 *
 * THESE ARE ROUGHLY HALF WHAT THE PROPS USED TO CARRY, and that is a
 * consequence of dropping the fade masks. A mask meant most of a section only
 * ever saw part of the motif, so a nominal 0.85 read as a whisper across the
 * band as a whole. Uncovered, the same number reads as wallpaper — which is the
 * one thing this section ground must never be (Mo, 00:47:02: "it's too busy.
 * Even when I look at it, I'm not sure what exactly to look at"). Judged on the
 * rendered page at both widths, not modelled.
 */
const TONES = {
  /** On --color-ms-field #2C190B, Primary 2 — the signature flood. */
  field: { from: "#201208", to: "#49250d", sparkle: "#2c190b", opacity: 0.5 },
  /** On --color-ms-shell #FDFCF8, Secondary 6. */
  shell: { from: "#f6f1e8", to: "#efe5d6", sparkle: "#fdfcf8", opacity: 0.4 },
  /** On --color-ms-paper #F9F3E9 (derived: 45% cream into shell). */
  paper: { from: "#f2e7d8", to: "#e8d7c1", sparkle: "#f9f3e9", opacity: 0.4 },
  /** On --color-ms-cream #F4E7D6, Primary 7. */
  cream: { from: "#e8d5bb", to: "#dfc7a8", sparkle: "#f4e7d6", opacity: 0.42 },
  /** On --color-ms-panel #602F0F, Primary 3 — the reversed plates. */
  panel: { from: "#4b260d", to: "#784015", sparkle: "#602f0f", opacity: 0.5 },
  /** On `bg-ms-sand/35` over paper, which resolves to #E9D9C3. */
  sand: { from: "#dec9aa", to: "#d2b58f", sparkle: "#e9d9c3", opacity: 0.45 },
} as const;

export type PatternTone = keyof typeof TONES;

/** Built once per tone rather than per render — there are seven of them. */
const TILE_URL: Record<PatternTone, string> = Object.fromEntries(
  (Object.keys(TONES) as PatternTone[]).map((tone) => [
    tone,
    patternTileUrl(TONES[tone].from, TONES[tone].to, TONES[tone].sparkle),
  ]),
) as Record<PatternTone, string>;

export function PatternField({
  tone,
  className,
}: {
  tone: PatternTone;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
      /* Modulo of a negative offset would flip the sign, so normalise. */
      const phase = ((top % TILE_H) + TILE_H) % TILE_H;
      el.style.setProperty("--ms-pattern-phase", `${-phase}px`);
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("resize", schedule);
    /*
      Anything above this section changing height moves it down the document and
      changes its phase: a font swapping in, an image landing, the mobile menu
      opening. Watching the body covers all of them with one observer.
    */
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {/*
        The tiled layer, overhanging by exactly one tile top and bottom so the
        global drift never exposes an edge. The drift is a transform rather than
        a moving `background-position`, so scrolling composites instead of
        repainting the tile on every frame — which is what a page with eight of
        these needs.
      */}
      <div
        className="absolute inset-x-0"
        style={{
          top: -TILE_H,
          bottom: -TILE_H,
          backgroundImage: TILE_URL[tone],
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "left var(--ms-pattern-phase, 0px)",
          opacity: TONES[tone].opacity,
          transform: "translate3d(0, var(--ms-pattern-drift, 0px), 0)",
        }}
      />
    </div>
  );
}
