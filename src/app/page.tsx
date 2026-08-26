import { Booking } from "@/components/Booking";
import { Clinician, Premises } from "@/components/Clinic";
import { Focus } from "@/components/Focus";
import { GoldDefs } from "@/components/brand/Marks";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { Prices } from "@/components/Prices";
import { Reviews } from "@/components/Reviews";
import { ScrollProgress } from "@/motion";
import { SiteFooter } from "@/components/SiteFooter";
import { Treatments } from "@/components/Treatments";
import { Visit } from "@/components/Visit";

/**
 * Direction B — immersive, full-bleed. Direction A lives at /editorial.
 *
 * The order is an argument, in five beats: here is the problem (Focus), here
 * is how the clinic is arranged around it (Pillars), here is everything it
 * treats (Treatments), here is what it costs (Prices), here is what happens
 * when you come in (Visit). Everything after that is proof — who runs it,
 * where it is, what patients said — and then the booking form.
 */
export default function Home() {
  return (
    <>
      <GoldDefs />
      <ScrollProgress />
      <main>
        <Hero />
        <Focus />
        <Pillars />
        <Treatments />
        <Prices />
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
