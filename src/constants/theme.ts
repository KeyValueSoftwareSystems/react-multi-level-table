import type { ThemeProps } from "../types/theme";

export const defaultTheme: ThemeProps = {
  colors: {
    primaryColor: "#2c3e50",
    textColor: "#2c3e50",
    borderColor: "#e0e0e0",
    background: "#ffffff",
  },
  table: {
    header: {
      background: "#2c3e50",
      textColor: "#ffffff",
      borderColor: "#e0e0e0",
    },
    row: {
      levelColors: [
        { background: "#ffffff" },
        { background: "#f1f3f5" },
        { background: "#f8f9fa" },
      ],
    },
    cell: {
      textColor: "#2c3e50",
      borderColor: "#e0e0e0",
      nestedPadding: "16px",
    },
  },
  pagination: {
    button: {
      background: "#2c3e50",
      textColor: "#ffffff",
      disabledOpacity: "0.5",
    },
    select: {
      background: "#ffffff",
      textColor: "#2c3e50",
      borderColor: "#e0e0e0",
    },
    info: {
      textColor: "#2c3e50",
    },
  },
  expandIcon: {
    color: "#2c3e50",
  },
};
