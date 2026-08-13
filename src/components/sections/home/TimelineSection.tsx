'use client';

import { useLanguage } from '@/hooks/useLanguage';
import timelineData from '@/data/translations/timeline.json';
import { ReadMoreButton } from '@/components/ui/ReadMoreButton';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function TimelineSection() {
  const { language } = useLanguage();
  const timeline = timelineData[language] || timelineData.en;

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
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <SectionTitle
            sectionNumber="04."
            sectionTitle={{ en: 'LIFE_COMMITS', ja: '人生のコミット履歴' }}
            line1={{ en: 'Key milestones and transitions', ja: '重要なマイルストーンと' }}
            line2={{ en: 'that shaped the journey', ja: '人生の転機を記録' }}
          />

          {/* Timeline content */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            <div className="relative">
              {/* Git branch line */}
              <div
                className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 transition-colors duration-200"
                style={{ backgroundColor: 'var(--color-border-primary)' }}
              ></div>

              <div className="space-y-8">
                {timeline.slice(0, 3).map((commit) => (
                  <div key={commit.hash} className="relative">
                    {/* Branch indicator */}
                    <div 
                      className="absolute left-2 md:left-6 w-4 h-4 rounded-full border-2 transition-colors duration-200"
                      style={{ 
                        backgroundColor: getCommitTypeColor(commit.type),
                        borderColor: 'var(--color-bg-primary)'
                      }}
                    ></div>
                    
                    {/* Commit content */}
                    <div className="ml-8 md:ml-16">
                      <div
                        className="border transition-colors duration-200"
                        style={{
                          borderColor: 'var(--color-border-primary)',
                          backgroundColor: 'var(--color-bg-secondary)'
                        }}
                      >
                        <div className="p-5 md:p-6">
                          {/* Meta row */}
                          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-3">
                            <span
                              className="font-mono text-xs font-medium"
                              style={{ color: getCommitTypeColor(commit.type) }}
                            >
                              {commit.type}
                            </span>
                            <span
                              className="font-mono text-xs"
                              style={{ color: 'var(--color-text-tertiary)' }}
                            >
                              {formatDate(commit.date)}
                            </span>
                            {commit.branch !== 'main' && (
                              <span
                                className="font-mono text-xs"
                                style={{ color: 'var(--color-text-tertiary)' }}
                              >
                                {commit.branch}
                              </span>
                            )}
                            {commit.status === 'current' && (
                              <span
                                className="inline-flex items-center gap-1 font-mono text-xs"
                                style={{ color: 'var(--color-accent-green)' }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                                  style={{ backgroundColor: 'var(--color-accent-green)' }}
                                ></span>
                                now
                              </span>
                            )}
                          </div>

                          {/* Message */}
                          <h3
                            className="text-lg md:text-xl font-bold mb-2"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {commit.message}
                          </h3>

                          {/* Description */}
                          <p
                            className="text-sm md:text-base leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {commit.description}
                          </p>
                        </div>

                        {/* Tags — divided by a line */}
                        <div
                          className="px-5 md:px-6 py-3 border-t flex flex-wrap gap-x-4 gap-y-1"
                          style={{ borderColor: 'var(--color-border-secondary)' }}
                        >
                          {commit.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="font-mono text-xs"
                              style={{ color: 'var(--color-text-tertiary)' }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ReadMoreButton
                href="/timeline"
                comment={language === 'ja'
                  ? `// 完全なタイムラインを見る (残り${timeline.length - 3}コミット)`
                  : `// View complete timeline (${timeline.length - 3} more commits)`
                }
                buttonText="git log --show-more"
                className="mt-12 ml-8 md:ml-16"
              />
            </div>
          </div>
        </div>
        <GridOverlay />
      </div>
    </section>
  );
}