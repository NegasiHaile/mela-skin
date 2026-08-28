"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/*
  The committed hero's portrait push-slider, restored verbatim for the demo.

  RESTORED FROM b894798, NOT REWRITTEN. This is `components/HeroFrames.tsx` as it
  stood on the last commit, with one change: the slides are declared here rather
  than imported from `constants/brand.ts`, because `heroSlides` was removed from
  the constants when the hero changed. A frozen snapshot that reaches into live
  constants is a snapshot that quietly rots, so this one carries its own.

  It is a track: one element carrying every frame side by side, moved left one
  container width per slide. One transform on one element rather than three
  elements each animating themselves.

  WHY IT IS A TRACK. The version before it set the offsets and added the
  `transition-*` classes in the same render. A CSS transition only starts if the
  transition property is already on the element in the before-change style — add
  it in the same commit as the value change and the browser has nothing to
  interpolate from, so every frame snapped into place instead of sliding. The
  track's transition is never conditional, so there is no such frame.

  WHY THERE IS A CLONE. The list ends with a second copy of the first frame.
  Reaching it and then snapping back (transition off for one frame, then on
  again) is what keeps the movement always leftward. Without it the wrap from the
  last frame to the first rewinds the whole track to the right, which reads as a
  glitch rather than as a loop.

  Percentages resolve against the transformed element's own width, so the track
  is `absolute inset-0` — exactly one container wide — and the frames are
  positioned along it by `left`. Give the track the combined width instead and
  every translate is out by a factor of the frame count.
*/

/** As committed. The portraits are generated, which is why the hero changed. */
const SLIDES = [
  {
    src: "/images/hero.webp",
    alt: "Woman with radiant melanin-rich skin, the Mela Skin patient aesthetic",
  },
  {
    src: "/images/pigmentation-melasma.webp",
    alt: "Melanin-rich skin with a calm, luminous finish",
  },
  {
    src: "/images/acne-acne_scarring.webp",
    alt: "Clear, treated skin after dermatology care",
  },
] as const;

const HOLD_MS = 5200;
const SLIDE_MS = 1100;

/** The real frames, plus a copy of the first to loop into. */
const TRACK = [...SLIDES, SLIDES[0]];

export function HeroOriginalFrames() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const count = SLIDES.length;
  const active = index % count;

  /* Autoplay. The functional update means the interval never needs rebuilding
     when the frame changes, so the hold is a full HOLD_MS every time. */
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => i + 1), HOLD_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  /* Landed on the clone: let the slide finish, then jump back untransitioned. */
  useEffect(() => {
    if (index !== count) return;
    const id = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, count]);

  /* Restore the transition, but only after the jump has been painted. One frame
     is not enough: the style has to be committed first, or re-enabling it in the
     same frame animates the jump we just tried to hide. */
  useEffect(() => {
    if (animate) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animate]);

  const goTo = useCallback((target: number) => {
    setAnimate(true);
    setIndex(target);
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className={`absolute inset-0 will-change-transform ${
          animate
            ? "motion-safe:transition-transform motion-safe:duration-[1100ms] motion-safe:ease-[cubic-bezier(0.32,0.08,0.24,1)]"
            : ""
        }`}
        style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
      >
        {TRACK.map((slide, position) => (
          <div
            key={`${slide.src}-${position}`}
            className="absolute inset-y-0 w-full"
            style={{ left: `${position * 100}%` }}
            aria-hidden={position !== active}
          >
            <Image
              src={slide.src}
              alt={position === active ? slide.alt : ""}
              fill
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="origin-bottom scale-[1.12] object-contain object-bottom sm:scale-[1.08] lg:scale-100"
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-y-0 right-3 z-20 flex flex-col items-center justify-center gap-2.5 sm:right-5 lg:right-6"
        role="tablist"
        aria-label="Hero images"
      >
        {SLIDES.map((slide, position) => {
          const selected = position === active;
          return (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`Show image ${position + 1}`}
              onClick={() => goTo(position)}
              className={[
                "rounded-full transition-[transform,background-color,box-shadow] duration-300",
                selected
                  ? "h-6 w-2 bg-ms-ivory shadow-[0_0_0_1px_rgba(253,252,232,0.35)] sm:h-7"
                  : "size-2.5 bg-ms-ivory/45 hover:bg-ms-ivory/75",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}
