import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import newsTranslations from '@/data/translations/news.json';
import Link from 'next/link';

export function NewsListSection() {
  const { language } = useLanguage();
  const [newsData, setNewsData] = useState(newsTranslations[language] || newsTranslations.en);
  const [filterType, setFilterType] = useState('ALL');
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  useEffect(() => {
    setNewsData(newsTranslations[language] || newsTranslations.en);
  }, [language]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'SUCCESS':
        return 'var(--color-accent-green)';
      case 'WARN':
        return '#f59e0b';
      case 'ERROR':
        return '#ef4444';
      default:
        return 'var(--color-text-secondary)';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-');
  };

  const filteredNews = newsData.news?.filter(item => {
    const typeMatch = filterType === 'ALL' || item.type === filterType;
    const severityMatch = filterSeverity === 'ALL' || item.severity === filterSeverity;
    return typeMatch && severityMatch;
  }) || [];

  const uniqueTypes = [...new Set(newsData.news?.map(item => item.type) || [])];
  const uniqueSeverities = [...new Set(newsData.news?.map(item => item.severity) || [])];

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
              className="px-4 py-2 border-b font-mono text-xs flex items-center gap-3 transition-colors duration-200"
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
                grep -i [FILTER] system.log
              </span>
            </div>
            
            <div className="p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Type filter */}
              <div className="flex items-center gap-2 md:gap-3">
                <span 
                  className="font-mono text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  --type=
                </span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="font-mono text-xs px-2 py-1 focus:outline-none transition-colors duration-200 min-w-0"
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

              {/* Severity filter */}
              <div className="flex items-center gap-2 md:gap-3">
                <span 
                  className="font-mono text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  --severity=
                </span>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="font-mono text-xs px-2 py-1 focus:outline-none transition-colors duration-200 min-w-0"
                  style={{ 
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-primary)',
                    border: `1px solid var(--color-border-primary)`
                  }}
                >
                  <option value="ALL">ALL</option>
                  {uniqueSeverities.map(severity => (
                    <option key={severity} value={severity}>{severity}</option>
                  ))}
                </select>
              </div>

              <div 
                className="font-mono text-xs sm:ml-auto mt-2 sm:mt-0"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {filteredNews.length} entries found
              </div>
            </div>
          </div>
        </div>

        {/* News list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredNews.map((item, index) => (
            <Link 
              key={item.id}
              href={`/news/${item.slug}`}
              className="block transition-all duration-200 hover:scale-[1.01]"
            >
              <div 
                className="border transition-all duration-200 hover:shadow-lg cursor-pointer"
                style={{ 
                  borderColor: 'var(--color-border-primary)',
                  backgroundColor: 'var(--color-bg-primary)'
                }}
              >
                {/* Log entry header */}
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
                      log_entry_{item.id}.txt
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <span 
                      className="px-2 py-1"
                      style={{ 
                        color: getSeverityColor(item.severity),
                        backgroundColor: 'var(--color-bg-primary)'
                      }}
                    >
                      [{item.severity}]
                    </span>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                </div>
                
                {/* Log entry content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-3">
                      <span style={{ color: 'var(--color-accent-green)' }}>$</span>
                      <div className="flex-1">
                        <div 
                          className="font-mono font-bold text-base sm:text-lg mb-2"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {item.type} &gt; {item.title}
                        </div>
                        <p 
                          className="font-mono text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {item.summary}
                        </p>
                      </div>
                    </div>
                    
                    {/* Tags and metadata */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {item.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 text-xs font-mono transition-colors duration-200"
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
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
                        <div className="flex items-center gap-1">
                          <span>STATUS:</span>
                          <span 
                            className="font-bold"
                            style={{ 
                              color: item.status === 'DEPLOYED' ? 'var(--color-accent-green)' : 'var(--color-text-primary)' 
                            }}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div>{item.readTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more simulation */}
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
                <span style={{ color: 'var(--color-accent-green)' }}>$</span> more system.log
              </div>
              <div 
                className="font-mono text-xs mt-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                // End of current log entries. Monitor for real-time updates.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}