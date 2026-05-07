import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--bg-base)] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
