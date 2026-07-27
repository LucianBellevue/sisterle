"use client";

import { useEffect, useMemo, useRef } from "react";

const DOT_COUNT = 96;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function noise01(seed: number) {
  // Deterministic 0..1 noise (stable across renders)
  const x = Math.sin(seed * 999.123 + seed * seed * 0.017) * 10000;
  return x - Math.floor(x);
}

function dotProps(i: number) {
  // Explicit 4-dot diamonds: every group of 4 dots forms a diamond (a rhombus)
  // if you were to connect them with lines (up/right/down/left).
  const DIAMOND_COUNT = Math.ceil(DOT_COUNT / 4);
  const diamondsPerRow = 4;
  const diamondRows = Math.ceil(DIAMOND_COUNT / diamondsPerRow);

  const d = Math.floor(i / 4); // diamond index
  const v = i % 4; // vertex: 0=up,1=right,2=down,3=left

  const row = Math.floor(d / diamondsPerRow);
  const col = d % diamondsPerRow;

  const margin = 10;
  const centerStepX = (100 - margin * 2) / (diamondsPerRow - 1);
  const centerStepY = (100 - margin * 2) / (diamondRows - 1);

  const centerJitterX = (noise01(d + 10) - 0.5) * 6; // % (same for all 4 vertices)
  const centerJitterY = (noise01(d + 20) - 0.5) * 6; // %

  const cx =
    margin +
    col * centerStepX +
    (row % 2 === 1 ? centerStepX / 2 : 0) +
    centerJitterX;
  const cy = margin + row * centerStepY + centerJitterY;

  const diamondW = 12; // % width between left/right vertices
  const diamondH = 14; // % height between up/down vertices

  let ox = 0;
  let oy = 0;
  if (v === 0) oy = -diamondH / 2;
  if (v === 1) ox = diamondW / 2;
  if (v === 2) oy = diamondH / 2;
  if (v === 3) ox = -diamondW / 2;

  // Tiny per-diamond rotation keeps the motif, adds asymmetry.
  const angle = (noise01(d + 99) - 0.5) * 0.5; // radians (~±14°)
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rx = ox * cos - oy * sin;
  const ry = ox * sin + oy * cos;

  const top = clamp(cy + ry, 2, 98);
  const left = clamp(cx + rx, 2, 98);
  const size = 4;
  // Small per-dot parallax depth (all still move together directionally).
  const depth = 0.35 + noise01(i + 777) * 0.65; // 0.35..1.0
  const durationSec = 6.5 + noise01(i + 333) * 5.5; // 6.5..12s
  const delaySec = -(noise01(i + 555) * durationSec); // negative = already mid-cycle
  return { top, left, size, depth, durationSec, delaySec };
}

export function FloatingDots() {
  const parallaxStrengthPx = 10;
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 }); // -1..1
  const currentRef = useRef({ x: 0, y: 0 }); // eased -1..1

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMove = (e: MouseEvent) => {
      if (reduced.matches) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRef.current.x = clamp(nx, -1, 1);
      targetRef.current.y = clamp(ny, -1, 1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const step = () => {
      if (!reduced.matches) {
        const ease = 0.08;
        currentRef.current.x +=
          (targetRef.current.x - currentRef.current.x) * ease;
        currentRef.current.y +=
          (targetRef.current.y - currentRef.current.y) * ease;

        const maxPx = parallaxStrengthPx;
        document.documentElement.style.setProperty(
          "--dots-parallax-x",
          `${currentRef.current.x * maxPx}px`,
        );
        document.documentElement.style.setProperty(
          "--dots-parallax-y",
          `${currentRef.current.y * maxPx}px`,
        );
      }

      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [parallaxStrengthPx]);

  const dots = useMemo(() => {
    return Array.from({ length: DOT_COUNT }, (_, i) => ({ i, ...dotProps(i) }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {dots.map(({ i, top, left, size, depth, durationSec, delaySec }) => {
        const topPct = `${top.toFixed(4)}%`;
        const leftPct = `${left.toFixed(4)}%`;
        const sizePx = `${size}px`;
        const depthFixed = depth.toFixed(4);

        return (
          <span
            key={i}
            className="absolute"
            style={{
              top: topPct,
              left: leftPct,
              width: sizePx,
              height: sizePx,
              transform: `translate3d(calc(var(--dots-parallax-x, 0px) * ${depthFixed}), calc(var(--dots-parallax-y, 0px) * ${depthFixed}), 0)`,
            }}
          >
            <span
              className="floating-dot block h-full w-full rounded-full bg-[#0a0a0a]"
              style={{
                animationDuration: `${durationSec.toFixed(2)}s`,
                animationDelay: `${delaySec.toFixed(2)}s`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
