import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import timelineTranslations from '@/data/translations/timeline.json';
import { GridOverlay } from '@/components/ui/GridOverlay';

export function TimelineHeroSection() {
  const { language } = useLanguage();
  const [timelineData, setTimelineData] = useState(timelineTranslations[language] || timelineTranslations.en);

  useEffect(() => {
    setTimelineData(timelineTranslations[language] || timelineTranslations.en);
  }, [language]);

  return (
    <section 
      className="w-full py-16 md:py-32 relative transition-colors duration-200"
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
              ~/portfolio/timeline $
              <span className="animate-blink">|</span>
            </div>
            
            <h1 className="space-y-2 mb-8">
              <div 
                className="font-mono font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <span style={{ color: 'var(--color-accent-green)' }}>const</span> timeline = {'{'}
              </div>
              <div 
                className="font-mono font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl ml-4 md:ml-8"
                style={{ color: 'var(--color-text-primary)' }}
              >
                title: "<span style={{ color: 'var(--color-accent-green)' }}>{timelineData.detailPage.title}</span>",
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
              {timelineData.detailPage.subtitle}
            </p>
            <p 
              className="font-mono text-sm md:text-base leading-relaxed opacity-80"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span style={{ color: 'var(--color-accent-green)' }}>// </span>
              {timelineData.detailPage.description}
            </p>
          </div>
        </div>
      </div>
      <GridOverlay/>

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