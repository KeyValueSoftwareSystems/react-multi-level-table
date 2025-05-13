import type { ThemeProps } from './types/theme';

export const lightTheme: ThemeProps = {
  colors: {
    background: '#ffffff',
    primaryColor: '#007bff',
    borderColor: '#dee2e6',
  },
  table: {
    header: {
      background: '#e9ecef',
      textColor: '#495057',
    },
    cell: {
      textColor: '#212529',
      borderColor: '#dee2e6',
    },
    row: {
      mainBackground: '#ffffff',
      nestedBackground: '#f8f9fa',
      expandedBackground: '#e9ecef',
    },
    filter: {
      background: 'transparent',
      textColor: '#495057',
      borderColor: '#495057',
      focusBorderColor: '#007bff',
      placeholderColor: 'rgba(73, 80, 87, 0.7)',
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

export const darkTheme: ThemeProps = {
  colors: {
    background: '#212529',
    primaryColor: '#0d6efd',
    borderColor: '#495057',
  },
  table: {
    header: {
      background: '#2b3035',
      textColor: '#e9ecef',
    },
    cell: {
      textColor: '#e9ecef',
      borderColor: '#495057',
    },
    row: {
      mainBackground: '#343a40',
      nestedBackground: '#2b3035',
      expandedBackground: '#212529',
    },
    filter: {
      background: 'transparent',
      textColor: '#e9ecef',
      borderColor: '#e9ecef',
      focusBorderColor: '#0d6efd',
      placeholderColor: 'rgba(233, 236, 239, 0.7)',
    },
  },
  pagination: {
    button: {
      background: '#0d6efd',
      textColor: '#ffffff',
      disabledOpacity: '0.65',
    },
    select: {
      background: '#343a40',
      textColor: '#e9ecef',
      borderColor: '#495057',
    },
    info: {
      textColor: '#e9ecef',
    },
  },
  expandIcon: {
    color: '#e9ecef',
  },
}; 