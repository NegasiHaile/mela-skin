import { ABOUT, CLINICIANS, PREMISES } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { ClinicianProfile } from "./ClinicianProfile";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { SectionHead, Wrap } from "./ui";

/*
  Who you see, and where.

  This is the second of the two things /about is for. Abseret set both out at
  00:17:24: "either about our clinic, our mission and vision, and then each
  provider that we have a little bit of a bio about them." So the page runs the
  clinic's story, then this, and the rest follows.

  THE PROFILE ITSELF IS SHARED, ClinicianProfile (./ClinicianProfile.tsx): one
  block per provider, portrait on one side and name / role / bio / credentials
  on the other, alternating sides across the array. This file is now only the
  section's own chrome -- the flooded ground and the accessible heading -- and
  the ClinicianBand teaser on the home page renders the identical component
  (/contact ran the same band until it came off that page on request -- see
  app/contact/page.tsx). See the note on ClinicianProfile for why that
  consolidation happened: two hand-built versions of the same person had
  already drifted out of sync once.

  Content: constants/clinic.ts -> CLINICIANS and PREMISES, and
  constants/about.ts -> ABOUT.providers for the accessible heading. CLINICIANS is
  an array, so a third name is an edit to that file and nothing here.

  THE GROUND IS `ms-paper`, FLAT, second of the page's shell/paper/cream
  rotation -- see the note on that rotation in app/page.tsx. It was `ms-panel`,
  dark, with reversed type, then briefly `ms-shell`, the same tone as the
  card language (Booking's form, MenuBoard, Conditions' tiles); every colour in
  ClinicianProfile is written for a light ground generally, so the move from
  shell to paper needed no further changes there.

  `PatternField tone="light"` NOW, WHERE IT USED TO BE `tone="paper"`: the page
  ground is one continuous gradient again rather than isolated per-section
  flats (see the note in globals.css), and `light` is the translucent ink
  built for exactly that -- depth-ramped against where a section sits in the
  document, rather than fitted to one flat strength the way `paper` was. See
  the note on both tones in PatternField.tsx.

  NO LONGER THE SECOND DARK THING ON A PAGE THAT HAD ONE. /about's light
  sections were a single continuous ramp -- see the note in app/about/page.tsx
  -- and are now a rotation of flats instead; either way, nothing between the
  hero and the footer is darker than these three.
*/
export function Clinician() {
  return (
    <section
      id="clinician"
      className="relative scroll-mt-4 overflow-hidden py-20 lg:py-24"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        {/*
          The design prints no section head. The heading still has to exist:
          "Who you will see" is a row in the /about hero's on-this-page nav and
          it links here, and an h2-less section leaves a hole in the outline.
        */}
        <h2 className="sr-only">{ABOUT.providers.title}</h2>

        <div className="flex flex-col gap-20 lg:gap-28">
          {CLINICIANS.map((clinician, index) => (
            <ClinicianProfile
              key={clinician.name}
              clinician={clinician}
              mirrored={index % 2 === 1}
            />
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/*
  FOURTH OF THE PAGE'S SHELL/PAPER/CREAM ROTATION, `ms-shell` -- see the note
  on that rotation in app/page.tsx. It moved up one stop from `paper` when
  Assessment came off the page above it (see the note in app/about/page.tsx).

  FULL WIDTH, ON REQUEST, WITH NO PHOTO COLUMN. It used to run a two-column
  grid with three placeholder photo slots on the right -- "[Reception or
  treatment room]" and two more, none of them a real photograph. A labelled
  grey box asking to be replaced is a fair placeholder while a shoot is
  pending, but three of them beside real, confirmed facts made the section
  read as less finished than it is. PREMISES.photoSlots is untouched in
  constants/clinic.ts, so the column comes back by wrapping this content in a
  grid again and reading from it, the way it did before.

  THE INTRO NO LONGER APPENDS `PREMISES.opening`. That was "Doors open
  [December 2026]." -- a placeholder date, on request removed rather than
  shown unconfirmed. The field itself is untouched in constants/clinic.ts
  and still drives the skincare page's own opening line, so filling in
  `todo.openingDate` there updates this sentence too, whenever it comes back.
*/
export function Premises() {
  return (
    <section
      id="premises"
      className="relative scroll-mt-4 overflow-hidden py-24 lg:py-36"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <div className="max-w-[760px]">
          <SectionHead title={PREMISES.title} />

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[62ch] font-sans text-[18.5px] font-light leading-[1.75] text-ms-espresso/80">
              {PREMISES.intro}
            </p>
          </Reveal>
        </div>

        <Stagger
          as="dl"
          step={0.12}
          delay={0.3}
          className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PREMISES.facts.map((fact) => (
            <StaggerItem
              key={fact.label}
              y={20}
              className="border-t border-ms-bronze/25 pt-5"
            >
              <dt className="eyebrow font-normal text-ms-terracotta-deep">{fact.label}</dt>
              <dd className="mt-2.5 font-sans text-[16.5px] font-light leading-[1.65] text-ms-espresso">
                {fact.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
