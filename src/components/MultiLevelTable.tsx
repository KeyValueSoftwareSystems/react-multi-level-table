import React, { useMemo, useState } from "react";

import {
  type Row,
  type Column as TableColumn,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { Pagination } from "./Pagination";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import type { ThemeProps } from "../types/theme";
import type {
  Column,
  DataItem,
  TableInstanceWithHooks,
  TableStateWithPagination,
} from "../types/types";
import "../styles/MultiLevelTable.css";

/**
 * Props for the MultiLevelTable component
 * @interface MultiLevelTableProps
 * @property {DataItem[]} data - Array of data items to display in the table
 * @property {Column[]} columns - Array of column configurations
 * @property {number} [pageSize=10] - Number of items per page
 * @property {ThemeProps} theme - Theme properties
 */
interface MultiLevelTableProps {
  data: DataItem[];
  columns: Column[];
  pageSize?: number;
  theme: ThemeProps;
}

/**
 * A multi-level table component that supports hierarchical data, sorting, filtering, and pagination
 * @component
 * @param {MultiLevelTableProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export const MultiLevelTable: React.FC<MultiLevelTableProps> = ({
  data,
  columns,
  pageSize = 10,
  theme,
}) => {
  const [filterInput, setFilterInput] = useState("");

  /**
   * Prepares columns configuration for react-table
   * @returns {Array} Array of column configurations
   */
  const tableColumns = useMemo<TableColumn<DataItem>[]>(() => {
    return columns.map((col) => ({
      Header: col.title,
      accessor: (row: DataItem) => row[col.key as keyof DataItem],
      Cell: ({ row, value }: { row: Row<DataItem>; value: string | number }) => {
        const item = row.original;

        return (
          <div>
            {col.render ? col.render(value, item) : value?.toString()}
          </div>
        );
      },
      Filter: col.filterable
        ? ({ column }: { column: { setFilter: (value: string) => void } }) => (
          <input
            value={filterInput}
            onChange={(e) => {
              setFilterInput(e.target.value);
              column.setFilter(e.target.value);
            }}
            placeholder={`Filter ${col.title}...`}
          />
        )
        : undefined,
    }));
  }, [columns, filterInput]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize: currentPageSize },
  } = useTable(
    {
      columns: tableColumns,
      data,
      initialState: { pageSize } as TableStateWithPagination<DataItem>,
    },
    useFilters,
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<DataItem>;

  const rowsMap = useMemo(() => {
    const map = new Map<number, DataItem[]>();

    const processItem = (item: DataItem) => {
      if (item.children) {
        map.set(item.id, item.children);
        item.children.forEach(processItem);
      }
    };

    data.forEach(processItem);

    return map;
  }, [data]);

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (rowId: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(rowId)) 
        newSet.delete(rowId);
      else 
        newSet.add(rowId);
      

      return newSet;
    });
  };

  const renderNestedRows = (parentId: number, level = 1) => {
    if (!expandedRows.has(parentId)) return null;

    const children = rowsMap.get(parentId) || [];

    return children.map((child) => {
      const hasChildren = rowsMap.has(child.id);

      return (
        <React.Fragment key={child.id}>
          <TableRow
            row={child}
            columns={columns}
            hasChildren={hasChildren}
            isExpanded={expandedRows.has(child.id)}
            onToggle={() => hasChildren && toggleRow(child.id)}
            level={level}
            theme={theme}
          />
          {renderNestedRows(child.id, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div style={{ backgroundColor: theme.colors?.background }}>
      <table
        {...getTableProps()}
        className="table-container"
        style={{ borderColor: theme.table?.cell?.borderColor }}
      >
        <TableHeader headerGroups={headerGroups} theme={theme} />
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const parentId = row.original.id;
            const hasChildren = rowsMap.has(parentId);

            return (
              <React.Fragment key={parentId}>
                <TableRow
                  row={row}
                  columns={columns}
                  hasChildren={hasChildren}
                  isExpanded={expandedRows.has(parentId)}
                  onToggle={() => hasChildren && toggleRow(parentId)}
                  theme={theme}
                />
                {renderNestedRows(parentId)}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageSize={currentPageSize}
        setPageSize={setPageSize}
        theme={theme}
      />
    </div>
  );
};
