import React, { useMemo, useState } from "react";

import type { Row } from "react-table";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";

import { Pagination } from "./Pagination";
import type { PaginationProps } from "./Pagination";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { SortType } from '../constants/sort';
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
 * @property {string} [childrenKey='children'] - Key to access child items in data
 * @property {number} [pageSize=10] - Number of items per page
 */

export interface MultiLevelTableProps {
  data: DataItem[];
  columns: Column[];
  childrenKey?: string;
  pageSize?: number;
  renderCustomPagination?: (props?: PaginationProps) => React.ReactNode;
  sortable?: boolean;
  ascendingIcon?: React.ReactNode;
  descendingIcon?: React.ReactNode;
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
  childrenKey = "children",
  pageSize = 10,
  renderCustomPagination = null,
  sortable = false,
  ascendingIcon,
  descendingIcon,
}) => {
  const [filterInput, setFilterInput] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(
    new Set()
  );

  /**
   * Creates a map of all rows and their children for efficient lookup
   * @returns {Map<string | number, DataItem[]>} Map of row IDs to their children
   */
  const rowsMap = useMemo(() => {
    const map = new Map<string | number, DataItem[]>();
    const processItem = (item: DataItem) => {
      const children = item[childrenKey] as DataItem[];

      if (children?.length) {
        map.set(item.id!, children);
        children.forEach((child: DataItem) => {
          processItem(child);
        });
      }
    };

    data.forEach(processItem);

    return map;
  }, [data, childrenKey]);

  /**
   * Prepares columns configuration for react-table
   * @returns {Array} Array of column configurations
   */
  const tableColumns = useMemo(() => {
    return columns.map((col) => ({
      Header: col.title,
      accessor: col.key,
      disableSortBy: sortable ? col.sortable === false : true,
      sortType: col.customSortFn ? SortType.Custom : SortType.Basic,
      sortFn: col.customSortFn,
      Cell: ({ row, value }: { row: Row<DataItem>; value: unknown }) => {
        const item = row.original;

        return (
          <div style={{ paddingLeft: `${item.level || 0}px` }}>
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
  }, [columns, filterInput, sortable]);

  // Initialize table with react-table hooks
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
      // @ts-expect-error - sortTypes is not included in the type definition but is supported by react-table
      sortTypes: {
        custom: (rowA: Row<DataItem>, rowB: Row<DataItem>, columnId: string) => {
          const column = columns.find(col => col.key === columnId);

          if (column?.customSortFn) 
            return column.customSortFn(rowA.original, rowB.original, columnId);
          
          return 0;
        },
      },
    },
    useFilters,
    ...(sortable ? [useSortBy] : []),
    usePagination
  ) as TableInstanceWithHooks<DataItem>;

  /**
   * Toggles the expanded state of a row
   * @param {string | number} rowId - ID of the row to toggle
   */
  const toggleRow = (rowId: string | number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(rowId)) newSet.delete(rowId);
      else newSet.add(rowId);

      return newSet;
    });
  };

  /**
   * Recursively renders nested rows for a parent row
   * @param {string | number} parentId - ID of the parent row
   * @param {number} [level=0] - Current nesting level
   * @returns {JSX.Element[] | null} Array of nested row elements or null
   */
  const renderNestedRows = (parentId: string | number, level: number = 0) => {
    if (!expandedRows.has(parentId)) return null;

    const children = rowsMap.get(parentId) || [];

    return children.map((child: DataItem) => {
      const hasChildren = rowsMap.has(child.id!);

      return (
        <React.Fragment key={child.id}>
          <TableRow
            row={child}
            columns={columns}
            hasChildren={hasChildren}
            isExpanded={expandedRows.has(child.id!)}
            onToggle={() => hasChildren && toggleRow(child.id!)}
            level={level}
          />
          {renderNestedRows(child.id!, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <table {...getTableProps()} className="table-container">
        <TableHeader 
          headerGroups={headerGroups} 
          sortable={sortable}
          ascendingIcon={ascendingIcon}
          descendingIcon={descendingIcon}
        />
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
                />
                {renderNestedRows(parentId)}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {renderCustomPagination ? (
        renderCustomPagination({
          canPreviousPage,
          canNextPage,
          pageOptions,
          pageCount,
          pageIndex,
          pageSize: currentPageSize,
          gotoPage,
          nextPage,
          previousPage,
          setPageSize,
        })
      ) : (
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
        />
      )}
    </div>
  );
};
