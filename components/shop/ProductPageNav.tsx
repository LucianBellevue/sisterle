import Link from "next/link";
import { BentoCornerStars } from "@/components/stars/BentoCornerStars";

type ProductPageNavProps = {
  productName: string;
  shopHref: string;
  shopLabel: string;
};

export function ProductPageNav({
  productName,
  shopHref,
  shopLabel,
}: ProductPageNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="nav-glass nav-stars-host relative mb-4 flex flex-wrap items-center gap-2 overflow-visible rounded-2xl p-3 sm:mb-5 sm:p-3.5"
    >
      <BentoCornerStars seed={83} count={5} idPrefix="product-crumb" />
      <Link href="/" className="nav-pill">
        Home
      </Link>
      <span className="text-sm text-[#141414]/35" aria-hidden>
        /
      </span>
      <Link href={shopHref} className="nav-pill nav-pill-active">
        {shopLabel}
      </Link>
      <span className="text-sm text-[#141414]/35" aria-hidden>
        /
      </span>
      <span className="nav-pill max-w-[min(100%,14rem)] cursor-default truncate bg-white/60 sm:max-w-xs">
        {productName}
      </span>
    </nav>
  );
}
