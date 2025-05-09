import { MultiLevelTable } from './components/MultiLevelTable';

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
  {
    id: 4,
    name: 'Parent 2',
    value: 200,
    children: [
      {
        id: 5,
        name: 'Child 3',
        value: 100,
      },
      {
        id: 6,
        name: 'Child 4',
        value: 100,
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
    render: (value: number) => `$${value}`,
  },
];

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Multi Level Table Demo</h1>
      <MultiLevelTable data={data} columns={columns} />
    </div>
  );
}

export default App;
