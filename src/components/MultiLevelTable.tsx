import React from 'react';

export interface Column {
  key: string;
  title: string;
  render?: (value: any, record: any) => React.ReactNode;
}

export interface DataItem {
  id?: string | number;
  [key: string]: any;
}

export interface MultiLevelTableProps {
  data: DataItem[];
  columns: Column[];
  childrenKey?: string;
}

export const MultiLevelTable: React.FC<MultiLevelTableProps> = ({
  data,
  columns,
  childrenKey = 'children',
}) => {
  const renderRow = (item: DataItem, level: number = 0) => {
    return (
      <React.Fragment key={item.id || Math.random()}>
        <tr style={{ marginLeft: `${level * 20}px` }}>
          {columns.map((column: Column) => (
            <td key={column.key}>
              {column.render
                ? column.render(item[column.key], item)
                : item[column.key]}
            </td>
          ))}
        </tr>
        {item[childrenKey]?.map((child: DataItem) => renderRow(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column: Column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item: DataItem) => renderRow(item))}</tbody>
    </table>
  );
}; 