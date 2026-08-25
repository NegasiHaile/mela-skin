import { Booking } from "@/components/Booking";
import { Clinician, Premises } from "@/components/Clinic";
import { Focus } from "@/components/Focus";
import { GoldDefs } from "@/components/brand/Marks";
import { Hero } from "@/components/Hero";
import { Reviews } from "@/components/Reviews";
import { ScrollProgress } from "@/motion";
import { SiteFooter } from "@/components/SiteFooter";
import { Treatments } from "@/components/Treatments";
import { Visit } from "@/components/Visit";

/** Direction B — immersive, full-bleed. Direction A lives at /editorial. */
export default function Home() {
  return (
    <>
      <GoldDefs />
      <ScrollProgress />
      <main>
        <Hero />
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
