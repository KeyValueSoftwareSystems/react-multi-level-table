import React from 'react';

import { ArrowIcon } from './icons';
import { PAGE_SIZE_OPTIONS } from '../constants/pagination';
import { colors, componentStyles } from '../styles/style';
import type { ThemeProps } from '../types/theme';
import '../styles/Pagination.css';

/**
 * Props for the Pagination component
 * @interface PaginationProps
 * @property {boolean} canPreviousPage - Whether previous page navigation is available
 * @property {boolean} canNextPage - Whether next page navigation is available
 * @property {number[]} pageOptions - Array of available page numbers
 * @property {number} pageCount - Total number of pages
 * @property {number} pageIndex - Current page index
 * @property {(page: number) => void} gotoPage - Function to navigate to a specific page
 * @property {() => void} nextPage - Function to navigate to next page
 * @property {() => void} previousPage - Function to navigate to previous page
 * @property {number} pageSize - Number of items per page
 * @property {(size: number) => void} setPageSize - Function to change page size
 * @property {number} totalItems - Total number of items in the filtered data
 * @property {ThemeProps} theme - Theme properties
 */
export interface PaginationProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  pageCount: number;
  pageIndex: number;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalItems: number;
  theme: ThemeProps;
}

/**
 * Renders pagination controls for the table
 * @component
 * @param {PaginationProps} props - Component props
 * @returns {JSX.Element} Rendered pagination controls
 */
export const Pagination: React.FC<PaginationProps> = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  gotoPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
  totalItems
}) => {
  // Generate page numbers to show
  const getVisiblePages = () => {
    const pages: number[] = [];
    
    // If 5 or fewer pages, show all
    if (pageCount <= 5) {
      for (let i = 0; i < pageCount; i++) 
        pages.push(i);
      
      return pages;
    }
    
    // For more than 5 pages, show smart pagination
    if (pageIndex <= 2) {
      // Near start: show 1, 2, 3, 4, 5, ..., last
      for (let i = 0; i < 5; i++) 
        pages.push(i);

      pages.push(-1); // Ellipsis marker
      pages.push(pageCount - 1);
    } else if (pageIndex >= pageCount - 3) {
      // Near end: show 1, ..., last-4, last-3, last-2, last-1, last
      pages.push(0);
      pages.push(-1); // Ellipsis marker
      for (let i = pageCount - 5; i < pageCount; i++) 
        pages.push(i);

    } else {
      // Middle: show 1, ..., current-1, current, current+1, ..., last
      pages.push(0);
      pages.push(-1); // Ellipsis marker
      pages.push(pageIndex - 1);
      pages.push(pageIndex);
      pages.push(pageIndex + 1);
      pages.push(-1); // Ellipsis marker
      pages.push(pageCount - 1);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div style={{ ...componentStyles.pagination.container, position: 'relative' as const }}>
      {/* Centered Content Container */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
      }}>
        {/* Total Items Text */}
        <div style={{ ...componentStyles.pagination.totalItems, position: 'static' }}>
          Total {totalItems} items
        </div>
        
        {/* Navigation */}
        <div style={componentStyles.pagination.navigation}>
          {/* Left Arrow */}
          <button
            style={{
              ...componentStyles.pagination.arrowButton,
              opacity: canPreviousPage ? 1 : 0.5,
              cursor: canPreviousPage ? 'pointer' : 'not-allowed'
            }}
            onClick={() => canPreviousPage && previousPage()}
            disabled={!canPreviousPage}
            aria-label="Previous page"
          >
            <ArrowIcon direction="left" width={16} height={16} color={colors.borderDark} />
          </button>
          
          {/* Page Numbers */}
          {visiblePages.map((pageNum, index) => (
            pageNum === -1 ? (
              <span key={`ellipsis-${index}`} style={{ color: colors.borderDark, padding: '0 4px' }}>
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                style={{
                  ...componentStyles.pagination.pageButton,
                  ...(pageNum === pageIndex 
                    ? componentStyles.pagination.pageButtonSelected 
                    : componentStyles.pagination.pageButtonUnselected
                  )
                }}
                onClick={() => gotoPage(pageNum)}
              >
                {pageNum + 1}
              </button>
            )
          ))}
          
          {/* Right Arrow */}
          <button
            style={{
              ...componentStyles.pagination.arrowButton,
              opacity: canNextPage ? 1 : 0.5,
              cursor: canNextPage ? 'pointer' : 'not-allowed'
            }}
            onClick={() => canNextPage && nextPage()}
            disabled={!canNextPage}
            aria-label="Next page"
          >
            <ArrowIcon direction="right" width={16} height={16} color={colors.borderDark} />
          </button>
        </div>
        
        {/* Page Size Selector */}
        <div style={{ 
          ...componentStyles.pagination.pageSizeSelect, 
          position: 'relative',
          border: '1px solid #E5E5E5',
          borderRadius: '4px',
          padding: '4px 8px'
        }}>
          <span>{pageSize} / page</span>
          <ArrowIcon direction="down" width={16} height={16} color={colors.borderDark} />
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className="pagination-select"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer'
            }}
          >
            {PAGE_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}; 
