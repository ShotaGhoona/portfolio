'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { showcaseItems, showcaseCategories } from '@/data/showcase';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ReadMoreButton } from '@/components/ui/ReadMoreButton';

export function ShowcaseSection() {
  const { language } = useLanguage();
  // Prefer items that have something to show first.
  const preview = [...showcaseItems]
    .sort((a, b) => Number(Boolean(b.thumbnail)) - Number(Boolean(a.thumbnail)))
    .slice(0, 4);

  return (
    <section
      id="showcase"
      className="w-full py-24 relative transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`,
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <SectionTitle
            sectionNumber="05."
            sectionTitle={{ en: 'SHOWCASE', ja: 'ショーケース' }}
            line1={{ en: 'Graphics, words, and', ja: 'グラフィック、言葉、' }}
            line2={{ en: 'components in one place', ja: 'コンポーネントの陳列棚' }}
          />

          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            {/* Category legend */}
            <div className="flex flex-wrap gap-3 mb-8 font-mono text-xs">
              {showcaseCategories.map((cat) => (
                <span
                  key={cat.id}
                  className="px-3 py-1.5 border"
                  style={{
                    color: 'var(--color-text-secondary)',
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  {cat.label[language] ?? cat.label.en}
                </span>
              ))}
            </div>

            {/* Preview grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {preview.map((item) => (
                <Link
                  key={item.slug}
                  href={`/showcase/${item.slug}`}
                  className="group block border transition-all duration-200 hover:opacity-90"
                  style={{ borderColor: 'var(--color-border-primary)' }}
                >
                  <div
                    className="aspect-[3/4] overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                  >
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title[language] ?? item.title.en}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span
                        className="font-mono text-sm text-center px-3"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {item.title[language] ?? item.title.en}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <div
                      className="font-mono text-xs mb-1"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      {`// ${item.category}`}
                    </div>
                    <div
                      className="font-mono text-sm font-bold leading-tight mb-1.5"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {item.title[language] ?? item.title.en}
                    </div>
                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.subtitle[language] ?? item.subtitle.en}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <ReadMoreButton
              href="/showcase"
              buttonText="cd ~/showcase"
              comment={
                language === 'ja'
                  ? '// アート・スキル・コンポーネントの一覧へ'
                  : '// Browse graphics, words, and components'
              }
            />
          </div>
        </div>
      </div>

      <GridOverlay />
    </section>
  );
}
