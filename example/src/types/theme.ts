export interface ThemeProps {
  colors?: {
    background?: string;
    primaryColor?: string;
    textColor?: string;
    borderColor?: string;
  };
  table?: {
    header?: {
      background?: string;
      textColor?: string;
      borderColor?: string;
    };
    cell?: {
      textColor?: string;
      borderColor?: string;
      nestedPadding?: string;
    };
    row?: {
      levelColors?: {background: string}[];
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