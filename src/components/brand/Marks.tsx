/**
 * BRAND MARKS — the official artwork, as vectors.
 *
 * SOURCE — Resources/MELA SKIN - Visual Identity Assets/
 *   2_Brand Mark/SVG/MELA SKIN - Primary Brandmark_2.svg      (4 paths)
 *   1_Logo/Secondary Logo/SVG/MELA SKIN - Secondary Logo_3.svg (11 paths)
 *
 * The path data below is copied out of those two files unaltered, including
 * their viewBoxes. Nothing here is redrawn or approximated.
 *
 * WHY THIS REPLACED THE RASTER LOCKUP. Two things came out of the 26 Aug
 * meeting:
 *
 *   Dr. Abseret Hailu, 00:41:07 — "the logo, it shouldn't have a white
 *   background. That's an error. It should be just gold with a gold circle."
 *
 *   Aser Hailu, 00:41:07 — "we can also play around with the logo, whether we
 *   do just the M and then we do Mela Skin presented somewhere else … Maybe
 *   it's just the giant circle of the M at the top."
 *
 * The old `Monogram` shipped a 639KB PNG cut out of social artwork, which is
 * where the white disc came from. The official artwork has no such disc: the
 * supplied gold PNG is transparent at alpha 0 across the whole circle
 * interior, verified at six sample points. Drawing it as SVG removes the
 * question entirely — the ring, the M and the sparkle are three fills on
 * nothing, so whatever is behind the mark shows through it.
 *
 * The wordmark had been set as the words "Mela Skin" in Larken Bold. Larken is
 * the brand's primary text face, but it is not the logo's drawn letterform, so
 * the header was showing a lookalike rather than the logo. It is the real
 * artwork now. The descriptor line under it stays live text in Ranade Medium —
 * which is what the official lockup sets it in — so it remains selectable and
 * readable by a screen reader.
 *
 * The ® that used to sit beside the wordmark is gone. None of the official
 * lockups carry one.
 */

/* -- Path data, verbatim from the supplied SVGs --------------------------- */

/** MELA SKIN - Primary Brandmark_2.svg, viewBox 0 0 143.7 143.7. */
const MARK_VIEWBOX = "0 0 143.7 143.7";
const MARK_SPARKLE =
  "M45.83,73.87h-.05c-.32,5.67-4.44,19.02-9.55,19.37v.06c5.11.35,9.22,13.7,9.54,19.37h.05c.32-5.67,4.44-19.02,9.55-19.37v-.06c-5.11-.35-9.22-13.7-9.54-19.37Z";
const MARK_M_DIAGONAL =
  "M78.84,64.84l2.82-.73-11.62,29.17-1.32-3.1-17.17-40.38c-2.04-4.74-4.47-8.31-7.31-10.7h20.21l10.07,23.64c.71,1.68,2.55,2.58,4.31,2.12Z";
const MARK_M_STEM =
  "M103.54,84.37c0,1.99.34,3.81,1.03,5.45.69,1.64,1.65,2.79,2.89,3.46h-22.8c2.61-1.24,3.92-4.21,3.92-8.91v-45.28h18.42c-1.33,1.15-2.24,2.6-2.73,4.35-.49,1.75-.73,4.25-.73,7.48v33.44Z";
const MARK_RING =
  "M71.85,143.7C32.23,143.7,0,111.47,0,71.85S32.23,0,71.85,0s71.85,32.23,71.85,71.85-32.23,71.85-71.85,71.85ZM71.85,2.95C33.86,2.95,2.95,33.86,2.95,71.85s30.91,68.9,68.9,68.9,68.9-30.91,68.9-68.9S109.84,2.95,71.85,2.95Z";

const MARK_PATHS = [MARK_SPARKLE, MARK_M_DIAGONAL, MARK_M_STEM, MARK_RING];

/**
 * The mark's own sparkle, cropped out of the mark's coordinate space so it can
 * be set on its own as an ornament. The window is the path's exact extremes —
 * every one of them is a segment endpoint, so nothing clips.
 */
const SPARKLE_VIEWBOX = "36.23 73.87 19.14 38.80";

/** MELA SKIN - Secondary Logo_3.svg, viewBox 0 0 244.97 32.16. */
const WORDMARK_VIEWBOX = "0 0 244.97 32.16";
const WORDMARK_ASPECT = 244.97 / 32.16;
const WORDMARK_PATHS = [
  "M193.89,0h-8.8c.79.61.88,1.96,1.1,4.06.22,2.1.14,3.88-.26,5.32L193.89,0ZM193.67,30.6c-.7-.86-1.27-1.86-1.71-3.02l-6.9-17.34-6.82,6.35,5.68,15.53h11.59c-.53-.15-1.14-.66-1.83-1.51ZM177.6,30.07c-.41-.97-.61-2.05-.61-3.23V9.34c0-2.71.26-4.85.77-6.43.51-1.58,1.18-2.55,1.99-2.91h-14.34c.91.74,1.6,1.79,2.05,3.15.45,1.37.67,3.43.67,6.19v17.5c0,2.78-.77,4.54-2.29,5.28h13.48c-.74-.39-1.31-1.07-1.71-2.05Z",
  "M209.01,30.07c-.41-.97-.62-2.05-.62-3.23V9.34c0-2.71.26-4.85.77-6.43.51-1.58,1.18-2.55,1.99-2.91h-14.35c.92.74,1.61,1.79,2.05,3.15.45,1.37.67,3.43.67,6.19v17.5c0,2.78-.76,4.54-2.29,5.28h13.48c-.74-.39-1.31-1.07-1.71-2.05Z",
  "M152.75,0c1.26.61,2.55,1.54,3.86,2.8,1.31,1.26,2.31,2.48,2.99,3.66L161.89,0h-9.14ZM145.16,29.32c-1.3-1.26-2.3-2.48-3.02-3.66l-2.87,6.46h9.77c-1.29-.61-2.58-1.54-3.88-2.8ZM161.77,17.18c-1.18-1.53-2.6-2.86-4.26-4-1.66-1.14-3.31-2.23-4.96-3.27-1.66-1.04-3.06-2.1-4.22-3.18-1.15-1.07-1.73-2.11-1.73-3.11,0-.87.46-1.63,1.38-2.29.92-.66,2.18-1.1,3.79-1.34-3.71,0-6.71.67-9.03,2.01-2.31,1.34-3.47,3.23-3.47,5.67,0,1.39.59,2.79,1.77,4.18,1.18,1.39,2.62,2.67,4.3,3.84,1.68,1.17,3.37,2.33,5.07,3.47,1.69,1.14,3.13,2.38,4.31,3.71,1.18,1.33,1.77,2.65,1.77,3.96,0,1.45-.55,2.63-1.65,3.56-1.1.93-2.41,1.5-3.9,1.71,1.18,0,2.36-.13,3.55-.39,1.18-.26,2.32-.67,3.43-1.22,1.1-.55,2.07-1.21,2.91-1.99.84-.78,1.52-1.73,2.03-2.86.51-1.13.75-2.37.73-3.71-.02-1.65-.63-3.24-1.81-4.76Z",
  "M115.28,0l9.02,24.21c1.19,3.22,2.49,5.81,3.89,7.77v.18h-13.8v-.18s.05-.22.16-.56c.1-.34.22-.77.33-1.29.12-.52.22-1.09.29-1.72s.08-1.32.02-2.08c-.06-.76-.21-1.47-.45-2.12l-1.07-2.9h-10.81l-.49,1.38c-.27.77-.41,1.62-.42,2.52-.02.91.06,1.74.22,2.48.16.74.34,1.43.54,2.05s.38,1.14.56,1.54.27.62.27.65v.22h-7.73v-.18c1.64-3.07,3.19-6.64,4.65-10.72l5.18-14.69c.18-.54.28-1.12.29-1.74.01-.63-.04-1.2-.16-1.72-.12-.52-.25-1-.4-1.43-.15-.43-.28-.78-.4-1.05l-.18-.45v-.18h10.5ZM108.13,6.39l-2.96,8.4c-.74,2.09.82,4.28,3.03,4.28h0c2.24,0,3.79-2.23,3.02-4.33l-3.09-8.36Z",
  "M235.83,0h1.19S244.82,0,244.82,0h0s.15,0,.15,0c-.09.2-.18.41-.28.61-.04.11-.1.24-.16.41-.19.48-.42,1.09-.69,1.85-.16.46-.32.94-.48,1.45-.71,2.48-1.2,5.45-1.3,9.35v18.44h-5.58l-17.4-25.47v14.01c0,.95.1,1.98.29,3.08.19,1.1.42,2.1.69,3.01.27.91.53,1.74.8,2.5.27.76.5,1.38.69,1.85.19.48.29.73.29.76v.27h-7.81v-.27s.1-.28.29-.76c.19-.48.42-1.09.69-1.85.27-.76.54-1.59.8-2.5.27-.91.5-1.91.69-3.01.19-1.1.29-2.13.29-3.08V7.63c0-.62-.07-1.3-.2-2.03-.13-.73-.31-1.4-.51-2.01-.21-.61-.42-1.17-.62-1.67-.21-.51-.38-.91-.51-1.23-.13-.31-.2-.48-.2-.51V0h10.71l14.32,21.19v-9.77c0-.95-.1-1.98-.29-3.08-.19-1.1-.42-2.1-.69-2.99,0,0,0-.02,0-.03-.47-1.56-1.23-3.02-2.21-4.32L235.83,0Z",
  "M45,25.18V7.02c0-1.92-.14-3.4-.43-4.43-.29-1.04-.83-1.9-1.61-2.58h10.92v32.12h-11.7c.76-.16,1.42-.85,1.99-2.09.56-1.23.85-2.85.85-4.85Z",
  "M64.98,0l1.06,8.08c-1.03-1.89-2.68-3.6-4.97-5.12-2.29-1.52-4.39-2.51-6.3-2.96h10.21Z",
  "M54.78,32.12c1.92-.45,4.02-1.43,6.3-2.96,2.29-1.52,3.94-3.23,4.97-5.12l-1.06,8.08h-10.21Z",
  "M62.12,9.32v13.3h-.02c-.22-3.55-3.06-6.41-6.63-6.64v-.04c3.56-.22,6.41-3.07,6.63-6.63h.02Z",
  "M68.26.04h14.35c-.82.37-1.48,1.34-1.99,2.92-.51,1.58-.77,3.72-.77,6.42v22.78h-10.88c.79-.68,1.32-1.54,1.6-2.56.28-1.02.41-2.51.41-4.45v-15.76c0-2.76-.22-4.82-.67-6.19-.45-1.37-1.13-2.42-2.05-3.15ZM92.97,32.16h-11.43c2.02-.47,4.29-1.5,6.8-3.09,2.51-1.59,4.42-3.25,5.73-4.99l-1.1,8.08Z",
  "M38.18,5.6c.09-.73.2-1.4.33-2.01.14-.61.27-1.17.43-1.67.15-.51.26-.91.35-1.23.02-.06.03-.11.05-.15.06-.22.09-.34.09-.36V0h-10.31l-.17.46-6.39,17.67-.09.24-.58,1.62L13.6,0H2.9v.18s0,.01,0,.02c.92,2.2,2.09,4.92,2.05,7.43-.1,5.22.59,14.73-1.25,20.29-.29.89-.71,1.73-1.27,2.47-.74.99-1.57,1.66-2.43,1.71v.02h12.1v-.02c-.87-.06-1.69-.72-2.43-1.71-.56-.74-.98-1.59-1.27-2.47-1.84-5.56-1.15-15.07-1.25-20.29,0-.3,0-.6.04-.91l.06.13c0-.05.01-.09.02-.13v-.03l.1.25.46,1.13,9.71,24.06h2.46L28.96,7.15l.17-.46v17.8c0,.62-.05,1.3-.14,2.03-.01.07-.02.15-.03.22-.08.65-.18,1.24-.3,1.79-.14.61-.28,1.17-.43,1.67-.07.26-.14.49-.2.69h0c-.06.21-.11.39-.15.54-.09.31-.13.49-.13.51v.18h11.69v-.18s-.05-.19-.13-.49c0,0,0-.02,0-.02-.09-.31-.21-.72-.35-1.23-.15-.5-.29-1.06-.43-1.67-.13-.61-.25-1.28-.33-2.01-.09-.73-.14-1.41-.14-2.03V7.63c0-.62.05-1.3.14-2.03Z",
];

/* -- Gold ----------------------------------------------------------------- */

/**
 * The two gold ramps, rendered once near the page root.
 *
 * Both are sampled off the supplied gold artwork
 * (2_Brand Mark/PNG/MELA SKIN - Primary Brandmark_1_3D Gold Emblem.png), whose
 * measured range runs #503008 in the shadows through #D0A848 / #E0B858 in the
 * mids to #F8E088 / #F8F8D8 in the highlights.
 *
 * They differ only in units, and that difference matters. `ms-gold` is
 * objectBoundingBox, so each shape it fills gets the whole ramp — right for a
 * lone sparkle. `ms-gold-mark` is userSpaceOnUse across 0–143.7, the
 * brandmark's own viewBox, so the ring, the M and the sparkle share one sweep
 * across the mark instead of each running their own. Fill the mark with
 * `ms-gold` and it reads as three separate pieces of metal.
 */
export function GoldDefs() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ms-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b4310" />
          <stop offset="16%" stopColor="#f0dfa0" />
          <stop offset="34%" stopColor="#c39a35" />
          <stop offset="54%" stopColor="#f8e9bd" />
          <stop offset="74%" stopColor="#a87f22" />
          <stop offset="100%" stopColor="#dcbc63" />
        </linearGradient>

        <linearGradient
          id="ms-gold-mark"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="143.7"
          y2="143.7"
        >
          <stop offset="0%" stopColor="#503008" />
          <stop offset="18%" stopColor="#e0b858" />
          <stop offset="34%" stopColor="#f8e088" />
          <stop offset="50%" stopColor="#d0a848" />
          <stop offset="68%" stopColor="#f8e9bd" />
          <stop offset="84%" stopColor="#a87f22" />
          <stop offset="100%" stopColor="#d8b050" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* -- The marks ------------------------------------------------------------ */

/**
 * The four-pointed sparkle, lifted out of the brandmark's own geometry rather
 * than redrawn. Callers pass `fill="url(#ms-gold)"` for the metallic version.
 */
export function Sparkle({
  className,
  width = 12,
  height = 24,
  fill = "currentColor",
}: {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={SPARKLE_VIEWBOX}
      aria-hidden="true"
      focusable="false"
    >
      <path d={MARK_SPARKLE} fill={fill} />
    </svg>
  );
}

/**
 * The brandmark on its own — Aser's "just the M".
 *
 * `tone` decides the fill and nothing else. `gold` is the official finish;
 * `current` inherits `color`, which is what the reversed contexts want (a cream
 * mark on a brown ground is a supplied variant of the artwork, not an
 * improvisation — see 2_Brand Mark/PNG/…Brandmark_3.png).
 *
 * Decorative by default. Pass `title` only where the mark is the sole thing
 * naming the clinic; anywhere it sits beside the wordmark, naming it twice is
 * noise in a screen reader.
 */
export function Brandmark({
  size = 132,
  className,
  title,
  tone = "gold",
}: {
  size?: number;
  className?: string;
  title?: string;
  tone?: "gold" | "current";
}) {
  const fill = tone === "gold" ? "url(#ms-gold-mark)" : "currentColor";

  return (
    <svg
      width={size}
      height={size}
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {MARK_PATHS.map((d) => (
        <path key={d.slice(0, 16)} d={d} fill={fill} />
      ))}
    </svg>
  );
}

/**
 * Kept as the old name so the editorial direction's imports still resolve.
 * New code should use `Brandmark`.
 */
export const Monogram = Brandmark;

/**
 * The word "MELA SKIN" in the official letterforms. Fills with `currentColor`,
 * so a caller sets it with a text colour like any other type.
 */
export function WordmarkLetters({
  width = 160,
  className,
}: {
  width?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={width / WORDMARK_ASPECT}
      viewBox={WORDMARK_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {WORDMARK_PATHS.map((d) => (
        <path key={d.slice(0, 16)} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

/**
 * Header and footer lockup: gold brandmark, official wordmark, and the
 * descriptor line the official lockup sets in Ranade Medium.
 *
 * Sizes are the three the site actually asks for. The wordmark width drives
 * everything else — the mark is sized against it and the descriptor's tracking
 * is set so the line ends near the wordmark's right edge, which is the
 * relationship the supplied lockup has.
 */
const LOCKUP = {
  sm: { mark: 26, word: 108, desc: "text-[6.5px]", gap: "gap-2" },
  md: { mark: 38, word: 158, desc: "text-[8px]", gap: "gap-2.5" },
  lg: { mark: 54, word: 224, desc: "text-[11px]", gap: "gap-3.5" },
} as const;

export function Wordmark({
  className,
  size = "md",
  descriptor = true,
  tone = "text-ms-cocoa",
  align = "left",
  showMark = true,
  /** `current` gives a single-colour lockup — the supplied one-tone variant. */
  markTone = "gold",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  descriptor?: boolean;
  /** A text-colour class. The wordmark and descriptor inherit it. */
  tone?: string;
  align?: "left" | "center";
  /** When false, type only (e.g. compact contexts). */
  showMark?: boolean;
  markTone?: "gold" | "current";
}) {
  const scale = LOCKUP[size];

  return (
    <span
      className={`inline-flex items-center ${scale.gap} ${align === "center" ? "justify-center" : ""} ${className ?? ""}`}
    >
      {showMark && (
        <Brandmark size={scale.mark} tone={markTone} className="shrink-0" />
      )}

      <span
        className={`inline-flex flex-col ${align === "center" ? "items-center text-center" : ""} ${tone}`}
      >
        {/*
          The letterforms are paths, so the clinic's name is not in the
          accessibility tree the way it was when this was Larken text. The
          header lockup sits inside a labelled link; the footer one does not, so
          the name is restored here for both rather than at one call site.
        */}
        <span className="sr-only">Mela Skin</span>
        <WordmarkLetters width={scale.word} />
        {descriptor && (
          <span
            className={`mt-[0.55em] font-sans font-medium uppercase leading-none ${scale.desc}`}
            style={{ letterSpacing: "0.185em" }}
          >
            Dermatology &amp; Cosmetic Clinic
          </span>
        )}
      </span>
    </span>
  );
}
