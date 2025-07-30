import React from 'react';

import { Button } from './Button';
import type { ThemeProps } from '../types/theme';
import type { ButtonConfig } from '../types/types';

interface ButtonGroupProps {
  buttons: ButtonConfig[];
  theme?: ThemeProps;
  onDropdownToggle?: (buttonId: string, isOpen: boolean) => void;
  onDropdownClose?: (buttonId: string) => void;
  openDropdowns?: Set<string>;
  onButtonClick?: (button: ButtonConfig) => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ 
  buttons, 
  theme, 
  onDropdownToggle,
  onDropdownClose,
  openDropdowns = new Set(),
  onButtonClick
}) => {

  const toggleDropdown = (buttonId: string) => {
    if (onDropdownToggle) {
      const isCurrentlyOpen = openDropdowns.has(buttonId);

      onDropdownToggle(buttonId, !isCurrentlyOpen);
    }
  };

  const closeDropdown = (buttonId: string) => {
    if (onDropdownClose)
      onDropdownClose(buttonId);
  };

  const handleButtonClick = (button: ButtonConfig) => {
    if (onButtonClick)
      onButtonClick(button);
    else 
      // Fallback to internal logic if no handler provided
      if (button.dropdown) 
        toggleDropdown(button.id);
      else if (button.onClick) 
        button.onClick();
    
  };

  const renderDropdown = (button: ButtonConfig) => {
    if (!button.dropdown || !openDropdowns.has(button.id)) return null;

    const { component: DropdownComponent, props } = button.dropdown;

    return (
      <DropdownComponent
        {...props}
        onClose={() => closeDropdown(button.id)}
        theme={theme}
      />
    );
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
      {buttons.map((button) => (
        <div key={button.id} style={{ position: 'relative', flexShrink: 0 }}>
          <Button
            icon={button.icon}
            text={button.text}
            onClick={() => handleButtonClick(button)}
            theme={theme}
            badge={button.badge}
            badgeStyle={button.badgeStyle}
            disabled={button.disabled}
            iconPosition={button.iconPosition}
            customStyle={button.customStyle}
          />
          {renderDropdown(button)}
        </div>
      ))}
    </div>
  );
}; 