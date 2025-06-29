'use client'
import { Header } from "@/components/common/Header";
import { ProjectsHeroSection } from "@/components/feature/projects/ProjectsHeroSection";
import { ProjectsListSection } from "@/components/feature/projects/ProjectsListSection";
import { Footer } from "@/components/common/Footer";

export default function ProjectsPage() {
  return (
    <div 
      className="min-h-screen font-mono transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <Header />
      <main>
        <ProjectsHeroSection />
        <ProjectsListSection />
      </main>
      <Footer />
    </div>
  );
}