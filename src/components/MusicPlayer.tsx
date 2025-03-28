
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Background music URL
  const musicUrl = "https://www.chosic.com/wp-content/uploads/2021/04/Raindrops-on-window-sill.mp3"; // Creative Commons music

  useEffect(() => {
    // Set up audio element
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set default volume
      audioRef.current.loop = true; // Loop the music
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
        // Most browsers require user interaction before playing audio
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center space-x-2">
      <audio ref={audioRef} src={musicUrl} />
      
      <Toggle
        pressed={isPlaying}
        onPressedChange={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="rounded-full p-2 bg-casper-100 hover:bg-casper-200 dark:bg-casper-800 dark:hover:bg-casper-700 transition-colors"
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Toggle>
      
      <span className="text-xs text-casper-600 dark:text-casper-300">
        {isPlaying ? "Music Playing" : "Play Music"}
      </span>
    </div>
  );
};

export default MusicPlayer;
