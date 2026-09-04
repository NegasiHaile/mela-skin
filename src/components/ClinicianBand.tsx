import { ABOUT, CLINICIANS } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { ClinicianProfile } from "./ClinicianProfile";
import { Wrap } from "./ui";

/*
  THE CLINICIAN, AS ONE COMPONENT, rendered by the home page and by /contact --
  and, since the consolidation below, the identical component /about renders
  for its own full listing.

  It was the whole of AboutTeaser and lived only on the home page, so /contact
  asked you to write to a clinic without ever showing you who reads it. Two
  hand-built copies of one band is how they drift apart, so there is one.

  IT USED TO WEAR A DIFFERENT CARD FROM /ABOUT'S: the /contact hero's panel,
  components/DetailCard.tsx, lifted out so this band and that hero shared one
  component. That was itself a second, shorter version of the same person
  Clinic.tsx was already rendering in full on /about -- name, role, bio,
  credentials, just built twice. The two drifted: a row added to one array for
  the /about design did not belong in the short card, and it leaked in anyway
  because both cards read the same `credentials` array. Requested fix: this
  band now renders components/ClinicianProfile.tsx, the exact block /about
  uses, with a trailing link back to it rather than a shortened stand-in.
  DetailCard stays -- it is still /contact's own "reach us directly" panel --
  it is just no longer asked to also be a clinician card.

  THE GROUND USED TO FLOOD `ms-paper`, one look for one person wherever she
  appears, second of the page's shell/paper/cream rotation. The rotation is
  gone (see the note in globals.css -- the page ground is one continuous
  gradient again), and `PatternField tone="light"` replaced `tone="paper"`
  here for the same reason it did on /about's copy of this section: `light` is
  depth-ramped against the document, which is what a shared continuous ground
  needs instead of a flat per-section strength. See the longer notes on this
  in components/Clinic.tsx and components/ClinicianProfile.tsx.

  Content: constants/clinic.ts -> CLINICIANS[0], constants/about.ts ->
  ABOUT.teaser for the CTA label.
*/
export function ClinicianBand({
  id,
  className,
}: {
  /** Anchor for in-page links. The home band is `clinic`. */
  id?: string;
  className?: string;
}) {
  const clinician = CLINICIANS[0];

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 lg:py-32 ${className ?? ""}`}
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <ClinicianProfile
          clinician={clinician}
          cta={{ label: ABOUT.teaser.cta, href: "/about#clinician" }}
        />
      </Wrap>
    </section>
  );
}
