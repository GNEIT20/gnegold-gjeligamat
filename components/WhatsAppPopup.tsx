
import React from 'react';

interface WhatsAppPopupProps {
  phoneNumber: string;
  message: string;
}

const WhatsAppPopup: React.FC<WhatsAppPopupProps> = ({ phoneNumber, message }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div className="bg-zinc-900/90 border border-zinc-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center transform animate-in slide-in-from-bottom-12 fade-in duration-700 delay-200 fill-mode-both backdrop-blur-xl">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full text-emerald-500">
          <i className="fa-brands fa-whatsapp text-5xl"></i>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Let's Connect!</h2>
        <p className="text-zinc-400 mb-8">
          Hope you enjoyed the presentation. Feel free to reach out to us directly on WhatsApp.
        </p>
        
        <div className="space-y-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-900/30"
          >
            Chat with us
            <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
          </a>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 px-6 text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium"
          >
            Replay Video
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-zinc-800/50">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
            Premium Experience Design
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPopup;
