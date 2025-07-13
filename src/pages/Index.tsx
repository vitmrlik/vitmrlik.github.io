
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsLink } from '@/components/ui/tabs-link';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Welcome from './Welcome';
import Home from './Home';
import History from './History';
import Profile from './Profile';
import NotFound from './NotFound';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Home as HomeIcon, History as HistoryIcon, User as UserIcon, Heart } from 'lucide-react';

// ProtectedRoute component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Short timeout to ensure auth state is properly loaded
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isChecking) {
    return <div className="flex justify-center items-center h-screen">Checking authentication...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Bottom navigation for authenticated pages
const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    // bg-card
    <div className="border-border">
      <div className="container mx-auto">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid grid-cols-3 h-16">
            <TabsTrigger value="home" asChild>
              <TabsLink to="/home" className="flex flex-col items-center justify-center space-y-1">
                <Heart className="h-5 w-5" />
                <span className="text-xs">{t("tabs.home")}</span>
              </TabsLink>
            </TabsTrigger>
            <TabsTrigger value="history" asChild>
              <TabsLink to="/history" className="flex flex-col items-center justify-center space-y-1">
                <HistoryIcon className="h-5 w-5" />
                <span className="text-xs">{t("tabs.history")}</span>
              </TabsLink>
            </TabsTrigger>
            <TabsTrigger value="profile" asChild>
              <TabsLink to="/profile" className="flex flex-col items-center justify-center space-y-1">
                <UserIcon className="h-5 w-5" />
                <span className="text-xs">{t("tabs.profile")}</span>
              </TabsLink>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

// Main layout with tabs navigation
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto pb-16">
        {children}
      </div>
      <div className="fixed bottom-0 w-full">
        <BottomNav />
      </div>
    </div>
  );
};

// App component with routing
const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/welcome" element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            } />
            
            <Route path="/home" element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/history" element={
              <ProtectedRoute>
                <MainLayout>
                  <History />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
