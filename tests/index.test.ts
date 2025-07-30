import { describe, it, expect } from 'vitest';
import { MultiLevelTable } from '../src/index';
import { MultiLevelTable as OriginalMultiLevelTable } from '../src/components/MultiLevelTable';

describe('index', () => {
  it('exports MultiLevelTable component', () => {
    expect(MultiLevelTable).toBe(OriginalMultiLevelTable);
  });

  it('exports MultiLevelTableProps type', () => {
    // TypeScript will verify this at compile time
    const props: Parameters<typeof MultiLevelTable>[0] = {
      data: [],
      columns: [],
    };
    expect(props).toBeDefined();
  });
}); 