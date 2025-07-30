import React, { useState, useEffect } from 'react';

import { SidePanelInput } from './SidePanelInput';
import type { DataItem } from '../types/types';
import type { ThemeProps } from '../types/theme';
import { componentStyles, getStatusStyle } from '../styles/style';
import '../styles/SidePanel.css';

interface SidePanelProps {
  isOpen: boolean;
  onClose?: () => void;
  item: DataItem | null;
  theme?: ThemeProps;
  // Editability props for each field
  isNameEditable?: boolean;
  isDateTimeEditable?: boolean;
  isOrchestrationEditable?: boolean;
  isStatusEditable?: boolean;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  item,
  theme,
  isNameEditable = true,
  isDateTimeEditable = true,
  isOrchestrationEditable = true,
  isStatusEditable = false, // Status is typically not editable
}) => {
  const [formData, setFormData] = useState<Partial<DataItem>>({});

  // Prevent body scroll when side panel is open
  useEffect(() => {
    if (isOpen) 
      document.body.classList.add('side-panel-open');
    else 
      document.body.classList.remove('side-panel-open');

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('side-panel-open');
    };
  }, [isOpen]);

  // Initialize form data when item changes
  React.useEffect(() => {
    if (item) 
      setFormData({
        name: item.name,
        dateTime: item.dateTime,
        orchestration: item.orchestration,
      });
    
  }, [item]);

  // Check if there are any changes
  const hasChanges = React.useMemo(() => {
    if (!item) return false;

    return (
      formData.name !== item.name ||
      formData.dateTime !== item.dateTime ||
      formData.orchestration !== item.orchestration
    );
  }, [formData, item]);

  if (!isOpen || !item) return null;

  const handleInputChange = (field: keyof DataItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Here you would typically call an API to save the changes
    console.log('Saving changes:', formData);
    alert('Changes saved successfully!');
    // You could also close the panel or show a success message
  };

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const style = getStatusStyle(status);
    
    return (
      <span style={{ 
        ...componentStyles.statusBadge.base,
        ...style
      }}>
        {status}
      </span>
    );
  };

  const ResourceTypeDisplay: React.FC<{ value: string; imageURL?: string }> = ({
    value,
    imageURL,
  }) => {
    const firstLetter = value.charAt(0).toUpperCase();
    
    return (
      <div style={componentStyles.resourceTypeDisplay.container}>
        <div style={{
          ...componentStyles.resourceTypeDisplay.icon,
          ...(imageURL ? componentStyles.resourceTypeDisplay.iconWithImage : componentStyles.resourceTypeDisplay.iconWithoutImage)
        }}>
          {imageURL ? (
            <img 
              src={imageURL} 
              alt={value}
              style={componentStyles.resourceTypeDisplay.image}
            />
          ) : (
            firstLetter
          )}
        </div>
        <span style={componentStyles.resourceTypeDisplay.text}>{value}</span>
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="side-panel-overlay"
        onClick={onClose}
        style={componentStyles.sidePanel.overlay}
      />
      
      {/* Side Panel */}
      <div 
        className="side-panel"
        style={{
          ...componentStyles.sidePanel.container,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Header */}
        <div style={componentStyles.sidePanel.header}>
          <h2 style={componentStyles.sidePanel.title}>
            Resource Details
          </h2>
          <button
            onClick={onClose}
            style={componentStyles.sidePanel.closeButton}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={componentStyles.sidePanel.content}>
          {/* Resource Type */}
          <div style={componentStyles.sidePanel.fieldContainer}>
            <label style={componentStyles.sidePanel.label}>
              Resource Type
            </label>
            <ResourceTypeDisplay 
              value={item.resourceType} 
              imageURL={item.imageURL}
            />
          </div>

          {/* ID */}
          <div style={componentStyles.sidePanel.fieldContainer}>
            <label style={componentStyles.sidePanel.label}>
              ID *
            </label>
            <div style={componentStyles.sidePanel.idField}>
              {item.id}
            </div>
          </div>

          {/* Name */}
          <SidePanelInput
            label="Name"
            value={formData.name || ''}
            onChange={(value) => handleInputChange('name', value)}
            isEditable={isNameEditable}
            placeholder="Enter name"
            theme={theme}
          />

          {/* Date & Time */}
          <SidePanelInput
            label="Date & Time"
            value={formData.dateTime || ''}
            onChange={(value) => handleInputChange('dateTime', value)}
            isEditable={isDateTimeEditable}
            placeholder="Enter date and time"
            theme={theme}
          />

          {/* Status */}
          <div style={componentStyles.sidePanel.fieldContainer}>
            <label style={componentStyles.sidePanel.label}>
              Status
            </label>
            {isStatusEditable ? (
              <SidePanelInput
                label=""
                value={formData.status || item.status}
                onChange={(value) => handleInputChange('status', value)}
                isEditable={true}
                placeholder="Enter status"
                theme={theme}
              />
            ) : (
              <StatusBadge status={item.status} />
            )}
          </div>

          {/* Orchestration */}
          <SidePanelInput
            label="Orchestration"
            value={formData.orchestration || ''}
            onChange={(value) => handleInputChange('orchestration', value)}
            isEditable={isOrchestrationEditable}
            placeholder="Enter orchestration"
            theme={theme}
          />
        </div>

        {/* Footer with Save Changes Button */}
        <div style={componentStyles.sidePanel.footer}>
          <button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            style={{
              ...componentStyles.sidePanel.saveButton,
              ...(hasChanges ? componentStyles.sidePanel.saveButtonEnabled : componentStyles.sidePanel.saveButtonDisabled),
            }}
            onMouseEnter={(e) => {
              if (hasChanges) 
                e.currentTarget.style.backgroundColor = '#1565c0';
            }}
            onMouseLeave={(e) => {
              if (hasChanges) 
                e.currentTarget.style.backgroundColor = theme?.colors?.primaryColor || '#1976d2';
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}; 