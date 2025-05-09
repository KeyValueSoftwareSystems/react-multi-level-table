import React from 'react';
import { Cell } from 'react-table';
import { Column, DataItem } from '../types/types';
import { TableCell } from './TableCell';
import { ExpandIcon } from './ExpandIcon';
import '../styles/TableRow.css';

/**
 * Props for the TableRow component
 * @interface TableRowProps
 * @property {any} row - Row data from react-table
 * @property {Column[]} columns - Array of column configurations
 * @property {boolean} hasChildren - Whether the row has child rows
 * @property {boolean} isExpanded - Whether the row is expanded
 * @property {() => void} onToggle - Function to toggle row expansion
 * @property {number} [level=0] - Nesting level of the row
 */
interface TableRowProps {
  row: any;
  columns: Column[];
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
}

/**
 * Renders a table row with support for nested rows and expansion
 * @component
 * @param {TableRowProps} props - Component props
 * @returns {JSX.Element} Rendered table row
 */
export const TableRow: React.FC<TableRowProps> = ({ row, columns, hasChildren, isExpanded, onToggle, level = 0 }) => {
  /**
   * Generates the appropriate CSS classes for the row based on its state
   * @returns {string} Space-separated CSS classes
   */
  const getRowClassName = () => {
    const classes = ['table-row'];
    if (isExpanded) classes.push('table-row-expanded');
    if (level === 0) classes.push('table-row-main');
    else classes.push('table-row-nested');
    return classes.join(' ');
  };

  // For nested rows that don't have getRowProps
  if (!row.getRowProps) {
    return (
      <tr onClick={onToggle} className={getRowClassName()}>
        {columns.map((column: Column, index: number) => (
          <td
            key={column.key}
            className={`table-cell ${level > 0 ? 'table-cell-nested' : ''}`}
            style={{ paddingLeft: level > 0 ? `${32 + (level * 16)}px` : '12px' }}
          >
            <div className="table-cell-content">
              {hasChildren && index === 0 && <ExpandIcon isExpanded={isExpanded} />}
              {column.render 
                ? column.render(row[column.key], row)
                : row[column.key]}
            </div>
          </td>
        ))}
      </tr>
    );
  }

  // For main table rows that have getRowProps
  const { key, ...rowProps } = row.getRowProps();
  return (
    <tr
      key={key}
      {...rowProps}
      onClick={onToggle}
      className={getRowClassName()}
    >
      {row.cells.map((cell: Cell<DataItem>, index: number) => (
        <TableCell
          key={cell.column.id}
          cell={cell}
          hasChildren={hasChildren && index === 0}
          isExpanded={isExpanded}
          paddingLeft={level > 0 ? 32 + (level * 16) : 0}
        />
      ))}
    </tr>
  );
}; 