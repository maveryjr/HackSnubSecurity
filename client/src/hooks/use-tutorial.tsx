import { useState, useEffect } from 'react';

export function useTutorial() {
  const [showTutorial, setShowTutorial] = useState(false);
  
  useEffect(() => {
    // Check if the user has completed or dismissed the tutorial
    const tutorialCompleted = localStorage.getItem('tutorialCompleted') === 'true';
    const tutorialDismissed = localStorage.getItem('tutorialDismissed') === 'true';
    
    // Only show the tutorial if it's a new user
    if (!tutorialCompleted && !tutorialDismissed) {
      // Wait a moment before showing the tutorial
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 2000); // 2 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const completeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialCompleted', 'true');
  };
  
  const dismissTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialDismissed', 'true');
  };
  
  const resetTutorial = () => {
    localStorage.removeItem('tutorialCompleted');
    localStorage.removeItem('tutorialDismissed');
    setShowTutorial(true);
  };
  
  return {
    showTutorial,
    completeTutorial,
    dismissTutorial,
    resetTutorial
  };
}

export default useTutorial;