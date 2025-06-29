'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TypewriterText({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = '', 
  style = {} 
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, isTyping]);

  return (
    <span className={className} style={style}>
      {displayText}
      {currentIndex < text.length && (
        <span 
          className="animate-pulse"
          style={{ color: 'var(--color-text-primary)' }}
        >
          |
        </span>
      )}
    </span>
  );
}