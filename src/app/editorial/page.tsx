import { Booking } from "@/components-editorial/Booking";
import { Clinician, Premises } from "@/components-editorial/Clinic";
import { FeatureRow } from "@/components-editorial/FeatureRow";
import { Focus } from "@/components-editorial/Focus";
import { GoldDefs } from "@/components-editorial/brand/Marks";
import { Hero } from "@/components-editorial/Hero";
import { SiteFooter } from "@/components-editorial/SiteFooter";
import { Treatments } from "@/components-editorial/Treatments";
import { Visit } from "@/components-editorial/Visit";

/*
  Not a public page. It is the second design direction, kept only so the two
  can be compared side by side — so it stays out of the sitemap and out of the
  index, where it would otherwise compete with the home page for the same
  words.
*/
export const metadata = {
  title: "Editorial direction",
  robots: { index: false, follow: false },
};

/** Direction A — the floating-card layout. Kept for comparison against `/`. */
export default function EditorialDirection() {
  return (
    <>
      <GoldDefs />
      <main className="bg-ms-paper pt-3 sm:pt-5">
        <Hero />
        <FeatureRow />
        <Focus />
        <Treatments />
        <Visit />
        <Clinician />
        <Premises />
        <Booking />
      </main>
      <SiteFooter />
    </>
  );
}
