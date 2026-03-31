export function InfoSection() {
  const cardBase =
    "relative isolate rounded-2xl border border-black/15 p-8 backdrop-blur-sm sm:p-10";
  const cardPaper =
    "bg-white/55 text-[#141414] shadow-[0_22px_55px_-24px_rgba(0,0,0,0.35)]";
  const cardTexture =
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-[0.62] before:mix-blend-multiply before:content-[''] " +
    "before:bg-[radial-gradient(18px_14px_at_12%_22%,rgba(0,0,0,0.07),transparent_58%),radial-gradient(22px_16px_at_78%_28%,rgba(0,0,0,0.06),transparent_60%),radial-gradient(18px_14px_at_34%_76%,rgba(0,0,0,0.05),transparent_60%),radial-gradient(26px_18px_at_88%_78%,rgba(0,0,0,0.05),transparent_62%),repeating-linear-gradient(10deg,rgba(0,0,0,0.05)_0px,rgba(0,0,0,0.05)_1px,transparent_1px,transparent_7px),repeating-linear-gradient(100deg,rgba(255,255,255,0.35)_0px,rgba(255,255,255,0.35)_1px,transparent_1px,transparent_9px)]";
  const noteBase =
    "relative rounded-2xl border border-black/10 bg-white/60 p-6";
  const noteStitch =
    "after:pointer-events-none after:absolute after:inset-[10px_12px] after:rounded-[18px] after:border after:border-dashed after:border-black/20 after:content-['']";

  return (
    <section id="info" className="scroll-mt-28">
      <div className={[cardBase, cardPaper, cardTexture, "rotate-[-0.4deg]"].join(" ")}>
        <h2
          className="text-sm font-extrabold uppercase tracking-[0.22em] text-current/80"
          style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
        >
          Info
        </h2>

        <div className="mt-6 grid gap-6 text-[#222] sm:grid-cols-2">
          <div className={[noteBase, noteStitch].join(" ")}>
            <p
              className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#1a1a1a]/65"
              style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
            >
              What you&apos;ll find
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#222]/90">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/85" />
                <span>Vintage + thrift clothing and accessories with character.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/85" />
                <span>Small home &amp; decor pieces that photograph beautifully.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/85" />
                <span>Honest listings: condition, measurements, and details.</span>
              </li>
            </ul>
          </div>

          <div className={[noteBase, noteStitch].join(" ")}>
            <p
              className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#1a1a1a]/65"
              style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
            >
              Shipping &amp; drops
            </p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#222]/90">
              <p>
                New drops and restocks go live on Depop first. If you see it,
                grab it—most items are one-of-one.
              </p>
              <p className="text-[#222]/80">
                Questions about sizing or bundles? Jump to Contact and we&apos;ll
                get back to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

