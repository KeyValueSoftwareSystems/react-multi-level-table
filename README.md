# React Material Table Component

[![npm version](https://badgen.net/npm/v/@keyvalue/material-table-component?color=blue)](https://www.npmjs.com/package/@keyvalue/material-table-component)
[![Downloads](https://img.shields.io/npm/dw/@keyvalue/material-table-component?label=Downloads)](https://www.npmjs.com/package/@keyvalue/material-table-component)
[![CI/CD](https://github.com/KeyValueSoftwareSystems/material-table-component/actions/workflows/deploy.yml/badge.svg)](https://github.com/KeyValueSoftwareSystems/material-table-component)

<div align="center">
<!-- TODO: Add screenshot of the table component in action -->
<img src="./src/assets/material-table-example.png" alt="Material Table Component Example" width="800" height="400"/>
</div>

>A customizable & responsive Material Design table component for React projects with advanced features like multi-level data display, sorting, filtering, pagination, and row selection.

Try the live demo using this codesandbox link [here](https://codesandbox.io/s/material-table-example)

## Installation

The easiest way to use material-table-component is to install it from npm and build it into your app with Webpack.

```bash
npm install @keyvalue/material-table-component
```

This package includes Material-UI as a dependency, so you don't need to install it separately. However, you'll need to install React since it isn't included in the package.

## Usage

Material Table Component can be used in its basic form by providing the `columns` and `data` props:

```jsx
import { GenericTable } from '@keyvalue/material-table-component';

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

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
