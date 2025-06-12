import React, { useEffect, useMemo, useState } from "react";

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
import { SortType } from "../constants/sort";
import { defaultTheme } from "../constants/theme";
import { mergeThemeProps } from "../mergeThemeProps";
import type { ThemeProps } from "../types/theme";
import type {
  Column,
  DataItem,
  SelectionState,
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
 * @property {(row: DataItem) => void} [onRowClick] - Optional callback function when a parent row is clicked
 * @property {string[]} [searchableColumns] - Array of column keys to search in
 * @property {boolean} [showSearchBar=true] - Whether to show the search bar
 */
export interface MultiLevelTableProps {
  data: DataItem[];
  columns: Column[];
  pageSize?: number;
  theme?: ThemeProps;
  renderCustomPagination?: (props?: PaginationProps) => React.ReactNode;
  sortable?: boolean;
  ascendingIcon?: React.ReactNode;
  descendingIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: Set<string | number>) => void;
  onRowClick?: (row: DataItem) => void;
  searchableColumns?: string[];
  showSearchBar?: boolean;
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
  selectable = false,
  onSelectionChange,
  onRowClick,
  searchableColumns,
  showSearchBar = true,
}) => {
  const mergedTheme = mergeThemeProps(defaultTheme, theme);
  const [selectionState, setSelectionState] = useState<SelectionState>({
    selectedRows: new Set(),
    isAllSelected: false,
  });

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Use provided searchableColumns or all columns
  const searchCols = useMemo(() => {
    if (searchableColumns && searchableColumns.length > 0) return searchableColumns;

    return columns.map(col => col.key);
  }, [searchableColumns, columns]);

  // Filtered data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm)

      return data;

    const lowerSearch = searchTerm.toLowerCase();

    return data.filter(row =>
      searchCols.some(colKey => {
        const value = row[colKey as keyof DataItem];

        return value && value.toString().toLowerCase().includes(lowerSearch);
      })
    );

  }, [data, searchTerm, searchCols]);

  // Get all parent row IDs (level 0)
  const parentRowIds = useMemo(() => data.map(item => item.id), [data]);

  const handleSelectAll = () => {
    const newIsAllSelected = !selectionState.isAllSelected;
    const newSelectedRows = new Set<string | number>();

    if (newIsAllSelected) parentRowIds.forEach(id => newSelectedRows.add(id));

    setSelectionState({
      selectedRows: newSelectedRows,
      isAllSelected: newIsAllSelected,
    });

    onSelectionChange?.(newSelectedRows);
  };

  const handleRowSelect = (rowId: string | number) => {
    const newSelectedRows = new Set(selectionState.selectedRows);

    if (newSelectedRows.has(rowId)) newSelectedRows.delete(rowId);
    else newSelectedRows.add(rowId);

    const newIsAllSelected = newSelectedRows.size === parentRowIds.length;

    setSelectionState({
      selectedRows: newSelectedRows,
      isAllSelected: newIsAllSelected,
    });

    onSelectionChange?.(newSelectedRows);
  };

  const tableColumns = useMemo<TableColumn<DataItem>[]>(() => {
    return columns.map((col) => ({
      id: col.key,
      Header: () => col.title,
      accessor: (row: DataItem) => row[col.key as keyof DataItem],
      disableSortBy: sortable ? col.sortable === false : true,
      sortType: col.customSortFn ? SortType.Custom : SortType.Basic,
      sortFn: col.customSortFn,
      Cell: ({
        row,
        value,
      }: {
        row: Row<DataItem>;
        value: string | number;
      }) => {
        const item = row.original;

        return (
          <div>{col.render ? col.render(value, item) : value?.toString()}</div>
        );
      },
    }));
  }, [columns, sortable]);

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
    state: { pageIndex, pageSize: currentPageSize, sortBy, filters },
  } = useTable(
    {
      columns: tableColumns,
      data: filteredData,
      initialState: { pageSize } as TableStateWithPagination<DataItem>,
      // @ts-expect-error - sortTypes is not included in the type definition but is supported by react-table
      sortTypes: {
        custom: (
          rowA: Row<DataItem>,
          rowB: Row<DataItem>,
          columnId: string
        ) => {
          const column = columns.find((col) => col.key === columnId);

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
    const map = new Map<string | number, DataItem[]>();

    const processItem = (item: DataItem) => {
      if (item.children) {
        map.set(item.id, item.children);
        item.children.forEach(processItem);
      }
    };

    data.forEach(processItem);

    return map;
  }, [data]);

  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());

  // Collapse expanded rows when filtering or sorting occurs
  useEffect(() => {
    if (expandedRows.size > 0) setExpandedRows(new Set());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, filters]);

  const toggleRow = (rowId: string | number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(rowId)) 
        newSet.delete(rowId);
      else 
        newSet.add(rowId);

      return newSet;
    });
  };

  const renderNestedRows = (parentId: string | number, level = 1) => {
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
            selectable={false}
            isRowSelected={false}
          />
          {renderNestedRows(child.id, level + 1)}
        </React.Fragment>
      );
    });
  };

  const renderPagination = () => {
    if (renderCustomPagination) 
      return renderCustomPagination({
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
      });
    

    return (
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
    );
  };

  const renderTableBody = () => {
    return (
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
                level={0}
                theme={mergedTheme}
                expandIcon={expandIcon}
                selectable={true}
                isRowSelected={selectionState.selectedRows.has(row.original.id)}
                onRowSelect={handleRowSelect}
                onRowClick={onRowClick}
                isParentRow={true}
              />
              {renderNestedRows(parentId)}
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  return (
    <div style={{ backgroundColor: mergedTheme.colors?.background }}>
      <div className="table-wrapper">
        {/* Style for search input placeholder */}
        <style>{`
          .mlt-search-input::placeholder {
            color: #8C8C8C  ;
            opacity: 1;
          }
        `}</style>
        {showSearchBar && (
          <div 
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              gap: "1rem",
            }}
          >
            <div style={{  minWidth: 0, maxWidth: "400px", position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#595959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <input
                className="mlt-search-input"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.5rem 0.5rem 2.5rem",
                  borderRadius: "8px",
                  border: `1px solid ${mergedTheme.table?.cell?.borderColor || "#D9D9D9"}`,
                  backgroundColor: mergedTheme.colors?.background || "#ffffff",
                  color: mergedTheme.colors?.textColor || "#000000",
                  fontSize: "0.875rem",
                  outline: "none",
                  transition: "border 0.2s",
                }}
                onFocus={e => e.currentTarget.style.border = '1.5px solid #D9D9D9'}
                onBlur={e => e.currentTarget.style.border = `1px solid ${mergedTheme.table?.cell?.borderColor || "#D9D9D9"}`}
              />
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: `1px solid ${mergedTheme.table?.cell?.borderColor || "#e2e8f0"}`,
                  backgroundColor: mergedTheme.colors?.background || "#ffffff",
                  color: mergedTheme.colors?.textColor || "#000000",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>Export</span>
              </button>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: `1px solid ${mergedTheme.table?.cell?.borderColor || "#e2e8f0"}`,
                  backgroundColor: mergedTheme.colors?.background || "#ffffff",
                  color: mergedTheme.colors?.textColor || "#000000",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>Filter</span>
              </button>
            </div>
          </div>
        )}
        <table
          {...getTableProps()}
          className="main-table-container"
          style={{ borderColor: mergedTheme.table?.cell?.borderColor }}
        >
          <TableHeader
            headerGroups={headerGroups}
            theme={mergedTheme}
            sortable={sortable}
            ascendingIcon={ascendingIcon}
            descendingIcon={descendingIcon}
            selectable={selectable}
            isAllSelected={selectionState.isAllSelected}
            onSelectAll={handleSelectAll}
          />
          {renderTableBody()}
        </table>

        {renderPagination()}
      </div>
    </div>
  );
};
