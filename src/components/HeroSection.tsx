import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, GraduationCap, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/rvce-hero.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70" />
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm font-medium shadow-sm text-white">
            <Shield className="w-4 h-4 text-white" />
            Secure College Community Platform
          </div>

          {/* Main Headlines */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              RVCE Connect
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Connect with your classmates, collaborate on projects, and build your college community
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">Secure Verification</h3>
                <p className="text-sm text-white/80">
                  Email validation with semester eligibility checks
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">Smart Groups</h3>
                <p className="text-sm text-white/80">
                  Automatic assignment to branch, semester & section groups
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">Academic Focus</h3>
                <p className="text-sm text-white/80">
                  Semester tracking with automatic progression
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-3 h-auto"
            >
              Get Started with College Email
            </Button>
            <p className="text-sm text-white/70">
              Requires valid @rvce.edu.in email address
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 space-y-4">
            <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
              Security Features
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-white" />
                Email Domain Validation
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-white" />
                Semester Eligibility Check
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-white" />
                Anonymous Mode Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}