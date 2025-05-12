import React, { createContext, useCallback, useContext, useState } from 'react';

import { defaultTheme } from '../constants/theme';
import type { Theme, ThemeProps } from '../types/theme';

interface ThemeContextType {
  theme: ThemeProps;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  customTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, customTheme = defaultTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? customTheme.dark : customTheme.light;

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}; 