import { brand } from "@/lib/brand";
import { PatternField } from "./brand/PatternField";
import { Wordmark } from "./brand/Marks";
import { HeroFrames } from "./HeroFrames";
import { Mount, MountItem, MountStagger, ScrollAway } from "@/motion";
import { PillGhost, PillSolid, Wrap } from "./ui";

/*
  Full-bleed hero, sized to fill the first screen.

  Mobile: nav in flow; copy is absolutely positioned below it (32–40px gap) so it
    can sit over the rising portrait without crowding the top bar.

  Desktop: portrait on the right half, copy vertically centred left.

  Motion. Nothing here waits on a scroll trigger — the whole section is above
  the fold — so the entrance runs on mount: wordmark and pill first, then the
  tagline, subcopy and buttons in sequence. On the way out the copy lifts and
  fades against the scroll (`ScrollAway`), which hands the next section a clean
  ground instead of letting two blocks of type cross each other.
*/
export function Hero() {
  return (
    <section id="top" className="relative min-h-svh overflow-hidden bg-ms-field">
      {/*
        The letterhead ground, unmasked across the whole first screen. It is
        held low enough (0.6) to sit under both the display type and the 15px
        subcopy without touching their contrast, and the portrait is a cut-out
        on transparency, so the motif reads through the gaps around her rather
        than stopping at a photographic plate.
      */}
      <PatternField
        id="hero"
        tone="field"
        fade="none"
        scale={440}
        opacity={0.6}
        drift={28}
      />

      {/* Portrait stack — tall & bottom-anchored on mobile; right half at lg */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[78vh] min-h-[520px] overflow-hidden lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:min-h-0 lg:w-[56%]">
        <HeroFrames />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-ms-field via-ms-field/70 to-transparent lg:h-40 lg:from-ms-field lg:via-ms-field/50" />
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-svh flex-col">
        <Wrap className="pointer-events-auto flex shrink-0 items-center justify-between gap-3 py-4 sm:gap-4 sm:py-6 lg:py-7">
          <Mount delay={0.05} y={-14} className="shrink-0">
            <a href="#top" aria-label={`${brand.name} home`} className="block">
              <span className="sm:hidden">
                <Wordmark size="sm" tone="text-ms-ivory" priority />
              </span>
              <span className="hidden sm:inline-flex lg:hidden">
                <Wordmark size="md" tone="text-ms-ivory" priority />
              </span>
              <span className="hidden lg:inline-flex">
                <Wordmark size="lg" tone="text-ms-ivory" priority />
              </span>
            </a>
          </Mount>

          <Mount delay={0.15} y={-14} className="shrink-0">
            <PillGhost
              href="#book"
              tone="dark"
              className="min-h-10 px-5 text-[12px] sm:min-h-13 sm:px-7 sm:text-[13.5px] lg:min-h-14 lg:px-9 lg:text-[14px]"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book now</span>
            </PillGhost>
          </Mount>
        </Wrap>

        {/* Copy — absolute below nav on mobile; centred in remaining space at lg */}
        <div className="relative flex-1 lg:flex lg:items-center">
          <Wrap className="pointer-events-none absolute inset-x-0 top-16 z-10 sm:top-20 lg:relative lg:inset-x-auto lg:top-auto lg:w-full">
            <ScrollAway lift={110}>
              <MountStagger
                step={0.12}
                delay={0.25}
                className="pointer-events-auto relative max-w-[760px] lg:py-16"
              >
                <MountItem y={30}>
                  <h1 className="font-display text-[clamp(3.35rem,13vw,7.5rem)] font-normal italic leading-[0.94] tracking-[-0.02em] text-ms-ivory lg:mt-4">
                    {brand.tagline}
                  </h1>
                </MountItem>

                <div className="relative mt-9 max-w-[56ch] sm:mt-11">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-x-6 -top-4 bottom-[-1.5rem] rounded-sm bg-[linear-gradient(to_right,var(--color-ms-field)_0%,var(--color-ms-field)_30%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] lg:hidden"
                  />

                  <MountItem>
                    <div className="relative font-sans font-light leading-[1.65] text-ms-cream">
                      <p className="text-[clamp(1.25rem,2.4vw,1.55rem)] tracking-[-0.01em]">
                        {brand.hero.line1}
                      </p>
                      <p className="mt-2 text-[clamp(1.05rem,1.8vw,1.2rem)] text-ms-cream/90">
                        {brand.hero.line2}
                      </p>
                    </div>
                  </MountItem>

                  <MountItem className="relative mt-12 sm:mt-14">
                    <div className="flex flex-wrap items-center gap-3.5">
                      <PillSolid
                        href="#book"
                        tone="dark"
                        className="min-h-13 px-9 text-[13.5px] sm:min-h-14 sm:px-10 sm:text-[14px]"
                      >
                        Book a consultation
                      </PillSolid>
                      <PillGhost
                        href="#treatments"
                        tone="dark"
                        className="min-h-13 px-9 text-[13.5px] sm:min-h-14 sm:px-10 sm:text-[14px]"
                      >
                        The treatments
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
