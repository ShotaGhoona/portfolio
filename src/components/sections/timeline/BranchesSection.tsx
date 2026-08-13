'use client';

import { useLanguage } from '@/hooks/useLanguage';
import timelineData from '@/data/translations/timeline.json';
import { GridOverlay } from '@/components/ui/GridOverlay';

interface Commit {
  hash: string;
  date: string;
  type: string;
  branch: string;
  message: string;
  status: string;
}

// Upstream information design: each branch is a deliberate thread of life,
// with a human one-line meaning — not an auto-generated label.
const BRANCH_META: Record<
  string,
  { color: string; label: { en: string; ja: string } }
> = {
  main: {
    color: 'var(--color-accent-green)',
    label: {
      en: 'The trunk — from birth through university to the turning point that reoriented everything.',
      ja: '生まれてから大学、そして人生を塗り替えた転機まで。すべての土台になっている幹。'
    }
  },
  design: {
    color: '#3b82f6',
    label: {
      en: 'Where I fell into Figma and Adobe and learned the craft of making things.',
      ja: 'FigmaとAdobeに落ちて、「つくる」ことの原体験を得たブランチ。'
    }
  },
  experience: {
    color: '#f59e0b',
    label: {
      en: 'Internships, product work, and time abroad — everything learned by doing.',
      ja: 'インターン、PdM、海外まで。現場で手を動かしながら学んだブランチ。'
    }
  }
};

const BRANCH_ORDER = ['main', 'design', 'experience'];

export function BranchesSection() {
  const { language } = useLanguage();
  const timeline = (timelineData[language] || timelineData.en) as unknown as Commit[];

  // Overall latest date → marks the currently active branch
  const latestDate = timeline.reduce(
    (max, c) => (c.date > max ? c.date : max),
    ''
  );

  const branches = BRANCH_ORDER.filter((name) =>
    timeline.some((c) => c.branch === name)
  ).map((name) => {
    const commits = timeline
      .filter((c) => c.branch === name)
      .sort((a, b) => a.date.localeCompare(b.date));
    const startYear = commits[0]?.date.slice(0, 4);
    const endYear = commits[commits.length - 1]?.date.slice(0, 4);
    const isActive = commits.some(
      (c) => c.status === 'current' || c.date === latestDate
    );
    return {
      name,
      color: BRANCH_META[name]?.color || 'var(--color-text-secondary)',
      label: BRANCH_META[name]?.label,
      count: commits.length,
      span: startYear === endYear ? startYear : `${startYear}–${endYear}`,
      isActive
    };
  });

  return (
    <section
      className="w-full py-16 md:py-24 relative transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-10 md:mb-14 max-w-2xl">
          <div
            className="font-mono text-xs tracking-wide mb-3"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {`// branches`}
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {language === 'ja' ? '人生のブランチ' : 'Life branches'}
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {language === 'ja'
              ? '人生は一本道じゃない。土台・つくる・現場——並行して伸びてきたいくつかの筋がある。'
              : "Life didn't grow in a straight line. It branched — foundation, craft, and hands-on work — several threads developing in parallel."}
          </p>
        </div>

        {/* Branches */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="border p-5 md:p-6 flex flex-col transition-colors duration-200"
              style={{
                borderColor: 'var(--color-border-primary)',
                backgroundColor: 'var(--color-bg-secondary)'
              }}
            >
              {/* Branch head */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: branch.color }}
                />
                <span
                  className="font-mono text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {branch.name}
                </span>
                {branch.isActive && (
                  <span
                    className="inline-flex items-center gap-1 ml-auto font-mono text-xs"
                    style={{ color: 'var(--color-accent-green)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: 'var(--color-accent-green)' }}
                    />
                    active
                  </span>
                )}
              </div>

              {/* Human meaning */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {language === 'ja' ? branch.label?.ja : branch.label?.en}
              </p>

              {/* Stats — divided by a line */}
              <div
                className="mt-4 pt-3 border-t flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs"
                style={{
                  borderColor: 'var(--color-border-secondary)',
                  color: 'var(--color-text-tertiary)'
                }}
              >
                <span>
                  {branch.count} {language === 'ja' ? 'コミット' : 'commits'}
                </span>
                <span>{branch.span}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <GridOverlay />
    </section>
  );
}
