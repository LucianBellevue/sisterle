export function AboutSection() {
  const cardBase =
    "relative isolate rounded-2xl border p-8 backdrop-blur-sm sm:p-10";
  const cardInk =
    "border-black/35 bg-[#121212]/75 text-white/90 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.6)]";
  const cardTexture =
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-[0.8] before:mix-blend-multiply before:content-[''] " +
    "before:[filter:contrast(1.1)_saturate(1.05)] " +
    "before:bg-[radial-gradient(18px_14px_at_12%_22%,rgba(0,0,0,0.20),transparent_58%),radial-gradient(22px_16px_at_78%_28%,rgba(0,0,0,0.18),transparent_60%),radial-gradient(18px_14px_at_34%_76%,rgba(0,0,0,0.16),transparent_60%),radial-gradient(26px_18px_at_88%_78%,rgba(0,0,0,0.16),transparent_62%),repeating-linear-gradient(10deg,rgba(0,0,0,0.22)_0px,rgba(0,0,0,0.22)_1px,transparent_1px,transparent_7px),repeating-linear-gradient(100deg,rgba(255,255,255,0.10)_0px,rgba(255,255,255,0.10)_1px,transparent_1px,transparent_9px)]";
  const noteBase =
    "relative rounded-2xl border border-white/15 bg-white/10 p-6";
  const noteStitch =
    "after:pointer-events-none after:absolute after:inset-[10px_12px] after:rounded-[18px] after:border after:border-dashed after:border-white/25 after:content-['']";

  return (
    <section id="about" className="scroll-mt-28">
      <div className={[cardBase, cardInk, cardTexture, "rotate-[0.35deg]"].join(" ")}>
        <h2
          className="text-sm font-extrabold uppercase tracking-[0.22em] text-current/85"
          style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
        >
          About
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <p className="text-lg leading-relaxed text-current/90">
              Sisterle is a curated closet of thrifted and vintage finds with a
              soft spot for texture, shape, and that “wait… where did you find
              that?” energy.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-current/80">
              Everything is selected to feel wearable, photographable, and worth
              keeping—no filler. Expect small runs, quick sell-outs, and pieces
              that become your new favorite.
            </p>
          </div>

          <div className={[noteBase, noteStitch].join(" ")}>
            <p
              className="text-xs font-extrabold uppercase tracking-[0.22em] text-current/75"
              style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
            >
              Values
            </p>
            <ul className="mt-4 space-y-3 text-sm text-current/85">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/90" />
                <span>Quality over quantity</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/90" />
                <span>Clear photos + measurements</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/90" />
                <span>Reuse, rewear, re-love</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

