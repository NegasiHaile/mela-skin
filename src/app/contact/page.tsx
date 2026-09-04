import type { Metadata } from "next";
import { CONTACT, META, brand } from "@/constants";
import { Booking } from "@/components/Booking";
import { ClinicMap } from "@/components/ClinicMap";
import { DetailCard } from "@/components/DetailCard";
import { GoldDefs } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact & directions",
  description: META.contactDescription,
  alternates: { canonical: "/contact" },
  keywords: META.contactKeywords,
};

/*
  The one place on the site with a form on it.

  It used to close all five routes, which left this page nothing to be. Now the
  form lives here, every other route ends with a BookingCta band pointing at
  it, and the page carries the two things a contact page is actually for: how
  to reach a person, and how to find the building.

  COLOUR: the same flat rotation every page runs -- see the note in
  app/page.tsx. Booking=shell, ClinicMap=cream, in that order down the page.
  It was Booking, ClinicianBand, ClinicMap -- shell, paper, cream -- until the
  clinician band came off this page on request (see the note where it used to
  sit, and ClinicMap.tsx's own note on the seam this left it with).
*/
export default function Contact() {
  return (
    <>
      <GoldDefs />
      <main>
        <PageHero
          id="hero-contact"
          eyebrow={CONTACT.eyebrow}
          title={CONTACT.title}
          lede={CONTACT.lede}
          aside={
            /*
              THE CARD IS components/DetailCard.tsx NOW, lifted out of here
              unchanged so the clinician band can use the same one. Every class
              it had is in that file.

              TWO ROWS, AND THEY ARE TWO DIFFERENT ACTIONS. The card held the
              phone number over the email; the phone came off the site on 2 Sep,
              and rather than leave one row in a card, the address takes the
              second slot -- as a link into Maps, which is the other thing
              somebody wants off a contact page.

              The address is also printed beside the map further down this page.
              That is not the same thing twice: down there it is reference text
              next to an embed, and up here, above the fold, it is a button that
              opens directions.
            */
            <DetailCard
              title="Reach us directly"
              rows={[
                {
                  text: brand.email,
                  href: `mailto:${brand.email}`,
                  lead: true,
                },
                {
                  text: brand.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  )),
                  href: CONTACT.map.directionsUrl,
                  external: true,
                },
              ]}
            />
          }
        />

        <Booking />

        {/*
          THE CLINICIAN BAND USED TO SIT HERE, between the form and the map --
          components/ClinicianBand.tsx, the same one the home page runs. Taken
          off this page on request. It still renders on the home page (via
          AboutTeaser.tsx) and in full on /about; only /contact drops it, so a
          visitor writing to the clinic is not shown a provider profile they
          did not ask this page for.
        */}
        <ClinicMap />
      </main>
      <SiteFooter />
    </>
  );
}
