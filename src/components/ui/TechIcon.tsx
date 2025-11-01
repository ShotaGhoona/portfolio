'use client';

import { Tooltip } from './Tooltip';

interface TechIconProps {
  icon: string;
  label: string;
}

const iconMap: Record<string, string> = {
  nextjs: 'https://cdn.simpleicons.org/nextdotjs/000000/ffffff',
  react: 'https://cdn.simpleicons.org/react/61DAFB',
  typescript: 'https://cdn.simpleicons.org/typescript/3178C6',
  tailwindcss: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  radix: 'https://cdn.simpleicons.org/radixui/161618/ffffff',
  shadcn: 'https://cdn.simpleicons.org/shadcnui/000000/ffffff',
  fastapi: 'https://cdn.simpleicons.org/fastapi/009688',
  postgresql: 'https://cdn.simpleicons.org/postgresql/4169E1',
  openai: 'https://cdn.simpleicons.org/openai/412991',
  supabase: 'https://cdn.simpleicons.org/supabase/3FCF8E',
  threejs: 'https://cdn.simpleicons.org/threedotjs/000000/ffffff',
  gsap: 'https://cdn.simpleicons.org/greensock/88CE02',
  notion: 'https://cdn.simpleicons.org/notion/000000/ffffff',
};

export function TechIcon({ icon, label }: TechIconProps) {
  const iconUrl = iconMap[icon] || iconMap['react'];

  return (
    <Tooltip content={label}>
      <div className="w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer">
        <img
          src={iconUrl}
          alt={label}
          className="w-6 h-6 object-contain"
          style={{
            filter: 'var(--icon-filter, none)',
          }}
        />
      </div>
    </Tooltip>
  );
}
