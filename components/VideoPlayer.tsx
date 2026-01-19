
import React, { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  onEnded: () => void;
  isDimmed: boolean;
  autoStart: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onEnded, isDimmed, autoStart }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (autoStart && videoRef.current) {
      // We start muted because mobile browsers block videos with sound by default
      videoRef.current.muted = true;
      
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false);
          })
          .catch(err => {
            console.error("Playback failed:", err);
            // Even if muted fails (rare), we show a play button overlay
            setIsLoading(false);
          });
      }
    }
  }, [autoStart]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleVideoError = () => {
    setError("Could not load video. Please ensure your internet connection is stable.");
    setIsLoading(false);
  };

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 overflow-hidden bg-black ${isDimmed ? 'opacity-30 blur-sm scale-110' : 'opacity-100'}`}>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black">
          <div className="w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
          <p className="text-yellow-500/50 text-xs font-bold tracking-[0.2em] uppercase">Loading Media...</p>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-zinc-900 p-6 text-center">
          <i className="fa-solid fa-circle-exclamation text-red-500 text-5xl mb-4"></i>
          <h2 className="text-xl font-bold text-white mb-2">Network Error</h2>
          <p className="text-zinc-400 max-w-xs">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-3 bg-yellow-600 text-white rounded-full font-bold transition-colors"
          >
            Refresh Page
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            onEnded={onEnded}
            onError={handleVideoError}
            onCanPlay={() => setIsLoading(false)}
            className="object-contain md:object-cover w-full h-full"
            playsInline
            webkit-playsinline="true"
            preload="auto"
            muted={isMuted}
          />
          
          {/* Unmute Button Overlay - Crucial for Mobile Experience */}
          {!isDimmed && !isLoading && isMuted && (
            <button 
              onClick={toggleMute}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-6 py-3 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white animate-bounce shadow-2xl"
            >
              <i className="fa-solid fa-volume-xmark text-yellow-500"></i>
              <span className="text-xs font-bold tracking-widest uppercase">Tap to Unmute</span>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
