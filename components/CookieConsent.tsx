"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const CONSENT_KEY = "sisterle-analytics-consent";

export type AnalyticsConsent = "accepted" | "declined" | null;

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

function setAnalyticsConsent(value: AnalyticsConsent) {
  if (typeof window === "undefined" || !value) return;
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event("sisterle-consent-change"));
}

function subscribe(listener: () => void) {
  window.addEventListener("sisterle-consent-change", listener);
  return () => window.removeEventListener("sisterle-consent-change", listener);
}

function getNeedsBanner() {
  return getAnalyticsConsent() === null;
}

function getServerNeedsBanner() {
  return false;
}

export function CookieConsent() {
  const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID?.trim());
  const needsBanner = useSyncExternalStore(
    subscribe,
    getNeedsBanner,
    getServerNeedsBanner,
  );

  if (!gaEnabled || !needsBanner) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-[calc(var(--mobile-bottom)+env(safe-area-inset-bottom,0px))] z-[45] border-t border-black/15 bg-[#fff8fa]/95 p-4 shadow-[0_-12px_40px_-18px_rgba(0,0,0,0.35)] backdrop-blur-md md:bottom-0 sm:p-5"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-[#222]/90">
          We use optional analytics cookies to understand traffic and improve
          the shop. See our{" "}
          <Link href="/privacy" className="font-semibold underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAnalyticsConsent("declined")}
            className="inline-flex h-10 items-center justify-center rounded-full border border-black/15 bg-white/80 px-5 text-sm font-semibold text-[#141414] transition hover:bg-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setAnalyticsConsent("accepted")}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#141414] px-5 text-sm font-semibold text-(--salmon) transition hover:bg-black"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
