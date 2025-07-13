
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';
import { supabaseService } from '../lib/supabaseService';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, name: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session from local storage
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem('gratitudeUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    console.log('tady', email, password);
    try {
      const user = await supabaseService.signIn(email, password);
      if (user) {
        setUser(user);
        localStorage.setItem('gratitudeUser', JSON.stringify(user));
        toast({ title: "Přihlášení úspěšné", description: `Vítejte zpět, ${user.name}!` });
        return user;
      } else {
        toast({ 
          title: "Chyba přihlášení", 
          description: "Nesprávné přihlašovací údaje", 
          variant: "destructive" 
        });
        return null;
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast({ 
        title: "Chyba přihlášení", 
        description: "Došlo k neočekávané chybě", 
        variant: "destructive" 
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const user = await supabaseService.signUp(email, password, name);
      if (user) {
        setUser(user);
        localStorage.setItem('gratitudeUser', JSON.stringify(user));
        toast({ title: "Registrace úspěšná", description: `Vítejte, ${name}!` });
        return user;
      } else {
        toast({ 
          title: "Chyba registrace", 
          description: "Nepodařilo se vytvořit uživatele", 
          variant: "destructive" 
        });
        return null;
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast({ 
        title: "Chyba registrace", 
        description: "Došlo k neočekávané chybě", 
        variant: "destructive" 
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabaseService.signOut();
      localStorage.removeItem('gratitudeUser');
      setUser(null);
      toast({ title: "Odhlášení úspěšné", description: "Děkujeme za návštěvu!" });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({ 
        title: "Chyba odhlášení", 
        description: "Došlo k neočekávané chybě", 
        variant: "destructive" 
      });
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const success = await supabaseService.resetPassword(email);
      if (success) {
        toast({ 
          title: "Email odeslán", 
          description: "Pokyny k obnovení hesla byly odeslány na váš email" 
        });
        return true;
      } else {
        toast({ 
          title: "Chyba", 
          description: "Nepodařilo se odeslat email pro obnovení hesla", 
          variant: "destructive" 
        });
        return false;
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast({ 
        title: "Chyba", 
        description: "Došlo k neočekávané chybě", 
        variant: "destructive" 
      });
      return false;
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
