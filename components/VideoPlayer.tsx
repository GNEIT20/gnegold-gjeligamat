
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

  useEffect(() => {
    if (autoStart && videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false);
          })
          .catch(err => {
            console.error("Playback error:", err);
            // If it fails unmuted, try muted as a fallback (some browsers are very strict)
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(e => setError("Video failed to play. Check if 'video.mp4' exists in the root folder."));
            }
          });
      }
    }
  }, [autoStart]);

  const handleVideoError = () => {
    setError("Error: Could not load 'video.mp4'. Please ensure the file is in the root directory.");
    setIsLoading(false);
  };

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ${isDimmed ? 'opacity-30 blur-sm scale-110' : 'opacity-100'}`}>
      {isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-500 text-sm font-medium animate-pulse">Loading Presentation...</p>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-zinc-900 p-6 text-center">
          <i className="fa-solid fa-circle-exclamation text-red-500 text-5xl mb-4"></i>
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-zinc-400 max-w-xs">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          onEnded={onEnded}
          onError={handleVideoError}
          onCanPlay={() => setIsLoading(false)}
          className="object-cover w-full h-full"
          playsInline
          webkit-playsinline="true"
          preload="auto"
          autoPlay={autoStart}
          muted={false} 
        />
      )}
    </div>
  );
};

export default VideoPlayer;
