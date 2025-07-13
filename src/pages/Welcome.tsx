
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuoteDisplay from '../components/QuoteDisplay';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated (from localStorage)
    const user = localStorage.getItem('gratitudeUser');
    if (!user) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleQuoteComplete = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse">Načítání...</div>
      </div>
    );
  }

  return <QuoteDisplay onComplete={handleQuoteComplete} duration={10000} />;
};

export default Welcome;
