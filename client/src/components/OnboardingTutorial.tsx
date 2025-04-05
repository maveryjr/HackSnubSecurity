import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Shield, AlertCircle, CheckCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SnubbyMascot } from '@/components/ui/SnubbyMascot';

interface OnboardingTutorialProps {
  onComplete?: () => void;
  onDismiss?: () => void;
  className?: string;
}

interface TutorialStep {
  title: string;
  content: string;
  mood: 'neutral' | 'happy' | 'concerned' | 'excited';
  icon: React.ReactNode;
  cta?: {
    text: string;
    action: () => void;
  };
}

export function OnboardingTutorial({ onComplete, onDismiss, className }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Define tutorial steps
  const tutorialSteps: TutorialStep[] = [
    {
      title: "Hey there, I'm Snubby!",
      content: "Welcome to HackSnub! I'm here to help you protect your business from cyber threats.",
      mood: 'happy',
      icon: <Shield className="h-5 w-5 text-[#ADFF6C]" />
    },
    {
      title: "Did you know?",
      content: "43% of cyber attacks target small businesses like yours. Most don't have the tools to protect themselves.",
      mood: 'concerned',
      icon: <AlertCircle className="h-5 w-5 text-yellow-400" />
    },
    {
      title: "Take your free checkup",
      content: "Start with our free Snub Checkup to see how your security measures up. It only takes 5 minutes!",
      mood: 'excited',
      icon: <Award className="h-5 w-5 text-purple-400" />,
      cta: {
        text: "Start Assessment",
        action: () => {
          window.location.href = "/assessment";
        }
      }
    },
    {
      title: "Ready to get protected?",
      content: "Check out our simple, affordable security plans designed specifically for small businesses.",
      mood: 'happy',
      icon: <CheckCircle className="h-5 w-5 text-[#ADFF6C]" />,
      cta: {
        text: "See Pricing",
        action: () => {
          const pricingSection = document.getElementById('pricing');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  ];

  // Animation handling
  useEffect(() => {
    if (currentStep < tutorialSteps.length) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, tutorialSteps.length]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('tutorialCompleted', 'true');
    if (onComplete) onComplete();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('tutorialDismissed', 'true');
    if (onDismiss) onDismiss();
  };

  const currentTutorialStep = tutorialSteps[currentStep];

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 flex items-end",
      className
    )}>
      <div className="bg-[#242424] border border-[#ADFF6C]/30 rounded-lg shadow-xl p-5 max-w-xs animate-in slide-in-from-right">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-[#ADFF6C]">{currentTutorialStep.title}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-transparent" 
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-start mb-4 gap-3">
          <div className="flex-shrink-0 mt-1">
            {currentTutorialStep.icon}
          </div>
          <p className="text-sm text-gray-200">{currentTutorialStep.content}</p>
        </div>
        
        {currentTutorialStep.cta && (
          <Button
            className="w-full mb-4 bg-[#ADFF6C] text-[#1A1A1A] hover:bg-[#5FD35F] font-medium"
            onClick={currentTutorialStep.cta.action}
          >
            {currentTutorialStep.cta.text}
          </Button>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {tutorialSteps.map((_, index) => (
              <div 
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  currentStep === index ? "w-4 bg-[#ADFF6C]" : "w-1.5 bg-gray-500"
                )} 
              />
            ))}
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-[#ADFF6C] hover:bg-[#ADFF6C]/10"
            onClick={handleNext}
          >
            {currentStep < tutorialSteps.length - 1 ? (
              <>Next <ArrowRight className="ml-1 h-4 w-4" /></>
            ) : (
              'Got it!'
            )}
          </Button>
        </div>
      </div>
      
      {/* Mascot Character */}
      <SnubbyMascot 
        mood={currentTutorialStep.mood} 
        size="md" 
        animated={isAnimating}
        className="ml-2 shadow-lg"
      />
    </div>
  );
}

export default OnboardingTutorial;