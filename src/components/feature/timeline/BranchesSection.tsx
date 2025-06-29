import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import timelineTranslations from '@/data/translations/timeline.json';

export function BranchesSection() {
  const { language } = useLanguage();
  const [timelineData, setTimelineData] = useState(timelineTranslations[language] || timelineTranslations.en);

  useEffect(() => {
    setTimelineData(timelineTranslations[language] || timelineTranslations.en);
  }, [language]);

  return (
    <section 
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-12">
          <h2 
            className="font-mono font-black text-3xl mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Git Branches Overview
          </h2>
          <p 
            className="font-mono text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            // Different development paths and specialization areas
          </p>
        </div>

        {/* Branch visualization */}
        <div 
          className="border mb-8 transition-colors duration-200"
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
              Git Branch Network
            </span>
          </div>
          
          <div className="p-6 font-mono text-sm space-y-3">
            <div style={{ color: 'var(--color-text-primary)' }}>
              <span style={{ color: 'var(--color-accent-green)' }}>$ git branch --all</span>
            </div>
            {timelineData.branches.map((branch, index) => (
              <div key={index} className="flex items-center gap-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: branch.color }}
                ></div>
                <span style={{ color: 'var(--color-text-primary)' }}>
                  {branch.name}
                </span>
                <span 
                  className="text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  ({branch.commits} commits)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Branch details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {timelineData.branches.map((branch, index) => (
            <div 
              key={index}
              className="border transition-all duration-200 hover:shadow-lg"
              style={{ 
                borderColor: 'var(--color-border-primary)',
                backgroundColor: 'var(--color-bg-secondary)'
              }}
            >
              {/* Branch header */}
              <div 
                className="px-4 py-3 border-b transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)'
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: branch.color }}
                  ></div>
                  <div 
                    className="font-mono text-sm font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {branch.name}
                  </div>
                  <div 
                    className="px-2 py-1 text-xs font-mono"
                    style={{ 
                      backgroundColor: 'var(--color-bg-secondary)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    {branch.commits} commits
                  </div>
                </div>
                <p 
                  className="font-mono text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {branch.description}
                </p>
              </div>
              
              {/* Branch commits */}
              <div className="p-4">
                <div 
                  className="font-mono text-xs mb-3"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Recent commits:
                </div>
                <div className="space-y-2">
                  {timelineData.timeline
                    .filter(commit => commit.branch === branch.name)
                    .slice(0, 3)
                    .map((commit, commitIndex) => (
                      <div key={commitIndex} className="flex items-start gap-3">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: branch.color }}
                        ></div>
                        <div>
                          <div 
                            className="font-mono text-xs"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {commit.hash} {commit.message.substring(0, 50)}...
                          </div>
                          <div 
                            className="font-mono text-xs"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            {new Date(commit.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}