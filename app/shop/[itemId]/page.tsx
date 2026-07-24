import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ProductHeroImage,
  ProductPurchaseActions,
} from "@/components/shop/ProductDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProductByItemId } from "@/lib/square/catalog";
import { formatMoney } from "@/lib/square/money";
import {
  buildBreadcrumbSchema,
  buildProductSchema,
  productMetaDescription,
} from "@/lib/seo/schema";
import { SITE_NAME, getPublicSiteUrl } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ itemId: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { itemId } = await params;
  const product = await getProductByItemId(itemId);
  if (!product) {
    return { title: "Item not found" };
  }

  const siteUrl = getPublicSiteUrl();
  const description = productMetaDescription(product);
  const ogImage = product.imageUrl || `${siteUrl}/og-default.jpg`;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `/shop/${product.id}`,
    },
    openGraph: {
      type: "website",
      title: `${product.name} · ${SITE_NAME}`,
      description,
      url: `${siteUrl}/shop/${product.id}`,
      images: [
        {
          url: ogImage,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} · ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { itemId } = await params;
  const product = await getProductByItemId(itemId);
  if (!product) notFound();

  const isDepop = product.channel === "depop";

  return (
    <div className="acid-wash-bg relative min-h-screen overflow-x-hidden">
      <JsonLd data={buildProductSchema(product)} />
      <JsonLd data={buildBreadcrumbSchema(product)} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#333]/85">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="font-semibold hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={isDepop ? "/#depop" : "/#shop"}
                className="font-semibold hover:underline"
              >
                {isDepop ? "On Depop" : "Shop"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#141414]">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-8 sm:grid-cols-2 sm:items-start">
          <ProductHeroImage product={product} />

          <div className="rounded-2xl border border-black/15 bg-white/70 p-6 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8">
            <p
              className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#1a1a1a]/65"
              style={{
                fontFamily: "var(--font-handmade), var(--font-fraunces), serif",
              }}
            >
              {isDepop ? "Listed on Depop" : "Sisterle shop"}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#141414]">
              {product.name}
            </h1>
            <p className="mt-4 text-xl font-semibold text-[#141414]">
              {formatMoney(product.priceCents, product.currency)}
            </p>
            {product.description ? (
              <p className="mt-5 text-sm leading-relaxed text-[#222]/90">
                {product.description}
              </p>
            ) : (
              <p className="mt-5 text-sm leading-relaxed text-[#222]/90">
                A curated thrift and vintage find from {SITE_NAME}. One-of-one
                piece — condition notes live with the listing photos.
              </p>
            )}

            <div className="mt-8">
              <ProductPurchaseActions product={product} />
            </div>

            <p className="mt-6 text-xs leading-relaxed text-[#444]/80">
              {isDepop
                ? "This piece is mirrored here for browsing. Checkout happens on Depop."
                : "Secure checkout is powered by Square. Shipping and tax are calculated at payment."}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href={isDepop ? "/#depop" : "/#shop"}
            className="text-sm font-semibold text-[#141414] underline underline-offset-2"
          >
            ← Back to {isDepop ? "On Depop" : "Shop Sisterle"}
          </Link>
        </div>
      </div>
    </div>
  );
}
