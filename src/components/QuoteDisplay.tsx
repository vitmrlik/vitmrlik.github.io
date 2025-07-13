
import React, { useEffect, useState } from 'react';
import { quotes } from '../data/quotes';
import { useLanguage } from '../contexts/LanguageContext';

interface QuoteDisplayProps {
  onComplete?: () => void;
  duration?: number;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ onComplete, duration = 10000 }) => {
  const { language } = useLanguage();
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);

  useEffect(() => {
    // Filter quotes based on language
    const languageQuotes = quotes.filter(q => {
      if (language === 'cs') {
        // Czech quotes often start with "V" for "Vděčnost"
        return q.text.startsWith('V');
      } else {
        // English quotes often start with "G" for "Gratitude"
        return q.text.startsWith('G');
      }
    });

    // Get a random quote
    const randomIndex = Math.floor(Math.random() * languageQuotes.length);
    const selectedQuote = languageQuotes[randomIndex] || quotes[0];
    setQuote(selectedQuote);

    // Set timer for quote display
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [language, onComplete, duration]);

  if (!quote) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in">
      <div className="max-w-md text-center">
        <p className="text-2xl mb-4 font-serif italic">"{quote.text}"</p>
        <p className="text-lg text-muted-foreground">— {quote.author}</p>
      </div>
    </div>
  );
};

export default QuoteDisplay;
