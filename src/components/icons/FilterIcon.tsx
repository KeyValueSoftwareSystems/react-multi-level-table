import FilterIconSvg from '../../assets/FilterIcon.svg';

interface FilterIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  customStyle?: React.CSSProperties;
}

export const FilterIcon: React.FC<FilterIconProps> = ({ 
  width = 20, 
  height = 20, 
  color = "#595959",
  className,
  customStyle
}) => {
  return (
    <img 
      src={FilterIconSvg} 
      alt="Filter"
      width={width}
      height={height}
      className={className}
      style={{ 
        filter: color !== "#595959" ? `brightness(0) saturate(100%) invert(${color === "#000000" ? 0 : 1})` : undefined,
        ...customStyle
      }}
    />
  );
}; 