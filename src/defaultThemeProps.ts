import type { ThemeProps } from './types/theme';

export const defaultThemeProps: ThemeProps = {
  colors: {
    background: '#ffffff',
    primaryColor: '#3498db',
    borderColor: '#e0e0e0',
  },
  table: {
    header: {
      background: '#2c3e50',
      textColor: '#ffffff',
    },
    row: {
      mainBackground: '#ffffff',
      nestedBackground: '#f8f9fa',
      expandedBackground: '#f1f3f5',
    },
    cell: {
      textColor: '#333333',
      borderColor: '#e0e0e0',
    },
    filter: {
      background: 'transparent',
      textColor: '#ffffff',
      borderColor: '#ffffff',
      focusBorderColor: '#3498db',
      placeholderColor: 'rgba(255, 255, 255, 0.7)',
    },
  },
  pagination: {
    button: {
      background: '#007bff',
      textColor: '#ffffff',
      disabledOpacity: '0.65',
    },
    select: {
      background: '#ffffff',
      textColor: '#212529',
      borderColor: '#dee2e6',
    },
    info: {
      textColor: '#212529',
    },
  },
  expandIcon: {
    color: '#495057',
  },
}; 