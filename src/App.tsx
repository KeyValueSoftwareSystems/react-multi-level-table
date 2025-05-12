import React, { useState } from 'react';

import { MultiLevelTable } from './components/MultiLevelTable';
import { darkTheme, lightTheme } from './themes';
import type { ThemeProps } from './types/theme';
import type { Column, DataItem } from './types/types';

import './App.css';

const data: DataItem[] = [
  {
    id: 1,
    name: 'Parent 1',
    value: 100,
    status: 'Active',
    children: [
      {
        id: 101,
        name: 'Child 1.1',
        value: 50,
        status: 'Inactive',
        children: [
          {
            id: 1001,
            name: 'Grandchild 1.1.1',
            value: 25,
            status: 'Active',
          },
          {
            id: 1002,
            name: 'Grandchild 1.1.2',
            value: 25,
            status: 'Pending',
          },
        ],
      },
      {
        id: 102,
        name: 'Child 1.2',
        value: 50,
        status: 'Active',
      },
    ],
  },
  {
    id: 2,
    name: 'Parent 2',
    value: 200,
    status: 'Active',
    children: [
      {
        id: 201,
        name: 'Child 2.1',
        value: 100,
        status: 'Pending',
        children: [
          {
            id: 2001,
            name: 'Grandchild 2.1.1',
            value: 50,
            status: 'Active',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Parent 3',
    value: 150,
    status: 'Inactive',
    children: [
      {
        id: 301,
        name: 'Child 3.1',
        value: 75,
        status: 'Active',
      },
      {
        id: 302,
        name: 'Child 3.2',
        value: 75,
        status: 'Pending',
        children: [
          {
            id: 3001,
            name: 'Grandchild 3.2.1',
            value: 35,
            status: 'Active',
          },
          {
            id: 3002,
            name: 'Grandchild 3.2.2',
            value: 40,
            status: 'Inactive',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Parent 4',
    value: 300,
    status: 'Active',
  },
  {
    id: 5,
    name: 'Parent 5',
    value: 250,
    status: 'Pending',
    children: [
      {
        id: 501,
        name: 'Child 5.1',
        value: 125,
        status: 'Active',
      },
    ],
  },
  {
    id: 6,
    name: 'Parent 6',
    value: 180,
    status: 'Active',
    children: [
      {
        id: 601,
        name: 'Child 6.1',
        value: 90,
        status: 'Inactive',
        children: [
          {
            id: 6001,
            name: 'Grandchild 6.1.1',
            value: 45,
            status: 'Active',
          },
        ],
      },
      {
        id: 602,
        name: 'Child 6.2',
        value: 90,
        status: 'Pending',
      },
    ],
  },
  {
    id: 7,
    name: 'Parent 7',
    value: 220,
    status: 'Active',
  },
  {
    id: 8,
    name: 'Parent 8',
    value: 190,
    status: 'Inactive',
    children: [
      {
        id: 801,
        name: 'Child 8.1',
        value: 95,
        status: 'Active',
      },
      {
        id: 802,
        name: 'Child 8.2',
        value: 95,
        status: 'Pending',
        children: [
          {
            id: 8001,
            name: 'Grandchild 8.2.1',
            value: 45,
            status: 'Active',
          },
          {
            id: 8002,
            name: 'Grandchild 8.2.2',
            value: 50,
            status: 'Inactive',
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: 'Parent 9',
    value: 280,
    status: 'Active',
  },
  {
    id: 10,
    name: 'Parent 10',
    value: 210,
    status: 'Pending',
    children: [
      {
        id: 1001,
        name: 'Child 10.1',
        value: 105,
        status: 'Active',
      },
    ],
  },
  {
    id: 11,
    name: 'Parent 11',
    value: 170,
    status: 'Active',
    children: [
      {
        id: 1101,
        name: 'Child 11.1',
        value: 85,
        status: 'Inactive',
      },
      {
        id: 1102,
        name: 'Child 11.2',
        value: 85,
        status: 'Active',
        children: [
          {
            id: 11001,
            name: 'Grandchild 11.2.1',
            value: 40,
            status: 'Pending',
          },
        ],
      },
    ],
  },
  {
    id: 12,
    name: 'Parent 12',
    value: 240,
    status: 'Active',
  },
  {
    id: 13,
    name: 'Parent 13',
    value: 160,
    status: 'Inactive',
    children: [
      {
        id: 1301,
        name: 'Child 13.1',
        value: 80,
        status: 'Active',
      },
    ],
  },
  {
    id: 14,
    name: 'Parent 14',
    value: 290,
    status: 'Active',
    children: [
      {
        id: 1401,
        name: 'Child 14.1',
        value: 145,
        status: 'Pending',
        children: [
          {
            id: 14001,
            name: 'Grandchild 14.1.1',
            value: 70,
            status: 'Active',
          },
          {
            id: 14002,
            name: 'Grandchild 14.1.2',
            value: 75,
            status: 'Inactive',
          },
        ],
      },
    ],
  },
  {
    id: 15,
    name: 'Parent 15',
    value: 230,
    status: 'Active',
  },
  {
    id: 16,
    name: 'Parent 16',
    value: 270,
    status: 'Pending',
    children: [
      {
        id: 1601,
        name: 'Child 16.1',
        value: 135,
        status: 'Active',
      },
      {
        id: 1602,
        name: 'Child 16.2',
        value: 135,
        status: 'Inactive',
      },
    ],
  },
  {
    id: 17,
    name: 'Parent 17',
    value: 195,
    status: 'Active',
  },
  {
    id: 18,
    name: 'Parent 18',
    value: 260,
    status: 'Inactive',
    children: [
      {
        id: 1801,
        name: 'Child 18.1',
        value: 130,
        status: 'Active',
        children: [
          {
            id: 18001,
            name: 'Grandchild 18.1.1',
            value: 65,
            status: 'Pending',
          },
        ],
      },
    ],
  },
  {
    id: 19,
    name: 'Parent 19',
    value: 175,
    status: 'Active',
  },
  {
    id: 20,
    name: 'Parent 20',
    value: 245,
    status: 'Pending',
    children: [
      {
        id: 2001,
        name: 'Child 20.1',
        value: 120,
        status: 'Active',
      },
      {
        id: 2002,
        name: 'Child 20.2',
        value: 125,
        status: 'Inactive',
      },
    ],
  },
];

const StatusCell: React.FC<{ value: string; theme: ThemeProps }> = ({ value }) => {
 
  return (
    <span
      style={{
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: '#ffffff',
        color: value === 'Active' ? '#2ecc71' : value === 'Inactive' ? '#e74c3c' : '#f1c40f',
      }}
    >
      {value}
    </span>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
      filterable: true,
    },
    {
      key: 'value',
      title: 'Value',
      filterable: true,
      render: (value: string | number) => `$${value}`,
    },
    {
      key: 'status',
      title: 'Status',
      filterable: true,
      render: (value: string | number) => <StatusCell value={value as string} theme={theme} />,
    },
  ];

  return (
    <div className="app" style={{ backgroundColor: theme.colors?.background }}>
      <header className="app-header" style={{ backgroundColor: theme.table?.header?.background }}>
        <h1 style={{ color: theme.table?.header?.textColor }}>Multi-Level Table Demo</h1>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          style={{
            backgroundColor: theme.colors?.primaryColor,
            color: '#ffffff',
            borderColor: theme.colors?.borderColor,
          }}
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <main className="app-content">
        <div className="table-container" style={{ backgroundColor: theme.colors?.background }}>
          <MultiLevelTable
            data={data}
            columns={columns}
            theme={theme}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
