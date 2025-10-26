import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMute = async () => {
    if (!audioRef.current) return;

    try {
      if (!isPlaying) {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
        toast.success("Background music started");
      } else {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        audioRef.current.muted = newMutedState;
        toast.success(newMutedState ? "Music muted" : "Music unmuted");
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      toast.error("Unable to play music. Please click the button to start.");
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        preload="auto"
      >
        <source src="/jazz-background.mp3" type="audio/mpeg" />
      </audio>
      
      <Button
        onClick={toggleMute}
        size="icon"
        variant="secondary"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label={isMuted || !isPlaying ? "Play music" : "Mute music"}
        title={isMuted || !isPlaying ? "Click to play jazz music" : "Click to mute music"}
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="h-6 w-6" />
        ) : (
          <Volume2 className="h-6 w-6" />
        )}
      </Button>
    </>
  );
};
