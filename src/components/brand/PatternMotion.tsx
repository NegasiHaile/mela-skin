"use client";

import { useEffect } from "react";
import { TILE_W } from "./BrandPattern";

/*
  TWO SCROLL-LINKED VALUES FOR EVERY PATTERN LAYER ON THE PAGE, WRITTEN ONCE.

  Rendered once, by MotionProvider, so both are present on every route without
  anybody remembering to add them. Each sets a single custom property on
  :root; every `PatternField` reads both.

  THIS FILE WAS `PatternDrift.tsx` AND ONLY DID THE FIRST OF THE TWO. The
  second, depth, used to live in PatternField.tsx itself, measured ONCE PER
  SECTION from that section's own midpoint and re-measured only on resize —
  never on scroll. That was fine while every section flooded its own isolated
  flat colour (see the retired-ground note in globals.css): a step in the
  pattern's strength at a section boundary was invisible next to the harder
  step in the ground colour sitting right on top of it. It stopped being fine
  the moment the ground became one continuous gradient: a tall section's
  pattern now sat at one constant strength for its entire height, and jumped
  to a different constant the instant the next section began, which is
  exactly the "horizontal line" a continuous ground was supposed to remove.
  Depth moved here, alongside drift, for the same reason drift already lived
  here and not in each section: one value, shared by every layer, is the only
  way two neighbours can agree at the exact pixel where one becomes the other.

  DRIFT PANS SIDEWAYS. It used to be a vertical counter-scroll — the ground
  travelling up at 6% of the scroll distance, so the lattice appeared to lag
  behind the page. That is the most common parallax there is, and against a
  motif this large it read as the whole background sliding.

  Horizontal is the same idea turned ninety degrees, and it behaves
  differently in a way that matters: the type, the rules and the cards on a
  page all move vertically, so a ground that also moves vertically competes
  with them and a ground that moves across does not. What you see is the
  lattice travelling slowly along the page while everything on it goes down —
  closer to a sheet being drawn out from under the copy than to a backdrop
  lagging behind it.

  It is also the axis this pattern can afford to move on. Vertically the tile
  has a phase that has to stay pinned to the document, or the sections stop
  lining up with each other (see PatternField). Horizontally there is nothing
  to line up against, so the pattern is free to travel as far as it likes.

  DEPTH IS HOW STRONG THE INK READS, from a floor near the top of the page to
  a ceiling most of the way down it — the letterhead's own printed pattern is
  faint under the letterhead and heavier toward the foot of the sheet, and
  this is that same idea read continuously off the CURRENT SCROLL POSITION
  (the middle of the viewport, not the top of it, so what is on screen right
  now is what the ramp answers for) rather than off any one section.

  BOTH ARE `requestAnimationFrame`-THROTTLED FROM ONE SCROLL LISTENER, not two,
  since both need the same scroll event at the same rate and there is nothing
  to gain from listening twice.

  WHY BOTH ARE CUSTOM PROPERTIES AND NOT STATE. Writing two strings to :root
  on a scroll frame costs nothing and never re-renders React. The layers
  consume them in `transform` and `opacity`, so the browser composites rather
  than repainting nine tiled backgrounds.
*/

/**
 * Fraction of the scroll distance the ground travels sideways.
 *
 * Higher than the 0.06 the vertical version ran at, and it can be: a
 * horizontal offset does not fight the reading direction, so it stays calm
 * at a rate that would have been obvious going up. At 0.09 a full viewport of
 * scrolling moves the lattice about 70px against a 520px tile — a seventh of
 * a motif, which is enough to notice on purpose and not enough to catch the
 * eye while reading.
 */
const DRIFT_RATE = 0.09;

/**
 * How much of a tone's opacity survives at the top of the page, how far down
 * the scroll a section reads at full ceiling strength, and how strong that
 * ceiling actually is.
 *
 * ALL THREE MOVED, ON REQUEST, FROM THE LETTERHEAD-MATCHED VALUES THE retired
 * per-section version used (floor 0.32, ceiling effectively 1.0, reached by
 * 80% down the page): the top of the page needed to read whiter with the
 * pattern barely there, the reveal needed to take longer, and the bottom of
 * the light run needed to stop arriving at full strength at all. None of
 * these three is measured off anything; they are picked and judged on the
 * rendered page, the same way the letterhead-matched ones originally were.
 */
const DEPTH_FLOOR = 0.16;
const DEPTH_CEILING = 0.5;
/** Ceiling strength arrives at 92% of the way down the document, not 80%. */
const DEPTH_FULL_AT = 0.92;
/**
 * Bends the ramp so the early scroll reads slower than a straight line would:
 * strength grows as `progress ** DEPTH_EASE`, and an exponent above 1 holds
 * the early part of the curve down near the floor for longer before it picks
 * up, rather than climbing at a constant rate from the first pixel of scroll.
 */
const DEPTH_EASE = 1.5;

export function PatternMotion() {
  useEffect(() => {
    const root = document.documentElement;

    /*
      Reduced motion gets a still, floor-strength ground. Neither property is
      set, so drift falls back to its 0px default and depth to Lattice's own
      `var(--ms-pattern-depth, 1)` fallback -- which is why that fallback is
      1, not the floor: reduced motion is not the same request as "always
      faint", and a reader who asked only for stillness still gets the
      pattern at the strength its tone was tuned for.
    */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const write = () => {
      frame = 0;

      const drift = (((window.scrollY * DRIFT_RATE) % TILE_W) + TILE_W) % TILE_W;
      root.style.setProperty("--ms-pattern-drift", `${drift}px`);

      const docHeight = document.documentElement.scrollHeight;
      const viewportMiddle = window.scrollY + window.innerHeight / 2;
      const progress =
        docHeight > 0
          ? Math.min(viewportMiddle / (docHeight * DEPTH_FULL_AT), 1)
          : 1;
      const eased = progress ** DEPTH_EASE;
      const depth = DEPTH_FLOOR + (DEPTH_CEILING - DEPTH_FLOOR) * eased;
      root.style.setProperty("--ms-pattern-depth", depth.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.removeProperty("--ms-pattern-drift");
      root.style.removeProperty("--ms-pattern-depth");
    };
  }, []);

  return null;
}
