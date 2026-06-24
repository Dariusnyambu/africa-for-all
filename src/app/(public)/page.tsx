import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import ImpactSection from "@/components/home/ImpactSection";
import StoriesSection from "@/components/home/StoriesSection";
import PartnersSection from "@/components/home/PartnersSection";
import DonateCTASection from "@/components/home/DonateCTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProgramsSection />
      <ImpactSection />
      <StoriesSection />
      <PartnersSection />
      <DonateCTASection />
    </>
  );
}
