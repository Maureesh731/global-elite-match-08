import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Favorite {
  id: string;
  user_id: string;
  favorited_profile_id: string;
  favorited_profile_name: string;
  favorited_at: string;
  created_at: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const fetchFavorites = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('favorited_at', { ascending: false });

      if (error) {
        console.error('Error fetching favorites:', error);
        toast.error('Failed to load favorites');
        return;
      }

      setFavorites(data || []);
      setFavoriteIds(new Set((data || []).map(fav => fav.favorited_profile_id)));
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (profileId: string, profileName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please sign in to add favorites');
        return false;
      }

      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          favorited_profile_id: profileId,
          favorited_profile_name: profileName
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('Already in favorites');
        } else {
          console.error('Error adding favorite:', error);
          toast.error('Failed to add to favorites');
        }
        return false;
      }

      toast.success('Added to favorites!');
      await fetchFavorites(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      toast.error('Failed to add to favorites');
      return false;
    }
  };

  const removeFromFavorites = async (profileId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please sign in to manage favorites');
        return false;
      }

      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('favorited_profile_id', profileId);

      if (error) {
        console.error('Error removing favorite:', error);
        toast.error('Failed to remove from favorites');
        return false;
      }

      toast.success('Removed from favorites');
      await fetchFavorites(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove from favorites');
      return false;
    }
  };

  const isFavorited = (profileId: string) => {
    return favoriteIds.has(profileId);
  };

  const toggleFavorite = async (profileId: string, profileName: string) => {
    if (isFavorited(profileId)) {
      return await removeFromFavorites(profileId);
    } else {
      return await addToFavorites(profileId, profileName);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return {
    favorites,
    loading,
    isFavorited,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    refetch: fetchFavorites
  };
};