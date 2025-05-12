# React Multi Level Table

A flexible and customizable multi-level table component for React applications with support for sorting, filtering, and pagination.

## Installation

```bash
npm install @keyvalue/material-table-component
# or
yarn add @keyvalue/material-table-component
```

## Usage

```tsx
import { MultiLevelTable } from '@keyvalue/material-table-component';

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

## Features

- **Multi-level Data Structure**: Display hierarchical data with parent-child relationships
- **Sorting**: Click column headers to sort data (applies to parent rows only)
- **Filtering**: Real-time filtering for specified columns (applies to parent rows only)
- **Pagination**: Navigate through pages with configurable page sizes
- **Custom Rendering**: Customize cell content with render functions
- **TypeScript Support**: Full TypeScript support with proper type definitions

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| data | array | Yes | - | Array of data objects to display in the table |
| columns | array | Yes | - | Array of column configurations |
| childrenKey | string | No | 'children' | Key to use for nested data |
| pageSize | number | No | 10 | Number of rows to display per page |

### Column Configuration

Each column object should have the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| key | string | Yes | Key to access the data in each row |
| title | string | Yes | Column header text |
| render | function | No | Custom render function for the column |
| filterable | boolean | No | Whether the column can be filtered |

## Development

The package includes a complete development environment to help you test and refine the component:

### Project Structure
- `src/App.tsx` - A demo component that showcases the MultiLevelTable with sample data
- `src/main.tsx` - The entry point for the development environment
- `src/index.css` - Basic styling for the table component

### Development Commands
```bash
# Start the development server
npm run dev

# Build the package
npm run build

# Run linting
npm run lint
```

### Development Features
- Hot Module Replacement (HMR) for instant feedback
- TypeScript support with type checking
- ESLint configuration for code quality
- Sample data and configurations for testing
- Basic styling for quick visualization

### Testing Different Configurations
You can easily test different data structures and column configurations by modifying the sample data in `App.tsx`. The development environment will automatically reflect your changes in real-time.

## License

MIT
