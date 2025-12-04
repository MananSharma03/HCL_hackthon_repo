import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { ProtectedRoute } from "@/components/protected-route";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import DashboardPage from "@/pages/dashboard";
import ProviderDashboardPage from "@/pages/provider";
import ProfilePage from "@/pages/profile";
import HealthInfoPage from "@/pages/health-info";
import ContactPage from "@/pages/contact";
import PrivacyPage from "@/pages/privacy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/health-info" component={HealthInfoPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPage} />

      {/* Protected Patient Routes */}
      <Route path="/dashboard">
        <ProtectedRoute requiredRole="patient">
          <DashboardPage />
        </ProtectedRoute>
      </Route>

      {/* Protected Provider Routes */}
      <Route path="/provider">
        <ProtectedRoute requiredRole="provider">
          <ProviderDashboardPage />
        </ProtectedRoute>
      </Route>

      {/* Protected Profile Route (both roles) */}
      <Route path="/profile">
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      </Route>

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
