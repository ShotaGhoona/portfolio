'use client';

import { useLanguage } from '@/hooks/useLanguage';
import projectsData from '@/data/translations/projects.json';
import Link from 'next/link';
import { ReadMoreButton } from '@/components/ui/ReadMoreButton';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TechIcon } from '@/components/ui/TechIcon';

export function ProjectsSection() {
  const { language } = useLanguage();
  const projects = projectsData[language] || projectsData.en;
  return (
    <section 
      id="projects"
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <SectionTitle
            sectionNumber="02."
            sectionTitle={{ en: 'SELECTED_PROJECTS', ja: 'プロジェクト' }}
            line1={{ en: 'Showcasing technical depth', ja: '技術的深度と' }}
            line2={{ en: 'and problem-solving approach', ja: '問題解決アプローチを紹介' }}
          />
          
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
                            src={`/images/projects/${project.slug}/1.png`}
                            alt={`${project.name} interface screenshot`}
                            className="w-full h-full object-cover"
                            style={{ filter: 'grayscale(20%) contrast(1.1)' }}
                          />
                        </div>
                        <div 
                          className="aspect-[16/10] overflow-hidden border transition-all duration-200 hover:opacity-90"
                          style={{ borderColor: 'var(--color-border-primary)' }}
                        >
                          <img
                            src={`/images/projects/${project.slug}/2.png`}
                            alt={`${project.name} dashboard view`}
                            className="w-full h-full object-cover"
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
                          className="font-mono text-xs mb-3"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {`// Tech Stack`}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <TechIcon
                              key={techIndex}
                              icon={tech.icon}
                              label={tech.label}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-4 pt-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="font-mono text-xs transition-colors duration-200 hover:opacity-80"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {language === 'ja' ? '技術詳細' : 'Technical Details'} →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <ReadMoreButton
                href="/projects"
                comment={language === 'ja'
                  ? `// 全てのプロジェクトを見る (残り${projects.length - 3}件)`
                  : `// View complete projects (${projects.length - 3} more projects)`
                }
                buttonText="git log --show-more"
              />
            </div>
          </div>
        </div>
        <GridOverlay />
      </div>
    </section>
  );
}