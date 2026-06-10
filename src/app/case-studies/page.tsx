import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { caseStudiesPg, caseStudies as getCases, siteSettings } from "@/sanity/content";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/SeoSchema";
import { CaseStudiesView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([siteSettings(), caseStudiesPg()]);
  return buildMetadata({
    site, page: page.seo, path: "/case-studies",
    fallbackTitle: "Case Studies — Measurable IT Outcomes",
  });
}

export default async function Page() {
  const [page, cases] = await Promise.all([caseStudiesPg(), getCases()]);
  return (
    <PageLayout>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Case Studies", url: "/case-studies" },
      ]} />
      <CaseStudiesView page={page} cases={cases} />
    </PageLayout>
  );
}
