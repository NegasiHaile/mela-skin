import { brand, todo } from "@/lib/brand";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { ButtonGhost, ButtonPrimary, Card, Inner, Shell } from "./ui";

const DETAILS = [
  {
    label: "Clinic",
    lines: [brand.address.line1, `${brand.address.line2}, ${brand.address.city}`],
  },
  { label: "Reach us", lines: [brand.phone, brand.email] },
  { label: "Hours", lines: [todo.hoursWeekday, todo.hoursSaturday] },
];

export function Booking() {
  return (
    <Shell>
      <Card id="book" className="mt-4 bg-ms-panel">
        <PatternField
          id="ed-book"
          tone="panel"
          fade="none"
          scale={200}
          opacity={0.6}
          drift={44}
        />

        <Inner className="relative">
          <div className="flex flex-col items-center text-center">
            <Reveal y={14}>
              <p className="eyebrow text-ms-clay">Book</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-7 max-w-[18ch] font-display text-[clamp(2.1rem,4vw,3.2rem)] font-normal leading-[1.08] tracking-[-0.016em] text-ms-ivory">
                Start with one{" "}
                <em className="italic text-ms-clay">consultation</em>.
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
            <p className="mt-6 max-w-[54ch] font-sans text-[16px] font-light leading-[1.85] text-ms-cream/80">
              {todo.consultLength} minutes with {todo.clinicianName}: an
              examination, a diagnosis in plain language, and a written plan you
              leave with. {todo.consultFee}, redeemable against treatment
              [confirm your policy].
            </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <ButtonPrimary href={brand.phoneHref} tone="dark">
                  Call {brand.phone}
                </ButtonPrimary>
                <ButtonGhost href={`mailto:${brand.email}`} tone="dark">
                  Email the clinic
                </ButtonGhost>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <p className="mt-7 font-sans text-[12px] font-light tracking-[0.05em] text-ms-sand/65">
                Online booking opens {todo.bookingOpens}.
              </p>
            </Reveal>

            <Stagger as="dl" step={0.11} className="mt-16 grid w-full gap-4 md:grid-cols-3">
              {DETAILS.map((detail) => (
                <StaggerItem
                  key={detail.label}
                  y={22}
                  className="flex flex-col gap-2.5 rounded-[18px] border border-ms-sand/20 bg-ms-espresso/45 px-7 py-7 text-left backdrop-blur-[2px]"
                >
                  <dt className="eyebrow font-normal text-ms-clay">
                    {detail.label}
                  </dt>
                  <dd className="font-sans text-[14.5px] font-light leading-[1.7] text-ms-cream">
                    {detail.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Inner>
      </Card>
    </Shell>
  );
}
