"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/*
  A link that knows whether it is the page you are on.

  ONE RULE, USED IN BOTH PLACES: a link is current when the route it points at is
  the route you are reading, and the anchored ones never are.

  The second half of that is the part worth writing down. Four of the footer's
  links go to a section of /about, and five of the menu column go to a section of
  /treatment-menu. Marking those current on their own page would light three or
  five links at once, which tells a reader nothing — "you are here" only means
  something when it points at one thing. So `/about` is current on /about and
  `/about#principles` is not, on any page.

  The top bar's dropdown triggers get a `covers` list instead, because their own
  href is only one of the routes they open onto: Treatments points at
  /medical-dermatology and holds /cosmetic-dermatology inside it, and a bar that
  went quiet on the cosmetic page would be telling the truth about the href and
  lying about where you are.

  `aria-current="page"` carries what the colour carries, since colour on its own
  is not something every reader has.
*/

/** Route part of an href, or null if it is an in-page anchor. */
function routeOf(href: string): string | null {
  if (href.startsWith("#")) return null;
  const [path, hash] = href.split("#");
  if (hash !== undefined) return null;
  return path || "/";
}

export function ActiveLink({
  href,
  covers,
  className,
  activeClassName,
  children,
  ...rest
}: {
  href: string;
  /** Extra routes this link should read as current on. */
  covers?: readonly string[];
  className: string;
  activeClassName: string;
  children: ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const pathname = usePathname();
  const own = routeOf(href);
  const routes = own ? [own, ...(covers ?? [])] : (covers ?? []);
  const current = routes.includes(pathname);

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`${className} ${current ? activeClassName : ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
