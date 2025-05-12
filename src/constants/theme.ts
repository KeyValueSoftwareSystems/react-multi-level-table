import type { Theme } from '../types/theme';

export const defaultTheme: Theme = {
  light: {
    colors: {
      primaryColor: '#2c3e50',
      textColor: '#2c3e50',
      borderColor: '#e0e0e0',
      background: '#ffffff',
    },
    table: {
      header: {
        background: '#2c3e50',
        textColor: '#ffffff',
        borderColor: '#e0e0e0',
      },
      row: {
        mainBackground: '#ffffff',
        nestedBackground: '#f1f3f5',
        expandedBackground: '#f8f9fa',
        hoverBackground: '#f5f5f5',
      },
      cell: {
        textColor: '#2c3e50',
        borderColor: '#e0e0e0',
        nestedPadding: '32px',
      },
    },
    pagination: {
      button: {
        background: '#2c3e50',
        textColor: '#ffffff',
        disabledOpacity: '0.5',
      },
      select: {
        background: '#ffffff',
        textColor: '#2c3e50',
        borderColor: '#e0e0e0',
      },
      info: {
        textColor: '#2c3e50',
      },
    },
    expandIcon: {
      color: '#2c3e50',
    },
  },
  dark: {
    colors: {
      primaryColor: '#3498db',
      textColor: '#ecf0f1',
      borderColor: '#34495e',
      background: '#2c3e50',
    },
    table: {
      header: {
        background: '#34495e',
        textColor: '#ecf0f1',
        borderColor: '#2c3e50',
      },
      row: {
        mainBackground: '#2c3e50',
        nestedBackground: '#34495e',
        expandedBackground: '#2c3e50',
        hoverBackground: '#3d566e',
      },
      cell: {
        textColor: '#ecf0f1',
        borderColor: '#34495e',
        nestedPadding: '32px',
      },
    },
    pagination: {
      button: {
        background: '#3498db',
        textColor: '#ffffff',
        disabledOpacity: '0.5',
      },
      select: {
        background: '#34495e',
        textColor: '#ecf0f1',
        borderColor: '#2c3e50',
      },
      info: {
        textColor: '#ecf0f1',
      },
    },
    expandIcon: {
      color: '#ecf0f1',
    },
  },
}; 