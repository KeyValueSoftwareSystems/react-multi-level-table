import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument();
  });

  it('renders the MultiLevelTable component', () => {
    render(<App />);
    // Check for table headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('toggles theme when theme button is clicked', () => {
    render(<App />);
    const themeButton = screen.getByRole('button', { name: /dark mode/i });
    const appDiv = screen.getByTestId('app-container');
    
    // Initial state should be light theme
    expect(appDiv).toHaveStyle({ backgroundColor: '#ffffff' });
    
    // Click to toggle to dark theme
    fireEvent.click(themeButton);
    expect(appDiv).toHaveStyle({ backgroundColor: '#212529' });
    
    // Click again to toggle back to light theme
    fireEvent.click(themeButton);
    expect(appDiv).toHaveStyle({ backgroundColor: '#ffffff' });
  });

  it('renders parent items correctly', () => {
    render(<App />);
    // Check for some parent items
    expect(screen.getByText('Parent 1')).toBeInTheDocument();
    expect(screen.getByText('Parent 2')).toBeInTheDocument();
  });

  it('renders status cells with correct colors', () => {
    render(<App />);
    const activeStatus = screen.getAllByText('Active')[0];
    const inactiveStatus = screen.getAllByText('Inactive')[0];
    const pendingStatus = screen.getAllByText('Pending')[0];

    expect(activeStatus).toHaveStyle({ color: '#2ecc71' });
    expect(inactiveStatus).toHaveStyle({ color: '#e74c3c' });
    expect(pendingStatus).toHaveStyle({ color: '#f1c40f' });
  });
});
