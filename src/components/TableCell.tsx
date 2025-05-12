import React from 'react';

import type { Cell } from 'react-table';

import { ExpandIcon } from './ExpandIcon';
import type { ThemeProps } from '../types/theme';
import type { DataItem } from '../types/types';


import '../styles/TableCell.css';

/**
 * Props for the TableCell component
 * @interface TableCellProps
 * @property {Cell<DataItem>} cell - Cell data from react-table
 * @property {boolean} hasChildren - Whether the row has child rows
 * @property {boolean} isExpanded - Whether the row is expanded
 * @property {() => void} onToggle - Function to toggle row expansion
 * @property {number} [paddingLeft=0] - Left padding for nested cells
 * @property {ThemeProps} theme - Theme properties
 * @property {React.ReactNode} [expandIcon] - Custom expand icon
 */
interface TableCellProps {
  cell: Cell<DataItem>;
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  paddingLeft?: number;
  theme: ThemeProps;
  expandIcon?: React.ReactNode;
}

/**
 * Renders a table cell with support for expand/collapse icons
 * @component
 * @param {TableCellProps} props - Component props
 * @returns {JSX.Element} Rendered table cell
 */
export const TableCell: React.FC<TableCellProps> = ({ 
  cell, 
  hasChildren, 
  isExpanded, 
  onToggle, 
  paddingLeft = 0,
  theme,
  expandIcon,
}) => {
  const { key, ...cellProps } = cell.getCellProps();

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle();
  };

  return (
    <td
      key={key}
      {...cellProps}
      className="table-cell"
      style={{
        paddingLeft: `${paddingLeft}px`,
        color: theme.table?.cell?.textColor,
        borderColor: theme.table?.cell?.borderColor,
      }}
    >
      <div className="table-cell-content">
        {hasChildren && (
          <button
            onClick={handleExpandClick}
            className="expand-button"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              marginRight: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {expandIcon || <ExpandIcon isExpanded={isExpanded} theme={theme} />}
          </button>
        )}
        {cell.render('Cell')}
      </div>
    </td>
  );
}; 