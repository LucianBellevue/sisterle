"use client";

import {
  STAR_FILLS,
  STAR_KINDS,
  StarShape,
  starNoise01,
  type StarKind,
} from "@/components/stars/StarShape";

type StarSpec = {
  top: number;
  left: number;
  size: number;
  rotate: number;
  kind: StarKind;
  fill: string;
  delay: number;
  duration: number;
};

function buildStars(count: number): StarSpec[] {
  return Array.from({ length: count }, (_, i) => {
    const n = (s: number) => starNoise01(i * 17 + s);
    return {
      top: 3 + n(1) * 94,
      left: 2 + n(2) * 96,
      size: 12 + n(3) * 24,
      rotate: n(4) * 360 - 180,
      kind: STAR_KINDS[i % STAR_KINDS.length],
      fill: STAR_FILLS[i % STAR_FILLS.length],
      delay: n(5) * 4,
      duration: 5.5 + n(6) * 4.5,
    };
  });
}

const STARS = buildStars(72);

export function PlaidStarField() {
  return (
    <div
      className="plaid-stars pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="plaid-star absolute"
          style={{
            top: `${star.top.toFixed(2)}%`,
            left: `${star.left.toFixed(2)}%`,
            width: `${star.size.toFixed(1)}px`,
            height: `${star.size.toFixed(1)}px`,
            ["--star-rot" as string]: `${star.rotate.toFixed(1)}deg`,
            animationDelay: `${star.delay.toFixed(2)}s`,
            animationDuration: `${star.duration.toFixed(2)}s`,
          }}
        >
          <StarShape kind={star.kind} fill={star.fill} id={`field-star-${i}`} />
        </span>
      ))}
    </div>
  );
}
