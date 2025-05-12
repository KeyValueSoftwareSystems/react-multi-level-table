import React from 'react';

import type { HeaderGroup, TableHeaderProps as ReactTableHeaderProps } from 'react-table';

import type { ThemeProps } from '../types/theme';
import type { DataItem } from '../types/types';

import '../styles/TableHeader.css';

interface ColumnWithSorting extends HeaderGroup<DataItem> {
  getSortByToggleProps: () => ReactTableHeaderProps;
  isSorted?: boolean;
  isSortedDesc?: boolean;
  Filter?: React.ComponentType<{ column: ColumnWithSorting }>;
  title?: string;
  filterValue?: string;
  setFilter?: (value: string) => void;
}

/**
 * Props for the TableHeader component
 * @interface TableHeaderProps
 * @property {HeaderGroup<DataItem>[]} headerGroups - Array of header groups from react-table
 * @property {ThemeProps} theme - Theme properties
 */
interface TableHeaderProps {
  headerGroups: HeaderGroup<DataItem>[];
  theme: ThemeProps;
}

/**
 * Renders the table header with support for sorting and filtering
 * @component
 * @param {TableHeaderProps} props - Component props
 * @returns {JSX.Element} Rendered table header
 */
export const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups, theme }) => {
  return (
    <thead>
      {headerGroups.map(headerGroup => {
        const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();

        return (
          <tr key={key} {...headerGroupProps}>
            {(headerGroup.headers as unknown as ColumnWithSorting[]).map(column => {
              const { key, ...headerProps } = column.getHeaderProps(column.getSortByToggleProps());

              return (
                <th
                  key={key}
                  {...headerProps}
                  style={{
                    backgroundColor: theme.table?.header?.background,
                    color: theme.table?.header?.textColor,
                    borderColor: theme.table?.cell?.borderColor,
                  }}
                >
                  <div>
                    <span>
                      {column.title || column.id}
                      {column.isSorted && (
                        <span className="sort-icon">
                          {column.isSortedDesc ? '↓' : '↑'}
                        </span>
                      )}
                    </span>
                    {column.Filter && (
                      <div className="filter-container">
                        <input
                          className="filter-input"
                          value={column.filterValue || ''}
                          onChange={e => column.setFilter?.(e.target.value)}
                          placeholder={`Filter ${column.title || column.id}...`}
                          style={{
                            color: theme.table?.header?.textColor,
                            borderColor: theme.table?.header?.textColor,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
}; 
