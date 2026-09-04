/*
  RE-EXPORTED, NOT DUPLICATED — see ./BrandPattern.tsx for why.

  This used to be a copy, and it could be, because it made per-section choices
  (scale, fade, drift) that a direction might legitimately want to make
  differently. It no longer makes any: the component is now the tile plus the
  phase that keeps it aligned with the section above, and both of those are
  page-wide facts. There is nothing left here for a direction to disagree with.
*/
export { PatternField } from "@/components/brand/PatternField";
export type { PatternTone } from "@/components/brand/PatternField";
