import { brand, todo } from "@/lib/brand";
import { Reveal, Stagger, StaggerItem, Wipe } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Card, Inner, PhotoSlot, SectionLabel, Shell } from "./ui";

const CREDENTIALS = [
  "[Qualifications — e.g. MBChB, MMed Dermatology]",
  todo.clinicianReg,
  "[Hospital or teaching affiliation, if held]",
  "[Society membership, research or publications]",
];

export function Clinician() {
  return (
    <Shell>
      <Card id="clinic" className="mt-4 bg-ms-shell">
        <PatternField
          id="ed-clinic"
          tone="shell"
          fade="right"
          scale={430}
          opacity={0.85}
          drift={38}
        />
        <Inner>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Wipe className="lg:col-span-5">
              <PhotoSlot
                label="[Portrait of the lead clinician]"
                rounded="rounded-[18px]"
                className="h-[460px] w-full lg:h-[540px]"
              />
            </Wipe>

            <div className="lg:col-span-6 lg:col-start-7">
              <SectionLabel index="04">Who you&rsquo;ll see</SectionLabel>

              <Reveal delay={0.12}>
                <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] text-ms-cocoa">
                  {todo.clinicianName}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="eyebrow mt-4 font-normal text-ms-terracotta-deep">
                  {todo.clinicianRole} &nbsp;&middot;&nbsp; {todo.clinicianReg}
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <p className="mt-7 font-sans text-[16px] font-light leading-[1.88] text-ms-espresso/80">
                [Two or three sentences: where they trained, the subspecialty
                interest that led to this clinic, and why Nairobi needed one
                built around melanin-rich skin. This is the most-read paragraph
                on a clinic page &mdash; write it in their own voice rather than
                  in the third person.]
                </p>
              </Reveal>

              <Stagger
                as="ul"
                step={0.09}
                delay={0.36}
                className="mt-9 flex flex-col"
              >
                {CREDENTIALS.map((line) => (
                  <StaggerItem
                    as="li"
                    key={line}
                    y={16}
                    className="flex items-start gap-3.5 border-b border-ms-bronze/15 py-4 last:border-b-0"
                  >
                    <Sparkle
                      width={10}
                      height={20}
                      fill="url(#ms-gold)"
                      className="mt-1 shrink-0"
                    />
                    <span className="font-sans text-[14.5px] font-light leading-[1.6] text-ms-espresso/80">
                      {line}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Inner>
      </Card>
    </Shell>
  );
}

export function Premises() {
  return (
    <Shell>
      <Card className="mt-4 bg-ms-shell">
        <PatternField
          id="ed-premises"
          tone="shell"
          fade="left"
          scale={430}
          opacity={0.85}
          drift={38}
        />
        <Inner>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionLabel index="05">The clinic</SectionLabel>
              <Reveal delay={0.12}>
                <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] text-ms-cocoa">
                  {brand.address.line2}.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-7 max-w-[52ch] font-sans text-[16px] font-light leading-[1.88] text-ms-espresso/80">
                [Describe the space in two or three sentences &mdash; the
                treatment rooms, the lighting, parking and access, and anything
                a patient would want to know before a first visit.] Doors open{" "}
                  {todo.openingDate}.
                </p>
              </Reveal>

              <Stagger
                as="dl"
                step={0.11}
                delay={0.28}
                className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2"
              >
                <StaggerItem y={18}>
                  <dt className="eyebrow font-normal text-ms-bronze">Address</dt>
                  <dd className="mt-2 font-sans text-[14.5px] font-light leading-[1.7] text-ms-espresso">
                    {brand.address.line1}
                    <br />
                    {brand.address.line2}
                    <br />
                    {brand.address.city}
                  </dd>
                </StaggerItem>
                <StaggerItem y={18}>
                  <dt className="eyebrow font-normal text-ms-bronze">Hours</dt>
                  <dd className="mt-2 font-sans text-[14.5px] font-light leading-[1.7] text-ms-espresso">
                    {todo.hoursWeekday}
                    <br />
                    {todo.hoursSaturday}
                  </dd>
                </StaggerItem>
              </Stagger>
            </div>

            <Stagger step={0.13} className="grid gap-4 lg:col-span-5 lg:col-start-8">
              <StaggerItem y={26}>
                <PhotoSlot
                  label="[Reception or treatment room]"
                  className="h-56"
                />
              </StaggerItem>
              <div className="grid grid-cols-2 gap-4">
                <StaggerItem y={26}>
                  <PhotoSlot label="[Detail shot]" className="h-40" />
                </StaggerItem>
                <StaggerItem y={26}>
                  <PhotoSlot label="[Exterior or signage]" className="h-40" />
                </StaggerItem>
              </div>
            </Stagger>
          </div>
        </Inner>
      </Card>
    </Shell>
  );
}
