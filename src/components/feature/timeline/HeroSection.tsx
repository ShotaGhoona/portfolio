import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import timelineTranslations from '@/data/translations/timeline.json';

export function TimelineHeroSection() {
  const { language } = useLanguage();
  const [timelineData, setTimelineData] = useState(timelineTranslations[language] || timelineTranslations.en);

  useEffect(() => {
    setTimelineData(timelineTranslations[language] || timelineTranslations.en);
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
                ~/portfolio/timeline $
              </div>
              <h1 
                className="font-mono font-black text-5xl mb-6"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {timelineData.detailPage.title}
              </h1>
              <p 
                className="font-mono text-lg mb-8"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {timelineData.detailPage.subtitle}
              </p>
              <p 
                className="font-mono text-sm leading-relaxed max-w-3xl"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {timelineData.detailPage.description}
              </p>
            </div>

            {/* Git command simulation */}
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
                  Terminal — git log --all --graph --decorate
                </span>
              </div>
              
              <div className="p-4 font-mono text-sm space-y-2">
                <div style={{ color: 'var(--color-text-primary)' }}>
                  <span style={{ color: 'var(--color-accent-green)' }}>$ git log --all --graph --decorate --oneline</span>
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-accent-green)' }}>*</span> b4e1c85 (HEAD -&gt; career/startup) Launch Ghoona Inc.
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-accent-green)' }}>*</span> c9d2a14 (skills/ai-ml) Master PyTorch and FastAPI
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-accent-green)' }}>*</span> d1a7b89 (experience/india) Return from India exchange
                </div>
                <div style={{ color: 'var(--color-text-tertiary)' }}>
                  ... {timelineData.stats.totalCommits - 3} more commits
                </div>
              </div>
            </div>
          </div>

          {/* Stats sidebar */}
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
                  {timelineData.stats.title}
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Commit stats */}
                <div className="space-y-3">
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Total Commits:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{timelineData.stats.totalCommits}</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Active Branches:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{timelineData.stats.activeBranches}</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Years Active:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{timelineData.stats.yearsActive}</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Lines of Code:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{timelineData.stats.linesOfCode}</span>
                  </div>
                </div>

                {/* Languages */}
                <div 
                  className="pt-4 border-t transition-colors duration-200"
                  style={{ borderColor: 'var(--color-border-secondary)' }}
                >
                  <div 
                    className="font-mono text-xs mb-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Primary Languages:
                  </div>
                  <div className="space-y-2">
                    {timelineData.stats.languages.map((lang, index) => (
                      <div key={index} className="flex items-center gap-2 font-mono text-xs">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--color-accent-green)' }}
                        ></div>
                        <span style={{ color: 'var(--color-text-primary)' }}>{lang}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div 
                  className="pt-4 border-t transition-colors duration-200"
                  style={{ borderColor: 'var(--color-border-secondary)' }}
                >
                  <div 
                    className="font-mono text-xs mb-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Key Frameworks:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {timelineData.stats.frameworks.map((framework, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 font-mono text-xs transition-colors duration-200"
                        style={{ 
                          backgroundColor: 'var(--color-bg-primary)',
                          color: 'var(--color-text-primary)',
                          border: `1px solid var(--color-border-secondary)`
                        }}
                      >
                        {framework}
                      </span>
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