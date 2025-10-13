import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useMessagingGate = () => {
  const [canSendMessages, setCanSendMessages] = useState(false);
  const [loading, setLoading] = useState(true);
  const [membershipType, setMembershipType] = useState<'free' | 'paid'>('free');
  const { user } = useAuth();

  useEffect(() => {
    const checkMessagingPermissions = async () => {
      if (!user) {
        setCanSendMessages(false);
        setLoading(false);
        return;
      }

      try {
        // Check user's membership type from profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('membership_type')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          const profileType = profile.membership_type as 'free' | 'paid';
          setMembershipType(profileType);
          if (profileType === 'paid') {
            setCanSendMessages(true);
            setLoading(false);
            return;
          }
        }

        // If not a paid member, check message restrictions
        const { data: restriction } = await supabase
          .from('message_restrictions')
          .select('can_send_messages')
          .eq('user_id', user.id)
          .single();

        setCanSendMessages(restriction?.can_send_messages || false);
      } catch (error) {
        console.error('Error checking messaging permissions:', error);
        setCanSendMessages(false);
      } finally {
        setLoading(false);
      }
    };

    checkMessagingPermissions();
  }, [user]);

  return {
    canSendMessages,
    loading,
    membershipType,
    isPaidMember: membershipType === 'paid'
  };
};
