import { brand, todo } from "@/lib/brand";
import { Wordmark } from "./brand/Marks";
import { Wrap } from "./ui";

const COLUMNS = [
  {
    heading: "Medical",
    links: [
      { label: "Pigmentation & melasma", href: "#treatments" },
      { label: "Acne & acne scarring", href: "#treatments" },
      { label: "Keloids & scarring", href: "#treatments" },
      { label: "Hair & scalp", href: "#treatments" },
    ],
  },
  {
    heading: "Cosmetic",
    links: [
      { label: "Injectables", href: "#treatments" },
      { label: "Chemical peels", href: "#treatments" },
      { label: "Laser & energy", href: "#treatments" },
      { label: "Skin boosters", href: "#treatments" },
    ],
  },
  {
    heading: "Clinic",
    links: [
      { label: "Your visit", href: "#visit" },
      { label: "The clinic", href: "#clinic" },
      { label: "Reviews", href: "#reviews" },
      { label: "Book", href: "#book" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy notice", href: "#" },
      { label: "Patient terms", href: "#" },
      { label: "Complaints", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ms-espresso py-16 lg:py-20">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Wordmark size="md" tone="text-ms-cream" />
            <p className="max-w-[280px] font-sans text-[15px] font-light leading-[1.7] text-ms-sand/75">
              {brand.address.line1}, {brand.address.line2}, {brand.address.city}.
            </p>
            <div className="flex flex-col gap-1.5 font-sans text-[15px] font-light text-ms-sand/75">
              <a
                href={brand.phoneHref}
                className="transition-colors hover:text-ms-cream"
              >
                {brand.phone}
              </a>
              <a
                href={`mailto:${brand.email}`}
                className="transition-colors hover:text-ms-cream"
              >
                {brand.email}
              </a>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="flex flex-col gap-3.5 lg:col-span-2"
            >
              <h2 className="eyebrow font-normal text-ms-gold">
                {column.heading}
              </h2>
              {column.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-[15px] font-light text-ms-sand/75 transition-colors hover:text-ms-cream"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ms-sand/15 pt-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-sans text-[13px] font-light text-ms-sand/75">
            &copy; {new Date().getFullYear()} {brand.entity}. {todo.pin}.
            Regulated by {todo.regulator}.
          </p>
          <p className="font-sans text-[13px] font-light text-ms-sand/75">
            Nothing on this site is a substitute for individual medical advice.
          </p>
        </div>
      </Wrap>
    </footer>
  );
}
