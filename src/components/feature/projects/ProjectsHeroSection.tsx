import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import projectsTranslations from '@/data/translations/projects.json';

export function ProjectsHeroSection() {
  const { language } = useLanguage();
  const [projectsData, setProjectsData] = useState(projectsTranslations[language] || projectsTranslations.en);

  useEffect(() => {
    setProjectsData(projectsTranslations[language] || projectsTranslations.en);
  }, [language]);

  return (
    <section 
      className="w-full py-32 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main content */}
          <div className="col-span-8">
            <div className="mb-8">
              <div 
                className="font-mono text-sm mb-4"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                ~/portfolio/projects $ ls -la --recursive
              </div>
              <h1 
                className="font-mono font-black text-5xl mb-6"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {projectsData.detailPage?.title || 'Project Archive'}
              </h1>
              <p 
                className="font-mono text-lg mb-8"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {projectsData.detailPage?.subtitle || 'Technical showcase and code repositories'}
              </p>
              <p 
                className="font-mono text-sm leading-relaxed max-w-3xl"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {projectsData.detailPage?.description || 'Comprehensive view of technical projects, system architectures, and development achievements.'}
              </p>
            </div>

            {/* Repository simulation */}
            <div 
              className="border transition-colors duration-200"
              style={{ 
                borderColor: 'var(--color-border-primary)',
                backgroundColor: 'var(--color-bg-secondary)'
              }}
            >
              <div 
                className="px-4 py-2 border-b font-mono text-xs flex items-center gap-3 transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)'
                }}
              >
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  Project Repository — Production deployments
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span style={{ color: 'var(--color-text-secondary)' }}>ACTIVE</span>
                </div>
              </div>
              
              <div className="p-4 font-mono text-sm space-y-1">
                <div style={{ color: 'var(--color-text-primary)' }}>
                  <span style={{ color: 'var(--color-accent-green)' }}>$ find . -name "*.prod" -type f</span>
                </div>
                {projectsData.projects.slice(0, 3).map((project, index) => (
                  <div key={index} style={{ color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>
                      ./projects/{project.name.toLowerCase().replace(/\s+/g, '_')}/
                    </span>
                    <span style={{ 
                      color: project.status === 'Production' ? 'var(--color-accent-green)' : 
                             project.status === 'Internal' ? '#f59e0b' : 'var(--color-text-secondary)'
                    }}>
                      [{project.status.toUpperCase()}]
                    </span>{' '}
                    {project.type} - {project.year}
                  </div>
                ))}
                <div style={{ color: 'var(--color-text-tertiary)' }}>
                  ... found {projectsData.projects.length} active projects
                </div>
              </div>
            </div>
          </div>

          {/* Project stats sidebar */}
          <div className="col-span-4">
            <div 
              className="border transition-colors duration-200"
              style={{ 
                borderColor: 'var(--color-border-primary)',
                backgroundColor: 'var(--color-bg-secondary)'
              }}
            >
              <div 
                className="px-4 py-3 border-b transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)'
                }}
              >
                <div 
                  className="font-mono text-sm font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Repository Stats
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Project counts by type */}
                <div className="space-y-3">
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Total Projects:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{projectsData.projects.length}</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>System Architecture:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>
                      {projectsData.projects.filter(project => project.type === 'System Architecture').length}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Backend Infrastructure:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>
                      {projectsData.projects.filter(project => project.type === 'Backend Infrastructure').length}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Machine Learning:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>
                      {projectsData.projects.filter(project => project.type === 'Machine Learning').length}
                    </span>
                  </div>
                </div>

                {/* Status distribution */}
                <div 
                  className="pt-4 border-t transition-colors duration-200"
                  style={{ borderColor: 'var(--color-border-secondary)' }}
                >
                  <div 
                    className="font-mono text-xs mb-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Deployment Status:
                  </div>
                  <div className="space-y-2">
                    {['Production', 'Internal', 'Development'].map((status) => {
                      const count = projectsData.projects.filter(project => project.status === status).length;
                      const color = status === 'Production' ? 'var(--color-accent-green)' :
                                   status === 'Internal' ? '#f59e0b' : 'var(--color-text-secondary)';
                      
                      return (
                        <div key={status} className="flex items-center gap-2 font-mono text-xs">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span style={{ color: 'var(--color-text-primary)' }}>{status}</span>
                          <span style={{ color: 'var(--color-text-secondary)' }}>({count})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tech stack summary */}
                <div 
                  className="pt-4 border-t transition-colors duration-200"
                  style={{ borderColor: 'var(--color-border-secondary)' }}
                >
                  <div 
                    className="font-mono text-xs mb-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Tech Stack:
                  </div>
                  <div className="space-y-1">
                    {/* Get unique tech from all projects */}
                    {Array.from(new Set(projectsData.projects.flatMap(p => p.tech))).slice(0, 6).map((tech) => (
                      <div key={tech} className="flex items-center gap-2 font-mono text-xs">
                        <span style={{ color: 'var(--color-accent-green)' }}>●</span>
                        <span style={{ color: 'var(--color-text-primary)' }}>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}