import type React from 'react';

import type { Row, TableInstance, TableState } from 'react-table';

export interface Column {
  key: string;
  title: string;
  filterable?: boolean;
  render?: (value: string | number, item: DataItem) => React.ReactNode;
  sortable?: boolean;
  customSortFn?: (rowA: DataItem, rowB: DataItem, columnId: string) => number;
}

export interface DataItem {
  id: number;
  name: string;
  value: number;
  status: 'Active' | 'Inactive' | 'Pending';
  children?: DataItem[];
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

export interface SelectionState {
  selectedRows: Set<string | number>;
  isAllSelected: boolean;
} 