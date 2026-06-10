import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { industriesPage, industries as getIndustries, siteSettings } from "@/sanity/content";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/SeoSchema";
import { IndustriesView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([siteSettings(), industriesPage()]);
  return buildMetadata({
    site, page: page.seo, path: "/industries",
    fallbackTitle: "Industries — Sector-Specific IT Solutions Across India",
  });
}

export default async function Page() {
  const [page, industries] = await Promise.all([industriesPage(), getIndustries()]);
  return (
    <PageLayout>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Industries", url: "/industries" },
      ]} />
      <IndustriesView page={page} industries={industries} />
    </PageLayout>
  );
}
