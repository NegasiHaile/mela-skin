import Link from "next/link";
import { HOME } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Lift, Stagger, StaggerItem } from "@/motion";
import { Lede, SectionHead, Wrap } from "./ui";

/*
  The three-part shape the clinic set out for itself in more-info.md: medical,
  cosmetic, and the one service that is not open yet.

  This section orients rather than informs — forty words a card, then out to
  the page that carries the detail. The treatment section below it is where the
  actual conditions and prices live. Keeping those two jobs apart is what stops
  the home page turning into a directory of everything at once.

  Copy: constants/copy.ts → HOME.pillars.
*/
export function Pillars() {
  return (
    <section
      id="care"
      className="relative overflow-hidden bg-ms-cream py-24 lg:py-32"
    >
      <PatternField
        id="pillars"
        tone="cream"
        fade="top"
        scale={540}
        opacity={0.85}
        drift={46}
      />

      <Wrap className="relative">
        <div className="max-w-[720px]">
          <SectionHead title={HOME.pillars.title} />
          <Lede className="mt-7">{HOME.pillars.lede}</Lede>
        </div>

        <Stagger
          step={0.13}
          className="mt-16 grid gap-5 sm:gap-6 lg:mt-20 lg:grid-cols-3"
        >
          {HOME.pillars.cards.map((pillar) => (
            <StaggerItem as="article" key={pillar.href} y={30}>
              <Lift amount={8} className="h-full">
                <Link
                  href={pillar.href}
                  className="group flex h-full flex-col rounded-[24px] border border-ms-bronze/20 bg-ms-shell/85 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-ms-terracotta/45 sm:p-9"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow text-ms-terracotta-deep">
                      {pillar.eyebrow}
                    </p>
                    <Sparkle
                      width={11}
                      height={22}
                      fill="url(#ms-gold)"
                      className="shrink-0 opacity-70"
                    />
                  </div>

                  <h3 className="mt-6 font-display text-[1.9rem] leading-[1.15] tracking-[-0.01em] text-ms-cocoa sm:text-[2.15rem]">
                    {pillar.title}
                  </h3>

                  <p className="mt-5 flex-1 font-sans text-[16.5px] font-light leading-[1.8] text-ms-espresso/80">
                    {pillar.body}
                  </p>

                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-ms-bronze/20 pt-5">
                    <span className="font-sans text-[13px] font-light tracking-[0.02em] text-ms-bronze">
                      {pillar.count}
                    </span>
                    <span className="inline-flex items-center gap-2 font-sans text-[11.5px] font-medium uppercase tracking-[0.16em] text-ms-cocoa">
                      {pillar.cta}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </Lift>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
