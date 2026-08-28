import Image from "next/image";
import { ABOUT, CLINICIANS, PREMISES } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Drift, Reveal, Stagger, StaggerItem, Wipe } from "@/motion";
import { PhotoSlot, SectionHead, Wrap } from "./ui";

/*
  Who you see, and where.

  This is the second of the two things /about is for. Abseret set both out at
  00:17:24: "either about our clinic, our mission and vision, and then each
  provider that we have a little bit of a bio about them." So the page runs the
  clinic's story, then this, and the rest follows.

  One block per provider: portrait on one side, name / role / bio / special
  interests / credentials on the other, and the sides swap on every other entry
  so two providers read as a column rather than as the same block printed twice.

  Content: constants/clinic.ts → CLINICIANS and PREMISES, and
  constants/about.ts → ABOUT.providers for the head. CLINICIANS is an array, so
  a third name is an edit to that file and nothing here.
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
      <PatternField tone="field" />

      <Wrap className="relative">
        <div className="max-w-[680px]">
          <Reveal y={18}>
            <p className="eyebrow text-ms-gold">{ABOUT.providers.eyebrow}</p>
          </Reveal>
          <SectionHead
            tone="dark"
            title={ABOUT.providers.title}
            rule={false}
            className="mt-6"
          />
          <Reveal delay={0.18}>
            <p className="mt-7 font-sans text-[18px] font-light leading-[1.8] text-ms-cream/85 lg:text-[19px]">
              {ABOUT.providers.lede}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-20 lg:mt-24 lg:gap-28">
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
                    {/*
                      `src` is null until the clinic has been photographed, and
                      then this is a labelled slot rather than a generated face.
                      Dr. Abseret Hailu, 00:17:24: "I'm not a huge fan on the AI
                      pics of the people, because I do want it to be real."
                    */}
                    {clinician.portrait.src ? (
                      <Drift distance={32} className="absolute inset-x-0 -inset-y-[9%]">
                        <Image
                          src={clinician.portrait.src}
                          alt={clinician.portrait.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover object-center"
                        />
                      </Drift>
                    ) : (
                      <PhotoSlot
                        tone="dark"
                        label={clinician.portrait.label}
                        className="h-full w-full"
                      />
                    )}
                  </div>

                  {/*
                    A stand-in has to be labelled on the page, not only in the
                    source. Abseret, 00:17:24: "I'm not a huge fan on the AI pics
                    of the people, because I do want it to be real" — so while
                    one is here for the layout's sake, it says what it is.
                  */}
                  {clinician.portrait.caption ? (
                    <p className="mt-3.5 font-sans text-[13px] font-light tracking-[0.02em] text-ms-sand/70">
                      {clinician.portrait.caption}
                    </p>
                  ) : null}
                </Wipe>

                <div
                  className={
                    mirrored
                      ? "lg:col-span-6 lg:col-start-1 lg:order-1"
                      : "lg:col-span-6 lg:col-start-7"
                  }
                >
                  <Reveal y={18}>
                    <h3 className="display-caps text-[clamp(1.9rem,3.2vw,2.7rem)] text-ms-ivory">
                      {clinician.name}
                    </h3>
                  </Reveal>

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

                  {/*
                    Special interests, held out on their own line rather than
                    buried in the credential list. Abseret asked for exactly this
                    at 00:32:49 — "so that people feel like they're being seen by
                    an expert within that" — and a patient who has been told
                    three times that their hair loss is normal is scanning for
                    precisely this line.
                  */}
                  <Reveal delay={0.32}>
                    <p className="mt-7 border-l-2 border-ms-gold/45 pl-5 font-display text-[1.15rem] italic leading-[1.55] text-ms-sand">
                      Special interests: {clinician.interests}
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
      <PatternField tone="paper" />

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
