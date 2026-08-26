/**
 * Everything the site says, in one import.
 *
 *   import { brand, CONDITIONS, MENU, kes } from "@/constants";
 *
 * Components import from here. The modules themselves import from each other
 * directly (`./menu`, not `.`), so this barrel is never part of a cycle.
 *
 * See ./README.md for which file holds what.
 */

export { ABOUT } from "./about";
export { CONTACT } from "./contact";
export { brand, heroSlides } from "./brand";
export { todo } from "./placeholders";

export { nav, NAV_FLAT, FOOTER_COLUMNS, FOOTER_COLUMNS_COMPACT } from "./navigation";
export type { NavChild, NavItem, NavLink } from "./navigation";

export {
  MENU,
  MENU_ITEM_COUNT,
  MENU_FROM,
  kes,
  fromPrice,
  fromPriceForGroup,
  fromPriceForItem,
} from "./menu";
export type { MenuGroup, MenuItem, MenuSection, PriceTier } from "./menu";

export { CONDITIONS } from "./conditions";
export type { Condition } from "./conditions";

export { COSMETIC, COMING_SOON, familyFrom } from "./cosmetic";
export type { CosmeticFamily } from "./cosmetic";

export {
  CLINICIANS,
  VISIT_STEPS,
  PREMISES,
  REVIEW_SLOTS,
  CLINIC_FACTS,
  CONTACT_DETAILS,
} from "./clinic";
export type { Clinician } from "./clinic";

export {
  HOME,
  MEDICAL_PAGE,
  COSMETIC_PAGE,
  MENU_PAGE,
  META,
} from "./copy";
