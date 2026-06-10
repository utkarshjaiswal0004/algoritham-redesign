import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { missionVisionPage, siteSettings } from "@/sanity/content";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/SeoSchema";
import { MissionVisionView } from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([siteSettings(), missionVisionPage()]);
  return buildMetadata({
    site, page: page.seo, path: "/mission-vision",
    fallbackTitle: "Mission & Vision — Why Algoritham Exists",
    fallbackDescription: "The mission, vision, and operating principles behind Algoritham Infrastructure — India's IT partner since 2009.",
  });
}

export default async function Page() {
  const page = await missionVisionPage();
  return (
    <PageLayout>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Mission & Vision", url: "/mission-vision" },
      ]} />
      <MissionVisionView page={page} />
    </PageLayout>
  );
}
