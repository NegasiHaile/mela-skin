import { brand } from "@/constants";
import { HeroBackground } from "./HeroBackground";
import { SiteHeader } from "../SiteHeader";
import { MountItem, MountStagger } from "@/motion";
import { PillGhost, PillSolid, Wrap } from "../ui";

/*
  HERO VARIANT: THE PHOTOGRAPH.

  Four elements. The tagline, one sentence, two buttons, over one full-bleed
  image. That is the whole thing, and the count is the point.

  HOW IT GOT HERE. Four reference sites were reviewed on 26 Aug 2026 and the
  group picked parts of two rather than one of them:

    Dr. Abseret Hailu, 00:48:09 — "I also like the Elevate one where they had
    the clinic name … This one I like the most. It was a little bit cleaner."

    Mo / operations, 00:47:02 — "Mine was the Canadian, the second one. I liked
    the clinic background … But my concern with the draft is that it's too busy.
    Even when I look at it, I'm not sure what exactly to look at. So I think it
    would be best if we can do it in a clean format that feels like elegance and
    excellence."

    Dr. Margaret Gachanja, 00:49:44 — "I kind of feel a blend between this
    Canadian and the Elevate, because of the dynamic aspect."

    Dr. Abseret Hailu, 00:56:08 — "I want our brand to be more clean. I don't
    want it to be so busy. So if it's going to be image on top of words, on top
    of like other photos, I just worry that it's going to be too cluttered."

    Negasi, 00:57:11 — "even if we are having the background image we can
    minimize the contents that we display on the first screen."

  That last line is the design: one background image, and the least on top of it
  that still says what the clinic is and gives you somewhere to go.

  WHAT CAME OFF, and where each thing went rather than simply vanishing:

    - The large gold brandmark. It is in the header lockup a few centimetres
      above, so on screen it was the mark twice.
    - The tracked "DERMATOLOGY & COSMETIC CLINIC · WESTLANDS, NAIROBI" eyebrow.
      Also in the header lockup, and again in the footer.
    - The framed image stack, with its caption and its dots. It became the
      background itself, which is what makes the screen one thing to look at
      instead of two — see HeroBackground.tsx.
    - The street address. It is on /contact, in the footer, and in the JSON-LD.
    - A generated portrait of a woman, captioned in the code as "the Mela Skin
      patient aesthetic". Abseret, 00:17:24: "I'm not a huge fan on the AI pics
      of the people, because I do want it to be real."

  WHAT THE OTHER VARIANT IS ARGUING is in HeroLockup.tsx, which is the hero as
  it stood before this one replaced it. Both are on the page for the team to
  choose between; the toggle is bottom right.

  MOTION. Nothing waits on a scroll trigger — the section is above the fold — so
  the entrance runs on mount and staggers the three blocks in sequence.
*/
export function HeroPhoto() {
  return (
    <section
      id="top"
      data-no-lazy
      className="relative min-h-svh overflow-hidden bg-ms-field"
    >
      <HeroBackground />

      {/*
        `z-40`, not the usual `z-10` -- this div carries the fixed SiteHeader,
        and a later section's own `relative z-10` wrapper would otherwise tie
        with this one and win the stacking comparison by DOM order, painting
        over the header once scrolled far enough. Full explanation on the
        identical div in components/PageHero.tsx.
      */}
      <div className="relative z-40 flex min-h-svh flex-col">
        <SiteHeader tone="dark" />

        <Wrap className="flex flex-1 items-center py-16 sm:py-20 lg:py-24">
          <MountStagger step={0.13} delay={0.25} className="w-full">
            <MountItem y={28}>
              <h1 className="max-w-[15ch] font-display text-[clamp(3.1rem,10vw,7rem)] font-normal italic leading-[0.95] tracking-[-0.02em] text-ms-ivory">
                {/*
                  The visible heading is the tagline. The clinic and what it does
                  go in front of it for anything reading the heading rather than
                  looking at it — the wordmark above is vector artwork, so the
                  name is not in the heading otherwise, and the place a search
                  engine looks for what this business is is its h1.

                  It stays even though the sentence below now opens on the
                  descriptor: that is a paragraph, and this is the heading.
                */}
                <span className="sr-only">
                  Mela Skin, dermatology and cosmetic clinic in Muthaiga,
                  Nairobi.{" "}
                </span>
                {brand.tagline}
              </h1>
            </MountItem>

            <MountItem>
              <p className="mt-9 max-w-[46ch] font-sans text-[clamp(1.1rem,2vw,1.4rem)] font-light leading-[1.6] text-ms-cream/90 sm:mt-10">
                {brand.hero.line}
              </p>
            </MountItem>

            <MountItem className="mt-12 sm:mt-14">
              <div className="flex flex-wrap items-center gap-3.5">
                <PillSolid
                  href="/contact"
                  tone="dark"
                  className="min-h-13 px-9 text-[13.5px] sm:min-h-14 sm:px-10 sm:text-[14px]"
                >
                  Book an appointment
                </PillSolid>
                <PillGhost
                  href="/treatment-menu"
                  tone="dark"
                  className="min-h-13 px-9 text-[13.5px] sm:min-h-14 sm:px-10 sm:text-[14px]"
                >
                  Treatment menu
                </PillGhost>
              </div>
            </MountItem>
          </MountStagger>
        </Wrap>
      </div>
    </section>
  );
}
