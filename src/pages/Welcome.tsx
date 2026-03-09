import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, CreditCard, Calendar, RefreshCw, Crown, AlertCircle } from "lucide-react";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { toast } from "sonner";

const Welcome = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState<'pending' | 'approved' | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [portalLoading, setPortalLoading] = useState(false);

  const {
    subscribed,
    subscription_tier,
    subscription_end,
    is_first_month,
    referral_credits,
    loading: subLoading,
    refreshSubscription,
  } = useUserSubscription();

  useEffect(() => {
    checkApplicationStatus();
  }, []);

  const checkApplicationStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/login'); return; }

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

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) window.open(data.url, '_blank');
    } catch (err: any) {
      toast.error(err.message || "Failed to open subscription portal");
    } finally {
      setPortalLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      if (error) throw error;
      if (data?.url) window.open(data.url, '_blank');
    } catch (err: any) {
      toast.error(err.message || "Failed to start checkout");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const SubscriptionCard = () => (
    <Card className="bg-gradient-to-br from-purple-900/40 to-gray-900/60 border-purple-500/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-white text-lg">
          <span className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-400" />
            Membership Status
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshSubscription}
            disabled={subLoading}
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 h-8 w-8 p-0"
          >
            <RefreshCw className={`w-4 h-4 ${subLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status row */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Status</span>
          {subLoading ? (
            <div className="h-5 w-16 bg-gray-700 animate-pulse rounded" />
          ) : subscribed ? (
            <Badge className="bg-green-600/80 text-white border-0 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Active
            </Badge>
          ) : (
            <Badge className="bg-gray-700 text-gray-300 border-0 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Inactive
            </Badge>
          )}
        </div>

        {subscribed && !subLoading && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Plan</span>
              <span className="text-white text-sm font-medium flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-yellow-400" />
                {subscription_tier || 'Premium'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Current billing</span>
              <span className="text-white text-sm font-medium">
                {is_first_month ? '$24.50/mo' : '$49.99/mo'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Next billing
              </span>
              <span className="text-white text-sm font-medium">
                {formatDate(subscription_end)}
              </span>
            </div>

            {is_first_month && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-xs text-yellow-300">
                🎉 Launch Special active — renews at $49.99/mo after this billing cycle
              </div>
            )}

            {referral_credits > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Free months</span>
                <Badge className="bg-green-600/80 text-white border-0">
                  {referral_credits} month{referral_credits > 1 ? 's' : ''}
                </Badge>
              </div>
            )}
          </>
        )}

        {!subLoading && (
          <div className="pt-1">
            {subscribed ? (
              <Button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                variant="outline"
                size="sm"
                className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
              >
                {portalLoading ? 'Opening...' : 'Manage Subscription'}
              </Button>
            ) : (
              <Button
                onClick={handleSubscribe}
                size="sm"
                className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white"
              >
                Subscribe — $24.50/mo
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

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
        <div className="max-w-md w-full space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-white text-2xl">Application Approved!</CardTitle>
              <CardDescription className="text-gray-300">
                Welcome {userName}! Your application has been approved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-center">
                You now have access to all member features including profile search and messaging.
              </p>
              <BackToHomeButton className="w-full" />
            </CardContent>
          </Card>

          <SubscriptionCard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        <Card className="bg-gray-800 border-gray-700">
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

        <SubscriptionCard />
      </div>
    </div>
  );
};

export default Welcome;
