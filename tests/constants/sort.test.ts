import { describe, it, expect } from 'vitest';
import { SortType } from '../../src/constants/sort';

describe('SortType enum', () => {
  it('should have the correct values', () => {
    expect(SortType.Custom).toBe('custom');
    expect(SortType.Basic).toBe('basic');
  });

  it('should have exactly two values', () => {
    const values = Object.values(SortType);
    expect(values).toHaveLength(2);
    expect(values).toContain('custom');
    expect(values).toContain('basic');
  });
}); 