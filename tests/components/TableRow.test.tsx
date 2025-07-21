import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import type { Row } from 'react-table';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TableRow } from '../../src/components/TableRow';
import type { Column, DataItem } from '../../src/types/types';

const mockTheme = {
  colors: {
    primaryColor: '#5D5FEF',
    textColor: '#262626',
    borderColor: '#E5E5E5',
  },
  table: {
    row: {
      levelColors: [
        { background: '#ffffff' },
        { background: '#f8f8f8' },
        { background: '#f5f5f5' }
      ],
    },
  },
};

const mockData: DataItem = {
  id: 1,
  name: 'Test Item',
  status: 'Active',
  resourceType: 'Application',
  dateTime: '2024-01-01',
  orchestration: 'ECS',
};

const mockColumns: Column[] = [
  { key: 'name', title: 'Name' },
  { key: 'status', title: 'Status' },
];

describe('TableRow', () => {
    let mockRow: Row<DataItem>;

    beforeEach(() => {
      mockRow = {
        getRowProps: () => ({
        key: 'test-row-1',
          className: 'test-row'
        }),
        cells: [
          { 
            column: { 
              id: 'name',
              isVisible: true,
              render: () => null,
              totalLeft: 0,
              totalWidth: 100,
              width: 100,
              minWidth: 0,
              maxWidth: 100,
              depth: 0,
              parent: undefined,
              placeholderOf: undefined,
              Header: 'Name',
              getHeaderProps: () => ({ key: 'header-name' }),
              getFooterProps: () => ({ key: 'footer-name' }),
              toggleHidden: () => {},
              getToggleHiddenProps: () => ({})
            }, 
            value: 'Test Item',
            row: {} as Row<DataItem>,
            getCellProps: () => ({ key: 'cell-name' }),
            render: () => 'Test Item'
          },
          { 
            column: { 
            id: 'status',
              isVisible: true,
              render: () => null,
              totalLeft: 100,
              totalWidth: 100,
              width: 100,
              minWidth: 0,
              maxWidth: 100,
              depth: 0,
              parent: undefined,
              placeholderOf: undefined,
            Header: 'Status',
            getHeaderProps: () => ({ key: 'header-status' }),
            getFooterProps: () => ({ key: 'footer-status' }),
              toggleHidden: () => {},
              getToggleHiddenProps: () => ({})
            }, 
          value: 'Active',
            row: {} as Row<DataItem>,
          getCellProps: () => ({ key: 'cell-status' }),
          render: () => 'Active'
          }
        ],
        allCells: [],
        values: {},
        index: 0,
        original: mockData,
      id: 'test-row-1',
        subRows: []
      };

      // Update the row reference in cells after mockRow is created
      mockRow.cells[0].row = mockRow;
      mockRow.cells[1].row = mockRow;
    });

  describe('Main Table Row', () => {
    it('renders row cells correctly', () => {
      render(
        <TableRow
          row={mockRow}
          columns={mockColumns}
          hasChildren={false}
          isExpanded={false}
          onToggle={() => {}}
          level={0}
          theme={mockTheme}
        />
      );

      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('handles row expansion correctly', () => {
      const onToggle = vi.fn();

      render(
        <TableRow
          row={mockRow}
          columns={mockColumns}
          hasChildren={true}
          isExpanded={false}
          onToggle={onToggle}
          level={0}
          theme={mockTheme}
        />
      );

      // Find the expand button (it's a div, not a button)
      const expandButton = screen.getByText('Test Item').closest('td')?.querySelector('.expand-button');

      expect(expandButton).toBeInTheDocument();
      
      if (expandButton) {
        fireEvent.click(expandButton);
        expect(onToggle).toHaveBeenCalledTimes(1);
      }
    });

    it('renders custom expand icon when provided', () => {
      const CustomExpandIcon = () => <span data-testid="custom-icon">Custom</span>;

      render(
        <TableRow
          row={mockRow}
          columns={mockColumns}
          hasChildren={true}
          isExpanded={false}
          onToggle={() => {}}
          level={0}
          theme={mockTheme}
          expandIcon={<CustomExpandIcon />}
        />
      );

      // Should find exactly one custom icon (not multiple)
      const customIcons = screen.getAllByTestId('custom-icon');

      expect(customIcons).toHaveLength(1);
    });

    it('applies correct level styling', () => {
      render(
        <TableRow
          row={mockRow}
          columns={mockColumns}
          hasChildren={false}
          isExpanded={false}
          onToggle={() => {}}
          level={2}
          theme={mockTheme}
        />
      );

      const row = screen.getByRole('row');

      expect(row).toHaveClass('table-row-nested');
    });
  });

  describe('Nested Table Row', () => {
    let mockNestedRow: Row<DataItem>;

    beforeEach(() => {
      mockNestedRow = {
        getRowProps: () => ({
          key: 'nested-row-1',
          className: 'test-nested-row'
        }),
        cells: [
          { 
            column: { 
              id: 'name',
              isVisible: true,
              render: () => null,
              totalLeft: 0,
              totalWidth: 100,
              width: 100,
              minWidth: 0,
              maxWidth: 100,
              depth: 0,
              parent: undefined,
              placeholderOf: undefined,
              Header: 'Name',
              getHeaderProps: () => ({ key: 'header-name' }),
              getFooterProps: () => ({ key: 'footer-value' }),
              toggleHidden: () => {},
              getToggleHiddenProps: () => ({})
            }, 
            value: 'Test Item',
            row: {} as Row<DataItem>,
            getCellProps: () => ({ key: 'cell-name' }),
            render: () => 'Test Item'
          },
          { 
            column: { 
              id: 'status',
              isVisible: true,
              render: () => null,
              totalLeft: 100,
              totalWidth: 100,
              width: 100,
              minWidth: 0,
              maxWidth: 100,
              depth: 0,
              parent: undefined,
              placeholderOf: undefined,
              Header: 'Status',
              getHeaderProps: () => ({ key: 'header-status' }),
              getFooterProps: () => ({ key: 'footer-status' }),
              toggleHidden: () => {},
              getToggleHiddenProps: () => ({})
            }, 
            value: 'Active',
            row: {} as Row<DataItem>,
            getCellProps: () => ({ key: 'cell-status' }),
            render: () => 'Active'
          }
        ],
        allCells: [],
        values: {},
        index: 0,
        original: mockData,
        id: 'nested-row-1',
        subRows: []
      };

      // Update the row reference in cells after mockNestedRow is created
      mockNestedRow.cells[0].row = mockNestedRow;
      mockNestedRow.cells[1].row = mockNestedRow;
    });

    it('renders nested row correctly', () => {
      render(
        <TableRow
          row={mockNestedRow}
          columns={mockColumns}
          hasChildren={false}
          isExpanded={false}
          onToggle={() => {}}
          level={1}
          theme={mockTheme}
        />
      );

      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('applies nested row styling', () => {
      render(
        <TableRow
          row={mockNestedRow}
          columns={mockColumns}
          hasChildren={false}
          isExpanded={false}
          onToggle={() => {}}
          level={1}
          theme={mockTheme}
        />
      );

      const row = screen.getByRole('row');

      expect(row).toHaveClass('table-row-nested');
    });

    it('handles nested row expansion', () => {
      const onToggle = vi.fn();

      render(
        <TableRow
          row={mockNestedRow}
          columns={mockColumns}
          hasChildren={true}
          isExpanded={false}
          onToggle={onToggle}
          level={1}
          theme={mockTheme}
        />
      );

      const expandButton = screen.getByText('Test Item').closest('td')?.querySelector('.expand-button');

      expect(expandButton).toBeInTheDocument();

      if (expandButton) {
        fireEvent.click(expandButton);
        expect(onToggle).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('Custom Expand Icon', () => {
    it('renders custom expand icon when provided', () => {
      const CustomExpandIcon = () => <span data-testid="custom-icon">Custom</span>;
      
      render(
        <TableRow
          row={mockRow}
          columns={mockColumns}
          hasChildren={true}
          isExpanded={false}
          onToggle={() => {}}
          level={0}
          theme={mockTheme}
          expandIcon={<CustomExpandIcon />}
        />
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

}); 