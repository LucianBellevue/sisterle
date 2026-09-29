/**
 * Shared sticker star SVG + helpers for field + in-panel decor.
 */

export type StarKind =
  | "solid"
  | "outline"
  | "chrome"
  | "gold"
  | "holo"
  | "polka"
  | "glitter";

export const STAR_KINDS: StarKind[] = [
  "solid",
  "outline",
  "chrome",
  "gold",
  "holo",
  "polka",
  "glitter",
  "solid",
  "outline",
  "gold",
];

export const STAR_FILLS = [
  "#ff8fb8",
  "#6eb5ff",
  "#c4a1ff",
  "#ffd166",
  "#7ddea4",
  "#ff6b6b",
  "#f7a072",
  "#9b87f5",
  "#5c7cfa",
  "#2f2f2f",
];

export function starNoise01(seed: number) {
  const x = Math.sin(seed * 999.123 + seed * seed * 0.017) * 10000;
  return x - Math.floor(x);
}

const STAR_PATH =
  "M12 1.6l2.9 6.4 7 0.8-5.2 4.7 1.5 6.9L12 16.8 5.8 20.4l1.5-6.9L2.1 8.8l7-0.8L12 1.6z";

type StarShapeProps = {
  kind: StarKind;
  fill: string;
  id: string;
};

export function StarShape({ kind, fill, id }: StarShapeProps) {
  if (kind === "chrome") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
        <defs>
          <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="35%" stopColor="#94a3b8" />
            <stop offset="55%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
        <path
          d={STAR_PATH}
          fill={`url(#${id}-chrome)`}
          stroke="#fff"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  if (kind === "gold") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
        <defs>
          <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff6c8" />
            <stop offset="40%" stopColor="#f5c542" />
            <stop offset="70%" stopColor="#e8a317" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
        <path
          d={STAR_PATH}
          fill={`url(#${id}-gold)`}
          stroke="#fff"
          strokeWidth="1.1"
        />
      </svg>
    );
  }

  if (kind === "holo") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
        <defs>
          <linearGradient id={`${id}-holo`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff8fab" />
            <stop offset="25%" stopColor="#ffd166" />
            <stop offset="50%" stopColor="#7ddea4" />
            <stop offset="75%" stopColor="#6eb5ff" />
            <stop offset="100%" stopColor="#c4a1ff" />
          </linearGradient>
        </defs>
        <path
          d={STAR_PATH}
          fill={`url(#${id}-holo)`}
          stroke="#fff"
          strokeWidth="1.1"
        />
      </svg>
    );
  }

  if (kind === "polka") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
        <defs>
          <pattern
            id={`${id}-polka`}
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <rect width="5" height="5" fill={fill} />
            <circle cx="1.4" cy="1.4" r="1" fill="#fff" />
          </pattern>
        </defs>
        <path
          d={STAR_PATH}
          fill={`url(#${id}-polka)`}
          stroke="#fff"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  if (kind === "glitter") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
        <defs>
          <pattern
            id={`${id}-glitter`}
            width="3"
            height="3"
            patternUnits="userSpaceOnUse"
          >
            <rect width="3" height="3" fill={fill} />
            <rect
              x="0.4"
              y="0.4"
              width="0.9"
              height="0.9"
              fill="#fff"
              opacity="0.85"
            />
            <rect
              x="1.8"
              y="1.6"
              width="0.7"
              height="0.7"
              fill="#ffe08a"
              opacity="0.7"
            />
          </pattern>
        </defs>
        <path
          d={STAR_PATH}
          fill={`url(#${id}-glitter)`}
          stroke="#fff"
          strokeWidth="1.1"
        />
      </svg>
    );
  }

  if (kind === "outline") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
        <path d={STAR_PATH} fill={fill} stroke="#fff" strokeWidth="1.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm">
      <path
        d={STAR_PATH}
        fill={fill}
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="0.9"
      />
    </svg>
  );
}
