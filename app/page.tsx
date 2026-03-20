import { FloatingDots } from "@/components/FloatingDots";

const DEPOP_URL = "https://www.depop.com/";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--salmon)] bg-gradient-to-b from-[#f8b5a8] via-[var(--salmon)] to-[var(--salmon-deep)]">
      <FloatingDots />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 pb-16 pt-14 sm:px-10 sm:pt-20">
        <header className="mb-16 sm:mb-24">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#3d3d3d]/80">
            Depop storefront
          </p>
          <h1
            className="text-5xl font-medium leading-[0.95] tracking-tight text-[#141414] sm:text-7xl sm:leading-[0.92]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Sisterle
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#2a2a2a]/90 sm:text-xl">
            Antique pieces, thrifted gems, and pre-loved fashion—curated like a
            Depop closet you&apos;d actually want to scroll forever.
          </p>
        </header>

        <main className="flex flex-1 flex-col gap-12">
          <section className="rounded-2xl border border-black/10 bg-white/35 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a]/70">
              What you&apos;ll find
            </h2>
            <ul className="mt-6 space-y-4 text-[#222]">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                <span>
                  <strong className="font-semibold">Vintage &amp; thrift</strong>{" "}
                  — clothing and accessories with character, not clutter.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                <span>
                  <strong className="font-semibold">Small home &amp; decor</strong>{" "}
                  — oddities and pieces that photograph beautifully.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                <span>
                  <strong className="font-semibold">Honest listings</strong> —
                  condition, measurements, and vibes up front.
                </span>
              </li>
            </ul>
          </section>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <a
              href={DEPOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#141414] px-8 text-base font-semibold text-[var(--salmon)] transition hover:bg-black sm:min-w-[200px]"
            >
              Shop on Depop
            </a>
            <p className="text-center text-sm text-[#2a2a2a]/75 sm:text-left">
              New drops and restocks live on our Depop shop first.
            </p>
          </div>
        </main>

        <footer className="mt-auto border-t border-black/10 pt-10 text-center text-sm text-[#333]/80 sm:text-left">
          <p>Sisterle · Thrifted &amp; vintage · See you on Depop</p>
        </footer>
      </div>
    </div>
  );
}
