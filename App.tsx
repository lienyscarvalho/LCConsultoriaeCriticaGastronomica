
import React, { useState, useEffect } from 'react';
import { AppView } from './types.ts';
import Sidebar from './components/Sidebar.tsx';
import MobileNav from './components/MobileNav.tsx';
import Dashboard from './components/Dashboard.tsx';
import SafetySOP from './components/SafetySOP.tsx';
import MenuManagement from './components/MenuManagement.tsx';
import Training from './components/Training.tsx';
import AIConsultant from './components/AIConsultant.tsx';
import FinancialManagement from './components/FinancialManagement.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [notification, setNotification] = useState<{msg: string, type: 'info' | 'success'} | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNotification = (msg: string, type: 'info' | 'success' = 'info') => {
    setNotification({ msg, type });
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: 
        return <Dashboard 
          onAction={(msg) => showNotification(msg || "Ação realizada")} 
          onNavigate={handleViewChange} 
        />;
      case AppView.SAFETY_SOP: 
        return <SafetySOP onAction={(msg) => showNotification(msg || "Ação realizada", 'success')} />;
      case AppView.MENU_MANAGEMENT: 
        return <MenuManagement onAction={(msg) => showNotification(msg || "Ação realizada", 'success')} />;
      case AppView.FINANCIAL_MANAGEMENT:
        return <FinancialManagement onAction={(msg) => showNotification(msg || "Ação realizada", 'success')} />;
      case AppView.TRAINING: 
        return <Training onAction={(msg) => showNotification(msg || "Ação realizada", 'success')} />;
      case AppView.CRITIQUE_AI: 
        return <AIConsultant onAction={(msg) => showNotification(msg || "Ação realizada")} />;
      default: 
        return <Dashboard onAction={(msg) => showNotification(msg || "Ação realizada")} onNavigate={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      
      <main className="flex-1 md:ml-64 p-4 md:p-10 pb-24 md:pb-10 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Header Bar */}
          <div className="flex justify-between items-center mb-10 print:hidden">
            <div className="md:hidden">
              <h1 className="text-xl font-serif text-amber-700 font-bold tracking-tighter italic leading-none">LC</h1>
              <p className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Consultoria & Crítica</p>
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm uppercase tracking-[0.3em] text-slate-400 font-bold">LC CONSULTORIA E CRÍTICA GASTRONÔMICA</h1>
            </div>
            <div className="flex items-center space-x-4">
               <button 
                 onClick={() => showNotification("Central de Mensagens: Ativa.", 'info')}
                 className="p-2 text-slate-400 hover:text-slate-900 bg-white rounded-full border border-slate-100 shadow-sm transition-colors"
                >
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
               </button>
               <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                  <div className="text-right hidden sm:block">
                     <p className="text-xs font-bold text-slate-900">Lienys Carvalho</p>
                     <p className="text-[10px] text-slate-500 uppercase font-medium">Consultora Sênior</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-700 border-2 border-white shadow-md flex items-center justify-center text-white font-serif font-bold italic">
                    LC
                  </div>
               </div>
            </div>
          </div>

          <div className="animate-fadeIn relative">
            {renderView()}
          </div>
        </div>
      </main>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-[100] px-6 py-3 rounded-xl shadow-2xl border animate-slideIn flex items-center space-x-3 ${
          notification.type === 'success' ? 'bg-emerald-900 border-emerald-700 text-white' : 'bg-slate-900 border-slate-700 text-white'
        }`}>
          {notification.type === 'success' && <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
          <p className="text-sm font-medium">{notification.msg}</p>
        </div>
      )}

      <MobileNav currentView={currentView} onViewChange={handleViewChange} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
        @media print { 
          body { background: white; } 
          .no-print { display: none !important; }
          main { margin-left: 0 !important; padding: 0 !important; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .print\\:mb-12 { margin-bottom: 3rem !important; }
          .print\\:border-none { border: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default App;
