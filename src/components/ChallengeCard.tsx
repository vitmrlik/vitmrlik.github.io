
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Challenge } from '../types';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { LockIcon } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, index }) => {
  const { t } = useLanguage();
  
  // Check if challenge exists before calculating progress
  if (!challenge) {
    return null;
  }
  
  const progress = challenge.days_completed / challenge.days_required * 100;
  
  return (
    <Card className={`mb-4 ${!challenge.unlocked ? 'opacity-50' : ''}`}>
      <CardHeader className="flex flex-row items-center pb-2">
        {challenge.unlocked ? (
          <div className="text-2xl mr-2">{challenge.emoji}</div>
        ) : (
          <div className="mr-2"><LockIcon className="h-5 w-5" /></div>
        )}
        <div>
          <h3 className="font-medium">{t(`journey.challenge${index + 1}`)}</h3>
        </div>
      </CardHeader>
      <CardContent>
        {challenge.unlocked ? (
          <>
            <div className="flex justify-between mb-1">
              <span>{challenge.days_completed} / {challenge.days_required} {t("journey.days")}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            {challenge.current_streak > 0 && (
              <p className="text-sm mt-2 text-muted-foreground">
                {t("journey.streak")}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            {t("journey.locked")}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
