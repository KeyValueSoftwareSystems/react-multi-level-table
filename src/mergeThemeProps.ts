export function mergeThemeProps<T>(defaults: T, custom?: Partial<T>): T {
  if (!custom) return defaults;
  const result = { ...defaults };

  for (const key in custom)
    if (
      typeof custom[key] === 'object' &&
      custom[key] !== null &&
      !Array.isArray(custom[key])
    )
      result[key] = mergeThemeProps(defaults[key], custom[key]);
    else if (custom[key] !== undefined)
      result[key] = custom[key];

  return result;
} 