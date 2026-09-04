import Image from "next/image";
import { Icon } from "./icons";
import { Sparkle } from "./brand/Marks";

/*
  The plate on a treatment card.

  ALL TEN FAMILIES SHOW THE MARK NOW. Five of them used to carry generated
  imagery; it came off on 2 Sep, because it was not the clinic's work and five
  illustrated cards beside five iconographic ones made the grid look half-finished
  rather than deliberate. What every card gets instead is the brand ground with
  the treatment mark set large and two sparkles off the monogram — a finish, not a
  gap, and nothing on the page pretends to be a picture of this clinic's rooms.

  THE PLATE IS LIGHT AS OF 3 SEP, and it was the darkest thing left on a light
  page. It was `from-ms-panel to-ms-field`, #602F0F into #2C190B: the two darkest
  browns in the palette, at 10.7:1 and 16.4:1 against the card holding them, on
  ten cosmetic cards, ten skincare items and the whole home grid. Three routes
  carrying a dozen near-black rectangles each, against a standing instruction
  that nothing but the footer floods dark ("we do not have to use much darker
  version other than the footer in the home page", 31 Aug).

  It is a terracotta wash now, /20 into /34 on the diagonal, which keeps the
  depth the gradient was for. That is the SECOND setting: it went out at /10 into
  /20 and came back as "not distingushable like with the background", which was
  fair. At /10 the plate was 1.14:1 against the card holding it, which is a
  10-unit difference and reads as a slightly grubby edge rather than a plate.
  /20 into /34 is 1.32:1 to 1.63:1 -- a plate you can see, still nowhere near
  the 10.7:1 and 16.4:1 it replaced.

  THE MARK HAD TO CHANGE COLOUR WITH IT. Gold on #2C190B is 7.0:1; gold on a
  terracotta wash is about 1.6:1, which is not a mark, it is a smudge. It is
  `terracotta-deep` now, 4.3:1 at the darkest corner of the plate and 5.3:1 at
  the lightest, both well past the 3:1 that a meaningful graphic needs. That
  headroom is why the plate could be darkened without touching the mark.

  The two sparkles took the same journey: they were the `ms-gold` gradient, and
  they are terracotta at 30-35% now, which reads as an accent on a light ground
  where gold could not.

  The `image` branch is kept, and `constants/cosmetic.ts` still has the field: the
  day there is a photograph of THIS clinic doing a treatment, it goes in per
  family with no change here.

  Shared between the home grid and the cosmetic page so the two cannot drift into
  having different card anatomy.
*/
export function TreatmentMedia({
  image,
  icon,
  title,
  sizes,
  className,
}: {
  image?: string;
  icon: string;
  title: string;
  /** Passed straight to next/image. */
  sizes: string;
  /** Height and border, which differ between the rail and the grid. */
  className?: string;
}) {
  const frame = `relative w-full overflow-hidden ${className ?? ""}`;

  if (image) {
    return (
      <div className={`${frame} bg-ms-terracotta/14`}>
        <Image
          src={image}
          alt={`${title} — Mela Skin cosmetic dermatology`}
          fill
          sizes={sizes}
          className="object-contain object-center p-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] sm:p-4"
        />
      </div>
    );
  }

  return (
    <div
      className={`${frame} flex items-center justify-center bg-gradient-to-br from-ms-terracotta/20 to-ms-terracotta/34`}
    >
      {/*
        `currentColor` rather than the `ms-gold` gradient, so the sparkles take
        the class beside them. Gold was drawn for the near-black plate this
        replaced and disappears on a light one.
      */}
      <Sparkle
        width={15}
        height={30}
        fill="currentColor"
        className="absolute left-7 top-7 text-ms-terracotta opacity-35"
      />
      <Sparkle
        width={10}
        height={20}
        fill="currentColor"
        className="absolute bottom-8 right-9 text-ms-terracotta opacity-30"
      />
      <Icon
        name={icon}
        className="size-20 text-ms-terracotta-deep transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] sm:size-24"
      />
    </div>
  );
}
