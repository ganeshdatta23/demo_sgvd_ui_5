import React from 'react';
import { MapPin } from 'lucide-react';
import { LocationTarget } from '../types';

interface LocationSearchProps {
  currentTarget: LocationTarget;
  isDarkMode: boolean;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ currentTarget, isDarkMode }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 p-4 pt-safe">
      <div className={`w-full flex items-center justify-between px-6 py-4 rounded-full backdrop-blur-xl border shadow-lg transition-all duration-500 animate-slide-down ${
            isDarkMode 
            ? 'bg-stone-900/80 border-stone-800 text-gold' 
            : 'bg-white/5 border-white/10 text-white'
        }`}>
            <div className="flex flex-col">
                <h1 className="font-display text-xl font-bold tracking-wide drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold">
                    Shri Guru Dig Vandanam
                </h1>
                <div className="flex items-center gap-1.5 text-[10px] font-medium tracking-wide mt-0.5 opacity-80">
                     <MapPin size={10} className={isDarkMode ? 'text-saffron' : 'text-gold'} />
                     <span className="uppercase truncate max-w-[200px]">{currentTarget.name}</span>
                </div>
            </div>
        </div>
    </div>
  );
};