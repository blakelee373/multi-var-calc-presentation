export const palette = {
  background: "#FBF8F3",
  paper: "#FFFFFF",
  ink: "#1F2A44",
  inkSoft: "#475569",
  amber: "#F59E0B",
  amberDeep: "#B45309",
  teal: "#0EA5A4",
  tealSoft: "#5EEAD4",
  slate: "#94A3B8",
  slateLine: "#CBD5E1",
  sky: "#BFDBFE",
} as const;

export type PaletteKey = keyof typeof palette;
