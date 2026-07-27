"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getAnalyticsConsent } from "@/components/CookieConsent";

export function AnalyticsGate() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!gaId) return;

    const sync = () => setAllowed(getAnalyticsConsent() === "accepted");
    sync();
    window.addEventListener("sisterle-consent-change", sync);
    return () => window.removeEventListener("sisterle-consent-change", sync);
  }, [gaId]);

  if (!gaId || !allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
