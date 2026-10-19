import { createContext, useContext, useMemo, useState } from 'react';
import { PALETTES } from './palettes';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');
  const value = useMemo(() => ({
    colors: PALETTES[mode],
    toggleTheme: () => setMode((current) => current === 'dark' ? 'light' : 'dark'),
  }), [mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider.');
  return context;
}
