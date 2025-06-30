import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import newsTranslations from '@/data/translations/news.json';
import Link from 'next/link';

interface NewsDetailSectionProps {
  slug: string;
}

export function NewsDetailSection({ slug }: NewsDetailSectionProps) {
  const { language } = useLanguage();
  const [newsData, setNewsData] = useState(newsTranslations[language] || newsTranslations.en);

  useEffect(() => {
    setNewsData(newsTranslations[language] || newsTranslations.en);
  }, [language]);

  const article = newsData.news?.find(item => item.slug === slug);

  if (!article) {
    return (
      <div className="w-full py-16 md:py-24 text-center">
        <div className="font-mono text-base sm:text-lg" style={{ color: 'var(--color-text-primary)' }}>
          Log entry not found
        </div>
      </div>
    );
  }

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
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const relatedArticles = newsData.news
    ?.filter(item => item.slug !== slug && item.tags?.some(tag => article?.tags?.includes(tag)))
    ?.slice(0, 3) || [];

  return (
    <div 
      className="w-full py-16 md:py-24 transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Back navigation */}
        <div className="mb-6 md:mb-8">
          <Link 
            href="/news"
            className="font-mono text-xs sm:text-sm flex items-center gap-2 transition-colors duration-200 hover:opacity-80"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <span style={{ color: 'var(--color-accent-green)' }}>←</span>
            cd ../logs
          </Link>
        </div>

        {/* Article header */}
        <div 
          className="border mb-6 md:mb-8 transition-colors duration-200"
          style={{ 
            borderColor: 'var(--color-border-primary)',
            backgroundColor: 'var(--color-bg-secondary)'
          }}
        >
          <div 
            className="px-3 sm:px-4 py-2 border-b font-mono text-xs flex items-center justify-between transition-colors duration-200"
            style={{ 
              backgroundColor: 'var(--color-bg-primary)',
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
                cat log_entry_{article?.id}.txt
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span 
                className="px-2 py-1"
                style={{ 
                  color: getSeverityColor(article?.severity || 'INFO'),
                  backgroundColor: 'var(--color-bg-secondary)'
                }}
              >
                [{article?.severity}]
              </span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>
                {formatTimestamp(article?.timestamp || '')}
              </span>
            </div>
          </div>
          
          <div className="p-4 sm:p-5 md:p-6">
            <div className="mb-4">
              <div 
                className="font-mono text-sm mb-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {article?.type}
              </div>
              <h1 
                className="font-mono font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {article?.title}
              </h1>
              <p 
                className="font-mono text-sm sm:text-base md:text-lg"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {article?.summary}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {article?.tags?.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs font-mono transition-colors duration-200"
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

            {/* Meta info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 font-mono text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              <span>Reading time: {article?.readTime}</span>
              <span>Status: {article?.status}</span>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div 
          className="border mb-6 md:mb-8 transition-colors duration-200"
          style={{ 
            borderColor: 'var(--color-border-primary)',
            backgroundColor: 'var(--color-bg-secondary)'
          }}
        >
          <div 
            className="px-3 md:px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
            style={{ 
              backgroundColor: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)'
            }}
          >
            <span style={{ color: 'var(--color-text-secondary)' }}>
              // Full log content
            </span>
          </div>
          
          <div className="p-4 sm:p-5 md:p-6">
            <div 
              className="font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-line"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {article?.fullContent}
            </div>
          </div>
        </div>

        {/* Technical details */}
        {article?.technicalDetails && (
          <div 
            className="border mb-6 md:mb-8 transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            <div 
              className="px-3 md:px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)'
              }}
            >
              <span style={{ color: 'var(--color-text-secondary)' }}>
                // Technical specifications
              </span>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6">
              <div className="space-y-3 sm:space-y-4">
                {Object.entries(article?.technicalDetails || {}).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 md:gap-4">
                    <div 
                      className="font-mono text-xs sm:text-sm font-bold sm:min-w-[140px]"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                    </div>
                    <div 
                      className="font-mono text-xs sm:text-sm"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Images */}
        {article?.images && article.images.length > 0 && (
          <div 
            className="border mb-6 md:mb-8 transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            <div 
              className="px-3 md:px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)'
              }}
            >
              <span style={{ color: 'var(--color-text-secondary)' }}>
                // Attached media files
              </span>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                {article?.images?.map((image, index) => (
                  <div 
                    key={index}
                    className="border transition-colors duration-200"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <img 
                      src={image}
                      alt={`${article?.title} - Image ${index + 1}`}
                      className="w-full h-auto"
                      style={{ filter: 'grayscale(10%)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related links */}
        {article?.relatedLinks && article.relatedLinks.length > 0 && (
          <div 
            className="border mb-6 md:mb-8 transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            <div 
              className="px-3 md:px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)'
              }}
            >
              <span style={{ color: 'var(--color-text-secondary)' }}>
                // Related resources
              </span>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6">
              <div className="space-y-3">
                {article?.relatedLinks?.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    className="block font-mono text-xs sm:text-sm transition-colors duration-200 hover:opacity-80"
                    style={{ color: 'var(--color-accent-green)' }}
                  >
                    → {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div 
            className="border transition-colors duration-200"
            style={{ 
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-secondary)'
            }}
          >
            <div 
              className="px-3 md:px-4 py-2 border-b font-mono text-xs transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-bg-primary)',
                borderColor: 'var(--color-border-primary)'
              }}
            >
              <span style={{ color: 'var(--color-text-secondary)' }}>
                // Related log entries
              </span>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6">
              <div className="space-y-3 sm:space-y-4">
                {relatedArticles.map((relatedArticle, index) => (
                  <Link 
                    key={index}
                    href={`/news/${relatedArticle.slug}`}
                    className="block font-mono text-xs sm:text-sm transition-colors duration-200 hover:opacity-80"
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ color: 'var(--color-accent-green)' }}>→</span>
                      <span style={{ color: 'var(--color-text-primary)' }}>
                        {relatedArticle.title}
                      </span>
                      <span 
                        className="text-xs"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        ({relatedArticle.readTime})
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}