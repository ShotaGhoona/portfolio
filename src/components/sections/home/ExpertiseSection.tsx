'use client';

import {
  SiDocker, SiGit, SiSupabase,
  SiTypescript, SiReact, SiNextdotjs, SiFramer, SiThreedotjs,
  SiFastapi, SiNodedotjs, SiPytorch, SiFigma, SiAdobeillustrator, SiAdobexd
} from 'react-icons/si';
import {
  FaCode, FaPaintBrush, FaRobot
} from 'react-icons/fa';
import {
  HiCpuChip
} from 'react-icons/hi2';
import { SiGoland } from 'react-icons/si';
import { useState } from 'react';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useLanguage } from '@/hooks/useLanguage';

// Icon mapping function
const getSkillIcon = (skillName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    // Frontend Skills
    'React': <SiReact className="w-4 h-4" />,
    'Next.js': <SiNextdotjs className="w-4 h-4" />,
    'TypeScript': <SiTypescript className="w-4 h-4" />,
    'shadcn/ui': <HiCpuChip className="w-4 h-4" />,
    'Framer Motion': <SiFramer className="w-4 h-4" />,
    'three.js': <SiThreedotjs className="w-4 h-4" />,
    'gsap': <FaCode className="w-4 h-4" />,

    // Backend Skills
    'FastAPI': <SiFastapi className="w-4 h-4" />,
    'Golang': <SiGoland className="w-4 h-4" />,
    'Next.js API Routes': <SiNextdotjs className="w-4 h-4" />,
    'Node.js': <SiNodedotjs className="w-4 h-4" />,
    'PyTorch': <SiPytorch className="w-4 h-4" />,

    // Tools & Stack
    'Git / GitHub': <SiGit className="w-4 h-4" />,
    'Docker': <SiDocker className="w-4 h-4" />,
    'Supabase': <SiSupabase className="w-4 h-4" />,
    'AI live coding': <FaRobot className="w-4 h-4" />,

    // Design Skills (English)
    'UX design': <FaPaintBrush className="w-4 h-4" />,
    'UI design': <FaPaintBrush className="w-4 h-4" />,
    'Figma': <SiFigma className="w-4 h-4" />,
    'Adobe Illustrator': <SiAdobeillustrator className="w-4 h-4" />,
    'Adobe XD': <SiAdobexd className="w-4 h-4" />,

    // Design Skills (Japanese)
    'UXデザイン': <FaPaintBrush className="w-4 h-4" />,
    'UIデザイン': <FaPaintBrush className="w-4 h-4" />
  };

  return iconMap[skillName] || <FaCode className="w-4 h-4" />;
};

// Circular progress ring with a centered skill icon
function SkillRing({ skillName, level }: { skillName: string; level: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * level) / 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg width="64" height="64" className="-rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            strokeWidth="3"
            style={{ stroke: 'var(--color-border-secondary)' }}
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              stroke: 'var(--color-accent-green)',
              transition: 'stroke-dashoffset 1s ease'
            }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {getSkillIcon(skillName)}
        </div>
      </div>
      <div
        className="font-mono text-[10px] text-center leading-tight"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {skillName}
      </div>
    </div>
  );
}

// Expand/collapse control shaped like a skill ring: "+N" in the middle, a
// terminal-style command as the label, and an interactive ring that fills on
// hover with a blinking cursor.
function ExpandRing({
  expanded,
  count,
  onToggle,
}: {
  expanded: boolean;
  count: number;
  onToggle: () => void;
}) {
  const [hover, setHover] = useState(false);
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const level = hover ? 100 : 14;
  const offset = circumference - (circumference * level) / 100;

  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={expanded ? 'show less' : 'show more'}
      className="flex flex-col items-center gap-2 cursor-pointer"
    >
      <div className="relative w-16 h-16">
        <svg width="64" height="64" className="-rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            strokeWidth="3"
            strokeDasharray="3 4"
            style={{ stroke: 'var(--color-border-secondary)' }}
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              stroke: 'var(--color-accent-alt)',
              transition: 'stroke-dashoffset 0.5s ease',
            }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center font-mono font-bold text-sm transition-transform duration-300"
          style={{
            color: 'var(--color-accent-alt)',
            transform: hover ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {expanded ? '−' : `+${count}`}
        </div>
      </div>
      <div
        className="font-mono text-[10px] text-center leading-tight whitespace-nowrap"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {expanded ? '$ less' : '$ ls --all'}
        <span
          className={`inline-block ml-0.5 ${hover ? 'animate-pulse' : ''}`}
          style={{ opacity: hover ? 1 : 0 }}
        >
          ▍
        </span>
      </div>
    </button>
  );
}

// Skill data structure with i18n
const skillCategories = [
  {
    id: 'frontend',
    title: { en: 'frontend.skills', ja: 'frontend.skills' },
    skills: [
      { name: { en: 'React', ja: 'React' }, level: 60 },
      { name: { en: 'Next.js', ja: 'Next.js' }, level: 80 },
      { name: { en: 'TypeScript', ja: 'TypeScript' }, level: 80 },
      { name: { en: 'shadcn/ui', ja: 'shadcn/ui' }, level: 95 },
      { name: { en: 'Framer Motion', ja: 'Framer Motion' }, level: 50 },
      { name: { en: 'three.js', ja: 'three.js' }, level: 80 },
      { name: { en: 'gsap', ja: 'gsap' }, level: 80 }
    ]
  },
  {
    id: 'backend',
    title: { en: 'backend.skills', ja: 'backend.skills' },
    skills: [
      { name: { en: 'FastAPI', ja: 'FastAPI' }, level: 70 },
      { name: { en: 'Golang', ja: 'Golang' }, level: 20 },
      { name: { en: 'Next.js API Routes', ja: 'Next.js API Routes' }, level: 70 },
      { name: { en: 'Node.js', ja: 'Node.js' }, level: 50 },
      { name: { en: 'PyTorch', ja: 'PyTorch' }, level: 40 }
    ]
  },
  {
    id: 'tools',
    title: { en: 'tools.stack', ja: 'tools.stack' },
    skills: [
      { name: { en: 'Git / GitHub', ja: 'Git / GitHub' }, level: 64 },
      { name: { en: 'Docker', ja: 'Docker' }, level: 50 },
      { name: { en: 'Supabase', ja: 'Supabase' }, level: 70 },
      { name: { en: 'AI live coding', ja: 'AI live coding' }, level: 100 }
    ]
  },
  {
    id: 'design',
    title: { en: 'design.systems', ja: 'design.systems' },
    skills: [
      { name: { en: 'UX design', ja: 'UXデザイン' }, level: 80 },
      { name: { en: 'UI design', ja: 'UIデザイン' }, level: 95 },
      { name: { en: 'Figma', ja: 'Figma' }, level: 85 },
      { name: { en: 'Adobe Illustrator', ja: 'Adobe Illustrator' }, level: 70 },
      { name: { en: 'Adobe XD', ja: 'Adobe XD' }, level: 68 }
    ]
  }
];

export function ExpertiseSection() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expanded, setExpanded] = useState(false);

  const filters = ['all', ...skillCategories.map((c) => c.id)];
  const visibleSkills = skillCategories
    .filter((c) => activeFilter === 'all' || c.id === activeFilter)
    .flatMap((c) => c.skills);

  // Collapsed: 7 skills + the expand ring fill exactly 1 row (desktop, 8 cols)
  // / 2 rows (mobile, 4 cols).
  const COLLAPSED_VISIBLE = 7;
  const hiddenCount = visibleSkills.length - COLLAPSED_VISIBLE;
  const canExpand = hiddenCount > 0;
  const shownSkills =
    expanded || !canExpand ? visibleSkills : visibleSkills.slice(0, COLLAPSED_VISIBLE);

  return (
    <section
      id="expertise"
      className="w-full py-24 relative transition-colors duration-200"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <SectionTitle
            sectionNumber="03."
            sectionTitle={{ en: 'TECHNICAL_EXPERTISE', ja: '技術的専門性' }}
            line1={{ en: 'Core competencies and', ja: 'コア・コンピテンシーと' }}
            line2={{ en: 'specialized knowledge areas', ja: '専門知識領域' }}
          />

          {/* Expertise content */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setExpanded(false);
                    }}
                    className="font-mono text-xs px-3 py-1.5 border transition-colors duration-200"
                    style={{
                      color: isActive ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                      backgroundColor: isActive ? 'var(--color-accent-green)' : 'transparent',
                      borderColor: isActive ? 'var(--color-accent-green)' : 'var(--color-border-primary)'
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Skill rings — 7 skills + an interactive "+N" ring fill 1 row
                (desktop) / 2 rows (mobile); the ring expands the rest inline. */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-6">
              {shownSkills.map((skill, index) => {
                const skillName = language === 'ja' ? skill.name.ja : skill.name.en;
                return (
                  <SkillRing key={`${skillName}-${index}`} skillName={skillName} level={skill.level} />
                );
              })}
              {canExpand && (
                <ExpandRing
                  expanded={expanded}
                  count={hiddenCount}
                  onToggle={() => setExpanded((v) => !v)}
                />
              )}
            </div>
          </div>
        </div>
        <GridOverlay />
      </div>
    </section>
  );
}