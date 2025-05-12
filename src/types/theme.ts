export type Theme = {
  dark: ThemeProps;
  light: ThemeProps;
};

export interface ThemeProps {
  colors?: {
    background?: string;
    primaryColor?: string;
    borderColor?: string;
  };
  table?: {
    header?: {
      background?: string;
      textColor?: string;
    };
    cell?: {
      textColor?: string;
      borderColor?: string;
    };
    row?: {
      mainBackground?: string;
      nestedBackground?: string;
      expandedBackground?: string;
    };
    filter?: {
      background?: string;
      textColor?: string;
      borderColor?: string;
      focusBorderColor?: string;
      placeholderColor?: string;
    };
  };
  pagination?: {
    button?: {
      background?: string;
      textColor?: string;
      disabledOpacity?: string;
    };
    select?: {
      background?: string;
      textColor?: string;
      borderColor?: string;
    };
    info?: {
      textColor?: string;
    };
  };
  expandIcon?: {
    color?: string;
  };
} 