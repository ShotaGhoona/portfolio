import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import newsTranslations from '@/data/translations/news.json';

export function NewsHeroSection() {
  const { language } = useLanguage();
  const [newsData, setNewsData] = useState(newsTranslations[language] || newsTranslations.en);

  useEffect(() => {
    setNewsData(newsTranslations[language] || newsTranslations.en);
  }, [language]);

  return (
    <section 
      className="w-full py-16 md:py-24 lg:py-32 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Main content */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <div 
                className="font-mono text-sm mb-4"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                ~/portfolio/logs $ tail -f system.log
              </div>
              <h1 
                className="font-mono font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {newsData.detailPage?.title || 'System Logs'}
              </h1>
              <p 
                className="font-mono text-sm sm:text-base md:text-lg mb-6 md:mb-8"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {newsData.detailPage?.subtitle || 'Development updates and technical insights'}
              </p>
              <p 
                className="font-mono text-xs sm:text-sm leading-relaxed max-w-3xl"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {newsData.detailPage?.description || 'Comprehensive view of our latest developments, system updates, and technical achievements.'}
              </p>
            </div>

            {/* Log monitoring simulation */}
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
                  Log Monitor — Real-time system updates
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span style={{ color: 'var(--color-text-secondary)' }}>LIVE</span>
                </div>
              </div>
              
              <div className="p-3 md:p-4 font-mono text-xs sm:text-sm space-y-1">
                <div style={{ color: 'var(--color-text-primary)' }}>
                  <span style={{ color: 'var(--color-accent-green)' }}>$ tail -f /var/log/system.log</span>
                </div>
                {newsData.news.slice(0, 3).map((item, index) => (
                  <div key={index} style={{ color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>
                      [{new Date(item.timestamp).toLocaleString()}]
                    </span>{' '}
                    <span style={{ 
                      color: item.severity === 'SUCCESS' ? 'var(--color-accent-green)' : 
                             item.severity === 'WARN' ? '#f59e0b' : 'var(--color-text-secondary)'
                    }}>
                      [{item.severity}]
                    </span>{' '}
                    {item.title}
                  </div>
                ))}
                <div style={{ color: 'var(--color-text-tertiary)' }}>
                  ... monitoring {newsData.news.length} total log entries
                </div>
              </div>
            </div>
          </div>

          {/* Log stats sidebar */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
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
                  Log Statistics
                </div>
              </div>
              
              <div className="p-3 md:p-4 space-y-3 md:space-y-4">
                {/* Entry counts by type */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Total Entries:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>{newsData.news.length}</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Feature Releases:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>
                      {newsData.news.filter(item => item.type === 'FEATURE_RELEASE').length}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>System Updates:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>
                      {newsData.news.filter(item => item.type === 'SYSTEM_UPDATE').length}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Achievements:</span>
                    <span style={{ color: 'var(--color-text-primary)' }}>
                      {newsData.news.filter(item => item.type === 'ACHIEVEMENT').length}
                    </span>
                  </div>
                </div>

                {/* Severity distribution */}
                <div 
                  className="pt-4 border-t transition-colors duration-200"
                  style={{ borderColor: 'var(--color-border-secondary)' }}
                >
                  <div 
                    className="font-mono text-xs mb-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Severity Levels:
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    {['SUCCESS', 'INFO', 'WARN', 'ERROR'].map((severity) => {
                      const count = newsData.news.filter(item => item.severity === severity).length;
                      const color = severity === 'SUCCESS' ? 'var(--color-accent-green)' :
                                   severity === 'WARN' ? '#f59e0b' :
                                   severity === 'ERROR' ? '#ef4444' : 'var(--color-text-secondary)';
                      
                      return (
                        <div key={severity} className="flex items-center gap-2 font-mono text-xs">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span style={{ color: 'var(--color-text-primary)' }}>{severity}</span>
                          <span style={{ color: 'var(--color-text-secondary)' }}>({count})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent activity */}
                <div 
                  className="pt-4 border-t transition-colors duration-200"
                  style={{ borderColor: 'var(--color-border-secondary)' }}
                >
                  <div 
                    className="font-mono text-xs mb-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Latest Activity:
                  </div>
                  <div 
                    className="font-mono text-xs"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {new Date(newsData.news[0]?.timestamp).toLocaleDateString()}
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