'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import type { ShowcaseDetailProps } from '../registry';
import { useSkillMarkdown } from './useSkillMarkdown';

// Shared layout for every "Words" item — header + two panes, matching the
// graphic posters. Left: title / meta typography. Right: a VS Code–style
// viewer showing the actual skill markdown file. Fully driven by `item`.
export default function WordsSkill({ item }: ShowcaseDetailProps) {
  const { language } = useLanguage();
  const title = item.title[language] ?? item.title.en;
  const subtitle = item.subtitle[language] ?? item.subtitle.en;
  const name = item.slug.replace(/^words-/, '');
  const { text, error, loading } = useSkillMarkdown(`/showcase/words/${name}.md`);
  const lines = (text ?? '').split('\n');

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden flex flex-col bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">
      {/* Header */}
      <div className="px-6 md:px-10 py-6 flex items-center justify-between font-mono text-sm border-b border-[color:var(--color-border-primary)]">
        <Link href="/showcase" className="hover:opacity-60 transition-opacity">
          ← Showcase
        </Link>
        <span className="tracking-[0.3em] text-[var(--color-text-tertiary)]">WORDS — No.{item.id}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 md:min-h-0">
        {/* Left — typography */}
        <div className="px-6 md:px-10 py-12 md:py-16 flex flex-col justify-between md:overflow-auto md:border-r border-[color:var(--color-border-primary)]">
          <div>
            <div className="font-mono text-xs tracking-[0.3em] text-[var(--color-text-tertiary)] mb-6">
              {subtitle}
            </div>
            <h1 className="font-mono font-black leading-[0.95] tracking-tight text-4xl md:text-6xl break-words">
              {title}
            </h1>
          </div>
          <div className="mt-12 font-mono text-sm text-[var(--color-text-secondary)]">
            <div className="border-t border-[color:var(--color-border-primary)] pt-4 flex justify-between">
              <span>{language === 'ja' ? '制作' : 'Made with'}</span>
              <span>Claude Code</span>
            </div>
            <div className="border-t border-[color:var(--color-border-primary)] pt-4 mt-4 flex justify-between">
              <span>{language === 'ja' ? '日付' : 'Date'}</span>
              <span>{item.date}</span>
            </div>
          </div>
        </div>

        {/* Right — VS Code–style viewer */}
        <div className="flex flex-col bg-[var(--color-bg-tertiary)] min-h-[60vh] md:min-h-0">
          {/* Editor title bar */}
          <div className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-[color:var(--color-border-primary)] bg-[var(--color-bg-primary)]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-xs text-[var(--color-text-tertiary)] truncate">
              ~/.claude/skills/{name}/SKILL.md
            </span>
          </div>

          {/* File body */}
          <div className="flex-1 min-h-0 overflow-auto">
            {loading && (
              <div className="p-6 font-mono text-sm text-[var(--color-text-tertiary)]">loading…</div>
            )}
            {error && (
              <div className="p-6 font-mono text-sm text-red-500">failed to load file.</div>
            )}
            {text && (
              <div className="flex font-mono text-[13px] leading-6">
                <div className="select-none text-right py-6 pl-4 pr-3 text-[var(--color-text-tertiary)] border-r border-[color:var(--color-border-primary)]">
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <pre className="py-6 px-4 whitespace-pre-wrap flex-1 text-[var(--color-text-secondary)]">
                  {text}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
