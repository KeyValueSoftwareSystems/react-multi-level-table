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
export const componentStyles = {
  // Badge Styles
  badge: {
    count: {
      width: "34px",
      height: "22px",
      borderRadius: "50px",
      opacity: 1,
      padding: "1px 8px 1px 8px",
      border: "1px solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.regular,
      fontStyle: "normal",
      lineHeight: typography.lineHeight.lineHeight500,
      letterSpacing: typography.letterSpacing.dense,
      textAlign: "center" as const,
      backgroundColor: colors.backgroundLight,
      color: colors.textDefault
    },
    status: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.regular,
      padding: "4px 8px",
      borderRadius: "12px"
    }
  },
  
  // Title Styles
  title: {
    table: {
      margin: 0,
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeight.semibold,
      fontStyle: "normal",
      fontSize: typography.fontSize.xl,
      lineHeight: typography.lineHeight.lineHeight600,
      letterSpacing: typography.letterSpacing.dense,
      color: colors.tableTitle,
      whiteSpace: "nowrap" as const
    }
  },
  
  // Button Styles
  button: {
    base: {
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontFamily: typography.fontFamily,
      fontWeight: "600",
      fontStyle: "normal",
      fontSize: typography.fontSize.lg,
      lineHeight: typography.lineHeight.lineHeight500,
      letterSpacing: typography.letterSpacing.normal,
      textAlign: "center" as const,
      verticalAlign: "middle" as const,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: `1px solid ${colors.borderDark}`,
      transition: "all 0.2s ease",
      opacity: 1,
      backgroundColor: colors.backgroundWhite,
      color: colors.borderDark
    },
    primary: {
      backgroundColor: colors.primary,
      color: "#FFFFFF",
      borderColor: colors.primary
    },
    secondary: {
      backgroundColor: colors.backgroundWhite,
      color: colors.textPrimary,
      borderColor: colors.borderDark
    }
  },
  
  // Spacing System
  spacing: {
    xxs: "4px",
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "20px",
    xl: "24px"
  },
  
  // Border Radius System
  borderRadius: {
    xsm: "2px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px"
  },
  
  // Input Styles
  input: {
    search: {
      width: "100%",
      height: "48px",
      borderRadius: "8px", // Corner radius/md
      gap: "8px",
      opacity: 1,
      padding: "4px 12px 4px 12px", // Spacing/xxs top&bottom, Spacing/sm left&right
      border: "1px solid",
      fontSize: typography.fontSize.sm,
      outline: "none",
      transition: "border 0.2s",
      boxSizing: "border-box" as const
    },
    searchContainer: {
      position: "relative" as const,
      width: "100%",
      height: "48px"
    },
    searchIcon: {
      position: "absolute" as const,
      left: "12px", // Spacing/sm
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none" as const,
      display: "flex",
      alignItems: "center",
      zIndex: 1
    }
  },
  
  // Resource Type Cell Styles
  resourceTypeCell: {
    container: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium
    },
    icon: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      border: "2px solid"
    },
    iconWithImage: {
      backgroundColor: "transparent",
      color: "transparent",
      border: "none"
    },
    iconWithoutImage: {
      backgroundColor: colors.secondary,
      color: colors.primary,
      borderColor: colors.accent
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover" as const,
      objectPosition: "center"
    }
  },
  
  // Pagination Styles
  pagination: {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      padding: "36px 0",
      width: "100%",
      position: "relative"
    },
    totalItems: {
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeight.regular,
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.lineHeight500,
      letterSpacing: typography.letterSpacing.dense,
      color: colors.borderDark,
      position: "absolute",
      left: "0"
    },
    navigation: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      justifyContent: "center"
    },
    pageButton: {
      width: "32px",
      height: "32px",
      borderRadius: "2px",
      padding: "6px",
      border: "1px solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeight.regular,
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.lineHeight500,
      letterSpacing: typography.letterSpacing.dense,
      textAlign: "center" as const,
      transition: "all 0.2s ease"
    },
    pageButtonSelected: {
      width: "32px",
      height: "32px",
      borderRadius: "4px",
      padding: "6px",
      border: "1px solid",
      borderColor: colors.primary,
      color: colors.primary,
      backgroundColor: "transparent",
      fontFamily: typography.fontFamily,
      fontWeight: "600",
      fontStyle: "normal",
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.lineHeight500,
      letterSpacing: typography.letterSpacing.dense,
      textAlign: "center" as const,
      opacity: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    pageButtonUnselected: {
      borderColor: "transparent",
      color: colors.borderDark,
      backgroundColor: "transparent"
    },
    arrowButton: {
      width: "32px",
      height: "32px",
      borderRadius: "2px",
      padding: "6px",
      border: "1px solid transparent",
      backgroundColor: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: colors.borderDark,
      transition: "all 0.2s ease"
    },
    pageSizeSelect: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeight.regular,
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.lineHeight500,
      letterSpacing: typography.letterSpacing.dense,
      color: colors.borderDark,
      position: "absolute",
      right: "0"
    }
  }
};

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