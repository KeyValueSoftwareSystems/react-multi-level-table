import type { ThemeProps } from './types/theme';

export const defaultThemeProps: ThemeProps = {
  colors: {
    primaryColor: '#007bff',
    textColor: '#212529',
    borderColor: '#dee2e6',
    background: '#ffffff',
  },
  table: {
    header: {
      background: '#e9ecef',
      textColor: '#495057',
      borderColor: '#dee2e6',
    },
    row: {
      mainBackground: '#ffffff',
      nestedBackground: '#f8f9fa',
      expandedBackground: '#e9ecef',
      hoverBackground: '#f8f9fa',
    },
    cell: {
      textColor: '#212529',
      borderColor: '#dee2e6',
      nestedPadding: '1rem',
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