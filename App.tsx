
import React, { useState, useCallback, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import WhatsAppPopup from './components/WhatsAppPopup';

const App: React.FC = () => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // You can replace this URL with your actual video hosted on GitHub or a CDN
  const VIDEO_URL = "video.mp4";
  const WHATSAPP_NUMBER = "+60174599265"; // REPLACE WITH YOUR NUMBER
  const WHATSAPP_MESSAGE = "Hi, I would like to ask for more information. 你好，我想咨询更多详情。";

  const handleVideoEnd = useCallback(() => {
    setIsVideoEnded(true);
  }, []);

  const startExperience = () => {
    setHasStarted(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {!hasStarted ? (
        <div className="z-50 text-center animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
            Watch <span className="text-emerald-500">Now</span>
          </h1>
          <button 
            onClick={startExperience}
            className="group relative inline-flex items-center px-12 py-4 font-semibold text-white transition-all duration-300 bg-emerald-600 rounded-full hover:bg-emerald-500 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-900/20"
          >
            Play
            <i className="fa-solid fa-play ml-3 group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      ) : (
        <>
          <VideoPlayer 
            src={VIDEO_URL} 
            onEnded={handleVideoEnd} 
            isDimmed={isVideoEnded}
          />
          
          {isVideoEnded && (
            <WhatsAppPopup 
              phoneNumber={WHATSAPP_NUMBER} 
              message={WHATSAPP_MESSAGE} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
