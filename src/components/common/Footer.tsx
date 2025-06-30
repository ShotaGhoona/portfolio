export function Footer() {
  const quickLinks = [
    { name: 'philosophy()', href: '#philosophy' },
    { name: 'projects()', href: '#projects' },
    { name: 'expertise()', href: '#expertise' },
    { name: 'timeline()', href: '#timeline' },
    { name: 'news()', href: '#news' },
    { name: 'contact()', href: '#contact' }
  ];

  return (
    <footer 
      className="w-full relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `2px solid var(--color-text-primary)`
      }}
    >
      {/* Desktop Footer */}
      <div className="max-w-6xl mx-auto hidden md:block">
        <div className="grid grid-cols-12 gap-0">
          {/* Left section - System info */}
          <div 
            className="col-span-4 px-8 py-8"
            style={{ borderRight: `1px solid var(--color-border-secondary)` }}
          >
            <div className="space-y-4">
              <div 
                className="font-mono font-black text-sm"
                style={{ color: 'var(--color-text-primary)' }}
              >
                SYSTEM.INFO
              </div>
              
              <div 
                className="font-mono text-xs space-y-1"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <div>Portfolio Version: v2.1.0</div>
                <div>Build Date: 2025.06.29</div>
                <div>Last Updated: {new Date().toISOString().split('T')[0]}</div>
                <div>Environment: Production</div>
              </div>
              
              <div 
                className="font-mono text-xs"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <div>// Built with Next.js, TypeScript</div>
                <div>// Deployed on Vercel</div>
              </div>
            </div>
          </div>
          
          {/* Center section - Quick links */}
          <div 
            className="col-span-4 px-8 py-8"
            style={{ borderRight: `1px solid var(--color-border-secondary)` }}
          >
            <div className="space-y-4">
              <div 
                className="font-mono font-black text-sm"
                style={{ color: 'var(--color-text-primary)' }}
              >
                QUICK.LINKS
              </div>
              
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="font-mono text-xs transition-colors duration-200 block hover:opacity-80"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right section - Status */}
          <div className="col-span-4 px-8 py-8">
            <div className="space-y-4">
              <div 
                className="font-mono font-black text-sm"
                style={{ color: 'var(--color-text-primary)' }}
              >
                STATUS.CURRENT
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Availability:</span>
                  <span 
                    className="font-bold"
                    style={{ color: 'var(--color-accent-green)' }}
                  >OPEN</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Location:</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>Kyoto, Japan</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Timezone:</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>JST (UTC+9)</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Response:</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>&lt; 24h</span>
                </div>
              </div>
              
              <div 
                className="pt-4 transition-colors duration-200"
                style={{ borderTop: `1px solid var(--color-border-secondary)` }}
              >
                <div 
                  className="font-mono text-xs"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  <div>// Professional software engineer</div>
                  <div>// Open to new opportunities</div>
                  <div>// Specialized in backend systems</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div 
          className="px-8 py-6 transition-colors duration-200"
          style={{ borderTop: `1px solid var(--color-border-secondary)` }}
        >
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-8">
              <div 
                className="font-mono text-xs"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <span>&copy; 2025 Shota Yamashita.</span>
                <span className="ml-4">All rights reserved.</span><br />
                <span className="ml-4">Built with passion for clean code and elegant solutions.</span>
              </div>
            </div>
            
            <div className="col-span-4 text-right">
              <div 
                className="font-mono text-xs"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <div>// Thank you for visiting</div>
                <div>// Let's build something amazing together</div>
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

      {/* Mobile Footer */}
      <div className="md:hidden">
        <div className="px-4 py-6 space-y-6">
          {/* System Info */}
          <div 
            className="pb-6"
            style={{ borderBottom: `1px solid var(--color-border-secondary)` }}
          >
            <div 
              className="font-mono font-black text-sm mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              SYSTEM.INFO
            </div>
            
            <div 
              className="font-mono text-xs space-y-1 mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <div>Portfolio Version: v2.1.0</div>
              <div>Build Date: 2024.06.29</div>
              <div>Last Updated: {new Date().toISOString().split('T')[0]}</div>
              <div>Environment: Production</div>
            </div>
            
            <div 
              className="font-mono text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <div>// Built with Next.js, TypeScript</div>
              <div>// Deployed on Vercel</div>
            </div>
          </div>

          {/* Quick Links */}
          <div 
            className="pb-6"
            style={{ borderBottom: `1px solid var(--color-border-secondary)` }}
          >
            <div 
              className="font-mono font-black text-sm mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              QUICK.LINKS
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-mono text-xs transition-colors duration-200 hover:opacity-80"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Status */}
          <div 
            className="pb-6"
            style={{ borderBottom: `1px solid var(--color-border-secondary)` }}
          >
            <div 
              className="font-mono font-black text-sm mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              STATUS.CURRENT
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span style={{ color: 'var(--color-text-secondary)' }}>Availability:</span>
                <span 
                  className="font-bold"
                  style={{ color: 'var(--color-accent-green)' }}
                >OPEN</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span style={{ color: 'var(--color-text-secondary)' }}>Location:</span>
                <span style={{ color: 'var(--color-text-primary)' }}>Kyoto, Japan</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span style={{ color: 'var(--color-text-secondary)' }}>Timezone:</span>
                <span style={{ color: 'var(--color-text-primary)' }}>JST (UTC+9)</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span style={{ color: 'var(--color-text-secondary)' }}>Response:</span>
                <span style={{ color: 'var(--color-text-primary)' }}>&lt; 24h</span>
              </div>
            </div>
            
            <div 
              className="font-mono text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <div>// Professional software engineer</div>
              <div>// Open to new opportunities</div>
              <div>// Specialized in backend systems</div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <div 
              className="font-mono text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <div>&copy; 2024 Shota Yamashita.</div>
              <div>All rights reserved.</div>
            </div>
            
            <div 
              className="font-mono text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <div>// Thank you for visiting</div>
              <div>// Let's build something amazing together</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}