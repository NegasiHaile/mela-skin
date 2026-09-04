"use client";

import { useEffect, useRef } from "react";
import { TILE_H, TILE_W, patternTileUrl } from "./BrandPattern";

/*
  THE BRAND LATTICE OVER A SECTION.

  THE GROUND IS ONE CONTINUOUS GRADIENT AGAIN, shell at the top of the page to
  linen at the bottom (see the note in globals.css), which is what this file
  was built for the first time round and reverted away from once before, on
  request, in favour of isolated per-section flats (`shell`/`paper`/`cream`,
  rotating band by band). Those three are gone from TONES below along with
  every call site that named one -- `tone="light"` is what every light
  section passes now, the same translucent ink `components-editorial` always
  used, because a translucent ink is the only kind that does not step at a
  section boundary when the ground it sits on is continuously changing colour
  underneath it (see the note on `light` in TONES for why).

  `BrandPattern` builds the tile; this decides how it is worn. One job now,
  not two:

    PHASE   every section's lattice lines up with the section above it, so the
            pattern reads as ONE image running down the page rather than as a
            motif that restarts at every boundary.

  DEPTH -- how faint the lattice is near the top of the page and how strong it
  gets further down -- USED TO BE THE SECOND JOB HERE, measured once per
  section from that section's own midpoint. It moved to
  brand/PatternMotion.tsx, alongside the sideways drift that already lived
  there, and the reason is the same reason drift lives there rather than in
  each section: a value measured per section is constant across that whole
  section and only changes at its edges, which reads as a step at every
  boundary the moment neighbouring sections stop being flat, separately
  coloured bands. One value, shared by every layer and re-read on scroll
  rather than once per section, is what makes the strength change
  continuously with where you actually are on the page instead of jumping
  each time a new section starts.

  Three things have to be identical everywhere for the phase to work:

    scale   One tile size for the whole site (BrandPattern.TILE_W). Two sections
            at 400 and 620 can never line up, whatever else is done.
    drift   The scroll motion is global and identical for every layer, set once
            on :root by <PatternMotion>. Per-section parallax was, by
            definition, per-section phase drift.
    fade    A mask that fades the motif out towards a section edge and leaves it
            out is a gap at exactly the join we are trying to hide. Nothing here
            masks the lattice; the ground runs underneath it and it carries
            straight across.

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

  A ZOOM WAS TRIED HERE ON 1 SEP AND REVERTED THE SAME DAY, and the arithmetic is
  worth keeping so it is not tried a third time. Three things cannot all hold: one
  lattice running unbroken down the page, a zoom you can see, and no sliding.

    - Anchored to the DOCUMENT the lattice stays unbroken, but its boundaries sit
      at multiples of the tile height, so growing the tile by a fraction f slides
      the boundary near depth d by d x f. To keep that slide down, f has to be so
      small that nothing is visible.
    - Anchored PER BAND the zoom is visible and there is no slide, but two
      neighbouring bands are at different points in their crossing, so their
      lattices sit at different scales and the arcs step at every join.

  The second shipped briefly. It was the wrong trade: the connected flow down the
  page is the thing this whole file exists to produce, and no amount of movement
  buys it back. The pan is the motion.

  Sections that carry a `PatternField` must be `relative overflow-hidden` and
  put their own content in a positioned wrapper, because this layer is
  absolutely positioned and would otherwise paint over static in-flow content.
*/

/**
 * Circle gradient and strength per tone.
 *
 * Each pair is the ground itself mixed a fixed amount toward the palette's
 * darkest and its bronze, so every tone sits a few percent off its own ground —
 * the drama comes from scale, not from contrast. All values are mixes of
 * official palette colours, so retuning the palette retunes these.
 *
 * `ground` HAS GONE. It named the flat colour a tone's circles were drawn
 * against, and the ramps interpolated between those; nothing paints a flat
 * light ground any more, and nothing reads the field.
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
  field: {
    from: "#201208",
    to: "#49250d",
    opacity: 0.5,
  },
  /**
   * THE ONLY LIGHT TONE, and it is translucent where the others were opaque.
   *
   * It replaced four — shell, paper, cream, linen — each an opaque pair tuned to
   * one flat ground. That worked while every band HAD one flat ground. It
   * cannot work over a continuous gradient: an opaque ink is right at one point
   * on the ramp and wrong everywhere else, so the tile had to change at every
   * band boundary, and it stepped there. Measured on /about: 4 to 7 units out of
   * 255, across 87 to 99% of the page width, three times down the page. A
   * full-width hairline at every join, which is the one thing the section
   * grounds exist to avoid.
   *
   * A TRANSLUCENT INK CANNOT STEP, because there is one tile for the whole light
   * part of the site. It also tracks the ground for nothing: the contrast it
   * produces is `alpha x (ink - ground)`, which shrinks on its own as the ground
   * darkens down the page.
   *
   * FITTED, not picked. One ink and one alpha per gradient stop, least-squares
   * against what the four opaque pairs rendered over their own grounds, with the
   * error weighted by the layer opacity that reaches the screen. Worst case is
   * under four units out of 255 at full depth, against a step of four to seven
   * that it removes.
   *
   * #8C540A is close to the palette's Primary 4 and sits on the line the four
   * old pairs were already walking — every one of them was its ground pushed a
   * few percent toward this colour, which is why one ink fits all four.
   */
  light: {
    from: "rgba(140, 84, 10, 0.087)",
    to: "rgba(140, 84, 10, 0.184)",
    opacity: 0.42,
  },
  /** On --color-ms-panel #602F0F, Primary 3 — the reversed plates. */
  panel: {
    from: "#4b260d",
    to: "#784015",
    opacity: 0.5,
  },
  /** On `bg-ms-sand/35` over paper, which resolves to #E9D9C3. */
  sand: {
    from: "#dec9aa",
    to: "#d2b58f",
    opacity: 0.45,
  },
  /**
   * NOT a section ground. The hero demo's committed brown #74370C, which exists
   * only while the clinic is choosing between the two openings, and goes when
   * that choice is made along with hero/HeroOriginal.tsx. The circle gradient is
   * the committed one from b894798.
   */
  "hero-committed": {
    from: "#5e2c09",
    to: "#966029",
    opacity: 0.5,
  },
} as const;

export type PatternTone = keyof typeof TONES;

/** Built once per tone rather than per render — there are five of them. */
const TILE_URL: Record<PatternTone, string> = Object.fromEntries(
  (Object.keys(TONES) as PatternTone[]).map((tone) => [
    tone,
    patternTileUrl(TONES[tone].from, TONES[tone].to),
  ]),
) as Record<PatternTone, string>;

/**
 * One tiled lattice layer.
 *
 * IT OVERHANGS ITS SECTION BY ONE TILE on all four sides — TILE_H top and bottom
 * because the phase offset shifts the tile up by that much, TILE_W left and right
 * because the drift pans it sideways by that much. One tile and not more: the
 * pattern is periodic with exactly those two lengths, so a translation that wraps
 * at one of them is invisible and an overhang of exactly that much can never
 * expose an edge. TILE_H is also the one size that costs the phase nothing, since
 * (docTop - TILE_H) mod TILE_H equals docTop mod TILE_H.
 *
 * The drift is a transform rather than a moving `background-position`, so
 * scrolling composites instead of repainting the tile on every frame — which is
 * what a page with nine of these needs.
 *
 * OPACITY IS THE TONE TIMES THE DEPTH. The tone is how strong the ink is against
 * this particular ground; the depth is how far down the page the band sits. The
 * fallback is 1, so before hydration and under reduced motion every band paints
 * at its tone's own strength — the pattern is never missing, only briefly even.
 *
 * ONE LAYER PER SECTION, UNMASKED. The ramps under it are colour only, so the
 * lattice carries across a boundary without thinning at it.
 */
function Lattice({ tone }: { tone: PatternTone }) {
  return (
    <div
      style={{
        position: "absolute",
        top: -TILE_H,
        bottom: -TILE_H,
        left: -TILE_W,
        right: -TILE_W,
        backgroundImage: TILE_URL[tone],
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "left var(--ms-pattern-phase, 0px)",
        opacity: `calc(${TONES[tone].opacity} * var(--ms-pattern-depth, 1))`,
        transform: "translate3d(var(--ms-pattern-drift, 0px), 0, 0)",
      }}
    />
  );
}

export function PatternField({
  tone,
  className,
}: {
  /** Which lattice ink, NOT which ground: `light` or `field`. */
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
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;

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
      <Lattice tone={tone} />
    </div>
  );
}
