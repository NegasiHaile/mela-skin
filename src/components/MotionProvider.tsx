"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One motion policy for the whole tree.
 *
 * `reducedMotion="user"` is the accessibility contract: when the OS asks for
 * reduced motion, every transform and layout animation is dropped and only the
 * opacity fades remain, so nothing travels across the screen but nothing is
 * left stranded invisible either. It does not reach the scroll-linked hooks —
 * those check `useReducedMotion()` themselves in `motion.tsx`.
 *
 * Children are server-rendered and passed through as props, so this boundary
 * costs the page nothing beyond the provider itself.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
