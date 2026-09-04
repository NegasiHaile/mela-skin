import { PatternField } from "./brand/PatternField";
import { Lede, SectionHead, Wrap } from "./ui";
import { Stagger, StaggerItem } from "@/motion";

/*
  Questions and answers, both visible.

  Deliberately not an accordion. The things people most want to know about a
  clinic — what it costs, whether they need an appointment first, what is safe
  on their skin — are the last things that should sit behind a click. The
  two-column grid at lg keeps the run short enough to scan without collapsing
  anything.

  Second of /treatment-menu's shell/paper/cream rotation, `ms-paper` -- see the
  note on that rotation in app/page.tsx.
*/

export type FaqItem = { q: string; a: string };

export function Faq({
  title,
  lede,
  items,
}: {
  title: string;
  lede?: string;
  items: FaqItem[];
}) {
  return (
    <section
      id="faq"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <div className="max-w-[680px]">
          <SectionHead title={title} />
          {lede ? <Lede className="mt-7">{lede}</Lede> : null}
        </div>

        <Stagger
          as="dl"
          step={0.1}
          className="mt-14 grid gap-x-16 gap-y-11 lg:mt-16 lg:grid-cols-2"
        >
          {items.map((item) => (
            <StaggerItem key={item.q} y={24} className="border-t border-ms-bronze/25 pt-7">
              <dt className="font-display text-[1.5rem] leading-[1.25] tracking-[-0.01em] text-ms-cocoa sm:text-[1.65rem]">
                {item.q}
              </dt>
              <dd className="mt-4 font-sans text-[17.5px] font-light leading-[1.7] text-ms-espresso/85">
                {item.a}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
