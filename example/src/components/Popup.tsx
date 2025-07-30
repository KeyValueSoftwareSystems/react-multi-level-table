import React, { useEffect, useRef } from 'react';

import { colors } from '../styles/style';
import type { ThemeProps } from '../types/theme';
import '../styles/Popup.css';

interface PopupButton {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

interface PopupProps {
  isOpen: boolean;
  onClose?: () => void;
  icon?: React.ComponentType<{ width?: number; height?: number }>;
  title?: string;
  text?: string;
  buttons?: PopupButton[];
  theme?: ThemeProps;
}

export const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  icon: Icon,
  title,
  text,
  buttons = [],
  theme,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) 
        onClose?.();
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') 
        onClose?.();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset'; // Restore scrolling
    };
  }, [isOpen, onClose]);

  const renderIcon = () => {
    return Icon ? <Icon width={48} height={48} /> : null;
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div 
        ref={popupRef}
        className="popup-container"
        style={{
          backgroundColor: theme?.colors?.background || colors.backgroundWhite,
          color: theme?.colors?.textColor || colors.borderDark,
        }}
      >
        <div className="popup-header">
          <div className="popup-icon">
            {renderIcon()}
          </div>
          {title && (
            <h3 className="popup-title" style={{ color: theme?.colors?.textColor || colors.borderDark }}>
              {title}
            </h3>
          )}
        </div>
        
        <div className="popup-content">
          {text && (
            <p className="popup-text" style={{ color: theme?.colors?.textColor || colors.borderDark }}>
              {text}
            </p>
          )}
        </div>
        
        <div className="popup-footer">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`popup-button popup-button-${button.variant || 'secondary'}`}
              onClick={button.onClick}
              disabled={button.disabled}
              style={{
                backgroundColor: button.variant === 'primary' 
                  ? (theme?.colors?.primaryColor || colors.primary)
                  : 'transparent',
                color: button.variant === 'primary' 
                  ? '#ffffff'
                  : (theme?.colors?.textColor || colors.borderDark),
                borderColor: theme?.colors?.borderColor || colors.borderFilter,
              }}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 