import React, { useMemo } from "react";

import type { Cell, Row } from "react-table";

import { ExpandIcon } from "./ExpandIcon";
import { TableCell } from "./TableCell";
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
}) => {
  const getRowClassName = useMemo(() => {
    const classes = ["table-row"];

    if (isExpanded) classes.push("table-row-expanded");
    if (level === 0) classes.push("table-row-main");
    else classes.push("table-row-nested");

    return classes.join(" ");
  }, [isExpanded, level]);

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

  // For nested rows that don't have getRowProps
  if (!("getRowProps" in row)) {
    const dataItem = row as DataItem;

    return (
      <tr className={getRowClassName} style={getRowStyle}>
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
              <div className="table-cell-content">
                {index === 0 && selectable && (
                  <input
                    type="checkbox"
                    checked={isRowSelected}
                    onChange={() => onRowSelect?.(dataItem.id)}
                    style={{ marginRight: 8, cursor: 'pointer' }}
                  />
                )}
                {hasChildren && index === 0 ? (
                  <button onClick={handleExpandClick} className="expand-button">
                    {expandIcon || (
                      <ExpandIcon isExpanded={isExpanded} theme={theme} />
                    )}
                  </button>
                ) : (
                  <div className="expand-button" />
                )}
                {column.render 
                  ? column.render(displayValue, dataItem)
                  : String(displayValue)}
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
    >
      {tableRow.cells.map((cell: Cell<DataItem>, index: number) => (
        <TableCell
          key={cell.column.id}
          cell={cell}
          hasChildren={hasChildren && index === 0}
          isExpanded={isExpanded}
          onToggle={onToggle}
          paddingLeft={level > 0 ? 32 + level * 16 : 0}
          theme={theme}
          expandIcon={expandIcon}
          selectable={selectable && index === 0}
          isRowSelected={isRowSelected}
          onRowSelect={onRowSelect}
          rowId={tableRow.original.id}
        />
      ))}
    </tr>
  );
};
