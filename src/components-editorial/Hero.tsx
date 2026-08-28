import { NAV_FLAT, brand, todo } from "@/constants";
import { Mount, MountItem, MountStagger, ScrollAway } from "@/motion";
import { patternTileUrl } from "./brand/BrandPattern";
import { PatternField } from "./brand/PatternField";
import { Wordmark } from "./brand/Marks";
import { ButtonGhost, ButtonPrimary, Card, Shell } from "./ui";

/*
  The hero is one rounded card floating on the paper ground, with the nav
  living inside it rather than above it. Left half is the reversed type panel,
  right half is the brand pattern standing in for the hero photograph — swap
  the <BrandPattern> for an <Image> and the layout does not change.

  Motion. The card itself does not animate in (`still`) — it is already on
  screen — so the entrance runs on mount, top to bottom: nav, then heading,
  subcopy, buttons. The copy column then lifts and fades against the scroll on
  the way out, the same exit the immersive hero uses.
*/
export function Hero() {
  return (
    <Shell>
      <Card id="top" className="bg-ms-panel" as="section" still>
        {/*
          The letterhead ground behind the type panel, held to the left so it
          stops before the photograph slot on the right, which carries the
          pattern at full strength already.
        */}
        <PatternField tone="panel" />

        {/* Nav */}
        <Mount
          delay={0.05}
          y={-12}
          className="relative z-20 flex items-center justify-between gap-6 border-b border-ms-sand/15 px-6 py-5 sm:px-9"
        >
          <a href="#top" aria-label={`${brand.name} home`}>
            <Wordmark size="sm" tone="text-ms-ivory" />
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {NAV_FLAT.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-[11px] uppercase tracking-[0.18em] text-ms-cream/80 transition-colors hover:text-ms-ivory"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={brand.phoneHref}
              className="hidden font-sans text-[12px] tracking-[0.05em] text-ms-sand transition-colors hover:text-ms-ivory md:inline"
            >
              {brand.phone}
            </a>

            <details className="relative lg:hidden [&_summary::-webkit-details-marker]:hidden">
              <summary
                aria-label="Open menu"
                className="flex size-11 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-[3px] border border-ms-sand/35"
              >
                <span className="h-px w-4 bg-ms-cream" />
                <span className="h-px w-4 bg-ms-cream" />
                <span className="h-px w-4 bg-ms-cream" />
              </summary>
              <nav
                aria-label="Primary"
                className="absolute right-0 top-[calc(100%+0.85rem)] flex w-56 flex-col rounded-[10px] border border-ms-bronze/25 bg-ms-ivory p-1 shadow-[0_18px_44px_-20px_rgba(49,24,10,0.55)]"
              >
                {NAV_FLAT.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex min-h-11 items-center px-4 font-sans text-[11.5px] uppercase tracking-[0.18em] text-ms-cocoa"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={brand.phoneHref}
                  className="flex min-h-11 items-center border-t border-ms-bronze/20 px-4 font-sans text-[12.5px] text-ms-bronze md:hidden"
                >
                  {brand.phone}
                </a>
              </nav>
            </details>
          </div>
        </Mount>

        {/* Split */}
        <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <ScrollAway lift={70} className="flex">
            <MountStagger
              step={0.11}
              delay={0.2}
              className="flex flex-col justify-center px-7 py-16 sm:px-10 lg:px-14 lg:py-24"
            >
            {/* <p className="eyebrow text-ms-terracotta-deep">
              {brand.descriptor} &middot; Westlands, Nairobi
            </p> */}

              <MountItem y={26}>
                <h1 className="mt-7 max-w-[15ch] font-display text-[clamp(2.6rem,5vw,4.1rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ms-ivory">
                  Richer. <em className="italic text-ms-terracotta">Radiant.</em> SKIN
                  of you.
                </h1>
              </MountItem>

              <MountItem>
                <p className="mt-7 max-w-[46ch] font-sans text-[16px] font-light leading-[1.8] text-ms-cream/80">
                  Medical and cosmetic dermatology built for melanin-rich skin.
                  Pigmentation, scarring, acne and hair loss read correctly the
                  first time, then treated with a plan you can keep to.
                </p>
              </MountItem>

              <MountItem>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <ButtonPrimary href="#book" tone="dark">
                    Book a consultation
                  </ButtonPrimary>
                  <ButtonGhost href="#treatments" tone="dark">
                    The treatments
                  </ButtonGhost>
                </div>
              </MountItem>

              <MountItem>
                <p className="mt-9 font-sans text-[12px] font-light tracking-[0.05em] text-ms-sand/70">
                  Opening {todo.openingDate} &nbsp;&middot;&nbsp;{" "}
                  {brand.address.line1}, {brand.address.line2}
                </p>
              </MountItem>
            </MountStagger>
          </ScrollAway>

          {/* Photograph slot, on the brand pattern */}
          <div className="relative min-h-[300px] lg:min-h-[620px]">
            {/*
              The tile directly, not a <PatternField>. This is a photograph slot
              filled with the motif at its own scale and its own colours, inside
              a card — it is not a section ground, so it is deliberately outside
              the page-wide lattice that PatternField keeps every section on.
              Swap it for an <Image> when the portrait exists.
            */}
            <div
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              style={{
                backgroundImage: patternTileUrl("#33180a", "#a86f3a", "#f3e7d6"),
                backgroundRepeat: "repeat",
                backgroundSize: "235px 193px",
              }}
            />
            <span className="eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-ms-cream/25 bg-ms-panel/55 px-4 py-2 font-normal text-ms-cream/70 backdrop-blur-[2px]">
              [Hero portrait]
            </span>
          </div>
        </div>
      </Card>
    </Shell>
  );
}
