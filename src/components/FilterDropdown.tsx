import React, { useEffect, useRef } from 'react';

import type { FilterOption } from '../types/types';
import '../styles/FilterDropdown.css';

interface FilterDropdownProps {
  options: FilterOption[];
  selectedValues: Set<string | number>;
  onFilterChange: (values: Set<string | number>) => void;
  onClose: () => void;
  theme?: {
    colors?: {
      background?: string;
      textColor?: string;
    };
    table?: {
      filter?: {
        background?: string;
        textColor?: string;
        borderColor?: string;
      };
    };
  };
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  selectedValues,
  onFilterChange,
  onClose,
  theme,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) 
        onClose();
      
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleOptionChange = (value: string | number) => {
    const newValues = new Set(selectedValues);

    if (newValues.has(value)) 
      newValues.delete(value);
    else 
      newValues.add(value);
    
    onFilterChange(newValues);
  };

  return (
    <div 
      ref={dropdownRef}
      className="filter-dropdown"
      style={{
        backgroundColor: theme?.colors?.background || '#ffffff',
        color: theme?.colors?.textColor || '#000000',
        borderColor: theme?.table?.filter?.borderColor || '#d9d9d9',
      }}
    >
      <div className="filter-dropdown-header">
        <span>Filter Options</span>
        <button 
          className="filter-dropdown-close"
          onClick={onClose}
          style={{
            color: theme?.colors?.textColor || '#000000',
          }}
        >
          ×
        </button>
      </div>
      <div className="filter-dropdown-content">
        {options.map((option) => (
          <label 
            key={option.value.toString()} 
            className="filter-dropdown-option"
            style={{
              color: theme?.colors?.textColor || '#000000',
            }}
          >
            <input
              type="checkbox"
              checked={selectedValues.has(option.value)}
              onChange={() => handleOptionChange(option.value)}
              style={{
                borderColor: theme?.table?.filter?.borderColor || '#d9d9d9',
              }}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}; 