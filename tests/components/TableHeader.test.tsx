import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { HeaderGroup } from 'react-table';
import { describe, expect, it, vi } from 'vitest';

import { TableHeader } from '../../src/components/TableHeader';
import type { ThemeProps } from '../../src/types/theme';
import type { DataItem } from '../../src/types/types';

// Mock theme
const mockTheme: ThemeProps = {
  table: {
    header: {
      background: '#f0f0f0',
      textColor: '#000000',
    },
    cell: {
      borderColor: '#e0e0e0',
    },
    filter: {
      textColor: '#333333',
      borderColor: '#cccccc',
      background: '#ffffff',
    },
  },
};

// Mock header groups
const createMockHeaderGroup = (
  id: string,
  title: string | React.ReactNode,
  isSorted = false,
  isSortedDesc = false,
  hasFilter = false
): HeaderGroup<DataItem> => {
  const mockColumn = {
    id,
    getHeaderProps: (props = {}) => ({
      key: id,
      ...props,
    }),
    getSortByToggleProps: () => ({
      onClick: vi.fn(),
    }),
    render: (type: string) => (type === 'Header' ? (title || id) : null),
    isSorted,
    isSortedDesc,
    Filter: hasFilter
      ? ({ column }: { column: any }) => (
        <input
          data-testid={`filter-${id}`}
          value={column.filterValue || ''}
          onChange={(e) => column.setFilter?.(e.target.value)}
          placeholder={`Filter ${column.title || column.id}...`}
        />
      )
      : undefined,
    setFilter: hasFilter ? vi.fn() : undefined,
    disableSortBy: false,
    title: title || id,
    filterValue: '',
  };

  const mockHeader = {
    ...mockColumn,
    column: mockColumn
  };

  return {
    id,
    headers: [mockHeader],
    getHeaderGroupProps: () => ({
      key: 'header-group',
    }),
    getHeaderProps: () => ({ key: 'header' }),
    getFooterProps: () => ({ key: 'footer' }),
    getFooterGroupProps: () => ({}),
    toggleHidden: () => {},
    getToggleHiddenProps: () => ({}),
    isVisible: true,
    render: () => null,
    totalLeft: 0,
    totalWidth: 0,
    depth: 0,
    parent: undefined,
    subRows: [],
    values: {},
    totalHeaderCount: 1,
  } as unknown as HeaderGroup<DataItem>;
};

describe('TableHeader', () => {
  const renderTableHeader = (props: {
    headerGroups: HeaderGroup<DataItem>[];
    sortable?: boolean;
    ascendingIcon?: React.ReactNode;
    descendingIcon?: React.ReactNode;
  }) => {
    return render(
      <TableHeader
        headerGroups={props.headerGroups}
        theme={mockTheme}
        sortable={props.sortable}
        ascendingIcon={props.ascendingIcon}
        descendingIcon={props.descendingIcon}
      />
    );
  };

  it('renders header groups correctly', () => {
    const headerGroups = [
      createMockHeaderGroup('name', 'Name'),
      createMockHeaderGroup('age', 'Age'),
    ];

    renderTableHeader({ headerGroups });
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('applies theme styles correctly', () => {
    const headerGroups = [createMockHeaderGroup('name', 'Name')];

    renderTableHeader({ headerGroups });

    const headerCell = screen.getByRole('columnheader', { name: 'Name' });

    expect(headerCell).toHaveStyle({
      backgroundColor: mockTheme.table?.header?.background,
      color: mockTheme.table?.header?.textColor,
      borderColor: mockTheme.table?.cell?.borderColor,
    });
  });

  it('shows sort icons when sortable and column is sorted', () => {
    const headerGroups = [
      createMockHeaderGroup('name', 'Name', true, false),
      createMockHeaderGroup('age', 'Age', true, true),
    ];

    renderTableHeader({ headerGroups, sortable: true });
    expect(screen.getByText('↑')).toBeInTheDocument();
    expect(screen.getByText('↓')).toBeInTheDocument();
  });

  it('uses custom sort icons when provided', () => {
    const headerGroups = [
      createMockHeaderGroup('name', 'Name', true, false),
      createMockHeaderGroup('age', 'Age', true, true),
    ];

    renderTableHeader({
      headerGroups,
      sortable: true,
      ascendingIcon: '▲',
      descendingIcon: '▼',
    });

    expect(screen.getByText('▲')).toBeInTheDocument();
    expect(screen.getByText('▼')).toBeInTheDocument();
  });


  it('uses column id when title is not provided', () => {
    const headerGroups = [createMockHeaderGroup('name', '')];

    renderTableHeader({ headerGroups });
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  it('renders filter input when column has Filter component', () => {
    const headerGroups = [createMockHeaderGroup('name', 'Name', false, false, true)];

    renderTableHeader({ headerGroups });
    const filterInput = screen.getByPlaceholderText('Filter Name...');

    expect(filterInput).toBeInTheDocument();
    expect(filterInput).toHaveClass('filter-input');
  });

  it('applies filter theme styles correctly', () => {
    const headerGroups = [createMockHeaderGroup('name', 'Name', false, false, true)];

    renderTableHeader({ headerGroups });
    const filterInput = screen.getByPlaceholderText('Filter Name...');

    expect(filterInput).toHaveStyle({
      color: mockTheme.table?.filter?.textColor,
      borderColor: mockTheme.table?.filter?.borderColor,
      backgroundColor: mockTheme.table?.filter?.background,
    });
  });

  it('handles filter input change correctly', () => {
    const headerGroups = [createMockHeaderGroup('name', 'Name', false, false, true)];

    renderTableHeader({ headerGroups });
    const filterInput = screen.getByPlaceholderText('Filter Name...');

    fireEvent.change(filterInput, { target: { value: 'test' } });
    const mockColumn = (headerGroups[0].headers[0] as any).column;

    expect(mockColumn.setFilter).toHaveBeenCalledWith('test');
  });

  it('renders filter input with column id when title is not provided', () => {
    const headerGroups = [createMockHeaderGroup('name', '', false, false, true)];

    renderTableHeader({ headerGroups });
    const filterInput = screen.getByPlaceholderText('Filter name...');

    expect(filterInput).toBeInTheDocument();
  });

  it('does not render filter input when column has no Filter component', () => {
    const headerGroups = [createMockHeaderGroup('name', 'Name', false, false, false)];

    renderTableHeader({ headerGroups });
    const filterInput = screen.queryByPlaceholderText('Filter Name...');

    expect(filterInput).not.toBeInTheDocument();
  });

  it('renders a React node as column header', () => {
    const customHeader = <span data-testid="custom-header">Custom</span>;
    const headerGroups = [
      createMockHeaderGroup('custom', customHeader as any),
    ];

    // Patch the render function to return the React node for 'Header'
    (headerGroups[0].headers[0] as any).render = (type: string) => type === 'Header' ? customHeader : null;
    renderTableHeader({ headerGroups });
    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
  });
}); 