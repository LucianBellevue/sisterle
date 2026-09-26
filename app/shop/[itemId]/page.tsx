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
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd data={buildProductSchema(product)} />
      <JsonLd data={buildBreadcrumbSchema(product)} />

      <div className="relative z-10 mx-auto max-w-3xl px-3 py-3 sm:px-10 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-[#333]/85 sm:mb-8">
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

        <div className="grid gap-4 sm:grid-cols-2 sm:items-start sm:gap-8">
          <ProductHeroImage product={product} />

          <div className="bento-panel bento-panel-cream border border-black/10 p-4 sm:p-8">
            <p className="font-hand text-base font-semibold text-[#1a1a1a]/75 sm:text-lg">
              {isDepop ? "Listed on Depop 👗" : "Sisterle shop ✨"}
            </p>
            <h1 className="font-hand mt-2 text-2xl font-semibold leading-tight text-[#141414] sm:mt-3 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg font-semibold text-[#141414] sm:mt-4 sm:text-xl">
              {formatMoney(product.priceCents, product.currency)}
            </p>
            {product.description ? (
              <p className="mt-4 text-sm leading-relaxed text-[#222]/90 sm:mt-5">
                {product.description}
              </p>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-[#222]/90 sm:mt-5">
                A curated thrift and vintage find from {SITE_NAME}. One-of-one
                piece — condition notes live with the listing photos.
              </p>
            )}

            <div className="mt-6 sm:mt-8">
              <ProductPurchaseActions product={product} />
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[#444]/80 sm:mt-6">
              {isDepop
                ? "This piece is mirrored here for browsing. Checkout happens on Depop."
                : "Secure checkout is powered by Square. Shipping and tax are calculated at payment."}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-10">
          <Link
            href={isDepop ? "/#depop" : "/#shop"}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-[#141414] underline underline-offset-2"
          >
            ← Back to {isDepop ? "On Depop" : "Shop Sisterle"}
          </Link>
        </div>
      </div>
    </div>
  );
}
