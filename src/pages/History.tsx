
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { GratitudeEntry, Category } from '../types';
import { supabaseService } from '../lib/supabaseService';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EntryCard from '../components/EntryCard';
import { format } from 'date-fns';

const History: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Category | 'all'>('all');

  const fetchEntries = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const allEntries = await supabaseService.getEntries(user.id);
      setEntries(allEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const filteredEntries = useMemo(() => {
    if (filter === 'all') {
      return entries;
    } else {
      return entries.filter(entry => entry.category === filter);
    }
  }, [entries, filter]);

  const getCategoryEmoji = (categoryId: Category): string => {
    const categoryMap: Record<Category, string> = {
      "gratitude": "♥️",
      "self-admiration": "✨",
      "self-appreciation": "🌟",
      "others-admiration": "👏"
    };
    
    return categoryMap[categoryId];
  };

  const handleExport = () => {
    if (filteredEntries.length === 0) return;

    const formatEntryForExport = (entry: GratitudeEntry): string => {
      const date = format(new Date(entry.created_at), 'yyyy-MM-dd HH:mm');
      console.log(entry, "entry for export");
      const category = t(`category.${entry.category}`);
      return `${date} - ${category}\n${entry.content}\n\n`;
    };

    const content = filteredEntries.map(formatEntryForExport).join('');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `gratitude-journal-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Group entries by date
  const entriesByDate = useMemo(() => {
    const grouped = new Map<string, GratitudeEntry[]>();
    
    filteredEntries.forEach(entry => {
      const date = new Date(entry.created_at).toISOString().split('T')[0];
      if (!grouped.has(date)) {
        grouped.set(date, []);
      }
      grouped.get(date)!.push(entry);
    });
    
    return Array.from(grouped.entries())
      .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime());
  }, [filteredEntries]);

  return (
    <div className="container max-w-md mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">{t("history.title")}</h1>
        <p className="text-muted-foreground">{t("history.subtitle")}</p>
      </header>

      <div className="mb-6 flex justify-between items-center">
        <div className="w-1/2">
          <Select value={filter} onValueChange={(value) => setFilter(value as Category | 'all')}>
            <SelectTrigger>
              <SelectValue placeholder={t("history.filter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("history.all")}</SelectItem>
              {(user?.challenges || [])
                .filter(c => c.unlocked)
                .map(challenge => (
                  <SelectItem key={challenge.id} value={challenge.id}>
                    {getCategoryEmoji(challenge.category as Category)} {t(`category.${challenge.category}`)}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleExport}
          disabled={filteredEntries.length === 0}
        >
          {t("history.export")}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p>{t("common.loading")}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {entriesByDate.length === 0 ? (
            <p className="text-center text-muted-foreground">{t("history.noEntries")}</p>
          ) : (
            entriesByDate.map(([date, dayEntries]) => (
              <div key={date}>
                <h2 className="text-lg font-medium mb-2 pl-2 border-l-4 border-primary">
                  {format(new Date(date), 'dd. MM. yyyy')}
                </h2>
                <div className="space-y-3">
                  {dayEntries.map(entry => (
                    <EntryCard 
                      key={entry.id} 
                      entry={entry}
                      onUpdate={fetchEntries}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default History;
