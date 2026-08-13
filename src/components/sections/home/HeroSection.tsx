'use client';

import { useState, useEffect } from 'react';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { P, Div } from '@/components/i18n';

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = ['/images/profile/1.jpg', '/images/profile/2.jpg'];

  // Profile image cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Create multiple phases for a more dramatic effect
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 100);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section 
      id="hero"
      className="w-full min-h-screen relative transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Desktop Layout */}
      <div className="max-w-[1500px] mx-auto hidden md:block h-screen py-32">
        <div className="grid grid-cols-12 gap-0 h-full">
          {/* Left content area */}
          <div className="col-span-7 px-8 h-full">
            <div className="flex flex-col justify-between h-full">
              {/* Meta info */}
              <div
                className="font-mono text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Div
                  en="// Product Manager & Full-Stack Builder"
                  ja="// プロダクトマネージャー・フルスタック"
                />
                <Div
                  en="// Japan / Kyoto / Remote"
                  ja="// 日本 / 京都 / リモート"
                />
              </div>

              {/* Heading + description + CTA grouped, bottom-aligned */}
              <div className="space-y-8">
              {/* Main heading */}
              <div className="space-y-4">
                <h1
                  className="font-mono font-black text-4xl md:text-5xl leading-none"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <div>
                    <TypewriterText
                      text="const PdM = {"
                      speed={80}
                      delay={500}
                    />
                  </div>
                  <div className="ml-8 text-3xl md:text-4xl">
                    <TypewriterText 
                      text="name: " 
                      speed={80}
                      delay={2000}
                    />
                    <TypewriterText 
                      text="'Shota Yamashita'"
                      speed={80}
                      delay={2800}
                      style={{ color: 'var(--color-accent-green)' }}
                    />
                    <TypewriterText 
                      text="," 
                      speed={80}
                      delay={4200}
                    />
                  </div>
                  <div className="ml-8 text-3xl md:text-4xl">
                    <TypewriterText 
                      text="role: " 
                      speed={80}
                      delay={4600}
                    />
                    <TypewriterText
                      text="'Product Manager'"
                      speed={80}
                      delay={5200}
                      style={{ color: 'var(--color-text-secondary)' }}
                    />
                    <TypewriterText 
                      text="," 
                      speed={80}
                      delay={6000}
                    />
                  </div>
                  <div className="ml-8 text-3xl md:text-4xl">
                    <TypewriterText 
                      text="focus: " 
                      speed={80}
                      delay={6400}
                    />
                    <TypewriterText 
                      text="'AI Business Modeling'"
                      speed={80}
                      delay={7000}
                      style={{ color: 'var(--color-text-secondary)' }}
                    />
                    <TypewriterText 
                      text="," 
                      speed={80}
                      delay={8600}
                    />
                  </div>
                  <div>
                    <TypewriterText 
                      text="};" 
                      speed={80}
                      delay={9000}
                    />
                  </div>
                </h1>
              </div>
              
              {/* Description */}
              <div className="space-y-4 max-w-2xl">
                <P
                  en="Raised in Osaka, educated in Kyoto, then off to India — and somehow I ended up in the world of AI. The one thread running through it all: being honest about what looks interesting. Chasing the moment an idea starts to move. Full-stack, full-speed — believing the world shifts a little with everything I build."
                  ja="大阪で育ち、京都で学び、インドに飛び込んで、気づけばAIの世界にいました。共通点はひとつ、「面白そう」に正直だったこと。アイデアが動き出す瞬間を求めて。フルスタックで、フルスピードで。自分が手を動かした分だけ世界が少し変わると信じて。"
                  className="font-mono text-lg leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                />

                {/* <div
                  className="font-mono text-sm"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  <Div
                    en="// Current focus areas:"
                    ja="// 現在の重点領域:"
                  />
                  <Div
                    en="// - AI-driven Startup Creation"
                    ja="// - AI駆動のスタートアップ創造"
                  />
                  <Div
                    en="// - Agent-based Architectures"
                    ja="// - エージェントベースアーキテクチャ"
                  />
                  <Div
                    en="// - Full-stack Prototyping with Next.js & Python"
                    ja="// - Next.js & Pythonによるフルスタックプロトタイピング"
                  />
                </div> */}
              </div>
              
              {/* CTA */}
              <div className="flex items-center space-x-6 pt-8">
                <button
                  className="font-mono font-bold text-sm px-8 py-4 transition-all duration-200 hover:opacity-90 cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--color-text-primary)',
                    color: 'var(--color-bg-primary)'
                  }}
                  onClick={() => {
                    window.scrollTo({
                      top: document.getElementById('projects')?.offsetTop || 0,
                      behavior: 'smooth'
                    });
                  }}
                >
                  VIEW_PROJECTS()
                </button>
                <button
                  className="font-mono font-bold text-sm px-8 py-4 transition-all duration-200 hover:opacity-90 cursor-pointer"
                  style={{ 
                    border: `1px solid var(--color-text-primary)`,
                    color: 'var(--color-text-primary)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-text-primary)';
                    e.currentTarget.style.color = 'var(--color-bg-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                  onClick={() => {
                    window.scrollTo({
                      top: document.getElementById('contact')?.offsetTop || 0,
                      behavior: 'smooth'
                    });
                  }}
                >
                  CONTACT()
                </button>
              </div>
              </div>
            </div>
          </div>

          {/* Right info panel — full-bleed dynamic portrait */}
          <div className="col-span-5 pl-8 h-full relative">
            <div
              className="relative -my-32 h-screen w-full border-l overflow-hidden group transition-colors duration-200"
              style={{ borderColor: 'var(--color-border-primary)' }}
            >
              {/* Portrait fills the whole column */}
              <img
                src={images[currentImageIndex]}
                alt="Shota Yamashita"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isTransitioning
                    ? 'scale-110 blur-sm saturate-200 contrast-150 brightness-110'
                    : 'scale-105 group-hover:scale-100 blur-0 saturate-100 contrast-100 brightness-100'
                }`}
                style={{
                  filter: isTransitioning
                    ? 'brightness(1.3) hue-rotate(15deg) sepia(20%)'
                    : 'brightness(1) hue-rotate(0deg) sepia(0%)',
                  transform: isTransitioning
                    ? 'translateX(4px) skew(1deg)'
                    : 'translateX(0px) skew(0deg)'
                }}
              />

              {/* Readability gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.55) 100%)'
                }}
              ></div>

              {/* Glitch transition overlays */}
              {isTransitioning && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-green-400 to-transparent opacity-15 animate-ping"></div>
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        'linear-gradient(45deg, transparent 40%, rgba(0, 255, 255, 0.1) 50%, transparent 60%)',
                      animation: 'glitch-sweep 0.3s ease-out'
                    }}
                  ></div>
                </>
              )}

              {/* Terminal-style header overlay */}
              <div
                className="absolute top-0 left-0 right-0 z-20 px-4 py-2 border-b flex items-center gap-2"
                style={{
                  backgroundColor: 'rgba(var(--color-bg-secondary-rgb), 0.55)',
                  borderColor: 'var(--color-border-primary)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="font-mono text-xs text-white/90">picture.current</div>
              </div>

              {/* Bottom label overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 flex items-end justify-between"
                style={{ backdropFilter: 'blur(2px)' }}
              >
                <div className="font-mono text-white">
                  <div className="text-xs opacity-70">// picture.current</div>
                  <div className="text-sm font-bold tracking-tight">Shota Yamashita</div>
                </div>
                <div className="font-mono text-xs text-white/80">
                  {String(currentImageIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-[1500px] mx-auto h-full grid grid-cols-12 gap-0">
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

      {/* Mobile Layout */}
      <div className="md:hidden relative overflow-hidden">
        {/* Hero Background with Portrait */}
        <div className="relative h-screen flex items-center justify-center">
          {/* Background Image */}
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-200 ${
              isTransitioning ? 'scale-105 blur-sm' : 'scale-100 blur-0'
            }`}
            style={{
              backgroundImage: `url('${images[currentImageIndex]}')`,
              filter: `grayscale(30%) brightness(${
                document.documentElement.getAttribute('data-theme') === 'dark' 
                  ? '0.8' 
                  : '1.2'
              }) ${isTransitioning ? 'saturate(150%) contrast(125%)' : 'saturate(100%) contrast(100%)'}`
            }}
          />
          {isTransitioning && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
          )}
          
          {/* Overlay gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: document.documentElement.getAttribute('data-theme') === 'dark' 
                ? `linear-gradient(
                    135deg, 
                    rgba(0, 0, 0, 0.6) 0%, 
                    rgba(0, 0, 0, 0.5) 50%,
                    rgba(0, 0, 0, 0.7) 100%
                  )`
                : `linear-gradient(
                    135deg, 
                    rgba(255, 255, 255, 0.6) 0%, 
                    rgba(255, 255, 255, 0.5) 50%,
                    rgba(255, 255, 255, 0.7) 100%
                  )`
            }}
          />
          
          {/* Content overlay */}
          <div className="relative z-10 px-6 text-center space-y-8 max-w-sm">
            {/* Terminal window header */}
            <div 
              className="border transition-colors duration-200"
              style={{ 
                borderColor: 'var(--color-border-primary)',
                backgroundColor: 'rgba(var(--color-bg-secondary-rgb), 0.9)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div 
                className="px-4 py-2 border-b transition-colors duration-200 flex items-center gap-2"
                style={{ 
                  backgroundColor: 'rgba(var(--color-bg-primary-rgb), 0.8)',
                  borderColor: 'var(--color-border-primary)'
                }}
              >
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div 
                  className="font-mono text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  ~/pdm/profile.js
                </div>
              </div>
              
              <div className="p-4">
                {/* Main Code Block */}
                <div className="text-left">
                  <h1 
                    className="font-mono font-black text-lg leading-tight"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    <div>
                      <TypewriterText
                        text="const pdm = {"
                        speed={60}
                        delay={300}
                      />
                    </div>
                    <div className="ml-3 text-base">
                      <TypewriterText 
                        text="name: " 
                        speed={60}
                        delay={1200}
                      />
                      <TypewriterText 
                        text="'Shota Yamashita'"
                        speed={60}
                        delay={1800}
                        style={{ color: 'var(--color-accent-green)' }}
                      />
                      <TypewriterText 
                        text="," 
                        speed={60}
                        delay={2600}
                      />
                    </div>
                    <div className="ml-3 text-base">
                      <TypewriterText 
                        text="role: " 
                        speed={60}
                        delay={2900}
                      />
                      <TypewriterText
                        text="'Product Manager'"
                        speed={60}
                        delay={3200}
                        style={{ color: 'var(--color-text-secondary)' }}
                      />
                      <TypewriterText 
                        text="," 
                        speed={60}
                        delay={3600}
                      />
                    </div>
                    <div className="ml-3 text-base">
                      <TypewriterText 
                        text="focus: " 
                        speed={60}
                        delay={3800}
                      />
                      <TypewriterText 
                        text="'AI Business Modeling'"
                        speed={60}
                        delay={4000}
                        style={{ color: 'var(--color-text-secondary)' }}
                      />
                    </div>
                    <div>
                      <TypewriterText 
                        text="};" 
                        speed={60}
                        delay={4600}
                      />
                    </div>
                  </h1>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-left">
              <P
                en="Raised in Osaka, educated in Kyoto, then off to India — and somehow I ended up in the world of AI. The one thread running through it all: being honest about what looks interesting. Chasing the moment an idea starts to move. Full-stack, full-speed — believing the world shifts a little with everything I build."
                ja="大阪で育ち、京都で学び、インドに飛び込んで、気づけばAIの世界にいました。共通点はひとつ、「面白そう」に正直だったこと。アイデアが動き出す瞬間を求めて。フルスタックで、フルスピードで。自分が手を動かした分だけ世界が少し変わると信じて。"
                className="font-mono text-sm leading-relaxed"
                style={{ color: 'var(--color-text-primary)' }}
              />
              <div className="space-y-4">
                <a 
                  href="#projects"
                  className="block font-mono font-bold text-sm px-6 py-4 text-center transition-all duration-200 hover:opacity-90"
                  style={{ 
                    backgroundColor: 'var(--color-text-primary)',
                    color: 'var(--color-bg-primary)'
                  }}
                >
                  VIEW_PROJECTS()
                </a>
                <a
                  href="#contact"
                  className="block font-mono font-bold text-sm px-6 py-4 text-center transition-all duration-200 hover:opacity-90"
                  style={{ 
                    border: `1px solid var(--color-text-primary)`,
                    color: 'var(--color-text-primary)',
                    backgroundColor: 'transparent'
                  }}
                >
                  CONTACT()
                </a>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div 
              className="font-mono text-xs animate-bounce"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <div>scroll</div>
              <div className="text-center">↓</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}

      </div>

      {/* CSS Keyframes for glitch effect */}
      <style jsx>{`
        @keyframes glitch-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}