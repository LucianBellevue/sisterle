import type { ReactNode } from "react";
import { toneClass, type PanelTone } from "@/lib/bento/tones";

type BentoPanelProps = {
  tone?: PanelTone;
  className?: string;
  children: ReactNode;
  bordered?: boolean;
  as?: "div" | "section" | "article";
};

export function BentoPanel({
  tone = "cream",
  className = "",
  children,
  bordered = false,
  as: Tag = "div",
}: BentoPanelProps) {
  return (
    <Tag
      className={[
        "bento-panel",
        toneClass(tone),
        bordered ? "border-[3px] border-[var(--panel-coral)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
