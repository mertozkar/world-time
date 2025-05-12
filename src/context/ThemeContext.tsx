import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../users.json';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  themeVars: Record<string, string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Başlangıç teması
  const getInitialTheme = (): 'light' | 'dark' => {
    const id = localStorage.getItem('id');
    const user = id === 'guest' ? { theme: 'light' } : (usersData as any[]).find((u) => u.id === Number(id));
    return user?.theme || 'light'; // Varsayılan olarak 'light' döner
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme());

  // Tema değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Tema değişkenleri
  const themeVars = theme === 'light'
    ? {
      background: '#fafcff',
      header: '#d4def1',
      text: '#000',
      card: '#d4def1',
      cardText: '#000',
      border: '#22318c',
      accent: '#22318c',
      inputBg: '#fff',
      inputText: '#22318c',
      buttonBg: '#22318c',
      buttonText: '#fff',
      modeButton:'#000',
      modeButtonBorder:'#00000050',
      clockBoxBackground:'#fff',
      clockBoxBorder:'#000',
      }
    : {
      background: '#002359',
      header: '#293a89',
      text: '#fff',
      card: '#293a89',
      cardText: '#fff',
      border: '#fff',
      accent: '#fff',
      inputBg: '#fff',
      inputText: '#22318c',
      buttonBg: '#fff',
      buttonText: '#22318c',
      modeButton:'#fff',
      modeButtonBorder:'#ffffff50',
      clockBoxBackground:'#293a89',
      clockBoxBorder:'#293a89',
      };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeVars }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};