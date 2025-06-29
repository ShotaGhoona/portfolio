import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import timelineTranslations from '@/data/translations/timeline.json';
import Link from 'next/link';

export function TimelineSection() {
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
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\//g, '-');
  };

  return (
    <section 
      id="timeline"
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
                04.
              </div>
              <h2 
                className="font-mono font-black text-lg md:text-xl mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {timelineData.sectionTitle}
              </h2>
              <div 
                className="font-mono text-xs mb-6 md:mb-0"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <div>// {timelineData.subtitle.line1}</div>
                <div>// {timelineData.subtitle.line2}</div>
              </div>
            </div>
          </div>
          
          {/* Timeline content */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            <div className="relative">
              {/* Git branch line */}
              <div 
                className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 transition-colors duration-200"
                style={{ backgroundColor: 'var(--color-border-primary)' }}
              ></div>
              
              <div className="space-y-8">
                {timelineData.timeline.slice(0, 3).map((commit, index) => (
                  <div key={commit.hash} className="relative">
                    {/* Branch indicator */}
                    <div 
                      className="absolute left-2 md:left-6 w-4 h-4 rounded-full border-2 transition-colors duration-200"
                      style={{ 
                        backgroundColor: getCommitTypeColor(commit.type),
                        borderColor: 'var(--color-bg-primary)'
                      }}
                    ></div>
                    
                    {/* Branch label */}
                    {commit.branch !== 'main' && (
                      <div 
                        className="absolute left-8 md:left-12 -top-1 font-mono text-xs px-2 py-0.5 transition-colors duration-200"
                        style={{ 
                          backgroundColor: 'var(--color-bg-secondary)',
                          color: 'var(--color-text-secondary)',
                          border: `1px solid var(--color-border-secondary)`
                        }}
                      >
                        {commit.branch}
                      </div>
                    )}
                    
                    {/* Commit content */}
                    <div className="ml-8 md:ml-16">
                      <div 
                        className="border transition-all duration-200 hover:shadow-lg"
                        style={{ 
                          borderColor: 'var(--color-border-primary)',
                          backgroundColor: 'var(--color-bg-secondary)'
                        }}
                      >
                        {/* Commit header */}
                        <div 
                          className="px-4 py-3 border-b font-mono text-sm transition-colors duration-200"
                          style={{ 
                            borderColor: 'var(--color-border-primary)'
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span 
                                className="px-2 py-1 text-xs font-bold"
                                style={getStatusStyle(commit.status)}
                              >
                                {commit.type}
                              </span>
                              <span 
                                className="text-xs"
                                style={{ color: 'var(--color-text-tertiary)' }}
                              >
                                {commit.hash}
                              </span>
                              <span 
                                className="text-xs"
                                style={{ color: 'var(--color-text-secondary)' }}
                              >
                                {formatDate(commit.date)}
                              </span>
                            </div>
                          </div>
                          <div 
                            className="font-bold"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {commit.message}
                          </div>
                        </div>
                        
                        {/* Commit details */}
                        <div className="p-4">
                          <p 
                            className="font-mono text-sm leading-relaxed mb-4"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {commit.description}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {commit.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-2 py-1 font-mono text-xs transition-colors duration-200"
                                style={{ 
                                  backgroundColor: 'var(--color-bg-primary)',
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
              
              {/* Show more commits button */}
              <div className="mt-12 ml-8 md:ml-16">
                <Link href="/timeline" 
                  className="font-mono inline-block font-bold text-sm px-6 py-3 transition-all duration-200 flex items-center gap-2"
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
                  <span>$ git log --show-more</span>
                </Link>
                <div 
                  className="font-mono text-xs mt-2"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  // View complete development timeline ({timelineData.timeline.length - 3} more commits)
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