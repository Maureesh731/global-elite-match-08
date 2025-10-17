import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState<'pending' | 'approved' | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    checkApplicationStatus();
  }, []);

  const checkApplicationStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      // Check application status
      const { data: application } = await supabase
        .from('applications')
        .select('status, first_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (application) {
        setApplicationStatus(application.status as 'pending' | 'approved');
        setUserName(application.first_name);
      }
    } catch (error) {
      console.error('Error checking status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <Clock className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  if (applicationStatus === 'approved') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-white text-2xl">Application Approved!</CardTitle>
            <CardDescription className="text-gray-300">
              Welcome {userName}! Your application has been approved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400 text-center">
              You can now access all member features including profile search and messaging.
            </p>
            <BackToHomeButton className="w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <CardTitle className="text-white text-2xl">Application Submitted!</CardTitle>
          <CardDescription className="text-gray-300">
            Welcome {userName}! Your application is under review.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
            <h3 className="text-yellow-500 font-semibold mb-2">Awaiting Approval</h3>
            <p className="text-gray-300 text-sm">
              Your application is currently being reviewed by our team. This typically takes 24-48 hours.
            </p>
          </div>
          
          <div className="space-y-3 text-sm text-gray-300">
            <p className="font-semibold text-white">What happens next?</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Our team reviews your application</li>
              <li>You'll receive an email notification once approved</li>
              <li>After approval, you can access profile search and messaging</li>
            </ul>
          </div>

          <div className="pt-4">
            <BackToHomeButton className="w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;
