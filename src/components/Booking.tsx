"use client";

import { FormEvent, useState } from "react";
import { CONTACT, CONTACT_DETAILS, brand } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Wrap } from "./ui";

const FIELD =
  "w-full border-0 border-b border-ms-bronze/45 bg-transparent px-0 py-3 font-sans text-[15px] font-light text-ms-espresso outline-none placeholder:text-ms-espresso/45 transition-colors focus:border-ms-terracotta";

function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Enquiry — ${name || "MELA SKIN"}`);
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
      className="relative overflow-hidden rounded-[4px] border border-ms-bronze/30 bg-ms-shell p-6 shadow-[0_18px_40px_-28px_rgba(44,25,11,0.35)] sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ms-gold/70 to-transparent"
      />

      <p className="font-display text-[1.4rem] leading-[1.2] text-ms-cocoa">
        {CONTACT.form.eyebrow}
      </p>
      <p className="mt-2.5 font-sans text-[14.5px] font-light text-ms-espresso/75">
        {CONTACT.form.note}
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-ms-terracotta-deep">
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
          <span className="mb-1.5 block font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-ms-terracotta-deep">
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
        <span className="mb-1.5 block font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-ms-terracotta-deep">
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
        <span className="mb-1.5 block font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-ms-terracotta-deep">
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
        {/*
          WHAT THE BUTTON ACTUALLY DOES, said out loud.

          This corner held "Or call +254 ...", which went with the phone number
          on 2 Sep. What replaced it is the more useful thing to have had there
          all along: the form has no server behind it and does not post
          anywhere, it opens the visitor's own mail client with the four fields
          filled in. That is a surprise worth spending a line on, because a
          send button that opens Outlook and sends nothing looks broken.
        */}
        <p className="max-w-[26ch] font-sans text-[12px] font-light text-ms-espresso/70">
          {CONTACT.form.mailNote}
        </p>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-ms-field px-8 font-sans text-[12.5px] font-medium uppercase tracking-[0.14em] text-ms-ivory transition-colors hover:bg-ms-panel"
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

  A LIGHT SECTION SINCE 31 AUG. It was `ms-field`, sitting immediately under a
  page hero that is also `ms-field`, so /contact opened on a wall of brown from
  the top of the page down past the form. Nothing is flooded now except the
  footer, and the form gained by it: the plate is a shell sheet on the section
  ground with a shadow under it rather than a darker well cut into it, and the
  inputs are espresso on white, which is what a form somebody has to read their
  own typing back from should have been all along.
*/
/*
  First of /contact's shell/paper/cream rotation, `ms-shell` -- see the note on
  that rotation in app/page.tsx. Same tone the contact form's own card already
  floods, so the section and the card were the same colour even before this had
  a name for it; the card still reads as a card because it sits opaque over the
  section's own PatternField, which shows only in the margin around it.
*/
export function Booking() {
  return (
    <section id="book" className="relative overflow-hidden">
      <PatternField tone="light" />

      <Wrap className="relative z-10 py-20 lg:py-28">
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
                  <dt className="eyebrow font-normal text-ms-terracotta-deep">
                    {detail.label}
                  </dt>
                  <dd className="mt-2 space-y-1 font-sans text-[14.5px] font-light leading-[1.65] text-ms-espresso/85">
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
