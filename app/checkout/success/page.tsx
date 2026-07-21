import Link from "next/link";
import { ClearCartOnSuccess } from "@/components/cart/ClearCartOnSuccess";

type SuccessPageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const orderId = params.orderId?.trim();

  return (
    <div className="acid-wash-bg relative min-h-screen overflow-x-hidden">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16 sm:px-10">
        <ClearCartOnSuccess />
        <div className="rounded-2xl border border-black/15 bg-white/70 p-8 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <p
            className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#1a1a1a]/70"
            style={{
              fontFamily: "var(--font-handmade), var(--font-fraunces), serif",
            }}
          >
            Order confirmed
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[#141414]">
            Thanks for shopping Sisterle
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#222]/85">
            Your payment went through. We&apos;ll pack your piece and send tracking
            when it ships. Watch your email for the Square receipt.
          </p>
          {orderId ? (
            <p className="mt-4 rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[#333]">
              Reference: <span className="font-semibold">{orderId}</span>
            </p>
          ) : null}
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
