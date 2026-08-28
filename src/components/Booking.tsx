"use client";

import { FormEvent, useState } from "react";
import { CONTACT, CONTACT_DETAILS, brand } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Wrap } from "./ui";

const FIELD =
  "w-full border-0 border-b border-ms-sand/35 bg-transparent px-0 py-3 font-sans text-[15px] font-light text-ms-ivory outline-none placeholder:text-ms-sand/50 transition-colors focus:border-ms-gold";

function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Enquiry — ${name || "Mela Skin"}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, "", message].join(
        "\n",
      ),
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-[4px] border border-ms-ivory/18 bg-ms-espresso/50 p-6 backdrop-blur-md sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ms-gold/50 to-transparent"
      />

      <p className="eyebrow text-ms-gold">{CONTACT.form.eyebrow}</p>
      <p className="mt-2 font-sans text-[14px] font-light text-ms-sand">
        {CONTACT.form.note}
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-ms-sand/80">
            Name
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={FIELD}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-ms-sand/80">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+254 …"
            className={FIELD}
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-1.5 block font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-ms-sand/80">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={FIELD}
        />
      </label>

      <label className="mt-5 block">
        <span className="mb-1.5 block font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-ms-sand/80">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={CONTACT.form.messagePrompt}
          className={`${FIELD} resize-none`}
        />
      </label>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans text-[12px] font-light text-ms-sand/70">
          Or call{" "}
          <a
            href={brand.phoneHref}
            className="text-ms-gold transition-colors hover:text-ms-ivory"
          >
            {brand.phone}
          </a>
        </p>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-ms-ivory px-8 font-sans text-[12.5px] font-medium uppercase tracking-[0.14em] text-ms-field transition-colors hover:bg-ms-sand"
        >
          {sent ? CONTACT.form.submittingLabel : CONTACT.form.submitLabel}
        </button>
      </div>
    </form>
  );
}

/*
  The form, and only on /contact.

  It used to close every route, which is what made a contact page look like it
  had nothing of its own to say. The heading moved up into that page's
  PageHero, so what is left here is the two things a contact section actually
  is: where to find the clinic, and a box to write in.
*/
export function Booking() {
  return (
    <section id="book" className="relative overflow-hidden bg-ms-field">
      <PatternField tone="field" />
      {/*
        Vignette over the pattern rather than under it: the motif stays legible
        at the edges of the band and falls away behind the form, which is the
        only place on the page carrying 15px type on the field colour.
      */}
      {/*
        A RADIAL VIGNETTE USED TO SIT HERE and it has been removed. It was the
        field colour at rising opacity, which modelled the band when the field
        was #74370c. The flooded colour is #2C190B now — the same colour the
        vignette was painting — so all it still did was cover the pattern, which
        left this band as a flat hole in a lattice that is meant to run unbroken
        down the page. See brand/PatternField.tsx.
      */}
      <Wrap className="relative py-20 lg:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Stagger
              as="dl"
              step={0.1}
              delay={0.1}
              className="space-y-5"
            >
              {CONTACT_DETAILS.map((detail) => (
                <StaggerItem key={detail.label} y={18}>
                  <dt className="eyebrow font-normal text-ms-gold">
                    {detail.label}
                  </dt>
                  <dd className="mt-2 space-y-1 font-sans text-[14.5px] font-light leading-[1.65] text-ms-cream">
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

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
