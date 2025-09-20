import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ExpenseTracker from "@/components/ExpenseTracker";
import ChatHub from "@/components/ChatHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'expenses':
        return <ExpenseTracker />;
      case 'chat':
        return <ChatHub />;
      case 'house':
        return <Dashboard />; // Placeholder for now
      case 'settings':
        return <Dashboard />; // Placeholder for now
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="min-h-screen bg-background">
                  {renderActiveTab()}
                  <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
