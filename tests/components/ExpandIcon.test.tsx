import React from 'react';

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { ExpandIcon } from '../../src/components/icons/ExpandIcon';
import type { ThemeProps } from '../../src/types/theme';

const mockTheme: ThemeProps = {
  colors: {
    primaryColor: '#5D5FEF',
    textColor: '#262626',
    borderColor: '#E5E5E5',
  },
  expandIcon: {
    color: '#000000',
  },
};

describe('ExpandIcon', () => {
  it('applies correct transform for expanded state', () => {
    render(<ExpandIcon isExpanded theme={mockTheme} mode="expand" />);
    
    const expandIcon = document.querySelector('.expand-icon');
    expect(expandIcon).toHaveStyle({ transform: 'rotate(90deg)' });
  });

  it('applies correct transform for collapsed state', () => {
    render(<ExpandIcon isExpanded={false} theme={mockTheme} mode="expand" />);
    
    const expandIcon = document.querySelector('.expand-icon');
    expect(expandIcon).toHaveStyle({ transform: 'rotate(0deg)' });
  });

  it('renders SVG element', () => {
    render(<ExpandIcon isExpanded theme={mockTheme} mode="expand" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders expand icon with SVG', () => {
    render(<ExpandIcon isExpanded theme={mockTheme} mode="expand" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('renders collapsed icon with SVG', () => {
    render(<ExpandIcon isExpanded={false} theme={mockTheme} mode="expand" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('applies custom theme color when provided', () => {
    const customTheme: ThemeProps = {
      ...mockTheme,
      expandIcon: {
        color: '#FF0000',
      },
    };

    render(<ExpandIcon isExpanded theme={customTheme} mode="expand" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('renders without theme color when not provided', () => {
    const themeWithoutColor: ThemeProps = {
      colors: {
        primaryColor: '#5D5FEF',
        textColor: '#262626',
        borderColor: '#E5E5E5',
      },
    };

    render(<ExpandIcon isExpanded theme={themeWithoutColor} mode="expand" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });
}); 