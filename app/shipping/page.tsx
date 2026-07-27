import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { shippingPolicy } from "@/lib/legal/policies";

export const metadata: Metadata = {
  title: shippingPolicy.title,
  description: shippingPolicy.description,
  alternates: { canonical: "/shipping" },
  robots: { index: true, follow: true },
};

export default function ShippingPage() {
  return <LegalDocument policy={shippingPolicy} />;
}
