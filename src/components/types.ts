import React from 'react';
import { TableInstance, TableState } from 'react-table';

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

export interface TableStateWithPagination<T extends object> extends TableState<T> {
  pageIndex: number;
  pageSize: number;
}

export interface TableInstanceWithHooks<T extends object> extends TableInstance<T> {
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