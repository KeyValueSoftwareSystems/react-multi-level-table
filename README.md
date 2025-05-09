# React Multi Level Table

A flexible and customizable multi-level table component for React applications.

## Installation

```bash
npm install react-multi-level-table
# or
yarn add react-multi-level-table
```

## Usage

```tsx
import { MultiLevelTable } from 'react-multi-level-table';

const data = [
  {
    id: 1,
    name: 'Parent 1',
    value: 100,
    children: [
      {
        id: 2,
        name: 'Child 1',
        value: 50,
      },
      {
        id: 3,
        name: 'Child 2',
        value: 50,
      },
    ],
  },
];

const columns = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'value',
    title: 'Value',
    render: (value) => `$${value}`,
  },
];

function App() {
  return <MultiLevelTable data={data} columns={columns} />;
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| data | array | Yes | - | Array of data objects to display in the table |
| columns | array | Yes | - | Array of column configurations |
| childrenKey | string | No | 'children' | Key to use for nested data |

### Column Configuration

Each column object should have the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| key | string | Yes | Key to access the data in each row |
| title | string | Yes | Column header text |
| render | function | No | Custom render function for the column |

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
