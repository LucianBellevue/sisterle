import Image from "next/image";
import { FloatingDots } from "@/components/FloatingDots";
import { SectionScrollSpy } from "@/components/SectionScrollSpy";
import { ShelfNav } from "@/components/ShelfNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { InfoSection } from "@/components/sections/InfoSection";
import { ShopSections } from "@/components/shop/ShopSections";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchStorefrontCatalog } from "@/lib/square/catalog";
import {
  buildItemListSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo/schema";
import {
  CONTACT_EMAIL,
  SITE_NAME,
  SITE_TAGLINE,
  getDepopShopUrl,
  getInstagramUrl,
} from "@/lib/site";

export const dynamic = "force-dynamic";

const UIFORGE_URL = "https://uiforge.io/";
const LOGO_SRC = "/sisterle-logo.png";

export default async function Home() {
  const catalog = await fetchStorefrontCatalog();
  const depopUrl = getDepopShopUrl();
  const allProducts = [...catalog.sisterle, ...catalog.depop];

  return (
    <div className="acid-wash-bg relative min-h-screen overflow-x-hidden">
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildWebSiteSchema()} />
      {allProducts.length > 0 ? (
        <JsonLd data={buildItemListSchema(allProducts)} />
      ) : null}

      <FloatingDots />
      <SectionScrollSpy
        sectionIds={["info", "about", "shop", "depop", "contact"]}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 pb-16 pt-14 sm:px-10 sm:pt-20">
        <header className="mb-10 sm:mb-14">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#3d3d3d]/80">
                {SITE_TAGLINE}
              </p>
              <div className="mb-5 inline-block rounded-2xl border border-black/15 bg-black p-3 shadow-[0_12px_32px_-18px_rgba(0,0,0,0.45)]">
                <Image
                  src={LOGO_SRC}
                  alt={`${SITE_NAME} logo`}
                  width={280}
                  height={80}
                  priority
                  className="h-auto w-[min(280px,85vw)]"
                />
              </div>
              <h1
                className="text-3xl font-semibold leading-tight text-[#141414] sm:text-4xl"
                style={{
                  fontFamily:
                    "var(--font-handmade), var(--font-fraunces), serif",
                }}
              >
                {SITE_NAME}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#2a2a2a]/90 sm:text-xl">
                Antique pieces, thrifted gems, and pre-loved fashion—buy
                one-of-one vintage on Sisterle or browse what we&apos;re also
                listing on Depop.
              </p>
            </div>

            <ShelfNav depopUrl={depopUrl} />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-10 sm:gap-12">
          <InfoSection />
          <AboutSection />
          <ShopSections catalog={catalog} depopShopUrl={depopUrl} />
          <ContactSection depopUrl={depopUrl} email={CONTACT_EMAIL} />
        </main>

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
