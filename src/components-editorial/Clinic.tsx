import { brand, todo } from "@/lib/brand";
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
        <Inner>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <PhotoSlot
                label="[Portrait of the lead clinician]"
                rounded="rounded-[18px]"
                className="h-[460px] w-full lg:h-[540px]"
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <SectionLabel index="04">Who you&rsquo;ll see</SectionLabel>

              <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] text-ms-cocoa">
                {todo.clinicianName}
              </h2>
              <p className="eyebrow mt-4 font-normal text-ms-terracotta-deep">
                {todo.clinicianRole} &nbsp;&middot;&nbsp; {todo.clinicianReg}
              </p>

              <p className="mt-7 font-sans text-[16px] font-light leading-[1.88] text-ms-espresso/80">
                [Two or three sentences: where they trained, the subspecialty
                interest that led to this clinic, and why Nairobi needed one
                built around melanin-rich skin. This is the most-read paragraph
                on a clinic page &mdash; write it in their own voice rather than
                in the third person.]
              </p>

              <ul className="mt-9 flex flex-col">
                {CREDENTIALS.map((line) => (
                  <li
                    key={line}
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
                  </li>
                ))}
              </ul>
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
        <Inner>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionLabel index="05">The clinic</SectionLabel>
              <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] text-ms-cocoa">
                {brand.address.line2}.
              </h2>
              <p className="mt-7 max-w-[52ch] font-sans text-[16px] font-light leading-[1.88] text-ms-espresso/80">
                [Describe the space in two or three sentences &mdash; the
                treatment rooms, the lighting, parking and access, and anything
                a patient would want to know before a first visit.] Doors open{" "}
                {todo.openingDate}.
              </p>

              <dl className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow font-normal text-ms-bronze">Address</dt>
                  <dd className="mt-2 font-sans text-[14.5px] font-light leading-[1.7] text-ms-espresso">
                    {brand.address.line1}
                    <br />
                    {brand.address.line2}
                    <br />
                    {brand.address.city}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow font-normal text-ms-bronze">Hours</dt>
                  <dd className="mt-2 font-sans text-[14.5px] font-light leading-[1.7] text-ms-espresso">
                    {todo.hoursWeekday}
                    <br />
                    {todo.hoursSaturday}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="grid gap-4 lg:col-span-5 lg:col-start-8">
              <PhotoSlot
                label="[Reception or treatment room]"
                className="h-56"
              />
              <div className="grid grid-cols-2 gap-4">
                <PhotoSlot label="[Detail shot]" className="h-40" />
                <PhotoSlot label="[Exterior or signage]" className="h-40" />
              </div>
            </div>
          </div>
        </Inner>
      </Card>
    </Shell>
  );
}
