
export type ThemeMode = 'light' | 'dark' | 'futuristic';
export type Language = 'en' | 'cs';

export type Category = 'gratitude' | 'self-admiration' | 'self-appreciation' | 'others-admiration';

export interface Challenge {
  category: Category;
  completed: boolean;
  current_streak: number;
  days_completed: number;
  days_required: number;
  emoji: string;
  id: Category;
  max_streak: number;
  name: string;
  unlocked: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  challenges?: Challenge[];
  settings?: {
    theme: ThemeMode;
    language: Language;
    notificationsEnabled: boolean;
    notificationTime: string;
  };
}

export interface GratitudeEntry {
  id?: string;
  user_id: string;
  category: Category;
  content: string;
  created_at?: string;
  updated_at?: string;
}
