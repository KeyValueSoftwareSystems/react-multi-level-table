import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import type { HeaderGroup } from 'react-table';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { TableHeader } from '../../src/components/TableHeader';
import type { DataItem } from '../../src/types/types';

const mockTheme = {
  colors: {
    primaryColor: '#5D5FEF',
    textColor: '#262626',
    borderColor: '#E5E5E5',
  },
  table: {
    header: {
      background: '#f0f0f0',
      textColor: '#000000',
    },
    cell: {
      borderColor: '#e0e0e0',
    },
  },
};

const createMockHeaderGroup = (headers: any[]): HeaderGroup<DataItem> => ({
  getHeaderGroupProps: () => ({
    key: 'header-group',
  }),
  headers: headers.map((header, index) => ({
    getHeaderProps: (props = {}) => ({
      key: `header-${index}`,
      ...props,
    }),
    getSortByToggleProps: () => ({
      onClick: header.onSortClick,
    }),
    render: () => header.title,
    isSorted: header.isSorted,
    isSortedDesc: header.isSortedDesc,
    id: header.id,
    disableSortBy: header.disableSortBy,
  })),
} as unknown as HeaderGroup<DataItem>);

describe('TableHeader', () => {
  const defaultHeaders = [
    { id: 'name', title: 'Name', isSorted: false, isSortedDesc: false },
    { id: 'age', title: 'Age', isSorted: false, isSortedDesc: false },
  ];

  const defaultProps = {
    headerGroups: [createMockHeaderGroup(defaultHeaders)],
    theme: mockTheme,
  };

  const renderTableHeader = (props = {}) => {
    return render(<TableHeader {...defaultProps} {...props} />);
  };

  it('renders header cells correctly', () => {
    renderTableHeader();

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('applies theme styles correctly', () => {
    renderTableHeader();

    const headers = screen.getAllByRole('columnheader');

    headers.forEach(header => {
      expect(header).toHaveStyle({
        backgroundColor: mockTheme.table?.header?.background,
        color: mockTheme.table?.header?.textColor,
        borderColor: mockTheme.table?.cell?.borderColor,
      });
    });
  });

  it('renders sort icons when sortable is true and column is sorted', () => {
    const headersWithSort = [
      { id: 'name', title: 'Name', isSorted: true, isSortedDesc: false },
      { id: 'age', title: 'Age', isSorted: false, isSortedDesc: false },
    ];

    renderTableHeader({
      sortable: true,
      headerGroups: [createMockHeaderGroup(headersWithSort)],
    });

    // Only the sorted column should have SVG elements
    const svgElements = document.querySelectorAll('svg');

    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('handles sort clicks when sortable', () => {
    const onSortClick = vi.fn();
    const headersWithSort = [
      { id: 'name', title: 'Name', isSorted: false, isSortedDesc: false, onSortClick },
      { id: 'age', title: 'Age', isSorted: false, isSortedDesc: false, onSortClick },
    ];

    renderTableHeader({
      sortable: true,
      headerGroups: [createMockHeaderGroup(headersWithSort)],
    });

    const nameHeader = screen.getByText('Name');

    fireEvent.click(nameHeader);
    expect(onSortClick).toHaveBeenCalled();
  });

  it('renders checkbox when selectable is true', () => {
    renderTableHeader({
      selectable: true,
      isAllSelected: false,
      onSelectAll: vi.fn(),
    });

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders checked checkbox when all rows are selected', () => {
    renderTableHeader({
      selectable: true,
      isAllSelected: true,
      onSelectAll: vi.fn(),
    });

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  it('calls onSelectAll when checkbox is clicked', () => {
    const onSelectAllMock = vi.fn();

    renderTableHeader({
      selectable: true,
      isAllSelected: false,
      onSelectAll: onSelectAllMock,
    });

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(onSelectAllMock).toHaveBeenCalled();
  });

  it('shows sort direction indicators', () => {
    const headersWithSort = [
      { id: 'name', title: 'Name', isSorted: true, isSortedDesc: false },
      { id: 'age', title: 'Age', isSorted: true, isSortedDesc: true },
    ];

    renderTableHeader({
      sortable: true,
      headerGroups: [createMockHeaderGroup(headersWithSort)],
    });

    // Check that SVG elements are present (sort icons)
    const svgElements = document.querySelectorAll('svg');

    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('disables sorting for specific columns', () => {
    const headersWithDisabledSort = [
      { id: 'name', title: 'Name', isSorted: false, isSortedDesc: false, disableSortBy: true },
      { id: 'age', title: 'Age', isSorted: false, isSortedDesc: false, disableSortBy: false },
    ];

    renderTableHeader({
      sortable: true,
      headerGroups: [createMockHeaderGroup(headersWithDisabledSort)],
    });

    // The disabled sort column should not have click handlers
    const nameHeader = screen.getByText('Name');

    expect(nameHeader.closest('span')).toHaveStyle({ cursor: 'default' });
  });

  it('renders multiple header groups', () => {
    const headerGroup1 = createMockHeaderGroup([{ id: 'name', title: 'Name', isSorted: false, isSortedDesc: false }]);
    const headerGroup2 = createMockHeaderGroup([{ id: 'age', title: 'Age', isSorted: false, isSortedDesc: false }]);

    renderTableHeader({
      headerGroups: [headerGroup1, headerGroup2],
    });

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders SVG elements for sorted columns', () => {
    const headersWithSort = [
      { id: 'name', title: 'Name', isSorted: true, isSortedDesc: false },
      { id: 'age', title: 'Age', isSorted: false, isSortedDesc: false },
    ];

    renderTableHeader({
      sortable: true,
      headerGroups: [createMockHeaderGroup(headersWithSort)],
    });

    // Check for SVG elements (the actual sort icons)
    const svgElements = document.querySelectorAll('svg');

    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('does not render SVG elements for unsorted columns', () => {
    renderTableHeader({ sortable: true });

    // When no columns are sorted, no SVG elements should be present
    const svgElements = document.querySelectorAll('svg');

    expect(svgElements.length).toBe(0);
  });

}); 