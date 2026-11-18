import type { LegalDocument } from "@/content/legal";
import { legalNotice } from "@/content/legal";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

type LegalDocumentPageProps = {
  document: LegalDocument;
};

export function LegalDocumentPage({ document }: LegalDocumentPageProps) {
  return (
    <>
      <PageHero title={document.title} tone="light" align="center" titleVariant="page" />

      <section className="bg-surface">
        <Container className="py-8 pb-16 sm:py-10 sm:pb-20">
          <Breadcrumbs items={[{ label: "Legal" }, { label: document.title }]} />

          <div className="mx-auto mt-8 max-w-3xl">
            <p className="border-border bg-bg text-text-muted rounded-2xl border px-5 py-4 text-xs leading-relaxed">
              {legalNotice}
            </p>

            <p className="text-text-body mt-8 text-base leading-[1.85] font-light">
              {document.intro}
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {document.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-primary-dark text-xl font-semibold">{section.heading}</h2>
                  <p className="text-text-muted mt-3 text-sm leading-[1.85]">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
