
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Language, User } from '../types';
import { useAuth } from './AuthContext';
import { supabaseService } from '../lib/supabaseService';
import { translations } from '../data/translations';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  setLanguage: (language: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [language, setLanguageState] = useState<Language>(user?.settings?.language || 'cs');

  useEffect(() => {
    // Update language when user changes
    if (user?.settings?.language) {
      setLanguageState(user.settings.language);
    }
  }, [user]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const setLanguage = async (newLanguage: Language): Promise<void> => {
    setLanguageState(newLanguage);
    
    if (user) {
      const updatedUser: Partial<User> = {
        id: user.id,
        settings: {
          ...user.settings,
          language: newLanguage,
        },
      };
      
      await supabaseService.updateUser(updatedUser);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
