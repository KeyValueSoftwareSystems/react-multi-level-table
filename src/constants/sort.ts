export const SortType = {
  Custom: 'custom',
  Basic: 'basic',
} as const;

export type SortType = typeof SortType[keyof typeof SortType];