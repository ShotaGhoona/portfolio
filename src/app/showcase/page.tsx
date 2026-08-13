'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { useLanguage } from '@/hooks/useLanguage';
import {
  showcaseItems,
  showcaseCategories,
  type ShowcaseItem,
  type ShowcaseCategory,
} from '@/data/showcase';

type Filter = 'all' | ShowcaseCategory;

const wordsFile = (item: ShowcaseItem) =>
  `/showcase/words/${item.slug.replace('words-', '')}.md`;

// Immersive magazine-style index. No global Header/Footer by design.
export default function ShowcasePage() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [excerpts, setExcerpts] = useState<Record<string, string>>({});

  // Pull the top of each prompt/skill file so Words items can show their opening.
  useEffect(() => {
    showcaseItems
      .filter((i) => i.category === 'words')
      .forEach((item) => {
        fetch(wordsFile(item))
          .then((r) => (r.ok ? r.text() : ''))
          .then((t) => setExcerpts((prev) => ({ ...prev, [item.slug]: t })))
          .catch(() => {});
      });
  }, []);

  const items = useMemo(
    () => showcaseItems.filter((i) => filter === 'all' || i.category === filter),
    [filter]
  );

  return (
    <div className="bg-[var(--color-bg-primary)] h-screen w-full flex flex-col font-mono">
      <Header />
      {/* Spacer matching the fixed global header height */}
      <div className="h-[56px] md:h-[97px] shrink-0" />
      <div className="sc-root flex-1 min-h-0 w-full max-w-[1500px] mx-auto">
        <div className="bg-[var(--color-bg-primary)] text-[color:var(--color-text-primary)] grid h-full w-full grid-cols-1 md:grid-cols-[36%_64%] lg:grid-cols-[35%_35%_30%]">
        {/* ── LEFT REGION — top "Show case", bottom split (menu | meta) */}
        <div className="hidden md:flex flex-col min-h-0 border-r border-[color:var(--color-border-secondary)]">
          {/* Top — Show case with space above */}
          <div className="px-5 pt-12 pb-8">
            <div className="text-[84px] lg:text-[6vw] font-black tracking-tight leading-[0.85]">
              Show<br />case
            </div>
          </div>

          {/* Divider under "Show case" — bleeds to the left viewport edge */}
          <div className="w-[calc(100%_+_var(--bleed))] -ml-[var(--bleed)] border-t border-[color:var(--color-border-secondary)]" />

          {/* Bottom — 2-column split fills the rest */}
          <div className="flex-1 min-h-0 grid grid-cols-2">
            {/* menu / filter */}
            <div className="px-5 py-6 flex flex-col border-r border-[color:var(--color-border-secondary)]">
              <nav className="flex flex-col gap-4">
                <FilterLink active={filter === 'all'} onClick={() => setFilter('all')} label="All" />
                {showcaseCategories.map((cat) => (
                  <FilterLink
                    key={cat.id}
                    active={filter === cat.id}
                    onClick={() => setFilter(cat.id)}
                    label={cat.label[language] ?? cat.label.en}
                  />
                ))}
              </nav>
              <div className="mt-auto text-[15px] text-[color:var(--color-text-secondary)]">
                Selected works &amp; experiments
              </div>
            </div>

            {/* meta — category + running number */}
            <div className="px-5 py-6 flex flex-col">
              <div className="text-[16px] flex items-center tracking-[-0.5px] before:content-[''] before:rounded-full before:w-3 before:h-3 before:bg-[var(--color-text-primary)] before:mr-3">
                {filter === 'all'
                  ? language === 'ja' ? '全カテゴリ' : 'All categories'
                  : showcaseCategories.find((c) => c.id === filter)?.label[language]}
              </div>
              <div className="mt-auto text-center">
                <div className="text-[52px] lg:text-[3.4vw] tracking-tight font-light leading-none whitespace-nowrap">
                  NO. {String(items.length).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CENTER — main cards, snap scroll */}
        <section className="min-h-0 overflow-y-auto snap-y snap-mandatory md:border-r border-[color:var(--color-border-secondary)] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <article key={item.slug} className="snap-start min-h-full flex flex-col px-5 py-6">
              {/* kicker */}
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] tracking-[0.25em] uppercase text-[color:var(--color-text-tertiary)]">
                  {item.category}
                </span>
                <span className="text-[16px]">{item.date}</span>
              </div>

              {/* visual — Graphic & Component are matched tiles; Words shows its prompt */}
              <div className="mt-4">
                <ShowcaseVisual item={item} excerpt={excerpts[item.slug]} />
              </div>

              {/* title */}
              <h2 className="text-[26px] font-medium leading-[1.15] tracking-[-0.5px] mt-4">
                {item.title[language] ?? item.title.en}{' '}
                <span className="text-[color:var(--color-text-secondary)]">
                  — {item.subtitle[language] ?? item.subtitle.en}
                </span>
              </h2>

              {/* See more */}
              <Link
                href={`/showcase/${item.slug}`}
                className="mt-auto pt-4 border-t border-[color:var(--color-border-secondary)] flex justify-end items-center text-[22px] tracking-[-1px] hover:opacity-60 transition-opacity"
              >
                <ArrowIcon className="w-[24px] mr-2" />
                See More
              </Link>
            </article>
          ))}
        </section>

        {/* ── COL 4 — index list + marquee */}
        <aside className="hidden lg:flex flex-col min-h-0">
          <div className="text-[18px] bg-[var(--color-text-primary)] text-[color:var(--color-bg-primary)] py-1.5 w-[calc(100%_+_var(--bleed))] overflow-hidden flex-shrink-0">
            <div className="animate-marquee whitespace-nowrap inline-block">
              {Array.from({ length: 2 }).map((_, i) => (
                <span
                  key={i}
                  className="before:inline-block before:content-[''] before:rounded-full before:w-[9px] before:h-[9px] before:bg-[var(--color-bg-primary)] before:mx-4"
                >
                  Graphic · Words · Component — a place to keep the things I make
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pb-4 tracking-[-1px] flex-shrink-0 px-5">
            <div className="text-[24px] font-mono">Index</div>
            <div className="text-[14px] text-[color:var(--color-text-tertiary)]">{items.length}</div>
          </div>
          {/* Index underline — bleeds to the right viewport edge */}
          <div className="w-[calc(100%_+_var(--bleed))] h-px bg-[var(--color-border-secondary)] mb-5 flex-shrink-0" />


          <div className="min-h-0 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden">
            {items.map((item, idx) => (
              <Link
                key={item.slug}
                href={`/showcase/${item.slug}`}
                className={`block group px-5 ${idx > 0 ? 'mt-8' : ''}`}
              >
                <div className="flex items-baseline justify-between">
                  <div className="text-[48px] leading-none group-hover:opacity-60 transition-opacity">
                    {item.id}
                  </div>
                  <div className="text-[15px] tracking-[-0.5px] text-[color:var(--color-text-tertiary)]">{item.date}</div>
                </div>
                <div className="text-[22px] font-semibold tracking-[-1px] mt-1 leading-tight">
                  {item.title[language] ?? item.title.en}
                </div>
                <div className="text-[13px] text-[color:var(--color-text-secondary)] mt-1">
                  {item.subtitle[language] ?? item.subtitle.en}
                </div>
              </Link>
            ))}

            <div className="w-full aspect-square bg-[var(--color-text-primary)] text-[color:var(--color-bg-primary)] flex flex-col items-center justify-center text-center mt-10 px-6">
              <div className="max-w-[26ch] text-[14px] leading-[1.4] mb-3">
                {language === 'ja'
                  ? '作ったものを、作ったまま置いておく場所。'
                  : "A shelf for the things I make, kept as they are."}
              </div>
              <Link href="/" className="text-[28px] hover:opacity-70 transition-opacity">
                Home
              </Link>
            </div>
          </div>
        </aside>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 22s linear infinite; }
        /* Amount each edge extends beyond the centered max-w container */
        .sc-root { --bleed: max(0px, calc((100vw - 1500px) / 2)); }
      `}</style>
    </div>
  );
}

// Consistent visual block. Graphic & Component are framed tiles of equal weight;
// Words renders the top of its prompt file as a text specimen.
function ShowcaseVisual({ item, excerpt }: { item: ShowcaseItem; excerpt?: string }) {
  const { language } = useLanguage();
  const tile = 'h-[240px] max-h-[26vh] w-full';

  if (item.category === 'graphic' && item.thumbnail) {
    return (
      <img
        src={item.thumbnail}
        alt={item.title[language] ?? item.title.en}
        className={`${tile} object-cover grayscale`}
      />
    );
  }

  if (item.category === 'words') {
    const lines = (excerpt ?? '').split('\n').slice(0, 12).join('\n');
    return (
      <div className={`${tile} bg-[var(--color-text-primary)] text-[color:var(--color-accent-green)] font-mono text-[11px] leading-[1.5] p-4 overflow-hidden relative`}>
        <div className="text-[color:var(--color-accent-green)] mb-2">$ cat {item.slug.replace('words-', '')}/SKILL.md</div>
        <pre className="whitespace-pre-wrap">{lines || '…'}</pre>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--color-text-primary)] to-transparent" />
      </div>
    );
  }

  // Component (and any graphic without an image yet) — matched placeholder tile.
  return (
    <div
      className={`${tile} bg-[var(--color-text-primary)] text-[color:var(--color-bg-primary)] flex items-center justify-center relative overflow-hidden`}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-bg-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-bg-primary) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative text-center px-6">
        <div className="text-[30px] font-semibold tracking-tight leading-none">
          {item.category === 'component' ? '<Component />' : item.title[language] ?? item.title.en}
        </div>
        <div className="mt-3 text-[11px] tracking-[0.3em] uppercase text-[color:var(--color-text-tertiary)]">
          Coming soon
        </div>
      </div>
    </div>
  );
}

function FilterLink({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="text-[22px] tracking-[-0.5px] text-left flex items-center transition-opacity"
      style={{ opacity: active ? 1 : 0.4 }}
    >
      <span
        className="w-3 h-3 rounded-[1px] mr-3"
        style={{ backgroundColor: active ? 'var(--color-text-primary)' : 'transparent', border: '1px solid var(--color-text-primary)' }}
      />
      {label}
    </button>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      viewBox="0 0 24 24"
    >
      <path d="M15 10l5 5-5 5" />
      <path d="M4 4v7a4 4 0 004 4h12" />
    </svg>
  );
}
