import React, { useEffect, useRef } from 'react';

import { colors } from '../styles/style';
import '../styles/ExportDropdown.css';

interface ExportDropdownProps {
  onClose?: () => void;
  handleExportCSV?: () => void;
  theme?: {
    colors?: {
      background?: string;
      textColor?: string;
    };
  };
}

export const ExportDropdown: React.FC<ExportDropdownProps> = ({
  onClose,
  handleExportCSV,
  theme,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) 
        onClose?.();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleExportCSVClick = () => {
    if (handleExportCSV) 
      handleExportCSV();
    
    onClose?.();
  };

  return (
    <div 
      ref={dropdownRef}
      className="export-dropdown"
      style={{
        backgroundColor: theme?.colors?.background || colors.backgroundWhite,
        color: theme?.colors?.textColor || colors.borderDark,
        borderColor: colors.borderFilter,
      }}
    >
      <div className="export-dropdown-content">
        <button 
          className="export-option"
          onClick={handleExportCSVClick}
          style={{
            color: theme?.colors?.textColor || colors.borderDark,
          }}
        >
          <span className="export-icon">📄</span>
          <span>Export as CSV</span>
        </button>
      </div>
    </div>
  );
}; 