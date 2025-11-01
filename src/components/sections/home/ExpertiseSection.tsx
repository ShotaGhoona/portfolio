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
import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Div, Span } from '@/components/i18n';
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {skillCategories.slice(0, 2).map((category) => (
                <div key={category.id} className="space-y-8">
                  <div
                    className="border transition-colors duration-200"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <div
                      className="px-4 py-3 border-b transition-colors duration-200"
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border-primary)'
                      }}
                    >
                      <div
                        className="font-mono text-sm font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {language === 'ja' ? category.title.ja : category.title.en}
                      </div>
                    </div>
                    <div
                      className="p-4 space-y-3 transition-colors duration-200"
                      style={{ backgroundColor: 'var(--color-bg-primary)' }}
                    >
                      {category.skills.map((skill, index) => {
                        const skillName = language === 'ja' ? skill.name.ja : skill.name.en;
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex-shrink-0 transition-colors duration-200"
                                style={{ color: 'var(--color-accent-green)' }}
                              >
                                {getSkillIcon(skillName)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between font-mono text-xs">
                                  <span style={{ color: 'var(--color-text-primary)' }}>{skillName}</span>
                                  <span style={{ color: 'var(--color-text-secondary)' }}>{skill.level}%</span>
                                </div>
                                <div
                                  className="w-full h-1 mt-1"
                                  style={{ backgroundColor: 'var(--color-border-secondary)' }}
                                >
                                  <div
                                    className="h-1 transition-all duration-1000"
                                    style={{
                                      width: `${skill.level}%`,
                                      backgroundColor: 'var(--color-accent-green)'
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {skillCategories.slice(2, 4).map((category) => (
                <div key={category.id} className="space-y-8">
                  <div
                    className="border transition-colors duration-200"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <div
                      className="px-4 py-3 border-b transition-colors duration-200"
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border-primary)'
                      }}
                    >
                      <div
                        className="font-mono text-sm font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {language === 'ja' ? category.title.ja : category.title.en}
                      </div>
                    </div>
                    <div
                      className="p-4 space-y-3 transition-colors duration-200"
                      style={{ backgroundColor: 'var(--color-bg-primary)' }}
                    >
                      {category.skills.map((skill, index) => {
                        const skillName = language === 'ja' ? skill.name.ja : skill.name.en;
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex-shrink-0 transition-colors duration-200"
                                style={{ color: 'var(--color-accent-green)' }}
                              >
                                {getSkillIcon(skillName)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between font-mono text-xs">
                                  <span style={{ color: 'var(--color-text-primary)' }}>{skillName}</span>
                                  <span style={{ color: 'var(--color-text-secondary)' }}>{skill.level}%</span>
                                </div>
                                <div
                                  className="w-full h-1 mt-1"
                                  style={{ backgroundColor: 'var(--color-border-secondary)' }}
                                >
                                  <div
                                    className="h-1 transition-all duration-1000"
                                    style={{
                                      width: `${skill.level}%`,
                                      backgroundColor: 'var(--color-accent-green)'
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Certifications & Education */}
            <div
              className="mt-12 pt-8 transition-colors duration-200"
              style={{ borderTop: `1px solid var(--color-border-secondary)` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <div>
                  <div
                    className="font-mono text-sm font-bold mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    notable.experiences[]
                  </div>
                  <div className="space-y-2">
                    <div
                      className="font-mono text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <span style={{ color: 'var(--color-accent-green)' }}>✓</span>{' '}
                      <Span
                        en="Lived in India for 1 year"
                        ja="1年間インド留学を経験"
                      />
                    </div>
                    <div
                      className="font-mono text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <span style={{ color: 'var(--color-accent-green)' }}>✓</span>{' '}
                      <Span
                        en="Founded Ghoona Inc. during university"
                        ja="大学在学中にGhoona Inc.を設立"
                      />
                    </div>
                    <div
                      className="font-mono text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <span style={{ color: 'var(--color-accent-green)' }}>✓</span>{' '}
                      <Span
                        en="Building full-stack AI products"
                        ja="AIプロダクトをフルスタックで開発中"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    className="font-mono text-sm font-bold mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    education.background[]
                  </div>
                  <div className="space-y-2">
                    <div
                      className="font-mono text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <span style={{ color: 'var(--color-accent-green)' }}>✓</span>{' '}
                      <Span
                        en="B.A. in Architecture • Kyoto University • 2020–2026"
                        ja="京都大学建築学部 • 2020–2026"
                      />
                    </div>
                    <div
                      className="font-mono text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <span style={{ color: 'var(--color-accent-green)' }}>✓</span>{' '}
                      <Span
                        en="Exchange Program (ICT & Development) • India • 2023-2024"
                        ja="インド留学（ICT & Development） • 2023-2024"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GridOverlay />
      </div>
    </section>
  );
}