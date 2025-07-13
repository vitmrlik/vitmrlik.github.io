
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeMode, User } from '../types';
import { useAuth } from './AuthContext';
import { supabaseService } from '../lib/supabaseService';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<ThemeMode>(user?.settings?.theme || 'light');

  useEffect(() => {
    // Update theme when user changes
    if (user?.settings?.theme) {
      setThemeState(user.settings.theme);
    }
  }, [user]);

  useEffect(() => {
    // Apply theme to document
    document.body.classList.remove('light', 'dark', 'futuristic');
    document.body.classList.add(theme);
  }, [theme]);

  const setTheme = async (newTheme: ThemeMode): Promise<void> => {
    setThemeState(newTheme);
    
    if (user) {
      const updatedUser: Partial<User> = {
        id: user.id,
        settings: {
          ...user.settings,
          theme: newTheme,
        },
      };
      
      await supabaseService.updateUser(updatedUser);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
