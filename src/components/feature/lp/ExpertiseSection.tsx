import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import expertiseTranslations from '@/data/translations/expertise.json';
import { 
  SiDocker, SiGit, SiSupabase, SiVercel, SiRailway,
  SiTypescript, SiReact, SiNextdotjs, SiFramer, SiThreedotjs,
  SiFastapi, SiNodedotjs, SiPytorch, SiFigma, SiAdobeillustrator, SiAdobexd
} from 'react-icons/si';
import { 
  FaCode, FaPaintBrush, FaRobot
} from 'react-icons/fa';
import { 
  HiCpuChip
} from 'react-icons/hi2';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';

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
    
    // Backend Skills
    'FastAPI': <SiFastapi className="w-4 h-4" />,
    'Next.js API Routes': <SiNextdotjs className="w-4 h-4" />,
    'Node.js': <SiNodedotjs className="w-4 h-4" />,
    'PyTorch': <SiPytorch className="w-4 h-4" />,
    
    // Tools & Stack
    'Git / GitHub': <SiGit className="w-4 h-4" />,
    'Docker': <SiDocker className="w-4 h-4" />,
    'Supabase': <SiSupabase className="w-4 h-4" />,
    'Vercel': <SiVercel className="w-4 h-4" />,
    'Railway / Render': <SiRailway className="w-4 h-4" />,
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

export function ExpertiseSection() {
  const { language } = useLanguage();
  const [expertiseData, setExpertiseData] = useState(expertiseTranslations[language] || expertiseTranslations.en);

  useEffect(() => {
    setExpertiseData(expertiseTranslations[language] || expertiseTranslations.en);
  }, [language]);
  return (
    <section 
      id="expertise"
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <SectionTitle
            sectionNumber="03."
            sectionTitle={expertiseData.sectionTitle}
            line1={expertiseData.subtitle.line1}
            line2={expertiseData.subtitle.line2}
          />

          {/* Expertise content */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {expertiseData.skillCategories.slice(0, 2).map((category) => (
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
                        {category.title}
                      </div>
                    </div>
                    <div 
                      className="p-4 space-y-3 transition-colors duration-200"
                      style={{ backgroundColor: 'var(--color-bg-primary)' }}
                    >
                      {category.skills.map((skill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-3">
                            <div 
                              className="flex-shrink-0 transition-colors duration-200"
                              style={{ color: 'var(--color-accent-green)' }}
                            >
                              {getSkillIcon(skill.name)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between font-mono text-xs">
                                <span style={{ color: 'var(--color-text-primary)' }}>{skill.name}</span>
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
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {expertiseData.skillCategories.slice(2, 4).map((category) => (
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
                        {category.title}
                      </div>
                    </div>
                    <div 
                      className="p-4 space-y-3 transition-colors duration-200"
                      style={{ backgroundColor: 'var(--color-bg-primary)' }}
                    >
                      {category.skills.map((skill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-3">
                            <div 
                              className="flex-shrink-0 transition-colors duration-200"
                              style={{ color: 'var(--color-accent-green)' }}
                            >
                              {getSkillIcon(skill.name)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between font-mono text-xs">
                                <span style={{ color: 'var(--color-text-primary)' }}>{skill.name}</span>
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
                      ))}
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
                    {expertiseData.experiences.title}
                  </div>
                  <div className="space-y-2">
                    {expertiseData.experiences.items.map((cert, index) => (
                      <div 
                        key={index} 
                        className="font-mono text-xs"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        <span style={{ color: 'var(--color-accent-green)' }}>✓</span> {cert}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div 
                    className="font-mono text-sm font-bold mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {expertiseData.education.title}
                  </div>
                  <div className="space-y-2">
                    {expertiseData.education.items.map((item, index) => (
                      <div 
                        key={index}
                        className="font-mono text-xs"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        <span style={{ color: 'var(--color-accent-green)' }}>✓</span> {item}
                      </div>
                    ))}
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