import type React from 'react';

import type { Row, TableInstance, TableState } from 'react-table';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface Column {
  key: string;
  title: string | React.ReactNode;
  filterable?: boolean;
  filterOptions?: FilterOption[];
  render?: (value: string | number, item: DataItem) => React.ReactNode;
  sortable?: boolean;
  customSortFn?: (rowA: DataItem, rowB: DataItem, columnId: string) => number;
}

export interface DataItem {
  id: number;
  resourceType: string;
  name: string;
  dateTime: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Processing' | 'Provisioning';
  orchestration: string;
  imageURL?: string;
  subtext?: string;
  showActionButtons?: boolean;
  children?: DataItem[];
}

export interface TableStateWithPagination<T extends object> extends TableState<T> {
  pageIndex: number;
  pageSize: number;
  sortBy: Array<{ id: string; desc: boolean }>;
  filters: Array<{ id: string; value: string }>;
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

import type { ThemeProps } from './theme';

export interface DropdownProps {
  isOpen?: boolean;
  onClose: () => void;
  onToggle?: (isOpen: boolean) => void;
  selectedValues?: Set<string | number>;
  onFilterChange?: (values: Set<string | number>) => void;
  options?: FilterOption[];
  theme?: ThemeProps;
  // Common filter props
  tempSelectedValues?: Set<string | number>;
  selectedCategory?: string | null;
  categories?: Array<{
    key: string;
    title: string;
    count: number;
  }>;
  categoryFilterOptions?: FilterOption[];
  onApply?: (values: Set<string | number>) => void;
  onCancel?: () => void;
  onReset?: () => void;
  onCategoryChange?: (categoryKey: string) => void;
  onSelectAll?: () => void;
  onOptionChange?: (value: string | number) => void;
  // Export props
  handleExportCSV?: () => void;
  // Additional properties
  [key: string]: unknown;
}

export interface ButtonConfig {
  id: string;
  icon: React.ComponentType<{ width?: number; height?: number }>;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  iconPosition?: 'left' | 'right';
  badge?: {
    count: number;
  };
  badgeStyle?: React.CSSProperties;
  customStyle?: React.CSSProperties;
  dropdown?: {
    component: React.ComponentType<any>;
    props: Record<string, unknown>;
  };
} 