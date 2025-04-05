import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import Blog from "@/pages/Blog";
import Assessment from "@/pages/Assessment";
import ReplitRemover from "@/components/ui/ReplotRemover";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import { useTutorial } from "@/hooks/use-tutorial";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/blog" component={Blog} />
      <Route path="/assessment" component={Assessment} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const { showTutorial, completeTutorial, dismissTutorial } = useTutorial();
  
  // Only show the tutorial on the homepage
  const shouldShowTutorial = showTutorial && location === "/";
  
  return (
    <>
      <Router />
      <Toaster />
      <ReplitRemover />
      {shouldShowTutorial && (
        <OnboardingTutorial 
          onComplete={completeTutorial} 
          onDismiss={dismissTutorial} 
        />
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
