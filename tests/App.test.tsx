import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  it('renders the MultiLevelTable component', () => {
    render(<App />);
    // Check for table headers
    expect(screen.getByText('Resource Type')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Orchestration')).toBeInTheDocument();
  });

  it('renders table title and subtitle', () => {
    render(<App />);
    expect(screen.getByText('Multi-Level Table Demo')).toBeInTheDocument();
    expect(screen.getByText('A comprehensive table showing resource management')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders export and filter buttons', () => {
    render(<App />);
    expect(screen.getByText('Export')).toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('renders sample data items', () => {
    render(<App />);
    // Check for some sample data items
    expect(screen.getByText('web-service')).toBeInTheDocument();
    expect(screen.getByText('mobile-app-backend')).toBeInTheDocument();
    expect(screen.getByText('analytics-platform')).toBeInTheDocument();
  });

  it('renders status cells', () => {
    render(<App />);
    // Check that status badges are rendered (use getAllByText since there are multiple)
    const activeElements = screen.getAllByText('Active');
    const inactiveElements = screen.getAllByText('Inactive');
    const pendingElements = screen.getAllByText('Pending');
    
    expect(activeElements.length).toBeGreaterThan(0);
    expect(inactiveElements.length).toBeGreaterThan(0);
    expect(pendingElements.length).toBeGreaterThan(0);
  });

  it('renders resource types', () => {
    render(<App />);
    // Use getAllByText since there are multiple Application elements
    const applicationElements = screen.getAllByText('Application');
    expect(applicationElements.length).toBeGreaterThan(0);
    expect(screen.getByText('Redis')).toBeInTheDocument();
  });

  it('renders orchestration values', () => {
    render(<App />);
    // Use getAllByText since there are multiple ECS elements
    const ecsElements = screen.getAllByText('ECS');
    expect(ecsElements.length).toBeGreaterThan(0);
  });
});
