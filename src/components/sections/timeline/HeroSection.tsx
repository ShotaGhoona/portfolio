'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { GridOverlay } from '@/components/ui/GridOverlay';

export function TimelineHeroSection() {
  const { language } = useLanguage();

  return (
    <section
      className="w-full min-h-[50vh] flex py-20 md:py-28 relative transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-between gap-12">
        {/* Top: descriptive comments — pinned to top, matching the home hero */}
        <div
          className="font-mono text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <div>
            {language === 'ja'
              ? '// 人生の重要な転機とマイルストーン'
              : '// Life milestones and pivotal moments'}
          </div>
          <div>
            {language === 'ja'
              ? '// これまでの人生の軌跡を、コミット履歴のように時系列で振り返る'
              : '// A chronological journey through life experiences, visualized as git commits'}
          </div>
        </div>

        {/* Bottom: prompt + heading */}
        <div>
          <div
            className="font-mono text-sm mb-4 flex items-center gap-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <span style={{ color: 'var(--color-accent-green)' }}>➜</span>
            ~/portfolio/timeline $
            <span className="animate-blink">|</span>
          </div>

          <h1 className="space-y-2">
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
              title: "<span style={{ color: 'var(--color-accent-green)' }}>
                {language === 'ja' ? '人生のコミット履歴' : 'Life Commits'}
              </span>",
            </div>
            <div
              className="font-mono font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {'}'};
            </div>
          </h1>
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