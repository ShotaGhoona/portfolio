import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import philosophyTranslations from '@/data/translations/philosophy.json';

export function PhilosophySection() {
  const { language } = useLanguage();
  const [philosophyData, setPhilosophyData] = useState(philosophyTranslations[language] || philosophyTranslations.en);

  useEffect(() => {
    setPhilosophyData(philosophyTranslations[language] || philosophyTranslations.en);
  }, [language]);

  return (
    <section 
      id="philosophy"
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Section header */}
          <div 
            className="col-span-1 md:col-span-3 px-4 md:px-8 pb-8 md:pb-0 md:border-r"
            style={{ borderColor: 'var(--color-border-secondary)' }}
          >
            <div className="md:sticky md:top-40">
              <div 
                className="font-mono font-black text-xl md:text-2xl mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                01.
              </div>
              <h2 
                className="font-mono font-black text-lg md:text-xl mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {philosophyData.sectionTitle}
              </h2>
              <div 
                className="font-mono text-xs mb-6 md:mb-0"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <div>{`// ${philosophyData.subtitle.line1}`}</div>
                <div>{`// ${philosophyData.subtitle.line2}`}</div>
              </div>
            </div>
          </div>
          
          {/* Philosophy content */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            <div className="space-y-12">
              {/* Core concept */}
              <div 
                className="border transition-colors duration-200"
                style={{ 
                  borderColor: 'var(--color-border-primary)',
                  backgroundColor: 'var(--color-bg-secondary)'
                }}
              >
                <div 
                  className="px-4 py-3 border-b transition-colors duration-200"
                  style={{ 
                    borderColor: 'var(--color-border-primary)',
                    backgroundColor: 'var(--color-bg-primary)'
                  }}
                >
                  <div 
                    className="font-mono text-lg font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {philosophyData.concept.title}
                  </div>
                  <div 
                    className="font-mono text-xs mt-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {philosophyData.concept.subtitle}
                  </div>
                </div>
                <div className="p-6">
                  <p 
                    className="font-mono text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {philosophyData.concept.description}
                  </p>
                </div>
              </div>

              {/* Animation Analysis */}
              <div>
                <div 
                  className="font-mono text-lg font-bold mb-6"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {philosophyData.algorithm.title}
                </div>
                
                {/* Three animation code blocks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {philosophyData.algorithm.metrics.map((metric, index) => (
                    <div 
                      key={index}
                      className="border transition-colors duration-200"
                      style={{ 
                        borderColor: 'var(--color-border-primary)',
                        backgroundColor: 'var(--color-bg-secondary)'
                      }}
                    >
                      {/* Code editor header */}
                      <div 
                        className="px-3 py-2 border-b font-mono text-xs flex items-center gap-2 transition-colors duration-200"
                        style={{ 
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-border-primary)'
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <span style={{ color: 'var(--color-text-secondary)' }}>
                          {metric.actor.toLowerCase().replace(/\s+/g, '_')}.js
                        </span>
                      </div>
                      
                      {/* Animation code */}
                      <div className="p-3 font-mono text-xs leading-relaxed">
                        <div style={{ color: 'var(--color-text-secondary)' }}>
                          <div style={{ color: '#666' }}>{`// ${metric.actor}`}</div>
                          <div style={{ color: '#8b5cf6' }}>function</div> <span style={{ color: 'var(--color-text-primary)' }}>animate</span>() {'{'}
                        </div>
                        <div className="ml-2 space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                          {index === 0 && ( // Traditional Hare
                            <>
                              <div><span style={{ color: '#ef4444' }}>for</span>(i=<span style={{ color: '#10b981' }}>0</span>; i&lt;<span style={{ color: '#10b981' }}>80</span>; i++) {'{'}</div>
                              <div className="ml-2">
                                <div>speed = <span style={{ color: '#10b981' }}>100</span>;</div>
                                <div><span style={{ color: '#f59e0b' }}>move</span>(speed);</div>
                              </div>
                              <div>{'}'}</div>
                              <div><span style={{ color: '#ef4444' }}>sleep</span>(<span style={{ color: '#10b981' }}>infinity</span>); <span style={{ color: '#666' }}>{`// 停止`}</span></div>
                            </>
                          )}
                          {index === 1 && ( // Steady Tortoise
                            <>
                              <div><span style={{ color: '#ef4444' }}>for</span>(i=<span style={{ color: '#10b981' }}>0</span>; i&lt;<span style={{ color: '#10b981' }}>100</span>; i++) {'{'}</div>
                              <div className="ml-2">
                                <div>speed = <span style={{ color: '#10b981' }}>10</span>;</div>
                                <div><span style={{ color: '#3b82f6' }}>move</span>(speed);</div>
                                <div><span style={{ color: '#3b82f6' }}>wait</span>(<span style={{ color: '#10b981' }}>100</span>);</div>
                              </div>
                              <div>{'}'}</div>
                            </>
                          )}
                          {index === 2 && ( // Sleepless Rabbit
                            <>
                              <div><span style={{ color: '#ef4444' }}>for</span>(i=<span style={{ color: '#10b981' }}>0</span>; i&lt;<span style={{ color: '#10b981' }}>100</span>; i++) {'{'}</div>
                              <div className="ml-2">
                                <div>speed = <span style={{ color: '#10b981' }}>100</span>;</div>
                                <div><span style={{ color: 'var(--color-accent-green)' }}>sprint</span>(speed);</div>
                                <div>sleep = <span style={{ color: '#ef4444' }}>false</span>; <span style={{ color: '#666' }}>{`// 眠らない`}</span></div>
                              </div>
                              <div>{'}'}</div>
                            </>
                          )}
                        </div>
                        <div style={{ color: 'var(--color-text-secondary)' }}>{'}'}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Live animation preview */}
                <div 
                  className="border transition-colors duration-200"
                  style={{ 
                    borderColor: 'var(--color-border-primary)',
                    backgroundColor: 'var(--color-bg-secondary)'
                  }}
                >
                  <div 
                    className="px-4 py-2 border-b font-mono text-xs flex items-center gap-3 transition-colors duration-200"
                    style={{ 
                      backgroundColor: 'var(--color-bg-primary)',
                      borderColor: 'var(--color-border-primary)'
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      live_race_simulation.html
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span style={{ color: 'var(--color-text-secondary)' }}>RUNNING</span>
                    </div>
                  </div>
                  
                  {/* Animation track */}
                  <div className="p-6">
                    <div className="space-y-6">
                      {/* Track labels */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        <div>RUNNER</div>
                        <div className="hidden md:block">STRATEGY</div>
                        <div className="hidden md:block">STATUS</div>
                        <div>PROGRESS</div>
                      </div>
                      
                      {/* Traditional Hare Track */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center font-mono text-xs">
                          <div style={{ color: '#f59e0b' }}>🐰 Traditional Hare</div>
                          <div className="hidden md:block" style={{ color: 'var(--color-text-secondary)' }}>Burst + Sleep</div>
                          <div className="hidden md:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                            <span style={{ color: '#f59e0b' }}>SLEEPING</span>
                          </div>
                          <div>80%</div>
                        </div>
                        <div 
                          className="h-2 rounded-full relative overflow-hidden"
                          style={{ backgroundColor: 'var(--color-border-secondary)' }}
                        >
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              backgroundColor: '#f59e0b',
                              animation: 'hareMove 4s ease-out forwards'
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Steady Tortoise Track */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center font-mono text-xs">
                          <div style={{ color: '#3b82f6' }}>🐢 Steady Tortoise</div>
                          <div className="hidden md:block" style={{ color: 'var(--color-text-secondary)' }}>Consistent Step</div>
                          <div className="hidden md:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span style={{ color: '#3b82f6' }}>MOVING</span>
                          </div>
                          <div>100%</div>
                        </div>
                        <div 
                          className="h-2 rounded-full relative overflow-hidden"
                          style={{ backgroundColor: 'var(--color-border-secondary)' }}
                        >
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              backgroundColor: '#3b82f6',
                              animation: 'tortoiseMove 10s linear forwards'
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Sleepless Rabbit Track */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center font-mono text-xs">
                          <div style={{ color: 'var(--color-accent-green)' }}>🚀 Sleepless Rabbit</div>
                          <div className="hidden md:block" style={{ color: 'var(--color-text-secondary)' }}>Continuous Sprint</div>
                          <div className="hidden md:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span style={{ color: 'var(--color-accent-green)' }}>SPRINTING</span>
                          </div>
                          <div>100%</div>
                        </div>
                        <div 
                          className="h-2 rounded-full relative overflow-hidden"
                          style={{ backgroundColor: 'var(--color-border-secondary)' }}
                        >
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              backgroundColor: 'var(--color-accent-green)',
                              animation: 'rabbitSprint 5s ease-in-out forwards'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CSS Animations */}
              <style jsx>{`
                @keyframes hareMove {
                  0% { width: 0%; }
                  100% { width: 80%; }
                }
                
                @keyframes tortoiseMove {
                  0% { width: 0%; }
                  100% { width: 100%; }
                }
                
                @keyframes rabbitSprint {
                  0% { width: 0%; }
                  100% { width: 100%; }
                }
              `}</style>

              {/* Principles */}
              <div>
                <div 
                  className="font-mono text-lg font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Core Principles
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {philosophyData.principles.map((principle) => (
                    <div 
                      key={principle.id}
                      className="border transition-all duration-200 hover:shadow-lg"
                      style={{ 
                        borderColor: 'var(--color-border-primary)',
                        backgroundColor: 'var(--color-bg-secondary)'
                      }}
                    >
                      {/* Code editor header */}
                      <div 
                        className="px-3 py-2 border-b font-mono text-xs flex items-center justify-between transition-colors duration-200"
                        style={{ 
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-border-primary)'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                          <span style={{ color: 'var(--color-text-secondary)' }}>
                            principle_{principle.id}.js
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <div 
                          className="font-mono text-sm font-bold"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {principle.title}
                        </div>
                        <p 
                          className="font-mono text-xs leading-relaxed"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {principle.description}
                        </p>
                        
                        {/* Code block */}
                        <div 
                          className="p-3 font-mono text-xs border-l-2 transition-colors duration-200"
                          style={{ 
                            backgroundColor: 'var(--color-bg-primary)',
                            borderColor: 'var(--color-accent-green)'
                          }}
                        >
                          <span style={{ color: 'var(--color-accent-green)' }}>
                            {principle.code}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-6xl mx-auto h-full grid grid-cols-12 gap-0">
            {Array.from({ length: 12 }).map((_, index) => (
              <div 
                key={index} 
                className="h-full"
                style={{ 
                  borderRight: index < 11 ? `1px solid var(--color-border-primary)` : 'none',
                  opacity: 0.3
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}