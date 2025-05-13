import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ExpandIcon } from '../../src/components/ExpandIcon';
import type { ThemeProps } from '../../src/types/theme';

describe('ExpandIcon', () => {
  const mockTheme: ThemeProps = {
    expandIcon: {
      color: '#000000',
    },
  };

  it('renders expanded icon (▼) when isExpanded is true', () => {
    render(<ExpandIcon isExpanded theme={mockTheme} />);
    const icon = screen.getByText('▼');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('expand-icon');
    expect(icon).toHaveStyle({ color: '#000000' });
  });

  it('renders collapsed icon (▶) when isExpanded is false', () => {
    render(<ExpandIcon isExpanded={false} theme={mockTheme} />);

    const icon = screen.getByText('▶');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('expand-icon');
    expect(icon).toHaveStyle({ color: '#000000' });
  });

  it('applies custom theme color when provided', () => {
    const customTheme: ThemeProps = {
      expandIcon: {
        color: '#FF0000',
      },
    };

    render(<ExpandIcon isExpanded theme={customTheme} />);

    const icon = screen.getByText('▼');
    expect(icon).toHaveStyle({ color: '#FF0000' });
  });

  it('renders without theme color when not provided', () => {
    const themeWithoutColor: ThemeProps = {};

    render(<ExpandIcon isExpanded theme={themeWithoutColor} />);

    const icon = screen.getByText('▼');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('expand-icon');
    // Style should be empty or undefined when no color is provided
    expect(icon.style.color).toBe('');
  });
}); 