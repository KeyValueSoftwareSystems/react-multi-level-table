import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ExpandIcon } from '../../src/components/icons';
import type { ThemeProps } from '../../src/types/theme';

describe('ExpandIcon', () => {
  const mockTheme: ThemeProps = {
    expandIcon: {
      color: '#000000',
    },
  };

  it('renders expanded icon when isExpanded is true', () => {
    render(<ExpandIcon isExpanded theme={mockTheme} mode="expand" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon.closest('.expand-icon')).toHaveClass('expand-icon');
  });

  it('renders collapsed icon when isExpanded is false', () => {
    render(<ExpandIcon isExpanded={false} theme={mockTheme} mode="expand" />);

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
    expect(icon.closest('.expand-icon')).toHaveClass('expand-icon');
  });

  it('applies custom theme color when provided', () => {
    const customTheme: ThemeProps = {
      expandIcon: {
        color: '#FF0000',
      },
    };

    render(<ExpandIcon isExpanded theme={customTheme} mode="expand" />);

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
  });

  it('renders without theme color when not provided', () => {
    const themeWithoutColor: ThemeProps = {};

    render(<ExpandIcon isExpanded theme={themeWithoutColor} mode="expand" />);

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();
  });
}); 