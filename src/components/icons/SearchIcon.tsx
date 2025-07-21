import SearchIconSvg from '../../assets/SearchIcon.svg';

interface SearchIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  customStyle?: React.CSSProperties;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = "#595959",
  className,
  customStyle
}) => {
  return (
    <img 
      src={SearchIconSvg} 
      alt="Search"
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