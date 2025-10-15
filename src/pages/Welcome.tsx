import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Get application data from localStorage
  const applicationData = localStorage.getItem('pendingApplication');
  const parsedApplicationData = applicationData ? JSON.parse(applicationData) : null;

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!parsedApplicationData) {
      toast.error("No application data found. Please start over.");
      navigate('/');
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Check if username is already taken
      const { data: existingUser } = await supabase
        .from('applications')
        .select('username')
        .eq('username', username)
        .maybeSingle();

      if (existingUser) {
        toast.error("Username is already taken. Please choose another.");
        setIsLoading(false);
        return;
      }

      // Create Supabase auth user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: parsedApplicationData.email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: parsedApplicationData.first_name,
            last_name: parsedApplicationData.last_name,
            username: username
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        toast.error("Failed to create account: " + authError.message);
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        toast.error("Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }

      // Prepare complete application data with user_id
      const completeApplicationData = {
        ...parsedApplicationData,
        user_id: authData.user.id,
        username: username,
        password_hash: password,
        membership_type: 'free',
        status: 'pending'
      };

      // Save application to database
      const { error: dbError } = await supabase
        .from('applications')
        .insert([completeApplicationData]);
      
      if (dbError) {
        console.error("Error saving application to database:", dbError);
        toast.error("Failed to save application. Please try again.");
        setIsLoading(false);
        return;
      }

      // Create message restriction record for free user
      await supabase
        .from('message_restrictions')
        .insert([{
          user_id: authData.user.id,
          can_send_messages: false
        }]);

      // Send application data to email
      const { error: emailError } = await supabase.functions.invoke("send-application", {
        body: { applicationData: completeApplicationData }
      });
      
      if (emailError) {
        console.error("Error sending application email:", emailError);
        // Continue even if email fails since data is saved
      }

      // Clear stored application data
      localStorage.removeItem('pendingApplication');
      localStorage.removeItem('promoCodeUsed');

      toast.success("Account created successfully! Your application is pending admin approval. You'll receive an email when approved.");
      
      // Navigate to login page
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error: any) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account: " + (error.message || "Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  if (!parsedApplicationData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-500">Error</CardTitle>
            <CardDescription>
              No application data found. Please start over.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Untouchable Dating!</CardTitle>
          <CardDescription>
            Set up your username and password to complete your free application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetup} className="space-y-4">
            <div>
              <Label htmlFor="username">Choose a Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (min 3 characters)"
                required
                minLength={3}
              />
            </div>
            <div>
              <Label htmlFor="password">Choose a Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (min 8 characters)"
                required
                minLength={8}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={8}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Complete Application"}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-md">
            <p className="text-sm text-green-800">
              ✅ Free 1-year access approved with promo code!
            </p>
            <p className="text-xs text-green-600 mt-1">
              Your profile will go live once approved by our team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;