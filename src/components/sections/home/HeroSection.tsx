'use client';

import { TypewriterText } from '@/components/ui/TypewriterText';
import { P, Div } from '@/components/i18n';

const DESCRIPTION = {
  en: "Raised in Osaka, educated in Kyoto, then off to India — and somehow I ended up in the world of AI. The one thread running through it all: being honest about what looks interesting. Chasing the moment an idea starts to move. Full-stack, full-speed — believing the world shifts a little with everything I build.",
  ja: '大阪で育ち、京都で学び、インドに飛び込んで、気づけばAIの世界にいました。共通点はひとつ、「面白そう」に正直だったこと。アイデアが動き出す瞬間を求めて。フルスタックで、フルスピードで。自分が手を動かした分だけ世界が少し変わると信じて。'
};

function MetaLines({ className = '' }: { className?: string }) {
  return (
    <div className={`font-mono ${className}`} style={{ color: 'var(--color-text-secondary)' }}>
      <Div
        en="// Product Manager & Full-Stack Builder"
        ja="// プロダクトマネージャー・フルスタック"
      />
      <Div en="// Japan / Kyoto / Remote" ja="// 日本 / 京都 / リモート" />
    </div>
  );
}

// The `const PdM = { ... }` code heading, shared by mobile and desktop.
function CodeHeading() {
  return (
    <h1
      className="font-mono font-black text-2xl sm:text-3xl md:text-5xl leading-none whitespace-nowrap"
      style={{
        color: 'var(--color-text-primary)',
        textShadow: '0 0 12px var(--color-bg-primary), 0 0 4px var(--color-bg-primary)'
      }}
    >
      <div>
        <TypewriterText text="const PdM = {" speed={80} delay={500} />
      </div>
      <div className="ml-4 sm:ml-6 md:ml-8 text-xl sm:text-2xl md:text-4xl">
        <TypewriterText text="name: " speed={80} delay={2000} />
        <TypewriterText
          text="'Shota Yamashita'"
          speed={80}
          delay={2800}
          style={{ color: 'var(--color-accent-green)' }}
        />
        <TypewriterText text="," speed={80} delay={4200} />
      </div>
      <div className="ml-4 sm:ml-6 md:ml-8 text-xl sm:text-2xl md:text-4xl">
        <TypewriterText text="role: " speed={80} delay={4600} />
        <TypewriterText
          text="'Product Manager'"
          speed={80}
          delay={5200}
          style={{ color: 'var(--color-text-secondary)' }}
        />
        <TypewriterText text="," speed={80} delay={6000} />
      </div>
      <div className="ml-4 sm:ml-6 md:ml-8 text-xl sm:text-2xl md:text-4xl">
        <TypewriterText text="focus: " speed={80} delay={6400} />
        <TypewriterText
          text="'AI Business Modeling'"
          speed={80}
          delay={7000}
          style={{ color: 'var(--color-text-secondary)' }}
        />
        <TypewriterText text="," speed={80} delay={8600} />
      </div>
      <div>
        <TypewriterText text="};" speed={80} delay={9000} />
      </div>
    </h1>
  );
}

export function HeroSection() {
  const scrollTo = (id: string) => {
    window.scrollTo({
      top: document.getElementById(id)?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="hero"
      className="w-full min-h-screen relative transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Bold profile illustration — floats in the right space, feet off the bottom */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="max-w-[1500px] mx-auto h-full relative">
          <img
            src="/SVG/home-profile.svg"
            alt="Shota Yamashita"
            className="absolute -right-60 sm:-right-40 lg:right-16 bottom-[-8vh] sm:bottom-[-11vh] h-screen w-auto max-w-none select-none drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto h-screen py-16 sm:py-24 md:py-32 relative z-10">
        {/* Readability scrim — weaker on small screens so more of the character shows through */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.78] sm:opacity-90 md:opacity-100"
          style={{
            background:
              'linear-gradient(to right, var(--color-bg-primary) 0%, var(--color-bg-primary) 45%, transparent 82%)'
          }}
        />

        {/* Desktop content */}
        <div className="hidden md:block h-full relative z-10">
          <div className="grid grid-cols-12 gap-0 h-full">
            <div className="col-span-7 px-8 h-full">
              <div className="flex flex-col justify-between h-full">
                <MetaLines className="text-sm" />
                <div className="space-y-8">
                  <CodeHeading />
                  <div className="space-y-4 max-w-2xl">
                    <P
                      en={DESCRIPTION.en}
                      ja={DESCRIPTION.ja}
                      className="font-mono text-lg leading-relaxed"
                      style={{
                        color: 'var(--color-text-secondary)',
                        textShadow:
                          '0 0 10px var(--color-bg-primary), 0 0 6px var(--color-bg-primary), 0 0 3px var(--color-bg-primary)'
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-6 pt-8">
                    <button
                      className="font-mono font-bold text-sm px-8 py-4 transition-all duration-200 hover:opacity-90 cursor-pointer"
                      style={{
                        backgroundColor: 'var(--color-text-primary)',
                        color: 'var(--color-bg-primary)'
                      }}
                      onClick={() => scrollTo('projects')}
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
                      onClick={() => scrollTo('contact')}
                    >
                      CONTACT()
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile content — meta pinned top, heading centered in full height, blurred card at the bottom */}
        <div className="md:hidden h-full relative z-10">
          <MetaLines className="text-xs absolute top-0 inset-x-0 px-4" />

          <div className="h-full flex items-center px-4">
            <CodeHeading />
          </div>

          <div
            className="absolute bottom-4 inset-x-4 border p-4 backdrop-blur-[2px]"
            style={{
              borderColor: 'var(--color-border-primary)',
              backgroundColor:
                'color-mix(in srgb, var(--color-bg-secondary) 45%, transparent)'
            }}
          >
            <P
              en={DESCRIPTION.en}
              ja={DESCRIPTION.ja}
              className="font-mono text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            />
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
    </section>
  );
}
