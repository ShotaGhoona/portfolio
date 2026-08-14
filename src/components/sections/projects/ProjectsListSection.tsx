'use client';

import { useLanguage } from '@/hooks/useLanguage';
import projectsData from '@/data/translations/projects.json';
import Link from 'next/link';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { TechIcon } from '@/components/ui/TechIcon';

export function ProjectsListSection() {
  const { language } = useLanguage();
  const filteredProjects = projectsData[language] || projectsData.en;

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

  return (
    <section
      className="w-full py-16 md:py-32 relative transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Editorial vertical list — alternating sides */}
        <div className="space-y-16 md:space-y-28">
          {filteredProjects.map((project, i) => {
            const imageRight = i % 2 === 1;
            const statusColor = getStatusColor(project.status);
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
              >
                {/* Browser-framed screenshot */}
                <div
                  className={`md:col-span-7 ${imageRight ? 'md:order-2' : ''}`}
                >
                  <div
                    className="border overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      borderColor: 'var(--color-border-primary)',
                      backgroundColor: 'var(--color-bg-primary)',
                      boxShadow: '0 30px 60px -40px rgba(0,0,0,0.55)'
                    }}
                  >
                    {/* Address bar */}
                    <div
                      className="flex items-center gap-3 px-3 py-2 border-b"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderColor: 'var(--color-border-primary)'
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: 'var(--color-border-secondary)' }}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: 'var(--color-border-secondary)' }}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: 'var(--color-border-secondary)' }}
                        />
                      </div>
                      <div
                        className="flex-1 px-3 py-1 rounded-full font-mono text-[11px] truncate"
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          color: 'var(--color-text-tertiary)'
                        }}
                      >
                        {project.slug}
                      </div>
                    </div>
                    {/* Screenshot — native web-app aspect */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={`/images/projects/${project.slug}/1.png`}
                        alt={project.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className={`md:col-span-5 ${imageRight ? 'md:order-1' : ''}`}>
                  {/* Code-like index line */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs mb-4">
                    <span style={{ color: 'var(--color-accent-green)' }}>[{project.id}]</span>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>{project.type}</span>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>{project.year}</span>
                    <span
                      className="inline-flex items-center gap-1.5 ml-auto"
                      style={{ color: statusColor }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: statusColor }}
                      />
                      {project.status}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-3 transition-colors duration-200 group-hover:opacity-80"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm md:text-base leading-relaxed mb-5"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech, techIndex) => (
                      <TechIcon key={techIndex} icon={tech.icon} label={tech.label} />
                    ))}
                  </div>

                  {/* View cue — terminal cd command, inverts on hover */}
                  <span className="inline-flex items-center font-mono font-bold text-sm px-5 py-2.5 border transition-colors duration-200 text-[var(--color-text-primary)] border-[color:var(--color-text-primary)] group-hover:bg-[var(--color-text-primary)] group-hover:text-[var(--color-bg-primary)]">
                    cd ~/projects/{project.slug}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <GridOverlay />
    </section>
  );
}
