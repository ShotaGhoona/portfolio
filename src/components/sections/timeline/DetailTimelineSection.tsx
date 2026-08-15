'use client';

import { useLanguage } from '@/hooks/useLanguage';
import timelineData from '@/data/translations/timeline.json';
import { GridOverlay } from '@/components/ui/GridOverlay';

interface TimelineSection {
  title: string;
  type: 'list' | 'badges' | 'metrics' | 'text' | 'comparison' | 'picture';
  items?: string[];
  data?: { [key: string]: string | number };
  content?: string;
  before?: string;
  after?: string;
  count?: number;
}

interface TimelineEntry {
  hash: string;
  date: string;
  type: string;
  branch: string;
  message: string;
  description: string;
  tags: string[];
  status: string;
  sections?: TimelineSection[];
}

export function DetailTimelineSection() {
  const { language } = useLanguage();
  const timeline = (timelineData[language] || timelineData.en) as unknown as TimelineEntry[];

  const getCommitTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      initial: '#8b5cf6',
      education: '#3b82f6',
      skill: '#fbbf24',
      pivot: '#ef4444',
      internship: '#10b981',
      event: '#f59e0b',
      travel: '#06b6d4',
      launch: 'var(--color-accent-green)',
      feat: 'var(--color-accent-green)',
      fix: '#f59e0b',
      docs: '#3b82f6'
    };
    return colorMap[type] || 'var(--color-text-secondary)';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderSection = (section: TimelineSection, index: number, commitHash: string) => {
    return (
      <div key={index} className="space-y-3">
        {/* Section label — a small code-like key */}
        <div
          className="font-mono text-xs tracking-wide"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {section.title}
        </div>

        {section.type === 'list' && section.items && (
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-start gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-accent-green)' }}
                />
                <span
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {section.type === 'badges' && section.items && (
          <div className="flex flex-wrap gap-2">
            {section.items.map((item, itemIndex) => (
              <span
                key={itemIndex}
                className="px-2.5 py-1 font-mono text-xs transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-secondary)',
                  border: `1px solid var(--color-border-secondary)`
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {section.type === 'metrics' && section.data && (
          <div className="grid grid-cols-2 sm:flex gap-3">
            {Object.entries(section.data).map(([key, value]) => (
              <div
                key={key}
                className="p-4 border transition-colors duration-200 w-full"
                style={{
                  borderColor: 'var(--color-border-secondary)',
                  backgroundColor: 'var(--color-bg-secondary)'
                }}
              >
                <div
                  className="font-mono text-xl sm:text-2xl font-bold"
                  style={{ color: 'var(--color-accent-green)' }}
                >
                  {value}
                </div>
                <div
                  className="text-xs capitalize mt-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {key.replace(/_/g, ' ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {section.type === 'text' && section.content && (
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {section.content}
          </p>
        )}

        {section.type === 'comparison' && section.before && section.after && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="p-4 border transition-colors duration-200"
              style={{
                borderColor: 'var(--color-border-secondary)',
                backgroundColor: 'var(--color-bg-secondary)'
              }}
            >
              <div
                className="font-mono text-xs mb-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {language === 'ja' ? '前' : 'Before'}
              </div>
              <div
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {section.before}
              </div>
            </div>
            <div
              className="p-4 border transition-colors duration-200"
              style={{
                borderColor: 'var(--color-border-secondary)',
                backgroundColor: 'var(--color-bg-secondary)'
              }}
            >
              <div
                className="font-mono text-xs mb-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {language === 'ja' ? '後' : 'After'}
              </div>
              <div
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--color-accent-green)' }}
              >
                {section.after}
              </div>
            </div>
          </div>
        )}

        {section.type === 'picture' && section.count && (
          <div
            className={`grid grid-cols-1 gap-4 ${
              { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }[
                section.count
              ] ?? 'md:grid-cols-3'
            }`}
          >
            {Array.from({ length: section.count }).map((_, imgIndex) => (
              <div
                key={imgIndex}
                className="aspect-video overflow-hidden transition-colors duration-200"
                style={{ backgroundColor: 'var(--color-bg-secondary)' }}
              >
                <img
                  src={`/images/timeline/${commitHash}/${imgIndex + 1}.jpg`}
                  alt={`${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className="w-full py-16 md:py-32 relative transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Table of contents */}
          <nav className="col-span-1 md:col-span-3 px-4 md:px-6 pb-8 md:pb-0">
            <div className="md:sticky md:top-28 md:pt-2">
              <div
                className="font-mono text-xs tracking-wide mb-4"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {`// index`}
              </div>
              {(() => {
                const groups: { year: number; items: TimelineEntry[] }[] = [];
                timeline?.forEach((commit) => {
                  const year = new Date(commit.date).getFullYear();
                  const last = groups[groups.length - 1];
                  if (!last || last.year !== year) groups.push({ year, items: [commit] });
                  else last.items.push(commit);
                });
                return (
                  <div className="space-y-5">
                    {groups.map((group) => (
                      <div key={group.year}>
                        <div
                          className="font-mono text-xs mb-2"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {group.year}
                        </div>
                        <ul className="space-y-2">
                          {group.items.map((commit) => (
                            <li key={commit.hash}>
                              <a
                                href={`#${commit.hash}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  document
                                    .getElementById(commit.hash)
                                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className="group flex items-center gap-2"
                              >
                                <span
                                  className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125"
                                  style={{ backgroundColor: getCommitTypeColor(commit.type) }}
                                />
                                <span
                                  className="min-w-0 flex-1 truncate text-xs transition-colors duration-200 group-hover:opacity-100"
                                  style={{ color: 'var(--color-text-secondary)' }}
                                >
                                  {commit.message}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </nav>

          {/* Timeline */}
          <div className="col-span-1 md:col-span-9 pr-4 sm:pr-6 md:pr-8 relative">
          {/* Git branch line — aligned to the commit dots */}
          <div
            className="absolute left-8 md:left-0 top-0 bottom-0 w-0.5 -translate-x-1/2 transition-colors duration-200"
            style={{ backgroundColor: 'var(--color-border-primary)' }}
          />

          <div className="space-y-8 md:space-y-16">
            {timeline?.map((commit: TimelineEntry) => (
              <div key={commit.hash} id={commit.hash} className="relative scroll-mt-24">
                {/* Branch indicator */}
                <div
                  className="absolute left-8 md:left-0 top-6 w-4 h-4 rounded-full border-2 -translate-x-1/2 transition-colors duration-200"
                  style={{
                    backgroundColor: getCommitTypeColor(commit.type),
                    borderColor: 'var(--color-bg-secondary)'
                  }}
                />

                {/* Commit content */}
                <div className="ml-12 sm:ml-14 md:ml-20">
                  <div
                    className="border transition-colors duration-200"
                    style={{
                      borderColor: 'var(--color-border-primary)',
                      backgroundColor: 'var(--color-bg-primary)'
                    }}
                  >
                    {/* Header — meta + message + description */}
                    <div className="p-4 sm:p-6 md:p-8">
                      {/* Meta row */}
                      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-3">
                        <span
                          className="font-mono text-xs font-medium"
                          style={{ color: getCommitTypeColor(commit.type) }}
                        >
                          {commit.type}
                        </span>
                        <span
                          className="font-mono text-xs"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {commit.hash}
                        </span>
                        <span
                          className="font-mono text-xs"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {formatDate(commit.date)}
                        </span>
                        {commit.branch !== 'main' && (
                          <span
                            className="font-mono text-xs"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            {commit.branch}
                          </span>
                        )}
                        {commit.status === 'current' && (
                          <span
                            className="inline-flex items-center gap-1 font-mono text-xs"
                            style={{ color: 'var(--color-accent-green)' }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-pulse"
                              style={{ backgroundColor: 'var(--color-accent-green)' }}
                            />
                            now
                          </span>
                        )}
                      </div>

                      {/* Message */}
                      <h3
                        className="text-xl sm:text-2xl font-bold mb-2"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {commit.message}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm sm:text-base leading-relaxed max-w-3xl"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {commit.description}
                      </p>
                    </div>

                    {/* Detail sections — divided by a line */}
                    {commit.sections && commit.sections.length > 0 && (
                      <div
                        className="px-4 sm:px-6 md:px-8 py-6 border-t space-y-6 sm:space-y-8"
                        style={{ borderColor: 'var(--color-border-secondary)' }}
                      >
                        {commit.sections.map((section, sectionIndex) =>
                          renderSection(section, sectionIndex, commit.hash)
                        )}
                      </div>
                    )}

                    {/* Tags — divided by a line */}
                    <div
                      className="px-4 sm:px-6 md:px-8 py-3 border-t flex flex-wrap gap-x-4 gap-y-1"
                      style={{ borderColor: 'var(--color-border-secondary)' }}
                    >
                      {commit.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="font-mono text-xs"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        <GridOverlay />
      </div>
    </section>
  );
}
