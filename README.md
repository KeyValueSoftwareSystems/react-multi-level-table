# React Multi Level Table

## Table of Contents

- [Overview](#overview)
- [Installation](#1-installation)
  - [Prerequisites](#prerequisites)
- [Configuration](#2-configuration)
  - [Basic Usage](#21-basic-usage)
  - [Component Props](#22-component-props)
- [Customization](#3-customization)
  - [Column Configuration](#31-column-configuration)
  - [Features](#32-features)
  - [Pagination](#33-pagination)
  - [Selection](#34-selection)
  - [Theme Customization](#35-theme-customization)
- [Development](#4-development)
  - [Project Structure](#41-project-structure)
  - [Development Commands](#42-development-commands)
  - [Development Features](#43-development-features)
- [Example](#5-example)
- [License](#license)

## Overview

The `@keyvaluesystems/material-table-component` is a flexible and customizable multi-level table component for React applications. It provides comprehensive support for displaying hierarchical data with features like sorting, filtering, and pagination. This documentation provides detailed information on how to install, configure, and use the component effectively.

## 1. Installation

You can install the component from npm:

```bash
npm install @keyvaluesystems/material-table-component
```

or from yarn:

```bash
yarn add @keyvaluesystems/material-table-component
```

#### Prerequisites

- React v16.8+
- TypeScript (recommended)

## 2. Configuration

### 2.1 Basic Usage

Here's a basic example of how to use the MultiLevelTable component:

```tsx
import { MultiLevelTable } from '@keyvaluesystems/material-table-component';

const data = [
  {
    id: 1,
    name: 'Parent 1',
    value: 100,
    status: 'active',
    children: [
      {
        id: 2,
        name: 'Child 1',
        value: 50,
        status: 'pending',
      },
      {
        id: 3,
        name: 'Child 2',
        value: 50,
        status: 'completed',
      },
    ],
  },
];

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
    render: (value) => `$${value}`,
  },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    render: (value) => (
      <span style={{ 
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: value === 'active' ? '#e6ffe6' : 
                        value === 'pending' ? '#fff3e6' : '#e6f3ff',
        color: value === 'active' ? '#006600' :
               value === 'pending' ? '#cc7700' : '#0066cc'
      }}>
        {value}
      </span>
    ),
  },
];

function App() {
  return (
    <MultiLevelTable 
      data={data} 
      columns={columns}
      pageSize={10}
    />
  );
}
```

### 2.2 Component Props

The MultiLevelTable component accepts the following props:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| data | array | Yes | - | Array of data objects to display in the table |
| columns | array | Yes | - | Array of column configurations |
| childrenKey | string | No | 'children' | Key to use for nested data |
| pageSize | number | No | 10 | Number of rows to display per page |
| theme | object | No | - | Custom theme object for styling the table |
| renderCustomPagination | function | No | null | Custom pagination component render function |
| sortable | boolean | No | false | Enable/disable sorting functionality |
| ascendingIcon | ReactNode | No | - | Custom icon for ascending sort |
| descendingIcon | ReactNode | No | - | Custom icon for descending sort |
| expandIcon | ReactNode | No | - | Custom icon for expanding rows |
| selectable | boolean | No | false | Enable/disable row selection |
| onSelectionChange | function | No | - | Callback function when selection changes |

## 3. Customization

### 3.1 Column Configuration

Each column object should have the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| key | string | Yes | Key to access the data in each row |
| title | string | Yes | Column header text |
| render | function | No | Custom render function for the column. Receives (value: string \| number, item: DataItem) as parameters |
| filterable | boolean | No | Whether the column can be filtered |
| sortable | boolean | No | Whether the column can be sorted |
| customSortFn | function | No | Custom sorting function. Receives (rowA: DataItem, rowB: DataItem, columnId: string) as parameters |

### 3.2 Features

- **Multi-level Data Structure**: Display hierarchical data with parent-child relationships
- **Sorting**: Click column headers to sort data (applies to parent rows only)
- **Filtering**: Real-time filtering for specified columns (applies to parent rows only)
- **Pagination**: Navigate through pages with configurable page sizes
- **Custom Rendering**: Customize cell content with render functions
- **TypeScript Support**: Full TypeScript support with proper type definitions

### 3.3 Pagination

The table component provides comprehensive pagination functionality. You can either use the default pagination or create a custom one using the pagination props:

```tsx
interface PaginationProps {
  page: Row<T>[];                    // Current page data
  canPreviousPage: boolean;          // Whether previous page is available
  canNextPage: boolean;              // Whether next page is available
  pageOptions: number[];             // Available page numbers
  pageCount: number;                 // Total number of pages
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;  // Go to specific page
  nextPage: () => void;              // Go to next page
  previousPage: () => void;          // Go to previous page
  setPageSize: (pageSize: number) => void;  // Change page size
  state: TableStateWithPagination<T>;  // Current table state
}
```

Example of custom pagination:

```tsx
const CustomPagination = ({ 
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize }
}) => {
  return (
    <div className="pagination">
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        Previous
      </button>
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        Next
      </button>
      <select
        value={pageSize}
        onChange={e => setPageSize(Number(e.target.value))}
      >
        {[10, 20, 30, 40, 50].map(size => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
    </div>
  );
};

// Usage in MultiLevelTable
<MultiLevelTable
  data={data}
  columns={columns}
  renderCustomPagination={CustomPagination}
/>
```

### 3.4 Selection

The table component supports row selection functionality. When enabled, it provides a selection state with the following properties:

```tsx
interface SelectionState {
  selectedRows: Set<string | number>;  // Set of selected row IDs
  isAllSelected: boolean;              // Whether all rows are selected
}
```

Example of using selection:

```tsx
function App() {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSelectionChange = (selectionState: SelectionState) => {
    setSelectedRows(selectionState.selectedRows);
    setIsAllSelected(selectionState.isAllSelected);
  };

  return (
    <MultiLevelTable
      data={data}
      columns={columns}
      selectable={true}
      onSelectionChange={handleSelectionChange}
    />
  );
}
```

The selection functionality provides:
- Individual row selection
- Select all functionality
- Selection state management
- Custom selection change handling

### 3.5 Theme Customization

The table component supports theme customization through the `theme` prop. Here's the complete theme interface:

```tsx
interface ThemeProps {
  colors?: {
    background?: string;
    primaryColor?: string;
    textColor?: string;
    borderColor?: string;
  };
  table?: {
    header?: {
      background?: string;
      textColor?: string;
      borderColor?: string;
    };
    cell?: {
      textColor?: string;
      borderColor?: string;
      nestedPadding?: string;
    };
    row?: {
      levelColors?: {background: string}[];
    };
    filter?: {
      background?: string;
      textColor?: string;
      borderColor?: string;
      focusBorderColor?: string;
      placeholderColor?: string;
    };
  };
  pagination?: {
    button?: {
      background?: string;
      textColor?: string;
      disabledOpacity?: string;
    };
    select?: {
      background?: string;
      textColor?: string;
      borderColor?: string;
    };
    info?: {
      textColor?: string;
    };
  };
  expandIcon?: {
    color?: string;
  };
}
```

Example usage:

```tsx
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

// Usage in MultiLevelTable
<MultiLevelTable
  data={data}
  columns={columns}
  theme={theme}
/>
```

The theme customization allows you to:
- Customize global colors for the table
- Style table components (header, cells, rows)
- Configure nested level appearances
- Customize filter and pagination components
- Style the expand icon

## 4. Development

### 4.1 Project Structure
- `src/App.tsx` - A demo component that showcases the MultiLevelTable with sample data
- `src/main.tsx` - The entry point for the development environment
- `src/index.css` - Basic styling for the table component

### 4.2 Development Commands
```bash
# Start the development server
npm run dev

# Build the package
npm run build

# Run linting
npm run lint
```

### 4.3 Development Features
- Hot Module Replacement (HMR) for instant feedback
- TypeScript support with type checking
- ESLint configuration for code quality
- Sample data and configurations for testing
- Basic styling for quick visualization

## 5. Example

Here's a complete example showing how to use the component with custom styling and rendering:

```tsx
import React from 'react';
import { MultiLevelTable } from '@keyvaluesystems/material-table-component';

function App() {
  const data = [
    {
      id: 1,
      name: 'Parent 1',
      value: 100,
      status: 'active',
      children: [
        {
          id: 2,
          name: 'Child 1',
          value: 50,
          status: 'pending',
        },
        {
          id: 3,
          name: 'Child 2',
          value: 50,
          status: 'completed',
        },
      ],
    },
  ];

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
      render: (value) => `$${value}`,
    },
    {
      key: 'status',
      title: 'Status',
      filterable: true,
      render: (value) => (
        <span style={{ 
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: value === 'active' ? '#e6ffe6' : 
                          value === 'pending' ? '#fff3e6' : '#e6f3ff',
          color: value === 'active' ? '#006600' :
                 value === 'pending' ? '#cc7700' : '#0066cc'
        }}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <div>
      <MultiLevelTable 
        data={data} 
        columns={columns}
        pageSize={10}
      />
    </div>
  );
}

export default App;
```

## License

MIT
