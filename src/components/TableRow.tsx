import React from 'react';

import type { Cell, Row } from 'react-table';

import { ExpandIcon } from './ExpandIcon';
import { TableCell } from './TableCell';
import type { ThemeProps } from '../types/theme';
import type { Column, DataItem } from '../types/types';

import '../styles/TableRow.css';

/**
 * Props for the TableRow component
 * @interface TableRowProps
 * @property {Row<DataItem> | DataItem} row - Row data from react-table or direct data item
 * @property {Column[]} columns - Array of column configurations
 * @property {boolean} hasChildren - Whether the row has child rows
 * @property {boolean} isExpanded - Whether the row is expanded
 * @property {() => void} onToggle - Function to toggle row expansion
 * @property {number} [level=0] - Nesting level of the row
 * @property {ThemeProps} theme - Theme properties
 */
interface TableRowProps {
  row: Row<DataItem> | DataItem;
  columns: Column[];
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
  theme: ThemeProps;
}

/**
 * Renders a table row with support for nested rows and expansion
 * @component
 * @param {TableRowProps} props - Component props
 * @returns {JSX.Element} Rendered table row
 */
export const TableRow: React.FC<TableRowProps> = ({ 
  row, 
  columns, 
  hasChildren, 
  isExpanded, 
  onToggle, 
  level = 0,
  theme 
}) => {
  const getRowClassName = () => {
    const classes = ['table-row'];

    if (isExpanded) classes.push('table-row-expanded');
    if (level === 0) classes.push('table-row-main');
    else classes.push('table-row-nested');

    return classes.join(' ');
  };

  const getRowStyle = () => {
    if (level === 0) return { backgroundColor: theme.table?.row?.mainBackground };
    if (isExpanded) return { backgroundColor: theme.table?.row?.expandedBackground };

    return { backgroundColor: theme.table?.row?.nestedBackground };
  };

  // For nested rows that don't have getRowProps
  if (!('getRowProps' in row)) {
    const dataItem = row as DataItem;

    return (
      <tr className={getRowClassName()} style={getRowStyle()}>
        {columns.map((column: Column, index: number) => (
          <td
            key={column.key}
            className={`table-cell ${level > 0 ? 'table-cell-nested' : ''}`}
            style={{
              paddingLeft: level > 0 ? `${32 + (level * 16)}px` : '12px',
              color: theme.table?.cell?.textColor,
              borderColor: theme.table?.cell?.borderColor,
            }}
          >
            <div className="table-cell-content">
              {hasChildren && index === 0 && (
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  style={{ cursor: 'pointer', marginRight: '8px' }}
                >
                  <ExpandIcon isExpanded={isExpanded} theme={theme} />
                </span>
              )}
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
      className={getRowClassName()}
      style={getRowStyle()}
    >
      {tableRow.cells.map((cell: Cell<DataItem>, index: number) => (
        <TableCell
          key={cell.column.id}
          cell={cell}
          hasChildren={hasChildren && index === 0}
          isExpanded={isExpanded}
          onToggle={onToggle}
          paddingLeft={level > 0 ? 32 + (level * 16) : 0}
          theme={theme}
        />
      ))}
    </tr>
  );
}; 