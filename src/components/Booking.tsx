"use client";

import { FormEvent, useState } from "react";
import { brand, todo } from "@/lib/brand";
import { BrandPattern } from "./brand/BrandPattern";
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

      <p className="eyebrow text-ms-gold">Write to us</p>
      <p className="mt-2 font-sans text-[14px] font-light text-ms-sand">
        We reply within one working day.
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
          placeholder="Tell us briefly what brings you in"
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
          {sent ? "Opening mail…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

/** Bookends the hero: the same flooded field, closing the page. */
export function Booking() {
  return (
    <section id="book" className="relative overflow-hidden bg-ms-field">
      <BrandPattern
        id="book"
        from="#5e2c09"
        to="#966029"
        sparkle="#7d3f11"
        scale={280}
        className="absolute inset-0 h-full w-full opacity-70"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 70% at 50% 45%, rgba(116,55,12,0.35) 0%, rgba(116,55,12,0.9) 60%, #74370c 92%)",
        }}
      />

      <Wrap className="relative py-20 lg:py-28">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="eyebrow text-ms-gold">Contact</p>
            <h2 className="display-caps mt-5 max-w-[14ch] text-[clamp(2.1rem,4vw,3.2rem)] text-ms-ivory">
              Book a consultation
            </h2>
            <p className="mt-5 max-w-[34ch] font-sans text-[15px] font-light leading-[1.7] text-ms-cream/80">
              {todo.consultLength} min with {todo.clinicianName}. Online booking
              opens {todo.bookingOpens}.
            </p>

            <dl className="mt-10 space-y-5 border-t border-ms-sand/25 pt-6">
              <div>
                <dt className="eyebrow font-normal text-ms-gold">Clinic</dt>
                <dd className="mt-2 font-sans text-[14.5px] font-light leading-[1.65] text-ms-cream">
                  {brand.address.line1}
                  <br />
                  {brand.address.line2}, {brand.address.city}
                </dd>
              </div>
              <div>
                <dt className="eyebrow font-normal text-ms-gold">Reach us</dt>
                <dd className="mt-2 space-y-1 font-sans text-[14.5px] font-light text-ms-cream">
                  <a
                    href={brand.phoneHref}
                    className="block transition-colors hover:text-ms-gold"
                  >
                    {brand.phone}
                  </a>
                  <a
                    href={`mailto:${brand.email}`}
                    className="block transition-colors hover:text-ms-gold"
                  >
                    {brand.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow font-normal text-ms-gold">Hours</dt>
                <dd className="mt-2 font-sans text-[14.5px] font-light leading-[1.65] text-ms-cream">
                  {todo.hoursWeekday}
                  <br />
                  {todo.hoursSaturday}
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </Wrap>
    </section>
  );
}
