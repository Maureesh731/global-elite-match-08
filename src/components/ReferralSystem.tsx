import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { Users, Gift, Mail } from 'lucide-react';

export const ReferralSystem = () => {
  const [referralEmail, setReferralEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { referral_credits, refreshSubscription } = useUserSubscription();

  const handleReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to send referrals.",
          variant: "destructive"
        });
        return;
      }

      // Insert referral record
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: user.id,
          referrer_email: user.email!,
          referred_email: referralEmail,
          status: 'pending'
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to send referral. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Referral Sent!",
        description: `Referral invitation sent to ${referralEmail}. You'll receive a free month when they're approved!`,
      });

      setReferralEmail('');
      refreshSubscription();
    } catch (error) {
      console.error('Referral error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-red-900/30 border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Users className="w-5 h-5" />
          Referral Program
        </CardTitle>
        <CardDescription className="text-gray-300">
          Invite qualified members and earn free months for every approved referral!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <Gift className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-green-300 font-medium">Free Months Earned</p>
            <p className="text-2xl font-bold text-green-400">{referral_credits || 0}</p>
          </div>
        </div>

        <form onSubmit={handleReferral} className="space-y-4">
          <div>
            <label htmlFor="referralEmail" className="block text-sm font-medium text-gray-300 mb-2">
              Refer Someone Special
            </label>
            <div className="flex gap-2">
              <Input
                id="referralEmail"
                type="email"
                placeholder="friend@example.com"
                value={referralEmail}
                onChange={(e) => setReferralEmail(e.target.value)}
                required
                className="bg-black/20 border-purple-500/30 text-white placeholder:text-gray-400"
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700"
              >
                <Mail className="w-4 h-4 mr-2" />
                {loading ? 'Sending...' : 'Send Invite'}
              </Button>
            </div>
          </div>
        </form>

        <div className="text-xs text-gray-400 space-y-1">
          <p>• You earn 1 free month for each approved referral</p>
          <p>• Referred members must complete the application process</p>
          <p>• Free months are applied automatically to your subscription</p>
        </div>
      </CardContent>
    </Card>
  );
};