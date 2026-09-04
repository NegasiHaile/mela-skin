"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { PatternMotion } from "./brand/PatternMotion";

/**
 * One motion policy for the whole tree.
 *
 * `reducedMotion="user"` is the accessibility contract: when the OS asks for
 * reduced motion, every transform and layout animation is dropped and only the
 * opacity fades remain, so nothing travels across the screen but nothing is
 * left stranded invisible either. It does not reach the scroll-linked hooks —
 * those check `useReducedMotion()` themselves in `motion.tsx`.
 *
 * `LazyMotion` with `domAnimation` is the weight decision. Importing
 * `motion.div` anywhere pulls Framer's whole feature set into the first-load
 * bundle, including the layout-projection engine and drag, none of which this
 * site uses. `domAnimation` is animations and gestures: entrance fades, the
 * word masks, the scroll-linked drifts and the hover lift, which is all of it.
 * `strict` turns any stray `motion.*` back into a build error rather than a
 * silent return to the full bundle.
 *
 * `PatternMotion` rides along here because it is the same kind of thing: one
 * policy for the whole tree, set once, that every section then reads. It
 * writes two custom properties on :root and renders nothing -- the pattern's
 * sideways drift and its depth (how strong the ink reads at the current
 * scroll position). Every `PatternField` on the page reads both, which is
 * what keeps the pattern lattice rigid and continuously fading in strength
 * across section boundaries rather than stepping at them -- see
 * brand/PatternField.tsx and brand/PatternMotion.tsx.
 *
 * Children are server-rendered and passed through as props, so this boundary
 * costs the page nothing beyond the provider itself.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <PatternMotion />
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
