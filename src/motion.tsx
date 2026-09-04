"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Fragment, useRef, type ReactNode } from "react";

/*
  Motion system.

  One vocabulary for the whole page, so every section moves the same way:

    Reveal / Stagger  copy blocks rise and fade as they enter
    Lines             headings arrive word by word from behind a mask
    Wipe              images uncover from a clip and settle out of overscale
    Drift             slow counter-scroll on backgrounds and portraits

  Two rules hold it together. Travel is short — 24-32px, never a slide across
  the screen — and everything eases on the same expo-out curve, which is what
  makes the page read as one object rather than as a set of tricks.

  Reduced motion is handled in two places: `MotionConfig reducedMotion="user"`
  in the root layout drops every transform while keeping the fades, and the
  scroll-linked hooks below (which MotionConfig does not cover) check
  `useReducedMotion()` themselves and hand back a static value.
*/

/** Expo-out. The page's one easing curve. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/*
  Trigger the moment a block is 12% into the viewport, and never again.
  `amount` is deliberately left at its default rather than set to a fraction: a
  block taller than the screen would never satisfy a fractional threshold and
  would sit faded out forever.
*/
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/*
  THE SAME TRIGGER WITH NO DEAD ZONE, for blocks at the very end of a document.

  THE BUG IT FIXES, because it is not obvious and it cost the footer its small
  print. The margin above holds the trigger line 12% of the viewport above the
  bottom edge, so a block fires when

      top < scrollY + 0.88 x V

  and scrollY stops at `doc - V`. The highest threshold a reader can ever reach
  is therefore `doc - 0.12 x V`, and ANY BLOCK WHOSE TOP IS INSIDE THE LAST
  0.12 x V OF THE DOCUMENT NEVER FIRES. It is not a race or a timing problem:
  there is no scroll position from which those pixels satisfy the condition.

  That dead zone is 108px at a 900px viewport and 173px at 1440. The footer's
  copyright line sits 60px from the end of the document on every route, so it
  was invisible on every screen; the contact strip, at 142px, went the same way
  on anything taller than about 1190px.

  `margin: "0px"` fires as soon as a single pixel of the block enters the
  viewport, which has no dead zone at either end. It is only right at the end of
  a document -- everywhere else the 12% is what stops a block animating while it
  is still half off the screen -- and at the end of a document the reader has
  already arrived, so the delay bought nothing there anyway.

  USE IT FOR ANYTHING IN THE LAST 200px OF A PAGE. Today that is the footer and
  only the footer, on all seven routes.
*/
const VIEWPORT_END = { once: true, margin: "0px" } as const;

/* -- Reveal --------------------------------------------------------------- */

/*
  Deliberately narrow. Spreading the full set of div props onto a motion
  component collides with Motion's own gesture handlers — `onDrag` and friends
  take a PanInfo, not a React DragEvent — so only the attributes these wrappers
  actually need to forward are allowed through.
*/
type PassThrough = {
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  /**
   * For a scroll container whose contents are not focusable. The menu rails are
   * the case: nothing in a treatment card is a link, so without a tab stop on
   * the scroller itself a keyboard reader can never reach past the cards that
   * happen to be on screen.
   */
  tabIndex?: number;
};

/** A block that rises into place once, when it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  eager = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  /** Seconds. Use for hand-placed offsets; prefer <Stagger> for lists. */
  delay?: number;
  /** Travel distance in px. 0 gives a pure fade. */
  y?: number;
  /**
   * Fire on the first pixel instead of at 12%. REQUIRED for anything within
   * about 200px of the end of the document, which otherwise never fires at all
   * -- see VIEWPORT_END above.
   */
  eager?: boolean;
} & PassThrough) {
  return (
    <m.div
      data-motion=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={eager ? VIEWPORT_END : VIEWPORT}
      transition={{ duration: 0.85, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

/* -- Stagger -------------------------------------------------------------- */

/**
 * Parent for a run of <StaggerItem>s. Children animate in sequence off a
 * single viewport trigger, so a four-card row arrives as one wave rather than
 * as four independent events firing at whatever speed the reader scrolled.
 */
export function Stagger({
  children,
  className,
  step = 0.09,
  delay = 0.04,
  as = "div",
  eager = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  /** Gap between children, in seconds. */
  step?: number;
  /** Delay before the first child, in seconds. */
  delay?: number;
  as?: "div" | "ul" | "ol" | "dl" | "nav";
  /**
   * Fire on the first pixel instead of at 12%. REQUIRED within about 200px of
   * the end of the document -- see VIEWPORT_END above.
   */
  eager?: boolean;
} & PassThrough) {
  const Tag = m[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={eager ? VIEWPORT_END : VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: step, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** A child of <Stagger>. Timing comes from the parent, not from here. */
export function StaggerItem({
  children,
  className,
  as = "div",
  y = 26,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "p";
  y?: number;
} & PassThrough) {
  const Tag = m[as];

  return (
    <Tag
      data-motion=""
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* -- Headings ------------------------------------------------------------- */

/**
 * Word-by-word heading reveal. Each word sits in an overflow-hidden box and
 * rises out of it, so the type reads as uncovered rather than as faded up —
 * the move that looks typeset rather than animated.
 *
 * The box is padded a fraction of an em and pulled back by the same amount, so
 * italic descenders are not clipped by their own mask. The whole run carries
 * one aria-label and the words are hidden from the accessibility tree, so a
 * screen reader gets the heading as a sentence, not as a list of words.
 *
 * The inter-word spaces are text nodes BETWEEN the masks, not inside them: a
 * trailing space at the end of an inline-block is white-space-collapsed away,
 * which would run the words together. Keeping them outside also leaves each
 * gap a real wrap opportunity, so multi-line headings still break normally.
 */
export function Lines({
  text,
  className,
  delay = 0,
  step = 0.055,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");

  return (
    <m.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: step, delayChildren: delay },
        },
      }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            aria-hidden="true"
            className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
          >
            <m.span
              data-motion=""
              className="inline-block"
              variants={{
                hidden: { y: "108%" },
                visible: {
                  y: "0%",
                  transition: { duration: 0.95, ease: EASE },
                },
              }}
            >
              {word}
            </m.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </m.span>
  );
}

/* -- Images --------------------------------------------------------------- */

/**
 * Uncovers an image: a clip-path wipe from one edge while the picture settles
 * out of a 6% overscale. Both run on the same curve, which is what keeps it
 * from looking like two animations stacked on one element.
 */
export function Wipe({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left";
}) {
  const closed =
    from === "bottom" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";

  return (
    <m.div
      data-motion=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: { clipPath: closed },
        visible: {
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { duration: 1.15, ease: EASE, delay },
        },
      }}
    >
      <m.div
        data-motion=""
        className="h-full w-full"
        variants={{
          hidden: { scale: 1.06 },
          visible: {
            scale: 1,
            transition: { duration: 1.4, ease: EASE, delay },
          },
        }}
      >
        {children}
      </m.div>
    </m.div>
  );
}

/* -- Scroll-linked -------------------------------------------------------- */

/**
 * Maps a section's own pass across the viewport onto a 0 -> 1 value.
 *
 * This used to run the value through a spring so it kept moving for a beat
 * after the wheel stopped. That was one spring per section, and a page carries
 * ten to twelve of them: every spring wakes on every frame of every scroll,
 * whether or not its section is anywhere near the viewport, and together they
 * were dropping better than one frame in ten.
 *
 * The raw progress value drives the same transforms. On a background motif
 * travelling forty pixels the smoothing was never visible; the frame budget it
 * cost was.
 */
function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}

/**
 * Counter-scroll. The child travels `distance` px against the page over the
 * section's full pass through the viewport. Keep it under ~80px — past that
 * the element visibly detaches from the copy beside it.
 */
export function Drift({
  children,
  className,
  distance = 56,
  scale,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  /** Optional overscale to grow into, e.g. 1.08. */
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const progress = useSectionProgress(ref);
  const y = useTransform(progress, [0, 1], [distance, -distance]);
  const s = useTransform(progress, [0, 1], [1, scale ?? 1]);

  return (
    <div ref={ref} className={className}>
      <m.div
        className="h-full w-full"
        style={reduce ? undefined : { y, scale: scale ? s : undefined }}
      >
        {children}
      </m.div>
    </div>
  );
}

/**
 * The hero's exit. Copy lifts and fades as the first screen scrolls away, so
 * the section below arrives on clear ground instead of crossing over type.
 */
export function ScrollAway({
  children,
  className,
  lift = 90,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -lift]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={ref} className={className}>
      <m.div style={reduce ? undefined : { y, opacity }}>{children}</m.div>
    </div>
  );
}

/* -- Ornament ------------------------------------------------------------- */

/** A rule that draws itself from the left as its block enters. */
export function DrawRule({ className }: { className?: string }) {
  return (
    <m.div
      aria-hidden="true"
      data-motion=""
      className={`origin-left ${className ?? ""}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}

/* -- Interaction ---------------------------------------------------------- */

/**
 * Card lift on hover, press-down on tap. Springs, not durations — the pointer
 * can reverse mid-gesture and a timed tween would fight it.
 */
export function Lift({
  children,
  className,
  amount = 8,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  as?: "div" | "article" | "li";
}) {
  const Tag = m[as];

  return (
    <Tag
      className={className}
      whileHover={{ y: -amount }}
      whileTap={{ y: -amount / 3 }}
      transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.5 }}
    >
      {children}
    </Tag>
  );
}

/**
 * Mount-time entrance for a single above-the-fold element. Same move as
 * <Reveal>, fired on load rather than on a viewport trigger — nothing in the
 * first screen should be waiting to be scrolled into.
 */
export function Mount({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <m.div
      data-motion=""
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

/**
 * Mount-time entrance for a run of elements. Children are <MountItem>s.
 */
export function MountStagger({
  children,
  className,
  step = 0.1,
  delay = 0.15,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: step, delayChildren: delay },
        },
      }}
    >
      {children}
    </m.div>
  );
}

/** A child of <MountStagger>. */
export function MountItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <m.div
      data-motion=""
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
      }}
    >
      {children}
    </m.div>
  );
}
