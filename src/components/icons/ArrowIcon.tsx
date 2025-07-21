import ArrowIconSvg from '../../assets/ArrowIcon.svg';

interface ArrowIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
  customStyle?: React.CSSProperties;
  direction?: 'up' | 'right' | 'down' | 'left';
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ 
  width = 16, 
  height = 16, 
  color = "#262626",
  className,
  onClick,
  customStyle,
  direction = 'right'
}) => {
  // Calculate rotation based on direction
  const getRotation = () => {
    switch (direction) {
      case 'up': return 'rotate(-90deg)';
      case 'right': return 'rotate(0deg)';
      case 'down': return 'rotate(90deg)';
      case 'left': return 'rotate(180deg)';
      default: return 'rotate(0deg)';
    }
  };

  return (
    <img 
      src={ArrowIconSvg} 
      alt={`Arrow ${direction}`}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      style={{ 
        transform: getRotation(),
        filter: color !== "#262626" ? `brightness(0) saturate(100%) invert(${color === "#000000" ? 0 : 1})` : undefined,
        cursor: onClick ? 'pointer' : 'default',
        ...customStyle
      }}
    />
  );
}; 