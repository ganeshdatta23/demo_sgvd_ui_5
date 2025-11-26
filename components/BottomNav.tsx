import React from 'react';
import { Compass, Calendar, Settings, LayoutDashboard } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  isDarkMode?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, isDarkMode = false }) => {
  const navItems = [
    { id: 'home', label: 'Darshan', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'programs', label: 'Programs', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl shadow-glass z-50 pb-safe border-t transition-colors duration-500
        ${isDarkMode ? 'bg-stone-950/80 border-stone-900' : 'bg-black/30 border-white/5'}`}>
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as Tab)}
              className={`flex flex-col items-center justify-center w-full h-full relative group transition-all duration-300`}
            >
              {/* Active Glow */}
              {isActive && (
                <div className={`absolute top-0 w-16 h-0.5 rounded-full ${isDarkMode ? 'bg-gold shadow-[0_0_8px_#FFD700]' : 'bg-white shadow-[0_0_10px_white]'}`} />
              )}
              
              <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}>
                  <Icon 
                      size={isActive ? 24 : 22} 
                      className={`mb-1 transition-all duration-300 ${isActive ? (isDarkMode ? 'text-gold drop-shadow-glow' : 'text-white drop-shadow-glow') : (isDarkMode ? 'text-stone-600' : 'text-white/40')}`} 
                  />
              </div>
              
              <span className={`text-[10px] font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white opacity-100' : (isDarkMode ? 'text-stone-600' : 'text-white/40')}`}>
                  {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
