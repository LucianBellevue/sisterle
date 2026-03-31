"use client";

type ContactSectionProps = {
  depopUrl: string;
  email: string;
};

export function ContactSection({ depopUrl, email }: ContactSectionProps) {
  const cardBase =
    "relative isolate rounded-2xl border border-black/15 bg-white/55 p-8 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10";
  const cardTexture =
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-[0.78] before:mix-blend-multiply before:content-[''] " +
    "before:[filter:contrast(1.1)_saturate(1.05)] " +
    "before:bg-[radial-gradient(18px_14px_at_12%_22%,rgba(0,0,0,0.07),transparent_58%),radial-gradient(22px_16px_at_78%_28%,rgba(0,0,0,0.06),transparent_60%),radial-gradient(18px_14px_at_34%_76%,rgba(0,0,0,0.05),transparent_60%),radial-gradient(26px_18px_at_88%_78%,rgba(0,0,0,0.05),transparent_62%),repeating-linear-gradient(10deg,rgba(0,0,0,0.05)_0px,rgba(0,0,0,0.05)_1px,transparent_1px,transparent_7px),repeating-linear-gradient(100deg,rgba(255,255,255,0.35)_0px,rgba(255,255,255,0.35)_1px,transparent_1px,transparent_9px)]";
  const noteBase =
    "relative rounded-2xl border border-black/10 bg-white/60 p-6";
  const noteStitch =
    "after:pointer-events-none after:absolute after:inset-[10px_12px] after:rounded-[18px] after:border after:border-dashed after:border-black/20 after:content-['']";

  return (
    <section id="contact" className="scroll-mt-28">
      <div className={[cardBase, cardTexture, "rotate-[0.3deg]"].join(" ")}>
        <h2
          className="text-sm font-extrabold uppercase tracking-[0.22em] text-current/80"
          style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
        >
          Contact
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <p className="text-sm leading-relaxed text-[#222]/85">
              For sizing questions, bundles, or quick checks before you buy, reach out.
              We usually reply fastest on Depop.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a
                href={depopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#141414] px-7 text-sm font-semibold text-(--salmon) transition hover:bg-black sm:min-w-[200px]"
              >
                Message on Depop
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 bg-white/65 px-7 text-sm font-semibold text-[#141414] transition hover:bg-white/85 sm:min-w-[200px]"
              >
                Email
              </a>
            </div>
          </div>

          <div className={[noteBase, noteStitch].join(" ")}>
            <p
              className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#1a1a1a]/65"
              style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
            >
              Quick links
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a
                href="#info"
                className="rounded-lg px-2 py-1 font-semibold text-[#141414]/85 transition hover:bg-white/70 hover:text-[#141414]"
              >
                Info
              </a>
              <a
                href="#featured"
                className="rounded-lg px-2 py-1 font-semibold text-[#141414]/85 transition hover:bg-white/70 hover:text-[#141414]"
              >
                Featured items
              </a>
              <a
                href={depopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-2 py-1 font-semibold text-[#141414]/85 transition hover:bg-white/70 hover:text-[#141414]"
              >
                Depop shop
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

