import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const startTime = Date.now();

    try {
      // Query applications table to get email
      const { data: application, error } = await supabase
        .from('applications')
        .select('email, status')
        .eq('username', username)
        .single();

      // Always attempt authentication to prevent timing attacks
      // Use a dummy email if username not found
      const emailToUse = application?.email || 'nonexistent@dummy.com';
      
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password: password
      });

      // Add artificial delay to normalize timing (prevent username enumeration)
      const elapsed = Date.now() - startTime;
      const minDelay = 500; // 500ms minimum response time
      if (elapsed < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
      }

      // Check all conditions after authentication attempt
      // This prevents username enumeration through timing or different error messages
      if (error || !application || authError) {
        toast.error("Invalid username or password");
        return;
      }

      // Only check approval status after successful authentication
      if (application.status !== 'approved') {
        await supabase.auth.signOut();
        toast.error("Your application is still pending approval");
        return;
      }

      toast.success("Login successful!");
      navigate('/');
    } catch (error) {
      // Ensure consistent timing even on exceptions
      const elapsed = Date.now() - startTime;
      const minDelay = 500;
      if (elapsed < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
      }
      toast.error("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Access your Untouchable Dating account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/" className="text-primary hover:underline">
                Apply now
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;