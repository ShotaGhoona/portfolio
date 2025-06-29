import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import projectsTranslations from '@/data/translations/projects.json';
import Link from 'next/link';

interface ProjectsDetailSectionProps {
  slug: string;
}

export function ProjectsDetailSection({ slug }: ProjectsDetailSectionProps) {
  const { language } = useLanguage();
  const [projectsData, setProjectsData] = useState(projectsTranslations[language] || projectsTranslations.en);

  useEffect(() => {
    setProjectsData(projectsTranslations[language] || projectsTranslations.en);
  }, [language]);

  const project = projectsData.projects?.find(item => item.slug === slug);

  if (!project) {
    return (
      <div className="w-full py-24 text-center">
        <div className="font-mono text-lg" style={{ color: 'var(--color-text-primary)' }}>
          Repository not found
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

  const relatedProjects = projectsData.projects
    ?.filter(item => item.slug !== slug && item.tech?.some(tech => project?.tech?.includes(tech)))
    ?.slice(0, 3) || [];

  return (
    <div 
      className="w-full py-24 transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-8">
        {/* Back navigation */}
        <div className="mb-8">
          <Link 
            href="/projects"
            className="font-mono text-sm flex items-center gap-2 transition-colors duration-200 hover:opacity-80"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <span style={{ color: 'var(--color-accent-green)' }}>←</span>
            cd ../projects
          </Link>
        </div>

        {/* Project header */}
        <div 
          className="border mb-8 transition-colors duration-200"
          style={{ 
            borderColor: 'var(--color-border-primary)',
            backgroundColor: 'var(--color-bg-secondary)'
          }}
        >
          <div 
            className="px-4 py-2 border-b font-mono text-xs flex items-center justify-between transition-colors duration-200"
            style={{ 
              backgroundColor: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span style={{ color: 'var(--color-text-secondary)' }}>
                git clone project_{project?.id}.git
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span 
                className="px-2 py-1"
                style={{ 
                  color: getStatusColor(project?.status || 'Development'),
                  backgroundColor: 'var(--color-bg-secondary)'
                }}
              >
                [{project?.status?.toUpperCase()}]
              </span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>
                {project?.year}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <div 
                className="font-mono text-sm mb-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {project?.type}
              </div>
              <h1 
                className="font-mono font-bold text-3xl mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {project?.name}
              </h1>
              <p 
                className="font-mono text-lg"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {project?.description}
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project?.tech?.map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs font-mono transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'var(--color-bg-primary)',
                    color: 'var(--color-text-primary)',
                    border: `1px solid var(--color-border-secondary)`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Key metrics */}
            <div className="flex items-center gap-6 font-mono text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {project?.metrics?.map((metric, index) => (
                <span key={index}>{metric}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Project Images */}
        <div 
          className="border mb-8 transition-colors duration-200"
          style={{ 
            borderColor: 'var(--color-border-primary)',
            backgroundColor: 'var(--color-bg-secondary)'
          }}
        >
          <div 
            className="px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
            style={{ 
              backgroundColor: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)'
            }}
          >
            <span style={{ color: 'var(--color-text-secondary)' }}>
              // Project screenshots and architecture diagrams
            </span>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div 
                className="border transition-colors duration-200"
                style={{ borderColor: 'var(--color-border-primary)' }}
              >
                <img 
                  src={`https://picsum.photos/800/500?random=${project.id}1`}
                  alt={`${project?.name} - Main Interface`}
                  className="w-full h-auto"
                  style={{ filter: 'grayscale(20%) contrast(1.1)' }}
                />
              </div>
              <div 
                className="border transition-colors duration-200"
                style={{ borderColor: 'var(--color-border-primary)' }}
              >
                <img 
                  src={`https://picsum.photos/800/500?random=${project.id}2`}
                  alt={`${project?.name} - Architecture Diagram`}
                  className="w-full h-auto"
                  style={{ filter: 'grayscale(20%) contrast(1.1)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        {project?.technicalDetails && (
          <div 
            className="border mb-8 transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            <div 
              className="px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)'
              }}
            >
              <span style={{ color: 'var(--color-text-secondary)' }}>
                // Technical specifications and implementation details
              </span>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(project?.technicalDetails || {}).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-4">
                    <div 
                      className="font-mono text-sm font-bold min-w-[140px]"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                    </div>
                    <div 
                      className="font-mono text-sm"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {String(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        {project?.performanceMetrics && (
          <div 
            className="border mb-8 transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            <div 
              className="px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)'
              }}
            >
              <span style={{ color: 'var(--color-text-secondary)' }}>
                // Performance benchmarks and system metrics
              </span>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(project?.performanceMetrics || {}).map(([key, value]) => (
                  <div 
                    key={key}
                    className="border p-4 transition-colors duration-200"
                    style={{ 
                      borderColor: 'var(--color-border-primary)',
                      backgroundColor: 'var(--color-bg-primary)'
                    }}
                  >
                    <div 
                      className="font-mono text-xs mb-1"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      {key.replace(/_/g, ' ').toUpperCase()}
                    </div>
                    <div 
                      className="font-mono font-bold text-lg"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {String(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Links */}
        {project?.links && project.links.length > 0 && (
          <div 
            className="border mb-8 transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            <div 
              className="px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)'
              }}
            >
              <span style={{ color: 'var(--color-text-secondary)' }}>
                // Repository links and documentation
              </span>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                {project?.links?.map((link, index) => (
                  <a 
                    key={index}
                    href={link?.url || '#'}
                    className="block font-mono text-sm transition-colors duration-200 hover:opacity-80"
                    style={{ color: 'var(--color-accent-green)' }}
                  >
                    → {link?.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div 
            className="border transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            <div 
              className="px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)'
              }}
            >
              <span style={{ color: 'var(--color-text-secondary)' }}>
                // Related repositories with similar tech stack
              </span>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {relatedProjects.map((relatedProject, index) => (
                  <Link 
                    key={index}
                    href={`/projects/${relatedProject?.slug}`}
                    className="block font-mono text-sm transition-colors duration-200 hover:opacity-80"
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ color: 'var(--color-accent-green)' }}>→</span>
                      <span style={{ color: 'var(--color-text-primary)' }}>
                        {relatedProject?.name}
                      </span>
                      <span 
                        className="text-xs"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        ({relatedProject?.type} - {relatedProject?.year})
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}