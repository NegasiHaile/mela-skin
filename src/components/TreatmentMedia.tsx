import Image from "next/image";
import { Icon } from "./icons";
import { Sparkle } from "./brand/Marks";

/*
  The picture on a treatment card.

  Five of the ten cosmetic families have real photography in /public/images.
  The other five get a brand-ground panel with the treatment mark set large.
  That is a finish, not a gap: no stock photograph goes in here to fill a hole,
  and nothing on the page pretends to be a picture of this clinic's rooms.

  Shared between the home rail and the cosmetic page so the two cannot drift
  into having different card anatomy.
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
      <div className={`${frame} bg-ms-paper/40`}>
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
      className={`${frame} flex items-center justify-center bg-gradient-to-br from-ms-panel to-ms-field`}
    >
      <Sparkle
        width={15}
        height={30}
        fill="url(#ms-gold)"
        className="absolute left-7 top-7 opacity-45"
      />
      <Sparkle
        width={10}
        height={20}
        fill="url(#ms-gold)"
        className="absolute bottom-8 right-9 opacity-35"
      />
      <Icon
        name={icon}
        className="size-20 text-ms-gold/85 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] sm:size-24"
      />
    </div>
  );
}
