import React from 'react';
import { Cell, Row } from 'react-table';
import { Column, DataItem } from '../types';
import { TableCell } from '../TableCell/TableCell';
import { ExpandIcon } from '../ExpandIcon/ExpandIcon';
import './styles.css';

/**
 * Props for the TableRow component
 * @interface TableRowProps
 * @property {Row<DataItem> | DataItem} row - Row data from react-table or direct data item
 * @property {Column[]} columns - Array of column configurations
 * @property {boolean} hasChildren - Whether the row has child rows
 * @property {boolean} isExpanded - Whether the row is expanded
 * @property {() => void} onToggle - Function to toggle row expansion
 * @property {number} [level=0] - Nesting level of the row
 */
interface TableRowProps {
  row: Row<DataItem> | DataItem;
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
  if (!('getRowProps' in row)) {
    const dataItem = row as DataItem;
    return (
      <tr onClick={onToggle} className={getRowClassName()}>
        {columns.map((column: Column) => (
          <td
            key={column.key}
            className={`table-cell ${level > 0 ? 'table-cell-nested' : ''}`}
            style={{ paddingLeft: level > 0 ? `${32 + (level * 16)}px` : '12px' }}
          >
            <div className="table-cell-content">
              {hasChildren && <ExpandIcon isExpanded={isExpanded} />}
              {column.render 
                ? column.render(dataItem[column.key], dataItem)
                : String(dataItem[column.key])}
            </div>
          </td>
        ))}
      </tr>
    );
  }

  // For main table rows that have getRowProps
  const tableRow = row as Row<DataItem>;
  const { key, ...rowProps } = tableRow.getRowProps();
  return (
    <tr
      key={key}
      {...rowProps}
      onClick={onToggle}
      className={getRowClassName()}
    >
      {tableRow.cells.map((cell: Cell<DataItem>) => (
        <TableCell
          key={cell.column.id}
          cell={cell}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          paddingLeft={level > 0 ? 32 + (level * 16) : 0}
        />
      ))}
    </tr>
  );
}; 