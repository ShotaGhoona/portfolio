'use client'
import { Header } from "@/components/common/Header";
import { ProjectsDetailSection } from "@/components/feature/projects/ProjectsDetailSection";
import { Footer } from "@/components/common/Footer";
import { useParams } from 'next/navigation';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div 
      className="min-h-screen font-mono transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <Header />
      <main>
        <ProjectsDetailSection slug={slug} />
      </main>
      <Footer />
    </div>
  );
}