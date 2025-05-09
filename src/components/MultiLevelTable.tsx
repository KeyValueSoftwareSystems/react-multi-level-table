import React, { useState, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  TableInstance,
  TableState,
  HeaderGroup,
  Cell,
} from 'react-table';

export interface Column {
  key: string;
  title: string;
  render?: (value: any, record: any) => React.ReactNode;
  filterable?: boolean;
}

export interface DataItem {
  id?: string | number;
  [key: string]: any;
}

interface TableStateWithPagination<T extends object> extends TableState<T> {
  pageIndex: number;
  pageSize: number;
}

interface TableInstanceWithHooks<T extends object> extends TableInstance<T> {
  page: any[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  pageCount: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  state: TableStateWithPagination<T>;
}

interface HeaderGroupWithSort<T extends object> extends HeaderGroup<T> {
  getSortByToggleProps: () => any;
  isSorted: boolean;
  isSortedDesc: boolean;
  Filter?: React.ComponentType<any>;
}

export interface MultiLevelTableProps {
  data: DataItem[];
  columns: Column[];
  childrenKey?: string;
  pageSize?: number;
}

export const MultiLevelTable: React.FC<MultiLevelTableProps> = ({
  data,
  columns,
  childrenKey = 'children',
  pageSize = 10,
}) => {
  const [filterInput, setFilterInput] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set());

  // Process data to create a map of all rows and their children
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

  // Get top-level rows for the table
  const parentRows = useMemo(() => {
    return data;
  }, [data]);

  // Prepare columns for react-table
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
      data: parentRows,
      initialState: { pageSize } as TableStateWithPagination<DataItem>,
    },
    useFilters,
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<DataItem>;

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

  // Recursive function to render nested rows
  const renderNestedRows = (parentId: string | number, level: number = 0) => {
    if (!expandedRows.has(parentId)) return null;
    
    const children = rowsMap.get(parentId) || [];
    return children.map((child: DataItem) => {
      const hasChildren = rowsMap.has(child.id!);
      return (
        <React.Fragment key={child.id}>
          <tr
            onClick={() => hasChildren && toggleRow(child.id!)}
            style={{
              cursor: hasChildren ? 'pointer' : 'default',
              backgroundColor: expandedRows.has(child.id!) ? 'green' : 'pink',
            }}
          >
            {columns.map((column: Column) => (
              <td
                key={column.key}
                style={{
                  padding: '12px',
                  borderBottom: '1px solid #ddd',
                  paddingLeft: `${32 + (level * 16)}px`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {hasChildren && (
                    <span style={{ marginRight: '8px' }}>
                      {expandedRows.has(child.id!) ? '▼' : '▶'}
                    </span>
                  )}
                  {column.render
                    ? column.render(child[column.key], child)
                    : child[column.key]}
                </div>
              </td>
            ))}
          </tr>
          {renderNestedRows(child.id!, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  {column.Filter ? column.render('Filter') : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            const parentId = row.original.id;
            const hasChildren = rowsMap.has(parentId);
            
            return (
              <React.Fragment key={parentId}>
                <tr 
                  {...row.getRowProps()}
                  onClick={() => hasChildren && toggleRow(parentId)}
                  style={{ 
                    cursor: hasChildren ? 'pointer' : 'default',
                    backgroundColor: expandedRows.has(parentId) ? 'red' : 'blue',
                  }}
                >
                  {row.cells.map((cell: Cell<DataItem>) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {hasChildren && (
                          <span style={{ marginRight: '8px' }}>
                            {expandedRows.has(parentId) ? '▼' : '▶'}
                          </span>
                        )}
                        {cell.render('Cell')}
                      </div>
                    </td>
                  ))}
                </tr>
                {renderNestedRows(parentId)}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
        <select
          value={currentPageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}; 