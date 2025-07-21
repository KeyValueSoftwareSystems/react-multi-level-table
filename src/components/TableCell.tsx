import React from 'react';

import type { Cell } from 'react-table';

import { ExpandIcon } from './icons';
import { tableRowTypography } from '../styles/style';
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
 * @property {boolean} [selectable=false] - Whether the cell is selectable
 * @property {boolean} [isRowSelected=false] - Whether the row is selected
 * @property {(rowId: number) => void} [onRowSelect] - Function to select a row
 * @property {number} [rowId] - ID of the row
 * @property {number} [index=0] - Index of the column in the row
 */
interface TableCellProps {
  cell: Cell<DataItem>;
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  theme: ThemeProps;
  expandIcon?: React.ReactNode;
  selectable?: boolean;
  isRowSelected?: boolean;
  onRowSelect?: (rowId: number) => void;
  rowId?: number;
  index?: number;
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
  theme,
  expandIcon,
  selectable = false,
  isRowSelected = false,
  onRowSelect,
  rowId,
  index = 0,
}) => {
  const { key, ...cellProps } = cell.getCellProps();
  const isSelectionColumn = cell.column.id === 'selection';

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle();
  };

  const onSelect = () => {
    if (rowId && onRowSelect) 
      onRowSelect(rowId);
  };

  return (
    <td
      key={key}
      {...cellProps}
      className={"table-cell fixed-width-col"}
      style={{
        color: theme.table?.cell?.textColor,
        borderColor: theme.table?.cell?.borderColor,
      }}
    >
      <div className="table-cell-content" style={tableRowTypography}>
        {selectable && (
          <input
            type="checkbox"
            checked={isRowSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="row-checkbox"
          />
        )}
        
        {/* Add placeholder for child rows to maintain alignment with parent rows */}
        {!selectable && index === 0 && (
          <div className="placeholder-spacer" />
        )}
        
        {isSelectionColumn ? (
          cell.render('Cell')
        ) : (
          <>
            {hasChildren ? (
              <div
                onClick={handleExpandClick}
                className="expand-button"
              >
                {expandIcon || <ExpandIcon isExpanded={isExpanded} theme={theme} mode="expand" />}
              </div>
            ) : <div className="expand-button" />}
            {cell.render('Cell')}
          </>
        )}
      </div>
    </td>
  );
}; 