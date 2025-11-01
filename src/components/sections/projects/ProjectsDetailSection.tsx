'use client';

import { useLanguage } from '@/hooks/useLanguage';
import projectsData from '@/data/translations/projects.json';
import Link from 'next/link';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { TechIcon } from '@/components/ui/TechIcon';

interface ProjectsDetailSectionProps {
  slug: string;
}

export function ProjectsDetailSection({ slug }: ProjectsDetailSectionProps) {
  const { language } = useLanguage();
  const projects = projectsData[language] || projectsData.en;

  const project = projects?.find(item => item.slug === slug);

  if (!project) {
    return (
      <div className="w-full py-16 md:py-24 text-center">
        <div className="font-mono text-base sm:text-lg" style={{ color: 'var(--color-text-primary)' }}>
          {language === 'ja' ? 'リポジトリが見つかりません' : 'Repository not found'}
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Production':
        return 'var(--color-accent-green)';
      case 'Internal':
        return '#f59e0b';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const relatedProjects = projects
    ?.filter(item => item.slug !== slug && item.tech?.some(tech => project?.tech?.some(pTech => pTech.icon === tech.icon)))
    ?.slice(0, 3) || [];

  return (
    <div
      className="w-full py-16 md:py-32 relative transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Metadata Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 mb-16 md:mb-24">
          {/* Left - Navigation & Meta */}
          <div className="col-span-1 md:col-span-2">
            <div className="md:pr-8 space-y-4">
              <Link
                href="/projects"
                className="font-mono text-xs flex items-center gap-2 transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span style={{ color: 'var(--color-accent-green)' }}>←</span>
                cd ../projects
              </Link>

              <div className="space-y-2">
                <div
                  className="font-mono text-xs px-2 py-1 inline-block"
                  style={{
                    color: getStatusColor(project?.status || 'Development'),
                    backgroundColor: 'var(--color-bg-secondary)'
                  }}
                >
                  {project?.status?.toUpperCase()}
                </div>
                <div
                  className="font-mono text-xs"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  {project?.year}
                </div>
              </div>
            </div>
          </div>

          {/* Center - Main Info */}
          <div className="col-span-1 md:col-span-8">
            <div className="md:px-8">
              <div
                className="font-mono text-xs mb-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {project?.slug}
              </div>
              <h1
                className="font-mono font-bold text-3xl md:text-4xl lg:text-5xl mb-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {project?.name}
              </h1>
              <div
                className="font-mono text-sm mb-4"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {project?.type}
              </div>
              <p
                className="font-mono text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {project?.description}
              </p>
            </div>
          </div>

          {/* Right - Metrics */}
          <div
            className="col-span-1 md:col-span-2 md:border-l transition-colors duration-200"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="md:pl-8 md:sticky md:top-32">
              {project?.metrics && project.metrics.length > 0 && (
                <div>
                  <div
                    className="font-mono text-xs mb-3"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    Metrics
                  </div>
                  <div className="space-y-2">
                    {project.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="font-mono text-xs"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        • {metric}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pictures Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 mb-16 md:mb-24">
          <div className="col-span-1 md:col-span-12">
            <div className="grid grid-cols-1 gap-8">
              <div className="overflow-hidden transition-all duration-200 hover:opacity-90">
                <img
                  src={`/images/projects/${project.slug}/1.png`}
                  alt={`${project?.name} - Main Interface`}
                  className="w-full h-auto transition-transform duration-200 hover:scale-105"
                  style={{ filter: 'grayscale(10%) contrast(1.05)' }}
                />
              </div>
              <div className="overflow-hidden transition-all duration-200 hover:opacity-90">
                <img
                  src={`/images/projects/${project.slug}/2.png`}
                  alt={`${project?.name} - Architecture Diagram`}
                  className="w-full h-auto transition-transform duration-200 hover:scale-105"
                  style={{ filter: 'grayscale(10%) contrast(1.05)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left - Empty */}
          <div className="col-span-1 md:col-span-2">
            <div className="md:pr-8"></div>
          </div>

          {/* Center - Detailed Description & Technical Details */}
          <div className="col-span-1 md:col-span-8">
            <div className="md:px-8">
              {project?.detailedDescription && (
                <div className="mb-16">
                  <div
                    className="font-mono text-xs mb-6"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    {language === 'ja'
                      ? '// プロジェクト詳細'
                      : '// Project Details'
                    }
                  </div>
                  <div
                    className="font-mono text-sm md:text-base leading-relaxed space-y-6"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {project.detailedDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Details */}
              {project?.technicalDetails && (
                <div>
                  <div
                    className="font-mono text-xs mb-6"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    {language === 'ja'
                      ? '// 技術仕様'
                      : '// Technical Specifications'
                    }
                  </div>
                  <div className="space-y-6">
                    {Object.entries(project.technicalDetails).map(([key, value]) => (
                      <div key={key}>
                        <div
                          className="font-mono text-sm font-bold mb-2"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                        <div
                          className="font-mono text-sm leading-relaxed"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {String(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - Tech Stack */}
          <div
            className="col-span-1 md:col-span-2 md:border-l transition-colors duration-200"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="md:pl-8 md:sticky md:top-32">
              <div
                className="font-mono text-xs mb-3"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                Tech Stack
              </div>
              <div className="space-y-3">
                {project?.tech?.map((tech, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <TechIcon
                      icon={tech.icon}
                      label={tech.label}
                    />
                    <span
                      className="font-mono text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {tech.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GridOverlay/>
    </div>
  );
}