import type { SVGProps } from "react";

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
