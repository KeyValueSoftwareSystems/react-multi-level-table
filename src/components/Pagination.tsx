import React from 'react';

import { PAGE_SIZE_OPTIONS } from '../constants/pagination';

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
  pageOptions,
  pageCount,
  pageIndex,
  gotoPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
}) => (
  <div className="pagination-container">
    <div>
      <button 
        onClick={() => gotoPage(0)} 
        disabled={!canPreviousPage}
        className="pagination-button"
      >
        {'<<'}
      </button>
      <button 
        onClick={() => previousPage()} 
        disabled={!canPreviousPage}
        className="pagination-button"
      >
        {'<'}
      </button>
      <button 
        onClick={() => nextPage()} 
        disabled={!canNextPage}
        className="pagination-button"
      >
        {'>'}
      </button>
      <button 
        onClick={() => gotoPage(pageCount - 1)} 
        disabled={!canNextPage}
        className="pagination-button"
      >
        {'>>'}
      </button>
      <span className="pagination-info">
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>
    </div>
    <select
      value={pageSize}
      onChange={e => {
        setPageSize(Number(e.target.value));
      }}
      className="pagination-select"
    >
      {PAGE_SIZE_OPTIONS.map(size => (
        <option key={size} value={size}>
          Show {size}
        </option>
      ))}
    </select>
  </div>
); 