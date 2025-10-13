import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PhotoAccessRequest {
  id: string;
  requester_id: string;
  requester_name: string;
  profile_owner_id: string;
  profile_owner_name: string;
  photo_index: number;
  status: 'pending' | 'approved' | 'denied';
  message: string | null;
  created_at: string;
  responded_at?: string;
}

export function usePhotoAccess() {
  const [approvedPhotos, setApprovedPhotos] = useState<{[key: string]: number[]}>({});
  const [pendingRequests, setPendingRequests] = useState<PhotoAccessRequest[]>([]);
  const [myRequests, setMyRequests] = useState<PhotoAccessRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchApprovedPhotos = async (profileId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: requests, error } = await supabase
        .from('photo_access_requests')
        .select('photo_index')
        .eq('requester_id', user.id)
        .eq('profile_owner_id', profileId)
        .eq('status', 'approved');

      if (error) throw error;

      setApprovedPhotos(prev => ({
        ...prev,
        [profileId]: requests?.map(r => r.photo_index) || []
      }));
    } catch (error) {
      console.error('Error fetching approved photos:', error);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: requests, error } = await supabase
        .from('photo_access_requests')
        .select('*')
        .eq('profile_owner_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPendingRequests((requests || []) as PhotoAccessRequest[]);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: requests, error } = await supabase
        .from('photo_access_requests')
        .select('*')
        .eq('requester_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMyRequests((requests || []) as PhotoAccessRequest[]);
    } catch (error) {
      console.error('Error fetching my requests:', error);
    }
  };

  const requestPhotoAccess = async (
    profileOwnerId: string,
    profileOwnerName: string,
    photoIndex: number,
    message?: string
  ) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const requesterName = 'Current User'; // In real app, get from user profile

      const { error } = await supabase
        .from('photo_access_requests')
        .insert({
          requester_id: user.id,
          requester_name: requesterName,
          profile_owner_id: profileOwnerId,
          profile_owner_name: profileOwnerName,
          photo_index: photoIndex,
          message: message || null
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Request Already Sent",
            description: "You have already requested access to this photo",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      toast({
        title: "Request Sent",
        description: "Your photo access request has been sent",
      });

      await fetchMyRequests();
    } catch (error) {
      console.error('Error requesting photo access:', error);
      toast({
        title: "Error",
        description: "Failed to send photo access request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoRequest = async (requestId: string, status: 'approved' | 'denied') => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('photo_access_requests')
        .update({ 
          status,
          responded_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Request Updated",
        description: `Photo access request ${status}`,
      });

      await fetchPendingRequests();
    } catch (error) {
      console.error('Error handling photo request:', error);
      toast({
        title: "Error",
        description: "Failed to update photo request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isPhotoApproved = (profileId: string, photoIndex: number) => {
    return approvedPhotos[profileId]?.includes(photoIndex) || false;
  };

  const hasRequestedPhoto = (profileId: string, photoIndex: number) => {
    return myRequests.some(request => 
      request.profile_owner_id === profileId && 
      request.photo_index === photoIndex
    );
  };

  const getRequestStatus = (profileId: string, photoIndex: number) => {
    const request = myRequests.find(request => 
      request.profile_owner_id === profileId && 
      request.photo_index === photoIndex
    );
    return request?.status || null;
  };

  useEffect(() => {
    fetchPendingRequests();
    fetchMyRequests();
  }, []);

  return {
    approvedPhotos,
    pendingRequests,
    myRequests,
    loading,
    fetchApprovedPhotos,
    fetchPendingRequests,
    fetchMyRequests,
    requestPhotoAccess,
    handlePhotoRequest,
    isPhotoApproved,
    hasRequestedPhoto,
    getRequestStatus
  };
}