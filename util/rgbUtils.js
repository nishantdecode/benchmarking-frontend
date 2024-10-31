export function darkenColor(hex, factor) {
  hex = hex?.replace("#", "");
  const r = parseInt(hex?.substring(0, 2), 16);
  const g = parseInt(hex?.substring(2, 4), 16);
  const b = parseInt(hex?.substring(4, 6), 16);
  const darkerR = Math.round(r * (1 - factor));
  const darkerG = Math.round(g * (1 - factor));
  const darkerB = Math.round(b * (1 - factor));
  const darkerHex = `#${((darkerR << 16) | (darkerG << 8) | darkerB)
    .toString(16)
    .padStart(6, "0")}`;
  return darkerHex;
}
