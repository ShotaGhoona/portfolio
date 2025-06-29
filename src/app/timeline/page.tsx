'use client'
import { Header } from "@/components/common/Header";
import { TimelineHeroSection } from "@/components/feature/timeline/HeroSection";
import { DetailTimelineSection } from "@/components/feature/timeline/DetailTimelineSection";
import { BranchesSection } from "@/components/feature/timeline/BranchesSection";
import { Footer } from "@/components/common/Footer";

export default function TimelinePage() {
  return (
    <div 
      className="min-h-screen font-mono transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <Header />
      <main>
        <TimelineHeroSection />
        <DetailTimelineSection />
        <BranchesSection />
      </main>
      <Footer />
    </div>
  );
}