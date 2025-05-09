import React from 'react';
import '../styles/ExpandIcon.css';

/**
 * Props for the ExpandIcon component
 * @interface ExpandIconProps
 * @property {boolean} isExpanded - Whether the row is expanded
 */
interface ExpandIconProps {
  isExpanded: boolean;
}

/**
 * Renders an expand/collapse icon for table rows
 * @component
 * @param {ExpandIconProps} props - Component props
 * @returns {JSX.Element} Rendered expand/collapse icon
 */
export const ExpandIcon: React.FC<ExpandIconProps> = ({ isExpanded }) => (
  <span className="expand-icon">
    {isExpanded ? '▼' : '▶'}
  </span>
); 