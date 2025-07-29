import React, { useEffect, useRef } from 'react';

import type { FilterOption } from '../types/types';
import '../styles/FilterDropdown.css';

interface FilterDropdownProps {
  // State props
  tempSelectedValues?: Set<string | number>;
  selectedCategory?: string | null;
  categories?: Array<{
    key: string;
    title: string;
    count: number;
  }>;
  categoryFilterOptions?: FilterOption[];
  
  // Handler props
  onClose?: () => void;
  onApply?: (values: Set<string | number>) => void;
  onCancel?: () => void;
  onReset?: () => void;
  onCategoryChange?: (categoryKey: string) => void;
  onSelectAll?: () => void;
  onOptionChange?: (value: string | number) => void;
  
  // Configuration props
  title?: string;
  showSelectedCount?: boolean;
  minHeight?: string;
  maxHeight?: string;
  
  // Styling props
  customStyle?: React.CSSProperties;
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
  // State props
  tempSelectedValues = new Set(),
  selectedCategory = null,
  categories = [],
  categoryFilterOptions = [],
  
  // Handler props
  onClose,
  onApply,
  onCancel,
  onReset,
  onCategoryChange,
  onSelectAll,
  onOptionChange,
  
  // Configuration props
  title = "Filters",
  showSelectedCount = true,
  minHeight = "400px",
  maxHeight,
  
  // Styling props
  customStyle,
  theme,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAllSelected = tempSelectedValues.size === categoryFilterOptions.length;
  const isIndeterminate = tempSelectedValues.size > 0 && tempSelectedValues.size < categoryFilterOptions.length;

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
        onClose?.();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleApply = () => {
    onApply?.(tempSelectedValues);
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const handleResetFilters = () => {
    onReset?.();
  };

  return (
    <div 
      ref={dropdownRef}
      className="filter-dropdown"
      style={{
        backgroundColor: theme?.colors?.background || '#FFFFFF',
        color: theme?.colors?.textColor || '#333333',
        borderColor: theme?.table?.filter?.borderColor || '#E5E7EB',
        minHeight,
        maxHeight,
        ...customStyle,
      }}
    >
      {/* Header */}
      <div className="filter-dropdown-header">
        <div className="filter-dropdown-title">
          <span>{title}</span>
          {showSelectedCount && tempSelectedValues.size > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{
                backgroundColor: '#F3F3FF',
                color: '#5D5FEF',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '400',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span>Selected</span>
                <span style={{
                  backgroundColor: '#5D5FEF',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '400',
                }}>
                  {tempSelectedValues.size}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="filter-dropdown-content">
        <div className="filter-sections-container">
          {/* Left Section - Categories */}
          <div className="filter-section categories-section">
            <div className="filter-section-header" style={{ borderBottom: 'none' }}>
              <div className="filter-dropdown-option select-all-option">
                <span>Categories</span>
              </div>
            </div>
            <div className="filter-section-content">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.key;
                
                return (
                  <div 
                    key={category.key} 
                    className={`category-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => onCategoryChange?.(category.key)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#F3F3FF' : 'transparent',
                      borderRadius: '4px',
                      padding: '8px',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    <span 
                      className="category-name"
                      style={{
                        fontFamily: 'Typeface/family/text',
                        fontWeight: 400,
                        fontStyle: 'Regular',
                        fontSize: '16px',
                        color: isSelected ? '#5D5FEF' : 'inherit',
                      }}
                    >
                      {category.title}
                    </span>
                    <span className="category-count">
                      {category.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Section - Filters */}
          <div className="filter-section filters-section">
            <div className="filter-section-header" style={{ borderBottom: 'none', display: 'flex', justifyContent: 'flex-end' }}>
              <label className="filter-dropdown-option select-all-option">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={() => onSelectAll?.()}
                  style={{
                    borderColor: theme?.table?.filter?.borderColor || '#E5E7EB',
                  }}
                />
                <span>Select All</span>
              </label>
            </div>
            <div 
              className="filter-section-content"
              style={{
                height: '300px',
                overflowY: 'auto',
              }}
            >
              {categoryFilterOptions.map((option) => {
                const isSelected = tempSelectedValues.has(option.value);
                
                return (
                  <label 
                    key={option.value.toString()} 
                    className={`filter-dropdown-option ${isSelected ? 'selected' : ''}`}
                    style={{
                      color: theme?.colors?.textColor || '#333333',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onOptionChange?.(option.value)}
                      style={{
                        borderColor: theme?.table?.filter?.borderColor || '#E5E7EB',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Typeface/family/text',
                        fontWeight: 400,
                        fontStyle: 'Regular',
                        fontSize: 'Typeface/Size/lg',
                        lineHeight: 'Typeface/line-height/line-height-500',
                        letterSpacing: 'Typeface/letter-spacing/-normal',
                      }}
                    >
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="filter-dropdown-footer">
        <button 
          className="filter-reset-btn"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
        <div className="filter-action-buttons">
          <button 
            className="filter-cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            className="filter-apply-btn"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}; 