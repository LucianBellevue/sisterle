"use client";

type FeaturedSectionProps = {
  depopUrl: string;
};

export function FeaturedSection({ depopUrl }: FeaturedSectionProps) {
  const cardBase =
    "relative isolate rounded-2xl border p-8 backdrop-blur-sm sm:p-10";
  const cardBlue =
    "border-black/25 bg-[rgba(70,110,210,0.34)] text-slate-950 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.45)]";
  const cardTexture =
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-[0.7] before:mix-blend-multiply before:content-[''] " +
    "before:[filter:contrast(1.05)_saturate(0.95)] " +
    "before:bg-[radial-gradient(18px_14px_at_12%_22%,rgba(0,0,0,0.10),transparent_58%),radial-gradient(22px_16px_at_78%_28%,rgba(0,0,0,0.08),transparent_60%),radial-gradient(18px_14px_at_34%_76%,rgba(0,0,0,0.07),transparent_60%),radial-gradient(26px_18px_at_88%_78%,rgba(0,0,0,0.07),transparent_62%),repeating-linear-gradient(10deg,rgba(0,0,0,0.08)_0px,rgba(0,0,0,0.08)_1px,transparent_1px,transparent_7px),repeating-linear-gradient(100deg,rgba(255,255,255,0.22)_0px,rgba(255,255,255,0.22)_1px,transparent_1px,transparent_9px)]";
  const noteBase =
    "relative rounded-2xl border border-black/10 bg-white/65 p-6";
  const noteStitch =
    "after:pointer-events-none after:absolute after:inset-[10px_12px] after:rounded-[18px] after:border after:border-dashed after:border-black/20 after:content-['']";

  const items = [
    { title: "Slip dresses + satins", note: "Soft shine, easy layering, camera-friendly." },
    { title: "Perfect leather + suede", note: "Broken-in texture that elevates everything." },
    { title: "Tiny knits + cardigans", note: "Cozy silhouettes with clean lines." },
    { title: "Home + decor oddities", note: "Small statement pieces with personality." },
  ];

  return (
    <section id="featured" className="scroll-mt-28">
      <div
        className={[
          cardBase,
          cardBlue,
          cardTexture,
          "rotate-[-0.25deg] shadow-[0_22px_55px_-24px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(0,0,0,0.06)]",
        ].join(" ")}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="text-sm font-extrabold uppercase tracking-[0.22em] text-current/80"
              style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
            >
              Featured items
            </h2>
            <p className="mt-2 text-sm text-[#222]/80">
              A few vibes we love right now. Check Depop for what&apos;s currently available.
            </p>
          </div>
          <a
            href={depopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#141414] px-6 text-sm font-semibold text-(--salmon) transition hover:bg-black"
          >
            Browse the shop
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className={[noteBase, noteStitch, "transition hover:bg-white/80"].join(" ")}
            >
              <p className="text-base font-semibold text-[#141414]">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#222]/80">{item.note}</p>
              <div className="mt-4 h-px w-full bg-black/10" />
              <p
                className="mt-4 text-xs font-extrabold uppercase tracking-[0.22em] text-[#1a1a1a]/60"
                style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
              >
                Shop to see what&apos;s live
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

