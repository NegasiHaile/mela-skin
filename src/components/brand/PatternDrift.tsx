"use client";

import { useEffect } from "react";
import { TILE_H } from "./BrandPattern";

/*
  ONE counter-scroll for every pattern layer on the page.

  Rendered once, by MotionProvider, so it is present on every route without
  anybody remembering to add it. It sets a single custom property on :root and
  every `PatternField` translates by it.

  WHY IT HAS TO BE GLOBAL. Each section used to drift by its own scroll progress,
  which meant two stacked sections were never offset by the same amount and their
  lattices could not line up. One value shared by every layer keeps the whole
  page-wide lattice rigid while still letting it move against the page — the
  relationship the letterhead has with the sheet it is printed on.

  WHY IT WRAPS AT ONE TILE. `% TILE_H` keeps the value bounded, which matters
  because each layer overhangs its section by exactly one tile and a larger
  offset would expose an edge. The wrap is invisible: the pattern is periodic
  with TILE_H, so translating by t and by t - TILE_H paint the same pixels.

  WHY IT IS A CUSTOM PROPERTY AND NOT STATE. Writing one string to :root on a
  scroll frame costs nothing and never re-renders React. The layers consume it in
  a `transform`, so the browser composites rather than repainting eight tiled
  backgrounds.
*/

/** Fraction of the scroll distance the ground travels. */
const RATE = 0.06;

export function PatternDrift() {
  useEffect(() => {
    const root = document.documentElement;

    /*
      Reduced motion gets a still ground. The property is simply never set, so
      the layers fall back to their 0px default.
    */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const write = () => {
      frame = 0;
      const drift = (((window.scrollY * RATE) % TILE_H) + TILE_H) % TILE_H;
      root.style.setProperty("--ms-pattern-drift", `${drift}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      root.style.removeProperty("--ms-pattern-drift");
    };
  }, []);

  return null;
}
