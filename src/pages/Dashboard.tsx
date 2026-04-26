import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { useMessagingGate } from "@/hooks/useMessagingGate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import {
  Crown, CheckCircle2, AlertCircle, MessageSquare, Calendar,
  CreditCard, RefreshCw, ShieldCheck, Clock, Search, Heart,
} from "lucide-react";
import { toast } from "sonner";

interface MemberInfo {
  full_name: string;
  status: string;
  membership_type: string;
  verification_status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [info, setInfo] = useState<MemberInfo | null>(null);
  const [messagesSent, setMessagesSent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  const {
    subscribed, subscription_tier, subscription_end,
    is_first_month, referral_credits,
    loading: subLoading, refreshSubscription,
  } = useUserSubscription();

  const { canSendMessages, isPaidMember, loading: gateLoading } = useMessagingGate();

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate('/login'); return; }
    void loadDashboard();
  }, [user, authLoading]);

  const loadDashboard = async () => {
    if (!user) return;
    try {
      const [{ data: profile }, { data: restriction }] = await Promise.all([
        supabase.from('profiles')
          .select('full_name, status, membership_type, verification_status')
          .eq('user_id', user.id).maybeSingle(),
        supabase.from('message_restrictions')
          .select('messages_sent_count')
          .eq('user_id', user.id).maybeSingle(),
      ]);
      if (profile) setInfo(profile as MemberInfo);
      setMessagesSent(restriction?.messages_sent_count ?? 0);
    } catch (err) {
      console.error('Dashboard load error:', err);
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
      toast.error(err.message || 'Failed to open subscription portal');
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
      toast.error(err.message || 'Failed to start checkout');
    }
  };

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <Clock className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  const isPaid = isPaidMember || info?.membership_type === 'paid';
  const isApproved = info?.status === 'approved';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome{info?.full_name ? `, ${info.full_name.split(' ')[0]}` : ''}
            </h1>
            <p className="text-gray-400 text-sm mt-1">Your member dashboard</p>
          </div>
          <BackToHomeButton />
        </div>

        {/* Membership status banner */}
        <Card className={`border ${isPaid
          ? 'bg-gradient-to-br from-yellow-900/30 to-purple-900/30 border-yellow-500/30'
          : 'bg-gradient-to-br from-gray-900/60 to-gray-900/40 border-gray-700'}`}>
          <CardContent className="p-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${isPaid ? 'bg-yellow-500/20' : 'bg-gray-700'}`}>
                {isPaid ? <Crown className="w-6 h-6 text-yellow-400" /> : <AlertCircle className="w-6 h-6 text-gray-400" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">
                    {isPaid ? 'Premium Member' : 'Free Member'}
                  </h2>
                  {isApproved && (
                    <Badge className="bg-green-600/80 text-white border-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Approved
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-0.5">
                  {isPaid ? 'Full access to all member features' : 'Upgrade for unlimited messaging and more'}
                </p>
              </div>
            </div>
            {!isPaid && (
              <Button
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500"
              >
                Upgrade now
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Plan card */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-gray-900/60 border border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-white text-lg">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-400" /> Plan
                </span>
                <Button
                  variant="ghost" size="sm" onClick={refreshSubscription} disabled={subLoading}
                  className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 h-8 w-8 p-0"
                >
                  <RefreshCw className={`w-4 h-4 ${subLoading ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Row label="Status" value={
                subscribed ? (
                  <Badge className="bg-green-600/80 text-white border-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </Badge>
                ) : isPaid ? (
                  <Badge className="bg-blue-600/80 text-white border-0">Comp / Manual</Badge>
                ) : (
                  <Badge className="bg-gray-700 text-gray-300 border-0">Inactive</Badge>
                )
              } />
              <Row label="Tier" value={
                <span className="text-white text-sm font-medium flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-yellow-400" />
                  {subscription_tier || (isPaid ? 'Premium' : 'Free')}
                </span>
              } />
              {subscribed && (
                <>
                  <Row label="Current billing"
                    value={<span className="text-white text-sm font-medium">{is_first_month ? '$24.50/mo' : '$49.99/mo'}</span>} />
                  <Row label={<span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Next billing</span>}
                    value={<span className="text-white text-sm font-medium">{formatDate(subscription_end)}</span>} />
                </>
              )}
              {(referral_credits ?? 0) > 0 && (
                <Row label="Free months earned"
                  value={<Badge className="bg-green-600/80 text-white border-0">{referral_credits}</Badge>} />
              )}
              <div className="pt-2">
                {subscribed ? (
                  <Button onClick={handleManageSubscription} disabled={portalLoading}
                    variant="outline" size="sm"
                    className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                    {portalLoading ? 'Opening...' : 'Manage subscription'}
                  </Button>
                ) : !isPaid ? (
                  <Button onClick={handleSubscribe} size="sm"
                    className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500">
                    Subscribe — $24.50 first month
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>

          {/* Messaging card */}
          <Card className="bg-gradient-to-br from-blue-900/40 to-gray-900/60 border border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <MessageSquare className="w-5 h-5 text-blue-400" /> Messaging
              </CardTitle>
              <CardDescription className="text-gray-400">
                {isPaid ? 'Unlimited messages — no restrictions.' : 'Free members are limited. Upgrade to message anyone.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Row label="Permission" value={
                gateLoading ? (
                  <span className="text-gray-400 text-sm">Checking…</span>
                ) : canSendMessages ? (
                  <Badge className="bg-green-600/80 text-white border-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Can send
                  </Badge>
                ) : (
                  <Badge className="bg-red-600/80 text-white border-0 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Restricted
                  </Badge>
                )
              } />
              <Row label="Messages sent"
                value={<span className="text-white text-sm font-medium">{messagesSent}</span>} />
              <Row label="Daily limit"
                value={<span className="text-white text-sm font-medium">{isPaid ? 'Unlimited' : '0 (upgrade required)'}</span>} />
              <div className="pt-2">
                <Button onClick={() => navigate('/messages')} size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-500">
                  Open inbox
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <Card className="bg-gray-900/60 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-3 gap-3">
            <Button variant="outline" onClick={() => navigate('/profile-search')}
              className="border-gray-700 text-gray-200 hover:bg-gray-800 justify-start">
              <Search className="w-4 h-4 mr-2" /> Browse members
            </Button>
            <Button variant="outline" onClick={() => navigate('/favorites')}
              className="border-gray-700 text-gray-200 hover:bg-gray-800 justify-start">
              <Heart className="w-4 h-4 mr-2" /> Favorites
            </Button>
            <Button variant="outline" onClick={() => navigate('/verification')}
              className="border-gray-700 text-gray-200 hover:bg-gray-800 justify-start">
              <ShieldCheck className="w-4 h-4 mr-2" /> Verification
              {info?.verification_status === 'verified' && (
                <Badge className="ml-auto bg-blue-600 text-white border-0">✓</Badge>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: React.ReactNode; value: React.ReactNode }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-400 text-sm">{label}</span>
    {value}
  </div>
);

export default Dashboard;
