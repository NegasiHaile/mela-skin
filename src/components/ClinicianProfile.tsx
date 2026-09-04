import Image from "next/image";
import type { Clinician } from "@/constants";
import { Sparkle } from "./brand/Marks";
import { Drift, Reveal, Stagger, StaggerItem, Wipe } from "@/motion";
import { PhotoSlot } from "./ui";

/*
  THE PROVIDER PROFILE, as one component, rendered by /about's full listing and
  by the ClinicianBand teaser on the home page. /contact ran the same band
  until it came off that page on request -- see the note in
  app/contact/page.tsx.

  It used to be two hand-built versions of the same person: this exact
  portrait-plus-credentials block on /about, and a shorter card built out of
  DetailCard (components/DetailCard.tsx) wherever the site introduced her
  outside that page. They drifted -- a row added to one did not reach the
  other, which is how a placeholder ended up leaking into the wrong card and
  how the two ended up looking like different designs for the same clinic.
  Requested fix: one component, used everywhere she appears, so there is
  nothing left to keep in sync by hand.

  `cta` is the one thing that differs by context: /about is where the full
  profile lives, so it renders none; the teaser instances pass one, a link
  back to this exact block on /about.

  COLOURS ARE FOR A LIGHT GROUND -- cocoa heading, terracotta-deep accents,
  espresso body copy -- because the section wrapping this (Clinic.tsx,
  ClinicianBand.tsx) floods `ms-paper`, one of the near-white flats the site's
  light sections rotate through (see app/page.tsx). It was a dark `ms-panel`
  flood with reversed type briefly; on request, lighter, to match the site's
  card language. This palette holds across shell, paper and cream alike --
  they are close enough in value that nothing here needs to change if the
  wrapper's exact tone does. If it ever floods dark again, every colour in
  this file has to flip with it -- there is no light/dark switch here, just
  one palette for whatever the wrapper currently floods.
*/
export function ClinicianProfile({
  clinician,
  mirrored = false,
  cta,
}: {
  clinician: Clinician;
  /** Portrait on the right, text on the left -- alternates across an array of providers. */
  mirrored?: boolean;
  /** Trailing link row. Omit on /about itself, where the profile is already the destination. */
  cta?: { label: string; href: string };
}) {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-12 lg:items-stretch lg:gap-20">
      {/*
        The portrait uncovers from its bottom edge, then the picture
        counter-scrolls *inside* its frame for the rest of the section -- the
        frame itself never moves, so nothing detaches from the grid. That is
        what the 9% vertical overhang is for: it gives the image somewhere to
        travel without exposing an edge.

        HEIGHT MATCHES THE TEXT COLUMN AT LG, rather than a fixed pixel
        figure. `lg:items-stretch` on the row plus `lg:h-full` here lets the
        grid's own row height -- set by whichever column is taller, usually
        the credential list -- reach the image, so the two columns end level
        instead of the photograph stopping short (or overrunning) whatever
        text happens to sit beside it. The 440px figure stays as the mobile
        height, where the columns stack and there is no row to stretch to.
      */}
      <Wipe
        className={
          mirrored ? "lg:col-span-5 lg:col-start-8 lg:order-2" : "lg:col-span-5"
        }
      >
        <div className="relative h-[440px] w-full overflow-hidden ring-1 ring-ms-bronze/35 lg:h-full">
          {/*
            `src` is null until the clinic has been photographed, and then
            this is a labelled slot rather than a generated face. Dr. Abseret
            Hailu, 00:17:24: "I'm not a huge fan on the AI pics of the people,
            because I do want it to be real."
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
            <PhotoSlot label={clinician.portrait.label} className="h-full w-full" />
          )}
        </div>

        {/*
          A stand-in has to be labelled on the page, not only in the source.
          Null for the one provider currently listed, so nothing is missing:
          her photograph is real.
        */}
        {clinician.portrait.caption ? (
          <p className="mt-3.5 font-sans text-[13px] font-light tracking-[0.02em] text-ms-espresso/65">
            {clinician.portrait.caption}
          </p>
        ) : null}
      </Wipe>

      <div
        className={
          mirrored ? "lg:col-span-7 lg:col-start-1 lg:order-1" : "lg:col-span-7 lg:col-start-6"
        }
      >
        <Reveal y={18}>
          <h3 className="display-caps text-[clamp(1.9rem,3.4vw,2.85rem)] text-ms-cocoa">
            {clinician.name}
          </h3>
        </Reveal>

        {/*
          Role only, on request -- the registration number came off this line
          completely rather than staying as a rendered placeholder. The role is
          stored in sentence case -- "Dermatologist" -- and the caps are the
          styling, so nothing has to be shouted in the data.
        */}
        <Reveal delay={0.15}>
          <p className="mt-5 font-sans text-[12px] font-medium uppercase leading-[1.6] tracking-[0.22em] text-ms-terracotta-deep">
            {clinician.role}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 max-w-[46ch] font-sans text-[18.5px] font-light leading-[1.75] text-ms-espresso/80 lg:text-[20px]">
            {clinician.bio}
          </p>
        </Reveal>

        <Stagger as="ul" step={0.1} delay={0.35} className="mt-12 flex flex-col">
          {clinician.credentials.map((line) => (
            <StaggerItem
              as="li"
              key={line}
              y={18}
              className="flex items-start gap-4 border-b border-ms-bronze/30 py-5 last:border-b-0"
            >
              <Sparkle width={10} height={20} fill="url(#ms-gold)" className="mt-0.5 shrink-0" />
              <span className="font-sans text-[16px] font-light leading-[1.6] text-ms-espresso/85">
                {line}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        {cta ? (
          <Reveal delay={0.42}>
            <a
              href={cta.href}
              className="group mt-10 inline-flex items-center gap-3 font-display text-[1.15rem] text-ms-cocoa transition-colors hover:text-ms-terracotta-deep"
            >
              {cta.label}
              <span
                aria-hidden="true"
                className="text-ms-terracotta-deep transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
