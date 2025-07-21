import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from '../../src/components/Pagination';
import { PAGE_SIZE_OPTIONS } from '../../src/constants/pagination';

const mockTheme = {
  colors: {
    primaryColor: '#5D5FEF',
    textColor: '#262626',
    borderColor: '#E5E5E5',
  },
  pagination: {
    button: {
      background: '#ffffff',
      textColor: '#333333',
      disabledOpacity: '0.5',
    },
    select: {
      background: '#ffffff',
      textColor: '#000000',
      borderColor: '#cccccc',
    },
  },
};

describe('Pagination', () => {
  const defaultProps = {
    canPreviousPage: true,
    canNextPage: true,
    pageOptions: [0, 1, 2],
    pageCount: 3,
    pageIndex: 0,
    gotoPage: vi.fn(),
    nextPage: vi.fn(),
    previousPage: vi.fn(),
    pageSize: 10,
    setPageSize: vi.fn(),
    totalItems: 30,
    theme: mockTheme,
  };

  const renderPagination = (props = {}) => {
    return render(<Pagination {...defaultProps} {...props} />);
  };

  it('handles navigation button clicks correctly', () => {
    renderPagination();
    
    // Test previous page button (left arrow)
    const prevButton = screen.getByRole('button', { name: /arrow left/i });

    fireEvent.click(prevButton);
    expect(defaultProps.previousPage).toHaveBeenCalled();
    
    // Test next page button (right arrow)
    const nextButton = screen.getByRole('button', { name: /arrow right/i });

    fireEvent.click(nextButton);
    expect(defaultProps.nextPage).toHaveBeenCalled();
  });

  it('disables navigation buttons when appropriate', () => {
    renderPagination({
      canPreviousPage: false,
      canNextPage: false,
    });
    
    const prevButton = screen.getByRole('button', { name: /arrow left/i });
    const nextButton = screen.getByRole('button', { name: /arrow right/i });
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('handles page size changes correctly', () => {
    renderPagination();
    
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '20' } });
    
    expect(defaultProps.setPageSize).toHaveBeenCalledWith(20);
  });

  it('renders all page size options', () => {
    renderPagination();
    
    const select = screen.getByRole('combobox');
    const options = select.querySelectorAll('option');
    
    expect(options).toHaveLength(PAGE_SIZE_OPTIONS.length);
    PAGE_SIZE_OPTIONS.forEach(size => {
      expect(screen.getByText(size.toString())).toBeInTheDocument();
    });
  });

  it('maintains selected page size after navigation', () => {
    const pageSize = 20;

    renderPagination({ pageSize });
    
    const select = screen.getByRole('combobox');

    expect(select).toHaveValue(pageSize.toString());
    
    // Navigate to next page
    const nextButton = screen.getByRole('button', { name: /arrow right/i });

    fireEvent.click(nextButton);
    
    // Check if page size is still maintained
    expect(select).toHaveValue(pageSize.toString());
  });

  it('renders total items count', () => {
    renderPagination();
    
    expect(screen.getByText('Total 30 items')).toBeInTheDocument();
  });

  it('renders current page size display', () => {
    renderPagination({ pageSize: 20 });
    
    expect(screen.getByText('20 / page')).toBeInTheDocument();
  });

  it('renders page numbers correctly', () => {
    renderPagination();
    
    // Should show page numbers 1, 2, 3
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('handles page number clicks', () => {
    renderPagination();
    
    const page2Button = screen.getByText('2');

    fireEvent.click(page2Button);
    
    expect(defaultProps.gotoPage).toHaveBeenCalledWith(1); // pageIndex is 0-based
  });

}); 