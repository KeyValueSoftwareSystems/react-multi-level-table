import React from 'react';

import { createComponentStyles } from './componentStyles';
import type { ThemeProps } from '../types/theme';

interface StylingGuideProps {
  theme?: ThemeProps;
}

export const StylingGuide: React.FC<StylingGuideProps> = ({ theme }) => {
  const styles = createComponentStyles(theme);

  return (
    <div style={{ padding: '20px', fontFamily: 'DM Sans, sans-serif' }}>
      <h1>Component Styling System Guide</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2>How to Use the New Styling System</h2>
        <p>
          The new styling system replaces inline styles with a centralized, theme-aware approach.
          This makes the codebase more maintainable and customizable.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Basic Usage</h2>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {`// Before (inline styles)
<div style={{
  padding: '1.5rem',
  borderBottom: \`1px solid \${theme.colors?.borderColor || '#e0e0e0'}\`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}}>

// After (using component styles)
const styles = createComponentStyles(theme);
<div style={styles.sidePanel.header}>`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Available Style Categories</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '4px' }}>
            <h3>SidePanel Styles</h3>
            <ul>
              <li>overlay</li>
              <li>container</li>
              <li>header</li>
              <li>title</li>
              <li>closeButton</li>
              <li>content</li>
              <li>fieldContainer</li>
              <li>label</li>
              <li>idField</li>
              <li>footer</li>
              <li>saveButton</li>
            </ul>
          </div>

          <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '4px' }}>
            <h3>RowDetailsPopup Styles</h3>
            <ul>
              <li>overlay</li>
              <li>container</li>
              <li>header</li>
              <li>title</li>
              <li>closeButton</li>
              <li>content</li>
              <li>footer</li>
              <li>closeAction</li>
            </ul>
          </div>

          <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '4px' }}>
            <h3>FilterDropdown Styles</h3>
            <ul>
              <li>container</li>
              <li>selectedCountContainer</li>
              <li>selectedCountBadge</li>
              <li>categoryItem</li>
              <li>categoryName</li>
              <li>checkbox</li>
              <li>filterOption</li>
            </ul>
          </div>

          <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '4px' }}>
            <h3>MultiLevelTable Styles</h3>
            <ul>
              <li>container</li>
              <li>searchBarContainer</li>
              <li>searchBarLeft</li>
              <li>searchBarRight</li>
              <li>tableTitle</li>
              <li>tableSubtitle</li>
              <li>searchInput</li>
              <li>table</li>
            </ul>
          </div>

          <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '4px' }}>
            <h3>Pagination Styles</h3>
            <ul>
              <li>container</li>
              <li>contentContainer</li>
              <li>totalItems</li>
              <li>navigation</li>
              <li>arrowButton</li>
              <li>pageButton</li>
              <li>pageSizeSelect</li>
            </ul>
          </div>

          <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '4px' }}>
            <h3>Popup Styles</h3>
            <ul>
              <li>overlay</li>
              <li>container</li>
              <li>title</li>
              <li>text</li>
              <li>buttonContainer</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Theme Integration</h2>
        <p>
          All styles automatically adapt to the provided theme. The system uses fallback values
          when theme properties are not provided.
        </p>
        
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <h4>Example Theme Object:</h4>
          <pre style={{ margin: 0, fontSize: '14px' }}>
{`const theme = {
  colors: {
    background: '#ffffff',
    textColor: '#333333',
    borderColor: '#e0e0e0',
    primaryColor: '#5D5FEF',
  },
  table: {
    cell: {
      borderColor: '#e0e0e0',
    },
    filter: {
      borderColor: '#E5E7EB',
    },
  },
};`}
          </pre>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Migration Guide</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <h3>Step 1: Import the styling function</h3>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
{`import { createComponentStyles } from '../styles/componentStyles';`}
          </pre>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h3>Step 2: Create styles instance</h3>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
{`const styles = createComponentStyles(theme);`}
          </pre>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h3>Step 3: Replace inline styles</h3>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px',
            fontSize: '14px'
          }}>
{`// Replace this:
<div style={{
  padding: '1.5rem',
  borderBottom: \`1px solid \${theme.colors?.borderColor || '#e0e0e0'}\`,
}}>

// With this:
<div style={styles.sidePanel.header}>`}
          </pre>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Benefits</h2>
        <ul>
          <li><strong>Consistency:</strong> All components use the same styling approach</li>
          <li><strong>Maintainability:</strong> Styles are centralized and easy to update</li>
          <li><strong>Theme Support:</strong> Automatic theme integration with fallbacks</li>
          <li><strong>Type Safety:</strong> Full TypeScript support for all styles</li>
          <li><strong>Performance:</strong> Styles are computed once per component</li>
          <li><strong>Customization:</strong> Easy to override or extend styles</li>
        </ul>
      </section>

      <section>
        <h2>Example: SidePanel with New Styling</h2>
        <div style={{ 
          border: '1px solid #e0e0e0', 
          padding: '15px', 
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          <p>This SidePanel now uses the new styling system:</p>
          <ul>
            <li>All inline styles have been replaced with component styles</li>
            <li>Theme integration is automatic</li>
            <li>Styles are more maintainable and consistent</li>
            <li>Easy to customize and extend</li>
          </ul>
        </div>
      </section>
    </div>
  );
}; 