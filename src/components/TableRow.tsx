import React, { useMemo } from "react";

import type { Cell, Row } from "react-table";

import { DeleteIcon, ExpandIcon } from "./icons";
import { TableCell } from "./TableCell";
import { tableRowTypography } from "../styles/style";
import type { ThemeProps } from "../types/theme";
import type { Column, DataItem } from "../types/types";

import "../styles/TableRow.css";

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
 * @property {React.ReactNode} [expandIcon] - Custom expand icon
 * @property {boolean} [selectable=false] - Whether the row is selectable
 * @property {boolean} [isRowSelected=false] - Whether the row is selected
 * @property {(rowId: number) => void} [onRowSelect] - Function to select a row
 * @property {(row: DataItem) => void} [onRowClick] - Optional callback function when a parent row is clicked
 */
interface TableRowProps {
  row: Row<DataItem> | DataItem;
  columns: Column[];
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
  theme: ThemeProps;
  expandIcon?: React.ReactNode;
  selectable?: boolean;
  isRowSelected?: boolean;
  onRowSelect?: (rowId: number) => void;
  onRowClick?: (row: DataItem) => void;
  onDelete?: (rowId: string | number, itemName: string) => void;
  isParentRow?: boolean;
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
  theme,
  expandIcon,
  selectable = false,
  isRowSelected = false,
  onRowSelect,
  onRowClick,
  onDelete,
  isParentRow = false,
}) => {
  const getRowClassName = useMemo(() => {
    const classes = [];

    if (isExpanded) classes.push("table-row-expanded");
    if (level === 0) classes.push("table-row-main");
    if(onRowClick) classes.push("table-row-clickable");
    else classes.push("table-row-nested");

    return classes.join(" ");
  }, [isExpanded, level, onRowClick]);

  const getRowStyle = useMemo(() => {
    const rowShades = theme.table?.row?.levelColors || [];
    // Use the level to determine which shade to use, defaulting to the lightest shade for deeper nesting
    const shadeIndex = Math.min(level, rowShades.length - 1);
    
    return { backgroundColor: rowShades[shadeIndex]?.background };
  }, [level, theme.table?.row?.levelColors]);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  const handleDeleteClick = (dataItem: DataItem) => (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if(onDelete)
      onDelete(dataItem.id, dataItem.name || `Item ${dataItem.id}`);
  };

  const handleRowClick = () => {
    if (onRowClick && level === 0) {
      const dataItem = "original" in row ? row.original : row as DataItem;
      
      onRowClick(dataItem);
    }
  };

  // For nested rows that don't have getRowProps
  if (!("getRowProps" in row)) {
    const dataItem = row as DataItem;

    return (
      <tr 
        className={getRowClassName} 
        style={getRowStyle}
        onClick={handleRowClick}
      >
        {columns.map((column: Column, index: number) => {
          const value = dataItem[column.key as keyof DataItem];
          const displayValue =
            typeof value === "string" || typeof value === "number" ? value : "";

          return (
            <td
              key={column.key}
              className={`table-cell ${level > 0 ? "table-cell-nested" : ""}`}
              style={{
                color: theme.table?.cell?.textColor,
                borderColor: theme.table?.cell?.borderColor,
              }}
            >
              <div className="table-cell-content" style={tableRowTypography}>
                {index === 0 && selectable && (
                  <input
                    type="checkbox"
                    checked={isRowSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      onRowSelect?.(dataItem.id);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="row-checkbox checkbox-wrapper"
                  />
                )}

                {/* Add placeholder for child rows to maintain alignment with parent rows */}
                {index === 0 && !selectable && (
                  <div className="placeholder-spacer" />
                )}

                <div 
                  onClick={handleExpandClick}
                  className={`expand-button ${isParentRow || index !== 0 ? 'parent-row-expand-button' : 'nested-row-expand-button'} ${hasChildren && index === 0 ? 'expand-button-visible' : 'expand-button-hidden'}`}
                >
                  {expandIcon || (
                    <ExpandIcon isExpanded={isExpanded} theme={theme} mode="expand" />
                  )}
                </div>
                
                {column.render 
                  ? column.render(displayValue, dataItem)
                  : String(displayValue)}
                
                {onDelete && (
                  <div 
                    className="delete-button"
                    onClick={handleDeleteClick(dataItem)}
                  >
                    <DeleteIcon 
                      width={16} 
                      height={16} 
                      color="#dc3545"
                      onClick={handleDeleteClick(dataItem)}
                    />
                  </div>
                )}
              </div>
            </td>
          );
        })}
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
      className={getRowClassName}
      style={getRowStyle}
      onClick={handleRowClick}
    >
      {tableRow.cells.map((cell: Cell<DataItem>, index: number) => (
        <TableCell
          key={cell.column.id}
          cell={cell}
          hasChildren={hasChildren && index === 0}
          isExpanded={isExpanded}
          onToggle={onToggle}
          theme={theme}
          expandIcon={expandIcon}
          selectable={selectable && index === 0}
          isRowSelected={isRowSelected}
          onRowSelect={onRowSelect}
          rowId={tableRow.original.id}
          index={index}
        />
      ))}
    </tr>
  );
};
