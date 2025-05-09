import React, { useState, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
} from 'react-table';
import { Column, DataItem, TableInstanceWithHooks, TableStateWithPagination } from '../types';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableRow } from '../TableRow/TableRow';
import { Pagination } from '../Pagination/Pagination';
import './styles.css';

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
  childrenKey = 'children',
  pageSize = 10,
}) => {
  const [filterInput, setFilterInput] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());

  /**
   * Creates a map of all rows and their children for efficient lookup
   * @returns {Map<string | number, DataItem[]>} Map of row IDs to their children
   */
  const rowsMap = useMemo(() => {
    const map = new Map<string | number, DataItem[]>();

    const processItem = (item: DataItem) => {
      if (item[childrenKey]?.length) {
        map.set(item.id!, item[childrenKey]);
        item[childrenKey].forEach((child: DataItem) => {
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
    return columns.map(col => ({
      Header: col.title,
      accessor: col.key,
      Cell: ({ row, value }: any) => {
        const item = row.original;
        return (
          <div style={{ paddingLeft: `${item.level || 0}px` }}>
            {col.render ? col.render(value, item) : value}
          </div>
        );
      },
      Filter: col.filterable ? ({ column }: any) => (
        <input
          value={filterInput}
          onChange={e => {
            setFilterInput(e.target.value);
            column.setFilter(e.target.value);
          }}
          placeholder={`Filter ${col.title}...`}
        />
      ) : undefined,
    }));
  }, [columns, filterInput]);

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
    },
    useFilters,
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<DataItem>;

  /**
   * Toggles the expanded state of a row
   * @param {string | number} rowId - ID of the row to toggle
   */
  const toggleRow = (rowId: string | number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
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
      <table {...getTableProps()} className='table-container'>
        <TableHeader headerGroups={headerGroups} />
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
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
    </div>
  );
}; 