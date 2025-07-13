
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const { t } = useLanguage();
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Prosím vyplňte všechna pole');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Hesla se neshodují');
      return;
    }
    
    if (password.length < 6) {
      setError('Heslo musí mít alespoň 6 znaků');
      return;
    }
    
    try {
      const user = await signUp(email, password, name);
      if (user) {
        navigate('/welcome');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Došlo k neočekávané chybě, zkuste to prosím znovu');
    }
  };

  return (
    <AuthLayout title={t("register.title")} subtitle={t("register.subtitle")}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-destructive text-sm">{error}</p>}
        
        <div className="space-y-2">
          <Label htmlFor="name">{t("register.name")}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t("register.email")}</Label>
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
          <Label htmlFor="password">{t("register.password")}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t("register.confirmPassword")}</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("common.loading") : t("register.createAccount")}
        </Button>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">{t("register.haveAccount")}</span>{' '}
          <Link to="/login" className="text-primary hover:underline">
            {t("register.signIn")}
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
