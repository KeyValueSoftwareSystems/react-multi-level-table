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
import type { PaginationProps } from "./Pagination";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { SortType } from '../constants/sort';
import { defaultTheme } from "../constants/theme";
import { mergeThemeProps } from "../mergeThemeProps";
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
  theme?: ThemeProps;
  renderCustomPagination?: (props?: PaginationProps) => React.ReactNode;
  sortable?: boolean;
  ascendingIcon?: React.ReactNode;
  descendingIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
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
  renderCustomPagination = null,
  sortable = false,
  ascendingIcon,
  descendingIcon,
  expandIcon,
}) => {
  const mergedTheme = mergeThemeProps(defaultTheme, theme);
  const [filterInput, setFilterInput] = useState("");

  /**
   * Prepares columns configuration for react-table
   * @returns {Array} Array of column configurations
   */
  const tableColumns = useMemo<TableColumn<DataItem>[]>(() => {
    return columns.map((col) => ({
      Header: col.title,
      accessor: (row: DataItem) => row[col.key as keyof DataItem],
      disableSortBy: sortable ? col.sortable === false : true,
      sortType: col.customSortFn ? SortType.Custom : SortType.Basic,
      sortFn: col.customSortFn,
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
  }, [columns, filterInput, sortable]);

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
            theme={mergedTheme}
            expandIcon={expandIcon}
          />
          {renderNestedRows(child.id, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div style={{ backgroundColor: mergedTheme.colors?.background }}>
      <table
        {...getTableProps()}
        className="table-container"
        style={{ borderColor: mergedTheme.table?.cell?.borderColor }}
      >
        <TableHeader headerGroups={headerGroups} theme={mergedTheme} sortable={sortable}
          ascendingIcon={ascendingIcon}
          descendingIcon={descendingIcon} />
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
                  theme={mergedTheme}
                  expandIcon={expandIcon}
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
          theme: mergedTheme,
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
          theme={mergedTheme}
        />
      )}
    </div>
  );
};
