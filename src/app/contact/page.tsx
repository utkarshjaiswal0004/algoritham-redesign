import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { contactPage, siteSettings } from "@/sanity/content";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/SeoSchema";
import { ContactView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([siteSettings(), contactPage()]);
  return buildMetadata({
    site, page: page.seo, path: "/contact",
    fallbackTitle: "Contact — Get a Free IT Assessment",
  });
}

export default async function Page() {
  const [page, site] = await Promise.all([contactPage(), siteSettings()]);
  return (
    <PageLayout>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" },
      ]} />
      <ContactView page={page} site={site} />
    </PageLayout>
  );
}
