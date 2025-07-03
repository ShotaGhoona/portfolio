import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import newsTranslations from '@/data/translations/news.json';
import { ReadMoreButton } from '@/components/ui/ReadMoreButton';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Link from 'next/link';

export function NewsSection() {
  const { language } = useLanguage();
  const [newsData, setNewsData] = useState(newsTranslations[language] || newsTranslations.en);

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
      day: '2-digit' 
    }).replace(/\//g, '-');
  };

  return (
    <section 
      id="news"
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <SectionTitle
            sectionNumber="05."
            sectionTitle={newsData.sectionTitle}
            line1={newsData.subtitle.line1}
            line2={newsData.subtitle.line2}
          />
          
          {/* News content */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            <div className="space-y-6">
              {newsData.news.map((item) => (
                <div 
                  key={item.id} 
                  className="border transition-all duration-200 hover:shadow-lg"
                  style={{ 
                    borderColor: 'var(--color-border-primary)',
                    backgroundColor: 'var(--color-bg-primary)'
                  }}
                >
                  {/* Terminal header */}
                  <div 
                    className="px-4 py-2 border-b font-mono text-xs flex items-center justify-between transition-colors duration-200"
                    style={{ 
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border-primary)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <span style={{ color: 'var(--color-text-secondary)' }}>
                        log_{item.id}.txt
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
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
                  
                  {/* Terminal content */}
                  <div className="p-4 font-mono text-sm">
                    <div className="space-y-3">
                      {/* Command line style entry */}
                      <div className="flex items-start gap-2">
                        <span style={{ color: 'var(--color-accent-green)' }}>$</span>
                        <div className="flex-1">
                          <Link href={`/news/${item.slug}`} key={item.id}>
                          <div 
                            className="font-bold mb-1 hover:underline"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {item.type} &gt; {item.title}
                          </div>
                          </Link>
                          <div 
                            className="text-xs leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {item.summary}
                          </div>
                        </div>
                      </div>
                      
                      {/* Tags and metadata */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-2 border-t gap-3 md:gap-0 transition-colors duration-200" style={{ borderColor: 'var(--color-border-secondary)' }}>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="px-2 py-1 text-xs transition-colors duration-200"
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
                        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                          <div className="flex items-center gap-1">
                            <span>STATUS:</span>
                            <span 
                              className="font-bold"
                              style={{ color: item.status === 'DEPLOYED' || item.status === 'デプロイ済み' ? 'var(--color-accent-green)' : 'var(--color-text-primary)' }}
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
              ))}
              <ReadMoreButton 
                href="/news" 
                comment={`// View complete news (${newsData.news.length - 3} more news)`} 
              />
            </div>
          </div>
        </div>
        <GridOverlay />
      </div>
    </section>
  );
}