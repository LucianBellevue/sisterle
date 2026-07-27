export const PANEL_TONES = [
  "pink",
  "blue",
  "yellow",
  "cream",
] as const;

export type PanelTone = (typeof PANEL_TONES)[number] | "coral";

export function toneClass(tone: PanelTone): string {
  switch (tone) {
    case "pink":
      return "bento-panel-pink";
    case "blue":
      return "bento-panel-blue";
    case "yellow":
      return "bento-panel-yellow";
    case "coral":
      return "bento-panel-coral";
    case "cream":
    default:
      return "bento-panel-cream";
  }
}

export function cycleTone(index: number): PanelTone {
  return PANEL_TONES[index % PANEL_TONES.length];
}
