import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Auto-play with user interaction check
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented. User interaction required.');
          setIsPlaying(false);
        }
      };
      
      // Try to play after a short delay
      const timer = setTimeout(playAudio, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleMute = async () => {
    if (audioRef.current) {
      if (!isPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsMuted(false);
        } catch (error) {
          console.error('Failed to play audio:', error);
        }
      } else {
        setIsMuted(!isMuted);
        audioRef.current.muted = !isMuted;
      }
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
        {/* Add your jazz music file to public folder and update the src */}
        <source src="/jazz-background.mp3" type="audio/mpeg" />
      </audio>
      
      <Button
        onClick={toggleMute}
        size="icon"
        variant="secondary"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label={isMuted || !isPlaying ? "Unmute music" : "Mute music"}
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
