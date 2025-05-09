import React from 'react';
import { HeaderGroup } from 'react-table';
import { DataItem } from '../types';
import './styles.css';

/**
 * Props for the TableHeader component
 * @interface TableHeaderProps
 * @property {HeaderGroup<DataItem>[]} headerGroups - Array of header groups from react-table
 */
interface TableHeaderProps {
  headerGroups: HeaderGroup<DataItem>[];
}

/**
 * Renders the table header with sorting and filtering capabilities
 * @component
 * @param {TableHeaderProps} props - Component props
 * @returns {JSX.Element} Rendered table header
 */
export const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => (
  <thead className="table-header">
    {headerGroups.map(headerGroup => {
      const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
      return (
        <tr key={headerGroupKey} {...headerGroupProps}>
          {headerGroup.headers.map((column: any) => {
            const { key: columnKey, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps());
            return (
              <th
                key={columnKey}
                {...columnProps}
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
            );
          })}
        </tr>
      );
    })}
  </thead>
); 