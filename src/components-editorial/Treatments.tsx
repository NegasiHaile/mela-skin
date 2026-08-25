import type { ComponentType } from "react";
import {
  IconAcne,
  IconBooster,
  IconHair,
  IconInjectable,
  IconLaser,
  IconPeel,
  IconPigment,
  IconScar,
} from "./icons";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Card, Inner, SectionLabel, Shell } from "./ui";

type Treatment = {
  title: string;
  body: string;
  Icon: ComponentType<{ className?: string }>;
};

/*
  DRAFTED, NOT SUPPLIED. These are standard dermatology and aesthetic services
  written to fit the clinic's positioning; the Resources folder does not
  contain a service list. Several are regulated activities in Kenya — the
  bracketed spans mark the ones that need explicit sign-off (equipment,
  licensed dispensing, prescription-only agents) before this page is published.
*/
const MEDICAL: Treatment[] = [
  {
    title: "Pigmentation & Melasma",
    body: "Structured programmes for post-inflammatory hyperpigmentation, melasma and uneven tone — without the unregulated skin-lightening agents that make both far worse.",
    Icon: IconPigment,
  },
  {
    title: "Acne & Acne Scarring",
    body: "Prescription-led clearance first, then a resurfacing plan chosen for how deeper skin heals — because the wrong device leaves a longer mark than the acne did.",
    Icon: IconAcne,
  },
  {
    title: "Keloids & Scarring",
    body: "[Intralesional steroid, silicone therapy, cryotherapy and surgical revision] for raised, hypertrophic and keloid scars, including ear-lobe keloids.",
    Icon: IconScar,
  },
  {
    title: "Hair & Scalp",
    body: "Traction alopecia, central centrifugal cicatricial alopecia and seborrhoeic dermatitis, [assessed with trichoscopy] before scarring becomes permanent.",
    Icon: IconHair,
  },
];

const COSMETIC: Treatment[] = [
  {
    title: "Injectables",
    body: "[Botulinum toxin and dermal filler] placed conservatively, with an eye to how facial ageing actually presents in African and South Asian faces.",
    Icon: IconInjectable,
  },
  {
    title: "Chemical Peels",
    body: "Depth and agent selected for your Fitzpatrick type, because a peel calibrated for lighter skin is the fastest route to the pigmentation you came in to treat.",
    Icon: IconPeel,
  },
  {
    title: "Laser & Energy",
    body: "[Confirm your platforms] — wavelengths and settings validated for Fitzpatrick IV to VI, with test patching before any full treatment.",
    Icon: IconLaser,
  },
  {
    title: "Skin Boosters & Microneedling",
    body: "Hydration, texture and early scar work, [dispensed and performed in clinic] and scheduled as a course rather than sold as a one-off.",
    Icon: IconBooster,
  },
];

function TreatmentGroup({
  label,
  items,
}: {
  label: string;
  items: Treatment[];
}) {
  return (
    <div>
      <Reveal y={16}>
        <h3 className="eyebrow border-b border-ms-bronze/25 pb-4 text-ms-terracotta-deep">
          {label}
        </h3>
      </Reveal>
      <Stagger as="ul" step={0.09} delay={0.1} className="mt-1 flex flex-col">
        {items.map(({ title, body, Icon }) => (
          <StaggerItem
            as="li"
            key={title}
            y={20}
            className="flex flex-col gap-3 border-b border-ms-bronze/15 py-7 last:border-b-0"
          >
            <div className="flex items-center gap-3.5">
              <Icon className="shrink-0 text-ms-terracotta" />
              <h4 className="font-display text-[21px] font-normal leading-tight text-ms-cocoa">
                {title}
              </h4>
            </div>
            <p className="font-sans text-[14.5px] font-light leading-[1.8] text-ms-espresso/75">
              {body}
            </p>
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
        <PatternField id="ed-treatments" tone="shell" fade="right" scale={440} opacity={0.85} drift={40} />
        <Inner>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index="02">Treatments</SectionLabel>
              <Reveal delay={0.12}>
              <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] tracking-[-0.014em] text-ms-cocoa">
                Medical and cosmetic,{" "}
                <em className="italic text-ms-clay">one roof</em>.
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
            <TreatmentGroup label="Cosmetic Dermatology" items={COSMETIC} />
          </div>
        </Inner>
      </Card>
    </Shell>
  );
}
