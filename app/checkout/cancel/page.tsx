import Link from "next/link";
import { UI_COPY } from "@/lib/copy/ui";

export default function CheckoutCancelPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-8 sm:px-10 sm:py-16">
        <div className="rounded-2xl border border-black/15 bg-white/70 p-8 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <p className="font-hand text-lg font-semibold text-[#1a1a1a]/80">
            {UI_COPY.checkout.cancelEyebrow}
          </p>
          <h1 className="font-hand mt-3 text-2xl font-semibold text-[#141414] sm:text-3xl">
            {UI_COPY.checkout.cancelTitle}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#222]/85">
            Payment wasn&apos;t completed. You can reopen your cart and try again
            whenever you&apos;re ready.
          </p>
          <Link
            href="/#shop"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#141414] px-7 text-sm font-semibold text-(--salmon) transition hover:bg-black"
          >
            {UI_COPY.ctas.shopNow}
          </Link>
        </div>
      </div>
    </div>
  );
}
