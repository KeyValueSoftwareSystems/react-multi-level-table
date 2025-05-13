import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MultiLevelTable } from '../../src/components/MultiLevelTable';
import type { Column, DataItem } from '../../src/types/types';
// Mock data for testing
const mockData: DataItem[] = [
  {
    id: 1,
    name: 'Parent 1',
    value: 100,
    status: 'Active',
    children: [
      {
        id: 2,
        name: 'Child 1.1',
        value: 50,
        status: 'Inactive',
      },
      {
        id: 3,
        name: 'Child 1.2',
        value: 50,
        status: 'Active',
      },
    ],
  },
  {
    id: 4,
    name: 'Parent 2',
    value: 200,
    status: 'Active',
    children: [
      {
        id: 5,
        name: 'Child 2.1',
        value: 100,
        status: 'Pending',
      },
    ],
  },
];
const mockColumns: Column[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'value',
    title: 'Value',
    sortable: true,
    customSortFn: (a, b) => a.value - b.value,
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    render: (value) => (
      <span data-testid="status-cell" style={{ 
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: value === 'Active' ? '#e6ffe6' : 
          value === 'Pending' ? '#fff3e6' : '#e6f3ff',
        color: value === 'Active' ? '#006600' :
          value === 'Pending' ? '#cc7700' : '#0066cc'
      }}>
        {value}
      </span>
    ),
  },
];
describe('MultiLevelTable', () => {
  it('renders table with basic data', () => {
    render(<MultiLevelTable data={mockData} columns={mockColumns} />);
    
    // Check if headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    // Check if parent rows are rendered
    expect(screen.getByText('Parent 1')).toBeInTheDocument();
    expect(screen.getByText('Parent 2')).toBeInTheDocument();
    
    // Check if values are rendered
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });
  it('handles row expansion and collapse', () => {
    render(<MultiLevelTable data={mockData} columns={mockColumns} />);
    
    // Initially children should not be visible
    expect(screen.queryByText('Child 1.1')).not.toBeInTheDocument();
    
    // Click expand button for first parent
    const expandButton = screen.getAllByRole('button')[0];
    fireEvent.click(expandButton);
    
    // Children should now be visible
    expect(screen.getByText('Child 1.1')).toBeInTheDocument();
    expect(screen.getByText('Child 1.2')).toBeInTheDocument();
    
    // Click again to collapse
    fireEvent.click(expandButton);
    
    // Children should be hidden again
    expect(screen.queryByText('Child 1.1')).not.toBeInTheDocument();
  });
  it('handles sorting when sortable is true', () => {
    render(<MultiLevelTable data={mockData} columns={mockColumns} sortable={true} />);
    
    // Click name header to sort
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    // Get all rows and check order
    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    const firstRow = within(rows[0]).getByText('Parent 1');
    const secondRow = within(rows[1]).getByText('Parent 2');
    
    // Initial sort should be ascending
    expect(firstRow).toBeInTheDocument();
    expect(secondRow).toBeInTheDocument();
    
    // Click again to sort descending
    fireEvent.click(nameHeader);
    
    // Check if order is reversed
    const updatedRows = screen.getAllByRole('row').slice(1);
    expect(within(updatedRows[0]).getByText('Parent 2')).toBeInTheDocument();
    expect(within(updatedRows[1]).getByText('Parent 1')).toBeInTheDocument();
  });
  it('handles pagination correctly', () => {
    const largeData: DataItem[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      value: 100 + i * 10,
      status: i % 2 === 0 ? 'Active' : 'Inactive' as const,
    }));
    
    render(<MultiLevelTable data={largeData} columns={mockColumns} pageSize={5} />);
    
    // Check if pagination controls are present
    const nextButton = screen.getByRole('button', { name: '>' });
    const prevButton = screen.getByRole('button', { name: '<' });
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    
    // Check if only first page items are shown
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 5')).toBeInTheDocument();
    expect(screen.queryByText('Item 6')).not.toBeInTheDocument();
    
    // Click next page
    fireEvent.click(nextButton);
    
    // Check if second page items are shown
    expect(screen.getByText('Item 6')).toBeInTheDocument();
    expect(screen.getByText('Item 10')).toBeInTheDocument();
    
    // Click previous page
    fireEvent.click(prevButton);
    
    // Check if we're back to first page
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 5')).toBeInTheDocument();
    expect(screen.queryByText('Item 6')).not.toBeInTheDocument();
  });
  it('applies custom theme correctly', () => {
    const customTheme = {
      colors: {
        background: '#f0f0f0',
      },
      table: {
        cell: {
          borderColor: '#ff0000',
        },
      },
    };
    
    render(
      <MultiLevelTable 
        data={mockData} 
        columns={mockColumns} 
        theme={customTheme}
      />
    );
    
    const table = screen.getByRole('table');
    const tableWrapper = table.closest('.table-wrapper');
    expect(tableWrapper?.parentElement).toHaveStyle({ backgroundColor: '#f0f0f0' });
    expect(table).toHaveStyle({ borderColor: '#ff0000' });
  });
  it('handles custom column rendering', () => {
    const columnsWithCustomRender: Column[] = [
      {
        key: 'name',
        title: 'Name',
        render: (value) => <strong data-testid="custom-name">{value}</strong>,
      },
      ...mockColumns.slice(1),
    ];
    
    render(<MultiLevelTable data={mockData} columns={columnsWithCustomRender} />);
    
    // Check if custom render is applied
    const customElements = screen.getAllByTestId('custom-name');
    expect(customElements).toHaveLength(2); // Two parent rows
    expect(customElements[0]).toHaveTextContent('Parent 1');
  });
  it('handles filtering', () => {
    render(<MultiLevelTable data={mockData} columns={mockColumns} />);
    
    // Find filter input
    const filterInput = screen.getByPlaceholderText('Filter Name...');
    
    // Type in filter
    fireEvent.change(filterInput, { target: { value: 'Parent 1' } });
    
    // Check if only matching rows are shown
    expect(screen.getByText('Parent 1')).toBeInTheDocument();
    expect(screen.queryByText('Parent 2')).not.toBeInTheDocument();
  });
  it('handles custom pagination render', () => {
    const customPagination = vi.fn(() => <div data-testid="custom-pagination">Custom Pagination</div>);
    
    render(
      <MultiLevelTable 
        data={mockData} 
        columns={mockColumns}
        renderCustomPagination={customPagination}
      />
    );
    
    expect(screen.getByTestId('custom-pagination')).toBeInTheDocument();
    expect(customPagination).toHaveBeenCalled();
  });
  it('handles status cell rendering with custom styles', () => {
    render(<MultiLevelTable data={mockData} columns={mockColumns} />);
    
    const statusCells = screen.getAllByTestId('status-cell');
    expect(statusCells).toHaveLength(2); // Two parent rows
    
    // Check if status cells have correct styles
    const activeCell = statusCells.find(cell => cell.textContent === 'Active');
    expect(activeCell).toHaveStyle({
      backgroundColor: '#e6ffe6',
      color: '#006600',
    });
  });
});