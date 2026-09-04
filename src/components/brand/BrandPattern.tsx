/**
 * The Mela Skin pattern, as a single repeating tile.
 *
 * Reconstructed from the letterhead artwork and since checked against the
 * official `4_Pattern` files in the brand package, which agree: a lattice of
 * overlapping circles whose interstices form the four-pointed sparkle carried in
 * the monogram.
 *
 * Geometry is measured, not eyeballed. Sampling the letterhead gives a
 * horizontal pitch of 899px, a vertical pitch of 738px and a sparkle 368px
 * wide, which solves to a circle radius of 455px:
 *
 *     R = 0.506 x W        H = 0.821 x W
 *
 * Those two ratios are the whole pattern. The circles are all but tangent
 * horizontally (1.2% of overlap) and overlap heavily vertically (19%) — that
 * asymmetry is what gives the sparkle its 1:1.6 proportion and its sharp top and
 * bottom points. Raising R even slightly blunts the points into a plain diamond.
 *
 * WHY THIS IS NOW A CSS TILE AND NOT AN SVG ELEMENT.
 *
 * It used to render one `<svg>` per section, each with its own `<pattern>` in
 * user space starting at that section's own origin, at that section's own
 * `scale`, drifting by that section's own scroll progress. Three separate
 * reasons for the lattice to be out of phase with the section above it, so every
 * section boundary showed a break — the pattern restarted rather than continued.
 *
 * As one `background-image` at one fixed size, tiled with `background-repeat`,
 * the geometry is identical everywhere by construction. All that is left to get
 * right is the vertical phase, which is `PatternField`'s job.
 *
 * SEAMLESSNESS. A repeating tile joins to itself if its left edge continues its
 * right edge and its top continues its bottom. Circles at all four corners of
 * the tile satisfy the first automatically. The second needs the gradient to be
 * the same colour at y=0 and y=H, which is why it runs from → to → from rather
 * than from → to: a straight ramp would put a light edge against a dark one at
 * every horizontal seam.
 *
 * THE TILE NO LONGER PAINTS ITS OWN GROUND, and dropping that is what lets a
 * section have a gradient ground at all.
 *
 * It used to open with a full-bleed `<rect>` filled with the section's own
 * background colour, so the interstices matched the band the tile sat on. On a
 * FLAT ground that rect is provably invisible: the layer composites as
 * `opacity x tile + (1 - opacity) x ground`, and in the interstices the tile
 * pixel WAS the ground, so the result is the ground either way. Removing it
 * changes nothing that was on screen.
 *
 * On a ground that ramps from one colour to another it changes everything. The
 * rect is one flat colour, so at 0.4-0.5 opacity it dragged 40-50% of the ramp
 * back toward the section's own colour and halved the transition. Interstices
 * are transparent now and the ramp reads through them at full strength.
 */

/** Tile width in px. ONE value for the whole site — see the note above. */
export const TILE_W = 520;

const H_RATIO = 0.821;
const R_RATIO = 0.506;

/** Tile height in px. Exported for the record; nothing reads it at present. */
export const TILE_H = Math.round(TILE_W * H_RATIO);

const RADIUS = Math.round(TILE_W * R_RATIO);

/**
 * The tile as a data URI, ready for `background-image`.
 *
 * Circles on nothing: whatever is behind the layer shows through the
 * interstices, which is what a gradient ground needs. See the note above.
 *
 * @param from circle gradient at the tile's top and bottom edges
 * @param to   circle gradient at the tile's middle
 */
export function patternTileUrl(from: string, to: string): string {
  /*
    SINGLE QUOTES INSIDE, DOUBLE QUOTES OUTSIDE. This is the whole reason the
    payload is built by hand: a data URI written as url("…<svg xmlns="…") is
    invalid CSS, because the attribute's own double quote closes the url string.
    The browser then drops the declaration silently and the pattern simply does
    not paint — no error, no warning, just no ground. Keep the attributes on
    single quotes.
  */
  const svg = [
    `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE_W}' height='${TILE_H}' viewBox='0 0 ${TILE_W} ${TILE_H}'>`,
    `<defs><linearGradient id='g' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='${TILE_H}'>`,
    `<stop offset='0' stop-color='${from}'/>`,
    `<stop offset='0.5' stop-color='${to}'/>`,
    `<stop offset='1' stop-color='${from}'/>`,
    `</linearGradient></defs>`,
    `<g fill='url(#g)'>`,
    `<circle cx='0' cy='0' r='${RADIUS}'/>`,
    `<circle cx='${TILE_W}' cy='0' r='${RADIUS}'/>`,
    `<circle cx='0' cy='${TILE_H}' r='${RADIUS}'/>`,
    `<circle cx='${TILE_W}' cy='${TILE_H}' r='${RADIUS}'/>`,
    `</g></svg>`,
  ].join("");

  /*
    Encoded by hand rather than with encodeURIComponent, which would escape the
    single quotes and every space as well and roughly double the length of each
    of these. Only three characters actually have to go: `<` and `>` because a
    bare angle bracket in a url() is not allowed, and `#` because it would start
    a fragment and cut the SVG off at the gradient reference.
  */
  const encoded = svg
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/#/g, "%23");

  return `url("data:image/svg+xml,${encoded}")`;
}
