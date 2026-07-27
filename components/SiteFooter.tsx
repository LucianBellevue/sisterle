import Image from "next/image";
import Link from "next/link";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { LEGAL_ROUTES } from "@/lib/legal/policies";

type SiteFooterProps = {
  depopUrl: string;
  email: string;
  uiforgeUrl: string;
  instagramUrl?: string | null;
};

const LOGO_SRC = "/sisterle-logo.png";

export function SiteFooter({
  depopUrl,
  email,
  uiforgeUrl,
  instagramUrl,
}: SiteFooterProps) {
  return (
    <footer className="mt-10 sm:mt-14">
      <BentoPanel tone="cream" className="p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="inline-block rounded-xl border border-black/15 bg-black p-2">
                <Image
                  src={LOGO_SRC}
                  alt="Sisterle logo"
                  width={160}
                  height={46}
                  className="h-auto w-[140px] sm:w-[160px]"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={depopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-title rounded-full bg-[var(--panel-pink)] px-3 py-1.5 text-sm"
                >
                  Depop 👗
                </a>
                {instagramUrl ? (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-title rounded-full bg-[var(--panel-blue)] px-3 py-1.5 text-sm"
                  >
                    Instagram 📸
                  </a>
                ) : null}
                <a
                  href={`mailto:${email}`}
                  className="bento-title rounded-full bg-[var(--panel-yellow)] px-3 py-1.5 text-sm"
                >
                  Email ✉️
                </a>
                <a
                  href={uiforgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-title rounded-full bg-white/80 px-3 py-1.5 text-sm"
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
                className="font-semibold text-[#141414]/80 underline-offset-2 hover:text-[#141414] hover:underline"
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
