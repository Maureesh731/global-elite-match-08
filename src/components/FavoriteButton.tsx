import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  profileId: string;
  profileName: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  profileId,
  profileName,
  variant = "outline",
  size = "default",
  className = ""
}) => {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(profileId);

  const handleClick = async () => {
    await toggleFavorite(profileId, profileName);
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleClick}
      className={`${favorited ? 'text-red-500 border-red-500 hover:bg-red-50' : ''} ${className}`}
    >
      <Heart className={`w-4 h-4 mr-2 ${favorited ? 'fill-current' : ''}`} />
      {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
  );
};