// Showcase metadata — used by the home [05] section and the /showcase list page.
// Detail pages are bespoke per slug and wired up in src/components/showcase/registry.ts.

export type ShowcaseCategory = 'graphic' | 'words' | 'component';

export interface Bilingual {
  en: string;
  ja: string;
}

export interface ShowcaseItem {
  id: string;
  slug: string;
  category: ShowcaseCategory;
  title: Bilingual;
  subtitle: Bilingual;
  /** Display date, formatted as YYYY.MM.DD */
  date: string;
  /** Path under /public, or null for items without a visual yet */
  thumbnail: string | null;
  featured: boolean;
  /** True while the bespoke detail page is not built yet */
  comingSoon?: boolean;
}

export const showcaseCategories: { id: ShowcaseCategory; label: Bilingual }[] = [
  { id: 'graphic', label: { en: 'Graphic', ja: 'Graphic' } },
  { id: 'words', label: { en: 'Words', ja: 'Words' } },
  { id: 'component', label: { en: 'Component', ja: 'Component' } },
];

export const showcaseItems: ShowcaseItem[] = [
  // ── Graphic — artwork made in Illustrator.
  // NOTE: 3 real assets (002/003/004) repeated to fill the grid until the rest are ready.
  {
    id: '01',
    slug: 'graphic-poster-a',
    category: 'graphic',
    title: { en: 'Half-awake Animals', ja: '寝ぼけた動物' },
    subtitle: {
      en: 'A drowsy little zoo',
      ja: 'まどろむ動物たち',
    },
    date: '2025.07.25',
    thumbnail: '/showcase/graphic/graphic-002.png',
    featured: true,
  },
  {
    id: '02',
    slug: 'graphic-poster-b',
    category: 'graphic',
    title: { en: 'Cucumber Monkey', ja: 'きゅうりさる' },
    subtitle: {
      en: 'Monkey at the spa',
      ja: 'きゅうりでエステ中',
    },
    date: '2025.07.26',
    thumbnail: '/showcase/graphic/graphic-003.png',
    featured: true,
  },
  {
    id: '03',
    slug: 'graphic-poster-c',
    category: 'graphic',
    title: { en: 'The Sleepless Rabbit', ja: '眠らぬウサギ' },
    subtitle: {
      en: 'Geometric, wide awake',
      ja: '幾何学の眠らぬ兎',
    },
    date: '2025.07.31',
    thumbnail: '/showcase/graphic/graphic-004.png',
    featured: true,
  },
  {
    id: '04',
    slug: 'graphic-poster-d',
    category: 'graphic',
    title: { en: 'Coming soon', ja: '準備中' },
    subtitle: { en: 'Illustrator poster', ja: 'Illustratorポスター' },
    date: '2025.07.25',
    thumbnail: null,
    featured: false,
    comingSoon: true,
  },
  {
    id: '05',
    slug: 'graphic-poster-e',
    category: 'graphic',
    title: { en: 'Coming soon', ja: '準備中' },
    subtitle: { en: 'Illustrator poster', ja: 'Illustratorポスター' },
    date: '2025.07.26',
    thumbnail: null,
    featured: false,
    comingSoon: true,
  },
  {
    id: '06',
    slug: 'graphic-poster-f',
    category: 'graphic',
    title: { en: 'Coming soon', ja: '準備中' },
    subtitle: { en: 'Illustrator poster', ja: 'Illustratorポスター' },
    date: '2025.07.31',
    thumbnail: null,
    featured: false,
    comingSoon: true,
  },

  // ── Words — Claude Code skills and prompts handed to AI.
  {
    id: '07',
    slug: 'words-ccusage-dashboard',
    category: 'words',
    title: { en: 'ccusage-dashboard', ja: 'ccusage-dashboard' },
    subtitle: { en: 'Claude Code skill', ja: 'Claude Code スキル' },
    date: '2025.08.01',
    thumbnail: null,
    featured: true,
  },
  {
    id: '08',
    slug: 'words-md-review',
    category: 'words',
    title: { en: 'md-review', ja: 'md-review' },
    subtitle: { en: 'Claude Code skill', ja: 'Claude Code スキル' },
    date: '2025.08.02',
    thumbnail: null,
    featured: false,
  },
  {
    id: '09',
    slug: 'words-pr',
    category: 'words',
    title: { en: 'pr', ja: 'pr' },
    subtitle: { en: 'Claude Code skill', ja: 'Claude Code スキル' },
    date: '2025.08.03',
    thumbnail: null,
    featured: false,
  },

  // ── Component — front-end TSX components. Content coming later; slots reserved.
  {
    id: '10',
    slug: 'component-placeholder-a',
    category: 'component',
    title: { en: 'Coming soon', ja: '準備中' },
    subtitle: { en: 'Front-end component', ja: 'フロントエンドコンポーネント' },
    date: '2025.08.13',
    thumbnail: null,
    featured: false,
    comingSoon: true,
  },
  {
    id: '11',
    slug: 'component-placeholder-b',
    category: 'component',
    title: { en: 'Coming soon', ja: '準備中' },
    subtitle: { en: 'Front-end component', ja: 'フロントエンドコンポーネント' },
    date: '2025.08.13',
    thumbnail: null,
    featured: false,
    comingSoon: true,
  },
];

export function getShowcaseItem(slug: string): ShowcaseItem | undefined {
  return showcaseItems.find((item) => item.slug === slug);
}
