
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import School from "./pages/School";
import QA from "./pages/QA";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/school" element={<School />} />
          <Route path="/qa" element={<QA />} />
          {/* Placeholder routes for future pages */}
          <Route path="/pre-arrival-1" element={<div className="p-8 text-center">Pre-Arrival Section 1 - Coming Soon!</div>} />
          <Route path="/pre-arrival-2" element={<div className="p-8 text-center">Pre-Arrival Section 2 - Coming Soon!</div>} />
          <Route path="/post-arrival" element={<div className="p-8 text-center">Post-Arrival Checklist - Coming Soon!</div>} />
          <Route path="/city-insights" element={<div className="p-8 text-center">City Insights - Coming Soon!</div>} />
          <Route path="/documents" element={<div className="p-8 text-center">Documents & Renewals - Coming Soon!</div>} />
          <Route path="/student-life" element={<div className="p-8 text-center">Student Life Guide - Coming Soon!</div>} />
          <Route path="/hub" element={<div className="p-8 text-center">Community Hub - Coming Soon!</div>} />
          <Route path="/news" element={<div className="p-8 text-center">News - Coming Soon!</div>} />
          <Route path="/affiliations" element={<div className="p-8 text-center">Affiliations - Coming Soon!</div>} />
          <Route path="/language" element={<div className="p-8 text-center">Language Learning - Coming Soon!</div>} />
          <Route path="/translate" element={<div className="p-8 text-center">Translation - Coming Soon!</div>} />
          <Route path="/contact" element={<div className="p-8 text-center">Contact Us - Coming Soon!</div>} />
          <Route path="/profile" element={<div className="p-8 text-center">Profile - Coming Soon!</div>} />
          <Route path="/notifications" element={<div className="p-8 text-center">Notifications - Coming Soon!</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
