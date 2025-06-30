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
        <div className="space-y-8">
          <div>
            <div 
              className="font-mono text-sm mb-4 flex items-center gap-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span style={{ color: 'var(--color-accent-green)' }}>➜</span>
              ~/portfolio/news $
              <span className="animate-blink">|</span>
            </div>
            
            <h1 className="space-y-2 mb-8">
              <div 
                className="font-mono font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <span style={{ color: 'var(--color-accent-green)' }}>const</span> news = {'{'}
              </div>
              <div 
                className="font-mono font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl ml-4 md:ml-8"
                style={{ color: 'var(--color-text-primary)' }}
              >
                title: "<span style={{ color: 'var(--color-accent-green)' }}>{newsData.detailPage?.title || 'System Logs'}</span>",
              </div>
              <div 
                className="font-mono font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {'}'};
              </div>
            </h1>
          </div>

          <div className="space-y-4">
            <p 
              className="font-mono text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span style={{ color: 'var(--color-accent-green)' }}>// </span>
              {newsData.detailPage?.subtitle || 'Development updates and technical insights'}
            </p>
            <p 
              className="font-mono text-sm md:text-base leading-relaxed opacity-80"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span style={{ color: 'var(--color-accent-green)' }}>// </span>
              {newsData.detailPage?.description || 'Comprehensive view of our latest developments, system updates, and technical achievements.'}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  );
}