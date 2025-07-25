import React, { useEffect, useState } from 'react';

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
  // Track screen width for responsive pagination
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screen width on window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Generate page numbers to show based on screen size
  const getVisiblePages = () => {
    const pages: number[] = [];
    
    // Determine how many page numbers to show based on screen width
    let maxVisiblePages: number;
    let showPageNumbers = true;

    if (screenWidth <= 374) 
      // Very small screens: show only 2 page numbers + ellipsis
      maxVisiblePages = 2;
    else if (screenWidth <= 542) 
      // Small screens: show 3 page numbers + ellipsis
      maxVisiblePages = 3;
    else if (screenWidth < 1228) 
      // Medium screens: show 4 page numbers + ellipsis
      maxVisiblePages = 4;
    else 
      // Large screens: show up to 6 page numbers
      maxVisiblePages = 6;

    // For very small screens, don't show page numbers at all
    if (screenWidth <= 415) 
      showPageNumbers = false;
    
    // If not showing page numbers, return empty array (only arrows will show)
    if (!showPageNumbers) 
      return pages;
    
    // If total pages is less than or equal to max visible pages, show all
    if (pageCount <= maxVisiblePages) {
      for (let i = 0; i < pageCount; i++) 
        pages.push(i);
      
      return pages;
    }
    
    // Calculate how many pages to show on each side of current page
    const sidePages = Math.floor((maxVisiblePages - 1) / 2);
    
    // Near start
    if (pageIndex <= sidePages) {
      // Show first few pages + ellipsis + last page
      for (let i = 0; i < maxVisiblePages - 1; i++) 
        pages.push(i);

      pages.push(-1); // Ellipsis marker
      pages.push(pageCount - 1);
    } 
    // Near end
    else if (pageIndex >= pageCount - sidePages - 1) {
      // Show first page + ellipsis + last few pages
      pages.push(0);
      pages.push(-1); // Ellipsis marker

      for (let i = pageCount - (maxVisiblePages - 1); i < pageCount; i++) 
        pages.push(i);
    } 
    // Middle
    else {
      // Show first page + ellipsis + current and neighbors + ellipsis + last page
      pages.push(0);
      pages.push(-1); // Ellipsis marker

      for (let i = pageIndex - sidePages; i <= pageIndex + sidePages; i++) 
        pages.push(i);

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
        position: 'absolute'
      }}>
        {/* Total Items Text */}
        <div 
          className="pagination-total-items"
          style={{ ...componentStyles.pagination.totalItems, position: 'static' }}
        >
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
