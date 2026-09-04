import { ClinicianBand } from "./ClinicianBand";

/*
  The clinician on the home page, in full.

  THE BAND ITSELF IS `ClinicianBand`, shared with /contact. All this file
  supplies is the `clinic` anchor: the two pages are otherwise identical, which
  is the point of having one component.

  A LIGHT BAND, `ms-shell`, like every other section on this page except the
  footer -- see the note in app/page.tsx. ClinicianBand floods that same
  colour on every page it appears on (/about, /contact, here), which is what
  keeps her card looking identical everywhere without this page picking up a
  second dark band. It briefly did flood dark, matching a rust design that
  needed reversed type; that would have reopened exactly what the 31 Aug review
  objected to twice on this page ("to durastic from one to another", then "we
  do not have to use much darker version other than the footer in the home
  page"), so the card moved to a light ground instead of the page moving to fit
  it.

  Content: constants/about.ts -> ABOUT.teaser, constants/clinic.ts -> CLINICIANS.
*/
export function AboutTeaser() {
  return <ClinicianBand id="clinic" />;
}
