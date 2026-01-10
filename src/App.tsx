import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Index from "./pages/Index";
import FloatingParticles from "@/components/three/FloatingParticles";
import Domains from "./pages/Domains";
import DomainPage from "./pages/DomainPage";
import NotFound from "./pages/NotFound";
import Loader from "@/components/Loader";

const queryClient = new QueryClient();

function ParticlesVisibility() {
  // show particles on all routes including the splash
  return <FloatingParticles />;
}

const App = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {loading ? (
          <div className="h-screen w-screen">
            <div className="grid place-items-center h-full">
              <Loader />
            </div>
          </div>
        ) : (
          <BrowserRouter>
            {/* decorative particles shown on all routes except the splash screen */}
            <ParticlesVisibility />

            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/home" element={<Index />} />
              <Route path="/domains" element={<Domains />} />
              <Route path="/domains/:slug" element={<DomainPage />} />
              <Route path="/team" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
