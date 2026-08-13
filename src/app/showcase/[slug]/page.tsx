'use client';

import { useParams } from 'next/navigation';
import { getShowcaseItem } from '@/data/showcase';
import { showcaseRegistry } from '@/components/showcase/registry';
import ShowcaseComingSoon from '@/components/showcase/details/ComingSoon';
import ShowcaseNotFound from '@/components/showcase/details/NotFound';

// Thin router: each slug renders its own bespoke detail component.
// Items without a bespoke page yet fall back to the "coming soon" view.
export default function ShowcaseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const item = getShowcaseItem(slug);

  if (!item) {
    return <ShowcaseNotFound />;
  }

  const Detail = item.comingSoon
    ? ShowcaseComingSoon
    : showcaseRegistry[slug] ?? ShowcaseComingSoon;
  return <Detail item={item} />;
}
