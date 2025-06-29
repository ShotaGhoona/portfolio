import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import timelineTranslations from '@/data/translations/timeline.json';

export function DetailTimelineSection() {
  const { language } = useLanguage();
  const [timelineData, setTimelineData] = useState(timelineTranslations[language] || timelineTranslations.en);

  useEffect(() => {
    setTimelineData(timelineTranslations[language] || timelineTranslations.en);
  }, [language]);

  const getCommitTypeColor = (type: string) => {
    switch (type) {
      case 'feat':
        return 'var(--color-accent-green)';
      case 'fix':
        return '#f59e0b';
      case 'docs':
        return '#3b82f6';
      case 'initial':
        return '#8b5cf6';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'current':
        return {
          backgroundColor: 'var(--color-accent-green)',
          color: 'var(--color-bg-primary)'
        };
      case 'future':
        return {
          backgroundColor: 'var(--color-bg-secondary)',
          color: 'var(--color-text-secondary)',
          border: `1px dashed var(--color-border-primary)`
        };
      default:
        return {
          backgroundColor: 'var(--color-bg-secondary)',
          color: 'var(--color-text-primary)'
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section 
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="relative">
          {/* Git branch line */}
          <div 
            className="absolute left-8 top-0 bottom-0 w-0.5 transition-colors duration-200"
            style={{ backgroundColor: 'var(--color-border-primary)' }}
          ></div>
          
          <div className="space-y-16">
            {timelineData.timeline.map((commit, index) => (
              <div key={commit.hash} className="relative">
                {/* Branch indicator */}
                <div 
                  className="absolute left-6 w-4 h-4 rounded-full border-2 transition-colors duration-200"
                  style={{ 
                    backgroundColor: getCommitTypeColor(commit.type),
                    borderColor: 'var(--color-bg-secondary)'
                  }}
                ></div>
                
                {/* Branch label */}
                {commit.branch !== 'main' && (
                  <div 
                    className="absolute left-12 -top-1 font-mono text-xs px-2 py-0.5 transition-colors duration-200"
                    style={{ 
                      backgroundColor: 'var(--color-bg-primary)',
                      color: 'var(--color-text-secondary)',
                      border: `1px solid var(--color-border-secondary)`
                    }}
                  >
                    {commit.branch}
                  </div>
                )}
                
                {/* Commit content */}
                <div className="ml-20">
                  <div 
                    className="border transition-all duration-200 hover:shadow-lg"
                    style={{ 
                      borderColor: 'var(--color-border-primary)',
                      backgroundColor: 'var(--color-bg-primary)'
                    }}
                  >
                    {/* Commit header */}
                    <div 
                      className="px-6 py-4 border-b font-mono transition-colors duration-200"
                      style={{ 
                        borderColor: 'var(--color-border-primary)'
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <span 
                            className="px-3 py-1 text-xs font-bold rounded"
                            style={getStatusStyle(commit.status)}
                          >
                            {commit.type}
                          </span>
                          <span 
                            className="text-sm"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            {commit.hash}
                          </span>
                          <span 
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {formatDate(commit.date)}
                          </span>
                        </div>
                      </div>
                      <h3 
                        className="text-xl font-bold mb-2"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {commit.message}
                      </h3>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {commit.description}
                      </p>
                    </div>
                    
                    {/* Commit details */}
                    {commit.details && (
                      <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Achievements/Projects/Experiences */}
                          <div>
                            <div 
                              className="font-mono text-sm font-bold mb-4"
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              {commit.details.achievements ? 'Key Achievements' : 
                               commit.details.projects ? 'Projects Built' : 
                               commit.details.experiences ? 'Key Experiences' : 'Highlights'}
                            </div>
                            <div className="space-y-3">
                              {(commit.details.achievements || commit.details.projects || commit.details.experiences || []).map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div 
                                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                    style={{ backgroundColor: 'var(--color-accent-green)' }}
                                  ></div>
                                  <span 
                                    className="font-mono text-sm"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                  >
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div>
                            <div 
                              className="font-mono text-sm font-bold mb-4"
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              Technologies Used
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {commit.details.technologies && commit.details.technologies.map((tech, idx) => (
                                <span 
                                  key={idx}
                                  className="px-3 py-1 font-mono text-xs transition-colors duration-200"
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
                          </div>

                          {/* Metrics */}
                          {commit.details.metrics && (
                            <div className="lg:col-span-2">
                              <div 
                                className="font-mono text-sm font-bold mb-4"
                                style={{ color: 'var(--color-text-primary)' }}
                              >
                                Impact Metrics
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {Object.entries(commit.details.metrics).map(([key, value]) => (
                                  <div 
                                    key={key}
                                    className="p-3 border transition-colors duration-200"
                                    style={{ 
                                      borderColor: 'var(--color-border-secondary)',
                                      backgroundColor: 'var(--color-bg-secondary)'
                                    }}
                                  >
                                    <div 
                                      className="font-mono text-lg font-bold"
                                      style={{ color: 'var(--color-text-primary)' }}
                                    >
                                      {value}
                                    </div>
                                    <div 
                                      className="font-mono text-xs capitalize"
                                      style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                      {key.replace(/_/g, ' ')}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Impact (for India experience) */}
                          {commit.details.impact && (
                            <div className="lg:col-span-2">
                              <div 
                                className="font-mono text-sm font-bold mb-4"
                                style={{ color: 'var(--color-text-primary)' }}
                              >
                                Social Impact
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {Object.entries(commit.details.impact).map(([key, value]) => (
                                  <div 
                                    key={key}
                                    className="p-3 border transition-colors duration-200"
                                    style={{ 
                                      borderColor: 'var(--color-border-secondary)',
                                      backgroundColor: 'var(--color-bg-secondary)'
                                    }}
                                  >
                                    <div 
                                      className="font-mono text-lg font-bold"
                                      style={{ color: 'var(--color-text-primary)' }}
                                    >
                                      {value}
                                    </div>
                                    <div 
                                      className="font-mono text-xs capitalize"
                                      style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                      {key.replace(/_/g, ' ')}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div 
                      className="px-6 py-4 border-t transition-colors duration-200"
                      style={{ borderColor: 'var(--color-border-secondary)' }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {commit.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 font-mono text-xs transition-colors duration-200"
                            style={{ 
                              backgroundColor: 'var(--color-bg-secondary)',
                              color: 'var(--color-text-primary)',
                              border: `1px solid var(--color-border-secondary)`
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}