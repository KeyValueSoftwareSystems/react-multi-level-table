import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TableCell } from '../../src/components/TableCell';
import type { Cell } from 'react-table';
import type { DataItem } from '../../src/types/types';
import type { ThemeProps } from '../../src/types/theme';

// Mock data for testing
const mockCell = {
  getCellProps: () => ({
    key: 'test-cell',
    role: 'cell',
  }),
  render: () => 'Test Cell Content',
  column: {} as any,
  row: {} as any,
  value: 'Test Cell Content',
} as unknown as Cell<DataItem>;

const mockTheme: ThemeProps = {
  table: {
    cell: {
      textColor: '#000000',
      borderColor: '#cccccc',
    },
  },
};

describe('TableCell', () => {
  it('renders cell content correctly', () => {
    render(
      <TableCell
        cell={mockCell}
        hasChildren={false}
        isExpanded={false}
        onToggle={() => {}}
        theme={mockTheme}
      />
    );

    expect(screen.getByText('Test Cell Content')).toBeInTheDocument();
  });

  it('renders expand button when hasChildren is true', () => {
    render(
      <TableCell
        cell={mockCell}
        hasChildren={true}
        isExpanded={false}
        onToggle={() => {}}
        theme={mockTheme}
      />
    );

    const expandButton = screen.getByRole('button');
    expect(expandButton).toBeInTheDocument();
  });

  it('does not render expand button when hasChildren is false', () => {
    render(
      <TableCell
        cell={mockCell}
        hasChildren={false}
        isExpanded={false}
        onToggle={() => {}}
        theme={mockTheme}
      />
    );

    const expandButton = screen.queryByRole('button');
    expect(expandButton).not.toBeInTheDocument();
  });

  it('calls onToggle when expand button is clicked', () => {
    const onToggleMock = vi.fn();
    render(
      <TableCell
        cell={mockCell}
        hasChildren={true}
        isExpanded={false}
        onToggle={onToggleMock}
        theme={mockTheme}
      />
    );

    const expandButton = screen.getByRole('button');
    fireEvent.click(expandButton);
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom padding left', () => {
    const paddingLeft = 20;
    render(
      <TableCell
        cell={mockCell}
        hasChildren={false}
        isExpanded={false}
        onToggle={() => {}}
        theme={mockTheme}
        paddingLeft={paddingLeft}
      />
    );

    const cell = screen.getByRole('cell');
    expect(cell).toHaveStyle(`paddingLeft: ${paddingLeft}px`);
  });

  it('applies theme styles correctly', () => {
    render(
      <TableCell
        cell={mockCell}
        hasChildren={false}
        isExpanded={false}
        onToggle={() => {}}
        theme={mockTheme}
      />
    );

    const cell = screen.getByRole('cell');
    expect(cell).toHaveStyle({
      color: mockTheme.table?.cell?.textColor,
      borderColor: mockTheme.table?.cell?.borderColor,
    });
  });

  it('renders custom expand icon when provided', () => {
    const customIcon = <span data-testid="custom-icon">Custom Icon</span>;
    render(
      <TableCell
        cell={mockCell}
        hasChildren={true}
        isExpanded={false}
        onToggle={() => {}}
        theme={mockTheme}
        expandIcon={customIcon}
      />
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});