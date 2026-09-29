import Image from "next/image";
import { SITE_ASSETS, SITE_NAME } from "@/lib/site";

/** sisterle-logo.png — wide wordmark + tagline */
const LOGO_WIDTH = 1800;
const LOGO_HEIGHT = 720;

type BrandLogoProps = {
  /** Visual size preset */
  size?: "nav" | "hero" | "footer";
  priority?: boolean;
  className?: string;
  /** Decorative only when adjacent brand text is present */
  decorative?: boolean;
};

const SIZE = {
  /** Header / mobile bar — scale by height so aspect ratio stays correct */
  nav: {
    className: "h-9 w-auto max-w-none shrink-0 sm:h-10",
  },
  /** Hero — full wordmark readable */
  hero: {
    className:
      "h-auto w-[min(240px,78vw)] max-w-none shrink-0 sm:w-[min(280px,55vw)]",
  },
  /** Footer — same scaling rules as nav, slightly larger on desktop */
  footer: {
    className: "h-10 w-auto max-w-none shrink-0 sm:h-11",
  },
} as const;

/**
 * Sisterle wordmark — pink bubble logo on transparent.
 * Always scale with height or max-width + w-auto; never fixed width-only boxes.
 */
export function BrandLogo({
  size = "nav",
  priority = false,
  className = "",
  decorative = false,
}: BrandLogoProps) {
  const dims = SIZE[size];

  return (
    <Image
      src={SITE_ASSETS.logo}
      alt={decorative ? "" : `${SITE_NAME} logo`}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={[dims.className, "object-contain object-left", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
