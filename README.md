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
  - [Expand Icon Customization](#32-expand-icon-customization)
  - [Selection Props](#33-selection-props)
  - [Sort Icons](#34-sort-icons)
  - [Pagination](#35-pagination)
  - [Theme Customization](#36-theme-customization)
- [Development](#4-development)
  - [Project Structure](#41-project-structure)
  - [Development Commands](#42-development-commands)
  - [Development Features](#43-development-features)
- [Example](#5-example)
- [License](#license)

## Overview

The `@keyvaluesystems/multilevel-table` is a flexible and customizable multi-level table component for React applications. It provides comprehensive support for displaying hierarchical data with features like sorting, filtering, and pagination. This documentation provides detailed information on how to install, configure, and use the component effectively.

## 1. Installation

You can install the component from npm:

```bash
npm install @keyvaluesystems/multilevel-table
```

or from yarn:

```bash
yarn add @keyvaluesystems/multilevel-table
```

#### Prerequisites

- React v16.8+
- TypeScript (recommended)

## 2. Configuration

### 2.1 Basic Usage

Here's a basic example of how to use the MultiLevelTable component:

```tsx
import { MultiLevelTable } from '@keyvaluesystems/multilevel-table';

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
      sortable: true,
      width: '25%',
  },
  {
    key: 'value',
    title: 'Value',
    filterable: true,
      sortable: true,
      width: '20%',
    render: (value) => `$${value}`,
  },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
      sortable: true,
      width: '15%',
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
| pageSize | number | No | 10 | Number of rows to display per page |
| theme | object | No | - | Custom theme object for styling the table |
| renderCustomPagination | function | No | null | Custom pagination component render function |
| sortable | boolean | No | false | Enable/disable sorting functionality |
| ascendingIcon | ReactNode | No | - | Custom icon for ascending sort |
| descendingIcon | ReactNode | No | - | Custom icon for descending sort |
| expandIcon | ReactNode | No | - | Custom icon for expanding rows |
| selectable | boolean | No | false | Enable/disable row selection |
| onSelectionChange | function | No | - | Callback function when selection changes |
| onRowClick | function | No | - | Callback function when a parent row is clicked |
| onDelete | function | No | - | Callback function for row deletion |
| searchable | boolean | No | true | Enable/disable global search functionality |
| filterable | boolean | No | true | Enable/disable column filtering |
| exportable | boolean | No | false | Enable/disable data export functionality |
| exportFormats | array | No | ['csv', 'excel'] | Available export formats |
| onExport | function | No | - | Custom export handler function |

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
| width | string | No | Column width (e.g., '150px', '20%') |
| minWidth | string | No | Minimum column width |
| maxWidth | string | No | Maximum column width |
| align | string | No | Text alignment ('left', 'center', 'right') |
| className | string | No | Custom CSS class for the column |
| style | object | No | Custom inline styles for the column |

### 3.2 Expand Icon Customization

You can customize the expand icon for rows with children using the `expandIcon` prop:

```tsx
<MultiLevelTable
  data={data}
  columns={columns}
  expandIcon={<CustomExpandIcon />} // Your custom expand icon component
/>
```

The expand icon will be displayed for rows that have children. You can provide any React component as the icon.

### 3.3 Selection Props

The table supports row selection with the following props:

```tsx
<MultiLevelTable
  data={data}
  columns={columns}
  selectable={true} // Enable row selection
  onSelectionChange={(selectedRows) => {
    console.log('Selected rows:', selectedRows);
  }}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| selectable | boolean | Enable/disable row selection functionality |
| onSelectionChange | function | Callback function that receives a Set of selected row IDs |

**Note**: Child rows (nested rows) do not display checkboxes. They automatically show placeholder spacers to maintain alignment with parent rows.

### 3.4 Sort Icons

You can customize the sort icons for ascending and descending states:

```tsx
<MultiLevelTable
  data={data}
  columns={columns}
  sortable={true}
  ascendingIcon={<CustomAscendingIcon />} // Custom icon for ascending sort
  descendingIcon={<CustomDescendingIcon />} // Custom icon for descending sort
/>
```

| Prop | Type | Description |
|------|------|-------------|
| ascendingIcon | ReactNode | Custom icon component for ascending sort state |
| descendingIcon | ReactNode | Custom icon component for descending sort state |

### 3.5 Search and Filter Features

The table provides comprehensive search and filtering capabilities:

#### Global Search
- **Searchable**: Enable/disable global search across all columns
- **Search Input**: Real-time search with debounced input
- **Search Icon**: Customizable search icon with proper positioning
- **Placeholder Text**: Customizable placeholder text for search input

#### Column Filtering
- **Filterable Columns**: Individual columns can be marked as filterable
- **Filter Dropdowns**: Dropdown-based filtering with multiple selection
- **Filter Options**: Custom filter options for each column
- **Filter State**: Maintains filter state across pagination

**Important Note**: Search and filter features are currently implemented at the parent level only. Child rows (nested rows) are not included in search results or filter operations. This ensures consistent behavior and performance.

#### Filter Configuration
```tsx
const columns = [
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    filterOptions: [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Completed', value: 'completed' }
    ]
  }
];
```

### 3.6 Export Functionality

The table supports data export with customizable options:

| Prop | Type | Description |
|------|------|-------------|
| exportable | boolean | Enable/disable export functionality |
| exportFormats | array | Available export formats (csv, excel, json) |
| onExport | function | Custom export handler function |

```tsx
<MultiLevelTable
  data={data}
  columns={columns}
  exportable={true}
  exportFormats={['csv', 'excel']}
  onExport={(data, format) => {
    // Custom export logic
    console.log('Exporting:', data, format);
  }}
/>
```

### 3.7 Row Actions

The table supports row-level actions:

| Prop | Type | Description |
|------|------|-------------|
| onRowClick | function | Callback when parent row is clicked |
| onDelete | function | Callback for row deletion with confirmation |

```tsx
<MultiLevelTable
  data={data}
  columns={columns}
  onRowClick={(row) => {
    console.log('Row clicked:', row);
  }}
  onDelete={(rowId, rowName) => {
    console.log('Delete row:', rowId, rowName);
  }}
/>
```

### 3.8 Pagination

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

### 3.9 Theme Customization

The table component supports comprehensive theme customization through the `theme` prop. Here's the complete theme interface:

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
- **Global Colors**: Customize background, primary, text, and border colors
- **Table Components**: Style headers, cells, and rows with custom colors and borders
- **Nested Levels**: Configure different background colors for each nesting level
- **Filter Components**: Customize filter dropdowns, inputs, and focus states
- **Pagination**: Style pagination buttons, selects, and info text
- **Icons**: Customize expand, sort, and action icon colors
- **Responsive Design**: All theme properties support responsive breakpoints
- **CSS Variables**: Theme properties can use CSS custom properties for dynamic theming

## 4. Component Features and Customization

### 4.1 MultiLevelTable Component
- **Hierarchical Data**: Supports unlimited nesting levels with automatic indentation
- **Responsive Design**: Percentage-based column widths with fixed table layout
- **Performance Optimized**: Virtual scrolling support for large datasets
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Customizable Icons**: Replace default expand, sort, and action icons
- **Event Handling**: Comprehensive callback system for all user interactions

### 4.2 TableRow Component
- **Level-based Styling**: Different background colors for each nesting level
- **Expand/Collapse**: Smooth animations for row expansion and collapse
- **Selection State**: Visual feedback for selected rows
- **Click Handlers**: Support for row click and action button clicks
- **Custom Rendering**: Flexible cell content rendering with custom components

### 4.3 TableCell Component
- **Flexible Content**: Support for text, numbers, custom components, and HTML
- **Alignment Options**: Left, center, and right text alignment
- **Custom Styling**: Inline styles and CSS classes for individual cells
- **Icon Integration**: Built-in support for expand, sort, and action icons
- **Responsive Behavior**: Automatic text truncation and ellipsis

### 4.4 TableHeader Component
- **Sortable Columns**: Click-to-sort functionality with custom sort icons
- **Filter Integration**: Dropdown filters with multi-select capability
- **Custom Styling**: Theme-based header styling with hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive Design**: Adaptive header layout for mobile devices

### 4.5 Pagination Component
- **Page Navigation**: Previous/next buttons with page number display
- **Page Size Selection**: Dropdown to change items per page
- **Custom Rendering**: Complete pagination component replacement
- **State Management**: Automatic page state handling
- **Responsive Layout**: Mobile-friendly pagination controls

### 4.6 Filter Components
- **Dropdown Filters**: Multi-select dropdown with search capability
- **Global Search**: Real-time search across all columns
- **Filter State**: Persistent filter state across pagination
- **Custom Options**: Configurable filter options per column
- **Outside Click**: Automatic dropdown closure on outside clicks

### 4.7 Export Components
- **Multiple Formats**: CSV, Excel, and JSON export support
- **Custom Handlers**: Flexible export function customization
- **Data Filtering**: Export only visible or selected data
- **Progress Feedback**: Export progress indicators
- **Error Handling**: Comprehensive error handling for export operations

## 5. Development

### 4.1 Project Structure
- `src/App.tsx` - A demo component that showcases the MultiLevelTable with sample data
- `src/main.tsx` - The entry point for the development environment
- `src/index.css` - Basic styling for the table component
- `src/components/` - All table components (MultiLevelTable, TableRow, TableCell, etc.)
- `src/styles/` - CSS files for styling individual components
- `src/types/` - TypeScript type definitions
- `src/constants/` - Theme and configuration constants
- `example/` - Complete example application with all features

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
- **Hot Module Replacement (HMR)**: Instant feedback during development
- **TypeScript Support**: Full type checking and IntelliSense support
- **ESLint Configuration**: Code quality and consistency enforcement
- **Sample Data**: Comprehensive test data with nested structures
- **Component Testing**: Unit tests for all major components
- **Responsive Design**: Mobile-first responsive design patterns
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized rendering with React.memo and useMemo

## 6. Example

Here's a complete example showing how to use the component with all features enabled:

```tsx
import React from 'react';
import { MultiLevelTable } from '@keyvaluesystems/multilevel-table';

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
        borderColor: '#e0e0e0'
      },
      row: {
        levelColors: [
          { background: '#ffffff' },
          { background: '#f8f8f8' },
          { background: '#f5f5f5' }
        ]
      }
    }
  };

  return (
    <div>
      <MultiLevelTable 
        data={data} 
        columns={columns}
        pageSize={10}
        theme={theme}
        sortable={true}
        selectable={true}
        searchable={true}
        filterable={true}
        exportable={true}
        onSelectionChange={(selectedRows) => {
          console.log('Selected rows:', selectedRows);
        }}
        onRowClick={(row) => {
          console.log('Row clicked:', row);
        }}
        onDelete={(rowId, rowName) => {
          console.log('Delete row:', rowId, rowName);
        }}
      />
    </div>
  );
}

export default App;
```

## License

MIT
