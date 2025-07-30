import React from 'react';

import type { ThemeProps } from '../types/theme';
import '../styles/SidePanelInput.css';

interface SidePanelInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  isEditable?: boolean;
  placeholder?: string;
  theme?: ThemeProps;
  required?: boolean;
}

export const SidePanelInput: React.FC<SidePanelInputProps> = ({
  label,
  value,
  onChange,
  isEditable = true,
  placeholder,
  theme,
  required = false,
}) => {
  return (
    <div className="side-panel-input-container">
      <label 
        className="side-panel-input-label"
        style={{
          color: theme?.colors?.textColor || '#333333',
        }}
      >
        {label}{required && ' *'}
      </label>
      {isEditable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="side-panel-input-field"
          style={{
            color: theme?.colors?.textColor || '#333333',
            backgroundColor: theme?.colors?.background || '#ffffff',
            borderColor: theme?.colors?.borderColor || '#e0e0e0',
          }}
        />
      ) : (
        <div 
          className="side-panel-input-display"
          style={{
            color: theme?.colors?.textColor || '#333333',
            backgroundColor: theme?.colors?.background || '#f5f5f5',
            borderColor: theme?.colors?.borderColor || '#e0e0e0',
          }}
        >
          {value}
        </div>
      )}
    </div>
  );
}; 