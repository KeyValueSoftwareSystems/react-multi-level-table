import type { ThemeProps } from "../types/theme";

export const defaultTheme: ThemeProps = {
  colors: {
    primaryColor: "#5D5FEF",
    textColor: "#262626",
    borderColor: "#262626",
    background: "#ffffff",
  },
  table: {
    header: {
      background: "#ffffff",
      textColor: "#000000",
      borderColor: "#262626",
    },
    row: {
      levelColors: [
        { background: "#ffffff" },
        { background: "#f1f3f5" },
        { background: "#f8f9fa" },
      ],
    },
    cell: {
      textColor: "#262626",
      borderColor: "#D9D9D9",
      nestedPadding: "16px",
    },
  },
  pagination: {
    button: {
      background: "#ffffff",
      textColor: "#262626",
      disabledOpacity: "0.5",
    },
    select: {
      background: "#ffffff",
      textColor: "#262626",
      borderColor: "#262626",
    },
    info: {
      textColor: "#000000",
    },
  },
  expandIcon: {
    color: "#262626",
  },
};
