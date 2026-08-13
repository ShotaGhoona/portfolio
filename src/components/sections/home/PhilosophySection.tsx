'use client';

import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Div, P } from '@/components/i18n';

export function PhilosophySection() {

  return (
    <section 
      id="philosophy"
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <SectionTitle
            sectionNumber="01."
            sectionTitle={{ en: "Philosophy", ja: "哲学" }}
            line1={{ en: "Development philosophy and", ja: "開発の哲学と" }}
            line2={{ en: "algorithmic mindset", ja: "アルゴリズム的思考" }}
          />
          
          {/* Philosophy content */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            <div className="space-y-16">
              {/* Hero statement — Sleepless Rabbit */}
              <div>
                <Div
                  en="THE SLEEPLESS RABBIT"
                  ja="眠らぬうさぎ"
                  className="font-mono text-xs tracking-[0.2em] mb-4"
                  style={{ color: 'var(--color-accent-green)' }}
                />
                <Div
                  en="Nobody beats a rabbit that never sleeps."
                  ja="眠らぬうさぎには、誰も勝てない。"
                  className="font-mono font-black leading-[1.15] text-3xl md:text-5xl"
                  style={{ color: 'var(--color-text-primary)' }}
                />
                <div className="mt-8 max-w-2xl space-y-4">
                  <P
                    en="You know the story of the tortoise and the hare. The lesson, they say, is the tortoise's relentless effort. But shouldn't we admire the rabbit's legs, too? The hare only lost because it fell asleep."
                    ja="うさぎとかめの物語を知っていますか。教訓はカメの弛まぬ努力だと言われます。でも、本当に賞賛されるべきはウサギの脚ではないでしょうか。ウサギが負けたのは、眠ってしまったからです。"
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  />
                  <P
                    en="So I decided to be the rabbit that never sleeps. Every single day, creation beyond imagination."
                    ja="だから僕は、眠らないウサギであろうと決めました。毎日、想像を超える創造を。"
                    className="text-base md:text-lg leading-relaxed font-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  />
                </div>
              </div>

              {/* Animation Analysis */}
              <div>
                <Div
                  en="Performance Analysis"
                  ja="パフォーマンス解析"
                  className="font-mono text-lg font-bold mb-6"
                  style={{ color: 'var(--color-text-primary)' }}
                />
                
                {/* Three animation code blocks */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {philosophyData.algorithm.metrics.map((metric, index) => (
                    <div 
                      key={index}
                      className="border transition-colors duration-200"
                      style={{ 
                        borderColor: 'var(--color-border-primary)',
                        backgroundColor: 'var(--color-bg-secondary)'
                      }}
                    >
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
                </div> */}
                
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
                <Div
                  en="Core Principles"
                  ja="大切にしていること"
                  className="font-mono text-lg font-bold mb-6"
                  style={{ color: 'var(--color-text-primary)' }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {/* Principle 001 */}
                  <div
                    className="pl-5 border-l-2"
                    style={{ borderColor: 'var(--color-accent-green)' }}
                  >
                    <div
                      className="font-mono text-xs mb-2"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      01
                    </div>
                    <Div
                      en="Pioneering at Speed"
                      ja="常に最速で"
                      className="text-lg font-bold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    />
                    <P
                      en="Dive into uncharted possibilities faster than anyone. Speed increases risk, but hesitation costs more."
                      ja="未知の可能性に、誰よりも早く飛び込む。スピードはリスクを増やすけれど、ためらいの代償はもっと大きいから。"
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    />
                  </div>

                  {/* Principle 002 */}
                  <div
                    className="pl-5 border-l-2"
                    style={{ borderColor: 'var(--color-accent-green)' }}
                  >
                    <div
                      className="font-mono text-xs mb-2"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      02
                    </div>
                    <Div
                      en="Curiosity Driven"
                      ja="好奇心がガソリン"
                      className="text-lg font-bold mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    />
                    <P
                      en="Pure curiosity sparks value. Keep a childlike gaze, ask 'Why?', and experiment without fear."
                      ja="「なぜ？」という純粋な問いが、価値を生む。子どもの目線で好奇心を解き放って、こわがらずに試してみる。"
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    />
                  </div>

                  {/* Principle 003 */}
                  {/* <div
                    className="border transition-all duration-200 hover:shadow-lg"
                    style={{
                      borderColor: 'var(--color-border-primary)',
                      backgroundColor: 'var(--color-bg-secondary)'
                    }}
                  >
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
                          principle_003.js
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <Div
                        en="Be a Pro"
                        ja="正しく在る。"
                        className="font-mono text-sm font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                      />
                      <P
                        en="Show facts transparently, compete with integrity. Success builds on sincerity, not excuses."
                        ja="事実を堂々と示し、誠実に勝負する。言い逃れではなく、誠実さが勝利の土台。"
                        className="font-mono text-xs leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                      />
                      <div
                        className="p-3 font-mono text-xs border-l-2 transition-colors duration-200"
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-accent-green)'
                        }}
                      >
                        <span style={{ color: 'var(--color-accent-green)' }}>
                          excuses.delete(); facts.show(); integrity.compete();
                        </span>
                      </div>
                    </div>
                  </div> */}

                  {/* Principle 004 */}
                  {/* <div
                    className="border transition-all duration-200 hover:shadow-lg"
                    style={{
                      borderColor: 'var(--color-border-primary)',
                      backgroundColor: 'var(--color-bg-secondary)'
                    }}
                  >
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
                          principle_004.js
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <Div
                        en="Elevate Self, Elevate All"
                        ja="Elevate Self, Elevate All"
                        className="font-mono text-sm font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                      />
                      <P
                        en="Sharpen expertise first, then multiply through collaboration. Innovation emerges from individual excellence."
                        ja="まず自分の専門性を磨く。協力により、個性の化学反応からイノベーションが生まれる。"
                        className="font-mono text-xs leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                      />
                      <div
                        className="p-3 font-mono text-xs border-l-2 transition-colors duration-200"
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-accent-green)'
                        }}
                      >
                        <span style={{ color: 'var(--color-accent-green)' }}>
                          expertise.level++; return expertise ** team.chemistry;
                        </span>
                      </div>
                    </div>
                  </div> */}
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