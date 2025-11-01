'use client'
import { Header } from "@/components/common/Header";
import { NewsHeroSection } from "@/components/sections/news/NewsHeroSection";
import { NewsListSection } from "@/components/sections/news/NewsListSection";
import { Footer } from "@/components/common/Footer";

export default function NewsPage() {
  return (
    <div 
      className="min-h-screen font-mono transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <Header />
      <main>
        <NewsHeroSection />
        <NewsListSection />
      </main>
      <Footer />
    </div>
  );
}