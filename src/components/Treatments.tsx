import Image from "next/image";
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
import { SectionHead, Wrap } from "./ui";

type Treatment = {
  title: string;
  body: string;
  Icon: ComponentType<{ className?: string }>;
};

type TreatmentCard = Treatment & {
  image: string;
};

/*
  DRAFTED, NOT SUPPLIED. These are standard dermatology and aesthetic services
  written to fit the clinic's positioning; the Resources folder does not
  contain a service list. Several are regulated activities in Kenya — the
  bracketed spans mark the ones that need explicit sign-off (equipment,
  licensed dispensing, prescription-only agents) before this page is published.
*/
const MEDICAL: TreatmentCard[] = [
  {
    title: "Pigmentation & Melasma",
    body: "Structured programmes for post-inflammatory hyperpigmentation, melasma and uneven tone — without the unregulated skin-lightening agents that make both far worse.",
    Icon: IconPigment,
    image: "/images/pigmentation-melasma.png",
  },
  {
    title: "Acne & Acne Scarring",
    body: "Prescription-led clearance first, then a resurfacing plan chosen for how deeper skin heals — because the wrong device leaves a longer mark than the acne did.",
    Icon: IconAcne,
    image: "/images/acne-acne_scarring.png",
  },
  {
    title: "Keloids & Scarring",
    body: "[Intralesional steroid, silicone therapy, cryotherapy and surgical revision] for raised, hypertrophic and keloid scars, including ear-lobe keloids.",
    Icon: IconScar,
    image: "/images/keloids-scarring.png",
  },
  {
    title: "Hair & Scalp",
    body: "Traction alopecia, central centrifugal cicatricial alopecia and seborrhoeic dermatitis, [assessed with trichoscopy] before scarring becomes permanent.",
    Icon: IconHair,
    image: "/images/hair-scalp.png",
  },
];

const COSMETIC: TreatmentCard[] = [
  {
    title: "Injectables",
    body: "[Botulinum toxin and dermal filler] placed conservatively, with an eye to how facial ageing actually presents in African and South Asian faces.",
    Icon: IconInjectable,
    image: "/images/injectables.png",
  },
  {
    title: "Chemical Peels",
    body: "Depth and agent selected for your Fitzpatrick type, because a peel calibrated for lighter skin is the fastest route to the pigmentation you came in to treat.",
    Icon: IconPeel,
    image: "/images/chemical-peels.png",
  },
  {
    title: "Laser & Energy",
    body: "[Confirm your platforms] — wavelengths and settings validated for Fitzpatrick IV to VI, with test patching before any full treatment.",
    Icon: IconLaser,
    image: "/images/laser-energy.png",
  },
  {
    title: "Skin Boosters & Microneedling",
    body: "Hydration, texture and early scar work, [dispensed and performed in clinic] and scheduled as a course rather than sold as a one-off.",
    Icon: IconBooster,
    image: "/images/skin-boosters-microneedling.png",
  },
];

/** Brand-ground tints for the cosmetic paper cards — primaries from the deck. */
const COSMETIC_GROUNDS = [
  "from-ms-cream via-ms-cream to-ms-sand/85",
  "from-ms-ivory via-ms-cream/95 to-ms-sand/75",
  "from-ms-sand/90 via-ms-cream to-ms-ivory",
  "from-ms-cream via-ms-ivory/90 to-ms-sand/80",
] as const;

const TREATMENT_CARD_WIDTH = "w-[300px]";

function MedicalScrollCards({
  label,
  items,
}: {
  label: string;
  items: TreatmentCard[];
}) {
  return (
    <div className="reveal">
      <h3 className="eyebrow text-ms-terracotta-deep">{label}</h3>

      <div className="relative mt-10 bg-transparent lg:mt-12">
        <div
          className="scrollbar-hide -mr-6 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto bg-transparent pb-3 pt-1 pr-6 sm:-mr-10 sm:gap-5 sm:pr-10 lg:-mr-14 lg:pr-14"
          role="list"
          aria-label={label}
        >
          {items.map(({ title, body, image }) => (
            <article
              key={title}
              role="listitem"
              className={`flex shrink-0 snap-start ${TREATMENT_CARD_WIDTH}`}
            >
              <div className="relative flex w-full flex-col overflow-hidden rounded-[28px] bg-gradient-to-b from-ms-shell via-ms-cream/90 to-ms-sand/70 ring-1 ring-ms-bronze/15">
                <div className="relative min-h-[15.5rem] w-full sm:min-h-[17rem] lg:min-h-[19rem]">
                  <Image
                    src={image}
                    alt={`${title} — Mela Skin medical dermatology`}
                    fill
                    sizes="300px"
                    className="object-contain object-center p-2 sm:p-3"
                  />
                </div>

                <div className="shrink-0 bg-gradient-to-b from-transparent via-ms-ivory/70 to-ms-ivory p-4 sm:p-5">
                  <h4 className="font-display text-[1.28rem] leading-[1.2] tracking-[-0.01em] text-ms-cocoa sm:text-[1.35rem] lg:text-[1.22rem]">
                    {title}
                  </h4>
                  <p className="mt-2.5 font-sans text-[14px] font-light leading-[1.65] text-ms-espresso/80 sm:text-[15px] sm:leading-[1.7]">
                    {body}
                  </p>
                  <a
                    href="#book"
                    className="mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-ms-field/90 px-5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-ms-ivory transition-colors hover:bg-ms-panel sm:text-[11.5px]"
                  >
                    Book
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function CosmeticPaperCards({
  label,
  items,
}: {
  label: string;
  items: TreatmentCard[];
}) {
  return (
    <div className="reveal">
      <h3 className="eyebrow text-ms-terracotta-deep">{label}</h3>

      <div className="mt-10 lg:mt-12">
        <div
          className="scrollbar-hide -mr-6 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-4 pt-1 pr-6 sm:-mr-10 sm:gap-5 sm:pr-10 lg:-mr-14 lg:pr-14"
          role="list"
          aria-label={label}
        >
          {items.map(({ title, body, image, Icon }, index) => (
            <article
              key={title}
              role="listitem"
              className={`flex shrink-0 snap-start ${TREATMENT_CARD_WIDTH}`}
            >
              <div
                className={`paper-notch grain relative flex w-full flex-col overflow-hidden bg-gradient-to-b ${COSMETIC_GROUNDS[index % COSMETIC_GROUNDS.length]} shadow-[4px_6px_0_0_rgba(198,114,44,0.18),0_20px_44px_-24px_rgba(49,24,10,0.32)] ring-1 ring-ms-bronze/25`}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 z-20 size-[18px] bg-ms-terracotta/25"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 z-20 size-[18px] bg-ms-bronze/35"
                  style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
                />

                <div className="relative min-h-[15.5rem] w-full shrink-0 border-b border-dashed border-ms-bronze/30 bg-ms-paper/35 sm:min-h-[17rem] lg:min-h-[19rem]">
                  <Image
                    src={image}
                    alt={`${title} — Mela Skin cosmetic dermatology`}
                    fill
                    sizes="300px"
                    className="object-contain object-center p-2 sm:p-3"
                  />
                </div>

                <div className="shrink-0 p-4 pb-4 pt-4 sm:p-5 sm:pb-5">
                  <div className="flex items-start gap-3">
                    <Icon className="mt-1 shrink-0 text-ms-terracotta-deep" />
                    <h4 className="display-caps text-[19px] leading-[1.18] text-ms-cocoa sm:text-[20px] lg:text-[18px]">
                      {title}
                    </h4>
                  </div>

                  <p className="mt-3.5 font-sans text-[14px] font-light leading-[1.68] text-ms-espresso/82 sm:text-[15px] sm:leading-[1.72]">
                    {body}
                  </p>

                  <a
                    href="#book"
                    className="mt-4 inline-flex items-center gap-1.5 self-start border-b border-ms-terracotta/60 pb-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-ms-terracotta-deep transition-colors hover:border-ms-field hover:text-ms-field sm:text-[11.5px]"
                  >
                    Enquire
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Treatments() {
  return (
    <section id="treatments" className="bg-ms-paper py-28 lg:py-40">
      <Wrap>
        <SectionHead title="Treatments" className="max-w-[520px]" />

        <div className="mt-20 lg:mt-24">
          <MedicalScrollCards label="Medical Dermatology" items={MEDICAL} />

          <div
            aria-hidden="true"
            className="my-20 h-px bg-ms-bronze/20 lg:my-28"
          />

          <CosmeticPaperCards label="Cosmetic Dermatology" items={COSMETIC} />
        </div>
      </Wrap>
    </section>
  );
}
