
import React, { useState, useCallback } from 'react';
import VideoPlayer from './components/VideoPlayer';
import WhatsAppPopup from './components/WhatsAppPopup';

const App: React.FC = () => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Using a very stable sample video URL
  const VIDEO_URL = "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  
  // WhatsApp Configuration
  const WHATSAPP_NUMBER = "60174599265"; 
  const WHATSAPP_MESSAGE = "Hi, I would like to ask for more information about Gold-G Jeli Gamat. 你好，我想咨询 Gold-G Jeli Gamat 的更多详情。";

  const handleVideoEnd = useCallback(() => {
    setIsVideoEnded(true);
  }, []);

  const startExperience = () => {
    setHasStarted(true);
    setIsVideoEnded(false);
  };

  const handleReplay = () => {
    setHasStarted(false);
    setIsVideoEnded(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center font-['Inter']">
      {!hasStarted ? (
        <div className="z-50 text-center px-6 animate-in fade-in duration-1000">
          {/* Logo Section */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-500/10 rounded-full blur-3xl"></div>
              <img 
                src="logo.png" 
                alt="Gold-G" 
                className="relative w-24 h-24 md:w-32 md:h-32 object-contain rounded-full border border-white/10 shadow-2xl bg-zinc-900/50 p-2"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Gold+G&background=d4af37&color=fff&size=128";
                }}
              />
            </div>
          </div>

          <div className="mb-12 space-y-6">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-yellow-400 to-amber-700">
                Gold-G
              </span>
              <br />
              <span className="text-2xl md:text-4xl tracking-[0.1em] text-zinc-400">Jeli Gamat</span>
            </h1>
            
            <div className="space-y-4 max-w-sm mx-auto">
              <div className="h-px w-12 bg-yellow-600 mx-auto opacity-50"></div>
              <div className="space-y-2">
                <p className="text-zinc-200 text-lg md:text-xl font-bold tracking-wide">Cara Pengesahan & Tuntutan</p>
                <p className="text-zinc-500 text-xs md:text-sm italic font-light">Verification & Redemption</p>
                <p className="text-zinc-300 text-lg md:text-xl font-medium">产品正品验证与领取</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={startExperience}
            className="group relative inline-flex items-center px-12 py-5 font-black text-white transition-all duration-300 bg-zinc-900 rounded-full hover:scale-105 active:scale-95 border border-yellow-500/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-700/20 to-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative tracking-[0.3em] text-xs">WATCH VIDEO</span>
            <i className="fa-solid fa-chevron-right relative ml-4 text-[10px] text-yellow-500 group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      ) : (
        <>
          <VideoPlayer 
            src={VIDEO_URL} 
            onEnded={handleVideoEnd} 
            isDimmed={isVideoEnded}
            autoStart={true}
          />
          
          {isVideoEnded && (
            <WhatsAppPopup 
              phoneNumber={WHATSAPP_NUMBER} 
              message={WHATSAPP_MESSAGE} 
              onReplay={handleReplay}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
