import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { servicesPage, services as getServices, siteSettings } from "@/sanity/content";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/SeoSchema";
import { ServicesView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([siteSettings(), servicesPage()]);
  return buildMetadata({
    site, page: page.seo, path: "/services",
    fallbackTitle: "Services — End-to-End IT Managed Services",
  });
}

export default async function Page() {
  const [page, services] = await Promise.all([servicesPage(), getServices()]);
  return (
    <PageLayout>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
      ]} />
      <ServicesView page={page} services={services} />
    </PageLayout>
  );
}
