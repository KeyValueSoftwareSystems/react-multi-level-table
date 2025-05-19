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
}) => {
  const mergedTheme = mergeThemeProps(defaultTheme, theme);
  const [filterInput, setFilterInput] = useState("");
  const [selectionState, setSelectionState] = useState<SelectionState>({
    selectedRows: new Set(),
    isAllSelected: false,
  });

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

  /**
   * Prepares columns configuration for react-table
   * @returns {Array} Array of column configurations
   */
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
      Filter: col.filterable
        ? ({ column }: { column: { setFilter: (value: string) => void; filterValue?: string } }) => (
          <input
            value={filterInput}
            onChange={(e) => {
              setFilterInput(e.target.value);
              column.setFilter(e.target.value);
            }}
            placeholder={`Filter ${typeof col.title === 'string' ? col.title : col.key}...`}
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
    state: { pageIndex, pageSize: currentPageSize, sortBy, filters },
  } = useTable(
    {
      columns: tableColumns,
      data,
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
        <table
          {...getTableProps()}
          className="table-container"
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
