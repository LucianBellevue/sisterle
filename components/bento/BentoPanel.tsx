import type { ReactNode } from "react";
import { BentoCornerStars } from "@/components/stars/BentoCornerStars";
import { toneClass, type PanelTone } from "@/lib/bento/tones";

type BentoPanelProps = {
  tone?: PanelTone;
  className?: string;
  children: ReactNode;
  bordered?: boolean;
  as?: "div" | "section" | "article";
  /** Decorative corner / edge stars; default on. */
  stars?: boolean;
  /** How many edge stickers (1–10). */
  starCount?: number;
  /** Deterministic seed so panels don’t all match. */
  starSeed?: number;
};

const TONE_SEED: Record<PanelTone, number> = {
  pink: 3,
  blue: 7,
  yellow: 11,
  cream: 13,
  coral: 17,
};

export function BentoPanel({
  tone = "cream",
  className = "",
  children,
  bordered = false,
  as: Tag = "div",
  stars = true,
  starCount = 5,
  starSeed,
}: BentoPanelProps) {
  const seed = starSeed ?? TONE_SEED[tone] ?? 1;

  return (
    <Tag
      className={[
        "bento-panel relative",
        toneClass(tone),
        bordered
          ? "border-[3px] border-[var(--panel-coral)] !shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_14px_32px_-18px_rgba(232,93,76,0.35),0_28px_50px_-28px_rgba(215,96,145,0.28)]"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {stars ? <BentoCornerStars seed={seed} count={starCount} /> : null}
      {children}
    </Tag>
  );
}
