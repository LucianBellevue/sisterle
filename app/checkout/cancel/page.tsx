import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="acid-wash-bg relative min-h-screen overflow-x-hidden">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16 sm:px-10">
        <div className="rounded-2xl border border-black/15 bg-white/70 p-8 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <p
            className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#1a1a1a]/70"
            style={{
              fontFamily: "var(--font-handmade), var(--font-fraunces), serif",
            }}
          >
            Checkout canceled
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[#141414]">
            No worries — your cart is still here
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#222]/85">
            Payment wasn&apos;t completed. You can reopen your cart and try again
            whenever you&apos;re ready.
          </p>
          <Link
            href="/#shop"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#141414] px-7 text-sm font-semibold text-(--salmon) transition hover:bg-black"
          >
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
