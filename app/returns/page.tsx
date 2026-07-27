import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { returnsPolicy } from "@/lib/legal/policies";

export const metadata: Metadata = {
  title: returnsPolicy.title,
  description: returnsPolicy.description,
  alternates: { canonical: "/returns" },
  robots: { index: true, follow: true },
};

export default function ReturnsPage() {
  return <LegalDocument policy={returnsPolicy} />;
}
