import type { ReactNode } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { StorefrontProduct } from "@/lib/square/types";

type CatalogSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  products: StorefrontProduct[];
  emptyMessage: ReactNode;
  accent?: "blue" | "paper";
};

export function CatalogSection({
  id,
  title,
  subtitle,
  products,
  emptyMessage,
  accent = "blue",
}: CatalogSectionProps) {
  const cardBase =
    "relative isolate rounded-2xl border p-8 backdrop-blur-sm sm:p-10";
  const cardBlue =
    "border-black/25 bg-[rgba(70,110,210,0.34)] text-slate-950 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.45)]";
  const cardPaper =
    "border-black/15 bg-white/55 text-[#141414] shadow-[0_22px_55px_-24px_rgba(0,0,0,0.35)]";
  const cardTexture =
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-[0.7] before:mix-blend-multiply before:content-[''] " +
    "before:[filter:contrast(1.05)_saturate(0.95)] " +
    "before:bg-[radial-gradient(18px_14px_at_12%_22%,rgba(0,0,0,0.10),transparent_58%),radial-gradient(22px_16px_at_78%_28%,rgba(0,0,0,0.08),transparent_60%),radial-gradient(18px_14px_at_34%_76%,rgba(0,0,0,0.07),transparent_60%),radial-gradient(26px_18px_at_88%_78%,rgba(0,0,0,0.07),transparent_62%),repeating-linear-gradient(10deg,rgba(0,0,0,0.08)_0px,rgba(0,0,0,0.08)_1px,transparent_1px,transparent_7px),repeating-linear-gradient(100deg,rgba(255,255,255,0.22)_0px,rgba(255,255,255,0.22)_1px,transparent_1px,transparent_9px)]";

  return (
    <section id={id} className="scroll-mt-28">
      <div
        className={[
          cardBase,
          accent === "blue" ? cardBlue : cardPaper,
          cardTexture,
          accent === "blue" ? "rotate-[-0.25deg]" : "rotate-[0.2deg]",
        ].join(" ")}
      >
        <div>
          <h2
            className="text-sm font-extrabold uppercase tracking-[0.22em] text-current/80"
            style={{
              fontFamily: "var(--font-handmade), var(--font-fraunces), serif",
            }}
          >
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#222]/80">{subtitle}</p>
        </div>

        {products.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-black/10 bg-white/65 p-6 text-sm leading-relaxed text-[#222]/85">
            {emptyMessage}
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
