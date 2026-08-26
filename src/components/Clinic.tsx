import Image from "next/image";
import { CLINICIANS, PREMISES } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Drift, Reveal, Stagger, StaggerItem, Wipe } from "@/motion";
import { PhotoSlot, SectionHead, Wrap } from "./ui";

/*
  Who you see, and where.

  Content: constants/clinic.ts → CLINICIANS and PREMISES. CLINICIANS is an
  array, so adding a second name is an edit to that file rather than to this
  layout — the portrait swaps sides on every other entry so a team reads as a
  column rather than as the same block repeated.
*/

/* Reversed section — the clinician sits on the field colour, like the hero. */
export function Clinician() {
  return (
    <section
      id="clinician"
      className="relative scroll-mt-4 overflow-hidden bg-ms-field py-24 lg:py-32"
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
        <div className="flex flex-col gap-20 lg:gap-28">
          {CLINICIANS.map((clinician, index) => {
            const mirrored = index % 2 === 1;

            return (
              <div
                key={clinician.name}
                className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20"
              >
                {/*
                  The portrait uncovers from its bottom edge, then the picture
                  counter-scrolls *inside* its frame for the rest of the
                  section — the frame itself never moves, so nothing detaches
                  from the grid. That is what the 9% vertical overhang is for:
                  it gives the image somewhere to travel without exposing an
                  edge.
                */}
                <Wipe
                  className={
                    mirrored ? "lg:col-span-5 lg:col-start-8 lg:order-2" : "lg:col-span-5"
                  }
                >
                  <div className="relative h-[440px] w-full overflow-hidden ring-1 ring-ms-gold/25 lg:h-[600px]">
                    <Drift distance={32} className="absolute inset-x-0 -inset-y-[9%]">
                      <Image
                        src={clinician.portrait.src}
                        alt={clinician.portrait.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center"
                      />
                    </Drift>
                  </div>
                </Wipe>

                <div
                  className={
                    mirrored
                      ? "lg:col-span-6 lg:col-start-1 lg:order-1"
                      : "lg:col-span-6 lg:col-start-7"
                  }
                >
                  <SectionHead tone="dark" title={clinician.name} />

                  <Reveal delay={0.15}>
                    <p className="eyebrow mt-5 font-normal text-ms-gold">
                      {clinician.role} &nbsp;&middot;&nbsp; {clinician.registration}
                    </p>
                  </Reveal>

                  <Reveal delay={0.25}>
                    <p className="mt-8 font-sans text-[17px] font-light leading-[1.85] text-ms-cream/80">
                      {clinician.bio}
                    </p>
                  </Reveal>

                  <Stagger as="ul" step={0.1} delay={0.35} className="mt-10 flex flex-col">
                    {clinician.credentials.map((line) => (
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
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}

export function Premises() {
  const [lead, ...rest] = PREMISES.photoSlots;

  return (
    <section id="premises" className="relative scroll-mt-4 overflow-hidden bg-ms-paper py-24 lg:py-36">
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
            <SectionHead title={PREMISES.title} />

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[52ch] font-sans text-[17px] font-light leading-[1.85] text-ms-espresso/80">
                {PREMISES.intro} {PREMISES.opening}
              </p>
            </Reveal>

            <Stagger
              as="dl"
              step={0.12}
              delay={0.3}
              className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2"
            >
              {PREMISES.facts.map((fact) => (
                <StaggerItem
                  key={fact.label}
                  y={20}
                  className="border-t border-ms-bronze/25 pt-5"
                >
                  <dt className="eyebrow font-normal text-ms-bronze">{fact.label}</dt>
                  <dd className="mt-2.5 font-sans text-[15.5px] font-light leading-[1.7] text-ms-espresso">
                    {fact.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Stagger
            step={0.14}
            className="grid gap-4 lg:col-span-5 lg:col-start-8"
          >
            <StaggerItem y={30}>
              <PhotoSlot label={lead} className="h-60" />
            </StaggerItem>
            <div className="grid grid-cols-2 gap-4">
              {rest.map((slot) => (
                <StaggerItem key={slot} y={30}>
                  <PhotoSlot label={slot} className="h-44" />
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </Wrap>
    </section>
  );
}
