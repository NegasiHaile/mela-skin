"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroBackground, heroFrames, heroSamples } from "@/constants";

/*
  The hero's full-bleed ground: images that slide.

  ONE IMAGE AT A TIME, BEHIND EVERYTHING. That is the shape the 26 Aug review of
  four reference sites settled on — the Canadian site's full-screen clinic space
  with the clinic's name over it, which is the half of Elevate that Abseret
  picked out ("I also like the Elevate one where they had the clinic name",
  00:48:09).

  WHY IT SLIDES RATHER THAN FADES. The meeting asked for the landing page to
  move, repeatedly and in those words. Aser [00:37:22]: "what about a dynamic
  landing page? Like a lot of tech businesses have like motion, graphics." Mo
  [00:47:02]: "it shows the entrance, the reception, the waiting area, and then
  flips into the cosmetic procedures." Dr. Gachanja [00:49:44]: "a blend between
  this Canadian and the Elevate, because of the dynamic aspect." A cross-fade
  between two interiors of the same building reads as a dissolve and is easy to
  miss; a push reads as moving through the space.

  HOW THE PUSH WORKS, and why there is no clone frame. Every frame is stacked at
  `inset-0` and given one of three positions:

    in    translate-x-0        the frame you are looking at
    out   -translate-x-full    the one being pushed off to the left
    wait  translate-x-full     everything else, parked off to the right

  Only `in` and `out` carry a transition. A frame going from `out` to `wait`
  therefore jumps from -100% to +100% with no animation — it is off-screen at
  both ends, so the jump is invisible. That is what replaces the clone frame,
  the untransitioned snap-back and the two chained `requestAnimationFrame`s the
  old transform-track version needed: with per-frame positions there is nothing
  to rewind, so the movement is always leftward for free.

  The outgoing frame also scales down slightly and the incoming one starts a
  little large. Two flat images sliding past each other read as cards; a small
  difference in scale reads as depth.

  WHAT IT SHOWS. `heroFrames` is the clinic's own photography, and all three
  entries are still empty (Aser, 00:49:00: "we don't have the clean space
  pictures yet"). Until then it slides through `heroSamples` — three licensed
  stock interiors, credited on the page. If both were empty it would fall back to
  the generated brand ground. The `FRAMES` pick below is the whole mechanism.

  THE SCRIMS ARE `ms-field`, NOT `ms-espresso`. They were espresso, and that made
  the home page open a stop darker than the band at the top of every other route,
  all of which are `bg-ms-field` flat. Same token now, and measured off the
  render the two are one to four values of 255 apart.

  Motion is CSS transitions, so the global reduced-motion rule in globals.css
  covers it: with transitions cut to nothing the slider still advances, it just
  arrives already there. With a single frame nothing moves at all.
*/

const HOLD_MS = 6000;
const SLIDE_MS = 1400;

/** The clinic's own photographs if it has any, else the samples, else the ground. */
const FRAMES: readonly { id: string; src: string }[] = (() => {
  const own = heroFrames.filter((frame) => frame.src);
  if (own.length) {
    return own.map((frame) => ({ id: frame.id, src: frame.src as string }));
  }
  if (heroSamples.length) {
    return heroSamples.map((frame) => ({ id: frame.id, src: frame.src }));
  }
  return [{ id: heroBackground.id, src: heroBackground.src }];
})();

export function HeroBackground() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const count = FRAMES.length;

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        setPrevious(current);
        return (current + 1) % count;
      });
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <>
      {/*
        `z-0` and `pointer-events-none` are both load-bearing, and leaving either
        off is a bug rather than a nicety.

        WITHOUT `z-0` this wrapper is `z-index: auto`, which means it does NOT
        create a stacking context, which means the scrims below it — at `z-20` —
        do not stack inside it. They join the section's own stacking context and
        paint over the content, which sits at `z-10`. Any positioned element with
        a z-index other than `auto` closes that hole; 0 is the one that changes
        nothing else.

        WITHOUT `pointer-events-none` the scrims are three full-bleed divs lying
        on top of the header and the buttons, and every click in the first screen
        lands on a decoration. That is exactly what happened: the nav went dead.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {FRAMES.map((frame, position) => {
          const state =
            position === active ? "in" : position === previous ? "out" : "wait";

          return (
            <div
              key={frame.id}
              className={`absolute inset-0 ${
                state === "in"
                  ? "z-10 translate-x-0 scale-100 transition-transform ease-[cubic-bezier(0.32,0.08,0.24,1)]"
                  : state === "out"
                    ? "z-0 -translate-x-full scale-[0.94] transition-transform ease-[cubic-bezier(0.32,0.08,0.24,1)]"
                    : "z-0 translate-x-full scale-[1.06]"
              }`}
              style={
                state === "wait"
                  ? undefined
                  : { transitionDuration: `${SLIDE_MS}ms` }
              }
            >
              <Image
                src={frame.src}
                alt=""
                fill
                priority={position === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {/*
          FOUR LAYERS, all `ms-field`, so the hero opens on the same brown as
          every other route. They sit above the sliding frames and never move, so
          the wash stays constant while the picture underneath changes.

          1. A flat 60% wash across the whole frame. This is what makes a stock
             interior read as the brand's colour rather than as somebody else's
             building: the frames average around #938066, and 60% field over that
             lands near #53402e — the flooded colour lit, not a different one.
          2. A left weight to 62% under the type column, carried far enough right
             to cover the whole tagline. Measured off the render: ivory reads
             5.0:1 behind the tagline at 1440px and 6.9:1 at 390px, and cream
             6.6:1 behind the paragraph.
          3. A top band under the header. The nav runs the full width, so unlike
             the tagline it cannot rely on the left weight — its right-hand items
             sat over the brightest part of the photograph and read weakly. This
             is the only scrim whose job is a specific piece of interface rather
             than the picture.
          4. A bottom lift under the buttons and the credit line.
        */}
        <div className="absolute inset-0 z-20 bg-ms-field/60" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-ms-field/62 via-ms-field/38 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-20 h-52 bg-gradient-to-b from-ms-field/85 via-ms-field/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-20 h-2/5 bg-gradient-to-t from-ms-field/50 to-transparent" />
      </div>
    </>
  );
}
