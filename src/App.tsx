import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GentlemenProfilePage from "./pages/GentlemenProfile";
import LadiesProfilePage from "./pages/LadiesProfile";
import ProfileSearch from "./pages/ProfileSearch";
import TestimonialsPage from "./pages/TestimonialsPage";
import DonateCompensation from "./pages/DonateCompensation";
import ReferralProgram from "./pages/ReferralProgram";
import NetworkingPage from "./pages/NetworkingPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gentlemen-profile" element={<GentlemenProfilePage />} />
          <Route path="/ladies-profile" element={<LadiesProfilePage />} />
          <Route path="/profile-search" element={<ProfileSearch />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/donate-compensation" element={<DonateCompensation />} />
          <Route path="/referral-program" element={<ReferralProgram />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/networking" element={<NetworkingPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
