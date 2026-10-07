import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark-classic' | 'mint-green';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'sonrisa-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored && ['light', 'dark-classic', 'mint-green'].includes(stored)) {
        return stored;
      }
    }
    return 'light';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  const isDark = theme === 'dark-classic' || theme === 'mint-green';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark-classic', 'theme-mint-green');
    if (theme === 'light') {
      root.classList.add('theme-light');
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
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

export function useRouteTheme() {
  const { theme, setTheme, isDark } = useTheme();
  
  useEffect(() => {
    const path = window.location.pathname;
    const isAdminRoute = path.startsWith('/admin');
    
    if (isAdminRoute && theme === 'light') {
      setTheme('dark-classic');
    } else if (!isAdminRoute && isDark) {
      setTheme('light');
    }
  }, [theme, setTheme, isDark]);

  return { theme, setTheme, isDark };
}