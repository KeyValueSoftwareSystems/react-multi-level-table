import type React from 'react';

import type { Row, TableInstance, TableState } from 'react-table';

export interface Column {
  key: string;
  title: string;
  render?: (value: unknown, record: DataItem) => React.ReactNode;
  filterable?: boolean;
  sortable?: boolean;
  customSortFn?: (rowA: DataItem, rowB: DataItem, columnId: string) => number;
}

export interface DataItem {
  id: string | number;
  level?: number;
  [key: string]: unknown;
}

export interface TableStateWithPagination<T extends object> extends TableState<T> {
  pageIndex: number;
  pageSize: number;
}

export interface TableInstanceWithHooks<T extends object> extends TableInstance<T> {
  page: Row<T>[];
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