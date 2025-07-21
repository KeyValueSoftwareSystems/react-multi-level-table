import React, { useEffect, useState } from 'react';

import { SidePanelInput } from './SidePanelInput';
import { createComponentStyles } from '../styles/componentStyles';
import { getStatusStyle } from '../styles/style';
import type { ThemeProps } from '../types/theme';
import type { DataItem } from '../types/types';

import '../styles/SidePanel.css';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  item: DataItem | null;
  theme: ThemeProps;
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
  const styles = createComponentStyles(theme);

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
        ...styles.statusBadge.base,
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
      <div style={styles.resourceTypeDisplay.container}>
        <div style={{
          ...styles.resourceTypeDisplay.icon,
          ...(imageURL ? styles.resourceTypeDisplay.iconWithImage : styles.resourceTypeDisplay.iconWithoutImage)
        }}>
          {imageURL ? (
            <img 
              src={imageURL} 
              alt={value}
              style={styles.resourceTypeDisplay.image}
            />
          ) : (
            firstLetter
          )}
        </div>
        <span style={styles.resourceTypeDisplay.text}>{value}</span>
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="side-panel-overlay"
        onClick={onClose}
        style={styles.sidePanel.overlay}
      />
      
      {/* Side Panel */}
      <div 
        className="side-panel"
        style={{
          ...styles.sidePanel.container,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Header */}
        <div style={styles.sidePanel.header}>
          <h2 style={styles.sidePanel.title}>
            Resource Details
          </h2>
          <button
            onClick={onClose}
            style={styles.sidePanel.closeButton}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={styles.sidePanel.content}>
          {/* Resource Type */}
          <div style={styles.sidePanel.fieldContainer}>
            <label style={styles.sidePanel.label}>
              Resource Type
            </label>
            <ResourceTypeDisplay 
              value={item.resourceType} 
              imageURL={item.imageURL}
            />
          </div>

          {/* ID */}
          <div style={styles.sidePanel.fieldContainer}>
            <label style={styles.sidePanel.label}>
              ID *
            </label>
            <div style={styles.sidePanel.idField}>
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
          <div style={styles.sidePanel.fieldContainer}>
            <label style={styles.sidePanel.label}>
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
        <div style={styles.sidePanel.footer}>
          <button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            style={{
              ...styles.sidePanel.saveButton,
              ...(hasChanges ? styles.sidePanel.saveButtonEnabled : styles.sidePanel.saveButtonDisabled),
            }}
            onMouseEnter={(e) => {
              if (hasChanges) 
                e.currentTarget.style.backgroundColor = '#1565c0';
            }}
            onMouseLeave={(e) => {
              if (hasChanges) 
                e.currentTarget.style.backgroundColor = theme.colors?.primaryColor || '#1976d2';
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}; 