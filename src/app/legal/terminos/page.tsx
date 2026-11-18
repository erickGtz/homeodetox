import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/layout/legal-document";
import { legalDocuments } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

const document = legalDocuments.terminos;

export const metadata: Metadata = {
  ...buildMetadata({
    title: document.seo.title,
    description: document.seo.description,
    path: `/legal/${document.slug}`,
  }),
  robots: { index: false, follow: true },
};

export default function TerminosPage() {
  return <LegalDocumentPage document={document} />;
}
