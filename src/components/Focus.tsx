import { todo } from "@/lib/brand";
import { Wrap } from "./ui";

export function Focus() {
  return (
    <section className="bg-ms-shell py-24 lg:py-36">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <span className="eyebrow text-ms-terracotta-deep">01</span>
              <span className="h-px w-8 bg-ms-bronze/35" aria-hidden="true" />
              <span className="eyebrow font-normal text-ms-bronze">
                Why Mela Skin
              </span>
            </div>
            <h2 className="display-caps mt-8 text-[clamp(2.15rem,4vw,3.5rem)] text-ms-cocoa">
              Deeper skin isn&rsquo;t harder to treat
            </h2>
            <p className="mt-6 font-display text-[23px] italic leading-snug text-ms-terracotta-deep">
              It has simply been studied less.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:pt-3">
            <p className="font-sans text-[17px] font-light leading-[1.85] text-ms-espresso/80">
              Dermatology teaching images are overwhelmingly of white skin. On
              deeper complexions, inflammation reads violet or grey rather than
              red. It leaves pigment behind for months after the condition
              itself has cleared. Wounds that would flatten elsewhere raise into
              keloid. None of this is unusual &mdash; it is only under-taught,
              which is why so many patients arrive having already been told
              their condition was something else.
            </p>
            <p className="font-sans text-[17px] font-light leading-[1.85] text-ms-espresso/80">
              Mela Skin was built to close that gap. {todo.clinicianName}&rsquo;s
              practice is organised around the conditions that present most
              often, and most stubbornly, in melanin-rich skin &mdash; with the
              medical and cosmetic sides of that care under one roof, so a
              diagnosis and the treatment it calls for do not need two clinics.
            </p>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
