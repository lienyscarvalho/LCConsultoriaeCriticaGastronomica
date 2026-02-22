
import React, { useState } from 'react';

export const PermissionModal = ({ onAccept }: { onAccept: () => void }) => {
  const [camera, setCamera] = useState(true);
  const [mic, setMic] = useState(true);

  const handleApply = async () => {
    // Tenta solicitar permissão real ao navegador para garantir funcionamento
    try {
      await navigator.mediaDevices.getUserMedia({ video: camera, audio: mic });
    } catch (e) {
      console.warn("Permissão negada ou dispositivo não encontrado", e);
    }
    onAccept();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-[360px] p-6 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-slate-900">Access request</h3>
          <button onClick={onAccept} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">The app requests access to the following permissions:</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between border-2 border-slate-100 rounded-2xl p-4 hover:border-slate-200 transition-colors">
            <span className="text-slate-700 font-bold text-sm">Camera</span>
            <button 
              onClick={() => setCamera(!camera)}
              className={`w-12 h-7 rounded-full transition-all duration-300 relative cursor-pointer ${camera ? 'bg-slate-900' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-300 ${camera ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between border-2 border-slate-100 rounded-2xl p-4 hover:border-slate-200 transition-colors">
            <span className="text-slate-700 font-bold text-sm">Microphone</span>
            <button 
              onClick={() => setMic(!mic)}
              className={`w-12 h-7 rounded-full transition-all duration-300 relative cursor-pointer ${mic ? 'bg-slate-900' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-300 ${mic ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
            <button 
                onClick={handleApply}
                className="px-8 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
                Apply
            </button>
        </div>
      </div>
    </div>
  );
};
