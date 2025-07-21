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
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ 
        transform: getRotation(),
        cursor: onClick ? 'pointer' : 'default',
        ...customStyle
      }}
    >
      <path 
        d="M9 18L15 12L9 6" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}; 