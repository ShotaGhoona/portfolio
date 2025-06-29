import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationItems = [
    { label: '[01]', name: 'philosophy', active: false },
    { label: '[02]', name: 'projects', active: true },
    { label: '[03]', name: 'expertise', active: false },
    { label: '[04]', name: 'timeline', active: false },
    { label: '[05]', name: 'news', active: false },
    { label: '[06]', name: 'contact', active: false }
  ];

  return (
    <header 
      className="w-full fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: `1px solid var(--color-border-primary)`
      }}
    >
      {/* Desktop Header */}
      <div className="max-w-6xl mx-auto hidden md:block">
        <div className="grid grid-cols-12 gap-0">
          {/* Left section - Logo/Brand */}
          <Link 
            href="/"
            className="col-span-3 px-8 py-6"
            style={{ 
              borderRight: `1px solid var(--color-border-secondary)`
            }}
          >
            <div 
              className="font-mono font-black text-xl tracking-wider"
              style={{ color: 'var(--color-text-primary)' }}
            >
              dev.portfolio
            </div>
            <div 
              className="font-mono text-xs mt-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              v2.1.0
            </div>
          </Link>
          
          {/* Center section - Navigation */}
          <div 
            className="col-span-6 px-8 py-6"
            style={{ 
              borderRight: `1px solid var(--color-border-secondary)`
            }}
          >
            <nav className="grid grid-cols-3 items-center">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.name}`}
                  className="font-mono text-sm transition-colors duration-200 hover:opacity-80"
                  style={{ 
                    color: item.active 
                      ? 'var(--color-text-primary)' 
                      : 'var(--color-text-secondary)',
                    fontWeight: item.active ? 'bold' : 'normal'
                  }}
                >
                  <span style={{ color: 'var(--color-text-tertiary)' }}>
                    {item.label}
                  </span>
                  <span className="ml-2">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* Right section - Status & Toggles */}
          <div className="col-span-3 px-8 py-6">
            <div className="flex flex-col items-end space-y-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
        
        {/* Grid overlay lines */}
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

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div 
              className="font-mono font-black text-lg tracking-wider"
              style={{ color: 'var(--color-text-primary)' }}
            >
              dev.portfolio
            </div>
            <div 
              className="font-mono text-xs ml-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              v2.1.0
            </div>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 transition-colors duration-200"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <div className="w-6 h-6 relative">
              <span 
                className={`absolute w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen ? 'top-3 rotate-45' : 'top-1'
                }`}
                style={{ backgroundColor: 'var(--color-text-primary)' }}
              ></span>
              <span 
                className={`absolute w-6 h-0.5 top-3 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ backgroundColor: 'var(--color-text-primary)' }}
              ></span>
              <span 
                className={`absolute w-6 h-0.5 transition-all duration-300 ${
                  isMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                }`}
                style={{ backgroundColor: 'var(--color-text-primary)' }}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Dark Overlay */}
            <div 
              className="fixed inset-0 top-full bg-black bg-opacity-50 transition-opacity duration-300 z-40"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            {/* Menu Content */}
            <div 
              className={`absolute top-full left-0 right-0 z-50 transform transition-all duration-300 ease-out ${
                isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
              }`}
              style={{ 
                backgroundColor: 'var(--color-bg-primary)',
                borderBottom: `1px solid var(--color-border-primary)`,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Mobile Navigation */}
              <div 
                className="px-4 py-6"
                style={{ borderBottom: `1px solid var(--color-border-secondary)` }}
              >
                <nav className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.name}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block font-mono text-base transition-all duration-200 hover:opacity-80 py-2 transform ${
                        isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                      }`}
                      style={{ 
                        color: item.active 
                          ? 'var(--color-text-primary)' 
                          : 'var(--color-text-secondary)',
                        fontWeight: item.active ? 'bold' : 'normal',
                        transitionDelay: `${index * 50}ms`
                      }}
                    >
                      <span style={{ color: 'var(--color-text-tertiary)' }}>
                        {item.label}
                      </span>
                      <span className="ml-3">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Mobile Toggles */}
              <div className="px-4 py-6">
                <div 
                  className={`flex items-center justify-center space-x-8 transform transition-all duration-300 ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div 
                      className="font-mono text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Language
                    </div>
                    <LanguageToggle />
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div 
                      className="font-mono text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Theme
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}