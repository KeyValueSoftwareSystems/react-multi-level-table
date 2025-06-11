import React from 'react';

import type { ThemeProps } from '../types/theme';
import '../styles/ExpandIcon.css';

/**
 * Props for the ExpandIcon component
 * @interface ExpandIconProps
 * @property {boolean} isExpanded - Whether the row is expanded
 * @property {ThemeProps} theme - The theme object
 */
interface ExpandIconProps {
  isExpanded: boolean;
  theme: ThemeProps;
}

/**
 * Renders an expand/collapse icon for table rows
 * @component
 * @param {ExpandIconProps} props - Component props
 * @returns {JSX.Element} Rendered expand/collapse icon
 */
export const ExpandIcon: React.FC<ExpandIconProps> = ({ isExpanded, theme }) => {
  return (
    <span
      className="expand-icon"
      style={{
        color: theme.expandIcon?.color,
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'transform 0.2s',
        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
        // marginTop:  isExpanded ? '10px' : 0,
        // marginRight: isExpanded ? 0 : '10px',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <path
          d="M9 18L15 12L9 6"
          stroke={theme.expandIcon?.color || '#7E7E7E'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}; 
