import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BentoPanel } from "@/components/bento/BentoPanel";
import {
  ProductHeroImage,
  ProductPurchaseActions,
} from "@/components/shop/ProductDetail";
import { ProductPageNav } from "@/components/shop/ProductPageNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ShelfNav } from "@/components/ShelfNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProductByItemId } from "@/lib/square/catalog";
import { formatMoney } from "@/lib/square/money";
import {
  buildBreadcrumbSchema,
  buildProductSchema,
  productMetaDescription,
} from "@/lib/seo/schema";
import {
  CONTACT_EMAIL,
  SITE_ASSETS,
  SITE_NAME,
  getDepopShopUrl,
  getInstagramUrl,
  getPublicSiteUrl,
} from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ itemId: string }>;
};

const UIFORGE_URL = "https://uiforge.io/";

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
  const hasProductImage = Boolean(product.imageUrl);
  const ogImage = product.imageUrl || `${siteUrl}${SITE_ASSETS.ogDefault}`;

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
          ...(hasProductImage
            ? {}
            : { width: 1200, height: 630, type: "image/jpeg" }),
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
  const depopUrl = getDepopShopUrl();
  const shopHref = isDepop ? "/#depop" : "/#shop";
  const shopLabel = isDepop ? "On Depop" : "Shop";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd data={buildProductSchema(product)} />
      <JsonLd data={buildBreadcrumbSchema(product)} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-3 pb-8 pt-3 sm:px-8 sm:pb-16 sm:pt-10 lg:px-10">
        <div className="mb-3 hidden md:block">
          <ShelfNav depopUrl={depopUrl} />
        </div>

        <ProductPageNav
          productName={product.name}
          shopHref={shopHref}
          shopLabel={shopLabel}
        />

        <BentoPanel
          tone="cream"
          bordered
          starSeed={48}
          starCount={8}
          className="p-4 sm:p-6 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2 sm:items-start sm:gap-8">
            <ProductHeroImage product={product} />

            <div>
              <p className="bento-meta mt-0 text-base sm:text-lg">
                {isDepop ? "Listed on Depop 👗" : "Sisterle shop ✨"}
              </p>
              <h1 className="bento-title mt-2 text-2xl text-[#141414] sm:mt-2.5 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2.5 text-lg font-semibold text-[#141414] sm:mt-3 sm:text-xl">
                {formatMoney(product.priceCents, product.currency)}
              </p>
              {product.description ? (
                <p className="bento-copy">{product.description}</p>
              ) : (
                <p className="bento-copy">
                  A curated thrift and vintage find from {SITE_NAME}. One-of-one
                  piece — condition notes live with the listing photos.
                </p>
              )}

              <div className="bento-actions">
                <ProductPurchaseActions product={product} />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#444]/80 sm:mt-5">
                {isDepop
                  ? "This piece is mirrored here for browsing. Checkout happens on Depop."
                  : "Secure checkout is powered by Square. Shipping and tax are calculated at payment."}
              </p>
            </div>
          </div>
        </BentoPanel>

        <div className="mt-5 sm:mt-6">
          <Link href={shopHref} className="nav-pill inline-flex">
            ← Back to {isDepop ? "On Depop" : "Shop Sisterle"}
          </Link>
        </div>

        <SiteFooter
          depopUrl={depopUrl}
          email={CONTACT_EMAIL}
          uiforgeUrl={UIFORGE_URL}
          instagramUrl={getInstagramUrl()}
        />
      </div>
    </div>
  );
}
