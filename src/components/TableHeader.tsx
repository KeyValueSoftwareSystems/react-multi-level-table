import React from 'react';

import type { HeaderGroup } from 'react-table';

import type { DataItem } from '../types/types';
import '../styles/TableHeader.css';

/**
 * Props for the TableHeader component
 * @interface TableHeaderProps
 * @property {HeaderGroup<DataItem>[]} headerGroups - Array of header groups from react-table
 * @property {boolean} [sortable=false] - Whether the table is sortable
 * @property {React.ReactNode} [ascendingIcon] - Custom icon for ascending sort
 * @property {React.ReactNode} [descendingIcon] - Custom icon for descending sort
 */
interface TableHeaderProps {
  headerGroups: HeaderGroup<DataItem>[];
  sortable?: boolean;
  ascendingIcon?: React.ReactNode;
  descendingIcon?: React.ReactNode;
}

type ColumnWithSorting = {
  getHeaderProps: (props?: { style?: React.CSSProperties }) => { style?: React.CSSProperties; onClick?: () => void; key?: string };
  getSortByToggleProps: () => { style?: React.CSSProperties; onClick?: () => void };
  render: (type: string) => React.ReactNode;
  isSorted?: boolean;
  isSortedDesc?: boolean;
  Filter?: React.ComponentType<{ column: ColumnWithSorting }>;
  id: string;
  disableSortBy?: boolean;
}

/**
 * Renders the table header with sorting and filtering capabilities
 * @component
 * @param {TableHeaderProps} props - Component props
 * @returns {JSX.Element} Rendered table header
 */
export const TableHeader: React.FC<TableHeaderProps> = ({ 
  headerGroups, 
  sortable = false,
  ascendingIcon,
  descendingIcon 
}) => (
  <thead className="table-header">
    {headerGroups.map(headerGroup => {
      const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();

      return (
        <tr key={headerGroupKey} {...headerGroupProps}>
          {(headerGroup.headers as unknown as ColumnWithSorting[]).map((column) => {
            const isColumnSortable = sortable && !column.disableSortBy;
            const { key: columnKey, ...columnProps } = isColumnSortable 
              ? column.getHeaderProps(column.getSortByToggleProps())
              : column.getHeaderProps();
              
            return (
              <th
                key={columnKey}
                {...columnProps}
                className={isColumnSortable ? 'sortable' : ''}
              >
                <div className='table-header-cell'>
                  {column.render('Header')}
                  {isColumnSortable && (
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? descendingIcon || ' 🔽 '
                          : ascendingIcon || ' 🔼 '
                        : ' '}
                    </span>
                  )}
                  {column.Filter ? column.render('Filter') : null}
                </div>
              </th>
            );
          })}
        </tr>
      );
    })}
  </thead>
); 