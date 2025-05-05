# React Material Table Component

[![npm version](https://badgen.net/npm/v/@keyvaluesystems/material-table-component?color=blue)](https://www.npmjs.com/package/@keyvaluesystems/material-table-component)
[![Downloads](https://img.shields.io/npm/dw/@keyvaluesystems/material-table-component?label=Downloads)](https://www.npmjs.com/package/@keyvaluesystems/material-table-component)
[![CI/CD](https://github.com/KeyValueSoftwareSystems/material-table-component/actions/workflows/deploy.yml/badge.svg)](https://github.com/KeyValueSoftwareSystems/material-table-component)

<div align="center">
<!-- TODO: Add screenshot of the table component in action -->
<img src="./src/assets/table-example.png" alt="Material Table Component Example" width="800" height="400"/>
</div>

>A customizable & responsive Material Design table component for React projects with advanced features like multi-level data display, sorting, filtering, pagination, and row selection.

## ✨ Features

- 🎨 Material Design styled table with modern UI
- 📊 Nested (multi-level) data support with expandable rows
- 🎯 Customizable headers, cells, and row styles
- 🔄 Sorting, filtering, and pagination capabilities
- ✅ Row selection and custom actions
- 💰 Column formatting (currency, percentage, dates)
- 📱 Responsive design for all screen sizes
- 🎭 Custom cell rendering support
- 🔢 Numeric column totals
- 🎮 Interactive row expansion/collapse

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
  - [Multi-Level Table Example](#multi-level-table-example)
  - [Pivot Table Example](#pivot-table-example)
- [Props](#props)
- [Column Types and Formatting](#column-types-and-formatting)
- [Row Actions](#row-actions)
- [Style Customizations](#style-customizations)
- [Contributing](#contributing)
- [License](#license)

## Quick Start

Try the live demo:
[![Edit material-table-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/material-table-example)

[![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

## Installation

The easiest way to use material-table-component is to install it from npm and build it into your app with Webpack.

```bash
npm install @keyvaluesystems/material-table-component
```

### Peer Dependencies

This package includes Material-UI as a dependency. However, React (^18.0.0) is a peer dependency and must be installed separately:

```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

## Usage

Material Table Component can be used in its basic form by providing the `columns` and `data` props:

```jsx
import { GenericTable } from '@keyvaluesystems/material-table-component';

<GenericTable
  columns={columns}
  data={data}
/>
```

The columns prop is an array of column definitions with the following structure:

```jsx
const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "age",
    label: "Age",
  }
];
```

The data prop should be an array of objects matching the column keys:

```jsx
const data = [
  {
    id: "row-1",
    name: 'John Doe',
    age: 30,
    children: [] // Optional children for multi-level tables
  },
  {
    id: "row-2",
    name: 'Jane Smith',
    age: 25,
    children: []
  }
];
```

### Multi-Level Table Example

The component supports multi-level data display with parent-child relationships:

```jsx
<GenericTable
  data={[
    {
      id: "parent-1",
      investor: "Parent Company",
      grossInvestment: -1000000,
      children: [
        {
          id: "child-1",
          investor: "Subsidiary A",
          grossInvestment: -600000,
          children: []
        },
        {
          id: "child-2",
          investor: "Subsidiary B",
          grossInvestment: -400000,
          children: []
        }
      ]
    }
  ]}
  columns={[
    {
      key: "investor",
      label: "Investor",
    },
    {
      key: "grossInvestment",
      label: "Investment",
    }
  ]}
  meta={{
    chartType: "MULTI_LEVEL_TABLE",
    columns: [
      {
        id: "investor",
        name: "Investor",
        type: "string",
      },
      {
        id: "grossInvestment",
        name: "Investment",
        type: "currency",
        currencyFormat: {
          currency: "dollar",
          scale: 2,
        },
      }
    ]
  }}
/>
```

### Pivot Table Example

The component also supports pivot table functionality for data aggregation and analysis:

```jsx
<GenericTable
  data={[
    {
      id: "row-1",
      region: "North",
      product: "Product A",
      sales: 15000,
      profit: 3000,
      quarter: "Q1"
    },
    {
      id: "row-2",
      region: "North",
      product: "Product B",
      sales: 12000,
      profit: 2400,
      quarter: "Q1"
    },
    {
      id: "row-3",
      region: "South",
      product: "Product A",
      sales: 18000,
      profit: 3600,
      quarter: "Q1"
    }
  ]}
  columns={[
    {
      key: "region",
      label: "Region",
    },
    {
      key: "product",
      label: "Product",
    },
    {
      key: "sales",
      label: "Sales",
    },
    {
      key: "profit",
      label: "Profit",
    },
    {
      key: "quarter",
      label: "Quarter",
    }
  ]}
  meta={{
    chartType: "PIVOT_TABLE",
    columns: [
      {
        id: "region",
        name: "Region",
        type: "string",
        pivot: true
      },
      {
        id: "product",
        name: "Product",
        type: "string",
        pivot: true
      },
      {
        id: "sales",
        name: "Sales",
        type: "currency",
        currencyFormat: {
          currency: "dollar",
          scale: 2,
        },
        aggregation: "sum"
      },
      {
        id: "profit",
        name: "Profit",
        type: "currency",
        currencyFormat: {
          currency: "dollar",
          scale: 2,
        },
        aggregation: "sum"
      },
      {
        id: "quarter",
        name: "Quarter",
        type: "string",
        pivot: true
      }
    ],
    pivotConfig: {
      rows: ["region", "product"],
      columns: ["quarter"],
      values: ["sales", "profit"],
      aggregations: {
        sales: "sum",
        profit: "sum"
      }
    }
  }}
/>
```

This pivot table example demonstrates:
- Row grouping by Region and Product
- Column grouping by Quarter
- Value aggregation for Sales and Profit
- Currency formatting for monetary values
- Sum aggregation for numeric columns

The resulting table will show:
- Sales and Profit totals for each Region-Product combination
- Quarterly breakdown of the totals
- Grand totals for each metric

## Props

Props that can be passed to the component are listed below:

<table>
<thead>
<tr>
<th>Prop</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td><code><b>data:</b> Row&lt;T&gt;[]</code></td>
<td>An array of data objects to be displayed in the table. Each row can have a `children` array for multi-level tables.</td>
<td><code>[]</code></td>
</tr>
<tr>
<td><code><b>columns:</b> Column&lt;T&gt;[]</code></td>
<td>An array of column definition objects with `key` and `label` properties</td>
<td><code>[]</code></td>
</tr>
<tr>
<td><code><b>meta?:</b> object</code></td>
<td>Metadata for the table including column types and formatting options</td>
<td><code>undefined</code></td>
</tr>
<tr>
<td><code><b>actions?:</b> RowAction[]</code></td>
<td>Array of action objects for row-level operations</td>
<td><code>[]</code></td>
</tr>
<tr>
<td><code><b>onViewRow?:</b> function</code></td>
<td>Callback function triggered when a row is clicked</td>
<td><code>undefined</code></td>
</tr>
<tr>
<td><code><b>isLoading?:</b> boolean</code></td>
<td>Flag to indicate if data is being loaded</td>
<td><code>false</code></td>
</tr>
<tr>
<td><code><b>depth?:</b> number | null</code></td>
<td>Controls the depth of expanded rows in multi-level tables</td>
<td><code>null</code></td>
</tr>
<tr>
<td><code><b>showTotal?:</b> boolean</code></td>
<td>Whether to show totals for numeric columns</td>
<td><code>false</code></td>
</tr>
<tr>
<td><code><b>tableHeaderStyles?:</b> React.CSSProperties</code></td>
<td>Custom styles for the table header</td>
<td><code>undefined</code></td>
</tr>
<tr>
<td><code><b>tableCellStyles?:</b> React.CSSProperties</code></td>
<td>Custom styles for table cells</td>
<td><code>undefined</code></td>
</tr>
<tr>
<td><code><b>rowColors?:</b> string[]</code></td>
<td>Array of colors to be used for alternating rows</td>
<td><code>undefined</code></td>
</tr>
</tbody>
</table>

## Column Types and Formatting

The `meta.columns` property allows you to specify the type and formatting for each column:

```jsx
meta={{
  chartType: "MULTI_LEVEL_TABLE",
  columns: [
    {
      id: "name",
      name: "Name",
      type: "string",
    },
    {
      id: "amount",
      name: "Amount",
      type: "currency",
      currencyFormat: {
        currency: "dollar",
        scale: 2,
      },
    },
    {
      id: "percentage",
      name: "Percentage",
      type: "percentage",
      scale: 2,
    },
    {
      id: "date",
      name: "Date",
      type: "date",
      dateFormat: "MM/DD/YYYY",
    }
  ]
}}
```

Supported column types include:
- `string` - Text data
- `number` - Numeric data
- `currency` - Monetary values with currency formatting
- `percentage` - Percentage values
- `date` - Date values with formatting options
- `boolean` - True/false values

## Row Actions

You can define actions that appear for each row:

```jsx
actions={[
  {
    label: "View Details",
    icon: "visibility",
    action: (rowId) => handleViewDetails(rowId),
    condition: (rowId) => hasDetails(rowId)
  },
  {
    label: "Edit",
    icon: "edit",
    action: (rowId) => handleEdit(rowId)
  }
]}
```

## Style Customizations

You can customize the appearance of the table using the style props:

```jsx
<GenericTable
  columns={columns}
  data={data}
  tableHeaderStyles={{
    background: "#1a237e",
    color: "#ffffff",
    fontSize: "1rem",
  }}
  tableCellStyles={{
    padding: "12px 16px",
  }}
  rowColors={["#f5f5f5", "#ffffff"]}
/>
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Install dependencies: `npm install`
4. Make your changes
5. Run tests: `npm test`
6. Commit your changes: `git commit -am 'Add new feature'`
7. Push to the branch: `git push origin feature/YourFeature`
8. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests. For more detailed guidelines, see our [CONTRIBUTING.md](./CONTRIBUTING.md) file.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/KeyValueSoftwareSystems/material-table-component.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build the package
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
