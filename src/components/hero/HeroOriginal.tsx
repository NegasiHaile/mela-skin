import type { CSSProperties } from "react";
import { brand } from "@/constants";
import { patternTileUrl } from "../brand/BrandPattern";
import { HeroOriginalFrames } from "./HeroOriginalFrames";
import { SiteHeader } from "../SiteHeader";
import { MountItem, MountStagger, ScrollAway } from "@/motion";
import { PillGhost, PillSolid, Wrap } from "../ui";

/*
  HERO VARIANT: THE COMMITTED ONE.

  `components/Hero.tsx` as it stood on commit b894798, restored so the team can
  compare it live against the current hero rather than from memory. Copy on the
  left, a cut-out portrait push-sliding on the right half, the letterhead ground
  unmasked across the whole first screen.

  IT CARRIES ITS OWN PALETTE, which is the only way a comparison means anything.
  Everything below resolves against `--color-ms-*`, and those values have moved
  twice since this hero was written — first onto the official brand package, then
  onto Primary 2 for the flooded sections. Rendering this layout in today's
  colours by accident would be a new hero, not the old one. The `LEGACY_PALETTE`
  style below redeclares the committed values on this section only; every Tailwind
  class inside it picks them up, and nothing outside it is touched.

  ITS GROUND IS THE ONE THING THAT TOGGLES, because the clinic asked to see this
  layout in both browns. `#74370c` is the committed one, and it is the brown Dr.
  Abseret Hailu was looking at when she said, 00:18:31: "this brown is a little
  bit too red. It has a bit of a red undertone. I would like it to be a bit more
  neutral." `#2C190B` is what the page heroes use now, and it is the default here
  — the request was to see the layout in today's colour, with the original a
  click away rather than the other way round.

  TWO DELIBERATE DEVIATIONS from the commit, both stated rather than smuggled:

  1. The second button read "See the prices". It says "Treatment menu" here. The
     26 Aug meeting removed pricing from the site and there are no prices behind
     that link any more, so the original wording would send somebody looking for
     something the clinic decided not to publish. That is a content rule rather
     than a design choice, and it outranks snapshot fidelity.
  2. The pattern is drawn inline at the committed scale and opacity rather than
     by `PatternField`, which is now page-wide and shares one tile size so the
     lattice runs continuously between sections. Wiring this variant back into it
     would either break that continuity or restyle the snapshot; an inline layer
     does neither, and it is also what lets the tile colours follow the ground
     toggle. The motif, its 440px pitch and its 0.6 opacity are as committed.

  The header is the current one, as asked — it was excluded from the comparison.
*/

/**
 * The `--color-ms-*` values as committed, scoped to this section.
 *
 * `--color-ms-field` is absent on purpose: it is the one the ground toggle
 * swaps, so it comes from `GROUNDS` below rather than from here.
 *
 * `--color-ms-clay` is absent for a different reason: the token was retired when
 * the official terracotta turned out to clear AA on every light ground, and
 * nothing in this hero referenced it.
 */
const LEGACY_PALETTE = {
  "--color-ms-espresso": "#31180a",
  "--color-ms-terracotta": "#c6722c",
  "--color-ms-terracotta-deep": "#8f4713",
  "--color-ms-bronze": "#8e714b",
  "--color-ms-sand": "#d5c6af",
  "--color-ms-ivory": "#fdfce8",
  "--color-ms-cocoa": "#4a2308",
  "--color-ms-cream": "#f3e7d6",
  "--color-ms-paper": "#f4efeb",
  "--color-ms-panel": "#542b15",
  "--color-ms-shell": "#fdfcf8",
  "--color-ms-gold": "#dcbc63",
} as CSSProperties;

/**
 * THE GROUND TOGGLE. Two browns for this variant and this variant only.
 *
 * The committed one is `#74370c`, and it is a stop brighter than every other
 * opening band on the site — which is what the clinic noticed. `dark` is the
 * colour the page heroes actually use, so the comparison is between the layout
 * as committed and the layout in today's ground.
 *
 * The pattern colours move with it. Each tone's sparkle colour has to BE its
 * section's background or the layer stops disappearing into the ground and
 * starts reading as a layer, so swapping the ground without swapping the tile
 * would show the motif as a printed-on rectangle.
 */
const GROUNDS = {
  dark: {
    field: "#2c190b",
    /** The `field` tone from brand/PatternField.tsx, which this ground now is. */
    tile: patternTileUrl("#201208", "#49250d", "#2c190b"),
  },
  committed: {
    field: "#74370c",
    /** The `field` tone as it was on b894798, for the ground it was tuned to. */
    tile: patternTileUrl("#5e2c09", "#966029", "#7d3f11"),
  },
} as const;

export type HeroGround = keyof typeof GROUNDS;

/* The committed PatternField call: scale 440, opacity 0.6, no fade. */
const LEGACY_TILE_W = 440;
const LEGACY_TILE_H = Math.round(LEGACY_TILE_W * 0.821);

export function HeroOriginal({ ground = "dark" }: { ground?: HeroGround }) {
  const { field, tile } = GROUNDS[ground];

  return (
    <section
      id="top"
      className="relative min-h-svh overflow-hidden bg-ms-field"
      style={{ ...LEGACY_PALETTE, "--color-ms-field": field } as CSSProperties}
    >
      {/*
        The letterhead ground, unmasked across the whole first screen. Held low
        enough (0.6) to sit under both the display type and the 15px subcopy
        without touching their contrast, and the portrait is a cut-out on
        transparency, so the motif reads through the gaps around her rather than
        stopping at a photographic plate.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: tile,
          backgroundRepeat: "repeat",
          backgroundSize: `${LEGACY_TILE_W}px ${LEGACY_TILE_H}px`,
          opacity: 0.6,
        }}
      />

      {/* Portrait stack — tall & bottom-anchored on mobile; right half at lg */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[78vh] min-h-[520px] overflow-hidden lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:min-h-0 lg:w-[56%]">
        <HeroOriginalFrames />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-ms-field via-ms-field/70 to-transparent lg:h-40 lg:from-ms-field lg:via-ms-field/50" />
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-svh flex-col">
        <SiteHeader tone="dark" />

        {/* Copy — absolute below nav on mobile; centred in remaining space at lg */}
        <div className="relative flex-1 lg:flex lg:items-center">
          <Wrap className="pointer-events-none absolute inset-x-0 top-16 z-10 sm:top-20 lg:relative lg:inset-x-auto lg:top-auto lg:w-full">
            <ScrollAway lift={110}>
              <MountStagger
                step={0.12}
                delay={0.25}
                className="pointer-events-auto relative isolate max-w-[760px] lg:py-16"
              >
                {/*
                  ONE scrim for the whole left column, not one per block. It sits
                  behind the tagline, the descriptor and the address together, so
                  the copy reads as a single mass over the portrait rising behind
                  it rather than as three separately propped-up lines.

                  Vertical, and fully transparent by 82% of the way down: the
                  portrait needs cover where the type is densest at the top and
                  none at all by the time the buttons arrive, since those carry
                  their own fills. Stopping the gradient short of the bottom is
                  what keeps the join invisible. Hidden from `lg`, where the copy
                  and the portrait no longer overlap.
                */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 -z-10 bg-gradient-to-b from-ms-field from-0% via-ms-field/55 via-45% to-transparent to-82% lg:hidden"
                />

                <MountItem y={30}>
                  <h1 className="font-display text-[clamp(3.35rem,13vw,7.5rem)] font-normal italic leading-[0.94] tracking-[-0.02em] text-ms-ivory lg:mt-4">
                    {brand.tagline}
                  </h1>
                </MountItem>

                <div className="mt-9 max-w-[56ch] sm:mt-11">
                  <MountItem>
                    <div className="relative font-sans font-light leading-[1.65] text-ms-cream">
                      <p className="text-[clamp(1.25rem,2.4vw,1.55rem)] tracking-[-0.01em]">
                        {brand.hero.legacyLine1}
                      </p>
                      <p className="mt-2 text-[clamp(1.05rem,1.8vw,1.2rem)] text-ms-cream/90">
                        {brand.hero.legacyLine2}
                      </p>
                    </div>
                  </MountItem>

                  <MountItem className="relative mt-12 sm:mt-14">
                    <div className="flex flex-wrap items-center gap-3.5">
                      <PillSolid
                        href="/contact"
                        tone="dark"
                        className="min-h-13 px-9 text-[13.5px] sm:min-h-14 sm:px-10 sm:text-[14px]"
                      >
                        Book a consultation
                      </PillSolid>
                      <PillGhost
                        href="/treatment-menu"
                        tone="dark"
                        className="min-h-13 px-9 text-[13.5px] sm:min-h-14 sm:px-10 sm:text-[14px]"
                      >
                        Treatment menu
                      </PillGhost>
                    </div>
                  </MountItem>
                </div>
              </MountStagger>
            </ScrollAway>
          </Wrap>
        </div>
      </div>
    </section>
  );
}
