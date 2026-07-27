import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { termsOfService } from "@/lib/legal/policies";

export const metadata: Metadata = {
  title: termsOfService.title,
  description: termsOfService.description,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <LegalDocument policy={termsOfService} />;
}
