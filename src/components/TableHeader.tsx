import React from "react";

import type { HeaderGroup } from "react-table";

import type { ThemeProps } from "../types/theme";
import type { DataItem } from "../types/types";

import "../styles/TableHeader.css";

/**
 * Props for the TableHeader component
 * @interface TableHeaderProps
 * @property {HeaderGroup<DataItem>[]} headerGroups - Array of header groups from react-table
 * @property {ThemeProps} theme - Theme properties
 * @property {boolean} [sortable=false] - Whether the table is sortable
 * @property {React.ReactNode} [ascendingIcon] - Custom icon for ascending sort
 * @property {React.ReactNode} [descendingIcon] - Custom icon for descending sort
 * @property {boolean} [selectable=false] - Whether the table is selectable
 * @property {boolean} [isAllSelected=false] - Whether all rows are selected
 * @property {() => void} [onSelectAll] - Function to select all rows
 */
interface TableHeaderProps {
  headerGroups: HeaderGroup<DataItem>[];
  theme: ThemeProps;
  sortable?: boolean;
  ascendingIcon?: React.ReactNode;
  descendingIcon?: React.ReactNode;
  selectable?: boolean;
  isAllSelected?: boolean;
  onSelectAll?: () => void;
}

type ColumnWithSorting = {
  getHeaderProps: (props?: { style?: React.CSSProperties }) => {
    style?: React.CSSProperties;
    onClick?: () => void;
    key?: string;
  };
  getSortByToggleProps: () => {
    style?: React.CSSProperties;
    onClick?: () => void;
  };
  render: (type: string) => React.ReactNode;
  isSorted?: boolean;
  isSortedDesc?: boolean;
  id: string;
  disableSortBy?: boolean;
  title?: string | React.ReactNode;
  filterValue?: string;
  setFilter?: (value: string) => void;
};

/**
 * Renders the table header with support for sorting and filtering
 * @component
 * @param {TableHeaderProps} props - Component props
 * @returns {JSX.Element} Rendered table header
 */
export const TableHeader: React.FC<TableHeaderProps> = ({
  headerGroups,
  theme,
  sortable = false,
  ascendingIcon,
  descendingIcon,
  selectable = false,
  isAllSelected = false,
  onSelectAll,
}) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => {
        const { key: headerGroupKey, ...headerGroupProps } =
          headerGroup.getHeaderGroupProps();

        return (
          <tr key={headerGroupKey} {...headerGroupProps}>
            {(headerGroup.headers as unknown as ColumnWithSorting[]).map(
              (column, index) => {
                const isColumnSortable = sortable && !column.disableSortBy;
                const { key: columnKey } = isColumnSortable
                  ? column.getHeaderProps(column.getSortByToggleProps())
                  : column.getHeaderProps();

                const sortProps = isColumnSortable
                  ? column.getSortByToggleProps()
                  : {};

                return (
                  <th
                    key={columnKey}
                    className="fixed-width-col"
                    style={{
                      backgroundColor: theme.table?.header?.background,
                      color: theme.table?.header?.textColor,
                      borderColor: theme.table?.cell?.borderColor,
                    }}
                  >
                    <div className="table-header-cell">
                      {index === 0 && selectable && (
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={onSelectAll}
                          className="row-checkbox"
                          style={{ marginRight: 8, cursor: "pointer" }}
                        />
                      )}
                      <span style={{width: "12px"}}/>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          cursor: isColumnSortable ? "pointer" : "default",
                          userSelect: "none",
                        }}
                        onClick={
                          isColumnSortable
                            ? (e: React.MouseEvent) => {
                              e.stopPropagation();
                              (
                                  sortProps.onClick as (
                                    e: React.MouseEvent
                                  ) => void
                              )?.(e);
                            }
                            : undefined
                        }
                      >
                        {column.render("Header")}
                        <span className="sort-icon" style={{ marginLeft: 4 }}>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? descendingIcon || "↓"
                              : ascendingIcon || "↑"
                            : " "}
                        </span>
                      </span>
                    </div>
                  </th>
                );
              }
            )}
          </tr>
        );
      })}
    </thead>
  );
};
