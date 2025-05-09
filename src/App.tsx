import { MultiLevelTable } from './components/MultiLevelTable';

const data = [
  {
    id: 1,
    name: 'Parent 1',
    value: 100,
    status: 'Active',
    children: [
      {
        id: 2,
        name: 'Child 1',
        value: 50,
        status: 'Inactive',
      },
      {
        id: 3,
        name: 'Child 2',
        value: 50,
        status: 'Active',
      },
    ],
  },
  {
    id: 4,
    name: 'Parent 2',
    value: 200,
    status: 'Active',
    children: [
      {
        id: 5,
        name: 'Child 3',
        value: 100,
        status: 'Pending',
      },
      {
        id: 6,
        name: 'Child 4',
        value: 100,
        status: 'Active',
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
    render: (value: number) => `$${value}`,
    filterable: true,
  },
  {
    key: 'status',
    title: 'Status',
    filterable: true,
    render: (value: string) => (
      <span
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor:
            value === 'Active'
              ? '#e6ffe6'
              : value === 'Inactive'
              ? '#ffe6e6'
              : '#fff2e6',
          color:
            value === 'Active'
              ? '#006600'
              : value === 'Inactive'
              ? '#cc0000'
              : '#cc7700',
        }}
      >
        {value}
      </span>
    ),
  },
];

function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>React Multi Level Table Demo</h1>
      <p>Features: Sorting, Filtering, Pagination, and Nested Data</p>
      <MultiLevelTable data={data} columns={columns} pageSize={5} />
    </div>
  );
}

export default App;
