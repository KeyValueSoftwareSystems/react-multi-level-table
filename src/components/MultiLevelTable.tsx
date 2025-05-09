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

  // Separate parent and child rows
  const { parentRows, childRowsMap } = useMemo(() => {
    const parentRows: DataItem[] = [];
    const childRowsMap = new Map<string | number, DataItem[]>();

    const processItem = (item: DataItem) => {
      parentRows.push(item);
      if (item[childrenKey]?.length) {
        childRowsMap.set(item.id!, item[childrenKey]);
        item[childrenKey].forEach((child: DataItem) => {
          processItem(child);
        });
      }
    };

    data.forEach(processItem);
    return { parentRows, childRowsMap };
  }, [data, childrenKey]);

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

  // Render child rows for a parent
  const renderChildRows = (parentId: string | number) => {
    const children = childRowsMap.get(parentId) || [];
    return children.map((child: DataItem) => (
      <tr key={child.id}>
        {columns.map((column: Column) => (
          <td
            key={column.key}
            style={{
              padding: '12px',
              borderBottom: '1px solid #ddd',
              paddingLeft: '32px',
            }}
          >
            {column.render
              ? column.render(child[column.key], child)
              : child[column.key]}
          </td>
        ))}
      </tr>
    ));
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
            return (
              <React.Fragment key={parentId}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: Cell<DataItem>) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
                {renderChildRows(parentId)}
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