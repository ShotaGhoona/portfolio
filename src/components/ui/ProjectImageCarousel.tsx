'use client';

import { useState } from 'react';

interface CarouselImage {
  src: string;
  alt: string;
}

interface ProjectImageCarouselProps {
  images: CarouselImage[];
}

// A compact, single-frame carousel. Hovering peeks at the next image — that's
// the primary interaction — while the nav dots stay quiet until you hover.
export function ProjectImageCarousel({ images }: ProjectImageCarouselProps) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  if (images.length === 0) return null;

  const multiple = images.length > 1;
  const shown = hovering && multiple ? (active + 1) % images.length : active;

  return (
    <div
      className="group relative overflow-hidden aspect-video border cursor-pointer"
      style={{ borderColor: 'var(--color-border-primary)' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => multiple && setActive((active + 1) % images.length)}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
            i === shown ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
          }`}
          style={{ filter: 'grayscale(10%) contrast(1.05)' }}
        />
      ))}

      {/* Discreet counter */}
      {multiple && (
        <div
          className="absolute top-3 right-3 font-mono text-[10px] tracking-wider px-2 py-1 transition-opacity duration-300"
          style={{
            backgroundColor: 'rgba(0,0,0,0.35)',
            color: '#fff',
            opacity: hovering ? 1 : 0.45,
            backdropFilter: 'blur(4px)',
          }}
        >
          {String(shown + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      )}

      {/* Discreet nav dots */}
      {multiple && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-opacity duration-300"
          style={{ opacity: hovering ? 1 : 0.35 }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Show image ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === shown ? '18px' : '6px',
                backgroundColor: i === shown ? '#fff' : 'rgba(255,255,255,0.6)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
