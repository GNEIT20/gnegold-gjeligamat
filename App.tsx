
import React, { useState, useCallback } from 'react';
import VideoPlayer from './components/VideoPlayer';
import WhatsAppPopup from './components/WhatsAppPopup';

const App: React.FC = () => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Video Source (Replace with your actual video.mp4 if preferred)
  const VIDEO_URL = "video.mp4";
  
  // WhatsApp Configuration
  const WHATSAPP_NUMBER = "60174599265"; 
  const WHATSAPP_MESSAGE = "Hi, I would like to ask for more information about Gold-G Jeli Gamat.";

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
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-amber-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              {/* Replace 'logo.png' with your actual logo file name */}
              <img 
                src="logo.png" 
                alt="Gold-G" 
                className="relative w-24 h-24 md:w-32 md:h-32 object-contain rounded-full bg-white/10 p-2 border border-white/20"
                onError={(e) => {
                  // Fallback if logo.png is missing
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Gold+G&background=d4af37&color=fff&size=128";
                }}
              />
            </div>
          </div>

          <div className="mb-10 space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-200">
                Gold-G Jeli Gamat
              </span>
            </h1>
            
            <div className="space-y-1">
              <p className="text-zinc-300 text-sm md:text-lg font-medium">Cara Pengesahan & Tuntutan Produk</p>
              <p className="text-zinc-400 text-xs md:text-base italic">Product Verification & Redemption</p>
              <p className="text-zinc-400 text-sm md:text-lg">产品正品验证与领取</p>
            </div>
          </div>
          
          <button 
            onClick={startExperience}
            className="group relative inline-flex items-center px-12 py-5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-yellow-700 to-yellow-600 rounded-full hover:from-yellow-600 hover:to-yellow-500 hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(180,140,0,0.3)]"
          >
            WATCH NOW
            <i className="fa-solid fa-circle-play ml-3 text-xl group-hover:scale-110 transition-transform"></i>
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
