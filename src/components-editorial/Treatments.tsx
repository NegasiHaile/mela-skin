import { CONDITIONS, COSMETIC } from "@/constants";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Card, Inner, SectionLabel, Shell } from "./ui";

/*
  The real offering, from constants/conditions.ts and constants/cosmetic.ts,
  exactly as the immersive direction at `/` carries it.
  This used to hold a drafted eight-item list written before the clinic had
  supplied one; that list is gone.

  No icons here, unlike the immersive direction. This folder keeps its own
  eight-mark icon set so that either direction can be deleted whole, and the
  real list needs twenty. Rather than duplicating them into a route that exists
  only for comparison, the entries are set as type. Titles and one-line
  summaries come from the shared data, so the two directions cannot drift.
*/

type Entry = { title: string; summary: string; href: string };

const MEDICAL: Entry[] = CONDITIONS.map((condition) => ({
  title: condition.title,
  summary: condition.summary,
  href: `/medical-dermatology#${condition.slug}`,
}));

const COSMETIC_ENTRIES: Entry[] = COSMETIC.map((family) => ({
  title: family.title,
  summary: family.summary,
  href: `/cosmetic-dermatology#${family.slug}`,
}));

function TreatmentGroup({ label, items }: { label: string; items: Entry[] }) {
  return (
    <div>
      <Reveal y={16}>
        <h3 className="eyebrow border-b border-ms-bronze/25 pb-4 text-ms-terracotta-deep">
          {label}
        </h3>
      </Reveal>
      <Stagger as="ul" step={0.07} delay={0.1} className="mt-1 flex flex-col">
        {items.map((item) => (
          <StaggerItem
            as="li"
            key={item.title}
            y={18}
            className="border-b border-ms-bronze/15 last:border-b-0"
          >
            <a href={item.href} className="group flex flex-col gap-2.5 py-6">
              <span className="flex items-center gap-3">
                <span className="font-display text-[21px] font-normal leading-tight text-ms-cocoa">
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className="text-ms-bronze opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  &rarr;
                </span>
              </span>
              <span className="font-sans text-[14.5px] font-light leading-[1.8] text-ms-espresso/75">
                {item.summary}
              </span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export function Treatments() {
  return (
    <Shell>
      <Card id="treatments" className="mt-4 bg-ms-shell">
        <PatternField tone="shell" />
        <Inner>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index="02">Treatments</SectionLabel>
              <Reveal delay={0.12}>
              <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] tracking-[-0.014em] text-ms-cocoa">
                Medical and cosmetic,{" "}
                <em className="italic text-ms-terracotta">one roof</em>.
              </h2>
              </Reveal>
            </div>
            <Reveal delay={0.22}>
              <p className="max-w-[34ch] font-sans text-[14.5px] font-light leading-[1.8] text-ms-bronze lg:pb-2">
                Every path starts with the same consultation. Where you go next
                depends on what we find.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-2">
            <TreatmentGroup label="Medical Dermatology" items={MEDICAL} />
            <TreatmentGroup label="Cosmetic Dermatology" items={COSMETIC_ENTRIES} />
          </div>
        </Inner>
      </Card>
    </Shell>
  );
}
