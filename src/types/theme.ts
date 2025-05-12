export type Theme = {
  dark: ThemeProps;
  light: ThemeProps;
};

export type ThemeProps = {
  colors?: {
    primaryColor?: string;
    textColor?: string;
    borderColor?: string;
    background?: string;
  };
  table?: {
    header?: {
      background?: string;
      textColor?: string;
      borderColor?: string;
    };
    row?: {
      mainBackground?: string;
      nestedBackground?: string;
      expandedBackground?: string;
      hoverBackground?: string;
    };
    cell?: {
      textColor?: string;
      borderColor?: string;
      nestedPadding?: string;
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
  status?: {
    active?: {
      background?: string;
      textColor?: string;
    };
    inactive?: {
      background?: string;
      textColor?: string;
    };
    pending?: {
      background?: string;
      textColor?: string;
    };
  };
}; 