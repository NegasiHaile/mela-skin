import { CONTACT_DETAILS, PRIMARY_CLINICIAN, brand, todo } from "@/constants";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { ButtonPrimary, Card, Inner, Shell } from "./ui";

export function Booking() {
  return (
    <Shell>
      <Card id="book" className="mt-4 bg-ms-panel">
        <PatternField tone="panel" />

        <Inner className="relative">
          <div className="flex flex-col items-center text-center">
            <Reveal y={14}>
              <p className="eyebrow text-ms-terracotta-deep">Book</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-7 max-w-[18ch] font-display text-[clamp(2.1rem,4vw,3.2rem)] font-normal leading-[1.08] tracking-[-0.016em] text-ms-ivory">
                Start with one{" "}
                <em className="italic text-ms-terracotta">consultation</em>.
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
            <p className="mt-6 max-w-[54ch] font-sans text-[16px] font-light leading-[1.85] text-ms-cream/80">
              {todo.consultLength} minutes with {PRIMARY_CLINICIAN.name}: an
              examination, a diagnosis in plain language, and a written plan you
              leave with. {todo.consultFee}, redeemable against treatment
              [confirm your policy].
            </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {/*
                  ONE BUTTON, since 2 Sep. It was "Call +254 ..." over a ghost
                  "Email the clinic"; the number is not a real line, so the
                  email is promoted into the primary and the ghost has nothing
                  left to be.
                */}
                <ButtonPrimary href={`mailto:${brand.email}`} tone="dark">
                  Email the clinic
                </ButtonPrimary>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <p className="mt-7 font-sans text-[12px] font-light tracking-[0.05em] text-ms-sand/65">
                Online booking opens {todo.openingDate}.
              </p>
            </Reveal>

            <Stagger as="dl" step={0.11} className="mt-16 grid w-full gap-4 md:grid-cols-3">
              {CONTACT_DETAILS.map((detail) => (
                <StaggerItem
                  key={detail.label}
                  y={22}
                  className="flex flex-col gap-2.5 rounded-[18px] border border-ms-sand/20 bg-ms-espresso/45 px-7 py-7 text-left backdrop-blur-[2px]"
                >
                  <dt className="eyebrow font-normal text-ms-terracotta-deep">
                    {detail.label}
                  </dt>
                  <dd className="font-sans text-[14.5px] font-light leading-[1.7] text-ms-cream">
                    {detail.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Inner>
      </Card>
    </Shell>
  );
}
