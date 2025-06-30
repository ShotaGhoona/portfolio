import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import timelineTranslations from '@/data/translations/timeline.json';

interface TimelineSection {
  title: string;
  type: 'list' | 'badges' | 'metrics' | 'text' | 'comparison';
  items?: string[];
  data?: { [key: string]: string | number };
  content?: string;
  before?: string;
  after?: string;
}

interface TimelineEntry {
  hash: string;
  date: string;
  type: string;
  branch: string;
  message: string;
  description: string;
  tags: string[];
  status: string;
  sections?: TimelineSection[];
}

export function DetailTimelineSection() {
  const { language } = useLanguage();
  const [timelineData, setTimelineData] = useState<any>(timelineTranslations[language] || timelineTranslations.en);

  useEffect(() => {
    setTimelineData(timelineTranslations[language] || timelineTranslations.en);
  }, [language]);

  const getCommitTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      initial: '#8b5cf6',
      education: '#3b82f6',
      skill: '#fbbf24',
      pivot: '#ef4444',
      internship: '#10b981',
      event: '#f59e0b',
      travel: '#06b6d4',
      launch: 'var(--color-accent-green)',
      feat: 'var(--color-accent-green)',
      fix: '#f59e0b',
      docs: '#3b82f6'
    };
    return colorMap[type] || 'var(--color-text-secondary)';
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

  const renderSection = (section: TimelineSection, index: number) => {
    const baseClasses = "space-y-3";
    
    return (
      <div key={index} className={baseClasses}>
        <div 
          className="font-mono text-sm font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {section.title}
        </div>
        
        {section.type === 'list' && section.items && (
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-start gap-3">
                <div 
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-accent-green)' }}
                />
                <span 
                  className="font-mono text-xs sm:text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {section.type === 'badges' && section.items && (
          <div className="flex flex-wrap gap-2">
            {section.items.map((item, itemIndex) => (
              <span 
                key={itemIndex}
                className="px-2 sm:px-3 py-1 font-mono text-xs transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-primary)',
                  border: `1px solid var(--color-border-secondary)`
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}
        
        {section.type === 'metrics' && section.data && (
          <div className="flex gap-3">
            {Object.entries(section.data).map(([key, value]) => (
              <div 
                key={key}
                className="p-3 border transition-colors duration-200 w-full"
                style={{ 
                  borderColor: 'var(--color-border-secondary)',
                  backgroundColor: 'var(--color-bg-secondary)'
                }}
              >
                <div 
                  className="font-mono text-base sm:text-lg font-bold"
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
        )}
        
        {section.type === 'text' && section.content && (
          <div 
            className="font-mono text-sm p-3 border transition-colors duration-200"
            style={{ 
              color: 'var(--color-text-secondary)',
              borderColor: 'var(--color-border-secondary)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            {section.content}
          </div>
        )}
        
        {section.type === 'comparison' && section.before && section.after && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-3 border transition-colors duration-200"
              style={{ 
                borderColor: 'var(--color-border-secondary)',
                backgroundColor: 'var(--color-bg-secondary)'
              }}
            >
              <div 
                className="font-mono text-xs mb-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                Before:
              </div>
              <div 
                className="font-mono text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {section.before}
              </div>
            </div>
            <div 
              className="p-3 border transition-colors duration-200"
              style={{ 
                borderColor: 'var(--color-border-secondary)',
                backgroundColor: 'var(--color-bg-secondary)'
              }}
            >
              <div 
                className="font-mono text-xs mb-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                After:
              </div>
              <div 
                className="font-mono text-sm"
                style={{ color: 'var(--color-accent-green)' }}
              >
                {section.after}
              </div>
            </div>
          </div>
        )}
      </div>
    );
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
        <div className="relative">
          {/* Git branch line */}
          <div 
            className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 transition-colors duration-200"
            style={{ backgroundColor: 'var(--color-border-primary)' }}
          />
          
          <div className="space-y-8 md:space-y-16">
            {timelineData?.timeline?.map((commit: TimelineEntry, index: number) => (
              <div key={commit.hash} className="relative">
                {/* Branch indicator */}
                <div 
                  className="absolute left-2 sm:left-4 md:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-colors duration-200"
                  style={{ 
                    backgroundColor: getCommitTypeColor(commit.type),
                    borderColor: 'var(--color-bg-secondary)'
                  }}
                />
                
                {/* Branch label */}
                {commit.branch !== 'main' && (
                  <div 
                    className="absolute left-8 sm:left-10 md:left-12 -top-1 font-mono text-xs px-1 sm:px-2 py-0.5 transition-colors duration-200"
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
                <div className="ml-8 sm:ml-12 md:ml-16 lg:ml-20">
                  <div 
                    className="border transition-all duration-200 hover:shadow-lg"
                    style={{ 
                      borderColor: 'var(--color-border-primary)',
                      backgroundColor: 'var(--color-bg-primary)'
                    }}
                  >
                    {/* Commit header */}
                    <div 
                      className="px-3 sm:px-4 md:px-6 py-3 md:py-4 border-b font-mono transition-colors duration-200"
                      style={{ 
                        borderColor: 'var(--color-border-primary)'
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                          <span 
                            className="px-3 py-1 text-xs font-bold rounded"
                            style={getStatusStyle(commit.status)}
                          >
                            {commit.type}
                          </span>
                          <span 
                            className="text-xs sm:text-sm"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            {commit.hash}
                          </span>
                          <span 
                            className="text-xs sm:text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {formatDate(commit.date)}
                          </span>
                        </div>
                      </div>
                      <h3 
                        className="text-lg sm:text-xl font-bold mb-2"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {commit.message}
                      </h3>
                      <p 
                        className="text-xs sm:text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {commit.description}
                      </p>
                    </div>
                    
                    {/* Commit details - simplified! */}
                    {commit.sections && commit.sections.length > 0 && (
                      <div className="p-4 sm:p-6">
                        <div className="space-y-6">
                          {commit.sections.map((section, sectionIndex) => 
                            renderSection(section, sectionIndex)
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div 
                      className="px-4 sm:px-6 py-4 border-t transition-colors duration-200"
                      style={{ borderColor: 'var(--color-border-secondary)' }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {commit.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="font-mono text-xs transition-colors duration-200"
                            style={{ 
                              color: 'var(--color-text-primary)',
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
            )) || []}
          </div>
        </div>
      </div>
    </section>
  );
}