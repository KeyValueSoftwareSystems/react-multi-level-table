import React from 'react';

import type { Cell } from 'react-table';

import { ExpandIcon } from './ExpandIcon';
import type { DataItem } from '../types/types';
import '../styles/TableCell.css';

/**
 * Props for the TableCell component
 * @interface TableCellProps
 * @property {Cell<DataItem>} cell - Cell data from react-table
 * @property {boolean} hasChildren - Whether the row has child rows
 * @property {boolean} isExpanded - Whether the row is expanded
 * @property {number} [paddingLeft=0] - Left padding for nested cells
 */
interface TableCellProps {
  cell: Cell<DataItem>;
  hasChildren: boolean;
  isExpanded: boolean;
  paddingLeft?: number;
}

/**
 * Renders a table cell with support for expand/collapse icons
 * @component
 * @param {TableCellProps} props - Component props
 * @returns {JSX.Element} Rendered table cell
 */
export const TableCell: React.FC<TableCellProps> = ({ cell, hasChildren, isExpanded, paddingLeft = 0 }) => {
  const { key, ...cellProps } = cell.getCellProps();

  return (
    <td
      key={key}
      {...cellProps}
      className="table-cell"
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      <div className="table-cell-content">
        {hasChildren && <ExpandIcon isExpanded={isExpanded} />}
        {cell.render('Cell')}
      </div>
    </td>
  );
}; 