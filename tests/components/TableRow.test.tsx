import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Row } from 'react-table';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TableRow } from '../../src/components/TableRow';
import type { ThemeProps } from '../../src/types/theme';
import type { Column, DataItem } from '../../src/types/types';

// Mock theme for testing
const mockTheme: ThemeProps = {
  table: {
    row: {
      levelColors: [
        { background: '#ffffff' },
        { background: '#f5f5f5' },
        { background: '#eeeeee' }
      ]
    },
    cell: {
      textColor: '#000000',
      borderColor: '#dddddd'
    }
  }
};

// Mock data for testing
const mockData: DataItem = {
  id: 1,
  name: 'Test Item',
  value: 100,
  status: 'Active'
};

// Mock columns for testing
const mockColumns: Column[] = [
  { key: 'name', title: 'Name' },
  { key: 'value', title: 'Value' }
];

describe('TableRow', () => {
  describe('Main Table Row', () => {
    let mockRow: Row<DataItem>;

    beforeEach(() => {
      mockRow = {
        getRowProps: () => ({
          key: 'row-1',
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
              id: 'value',
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
              Header: 'Value',
              getHeaderProps: () => ({ key: 'header-value' }),
              getFooterProps: () => ({ key: 'footer-value' }),
              toggleHidden: () => {},
              getToggleHiddenProps: () => ({})
            }, 
            value: 100,
            row: {} as Row<DataItem>,
            getCellProps: () => ({ key: 'cell-value' }),
            render: () => '100'
          }
        ],
        allCells: [],
        values: {},
        index: 0,
        original: mockData,
        id: 'row-1',
        subRows: []
      };

      // Update the row reference in cells after mockRow is created
      mockRow.cells[0].row = mockRow;
      mockRow.cells[1].row = mockRow;
    });

    it('renders main table row correctly', () => {
      render(
        <TableRow
          row={mockRow}
          columns={mockColumns}
          hasChildren={true}
          isExpanded={false}
          onToggle={() => {}}
          level={0}
          theme={mockTheme}
        />
      );

      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('applies correct classes for main row', () => {
      render(
        <TableRow
          row={mockRow}
          columns={mockColumns}
          hasChildren={true}
          isExpanded={false}
          onToggle={() => {}}
          level={0}
          theme={mockTheme}
        />
      );

      const row = screen.getByText('Test Item').closest('tr');

      expect(row).toHaveClass('table-row-main');
    });

    it('applies clickable class when onRowClick is provided', () => {
      render(
        <TableRow
          row={mockRow}
          columns={mockColumns}
          hasChildren={true}
          isExpanded={false}
          onToggle={() => {}}
          level={0}
          theme={mockTheme}
          onRowClick={() => {}}
        />
      );

      const row = screen.getByText('Test Item').closest('tr');

      expect(row).toHaveClass('table-row-clickable');
    });

    it('handles row click correctly', () => {
      const onRowClick = vi.fn();

      render(
        <TableRow
          row={mockRow}
          columns={mockColumns}
          hasChildren={true}
          isExpanded={false}
          onToggle={() => {}}
          level={0}
          theme={mockTheme}
          onRowClick={onRowClick}
        />
      );

      const row = screen.getByText('Test Item').closest('tr');

      fireEvent.click(row!);
      expect(onRowClick).toHaveBeenCalledWith(mockData);
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

      const expandButton = screen.getByRole('button');

      fireEvent.click(expandButton);
      expect(onToggle).toHaveBeenCalledTimes(1);
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
              id: 'value',
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
              Header: 'Value',
              getHeaderProps: () => ({ key: 'header-value' }),
              getFooterProps: () => ({ key: 'footer-value' }),
              toggleHidden: () => {},
              getToggleHiddenProps: () => ({})
            }, 
            value: 100,
            row: {} as Row<DataItem>,
            getCellProps: () => ({ key: 'cell-value' }),
            render: () => '100'
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
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('applies correct classes for nested row', () => {
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

      const row = screen.getByText('Test Item').closest('tr');

      expect(row).toHaveClass('table-row-nested');
    });

    it('does not trigger click handler for nested rows', () => {
      const onRowClick = vi.fn();

      render(
        <TableRow
          row={mockNestedRow}
          columns={mockColumns}
          hasChildren={false}
          isExpanded={false}
          onToggle={() => {}}
          level={1}
          theme={mockTheme}
          onRowClick={onRowClick}
        />
      );

      const row = screen.getByText('Test Item').closest('tr');

      fireEvent.click(row!);
      expect(onRowClick).not.toHaveBeenCalled();
    });

    it('applies correct background color based on nesting level', () => {
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

      const row = screen.getByText('Test Item').closest('tr');

      expect(row).toHaveStyle({ backgroundColor: '#f5f5f5' });
    });
  });

  describe('Custom Expand Icon', () => {
    const CustomExpandIcon = () => <span data-testid="custom-icon">Custom</span>;

    it('renders custom expand icon when provided', () => {
      render(
        <TableRow
          row={mockData}
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

  describe('Column Rendering', () => {
    const customRenderColumn = (value: string | number) => (
      <span data-testid="custom-render">{`Custom ${value}`}</span>
    );

    const columnsWithCustomRender: Column[] = [
      { key: 'name', title: 'Name', render: customRenderColumn },
      { key: 'value', title: 'Value' }
    ];

    it('uses custom render function when provided', () => {
      render(
        <TableRow
          row={mockData}
          columns={columnsWithCustomRender}
          hasChildren={false}
          isExpanded={false}
          onToggle={() => {}}
          level={0}
          theme={mockTheme}
        />
      );

      expect(screen.getByTestId('custom-render')).toBeInTheDocument();
      expect(screen.getByText('Custom Test Item')).toBeInTheDocument();
    });
  });
}); 