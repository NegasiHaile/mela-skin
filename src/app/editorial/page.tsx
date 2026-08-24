import { Booking } from "@/components-editorial/Booking";
import { Clinician, Premises } from "@/components-editorial/Clinic";
import { FeatureRow } from "@/components-editorial/FeatureRow";
import { Focus } from "@/components-editorial/Focus";
import { GoldDefs } from "@/components-editorial/brand/Marks";
import { Hero } from "@/components-editorial/Hero";
import { Reviews } from "@/components-editorial/Reviews";
import { SiteFooter } from "@/components-editorial/SiteFooter";
import { Treatments } from "@/components-editorial/Treatments";
import { Visit } from "@/components-editorial/Visit";

export const metadata = { title: "Editorial direction" };

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
        <Reviews />
        <Booking />
      </main>
      <SiteFooter />
    </>
  );
}
