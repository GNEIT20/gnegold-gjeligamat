
import React, { useState, useCallback } from 'react';
import VideoPlayer from './components/VideoPlayer';
import WhatsAppPopup from './components/WhatsAppPopup';

const App: React.FC = () => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // High-compatibility video link
  const VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-during-a-solar-eclipse-43588-large.mp4";
  
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
        <div className="z-50 text-center px-6 animate-in fade-in zoom-in duration-700">
          {/* Logo Section */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-600 to-amber-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <img 
                src="logo.png" 
                alt="Gold-G" 
                className="relative w-28 h-28 md:w-36 md:h-36 object-contain rounded-full bg-white/5 p-3 border border-white/10 shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Gold+G&background=d4af37&color=fff&size=128";
                }}
              />
            </div>
          </div>

          <div className="mb-12 space-y-6">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-500 to-amber-700">
                Gold-G Jeli Gamat
              </span>
            </h1>
            
            <div className="space-y-2">
              <p className="text-zinc-200 text-lg md:text-2xl font-semibold tracking-wide">Cara Pengesahan & Tuntutan Produk</p>
              <p className="text-zinc-400 text-sm md:text-lg italic font-light">Product Verification & Redemption</p>
              <p className="text-zinc-300 text-lg md:text-2xl font-medium">产品正品验证与领取</p>
            </div>
          </div>
          
          <button 
            onClick={startExperience}
            className="group relative inline-flex items-center px-14 py-6 font-black text-white transition-all duration-500 bg-gradient-to-br from-yellow-700 to-amber-900 rounded-full hover:from-yellow-500 hover:to-amber-700 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(180,140,0,0.4)] border border-yellow-500/20"
          >
            <span className="tracking-[0.2em]">WATCH NOW</span>
            <div className="ml-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <i className="fa-solid fa-play text-sm translate-x-0.5"></i>
            </div>
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
