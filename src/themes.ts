import type { ThemeProps } from './types/theme';

export const lightTheme: ThemeProps = {
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
  status: {
    active: {
      background: '#28a745',
      textColor: '#ffffff',
    },
    inactive: {
      background: '#dc3545',
      textColor: '#ffffff',
    },
    pending: {
      background: '#ffc107',
      textColor: '#212529',
    },
  },
};

export const darkTheme: ThemeProps = {
  colors: {
    primaryColor: '#0d6efd',
    textColor: '#ffffff',
    borderColor: '#495057',
    background: '#212529',
  },
  table: {
    header: {
      background: '#2b3035',
      textColor: '#e9ecef',
      borderColor: '#495057',
    },
    row: {
      mainBackground: '#343a40',
      nestedBackground: '#2b3035',
      expandedBackground: '#212529',
      hoverBackground: '#2b3035',
    },
    cell: {
      textColor: '#e9ecef',
      borderColor: '#495057',
      nestedPadding: '1rem',
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
  status: {
    active: {
      background: '#198754',
      textColor: '#ffffff',
    },
    inactive: {
      background: '#dc3545',
      textColor: '#ffffff',
    },
    pending: {
      background: '#ffc107',
      textColor: '#212529',
    },
  },
}; 