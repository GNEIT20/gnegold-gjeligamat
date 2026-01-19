
import React from 'react';

interface WhatsAppPopupProps {
  phoneNumber: string;
  message: string;
  onReplay: () => void;
}

const WhatsAppPopup: React.FC<WhatsAppPopupProps> = ({ phoneNumber, message, onReplay }) => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg transition-all duration-1000">
      <div className="bg-zinc-900 border border-yellow-900/30 p-8 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-sm w-full text-center transform animate-in slide-in-from-bottom-32 fade-in duration-700 fill-mode-both">
        <div className="mb-6 relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-500/20">
            <i className="fa-brands fa-whatsapp text-6xl"></i>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Verify Your Product</h2>
        <p className="text-zinc-400 mb-8 leading-relaxed text-sm">
          Please contact our official representative to verify your Gold-G product and redeem your rewards.
        </p>
        
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-900/20"
          >
            Chat with Support
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </a>
          
          <button 
            onClick={onReplay}
            className="w-full py-4 px-6 text-zinc-500 hover:text-white transition-all text-sm font-bold tracking-widest flex items-center justify-center"
          >
            <i className="fa-solid fa-rotate-left mr-2"></i>
            REPLAY VIDEO
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-500/50 font-black">
            Gold-G Official Verification
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPopup;
