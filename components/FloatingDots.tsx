const DOT_COUNT = 48;

function dotProps(i: number) {
  const top = ((i * 7 + 13) % 92) + 4;
  const left = ((i * 11 + 19) % 90) + 5;
  const size = 3 + (i % 4);
  const duration = 9 + (i % 6) * 1.25;
  const delay = ((i * 0.73) % 6) - 2;
  return { top, left, size, duration, delay };
}

export function FloatingDots() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: DOT_COUNT }, (_, i) => {
        const { top, left, size, duration, delay } = dotProps(i);
        return (
          <span
            key={i}
            className="floating-dot absolute rounded-full bg-[#0a0a0a]"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
