/**
 * The Mela Skin pattern.
 *
 * Reconstructed from the letterhead artwork (Picture1.png) and the social
 * banners: a lattice of overlapping circles whose interstices form the
 * four-pointed sparkle carried in the monogram. It is drawn, not tiled from a
 * bitmap, so it stays crisp at any size and can be recoloured per section.
 *
 * Geometry is measured off Picture1.png, not eyeballed. Sampling the white
 * cutouts there gives a horizontal pitch of 899px, a vertical pitch of 738px
 * and a sparkle 368px wide, which solves to a circle radius of 455px:
 *
 *     R = 0.506 x W        H = 0.821 x W
 *
 * Those two ratios are the whole pattern. The circles are all but tangent
 * horizontally (2px of overlap) and overlap heavily vertically (38px at this
 * scale) — that asymmetry is what gives the sparkle its 1:1.6 proportion and
 * its sharp top and bottom points. Raising R even slightly blunts the points
 * into a plain diamond, so keep the ratios and change only `scale`.
 */

type Props = {
  /** Unique per instance — SVG defs are document-global. */
  id: string;
  /** Gradient start, painted into the circles. */
  from: string;
  /** Gradient end. */
  to: string;
  /** Colour revealed in the sparkle interstices. */
  sparkle: string;
  /** Tile width in px. Sets how large the motif reads; ratios are fixed. */
  scale?: number;
  className?: string;
};

const H_RATIO = 0.821;
const R_RATIO = 0.506;

export function BrandPattern({
  id,
  from,
  to,
  sparkle,
  scale = 280,
  className,
}: Props) {
  const tileW = scale;
  const tileH = Math.round(scale * H_RATIO);
  const r = Math.round(scale * R_RATIO);

  const gradientId = `${id}-gradient`;
  const circlesId = `${id}-circles`;
  const maskId = `${id}-mask`;

  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>

        <pattern
          id={circlesId}
          width={tileW}
          height={tileH}
          patternUnits="userSpaceOnUse"
        >
          <circle cx="0" cy="0" r={r} fill="#fff" />
          <circle cx={tileW} cy="0" r={r} fill="#fff" />
          <circle cx="0" cy={tileH} r={r} fill="#fff" />
          <circle cx={tileW} cy={tileH} r={r} fill="#fff" />
        </pattern>

        <mask id={maskId}>
          <rect width="100%" height="100%" fill="#000" />
          <rect width="100%" height="100%" fill={`url(#${circlesId})`} />
        </mask>
      </defs>

      <rect width="100%" height="100%" fill={sparkle} />
      <rect
        width="100%"
        height="100%"
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
