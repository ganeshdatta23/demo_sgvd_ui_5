import React, { useEffect, useRef } from 'react';

interface DarshanOverlayProps {
  visible: boolean;
}

export const DarshanOverlay: React.FC<DarshanOverlayProps> = ({ visible }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (visible) {
      // Trigger vibration if supported
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      }

      // Play background music
      if (audioRef.current) {
        audioRef.current.volume = 0.5; // Set volume to 50%
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio autoplay prevented. Waiting for user interaction.", error);
          });
        }
      }
      
      // Ensure video is playing in loop
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.loop = true;
        videoRef.current.play().catch(e => console.log("Video play error", e));
      }

    } else {
      // Pause both audio and video when out of range
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video (Behind everything) */}
      <div className="absolute inset-0 z-0">
        <video 
            ref={videoRef}
            src="14618955-hd_720_1280_24fps.mp4"
            className="w-full h-full object-cover"
            muted 
            playsInline
        />
        {/* Dimming overlay for video */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Audio Element (Hidden) */}
      <audio 
        ref={audioRef} 
        src="background-music.mp3" 
        loop 
        crossOrigin="anonymous"
      />

      {/* Vignette and Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle,transparent_30%,#000_100%)] opacity-40"></div>

      {/* Center Image with Golden Aura Border Glow */}
      <div className="relative z-20 animate-fade-in transform transition-all duration-1000 scale-100 flex flex-col items-center justify-center">
          {/* Golden Aura Glow - Creates the glowing border effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500 rounded-full blur-2xl opacity-40 animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
          
          {/* Image with glow border */}
          <img 
              src="swamiji-darshan.png" 
              alt="Swamiji Darshan" 
              className="relative w-72 h-auto md:w-96 object-contain animate-slide-up z-20"
              style={{
                  filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 60px rgba(217, 119, 6, 0.6)) drop-shadow(0 0 90px rgba(180, 83, 9, 0.4))',
                  textShadow: '0 0 30px rgba(251, 191, 36, 0.8)'
              }}
          />
      </div>
    </div>
  );
};