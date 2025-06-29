'use client'
import { Header } from "@/components/common/Header";
import { NewsDetailSection } from "@/components/feature/news/NewsDetailSection";
import { Footer } from "@/components/common/Footer";
import { useParams } from 'next/navigation';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div 
      className="min-h-screen font-mono transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <Header />
      <main>
        <NewsDetailSection slug={slug} />
      </main>
      <Footer />
    </div>
  );
}