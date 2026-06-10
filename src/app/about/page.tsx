import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { aboutPage, siteSettings, certifications as getCerts } from "@/sanity/content";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/SeoSchema";
import { AboutView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([siteSettings(), aboutPage()]);
  return buildMetadata({
    site, page: page.seo, path: "/about",
    fallbackTitle: "About — National IT Integrator Since 2009",
  });
}

export default async function Page() {
  const [page, site, certs] = await Promise.all([aboutPage(), siteSettings(), getCerts()]);
  return (
    <PageLayout>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ]} />
      <AboutView page={page} site={site} certifications={certs} />
    </PageLayout>
  );
}
