
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const { t } = useLanguage();
  const { resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!email) {
      setError('Prosím vyplňte email');
      return;
    }
    
    try {
      const success = await resetPassword(email);
      if (success) {
        setMessage('Pokyny k obnovení hesla byly odeslány na váš email');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError('Nepodařilo se odeslat email pro obnovení hesla');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError('Došlo k neočekávané chybě, zkuste to prosím znovu');
    }
  };

  return (
    <AuthLayout title={t("forgotPassword.title")} subtitle={t("forgotPassword.subtitle")}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-destructive text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}
        
        <div className="space-y-2">
          <Label htmlFor="email">{t("forgotPassword.email")}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("common.loading") : t("forgotPassword.resetPassword")}
        </Button>
        
        <div className="text-center">
          <Link to="/login" className="text-primary text-sm hover:underline">
            {t("forgotPassword.backToLogin")}
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
