
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Prosím vyplňte email a heslo');
      return;
    }
    
    try {
      const user = await signIn(email, password);
      if (user) {
        navigate('/welcome');
      } else {
        setError('Nesprávný email nebo heslo');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Došlo k neočekávané chybě, zkuste to prosím znovu');
    }
  };

  return (
    <AuthLayout title={t("login.title")} subtitle={t("login.subtitle")}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-destructive text-sm">{error}</p>}
        
        <div className="space-y-2">
          <Label htmlFor="email">{t("login.email")}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("login.password")}</Label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              {t("login.forgotPassword")}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("common.loading") : t("login.signIn")}
        </Button>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">{t("login.noAccount")}</span>{' '}
          <Link to="/register" className="text-primary hover:underline">
            {t("login.signUp")}
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
