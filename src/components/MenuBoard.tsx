import { MENU, kes } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Wrap } from "./ui";

/*
  The priced menu.

  Everything here is read from lib/menu.ts, which is a transcription of the
  clinic's printed 2025 sheet. This file decides only how it is worn.

  Three decisions carry the layout:

  1. The first tier is set large and the rest are set as rows beneath it. On
     the printed sheet all four tiers are the same size, which is fine on A4
     and unreadable on a phone. Here the number most people want — one session
     — is display type, and the course rates sit under it in a scannable
     column with their labels spelled out rather than abbreviated to "10x".

  2. The section nav pins, the site header does not. On a page of sixty priced
     items the useful thing to keep on screen is where you are in the menu.

  3. No accordions. A price hidden behind a click is a price the visitor
     assumes is bad news.
*/

function Tier({
  label,
  price,
  lead,
}: {
  label: string;
  price: number;
  lead: boolean;
}) {
  if (lead) {
    return (
      <div className="border-b border-ms-bronze/20 pb-4">
        <dt className="font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-ms-terracotta-deep">
          {label}
        </dt>
        <dd className="mt-2 font-display text-[1.85rem] leading-none tracking-[-0.01em] text-ms-cocoa sm:text-[2rem]">
          {kes(price)}
        </dd>
      </div>
    );
  }

  return (
    <div className="flex items-baseline justify-between gap-5">
      <dt className="font-sans text-[15px] font-light text-ms-espresso/75">
        {label}
      </dt>
      <dd className="shrink-0 font-sans text-[16px] font-medium tracking-[0.01em] text-ms-cocoa">
        {kes(price)}
      </dd>
    </div>
  );
}

export function MenuNav() {
  return (
    <div className="sticky top-0 z-30 border-b border-ms-bronze/20 bg-ms-shell/95 backdrop-blur-md">
      <Wrap>
        <nav
          aria-label="Treatment menu sections"
          className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto py-3.5 sm:py-4"
        >
          {MENU.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-ms-bronze/30 px-5 font-sans text-[13.5px] tracking-[0.01em] text-ms-espresso/85 transition-colors hover:border-ms-terracotta/60 hover:bg-ms-cream hover:text-ms-cocoa"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </Wrap>
    </div>
  );
}

export function MenuBoard() {
  return (
    <>
      {MENU.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`relative scroll-mt-20 overflow-hidden py-20 lg:py-28 ${
            index % 2 === 0 ? "bg-ms-paper" : "bg-ms-shell"
          }`}
        >
          <PatternField
            id={`menu-${section.id}`}
            tone={index % 2 === 0 ? "paper" : "shell"}
            fade={index % 2 === 0 ? "left" : "right"}
            scale={560}
            opacity={0.85}
            drift={44}
          />

          <Wrap className="relative">
            <Reveal y={20}>
              <div className="max-w-[640px]">
                <p className="eyebrow text-ms-terracotta-deep">
                  {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; Menu
                </p>
                <h2 className="display-caps mt-5 text-[clamp(2rem,3.6vw,3rem)] text-ms-cocoa">
                  {section.title}
                </h2>
                <p className="mt-6 font-sans text-[17.5px] font-light leading-[1.8] text-ms-espresso/80 lg:text-[18.5px]">
                  {section.blurb}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 flex flex-col gap-14 lg:mt-16 lg:gap-16">
              {section.groups.map((group) => (
                <div key={group.name}>
                  <Reveal y={16}>
                    <h3 className="flex items-center gap-5 font-display text-[1.5rem] leading-none tracking-[-0.01em] text-ms-cocoa sm:text-[1.7rem]">
                      <span className="shrink-0">{group.name}</span>
                      <span
                        aria-hidden="true"
                        className="hairline-gold hidden flex-1 sm:block"
                      />
                    </h3>
                  </Reveal>

                  <Stagger
                    as="ul"
                    step={0.07}
                    delay={0.08}
                    className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3"
                  >
                    {group.items.map((item) => (
                      <StaggerItem
                        as="li"
                        key={item.name}
                        y={22}
                        className="flex flex-col rounded-[20px] border border-ms-bronze/20 bg-ms-ivory/70 p-6 backdrop-blur-sm sm:p-7"
                      >
                        <h4 className="font-display text-[1.35rem] leading-[1.2] tracking-[-0.01em] text-ms-cocoa sm:text-[1.45rem]">
                          {item.name}
                        </h4>

                        <dl className="mt-6 flex flex-col gap-3.5">
                          {item.tiers.map((tier, tierIndex) => (
                            <Tier
                              key={tier.label}
                              label={tier.label}
                              price={tier.price}
                              lead={tierIndex === 0}
                            />
                          ))}
                        </dl>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              ))}
            </div>
          </Wrap>
        </section>
      ))}
    </>
  );
}
