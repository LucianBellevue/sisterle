import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { LEGAL_ROUTES } from "@/lib/legal/policies";

type SiteFooterProps = {
  depopUrl: string;
  email: string;
  uiforgeUrl: string;
  instagramUrl?: string | null;
};

export function SiteFooter({
  depopUrl,
  email,
  uiforgeUrl,
  instagramUrl,
}: SiteFooterProps) {
  return (
    <footer className="mt-6 sm:mt-14">
      <BentoPanel tone="cream" starSeed={41} starCount={8} className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-5">
              <Link
                href="/"
                className="inline-flex shrink-0 self-start transition hover:opacity-90"
                aria-label="Sisterle home"
              >
                <BrandLogo size="footer" />
              </Link>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <a
                  href={depopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-pill bg-[var(--panel-pink)]"
                >
                  Depop 👗
                </a>
                {instagramUrl ? (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-pill bg-[var(--panel-blue)]"
                  >
                    Instagram 📸
                  </a>
                ) : null}
                <a
                  href={`mailto:${email}`}
                  className="nav-pill bg-[var(--panel-yellow)]"
                >
                  Email ✉️
                </a>
                <a
                  href={uiforgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-pill"
                >
                  Powered by UiForge
                </a>
              </div>
            </div>

            <p className="text-sm text-[#333]/75">
              © {new Date().getFullYear()} Sisterle. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-black/10 pt-4 text-xs sm:text-sm">
            {LEGAL_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="inline-flex min-h-10 items-center font-semibold text-[#141414]/80 underline-offset-2 hover:text-[#141414] hover:underline"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </BentoPanel>
    </footer>
  );
}
