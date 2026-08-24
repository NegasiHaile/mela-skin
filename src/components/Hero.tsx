import Image from "next/image";
import { brand } from "@/lib/brand";
import { Wordmark } from "./brand/Marks";
import { PillGhost, PillSolid, Wrap } from "./ui";

/*
  Full-bleed hero, sized to fill the first screen.

  Mobile: nav in flow; copy is absolutely positioned below it (32–40px gap) so it
  can sit over the rising portrait without crowding the top bar.

  Desktop: portrait on the right half, copy vertically centred left.
*/
export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-svh overflow-hidden bg-ms-field"
    >
      {/* Portrait — tall & bottom-anchored on mobile; right half at lg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[78vh] min-h-[520px] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:min-h-0 lg:w-[56%]"
      >
        <Image
          src="/images/hero.png"
          alt="Woman with radiant melanin-rich skin — the Mela Skin patient aesthetic"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="origin-bottom scale-[1.12] object-contain object-bottom sm:scale-[1.08] lg:scale-100"
        />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ms-field via-ms-field/70 to-transparent lg:h-40 lg:from-ms-field lg:via-ms-field/50" />
      </div>

      <div className="relative z-10 flex min-h-svh flex-col">
        <Wrap className="flex shrink-0 items-center justify-between gap-4 py-5 sm:py-6">
          <a href="#top" aria-label={`${brand.name} home`} className="shrink-0">
            <Wordmark size="md" tone="text-ms-ivory" priority />
          </a>

          <PillGhost href="#book" tone="dark" className="shrink-0 px-6 sm:px-8">
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book now</span>
          </PillGhost>
        </Wrap>

        {/* Copy — absolute below nav on mobile; centred in remaining space at lg */}
        <div className="relative flex-1 lg:flex lg:items-center">
          <Wrap className="absolute inset-x-0 top-14 z-10 sm:top-16 lg:relative lg:inset-x-auto lg:top-auto lg:w-full">
            <div className="relative max-w-[680px] lg:py-16">
              <h1 className="font-display text-[clamp(2.75rem,11vw,6.1rem)] font-normal italic leading-[0.98] tracking-[-0.015em] text-ms-ivory lg:mt-6">
                {brand.tagline}
              </h1>

              <div className="relative mt-7 max-w-[46ch]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-x-6 -top-4 bottom-[-1.5rem] rounded-sm bg-gradient-to-b from-ms-field/80 via-ms-field/55 to-transparent lg:hidden"
                />

                <div className="relative font-sans font-light leading-[1.8] text-ms-cream/80">
                  <p className="text-[18px] sm:text-[19px]">{brand.hero.line1}</p>
                  <p className="mt-1 text-[15px] sm:text-[16px]">{brand.hero.line2}</p>
                </div>

                <div className="relative mt-11 flex flex-wrap items-center gap-3">
                  <PillSolid href="#book" tone="dark">
                    Book a consultation
                  </PillSolid>
                  <PillGhost href="#treatments" tone="dark">
                    The treatments
                  </PillGhost>
                </div>
              </div>
            </div>
          </Wrap>
        </div>
      </div>
    </section>
  );
}
