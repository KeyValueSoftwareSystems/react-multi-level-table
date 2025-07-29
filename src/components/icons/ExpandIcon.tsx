import React from 'react';

import type { ThemeProps } from '../../types/theme';

/**
 * Props for the ExpandIcon component
 * @interface ExpandIconProps
 * @property {boolean} isExpanded - Whether the row is expanded
 * @property {ThemeProps} theme - The theme object
 * @property {string} [mode] - Mode of the icon: 'expand' for row expansion, 'sort' for sorting
 * @property {string} [sortDirection] - Sort direction: 'asc', 'desc', or undefined for default
 */
interface ExpandIconProps {
  isExpanded: boolean;
  theme?: ThemeProps;
  mode?: 'expand' | 'sort';
  sortDirection?: 'asc' | 'desc';
  customStyle?: React.CSSProperties;
}

/**
 * Renders an expand/collapse icon for table rows
 * @component
 * @param {ExpandIconProps} props - Component props
 * @returns {JSX.Element} Rendered expand/collapse icon
 */
export const ExpandIcon: React.FC<ExpandIconProps> = ({ isExpanded, theme, mode = 'expand', sortDirection, customStyle }) => {
  // For sorting mode, determine visibility and rotation
  const isSortMode = mode === 'sort';
  const isVisible = isSortMode ? sortDirection !== undefined : true;
  const rotation = isSortMode 
    ? (sortDirection === 'asc' ? 'rotate(-90deg)' : sortDirection === 'desc' ? 'rotate(90deg)' : 'rotate(0deg)')
    : (isExpanded ? 'rotate(90deg)' : 'rotate(0deg)');

  if (isSortMode && !isVisible) 
    return null; // Hide icon when not sorted
  

  return (
    <span
      className="expand-icon"
      style={{
        color: theme?.expandIcon?.color,
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'transform 0.2s',
        transform: rotation,
        marginRight: isSortMode ? '4px' : '8px',
        opacity: isSortMode && sortDirection ? 1 : 0.5,
        ...customStyle,
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
          stroke={theme?.expandIcon?.color || '#7E7E7E'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}; 