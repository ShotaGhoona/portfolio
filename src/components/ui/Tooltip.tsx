'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  delay?: number;
}

export function Tooltip({ content, children, delay = 500 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 font-mono text-xs whitespace-nowrap pointer-events-none z-10 transition-opacity duration-200"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-primary)',
          }}
        >
          {content}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid var(--color-border-primary)',
            }}
          />
        </div>
      )}
    </div>
  );
}
