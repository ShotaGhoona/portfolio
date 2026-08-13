import type { ComponentType } from 'react';
import type { ShowcaseItem } from '@/data/showcase';

import GraphicPoster from './details/GraphicPoster';
import WordsSkill from './details/WordsSkill';

export interface ShowcaseDetailProps {
  item: ShowcaseItem;
}

// slug → detail component. Every graphic poster and every words item shares one
// data-driven layout (header + two panes).
export const showcaseRegistry: Record<string, ComponentType<ShowcaseDetailProps>> = {
  'graphic-poster-a': GraphicPoster,
  'graphic-poster-b': GraphicPoster,
  'graphic-poster-c': GraphicPoster,
  'graphic-poster-d': GraphicPoster,
  'graphic-poster-e': GraphicPoster,
  'graphic-poster-f': GraphicPoster,
  'words-ccusage-dashboard': WordsSkill,
  'words-md-review': WordsSkill,
  'words-pr': WordsSkill,
};
