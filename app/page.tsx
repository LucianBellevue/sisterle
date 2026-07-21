import Image from "next/image";
import { FloatingDots } from "@/components/FloatingDots";
import { SectionScrollSpy } from "@/components/SectionScrollSpy";
import { ShelfNav } from "@/components/ShelfNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { InfoSection } from "@/components/sections/InfoSection";
import { ShopSections } from "@/components/shop/ShopSections";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchStorefrontCatalog } from "@/lib/square/catalog";

export const dynamic = "force-dynamic";

const DEPOP_URL =
  process.env.NEXT_PUBLIC_DEPOP_URL?.trim() || "https://www.depop.com/";
const UIFORGE_URL = "https://uiforge.io/";
const CONTACT_EMAIL = "hello@sisterle.shop";
const LOGO_SRC = "/sisterle-logo.png";

export default async function Home() {
  const catalog = await fetchStorefrontCatalog();

  return (
    <div className="acid-wash-bg relative min-h-screen overflow-x-hidden">
      <FloatingDots />
      <SectionScrollSpy
        sectionIds={["info", "about", "shop", "depop", "contact"]}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 pb-16 pt-14 sm:px-10 sm:pt-20">
        <header className="mb-10 sm:mb-14">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#3d3d3d]/80">
                Thrift &amp; vintage shop
              </p>
              <div className="mb-5 inline-block rounded-2xl border border-black/15 bg-black p-3 shadow-[0_12px_32px_-18px_rgba(0,0,0,0.45)]">
                <Image
                  src={LOGO_SRC}
                  alt="Sisterle"
                  width={280}
                  height={80}
                  priority
                  className="h-auto w-[min(280px,85vw)]"
                />
              </div>
              <h1 className="sr-only">Sisterle</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2a2a2a]/90 sm:text-xl">
                Antique pieces, thrifted gems, and pre-loved fashion—buy on
                Sisterle or browse what we&apos;re also listing on Depop.
              </p>
            </div>

            <ShelfNav depopUrl={DEPOP_URL} />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-10 sm:gap-12">
          <InfoSection />
          <AboutSection />
          <ShopSections catalog={catalog} depopShopUrl={DEPOP_URL} />
          <ContactSection depopUrl={DEPOP_URL} email={CONTACT_EMAIL} />
        </main>

        <SiteFooter
          depopUrl={DEPOP_URL}
          email={CONTACT_EMAIL}
          uiforgeUrl={UIFORGE_URL}
        />
      </div>
    </div>
  );
}
