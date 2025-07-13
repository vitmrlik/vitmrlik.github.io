
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { GratitudeEntry } from '../types';
import { supabaseService } from '../lib/supabaseService';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import GratitudeForm from '../components/GratitudeForm';
import EntryCard from '../components/EntryCard';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [todaysEntries, setTodaysEntries] = useState<GratitudeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchTodaysEntries = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const entries = await supabaseService.getEntriesByDate(user.id, today);
      setTodaysEntries(entries);
    } catch (error) {
      console.error('Error fetching today\'s entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysEntries();
  }, [user]);

  const entriesLeft = 3 - todaysEntries.length;

  return (
    <div className="container max-w-md mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">{t("home.title")}</h1>
        <p className="text-muted-foreground">{t("home.subtitle")}</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center">
          <p>{t("common.loading")}</p>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            {/* {entriesLeft > 0 ? (
              <p className="text-center mb-4">
                {t("home.entriesLeft")}
              </p>
            ) : (
              <p className="text-center mb-4 text-green-600">
                {t("home.allEntriesDone")}
              </p>
            )} */}

            {entriesLeft > 0 && (
              <Button 
                className="w-full" 
                onClick={() => setIsFormOpen(true)}
              >
                {t("home.addEntry")}
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {todaysEntries.map(entry => (
              <EntryCard 
                key={entry.id} 
                entry={entry}
                onUpdate={fetchTodaysEntries}
              />
            ))}
          </div>
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md">
          <GratitudeForm
            onComplete={() => {
              setIsFormOpen(false);
              fetchTodaysEntries();
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
