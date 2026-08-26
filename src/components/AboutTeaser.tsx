import Image from "next/image";
import { ABOUT, CLINICIANS } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Drift, Reveal, Wipe } from "@/motion";
import { PillGhost, PillSolid, Wrap } from "./ui";

/*
  The clinician on the home page, in short.

  The full biography, the credentials and the premises live on /about. This
  band exists so the landing page still puts a face to the clinic without
  repeating a whole section: portrait, name, role, one line, and the way
  through. Whoever you will actually see is the thing people scroll a clinic
  site looking for.

  Content: constants/about.ts → ABOUT.teaser, constants/clinic.ts → CLINICIANS.
*/
export function AboutTeaser() {
  const clinician = CLINICIANS[0];

  return (
    <section
      id="clinic"
      className="relative overflow-hidden bg-ms-field py-24 lg:py-32"
    >
      <PatternField
        id="about-teaser"
        tone="field"
        fade="right"
        scale={400}
        opacity={0.55}
        drift={44}
      />

      <Wrap className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Wipe className="lg:col-span-5">
            <div className="relative h-[380px] w-full overflow-hidden ring-1 ring-ms-gold/25 lg:h-[500px]">
              <Drift distance={28} className="absolute inset-x-0 -inset-y-[9%]">
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

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal y={18}>
              <p className="eyebrow text-ms-gold">{ABOUT.teaser.eyebrow}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <h2 className="display-caps mt-6 text-[clamp(2rem,3.6vw,3rem)] text-ms-ivory">
                {clinician.name}
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="eyebrow mt-5 font-normal text-ms-gold">
                {clinician.role} &nbsp;&middot;&nbsp; {clinician.registration}
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="mt-8 max-w-[48ch] font-sans text-[17px] font-light leading-[1.85] text-ms-cream/80">
                {ABOUT.teaser.body}
              </p>
            </Reveal>

            <Reveal delay={0.36} className="mt-10 flex flex-wrap gap-3.5">
              <PillSolid href="/about" tone="dark" className="min-h-13 px-8">
                {ABOUT.teaser.cta}
              </PillSolid>
              <PillGhost href="/contact" tone="dark" className="min-h-13 px-8">
                Book a consultation
              </PillGhost>
            </Reveal>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
