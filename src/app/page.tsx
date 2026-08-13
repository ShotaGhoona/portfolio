'use client'
import { Header } from "@/components/common/Header";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { PhilosophySection } from "@/components/sections/home/PhilosophySection";
import { ProjectsSection } from "@/components/sections/home/ProjectsSection";
import { ExpertiseSection } from "@/components/sections/home/ExpertiseSection";
import { TimelineSection } from "@/components/sections/home/TimelineSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
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
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}