
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Category, GratitudeEntry } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabaseService } from '@/lib/supabaseService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GratitudeFormProps {
  onComplete?: () => void;
  entry?: GratitudeEntry;
  isEdit?: boolean;
}

const GratitudeForm: React.FC<GratitudeFormProps> = ({ 
  onComplete, 
  entry,
  isEdit = false 
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [content, setContent] = useState(entry?.content || '');
  const [category, setCategory] = useState<Category>(entry?.category || 'gratitude');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<Category[]>(['gratitude']);

  useEffect(() => {
    // Update available categories based on user's unlocked challenges
    if (user) {
      const unlockedCategories = user.challenges
        .filter(challenge => challenge.unlocked)
        .map(challenge => challenge.category);
      
      setAvailableCategories(unlockedCategories as Category[]);
      
      // If current category is not available, set to first available
      if (!unlockedCategories.includes(category)) {
        setCategory(unlockedCategories[0] as Category);
      }
    }
  }, [user, category]);

  const getCategoryEmoji = (categoryId: Category): string => {
    const categoryMap: Record<Category, string> = {
      "gratitude": "♥️",
      "self-admiration": "✨",
      "self-appreciation": "🌟",
      "others-admiration": "👏"
    };
    
    return categoryMap[categoryId];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (content.trim().length < 3) {
      toast({ 
        title: t("common.error"), 
        description: "Text musí obsahovat alespoň 3 znaky", 
        variant: "destructive" 
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEdit && entry) {
        // Update existing entry
        await supabaseService.updateEntry({
          id: entry.id,
          content,
          category,
        });
        
        toast({ title: t("common.success"), description: "Záznam byl úspěšně aktualizován" });
      } else {
        // Create new entry
        await supabaseService.createEntry({
          user_id: user.id,
          content,
          category,
        });
        
        toast({ title: t("common.success"), description: "Záznam byl úspěšně uložen" });
      }
      
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error saving gratitude entry:', error);
      toast({ 
        title: t("common.error"), 
        description: "Nepodařilo se uložit záznam", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{isEdit ? t("common.edit") : t("home.addEntry")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">{t("home.category")}</Label>
            <Select 
              value={category} 
              onValueChange={(value) => setCategory(value as Category)}
              disabled={isEdit}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder={t("home.category")} />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {getCategoryEmoji(cat)} {t(`category.${cat}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">{t("home.content")}</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-32"
              placeholder="Dnes jsem vděčný/á za..."
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onComplete}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("common.loading") : t("common.save")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default GratitudeForm;
