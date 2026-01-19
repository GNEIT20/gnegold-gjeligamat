
import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  onEnded: () => void;
  isDimmed: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onEnded, isDimmed }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Autoplay was prevented by the browser. Interaction required.", error);
      });
    }
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ${isDimmed ? 'opacity-30 blur-sm scale-105' : 'opacity-100'}`}>
      <video
        ref={videoRef}
        src={src}
        onEnded={onEnded}
        className="object-cover w-full h-full"
        playsInline
        autoPlay
        // Muted is required for most browsers to allow autoplay, 
        // but since we have a "Start Experience" button, we can unmute it.
        muted={false} 
      />
    </div>
  );
};

export default VideoPlayer;
