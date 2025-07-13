import React from "react";
import { Link } from "react-router-dom";
import { Heart, HeartOff, ExternalLink } from "lucide-react";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { MemberCounter } from "@/components/MemberCounter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, loading, removeFromFavorites } = useFavorites();

  const handleRemoveFavorite = async (profileId: string) => {
    await removeFromFavorites(profileId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <BackToHomeButton />
          <div className="text-center py-20">
            <p className="text-lg">Loading your favorites...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <BackToHomeButton />
          
          {/* Live Member Counter */}
          <div className="flex justify-center">
            <MemberCounter />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-red-500" />
            My Favorites
          </h1>
          <p className="text-gray-600">
            {favorites.length > 0 
              ? `You have ${favorites.length} favorite${favorites.length === 1 ? '' : 's'}`
              : 'You haven\'t added any favorites yet'
            }
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">
              Start browsing profiles and add your favorites to keep track of interesting matches!
            </p>
            <Link to="/profile-search">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Browse Profiles
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg truncate">{favorite.favorited_profile_name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveFavorite(favorite.favorited_profile_id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <HeartOff className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Added to favorites on {new Date(favorite.favorited_at).toLocaleDateString()}
                    </p>
                    
                    <div className="flex gap-2">
                      <Link to={`/profile/${favorite.favorited_profile_id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      💚 They're currently active and available for conversations!
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {favorites.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-blue-800">
                We'll notify you when your favorited members are online and active on the site!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}