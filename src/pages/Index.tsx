import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SignupForm } from '@/components/SignupForm';

const Index = () => {
  const [showSignup, setShowSignup] = useState(false);

  if (showSignup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <button 
              onClick={() => setShowSignup(false)}
              className="text-primary hover:text-primary-glow transition-colors"
            >
              ← Back to Home
            </button>
          </div>
          <SignupForm />
        </div>
      </div>
    );
  }

  return <HeroSection onGetStarted={() => setShowSignup(true)} />;
};

export default Index;
