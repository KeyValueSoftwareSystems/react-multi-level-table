import { describe, it, expect } from 'vitest';
import { defaultTheme } from '../../src/constants/theme';
import type { ThemeProps } from '../../src/types/theme';

describe('defaultTheme', () => {
  const theme = defaultTheme as Required<ThemeProps>;

  it('should have the correct structure', () => {
    expect(theme).toHaveProperty('colors');
    expect(theme).toHaveProperty('table');
    expect(theme).toHaveProperty('pagination');
    expect(theme).toHaveProperty('expandIcon');
  });

  it('should have valid color values', () => {
    expect(theme.colors!.primaryColor).toBe('#2c3e50');
    expect(theme.colors!.textColor).toBe('#2c3e50');
    expect(theme.colors!.borderColor).toBe('#e0e0e0');
    expect(theme.colors!.background).toBe('#ffffff');
  });

  it('should have valid table configuration', () => {
    expect(theme.table!.header!.background).toBe('#2c3e50');
    expect(theme.table!.header!.textColor).toBe('#ffffff');
    expect(theme.table!.row!.levelColors).toHaveLength(3);
    expect(theme.table!.cell!.nestedPadding).toBe('16px');
  });

  it('should have valid pagination configuration', () => {
    expect(theme.pagination!.button!.background).toBe('#2c3e50');
    expect(theme.pagination!.button!.textColor).toBe('#ffffff');
    expect(theme.pagination!.button!.disabledOpacity).toBe('0.5');
    expect(theme.pagination!.select!.background).toBe('#ffffff');
  });

  it('should have valid expand icon configuration', () => {
    expect(theme.expandIcon!.color).toBe('#2c3e50');
  });
}); 