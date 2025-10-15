export type CategoryTheme = {
  accent: string; // main accent for border/tint
  tagBackground: string; // low-opacity background for tag
  tagText: string; // lighter tint for tag text
};

// Categories sourced from server/src/constants/todoCategories.json
// We assign hue families per design:
// - Shopping -> Amber
// - Things to make decision -> Blue (calm/focused)
// - Chores -> Emerald (fresh/routine)
const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  Shopping: {
    accent: '#F59E0B',
    tagBackground: 'rgba(245,158,11,0.15)',
    tagText: '#FCD34D',
  },
  'Things to make decision': {
    accent: '#3B82F6',
    tagBackground: 'rgba(59,130,246,0.15)',
    tagText: '#93C5FD',
  },
  Chores: {
    accent: '#10B981',
    tagBackground: 'rgba(16,185,129,0.15)',
    tagText: '#6EE7B7',
  },
};

const DEFAULT_THEME: CategoryTheme = {
  accent: '#64748B', // slate-500
  tagBackground: 'rgba(100,116,139,0.15)',
  tagText: '#CBD5E1', // slate-300
};

export function getCategoryTheme(categoryName: string | undefined | null): CategoryTheme {
  if (!categoryName) return DEFAULT_THEME;
  return CATEGORY_THEMES[categoryName] ?? DEFAULT_THEME;
}

export const DARK_COLORS = {
  appBackground: '#0B0F1A',
  cardBackground: '#111827',
  title: '#F8FAFC',
  description: '#E2E8F0',
  metaIcon: '#94A3B8',
  metaText: '#CBD5E1',
  metaBorder: '#334155',
};


