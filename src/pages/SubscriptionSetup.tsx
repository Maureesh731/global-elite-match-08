import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubscriptionSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      setUser(user);

      // Check if application is approved
      const { data: appData, error: appError } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (appError) throw appError;

      if (appData.status !== "approved") {
        toast({
          title: "Application Pending",
          description: "Your application is still under review. You'll be notified once approved.",
          variant: "default",
        });
        navigate("/");
        return;
      }

      setApplication(appData);
      setLoading(false);
    } catch (error: any) {
      console.error("Error checking user status:", error);
      toast({
        title: "Error",
        description: "Failed to load your account status.",
        variant: "destructive",
      });
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { 
          email: user.email,
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/subscription-setup`,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Error creating checkout:", error);
      toast({
        title: "Error",
        description: "Failed to start subscription setup. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gray-800/50 backdrop-blur-sm border-gray-700 p-8">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Congratulations! Your Application is Approved
          </h1>
          <p className="text-gray-300">
            Complete your subscription to activate your account and start connecting with members.
          </p>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Monthly Membership</h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Browse all member profiles</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Send unlimited messages to other members</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Access to exclusive networking features</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Participate in donation auctions</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Verified health disclosure badge</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex justify-between items-center text-white">
              <span className="text-lg font-semibold">Monthly Subscription</span>
              <span className="text-2xl font-bold">$99/month</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-6 text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Activate Membership"
          )}
        </Button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Your subscription will automatically renew monthly. You can cancel anytime from your account settings.
        </p>
      </Card>
    </div>
  );
};

export default SubscriptionSetup;
