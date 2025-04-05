import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Lock, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Character animation states
type MascotMood = 'neutral' | 'happy' | 'concerned' | 'excited';

interface StepContent {
  title: string;
  content: string;
  mood: MascotMood;
  icon?: React.ReactNode;
}

interface TutorialMascotProps {
  onComplete?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function TutorialMascot({ onComplete, onDismiss, className }: TutorialMascotProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mascotMood, setMascotMood] = useState<MascotMood>('neutral');
  const [isAnimating, setIsAnimating] = useState(false);

  // Tutorial steps
  const steps: StepContent[] = [
    {
      title: "Hey there! I'm Snubby!",
      content: "I'll be your guide to cybersecurity. Welcome to HackSnub - where we make security simple for small businesses!",
      mood: 'happy',
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "Did you know?",
      content: "43% of cyber attacks target small businesses. But don't worry - we're here to help you stay protected!",
      mood: 'concerned',
      icon: <Lock className="w-5 h-5" />
    },
    {
      title: "Take our Security Assessment",
      content: "Start with our free security assessment to see where your business stands. It only takes 5 minutes!",
      mood: 'excited',
      icon: <Award className="w-5 h-5" />
    },
    {
      title: "Explore Our Services",
      content: "Check out our affordable security packages designed specifically for small businesses like yours.",
      mood: 'happy',
      icon: <Shield className="w-5 h-5" />
    }
  ];

  // Update mascot mood when step changes
  useEffect(() => {
    if (currentStep < steps.length) {
      setMascotMood(steps[currentStep].mood);
    }
  }, [currentStep, steps]);

  // Animation handling
  useEffect(() => {
    if (currentStep < steps.length) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    // Store in localStorage that the tutorial has been completed
    localStorage.setItem('tutorialCompleted', 'true');
    if (onComplete) onComplete();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('tutorialDismissed', 'true');
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 flex items-end", 
      className
    )}>
      <div className="bg-[#242424] border border-[#ADFF6C]/30 rounded-lg shadow-lg p-4 max-w-xs animate-in slide-in-from-right">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-[#ADFF6C]">{steps[currentStep].title}</h3>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400" onClick={handleDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-start mb-3">
          {steps[currentStep].icon && 
            <div className="mr-2 text-[#ADFF6C]">
              {steps[currentStep].icon}
            </div>
          }
          <p className="text-sm">{steps[currentStep].content}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full ${currentStep === index 
                  ? 'w-4 bg-[#ADFF6C]' 
                  : 'w-1.5 bg-gray-500'}`} 
              />
            ))}
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-[#ADFF6C] hover:bg-[#ADFF6C]/10"
            onClick={handleNext}
          >
            {currentStep < steps.length - 1 ? (
              <>Next <ArrowRight className="ml-1 h-4 w-4" /></>
            ) : (
              'Got it!'
            )}
          </Button>
        </div>
      </div>
      
      {/* Mascot Character */}
      <div 
        className={cn(
          "relative flex items-center justify-center w-24 h-24 bg-[#1A1A1A] border-2 border-[#ADFF6C] rounded-full ml-2 shadow-lg overflow-hidden",
          isAnimating && "animate-bounce",
          mascotMood === 'happy' && "border-[#ADFF6C]",
          mascotMood === 'concerned' && "border-yellow-500",
          mascotMood === 'excited' && "border-purple-500"
        )}
      >
        {/* Mascot face - changes based on mood */}
        <div className="relative w-full h-full">
          {/* Base mascot face */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Eyes */}
            <div className={cn(
              "absolute flex space-x-4 top-6",
              mascotMood === 'concerned' && "top-7"
            )}>
              <div className={cn(
                "w-3 h-3 bg-white rounded-full flex items-center justify-center",
                mascotMood === 'happy' && "h-2.5 -mt-1",
                mascotMood === 'excited' && "animate-pulse"
              )}>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              </div>
              <div className={cn(
                "w-3 h-3 bg-white rounded-full flex items-center justify-center",
                mascotMood === 'happy' && "h-2.5 -mt-1",
                mascotMood === 'excited' && "animate-pulse"
              )}>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              </div>
            </div>
            
            {/* Mouth - changes with mood */}
            <div className={cn(
              "absolute bottom-7",
              mascotMood === 'neutral' && "w-5 h-1 bg-white rounded-full",
              mascotMood === 'happy' && "w-8 h-3 bg-white rounded-full border-t-2 border-[#1A1A1A]",
              mascotMood === 'concerned' && "w-5 h-1.5 bg-white rounded-full border-b-2 border-[#1A1A1A]",
              mascotMood === 'excited' && "w-6 h-4 bg-white rounded-full border-t-2 border-[#1A1A1A]"
            )}></div>
            
            {/* Security elements */}
            <div className="absolute top-1 right-7 w-4 h-4 bg-[#ADFF6C] rounded-full opacity-50"></div>
            <div className="absolute top-2 left-7 w-2 h-2 bg-[#ADFF6C] rounded-full opacity-50"></div>
            
            {/* Lock icon on forehead */}
            <div className="absolute top-1 w-5 h-5 border-2 border-[#ADFF6C] rounded-full">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#ADFF6C]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialMascot;