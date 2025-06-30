import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import projectsTranslations from '@/data/translations/projects.json';
import Link from 'next/link';

export function ProjectsListSection() {
  const { language } = useLanguage();
  const [projectsData, setProjectsData] = useState(projectsTranslations[language] || projectsTranslations.en);
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    setProjectsData(projectsTranslations[language] || projectsTranslations.en);
  }, [language]);

  const filteredProjects = projectsData.projects?.filter(project => {
    const typeMatch = filterType === 'ALL' || project.type === filterType;
    const statusMatch = filterStatus === 'ALL' || project.status === filterStatus;
    return typeMatch && statusMatch;
  }) || [];

  const uniqueTypes = [...new Set(projectsData.projects?.map(project => project.type) || [])];
  const uniqueStatuses = [...new Set(projectsData.projects?.map(project => project.status) || [])];

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
      className="w-full py-16 md:py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Filter controls */}
        <div className="mb-6 md:mb-8">
          <div 
            className="border transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-primary)'
            }}
          >
            <div 
              className="px-3 sm:px-4 py-2 border-b font-mono text-xs flex items-center gap-2 sm:gap-3 transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-primary)'
              }}
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span style={{ color: 'var(--color-text-secondary)' }}>
                find ./projects -type [FILTER] -status [STATUS]
              </span>
            </div>
            
            <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Type filter */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span 
                  className="font-mono text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  --type=
                </span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="font-mono text-xs px-2 py-1 focus:outline-none transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-primary)',
                    border: `1px solid var(--color-border-primary)`
                  }}
                >
                  <option value="ALL">ALL</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span 
                  className="font-mono text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  --status=
                </span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="font-mono text-xs px-2 py-1 focus:outline-none transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-primary)',
                    border: `1px solid var(--color-border-primary)`
                  }}
                >
                  <option value="ALL">ALL</option>
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div 
                className="font-mono text-xs sm:ml-auto mt-2 sm:mt-0"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {filteredProjects.length} projects found
              </div>
            </div>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              className="block transition-all duration-200 hover:scale-[1.01]"
            >
              <div 
                className="border transition-all duration-200 hover:shadow-lg cursor-pointer"
                style={{ 
                  borderColor: 'var(--color-border-primary)',
                  backgroundColor: 'var(--color-bg-primary)'
                }}
              >
                {/* Project header */}
                <div 
                  className="px-3 sm:px-4 py-2 border-b font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: 'var(--color-border-primary)'
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      project_{project.id}.repo
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span 
                      className="px-2 py-1"
                      style={{ 
                        color: getStatusColor(project.status),
                        backgroundColor: 'var(--color-bg-primary)'
                      }}
                    >
                      [{project.status.toUpperCase()}]
                    </span>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>
                      {project.year}
                    </span>
                  </div>
                </div>
                
                {/* Project images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 pb-0">
                  <div 
                    className="aspect-[16/10] overflow-hidden border transition-all duration-200"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <img 
                      src={`/projects/${project.slug}/1.png`}
                      alt={`${project.name} interface`}
                      className="w-full h-full object-cover"
                      style={{ filter: 'grayscale(20%) contrast(1.1)' }}
                    />
                  </div>
                  <div 
                    className="aspect-[16/10] overflow-hidden border transition-all duration-200"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <img 
                      src={`/projects/${project.slug}/2.png`}
                      alt={`${project.name} dashboard`}
                      className="w-full h-full object-cover"
                      style={{ filter: 'grayscale(20%) contrast(1.1)' }}
                    />
                  </div>
                </div>

                {/* Project content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-3">
                      <span style={{ color: 'var(--color-accent-green)' }}>$</span>
                      <div className="flex-1">
                        <div 
                          className="font-mono font-bold text-base sm:text-lg mb-2"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {project.type} &gt; {project.name}
                        </div>
                        <p 
                          className="font-mono text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {project.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Tech stack and metrics */}
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 text-xs font-mono transition-colors duration-200"
                            style={{ 
                              backgroundColor: 'var(--color-bg-secondary)',
                              color: 'var(--color-text-primary)',
                              border: `1px solid var(--color-border-secondary)`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <div className="flex flex-wrap gap-1 sm:gap-2 text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
                          {project.metrics.map((metric, metricIndex) => (
                            <span key={metricIndex}>
                              {metric}
                              {metricIndex < project.metrics.length - 1 && ' • '}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Archive footer */}
        <div className="mt-8 md:mt-12">
          <div 
            className="border transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-primary)'
            }}
          >
            <div className="p-3 sm:p-4 text-center">
              <div 
                className="font-mono text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span style={{ color: 'var(--color-accent-green)' }}>$</span> git log --oneline --all
              </div>
              <div 
                className="font-mono text-xs mt-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                // Complete project history and technical documentation available
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}