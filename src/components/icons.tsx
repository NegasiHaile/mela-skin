import type { ComponentType, SVGProps } from "react";

/** Treatment icons. Stroke-only, 24px grid, 1.25 weight — one consistent set. */

type IconProps = { className?: string };

const base: SVGProps<SVGSVGElement> = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function IconPigment({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="9.4" r="5.3" />
      <circle cx="15" cy="14.8" r="5.3" />
    </svg>
  );
}

export function IconAcne({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5.2" />
      <circle cx="9.2" cy="9.4" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="15.1" cy="13.2" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="9.9" cy="15.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconScar({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.4 19.2C7.6 13 13.4 10.4 20.6 4.8" />
      <path d="M7.2 14.4 10.2 17.4" />
      <path d="M11.4 11 14.4 14" />
      <path d="M15.6 7.9 18.6 10.9" />
    </svg>
  );
}

export function IconHair({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.6 21C6.6 14 4.2 10.2 7.2 3" />
      <path d="M12 21C12 13.6 9.6 9.6 12.6 3" />
      <path d="M17.4 21C17.4 14 15 10.2 18 3" />
    </svg>
  );
}

export function IconInjectable({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14.6 3.4 20.6 9.4" />
      <path d="M17.6 6.4 8.4 15.6l-2.6.9.9-2.6z" />
      <path d="M5.8 16.5 3.4 20.6" />
      <path d="M11.2 9.6 14 12.4" />
    </svg>
  );
}

export function IconPeel({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.2c3.4 3.4 5.1 6.3 5.1 8.8a5.1 5.1 0 0 1-10.2 0c0-2.5 1.7-5.4 5.1-8.8z" />
      <path d="M9.6 12.6a2.4 2.4 0 0 0 2.4 2.4" />
      <path d="M4.6 20.4h14.8" />
    </svg>
  );
}

export function IconLaser({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.6v5" />
      <path d="M5.6 5.6 8.8 8.8" />
      <path d="M18.4 5.6 15.2 8.8" />
      <path d="M7.2 12h9.6l-2.2 8.4H9.4z" />
      <path d="M10.4 15.8h3.2" />
    </svg>
  );
}

export function IconBooster({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 3h4v3.3l3.1 3.3a3 3 0 0 1 .8 2.1v7.7a2 2 0 0 1-2 2H8.1a2 2 0 0 1-2-2v-7.7a3 3 0 0 1 .8-2.1L10 6.3z" />
      <path d="M7 14h10" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   The second half of the set, added when the drafted eight-treatment list was
   replaced by the clinic's actual offering (ten medical conditions, ten
   cosmetic families). Same 24px grid, same 1.25 stroke — a condition icon and
   a treatment icon have to sit next to each other without one looking heavier.
   -------------------------------------------------------------------------- */

export function IconEczema({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.4 12.6c0-4.4 3.1-7.9 7.1-7.9 3.5 0 6.4 2 7.7 5.1 1 2.4-.6 4.6-2.8 4.6-1.6 0-2.3-1-3.6-1-1.5 0-1.9 1.3-1.9 2.7 0 2-1.5 3.2-3.2 3.2-1.9 0-3.3-1.6-3.3-3.9z" />
      <circle cx="9.1" cy="9.6" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="13.4" cy="8.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="11.2" cy="12.7" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMole({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M11.4 3.9c3.6-.5 6.9 1.9 7.5 5.3.6 3.5-1.7 6.8-5.2 7.5-3.7.7-7-1.6-7.6-5.1-.5-3.1 1.6-6.2 5.3-7.7z" />
      <path d="M4.2 20.4 7.6 17" />
      <path d="M9.6 9.2c1.6-.6 3 .1 3.6 1.5" />
    </svg>
  );
}

export function IconPsoriasis({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.2" y="4.6" width="10.4" height="9.2" rx="3.4" />
      <rect x="10.4" y="10.2" width="10.4" height="9.2" rx="3.4" />
      <path d="M5.6 7.6h4.4" />
      <path d="M5.6 10.4h3" />
      <path d="M13.4 13.4h4.4" />
      <path d="M13.4 16.2h3" />
    </svg>
  );
}

export function IconRosacea({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12.4" r="5.6" />
      <path d="M12 2.4v2.4" />
      <path d="M12 20v2" />
      <path d="M4.5 4.9 6.2 6.6" />
      <path d="M19.5 4.9 17.8 6.6" />
      <path d="M2.4 12.4h2.2" />
      <path d="M19.4 12.4h2.2" />
    </svg>
  );
}

export function IconTag({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.4 6.2h6.4" />
      <path d="M6.6 6.2v3.1" />
      <path d="M6.6 9.3c3.6 0 6.2 2.3 6.2 5.4 0 3-2.1 5.1-4.7 5.1-2.2 0-3.9-1.6-3.9-3.7 0-1.9 1.4-3.3 3.2-3.3" />
      <path d="M14.6 4.4h6" />
      <path d="M17.6 4.4v4.2" />
    </svg>
  );
}

export function IconStretch({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.8 5.4c2.8 1.6 2.8 11.6 0 13.2" />
      <path d="M11.4 4.2c2.8 1.8 2.8 13.8 0 15.6" />
      <path d="M18 6.4c2.4 1.4 2.4 9.8 0 11.2" />
    </svg>
  );
}

export function IconVessel({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21V9.6" />
      <path d="M12 12.4 6.8 7.2" />
      <path d="M12 14.8l4.4-4.4" />
      <path d="M6.8 7.2V3.8" />
      <path d="M6.8 7.2H3.4" />
      <path d="M16.4 10.4h3.4" />
      <path d="M16.4 10.4V7" />
    </svg>
  );
}

export function IconWart({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.2 19.4h17.6" />
      <path d="M5.4 19.4c0-3.2 1.5-5.6 3.4-5.6 1.2 0 1.9.9 2.6.9.8 0 1.3-1.5 2.7-1.5 2.2 0 4.5 2.7 4.5 6.2" />
      <circle cx="8.6" cy="17" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="12.4" cy="17.6" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="16" cy="17.2" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBoosterAlt({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.4c3 3.6 4.6 6.4 4.6 8.6a4.6 4.6 0 1 1-9.2 0c0-2.2 1.6-5 4.6-8.6z" />
      <path d="M18.6 3.2v3.4" />
      <path d="M16.9 4.9h3.4" />
      <path d="M4.8 16.4v2.6" />
      <path d="M3.5 17.7h2.6" />
    </svg>
  );
}

export function IconPeelAlt({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.4 8.4c3.6-2.8 7.2-2.8 10.8 0s6.4 2.4 6.4 2.4" />
      <path d="M3.4 13.2c3.6-2.8 7.2-2.8 10.8 0" />
      <path d="M3.4 17.8c2.6-2 5.2-2.4 7.8-1.2" />
    </svg>
  );
}

export function IconDrip({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8.6 2.8h6.8v7.4a3.4 3.4 0 0 1-3.4 3.4 3.4 3.4 0 0 1-3.4-3.4z" />
      <path d="M8.6 6.4h6.8" />
      <path d="M12 13.6v3" />
      <circle cx="12" cy="19.4" r="1.9" />
    </svg>
  );
}

export function IconTube({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9.2 2.8h5.6" />
      <path d="M10.4 2.8v14.6a1.6 1.6 0 0 0 3.2 0V2.8" />
      <path d="M10.4 11.4h3.2" />
      <path d="M19.2 12.6c1.4 1.7 2.1 3 2.1 3.9a2.1 2.1 0 1 1-4.2 0c0-.9.7-2.2 2.1-3.9z" />
    </svg>
  );
}

export function IconBody({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="4.9" r="2.3" />
      <path d="M8.2 21v-5.2l-1.9-1.5V10a2.6 2.6 0 0 1 2.6-2.6h6.2A2.6 2.6 0 0 1 17.7 10v4.3l-1.9 1.5V21" />
      <path d="M9.6 15.8h4.8" />
    </svg>
  );
}

/**
 * Name → component, so `services.ts` can carry a plain string rather than a
 * React import. Anything unrecognised falls back to the pigment mark instead
 * of rendering a hole in the card.
 */
const REGISTRY: Record<string, ComponentType<IconProps>> = {
  acne: IconAcne,
  body: IconBody,
  booster: IconBooster,
  boosterAlt: IconBoosterAlt,
  drip: IconDrip,
  eczema: IconEczema,
  hair: IconHair,
  injectable: IconInjectable,
  laser: IconLaser,
  mole: IconMole,
  peel: IconPeel,
  peelAlt: IconPeelAlt,
  pigment: IconPigment,
  psoriasis: IconPsoriasis,
  rosacea: IconRosacea,
  scar: IconScar,
  stretch: IconStretch,
  tag: IconTag,
  tube: IconTube,
  vessel: IconVessel,
  wart: IconWart,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Mark = REGISTRY[name] ?? IconPigment;
  return <Mark className={className} />;
}
