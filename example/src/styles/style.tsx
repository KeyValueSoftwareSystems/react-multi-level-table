import { createComponentStyles } from './componentStyles';

// Typography System
export const typography = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  lineHeight: {
    lineHeight500: "1.5",
    lineHeight600: "1.6"
  },
  letterSpacing: {
    dense: "-0.025em",
    normal: "normal"
  },
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px"
  },
  fontWeight: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  }
};

// Color System
export const colors = {
  // Text Colors
  textDefault: "#262626",
  textPrimary: "#101828",
  textSecondary: "#667085",
  textMuted: "#8C8C8C",
  
  // Background Colors
  backgroundLight: "#F3F3FF",
  backgroundWhite: "#FFFFFF",
  backgroundGray: "#F5F5F5",
  
  // Status Colors
  status: {
    active: {
      background: "#05A557",
      text: "#FFFFFF"
    },
    inactive: {
      background: "#D9D9D9",
      text: "#1F1F1F"
    },
    pending: {
      background: "#FFEFCF",
      text: "#1F1F1F"
    },
    processing: {
      background: "#B8D9FF",
      text: "#1F1F1F"
    },
    provisioning: {
      background: "#FFEFCF",
      text: "#1F1F1F"
    }
  },
  
  // Border Colors
  borderLight: "#D9D9D9",
  borderMedium: "#E2E8F0",
  borderDark: "#262626",
  borderFilter: "#F0F0F0",
  
  // Theme Colors
  primary: "#5D5FEF",
  secondary: "#E3F2FD",
  accent: "#BBDEFB",
  
  // Specific UI Colors
  tableTitle: "#101828",
  tableHeader: "#000000",
  tableHeaderText: "#000000",
  pageTotal: "#000000",
  selectedPage: "#5D5FEF",
  filterSelected: "#5D5FEF",
  resetFilter: "#8C8C8C",
  searchBorder: "#D9D9D9"
};

// Component Styles
export const componentStyles = createComponentStyles(colors);

// Layout Styles
export const layoutStyles = {
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  flexBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  flexStart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  flexEnd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  }
};

// Utility Functions
export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Active':
      return { backgroundColor: colors.status.active.background, color: colors.status.active.text };
    case 'Inactive':
      return { backgroundColor: colors.status.inactive.background, color: colors.status.inactive.text };
    case 'Pending':
      return { backgroundColor: colors.status.pending.background, color: colors.status.pending.text };
    case 'Processing':
      return { backgroundColor: colors.status.processing.background, color: colors.status.processing.text };
    case 'Provisioning':
      return { backgroundColor: colors.status.provisioning.background, color: colors.status.provisioning.text };
    default:
      return { backgroundColor: colors.backgroundGray, color: colors.textMuted };
  }
};

// Typography styles for table row texts
export const tableRowTypography = {
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '16px', // lg size
  lineHeight: '24px', // line-height-500
  letterSpacing: '0px', // normal letter spacing
  verticalAlign: 'middle',
  color: '#262626'
};

// Style Objects for Direct Use
export const styles = {
  typography,
  colors,
  componentStyles,
  layoutStyles,
  getStatusStyle
};

export default styles; 