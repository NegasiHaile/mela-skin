"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/constants";

/*
  Hero portrait stack with autoplay, pause-on-hover, and vertical indicators.

  Transition is a push: the incoming frame enters from the right and drives the
  outgoing frame off to the left, while the exiting frame fades as it leaves.
  Slide list lives in `heroSlides` (@/constants).
*/
const HOLD_MS = 7000;
const PUSH_MS = 1400;

export function HeroFrames() {
  const [active, setActive] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [pushing, setPushing] = useState(false);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(active);
  const pushingRef = useRef(false);
  activeRef.current = active;
  pushingRef.current = pushing;

  function pushTo(index: number) {
    if (pushingRef.current) return;
    const current = activeRef.current;
    if (index === current) return;
    setOutgoing(current);
    setActive(index);
    setPushing(true);
  }

  useEffect(() => {
    if (!pushing) return;
    const id = window.setTimeout(() => {
      setOutgoing(null);
      setPushing(false);
    }, PUSH_MS);
    return () => window.clearTimeout(id);
  }, [pushing]);

  useEffect(() => {
    if (paused || pushing) return;

    const id = window.setInterval(() => {
      const current = activeRef.current;
      pushTo((current + 1) % heroSlides.length);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, [paused, pushing, active]);

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
      {heroSlides.map((slide, index) => {
        const isActive = index === active;
        const isOutgoing = index === outgoing;

        let offset = "translate-x-full";
        let fade = "opacity-100";
        if (isActive) {
          offset = "translate-x-0";
          fade = "opacity-100";
        } else if (isOutgoing) {
          offset = "-translate-x-full";
          fade = "opacity-0";
        }

        return (
          <div
            key={slide.src}
            className={[
              "absolute inset-0 will-change-[transform,opacity]",
              pushing
                ? "motion-safe:transition-[transform,opacity] motion-safe:duration-[1400ms] motion-safe:ease-[cubic-bezier(0.33,0,0.2,1)]"
                : "",
              offset,
              fade,
            ].join(" ")}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={isActive ? slide.alt : ""}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="origin-bottom scale-[1.12] object-contain object-bottom sm:scale-[1.08] lg:scale-100"
            />
          </div>
        );
      })}

      <div
        className="absolute inset-y-0 right-3 z-20 flex flex-col items-center justify-center gap-2.5 sm:right-5 lg:right-6"
        role="tablist"
        aria-label="Hero images"
      >
        {heroSlides.map((slide, index) => {
          const selected = index === active;
          return (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`Show image ${index + 1}`}
              onClick={() => pushTo(index)}
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
