/**
 * Everything the site says, in one import.
 *
 *   import { brand, CONDITIONS, MENU } from "@/constants";
 *
 * Components import from here. The modules themselves import from each other
 * directly (`./menu`, not `.`), so this barrel is never part of a cycle.
 *
 * See ./README.md for which file holds what.
 */

export { ABOUT } from "./about";
export { CONTACT } from "./contact";
export {
  brand,
  heroBackground,
  heroFrames,
  heroSampleCredit,
  heroSamples,
} from "./brand";
export { photos, todo, SOCIAL } from "./placeholders";
export type { Photo, SocialAccount } from "./placeholders";

export { nav, NAV_FLAT, FOOTER_COLUMNS, FOOTER_COLUMNS_COMPACT } from "./navigation";
export type { NavChild, NavItem, NavLink, NavList, NavRow } from "./navigation";

export {
  MENU,
  MENU_ITEM_COUNT,
  offeringLine,
  sectionItemCount,
  sectionRows,
  sectionOffering,
  sectionOfferingShort,
  sectionTitleList,
} from "./menu";
export type {
  MenuGroup,
  MenuItem,
  MenuRow,
  MenuSection,
  Offering,
} from "./menu";

export { CONDITIONS } from "./conditions";
export type { Condition } from "./conditions";

export { COSMETIC, COMING_SOON } from "./cosmetic";
export type { CosmeticFamily } from "./cosmetic";

export {
  CLINICIANS,
  PRIMARY_CLINICIAN,
  VISIT_STEPS,
  PREMISES,
  CLINIC_FACTS,
  CONTACT_DETAILS,
} from "./clinic";
export type { Clinician } from "./clinic";

export {
  HOME,
  MEDICAL_PAGE,
  COSMETIC_PAGE,
  MENU_PAGE,
  SKINCARE_PAGE,
  META,
} from "./copy";
