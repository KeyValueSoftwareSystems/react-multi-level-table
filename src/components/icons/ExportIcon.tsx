import ExportIconSvg from '../../assets/ExportIcon.svg';

interface ExportIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  customStyle?: React.CSSProperties;
}

export const ExportIcon: React.FC<ExportIconProps> = ({ 
  width = 20, 
  height = 20, 
  color = "#595959",
  className,
  customStyle
}) => {
  return (
    <img 
      src={ExportIconSvg} 
      alt="Export"
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