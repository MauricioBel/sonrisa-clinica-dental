import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeType = 'dark-classic' | 'mint-green';

interface ThemeContextValue {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'sonrisa-admin-theme';
const DEFAULT_THEME: ThemeType = 'dark-classic';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
      if (stored && (stored === 'dark-classic' || stored === 'mint-green')) {
        return stored;
      }
    }
    return DEFAULT_THEME;
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark-classic' ? 'mint-green' : 'dark-classic');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-dark-classic', 'theme-mint-green');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}