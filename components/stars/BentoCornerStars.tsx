import {
  STAR_FILLS,
  STAR_KINDS,
  StarShape,
  starNoise01,
  type StarKind,
} from "@/components/stars/StarShape";

type StarSlot = {
  className: string;
  size: number;
  rotate: number;
  kind: StarKind;
  fill: string;
  delay: number;
  duration: number;
};

/**
 * Edge + mid-edge slots — hug the rim so stickers stay off copy/media.
 * First 4 are corners; extra slots fill mid-edges for denser scatter.
 */
const EDGE_SLOTS = [
  "bento-star--tr",
  "bento-star--bl",
  "bento-star--br",
  "bento-star--tl",
  "bento-star--tm",
  "bento-star--mr",
  "bento-star--bm",
  "bento-star--ml",
  "bento-star--tr2",
  "bento-star--bl2",
] as const;

function buildEdgeStars(seed: number, count: number): StarSlot[] {
  const n = Math.min(count, EDGE_SLOTS.length);
  return Array.from({ length: n }, (_, i) => {
    const noise = seed * 11 + i * 19;
    return {
      className: EDGE_SLOTS[i],
      size: 10 + starNoise01(noise + 1) * (i < 4 ? 12 : 9),
      rotate: starNoise01(noise + 2) * 360 - 180,
      kind: STAR_KINDS[(seed + i) % STAR_KINDS.length],
      fill: STAR_FILLS[(seed + i * 3) % STAR_FILLS.length],
      delay: starNoise01(noise) * 3.5,
      duration: 5.5 + starNoise01(noise + 3) * 4,
    };
  });
}

type BentoCornerStarsProps = {
  seed?: number;
  /** 1–10 edge stickers (corners first, then mid-edges). */
  count?: number;
  /** Optional id prefix when multiple layers share a page. */
  idPrefix?: string;
  className?: string;
};

export function BentoCornerStars({
  seed = 1,
  count = 4,
  idPrefix = "bento-star",
  className = "",
}: BentoCornerStarsProps) {
  const stars = buildEdgeStars(seed, Math.max(1, Math.min(10, count)));

  return (
    <div
      className={["bento-panel-stars", className].filter(Boolean).join(" ")}
      aria-hidden
    >
      {stars.map((star, i) => (
        <span
          key={i}
          className={`plaid-star bento-star ${star.className}`}
          style={{
            width: `${star.size.toFixed(1)}px`,
            height: `${star.size.toFixed(1)}px`,
            ["--star-rot" as string]: `${star.rotate.toFixed(1)}deg`,
            animationDelay: `${star.delay.toFixed(2)}s`,
            animationDuration: `${star.duration.toFixed(2)}s`,
          }}
        >
          <StarShape
            kind={star.kind}
            fill={star.fill}
            id={`${idPrefix}-${seed}-${i}`}
          />
        </span>
      ))}
    </div>
  );
}
