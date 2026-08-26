import { AboutTeaser } from "@/components/AboutTeaser";
import { BookingCta } from "@/components/BookingCta";
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
 * when you come in (Visit). Then the proof: who you will see, what patients
 * said, and the booking form.
 *
 * The full clinician biography and the premises moved to /about. AboutTeaser
 * is a short band that links across, so no section runs twice across the two
 * pages.
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
        <AboutTeaser />
        <Reviews />
        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
