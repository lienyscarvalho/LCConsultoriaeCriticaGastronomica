
import React from 'react';
import { AppView } from '../types.ts';
import { Icons } from '../constants.tsx';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: <Icons.Dashboard /> },
    { id: AppView.SAFETY_SOP, label: 'Segurança & POPs', icon: <Icons.Safety /> },
    { id: AppView.MENU_MANAGEMENT, label: 'Engenharia Cardápio', icon: <Icons.Menu /> },
    { id: AppView.FINANCIAL_MANAGEMENT, label: 'Gestão Financeira', icon: <Icons.Finance /> },
    { id: AppView.TRAINING, label: 'Treinamentos', icon: <Icons.Training /> },
    { id: AppView.CRITIQUE_AI, label: 'Consultoria IA', icon: <Icons.Critique /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col border-r border-slate-800 shadow-xl z-50">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-serif text-amber-500 font-bold tracking-tighter italic leading-none">LC</h1>
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1 leading-tight">
          CONSULTORIA E CRÍTICA GASTRONÔMICA
        </p>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
              currentView === item.id 
                ? 'bg-amber-700 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-500 flex flex-col items-center">
        <p className="font-bold text-slate-400">Lienys Carvalho</p>
        <p>&copy; 2024 LC Gastronomia</p>
      </div>
    </aside>
  );
};

export default Sidebar;
