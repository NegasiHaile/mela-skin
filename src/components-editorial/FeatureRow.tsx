import { brand, todo } from "@/lib/brand";
import { Monogram, Sparkle } from "./brand/Marks";
import { Card, PhotoSlot, Shell } from "./ui";

/*
  The row directly under the hero: two photograph slots flanking a wider tinted
  plate. The clinic facts live here rather than in a full-width band, which
  keeps the page reading as a stack of cards. No headline — the monogram and
  the registered descriptor carry it, and every line below is a real fact or a
  bracketed placeholder.
*/
const FACTS = [
  { label: "Registered practice", value: todo.regulator },
  { label: "Doors open", value: todo.openingDate },
  { label: "Address", value: `${brand.address.line1}, ${brand.address.line2}` },
  { label: "Clinic hours", value: todo.hoursWeekday },
];

export function FeatureRow() {
  return (
    <Shell>
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)_minmax(0,5fr)]">
        <PhotoSlot
          label="[Treatment detail]"
          rounded="rounded-[22px]"
          className="min-h-[260px] lg:min-h-[320px]"
        />

        <Card className="border border-ms-bronze/15 bg-ms-sand/40">
          <div className="flex h-full flex-col items-center justify-center gap-6 px-8 py-12 text-center">
            <Monogram size={58} />

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

            <dl className="mt-2 grid w-full max-w-[500px] grid-cols-2 gap-x-8 gap-y-5 border-t border-ms-bronze/20 pt-7 text-left">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="eyebrow font-normal text-ms-terracotta-deep">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-sans text-[13.5px] font-light leading-[1.55] text-ms-espresso/85">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Card>

        <PhotoSlot
          label="[Portrait of the lead clinician]"
          rounded="rounded-[22px]"
          className="min-h-[260px] lg:min-h-[320px]"
        />
      </div>
    </Shell>
  );
}
