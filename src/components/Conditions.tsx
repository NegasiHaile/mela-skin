import { CONDITIONS, MEDICAL_PAGE } from "@/constants";
import { Icon } from "./icons";
import { PatternField } from "./brand/PatternField";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Callout, Wrap } from "./ui";

/*
  The ten conditions, one card each.

  Every card answers the same three questions in the same order — what it is,
  how it behaves on melanin-rich skin, what the first appointment is for — so
  a reader who has scanned one knows where to look in the next. That regularity
  is the whole point of the layout; it is a reference page, not an essay.

  Two columns at lg rather than three or four. A condition entry runs to about
  a hundred and forty words and three columns would set that at a width nobody
  reads comfortably.

  Anchors are per-slug and carry scroll-mt so a jump from the index above (or
  from the home page index) does not land the heading under the top of the
  viewport.
*/

export function ConditionIndex() {
  return (
    <section className="relative overflow-hidden border-b border-ms-bronze/20 bg-ms-shell py-10 lg:py-12">
      <Wrap className="relative">
        <Reveal y={14}>
          <p className="eyebrow text-ms-bronze">{MEDICAL_PAGE.indexLabel}</p>
        </Reveal>
        <Stagger
          step={0.04}
          delay={0.08}
          className="mt-5 flex flex-wrap gap-2.5"
        >
          {CONDITIONS.map((condition) => (
            <StaggerItem key={condition.slug} y={12}>
              <a
                href={`#${condition.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-ms-bronze/30 px-5 font-sans text-[13.5px] tracking-[0.01em] text-ms-espresso/85 transition-colors hover:border-ms-terracotta/60 hover:bg-ms-cream hover:text-ms-cocoa"
              >
                {condition.title}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}

export function Conditions() {
  return (
    <section className="relative overflow-hidden bg-ms-paper py-20 lg:py-28">
      <PatternField
        id="conditions"
        tone="paper"
        fade="top"
        scale={600}
        opacity={0.85}
        drift={54}
      />

      <Wrap className="relative">
        <Stagger step={0.09} className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {CONDITIONS.map((condition, index) => (
            <StaggerItem
              as="article"
              key={condition.slug}
              y={28}
              id={condition.slug}
              className="scroll-mt-8 rounded-[24px] border border-ms-bronze/20 bg-ms-shell/85 p-7 backdrop-blur-sm sm:p-9 lg:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <Icon
                    name={condition.icon}
                    className="mt-1.5 shrink-0 text-ms-terracotta-deep"
                  />
                  <h2 className="font-display text-[1.75rem] leading-[1.15] tracking-[-0.01em] text-ms-cocoa sm:text-[2rem]">
                    {condition.title}
                  </h2>
                </div>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-display text-[1.6rem] font-light leading-none text-ms-clay/60"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-6 font-display text-[19px] italic leading-[1.5] text-ms-terracotta-deep sm:text-[20px]">
                {condition.summary}
              </p>

              <p className="mt-6 font-sans text-[16.5px] font-light leading-[1.85] text-ms-espresso/85">
                {condition.what}
              </p>

              {condition.deeper ? (
                <Callout eyebrow={condition.noteLabel ?? "On deeper skin"} className="mt-7">
                  {condition.deeper}
                </Callout>
              ) : null}

              <div className="mt-7 border-t border-ms-bronze/20 pt-6">
                <p className="eyebrow text-ms-bronze">At your appointment</p>
                <p className="mt-3 font-sans text-[16.5px] font-light leading-[1.85] text-ms-espresso/85">
                  {condition.approach}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
