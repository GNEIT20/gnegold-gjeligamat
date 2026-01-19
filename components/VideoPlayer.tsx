
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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        await video.play();
        setIsPaused(false);
      } catch (err) {
        console.log("Autoplay prevented, waiting for user interaction", err);
        setIsPaused(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (autoStart) {
      attemptPlay();
    }

    // Check if video is actually playing
    const interval = setInterval(() => {
      if (video && video.paused && !video.ended && !isLoading && !isDimmed) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [autoStart, isLoading, isDimmed]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const forcePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPaused(false);
    }
  };

  const handleVideoError = () => {
    setError("Video format not supported or network error. Please check your connection.");
    setIsLoading(false);
  };

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 overflow-hidden bg-black ${isDimmed ? 'opacity-30 blur-sm scale-110' : 'opacity-100'}`}>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black">
          <div className="w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
          <p className="text-yellow-500/50 text-[10px] font-black tracking-[0.3em] uppercase">Buffering...</p>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-zinc-900 p-6 text-center">
          <i className="fa-solid fa-triangle-exclamation text-amber-500 text-5xl mb-4"></i>
          <h2 className="text-xl font-bold text-white mb-2">Video Unavailable</h2>
          <p className="text-zinc-400 max-w-xs text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-10 py-4 bg-yellow-600 text-white rounded-full font-bold shadow-xl active:scale-95 transition-transform"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            onEnded={onEnded}
            onError={handleVideoError}
            onLoadStart={() => setIsLoading(true)}
            onPlaying={() => {
              setIsLoading(false);
              setIsPaused(false);
            }}
            className="w-full h-full object-contain md:object-cover"
            playsInline
            autoPlay
            muted
            preload="auto"
          />
          
          {/* Fail-safe Play Button (if autoPlay fails on Chrome Mobile) */}
          {!isDimmed && isPaused && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/40 backdrop-blur-[2px]">
              <button 
                onClick={forcePlay}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 flex items-center justify-center bg-yellow-500 rounded-full text-black text-3xl shadow-[0_0_50px_rgba(234,179,8,0.5)] group-active:scale-90 transition-transform">
                  <i className="fa-solid fa-play translate-x-1"></i>
                </div>
                <span className="text-white font-bold tracking-widest text-xs bg-black/50 px-4 py-2 rounded-full">TAP TO PLAY VIDEO</span>
              </button>
            </div>
          )}

          {/* Unmute Button Overlay */}
          {!isDimmed && !isLoading && !isPaused && isMuted && (
            <button 
              onClick={toggleMute}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-8 py-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-white shadow-2xl hover:bg-black transition-all group"
            >
              <div className="relative">
                <i className="fa-solid fa-volume-xmark text-yellow-500 group-hover:scale-110 transition-transform"></i>
                <div className="absolute -inset-2 bg-yellow-500/20 rounded-full blur animate-ping"></div>
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">Tap for Sound</span>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
