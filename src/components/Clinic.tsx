import Image from "next/image";
import { brand, todo } from "@/lib/brand";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Drift, Reveal, Stagger, StaggerItem, Wipe } from "@/motion";
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
    <section
      id="clinic"
      className="relative overflow-hidden bg-ms-field py-24 lg:py-32"
    >
      {/*
        Pattern held to the right, behind the copy, so it never sits under the
        portrait — the letterhead ground and a photograph are two textures and
        only one of them can be in front.
      */}
      <PatternField
        id="clinic"
        tone="field"
        fade="right"
        scale={400}
        opacity={0.55}
        drift={44}
      />

      <Wrap className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/*
            The portrait uncovers from its bottom edge, then the picture
            counter-scrolls *inside* its frame for the rest of the section —
            the frame itself never moves, so nothing detaches from the grid.
            That is what the 9% vertical overhang is for: it gives the image
            somewhere to travel without exposing an edge.
          */}
          <Wipe className="lg:col-span-5">
            <div className="relative h-[440px] w-full overflow-hidden ring-1 ring-ms-gold/25 lg:h-[600px]">
              <Drift distance={32} className="absolute inset-x-0 -inset-y-[9%]">
                <Image
                  src="/images/dermatologist.png"
                  alt="The lead clinician at Mela Skin"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </Drift>
            </div>
          </Wipe>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead tone="dark" title={todo.clinicianName} />

            <Reveal delay={0.15}>
              <p className="eyebrow mt-5 font-normal text-ms-gold">
                {todo.clinicianRole} &nbsp;&middot;&nbsp; {todo.clinicianReg}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-8 font-sans text-[17px] font-light leading-[1.85] text-ms-cream/80">
                [Two or three sentences: where they trained, the subspecialty
                interest that led to this clinic, and why Nairobi needed one
                built around melanin-rich skin. This is the most-read paragraph
                on a clinic page &mdash; write it in their own voice rather than
                in the third person.]
              </p>
            </Reveal>

            <Stagger as="ul" step={0.1} delay={0.35} className="mt-10 flex flex-col">
              {CREDENTIALS.map((line) => (
                <StaggerItem
                  as="li"
                  key={line}
                  y={18}
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
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

export function Premises() {
  return (
    <section className="relative overflow-hidden bg-ms-paper py-24 lg:py-36">
      <PatternField
        id="premises"
        tone="paper"
        fade="left"
        scale={520}
        opacity={0.9}
        drift={50}
      />

      <Wrap className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHead title={brand.address.line2} />

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[52ch] font-sans text-[17px] font-light leading-[1.85] text-ms-espresso/80">
                [Describe the space in two or three sentences &mdash; the
                treatment rooms, the lighting, parking and access, and anything
                a patient would want to know before a first visit.] Doors open{" "}
                {todo.openingDate}.
              </p>
            </Reveal>

            <Stagger
              as="dl"
              step={0.12}
              delay={0.3}
              className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2"
            >
              <StaggerItem y={20} className="border-t border-ms-bronze/25 pt-5">
                <dt className="eyebrow font-normal text-ms-bronze">Address</dt>
                <dd className="mt-2.5 font-sans text-[15.5px] font-light leading-[1.7] text-ms-espresso">
                  {brand.address.line1}
                  <br />
                  {brand.address.line2}
                  <br />
                  {brand.address.city}
                </dd>
              </StaggerItem>
              <StaggerItem y={20} className="border-t border-ms-bronze/25 pt-5">
                <dt className="eyebrow font-normal text-ms-bronze">Hours</dt>
                <dd className="mt-2.5 font-sans text-[15.5px] font-light leading-[1.7] text-ms-espresso">
                  {todo.hoursWeekday}
                  <br />
                  {todo.hoursSaturday}
                </dd>
              </StaggerItem>
            </Stagger>
          </div>

          <Stagger
            step={0.14}
            className="grid gap-4 lg:col-span-5 lg:col-start-8"
          >
            <StaggerItem y={30}>
              <PhotoSlot label="[Reception or treatment room]" className="h-60" />
            </StaggerItem>
            <div className="grid grid-cols-2 gap-4">
              <StaggerItem y={30}>
                <PhotoSlot label="[Detail shot]" className="h-44" />
              </StaggerItem>
              <StaggerItem y={30}>
                <PhotoSlot label="[Exterior or signage]" className="h-44" />
              </StaggerItem>
            </div>
          </Stagger>
        </div>
      </Wrap>
    </section>
  );
}
