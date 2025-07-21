import DeleteIconSvg from '../../assets/DeleteIcon.svg';

interface DeleteIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  customStyle?: React.CSSProperties;
}

export const DeleteIcon: React.FC<DeleteIconProps> = ({ 
  width = 20, 
  height = 20, 
  color = "#595959",
  className,
  onClick,
  customStyle
}) => {
  return (
    <img 
      src={DeleteIconSvg} 
      alt="Delete"
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      style={{ 
        filter: color !== "#595959" ? `brightness(0) saturate(100%) invert(${color === "#000000" ? 0 : 1})` : undefined,
        cursor: onClick ? 'pointer' : 'default',
        ...customStyle
      }}
    />
  );
}; 