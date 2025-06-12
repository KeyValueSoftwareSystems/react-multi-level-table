import { useState } from 'react'
import { MultiLevelTable } from '../../src'
import type { DataItem } from '../../src/types/types'

// import { MultiLevelTable } from '@keyvaluesystems/multilevel-table'
// import type { DataItem } from '@keyvaluesystems/multilevel-table'

import './App.css'

// Sample data with multiple levels
const data: DataItem[] = [
  {
    id: 1,
    name: "Parent 1",
    value: 100,
    status: "Active",
    children: [
      {
        id: 101,
        name: "Child 1.1",
        value: 50,
        status: "Inactive",
        children: [
          {
            id: 1001,
            name: "Grandchild 1.1.1",
            value: 25,
            status: "Active",
          },
          {
            id: 1002,
            name: "Grandchild 1.1.2",
            value: 25,
            status: "Pending",
          },
        ],
      },
      {
        id: 102,
        name: "Child 1.2",
        value: 50,
        status: "Active",
      },
    ],
  },
  {
    id: 2,
    name: "Parent 2",
    value: 200,
    status: "Active",
    children: [
      {
        id: 201,
        name: "Child 2.1",
        value: 100,
        status: "Pending",
        children: [
          {
            id: 2001,
            name: "Grandchild 2.1.1",
            value: 50,
            status: "Active",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Parent 3",
    value: 150,
    status: "Inactive",
    children: [
      {
        id: 301,
        name: "Child 3.1",
        value: 75,
        status: "Active",
      },
      {
        id: 302,
        name: "Child 3.2",
        value: 75,
        status: "Pending",
        children: [
          {
            id: 3001,
            name: "Grandchild 3.2.1",
            value: 35,
            status: "Active",
          },
          {
            id: 3002,
            name: "Grandchild 3.2.2",
            value: 40,
            status: "Inactive",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Parent 4",
    value: 300,
    status: "Active",
  },
  {
    id: 5,
    name: "Parent 5",
    value: 250,
    status: "Pending",
    children: [
      {
        id: 501,
        name: "Child 5.1",
        value: 125,
        status: "Active",
      },
    ],
  },
  {
    id: 6,
    name: "Parent 6",
    value: 180,
    status: "Active",
    children: [
      {
        id: 601,
        name: "Child 6.1",
        value: 90,
        status: "Inactive",
        children: [
          {
            id: 6001,
            name: "Grandchild 6.1.1",
            value: 45,
            status: "Active",
          },
        ],
      },
      {
        id: 602,
        name: "Child 6.2",
        value: 90,
        status: "Pending",
      },
    ],
  },
  {
    id: 7,
    name: "Parent 7",
    value: 220,
    status: "Active",
  },
  {
    id: 8,
    name: "Parent 8",
    value: 190,
    status: "Inactive",
    children: [
      {
        id: 801,
        name: "Child 8.1",
        value: 95,
        status: "Active",
      },
      {
        id: 802,
        name: "Child 8.2",
        value: 95,
        status: "Pending",
        children: [
          {
            id: 8001,
            name: "Grandchild 8.2.1",
            value: 45,
            status: "Active",
          },
          {
            id: 8002,
            name: "Grandchild 8.2.2",
            value: 50,
            status: "Inactive",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Parent 9",
    value: 280,
    status: "Active",
  },
  {
    id: 10,
    name: "Parent 10",
    value: 210,
    status: "Pending",
    children: [
      {
        id: 1001,
        name: "Child 10.1",
        value: 105,
        status: "Active",
      },
    ],
  },
  {
    id: 11,
    name: "Parent 11",
    value: 170,
    status: "Active",
    children: [
      {
        id: 1101,
        name: "Child 11.1",
        value: 85,
        status: "Inactive",
      },
      {
        id: 1102,
        name: "Child 11.2",
        value: 85,
        status: "Active",
        children: [
          {
            id: 11001,
            name: "Grandchild 11.2.1",
            value: 40,
            status: "Pending",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Parent 12",
    value: 240,
    status: "Active",
  },
  {
    id: 13,
    name: "Parent 13",
    value: 160,
    status: "Inactive",
    children: [
      {
        id: 1301,
        name: "Child 13.1",
        value: 80,
        status: "Active",
      },
      {
        id: 1302,
        name: "Child 13.2",
        value: 80,
        status: "Pending",
        children: [
          {
            id: 13001,
            name: "Grandchild 13.2.1",
            value: 40,
            status: "Active",
          },
          {
            id: 13002,
            name: "Grandchild 13.2.2",
            value: 40,
            status: "Inactive",
          },
        ],
      },
    ],
  },
  {
    id: 14,
    name: "Parent 14",
    value: 290,
    status: "Active",
  },
  {
    id: 15,
    name: "Parent 15",
    value: 230,
    status: "Pending",
    children: [
      {
        id: 1501,
        name: "Child 15.1",
        value: 115,
        status: "Active",
      },
    ],
  }
];

// Column configuration
const columns = [
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
    render: (value: string | number) => (
      <span style={{ 
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: value === 'Active' ? '#e6ffe6' : 
                        value === 'Pending' ? '#fff3e6' : '#e6f3ff',
        color: value === 'Active' ? '#006600' :
               value === 'Pending' ? '#cc7700' : '#0066cc'
      }}>
        {value}
      </span>
    ),
  },
];

// Custom theme
const theme = {
  colors: {
    background: '#ffffff',
    primaryColor: '#1976d2',
    textColor: '#333333',
    borderColor: '#e0e0e0'
  },
  table: {
    header: {
      background: '#f5f5f5',
      textColor: '#333333',
      borderColor: '#e0e0e0'
    },
    cell: {
      textColor: '#333333',
      borderColor: '#e0e0e0',
      nestedPadding: '24px'
    },
    row: {
      levelColors: [
        { background: '#ffffff' },
        { background: '#f8f8f8' },
        { background: '#f5f5f5' }
      ]
    },
    filter: {
      background: '#ffffff',
      textColor: '#333333',
      borderColor: '#e0e0e0',
      focusBorderColor: '#1976d2',
      placeholderColor: '#757575'
    }
  },
  pagination: {
    button: {
      background: '#1976d2',
      textColor: '#ffffff',
      disabledOpacity: '0.5'
    },
    select: {
      background: '#ffffff',
      textColor: '#333333',
      borderColor: '#e0e0e0'
    },
    info: {
      textColor: '#333333'
    }
  },
  expandIcon: {
    color: '#757575'
  }
};

function App() {
  const [, setSelectedRows] = useState<Set<string | number>>(new Set());

  const handleSelectionChange = (selectedRows: Set<string | number>) => {
    setSelectedRows(selectedRows);
  };

  // Define filter options for the status column
  const statusFilterOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Pending', value: 'Pending' },
  ];

  return (
    <div className="app">
      <h1>Multi-Level Table Example</h1>
      <div className="table-container">
        <MultiLevelTable
          data={data}
          columns={columns}
          searchableColumns={['name', 'value']}
          theme={theme}
          selectable={true}
          onSelectionChange={handleSelectionChange}
          pageSize={5}
          sortable={true}
          filterColumn="status"
          filterOptions={statusFilterOptions}
        />
      </div>
    </div>
  )
}

export default App
