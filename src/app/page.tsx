import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { EventGallery } from "@/components/sections/EventGallery";
import { Certifications } from "@/components/sections/Certifications";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

// Deactivated for now (redundant content) — easy to re-enable later:
//   import { TechStack } from "@/components/sections/TechStack";
//   import { Gallery }   from "@/components/sections/Gallery";

export default function Home() {
  return (
    <main className="bg-[var(--bg-base)] min-h-screen">
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <HowItWorks />
      <Infrastructure />
      {/* <TechStack />  ← duplicates TrustBar partner row + Certifications */}
      <CaseStudies />
      <Testimonials />
      {/* <Gallery /> ← achievements duplicate TrustBar stats + Certifications */}
      <EventGallery />
      <Certifications />
      <CTA />
      <Footer />
    </main>
  );
}
