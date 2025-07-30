import React from 'react';

import { colors } from '../styles/style';
import type { ThemeProps } from '../types/theme';

import '../styles/Button.css';

interface ButtonProps {
  icon?: React.ComponentType<{ width?: number; height?: number }>;
  text: string;
  onClick: () => void;
  theme?: ThemeProps;
  badge?: {
    count: number;
  };
  badgeStyle?: React.CSSProperties;
  disabled?: boolean;
  iconPosition?: 'left' | 'right';
  customStyle?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  text,
  onClick,
  theme,
  badge,
  badgeStyle,
  disabled = false,
  iconPosition = 'left',
  customStyle,
}) => {
  const mergedTheme = theme || {};
  
  const renderIcon = () => {
    return Icon ? <Icon width={16} height={16} /> : null;
  };

  const renderContent = () => {
    const iconElement = renderIcon();
    const textElement = <span>{text}</span>;
    const badgeElement = badge && badge.count > 0 ? (
      <span className="button-badge" style={badgeStyle}>
        {badge.count}
      </span>
    ) : null;

    if (iconPosition === 'right')
      return (
        <>
          {textElement}
          {iconElement}
          {badgeElement}
        </>
      );

    // Default: left position
    return (
      <>
        {iconElement}
        {textElement}
        {badgeElement}
      </>
    );
  };
  
  const buttonClassName = `button ${disabled ? 'button-disabled' : ''}`;
  
  return (
    <button
      className={buttonClassName}
      style={{
        backgroundColor: mergedTheme.colors?.background || colors.backgroundWhite,
        color: mergedTheme.colors?.textColor || colors.borderDark,
        ...customStyle,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
}; 