import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { navigation as getNavigation, footer as getFooter, siteSettings as getSite } from "@/sanity/content";

export async function PageLayout({ children }: { children: React.ReactNode }) {
  const [navigation, footer, site] = await Promise.all([
    getNavigation(), getFooter(), getSite(),
  ]);
  return (
    <div className="bg-[var(--bg-base)] min-h-screen flex flex-col">
      <Navbar navigation={navigation} site={site} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer footer={footer} site={site} />
    </div>
  );
}
