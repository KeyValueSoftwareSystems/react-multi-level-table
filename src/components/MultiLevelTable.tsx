import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  type Row,
  type Column as TableColumn,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { ButtonGroup } from './ButtonGroup';
import { DeleteIcon, ExportIcon, FilterIcon, SearchIcon } from "./icons";
import { Pagination } from "./Pagination";
import type { PaginationProps } from "./Pagination";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { ExportDropdown } from '../../example/src/components/ExportDropdown';
import { FilterDropdown } from '../../example/src/components/FilterDropdown';
import { Popup } from '../../example/src/components/Popup';
import { SortType } from "../constants/sort";
import { defaultTheme } from "../constants/theme";
import { mergeThemeProps } from "../mergeThemeProps";
import { colors, componentStyles } from "../styles/style";
import type { ThemeProps } from "../types/theme";
import type {
  ButtonConfig,
  Column,
  DataItem,
  FilterOption,
  SelectionState,
  TableInstanceWithHooks,
  TableStateWithPagination
} from "../types/types";
import "../styles/MultiLevelTable.css";

// Delete Popup Icon Component
const DeletePopupIcon: React.ComponentType<{ width?: number; height?: number }> = () => (
  <div style={{ 
    filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)'
  }}>
    <DeleteIcon width={48} height={48} />
  </div>
);

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
 * @property {string} [filterColumn] - The column to filter by
 * @property {FilterOption[]} [filterOptions] - Array of filter options
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
  
  // State props
  selectionState?: SelectionState;
  searchTerm?: string;
  selectedFilterValues?: Set<string | number>;
  deletePopup?: {
    isOpen: boolean;
    itemId: string | number | null;
    itemName: string;
  };
  bulkDeletePopup?: {
    isOpen: boolean;
    selectedCount: number;
  };
  openDropdowns?: Set<string>;
  expandedRows?: Set<string | number>;
  
  // Handler props
  onSearchChange?: (searchTerm: string) => void;
  onFilterChange?: (values: Set<string | number>) => void;
  onDeleteClick?: (itemId: string | number, itemName: string) => void;
  onDeleteConfirm?: () => void;
  onDeleteCancel?: () => void;
  onBulkDeleteClick?: () => void;
  onBulkDeleteConfirm?: () => void;
  onBulkDeleteCancel?: () => void;
  onDropdownToggle?: (buttonId: string, isOpen: boolean) => void;
  onDropdownClose?: (buttonId: string) => void;
  onButtonClick?: (button: ButtonConfig) => void;
  onSelectAll?: () => void;
  onRowSelect?: (rowId: string | number) => void;
  onRowToggle?: (rowId: string | number) => void;
  
  // Other props
  onRowClick?: (row: DataItem) => void;
  searchableColumns?: string[];
  showSearchBar?: boolean;
  filterColumn?: string;
  tableTitle?: string;
  tableSubtitle?: string;
  showDarkMode?: boolean;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
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
  
  // State props
  selectionState = { selectedRows: new Set(), isAllSelected: false },
  searchTerm = '',
  selectedFilterValues = new Set(),
  deletePopup = { isOpen: false, itemId: null, itemName: '' },
  bulkDeletePopup = { isOpen: false, selectedCount: 0 },
  openDropdowns = new Set(),
  expandedRows = new Set(),
  
  // Handler props
  onSearchChange,
  onFilterChange,
  onDeleteClick,
  onDeleteConfirm,
  onDeleteCancel,
  onBulkDeleteClick,
  onBulkDeleteConfirm,
  onBulkDeleteCancel,
  onDropdownToggle,
  onDropdownClose,
  onButtonClick,
  onSelectAll,
  onRowSelect,
  onRowToggle,
  
  // Other props
  onRowClick,
  searchableColumns,
  showSearchBar = true,
  filterColumn,
  tableTitle,
  tableSubtitle,
  showDarkMode = false,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const mergedTheme = mergeThemeProps(defaultTheme, theme);

  // Internal state for filter dropdown
  const [tempSelectedValues, setTempSelectedValues] = useState<Set<string | number>>(selectedFilterValues);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryFilterOptions, setCategoryFilterOptions] = useState<FilterOption[]>([]);

  // Update temp values when selectedFilterValues prop changes
  useEffect(() => {
    setTempSelectedValues(selectedFilterValues);
  }, [selectedFilterValues]);

  // Internal export CSV function
  const handleExportCSVInternal = () => {
    // Default CSV export logic
    const headers = columns
      .filter(col => col.key !== 'actions')
      .map(col => typeof col.title === 'string' ? col.title : col.key);
      
    const csvContent = [
      headers.join(','),
      ...data.map(item => 
        columns
          .filter(col => col.key !== 'actions')
          .map(col => {
            const value = item[col.key as keyof DataItem];

            return value ? `"${value}"` : '';
          })
          .join(',')
      )
    ].join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'table_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Internal filter handlers
  const handleFilterCategoryChangeInternal = useCallback((categoryKey: string) => {
    // Default category change logic
    setSelectedCategory(categoryKey);
    
    // Generate filter options for the selected category
    const column = columns.find(col => col.key === categoryKey);
    
    if (column) {
      const uniqueValues = new Set<string | number>();
      
      const extractValues = (items: DataItem[]) => {
        items.forEach(item => {
          const value = item[column.key as keyof DataItem];
          
          if (value !== undefined && value !== null && (typeof value === 'string' || typeof value === 'number')) 
            uniqueValues.add(value);
          
          if (item.children) 
            extractValues(item.children);
        });
      };
      
      extractValues(data);
      
      const options: FilterOption[] = Array.from(uniqueValues).map(value => ({
        label: value.toString(),
        value: value
      }));
      
      setCategoryFilterOptions(options);
      setTempSelectedValues(new Set()); // Reset selected values when changing category
    }
  }, [columns, data]);

  const handleFilterSelectAllInternal = () => {
    // Default select all logic
    if (tempSelectedValues.size === categoryFilterOptions.length) 
      setTempSelectedValues(new Set());
    else 
      setTempSelectedValues(new Set(categoryFilterOptions.map(option => option.value)));
    
  };

  const handleFilterOptionChangeInternal = (value: string | number) => {
    // Default option change logic
    const newValues = new Set(tempSelectedValues);
    
    if (newValues.has(value)) 
      newValues.delete(value);
    else 
      newValues.add(value);
    
    setTempSelectedValues(newValues);
  };

  // Initialize filter state on mount
  useEffect(() => {
    if (filterColumn && columns.length > 0) {
      const filterCategories = columns.filter(col => 
        col.key !== 'name' && 
        col.key !== 'dateTime' && 
        col.filterable !== false
      );
      
      const defaultCategory = filterCategories.find(col => col.key === 'status')?.key || 
                             (filterCategories.length > 0 ? filterCategories[0].key : null);
      
      if (defaultCategory) {
        setSelectedCategory(defaultCategory);
        
        // Generate filter options for the default category
        const column = columns.find(col => col.key === defaultCategory);
        
        if (column) {
          const uniqueValues = new Set<string | number>();
          
          const extractValues = (items: DataItem[]) => {
            items.forEach(item => {
              const value = item[column.key as keyof DataItem];
              
              if (value !== undefined && value !== null && (typeof value === 'string' || typeof value === 'number')) 
                uniqueValues.add(value);
              
              if (item.children) 
                extractValues(item.children);
            });
          };
          
          extractValues(data);
          
          const options: FilterOption[] = Array.from(uniqueValues).map(value => ({
            label: value.toString(),
            value: value
          }));
          
          setCategoryFilterOptions(options);
        }
      }
    }
  }, [columns, filterColumn, data]);

  // Use provided searchableColumns or all columns
  const searchCols = useMemo(() => {
    if (searchableColumns && searchableColumns.length > 0) 
      return searchableColumns;

    return columns.map(col => col.key);
  }, [searchableColumns, columns]);

  // Filtered data based on search and filter
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();

      filtered = filtered.filter(row =>
        searchCols.some(colKey => {
          const value = row[colKey as keyof DataItem];

          return value && value.toString().toLowerCase().includes(lowerSearch);
        })
      );
    }

    // Apply column filter
    if (filterColumn && selectedFilterValues.size > 0) 
      filtered = filtered.filter(row => {
        const value = row[filterColumn as keyof DataItem];

        return typeof value === 'string' || typeof value === 'number' 
          ? selectedFilterValues.has(value)
          : false;
      });

    return filtered;
  }, [data, searchTerm, searchCols, filterColumn, selectedFilterValues]);

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
    state: { pageIndex, pageSize: currentPageSize },
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

  const renderNestedRows = (parentId: string | number, level = 1) => {
    const children = rowsMap.get(parentId);

    if (!children || !expandedRows.has(parentId)) return null;

    return children.map((child) => (
      <React.Fragment key={child.id}>
        <TableRow
          row={child}
          columns={columns}
          hasChildren={!!child.children && child.children.length > 0}
          isExpanded={expandedRows.has(child.id)}
          onToggle={() => onRowToggle?.(child.id)}
          level={level}
          theme={mergedTheme}
          selectable={selectable}
          isRowSelected={selectionState.selectedRows.has(child.id)}
          onRowSelect={() => onRowSelect?.(child.id)}
          onRowClick={onRowClick}
          onDelete={handleDeleteClick}
          expandIcon={expandIcon}
        />
        {/* Recursively render nested children */}
        {child.children && child.children.length > 0 && renderNestedRows(child.id, level + 1)}
      </React.Fragment>
    ));
  };

  const renderPagination = () => {
    if (renderCustomPagination) 
      return renderCustomPagination({
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        pageIndex,
        pageSize: currentPageSize,
        totalItems: filteredData.length,
        theme: mergedTheme,
      });

    return (
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={currentPageSize}
        totalItems={filteredData.length}
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
            <React.Fragment key={row.id}>
              <TableRow
                row={row}
                columns={columns}
                hasChildren={hasChildren}
                isExpanded={expandedRows.has(parentId)}
                onToggle={() => hasChildren && onRowToggle?.(parentId)}
                level={0}
                theme={mergedTheme}
                selectable={selectable}
                isRowSelected={selectionState.selectedRows.has(parentId)}
                onRowSelect={() => onRowSelect?.(parentId)}
                onRowClick={onRowClick}
                onDelete={handleDeleteClick}
                expandIcon={expandIcon}
                isParentRow={true}
              />
              {renderNestedRows(parentId)}
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  const handleFilterChange = (values: Set<string | number>) => {
    onFilterChange?.(values);
  };

  const handleDeleteClick = (itemId: string | number, itemName: string) => {
    onDeleteClick?.(itemId, itemName);
  };

  const handleDeleteConfirm = () => {
    onDeleteConfirm?.();
  };

  const handleDeleteCancel = () => {
    onDeleteCancel?.();
  };

  const handleBulkDeleteClick = () => {
    onBulkDeleteClick?.();
  };

  const handleBulkDeleteConfirm = () => {
    onBulkDeleteConfirm?.();
  };

  const handleBulkDeleteCancel = () => {
    onBulkDeleteCancel?.();
  };

  const renderActionButtons = () => {
    const buttons = [];

    // Bulk delete button
    if (selectionState.selectedRows.size > 0) {
      const BulkDeleteIcon: React.ComponentType<{ width?: number; height?: number }> = () => (
        <div style={{ 
          filter: 'brightness(0) saturate(100%) invert(99%) sepia(0%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)'
        }}>
          <DeleteIcon width={16} height={16} />
        </div>
      );
      
      buttons.push({
        id: 'bulk-delete',
        icon: BulkDeleteIcon,
        text: `Delete (${selectionState.selectedRows.size})`,
        onClick: handleBulkDeleteClick,
        iconPosition: 'left' as const,
        customStyle: {
          backgroundColor: '#dc3545',
          color: '#ffffff',
          border: '1px solid #dc3545',
        },
      });
    }

    // Export button
    buttons.push({
      id: 'export',
      icon: ExportIcon,
      text: 'Export',
      dropdown: {
        component: ExportDropdown,
        props: {
          handleExportCSV: handleExportCSVInternal,
        },
      },
    });

    // Filter button
    if (filterColumn && columns.length > 0) {
      // Filter out name column and only include desired categories
      const filterCategories = columns.filter(col => 
        col.key !== 'name' && 
        col.key !== 'dateTime' && 
        col.filterable !== false
      );
      
      // Generate filter options for all categories
      const allCategoryOptions: Record<string, FilterOption[]> = {};

      filterCategories.forEach(column => {
        const uniqueValues = new Set<string | number>();
        
        // Recursive function to extract all values from nested data
        const extractValues = (items: DataItem[]) => {
          items.forEach(item => {
            const value = item[column.key as keyof DataItem];
            
            if (value !== undefined && value !== null && (typeof value === 'string' || typeof value === 'number')) 
              uniqueValues.add(value);
            
            if (item.children) 
              extractValues(item.children);
          });
        };
        
        extractValues(data);
        
        const filterOptions: FilterOption[] = Array.from(uniqueValues).map(value => ({
          label: value.toString(),
          value: value
        }));
        
        allCategoryOptions[column.key] = filterOptions;
      });
      
      // Process categories for display
      const processedCategories = filterCategories.map(column => ({
        key: column.key,
        title: typeof column.title === 'string' ? column.title : (column.title?.toString() || column.key),
        count: allCategoryOptions[column.key]?.length || 0,
      }));

      buttons.push({
        id: 'filter',
        icon: FilterIcon,
        text: 'Filter',
        iconPosition: 'right' as const,
        badge: selectedFilterValues.size > 0 ? {
          count: selectedFilterValues.size,
        } : undefined,
        dropdown: {
          component: FilterDropdown,
          props: {
            tempSelectedValues: tempSelectedValues,
            selectedCategory: selectedCategory,
            categories: processedCategories,
            categoryFilterOptions: categoryFilterOptions,
            onClose: () => onDropdownClose?.('filter'),
            onApply: (values: Set<string | number>) => {
              handleFilterChange(values);
            },
            onCancel: () => {
              onDropdownClose?.('filter');
            },
            onReset: () => {
              onFilterChange?.(new Set());
            },
            onCategoryChange: handleFilterCategoryChangeInternal,
            onSelectAll: handleFilterSelectAllInternal,
            onOptionChange: handleFilterOptionChangeInternal,
          },
        },
      });
    }

    // Dark mode toggle button
    if (showDarkMode && onToggleTheme) {
      const ThemeIcon: React.ComponentType<{ width?: number; height?: number }> = () => (
        <span>{isDarkMode ? "☀️" : "🌙"}</span>
      );
      
      buttons.push({
        id: 'theme',
        icon: ThemeIcon,
        text: isDarkMode ? "Light" : "Dark",
        onClick: onToggleTheme,
        iconPosition: 'right' as const,
      });
    }

    return buttons.length > 0 ? (
      <ButtonGroup 
        buttons={buttons} 
        theme={mergedTheme}
        openDropdowns={openDropdowns}
        onDropdownToggle={onDropdownToggle}
        onDropdownClose={onDropdownClose}
        onButtonClick={onButtonClick}
      />
    ) : null;
  };

  return (
    <div style={{ backgroundColor: mergedTheme.colors?.background }}>
      <div className="table-wrapper">
        {showSearchBar && (
          <div className="search-bar-container">
            {tableTitle && (
              <div className="table-title-container">
                <h2 style={componentStyles.title.table}>
                  {tableTitle}
                </h2>
                {tableSubtitle && (
                  <p 
                    className="table-subtitle"
                    style={{
                      color: mergedTheme.colors?.textColor || colors.textSecondary,
                    }}
                  >
                    {tableSubtitle}
                  </p>
                )}
              </div>
            )}
            <div className="search-input-container">
              <span className="search-input-icon">
                <SearchIcon width={24} height={24} />
              </span>
              <input
                className="search-input"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => onSearchChange?.(e.target.value)}
                style={{
                  borderColor: mergedTheme.table?.cell?.borderColor || colors.searchBorder,
                  backgroundColor: mergedTheme.colors?.background || colors.backgroundWhite,
                  color: mergedTheme.colors?.textColor || colors.textPrimary,
                }}
              />
            </div>
            <div className="action-buttons-container">
              {renderActionButtons()}
            </div>
          </div>
        )}
        <div className="table-responsive-container">
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
              onSelectAll={onSelectAll}
            />
            {renderTableBody()}
          </table>
        </div>

        {renderPagination()}
      </div>
      
      {/* Delete Confirmation Popup */}
      <Popup
        isOpen={deletePopup.isOpen}
        onClose={handleDeleteCancel}
        icon={DeletePopupIcon}
        text={`Are you sure you want to delete "${deletePopup.itemName}"?`}
        buttons={[
          {
            text: 'Cancel',
            onClick: handleDeleteCancel,
            variant: 'secondary',
          },
          {
            text: 'Delete',
            onClick: handleDeleteConfirm,
            variant: 'primary',
          },
        ]}
        theme={mergedTheme}
      />

      {/* Bulk Delete Confirmation Popup */}
      <Popup
        isOpen={bulkDeletePopup.isOpen}
        onClose={handleBulkDeleteCancel}
        icon={DeletePopupIcon}
        title="Bulk Delete Confirmation"
        text={`Are you sure you want to delete ${bulkDeletePopup.selectedCount} selected item${bulkDeletePopup.selectedCount !== 1 ? 's' : ''}? This action cannot be undone.`}
        buttons={[
          {
            text: 'Cancel',
            onClick: handleBulkDeleteCancel,
            variant: 'secondary',
          },
          {
            text: 'Delete All',
            onClick: handleBulkDeleteConfirm,
            variant: 'primary',
          },
        ]}
        theme={mergedTheme}
      />
    </div>
  );
};
