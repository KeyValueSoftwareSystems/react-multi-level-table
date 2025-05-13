import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from '../../src/components/Pagination';
import { PAGE_SIZE_OPTIONS } from '../../src/constants/pagination';
import type { ThemeProps } from '../../src/types/theme';

// Mock theme
const mockTheme: ThemeProps = {
  pagination: {
    button: {
      background: '#ffffff',
      textColor: '#000000',
      disabledOpacity: '0.5',
    },
    info: {
      textColor: '#333333',
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
    theme: mockTheme,
  };

  const renderPagination = (props = {}) => {
    return render(<Pagination {...defaultProps} {...props} />);
  };

  it('handles navigation button clicks correctly', () => {
    renderPagination();
    
    // Test first page button
    fireEvent.click(screen.getByText('<<'));
    expect(defaultProps.gotoPage).toHaveBeenCalledWith(0);
    
    // Test previous page button
    fireEvent.click(screen.getByText('<'));
    expect(defaultProps.previousPage).toHaveBeenCalled();
    
    // Test next page button
    fireEvent.click(screen.getByText('>'));
    expect(defaultProps.nextPage).toHaveBeenCalled();
    
    // Test last page button
    fireEvent.click(screen.getByText('>>'));
    expect(defaultProps.gotoPage).toHaveBeenCalledWith(2);
  });

  it('disables navigation buttons when appropriate', () => {
    renderPagination({
      canPreviousPage: false,
      canNextPage: false,
    });
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
      expect(button).toHaveStyle({
        opacity: mockTheme.pagination?.button?.disabledOpacity,
      });
    });
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
      expect(screen.getByText(`Show ${size}`)).toBeInTheDocument();
    });
  });

  it('maintains selected page size after navigation', () => {
    const pageSize = 20;
    renderPagination({ pageSize });
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue(pageSize.toString());
    
    // Navigate to next page
    fireEvent.click(screen.getByText('>'));
    
    // Check if page size is still maintained
    expect(select).toHaveValue(pageSize.toString());
  });

}); 