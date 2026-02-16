
import React from 'react';
import { AppView } from '../types.ts';
import { Icons } from '../constants.tsx';

interface MobileNavProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Home', icon: <Icons.Dashboard /> },
    { id: AppView.SAFETY_SOP, label: 'SOP', icon: <Icons.Safety /> },
    { id: AppView.MENU_MANAGEMENT, label: 'Menu', icon: <Icons.Menu /> },
    { id: AppView.TRAINING, label: 'Train', icon: <Icons.Training /> },
    { id: AppView.CRITIQUE_AI, label: 'AI', icon: <Icons.Critique /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-slate-900 md:hidden flex justify-around items-center py-3 border-t border-slate-800 z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={`flex flex-col items-center space-y-1 transition-colors duration-200 cursor-pointer p-2 ${
            currentView === item.id ? 'text-amber-500' : 'text-slate-500'
          }`}
        >
          {item.icon}
          <span className="text-[10px] uppercase font-bold tracking-tighter">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
