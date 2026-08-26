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

export { brand, heroSlides } from "./brand";
export { todo } from "./placeholders";

export { nav, FOOTER_COLUMNS, FOOTER_COLUMNS_COMPACT, LEGAL } from "./navigation";
export type { NavLink } from "./navigation";

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
  BOOKING,
  MEDICAL_PAGE,
  COSMETIC_PAGE,
  MENU_PAGE,
  META,
} from "./copy";
