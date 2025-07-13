
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { User, ThemeMode, Language } from '../types';
import { supabaseService } from '../lib/supabaseService';
import { useToast } from '@/hooks/use-toast';
import ChallengeCard from '../components/ChallengeCard';

const Profile: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log(user.challenges);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    user?.settings?.notificationsEnabled || false
  );
  const [notificationTime, setNotificationTime] = useState(
    user?.settings?.notificationTime || '20:00'
  );

  const handleLanguageChange = async (newLanguage: Language) => {
    await setLanguage(newLanguage);
  };

  const handleThemeChange = async (newTheme: ThemeMode) => {
    await setTheme(newTheme);
  };

  const handleSaveSettings = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      const updatedUser: Partial<User> = {
        id: user.id,
        settings: {
          ...user.settings,
          notificationsEnabled,
          notificationTime,
        },
      };
      
      await supabaseService.updateUser(updatedUser);
      toast({ title: t("common.success"), description: t("settings.saved") });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({ title: t("common.error"), description: t("settings.saveFailed"), variant: "destructive" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Add a loading state to prevent errors when user data is not yet available
  if (!user) {
    return (
      <div className="flex justify-center p-4">
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">{t("profile.title")}</h1>
      </header>

      <Tabs defaultValue="journey">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="journey">{t("profile.journey")}</TabsTrigger>
          <TabsTrigger value="settings">{t("profile.settings")}</TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="space-y-4">
          {user.challenges && user.challenges.map((challenge, index) => (
            <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
          ))}
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>{t("settings.theme")}</Label>
                <Select value={theme} onValueChange={(value) => handleThemeChange(value as ThemeMode)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t("settings.light")}</SelectItem>
                    <SelectItem value="dark">{t("settings.dark")}</SelectItem>
                    <SelectItem value="futuristic">{t("settings.futuristic")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>{t("settings.language")}</Label>
                <Select value={language} onValueChange={(value) => handleLanguageChange(value as Language)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t("settings.english")}</SelectItem>
                    <SelectItem value="cs">{t("settings.czech")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">{t("settings.notifications")}</Label>
                <Switch 
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>

              {notificationsEnabled && (
                <div className="space-y-3">
                  <Label htmlFor="notificationTime">{t("settings.notificationTime")}</Label>
                  <Input
                    id="notificationTime"
                    type="time"
                    value={notificationTime}
                    onChange={(e) => setNotificationTime(e.target.value)}
                  />
                </div>
              )}

              <Button 
                onClick={handleSaveSettings} 
                disabled={isUpdating}
                className="w-full"
              >
                {isUpdating ? t("common.loading") : t("settings.save")}
              </Button>

              <Button 
                variant="outline" 
                className="w-full text-destructive hover:text-destructive-foreground hover:bg-destructive"
                onClick={handleSignOut}
              >
                {t("profile.signOut")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
