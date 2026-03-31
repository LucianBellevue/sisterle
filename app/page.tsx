import { FloatingDots } from "@/components/FloatingDots";
import { SectionScrollSpy } from "@/components/SectionScrollSpy";
import { ShelfNav } from "@/components/ShelfNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { InfoSection } from "@/components/sections/InfoSection";
import { SiteFooter } from "@/components/SiteFooter";

const DEPOP_URL = "https://www.depop.com/";
const UIFORGE_URL = "https://uiforge.io/";
const CONTACT_EMAIL = "hello@sisterle.shop";

export default function Home() {
  return (
    <div className="acid-wash-bg relative min-h-screen overflow-x-hidden">
      <FloatingDots />
      <SectionScrollSpy sectionIds={["info", "about", "featured", "contact"]} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 pb-16 pt-14 sm:px-10 sm:pt-20">
        <header className="mb-10 sm:mb-14">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#3d3d3d]/80">
                Depop storefront
              </p>
              <h1
                className="text-5xl font-medium leading-[0.95] tracking-tight text-[#141414] sm:text-7xl sm:leading-[0.92]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Sisterle
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2a2a2a]/90 sm:text-xl">
                Antique pieces, thrifted gems, and pre-loved fashion—curated
                like a Depop closet you&apos;d actually want to scroll forever.
              </p>
            </div>

            <ShelfNav depopUrl={DEPOP_URL} />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-10 sm:gap-12">
          <InfoSection />
          <AboutSection />
          <FeaturedSection depopUrl={DEPOP_URL} />
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
