/*
  RE-EXPORTED, NOT DUPLICATED — unlike everything else in this folder.

  The other files here are deliberate copies so the losing design direction can
  be deleted whole. The pattern's geometry cannot be, because it is brand fact
  rather than a direction's choice, and because two copies of TILE_H that drifted
  apart would be a real bug: the drift variable that keeps every layer in phase
  is global and wraps at exactly one tile height, so a second, different tile
  height would put this direction on a lattice that no longer lines up.

  If /editorial wins and ../../components is deleted, move
  components/brand/BrandPattern.tsx here rather than copying it.
*/
export { TILE_W, TILE_H, patternTileUrl } from "@/components/brand/BrandPattern";
