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
    <span className="expand-icon" style={{ color: theme.expandIcon?.color }}>
      {isExpanded ? '▼' : '▶'}
    </span>
  );
}; 