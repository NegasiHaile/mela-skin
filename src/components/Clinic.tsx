import Image from "next/image";
import { brand, todo } from "@/lib/brand";
import { Sparkle } from "./brand/Marks";
import { PhotoSlot, SectionHead, Wrap } from "./ui";

const CREDENTIALS = [
  "[Qualifications — e.g. MBChB, MMed Dermatology]",
  todo.clinicianReg,
  "[Hospital or teaching affiliation, if held]",
  "[Society membership, research or publications]",
];

/* Reversed section — the clinician sits on the field colour, like the hero. */
export function Clinician() {
  return (
    <section id="clinic" className="bg-ms-field py-24 lg:py-32">
      <Wrap>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="relative h-[440px] w-full overflow-hidden lg:col-span-5 lg:h-[600px]">
            <Image
              src="/images/dermatologist.png"
              alt="The lead clinician at Mela Skin"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead
              index="04"
              label="Who you'll see"
              tone="dark"
              title={todo.clinicianName}
            />

            <p className="eyebrow mt-5 font-normal text-ms-gold">
              {todo.clinicianRole} &nbsp;&middot;&nbsp; {todo.clinicianReg}
            </p>

            <p className="mt-8 font-sans text-[17px] font-light leading-[1.85] text-ms-cream/80">
              [Two or three sentences: where they trained, the subspecialty
              interest that led to this clinic, and why Nairobi needed one built
              around melanin-rich skin. This is the most-read paragraph on a
              clinic page &mdash; write it in their own voice rather than in the
              third person.]
            </p>

            <ul className="mt-10 flex flex-col">
              {CREDENTIALS.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3.5 border-b border-ms-sand/20 py-4 last:border-b-0"
                >
                  <Sparkle
                    width={10}
                    height={20}
                    fill="url(#ms-gold)"
                    className="mt-1 shrink-0"
                  />
                  <span className="font-sans text-[15.5px] font-light leading-[1.6] text-ms-cream/85">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

export function Premises() {
  return (
    <section className="bg-ms-paper py-24 lg:py-36">
      <Wrap>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHead
              index="05"
              label="The clinic"
              title={brand.address.line2}
            />
            <p className="mt-8 max-w-[52ch] font-sans text-[17px] font-light leading-[1.85] text-ms-espresso/80">
              [Describe the space in two or three sentences &mdash; the
              treatment rooms, the lighting, parking and access, and anything a
              patient would want to know before a first visit.] Doors open{" "}
              {todo.openingDate}.
            </p>

            <dl className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2">
              <div className="border-t border-ms-bronze/25 pt-5">
                <dt className="eyebrow font-normal text-ms-bronze">Address</dt>
                <dd className="mt-2.5 font-sans text-[15.5px] font-light leading-[1.7] text-ms-espresso">
                  {brand.address.line1}
                  <br />
                  {brand.address.line2}
                  <br />
                  {brand.address.city}
                </dd>
              </div>
              <div className="border-t border-ms-bronze/25 pt-5">
                <dt className="eyebrow font-normal text-ms-bronze">Hours</dt>
                <dd className="mt-2.5 font-sans text-[15.5px] font-light leading-[1.7] text-ms-espresso">
                  {todo.hoursWeekday}
                  <br />
                  {todo.hoursSaturday}
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-4 lg:col-span-5 lg:col-start-8">
            <PhotoSlot label="[Reception or treatment room]" className="h-60" />
            <div className="grid grid-cols-2 gap-4">
              <PhotoSlot label="[Detail shot]" className="h-44" />
              <PhotoSlot label="[Exterior or signage]" className="h-44" />
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
