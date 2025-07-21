import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { TableCell } from '../../src/components/TableCell';
import type { Cell } from 'react-table';
import type { DataItem } from '../../src/types/types';

const mockTheme = {
  colors: {
    primaryColor: '#5D5FEF',
    textColor: '#262626',
    borderColor: '#E5E5E5',
  },
  table: {
    cell: {
      textColor: '#000000',
      borderColor: '#cccccc',
    },
  },
};

const mockCell: Cell<DataItem> = {
  getCellProps: () => ({
    key: 'test-cell',
    role: 'cell',
  }),
  render: () => 'Test Cell Content',
  column: {
    id: 'test',
  },
} as Cell<DataItem>;

describe('TableCell', () => {
  const defaultProps = {
    cell: mockCell,
    hasChildren: false,
    isExpanded: false,
    onToggle: vi.fn(),
    theme: mockTheme,
  };

  const renderTableCell = (props = {}) => {
    return render(<TableCell {...defaultProps} {...props} />);
  };

  it('renders cell content correctly', () => {
    renderTableCell();

    expect(screen.getByText('Test Cell Content')).toBeInTheDocument();
  });

  it('renders expand button when hasChildren is true', () => {
    renderTableCell({
      hasChildren: true,
    });

    const expandButton = screen.getByText('Test Cell Content').closest('td')?.querySelector('.expand-button');
    expect(expandButton).toBeInTheDocument();
  });

  it('calls onToggle when expand button is clicked', () => {
    const onToggleMock = vi.fn();
    renderTableCell({
      hasChildren: true,
      onToggle: onToggleMock,
    });

    const expandButton = screen.getByText('Test Cell Content').closest('td')?.querySelector('.expand-button');
    expect(expandButton).toBeInTheDocument();
    
    if (expandButton) {
      fireEvent.click(expandButton);
      expect(onToggleMock).toHaveBeenCalledTimes(1);
    }
  });

  it('renders checkbox when selectable is true', () => {
    renderTableCell({
      selectable: true,
      isRowSelected: false,
      onRowSelect: vi.fn(),
      rowId: 1,
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders checked checkbox when row is selected', () => {
    renderTableCell({
      selectable: true,
      isRowSelected: true,
      onRowSelect: vi.fn(),
      rowId: 1,
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onRowSelect when checkbox is clicked', () => {
    const onRowSelectMock = vi.fn();
    renderTableCell({
      selectable: true,
      isRowSelected: false,
      onRowSelect: onRowSelectMock,
      rowId: 1,
    });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onRowSelectMock).toHaveBeenCalledWith(1);
  });

  it('renders custom expand icon when provided', () => {
    const CustomIcon = () => <span data-testid="custom-icon">Custom</span>;
    
    renderTableCell({
      hasChildren: true,
      expandIcon: <CustomIcon />,
    });

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders placeholder spacer when not selectable and first column', () => {
    renderTableCell({
      index: 0,
    });

    const cell = screen.getByRole('cell');
    const placeholder = cell.querySelector('.placeholder-spacer');
    expect(placeholder).toBeInTheDocument();
  });

  it('does not render placeholder spacer when selectable', () => {
    renderTableCell({
      selectable: true,
      index: 0,
    });

    const cell = screen.getByRole('cell');
    const placeholder = cell.querySelector('.placeholder-spacer');
    expect(placeholder).not.toBeInTheDocument();
  });

  it('does not render placeholder spacer when not first column', () => {
    renderTableCell({
      index: 1,
    });

    const cell = screen.getByRole('cell');
    const placeholder = cell.querySelector('.placeholder-spacer');
    expect(placeholder).not.toBeInTheDocument();
  });

  it('applies theme styles correctly', () => {
    renderTableCell();

    const cell = screen.getByRole('cell');
    expect(cell).toHaveStyle({
      color: mockTheme.table?.cell?.textColor,
      borderColor: mockTheme.table?.cell?.borderColor,
    });
  });

});