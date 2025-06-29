import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import projectsTranslations from '@/data/translations/projects.json';
import Link from 'next/link';

export function ProjectsSection() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState(projectsTranslations[language]?.projects || projectsTranslations.en.projects);

  useEffect(() => {
    setProjects(projectsTranslations[language]?.projects || projectsTranslations.en.projects);
  }, [language]);
  return (
    <section 
      id="projects"
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Section header */}
          <div 
            className="col-span-1 md:col-span-3 px-4 md:px-8 pb-8 md:pb-0 md:border-r"
            style={{ borderColor: 'var(--color-border-secondary)' }}
          >
            <div className="md:sticky md:top-40">
              <div 
                className="font-mono font-black text-xl md:text-2xl mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                02.
              </div>
              <h2 
                className="font-mono font-black text-lg md:text-xl mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {projectsTranslations[language]?.sectionTitle || projectsTranslations.en.sectionTitle}
              </h2>
              <div 
                className="font-mono text-xs mb-6 md:mb-0"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <div>{`// ${projectsTranslations[language]?.subtitle.line1 || projectsTranslations.en.subtitle.line1}`}</div>
                <div>{`// ${projectsTranslations[language]?.subtitle.line2 || projectsTranslations.en.subtitle.line2}`}</div>
              </div>
            </div>
          </div>
          
          {/* Projects list */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            <div className="space-y-12">
              {projects.slice(0, 3).map((project, index) => (
                <div 
                  key={index} 
                  className="pb-12 last:border-0 transition-colors duration-200"
                  style={{ borderBottom: index < projects.length - 1 ? `1px solid var(--color-border-primary)` : 'none' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                    {/* Project meta */}
                    <div className="col-span-1 md:col-span-3">
                      <div 
                        className="font-mono text-sm md:space-y-1 flex flex-row md:flex-col gap-2 items-center justify-between md:justify-start md:items-start"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        <div>PROJECT_{project.id}</div>
                        <div>{project.year}</div>
                        <div className="hidden md:block text-xs">{project.type}</div>
                        <div 
                          className="text-xs hidden md:block px-2 py-1 inline-block md:mt-2 transition-colors duration-200"
                          style={{
                            backgroundColor: project.status === 'Production' 
                              ? 'var(--color-accent-green)' 
                              : 'var(--color-bg-secondary)',
                            color: project.status === 'Production'
                              ? 'var(--color-bg-primary)'
                              : 'var(--color-text-primary)'
                          }}
                        >
                          {project.status}
                        </div>
                      </div>
                    </div>
                    
                    {/* Project details */}
                    <div className="col-span-1 md:col-span-9 space-y-4">
                      {/* Project Images */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div 
                          className="aspect-[16/10] overflow-hidden border transition-all duration-200 hover:opacity-90"
                          style={{ borderColor: 'var(--color-border-primary)' }}
                        >
                          <img 
                            src={`https://picsum.photos/800/500?random=${index * 2 + 1}`}
                            alt={`${project.name} interface screenshot`}
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            style={{ filter: 'grayscale(20%) contrast(1.1)' }}
                          />
                        </div>
                        <div 
                          className="aspect-[16/10] overflow-hidden border transition-all duration-200 hover:opacity-90"
                          style={{ borderColor: 'var(--color-border-primary)' }}
                        >
                          <img 
                            src={`https://picsum.photos/800/500?random=${index * 2 + 2}`}
                            alt={`${project.name} dashboard view`}
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            style={{ filter: 'grayscale(20%) contrast(1.1)' }}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 
                          className="font-mono font-bold text-xl mb-2"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {project.name}
                        </h3>
                        <p 
                          className="font-mono text-sm leading-relaxed"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {project.description}
                        </p>
                      </div>
                      
                      {/* Tech stack */}
                      <div>
                        <div 
                          className="font-mono text-xs mb-2"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {`// Tech Stack`}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className="font-mono text-xs px-3 py-1 transition-colors duration-200"
                              style={{ 
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-text-primary)'
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Metrics */}
                      <div className="hidden md:block">
                        <div 
                          className="font-mono text-xs mb-2"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {`// Key Metrics`}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {project.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="font-mono text-xs">
                              <span 
                                className="font-bold"
                                style={{ color: 'var(--color-text-primary)' }}
                              >{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-4 pt-2">
                        <Link 
                          href="/projects"
                          className="font-mono text-xs transition-colors duration-200 hover:opacity-80"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {projectsTranslations[language]?.buttons.technicalDetails || projectsTranslations.en.buttons.technicalDetails} →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* More projects link */}
              <div 
                className="pt-8 transition-colors duration-200"
                style={{ borderTop: `1px solid var(--color-border-primary)` }}
              >
                <Link 
                  href="/projects"
                  className="font-mono font-bold text-sm px-6 md:px-8 py-3 transition-all duration-200 inline-block"
                  style={{ 
                    color: 'var(--color-text-primary)',
                    border: `1px solid var(--color-text-primary)`,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-text-primary)';
                    e.currentTarget.style.color = 'var(--color-bg-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                >
                  {projectsTranslations[language]?.buttons.viewAll || projectsTranslations.en.buttons.viewAll}
                </Link>
                <div 
                  className="font-mono text-xs mt-2"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  {`// ${projectsTranslations[language]?.viewAllSubtitle || projectsTranslations.en.viewAllSubtitle}`}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-6xl mx-auto h-full grid grid-cols-12 gap-0">
            {Array.from({ length: 12 }).map((_, index) => (
              <div 
                key={index} 
                className="h-full"
                style={{ 
                  borderRight: index < 11 ? `1px solid var(--color-border-primary)` : 'none',
                  opacity: 0.3
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}