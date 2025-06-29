'use client'
import { Header } from "@/components/common/Header";
import { HeroSection } from "@/components/feature/lp/HeroSection";
import { PhilosophySection } from "@/components/feature/lp/PhilosophySection";
import { ProjectsSection } from "@/components/feature/lp/ProjectsSection";
import { ExpertiseSection } from "@/components/feature/lp/ExpertiseSection";
import { TimelineSection } from "@/components/feature/lp/TimelineSection";
import { NewsSection } from "@/components/feature/lp/NewsSection";
import { ContactSection } from "@/components/feature/lp/ContactSection";
import { Footer } from "@/components/common/Footer";

export default function MinimalismPage02() {
  return (
    <div 
      className="min-h-screen font-mono transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <Header />
      <main>
        <HeroSection />
        <PhilosophySection />
        <ProjectsSection />
        <ExpertiseSection />
        <TimelineSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}