import React, { useEffect } from 'react';

import { DetailRow } from './DetailRow';
import type { DataItem } from '../types/types';
import type { ThemeProps } from '../types/theme';
import { getStatusStyle, tableRowTypography } from '../styles/style';
import '../styles/RowDetailsPopup.css';

interface RowDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  item: DataItem | null;
  theme: ThemeProps;
}

export const RowDetailsPopup: React.FC<RowDetailsPopupProps> = ({
  isOpen,
  onClose,
  item,
  theme,
}) => {
  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) 
      document.body.classList.add('popup-open');
    else 
      document.body.classList.remove('popup-open');

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const style = getStatusStyle(status);
    
    return (
      <span className="status-badge" style={style}>
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
      <div className="resource-type-container">
        <div className={`resource-type-icon ${imageURL ? 'resource-type-icon-with-image' : 'resource-type-icon-without-image'}`}>
          {imageURL ? (
            <img 
              src={imageURL} 
              alt={value}
              className="resource-type-image"
            />
          ) : (
            firstLetter
          )}
        </div>
        <span style={tableRowTypography}>{value}</span>
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="row-details-popup-overlay"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div 
        className="row-details-popup"
        style={{
          backgroundColor: theme.colors?.background || '#ffffff',
        }}
      >
        {/* Header */}
        <div 
          className="row-details-popup-header"
          style={{
            borderBottomColor: theme.colors?.borderColor || '#e0e0e0',
          }}
        >
          <h2 
            className="row-details-popup-title"
            style={{
              color: theme.colors?.textColor || '#333333',
            }}
          >
            Resource Details
          </h2>
          <button
            onClick={onClose}
            className="row-details-popup-close-button"
            style={{
              color: theme.colors?.textColor || '#333333',
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="row-details-popup-content">
          {/* Resource Type */}
          <DetailRow 
            label="Resource Type" 
            value={<ResourceTypeDisplay value={item.resourceType} imageURL={item.imageURL} />}
            theme={theme}
          />

          {/* ID */}
          <DetailRow 
            label="ID" 
            value={
              <span 
                className="detail-row-value-monospace"
                style={{
                  color: theme.colors?.textColor || '#666666',
                }}
              >
                {item.id}
              </span>
            }
            theme={theme}
          />

          {/* Name */}
          <DetailRow 
            label="Name" 
            value={item.name}
            theme={theme}
          />

          {/* Date & Time */}
          <DetailRow 
            label="Date & Time" 
            value={item.dateTime}
            theme={theme}
          />

          {/* Status */}
          <DetailRow 
            label="Status" 
            value={<StatusBadge status={item.status} />}
            theme={theme}
          />

          {/* Orchestration */}
          <DetailRow 
            label="Orchestration" 
            value={item.orchestration}
            theme={theme}
          />

          {/* Children Count (if applicable) */}
          {item.children && (
            <DetailRow 
              label="Child Resources" 
              value={
                <span 
                  className="detail-row-value-small"
                  style={{
                    color: theme.colors?.textColor || '#666666',
                  }}
                >
                  {item.children.length} item{item.children.length !== 1 ? 's' : ''}
                </span>
              }
              theme={theme}
            />
          )}

          {/* Show Action Buttons */}
          <DetailRow 
            label="Actions Available" 
            value={
              <span className={`detail-row-value-status ${item.showActionButtons ? 'detail-row-value-status-yes' : 'detail-row-value-status-no'}`}>
                {item.showActionButtons ? 'Yes' : 'No'}
              </span>
            }
            theme={theme}
          />
        </div>

        {/* Footer */}
        <div 
          className="row-details-popup-footer"
          style={{
            borderTopColor: theme.colors?.borderColor || '#e0e0e0',
          }}
        >
          <button
            onClick={onClose}
            className="row-details-popup-close-action"
            style={{
              color: theme.colors?.textColor || '#666666',
              borderColor: theme.colors?.borderColor || '#e0e0e0',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}; 