import { CLINIC_FACTS, brand } from "@/constants";
import { Reveal, Stagger, StaggerItem, Wipe } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Monogram, Sparkle } from "./brand/Marks";
import { Card, PhotoSlot, Shell } from "./ui";

/*
  The row directly under the hero: two photograph slots flanking a wider tinted
  plate. The clinic facts live here rather than in a full-width band, which
  keeps the page reading as a stack of cards. No headline — the monogram and
  the registered descriptor carry it, and every line below is a real fact or a
  bracketed placeholder.
*/
export function FeatureRow() {
  return (
    <Shell>
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)_minmax(0,5fr)]">
        <Wipe>
          <PhotoSlot
            label="[Treatment detail]"
            rounded="rounded-[22px]"
            className="min-h-[260px] lg:min-h-[320px]"
          />
        </Wipe>

        <Card className="border border-ms-bronze/15 bg-ms-sand/40">
          <PatternField
            id="ed-facts"
            tone="sand"
            fade="edges"
            scale={280}
            opacity={0.9}
            drift={26}
          />
          <div className="relative flex h-full flex-col items-center justify-center gap-6 px-8 py-12 text-center">
            <Reveal y={16} delay={0.1}>
              <Monogram size={58} />
            </Reveal>

            <div className="flex flex-col items-center gap-3">
              <p className="font-display text-[clamp(1.35rem,2vw,1.7rem)] font-normal leading-tight text-ms-cocoa">
                {brand.descriptor}
              </p>
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-ms-bronze/40" />
                <Sparkle width={8} height={16} fill="url(#ms-gold)" />
                <span className="h-px w-7 bg-ms-bronze/40" />
              </div>
              <p className="eyebrow font-normal text-ms-bronze">
                {brand.address.city}, {brand.address.country}
              </p>
            </div>

            <Stagger
              as="dl"
              step={0.1}
              delay={0.22}
              className="mt-2 grid w-full max-w-[500px] grid-cols-2 gap-x-8 gap-y-5 border-t border-ms-bronze/20 pt-7 text-left"
            >
              {CLINIC_FACTS.map((fact) => (
                <StaggerItem key={fact.label} y={16}>
                  <dt className="eyebrow font-normal text-ms-terracotta-deep">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-sans text-[13.5px] font-light leading-[1.55] text-ms-espresso/85">
                    {fact.value}
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Card>

        <Wipe delay={0.12}>
          <PhotoSlot
            label="[Portrait of the lead clinician]"
            rounded="rounded-[22px]"
            className="min-h-[260px] lg:min-h-[320px]"
          />
        </Wipe>
      </div>
    </Shell>
  );
}
