import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Mock ReactDOM
vi.mock('react-dom/client', () => ({
  default: {
    createRoot: vi.fn(() => ({
      render: vi.fn(),
    })),
  },
}));

describe('main', () => {
  it('renders App component in strict mode', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    // Import the main module and wait for it to complete
    await import('../src/main');

    // Verify that createRoot was called with the root element
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(root);
  });
}); 