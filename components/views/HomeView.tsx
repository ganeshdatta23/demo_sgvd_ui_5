import React from 'react';
import { LocationTarget, Coordinates, BaseViewProps } from '../../types';
import { Compass } from '../Compass';
import { LocationSearch } from '../LocationSearch';
import { DarshanOverlay } from '../DarshanOverlay';

interface HomeViewProps extends BaseViewProps {
  target: LocationTarget;
  heading: number;
  coords: Coordinates | null;
  bearing: number;
  distance: number;
  isAligned: boolean;
  angleDiff: number;
  permissionGranted: boolean;
  requestCompassPermission: () => void;
  formatDistance: (km: number) => string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  target,
  isDarkMode,
  heading,
  coords,
  bearing,
  distance,
  isAligned,
  angleDiff,
  permissionGranted,
  requestCompassPermission,
  formatDistance
}) => {
  
  const subTextClass = isDarkMode ? "text-stone-500" : "text-amber-100/70";

  return (
    <div className="flex-1 flex flex-col w-full h-full relative">
      <LocationSearch currentTarget={target} isDarkMode={isDarkMode} />
      
      <div className="flex-1 flex flex-col items-center justify-center w-full relative pb-20">
        {/* Compass Visualization with turn instructions inside */}
        <div className="scale-90 md:scale-100 transition-transform duration-500">
          <Compass 
              heading={heading} 
              bearing={bearing} 
              isAligned={isAligned} 
              angleDiff={angleDiff}
              isDarkMode={isDarkMode}
          />
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-24 w-full px-6 flex gap-3 justify-center">
            <div className={`px-6 py-3 rounded-2xl flex flex-col items-center min-w-[100px] border transition-colors duration-500
              ${isDarkMode ? 'bg-stone-900/80 border-stone-800 backdrop-blur-md' : 'bg-black/20 border-white/10 backdrop-blur-xl shadow-lg'}`}>
                <div className={`text-[10px] uppercase tracking-widest font-medium ${subTextClass}`}>Dist</div>
                <div className="text-xl font-bold text-white font-mono drop-shadow-md">
                    {coords ? formatDistance(distance) : '--'}
                </div>
            </div>
            
            <div className={`px-6 py-3 rounded-2xl flex flex-col items-center min-w-[100px] border transition-colors duration-500
              ${isDarkMode ? 'bg-stone-900/80 border-stone-800 backdrop-blur-md' : 'bg-black/20 border-white/10 backdrop-blur-xl shadow-lg'}`}>
                  <div className={`text-[10px] uppercase tracking-widest font-medium ${subTextClass}`}>Signal</div>
                  <div className={`text-sm font-bold mt-1 flex items-center gap-2 ${coords ? 'text-emerald-400' : 'text-amber-400'}`}>
                      <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${coords ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                      {coords ? 'GPS OK' : 'SEARCH'}
                  </div>
            </div>
        </div>

        {/* iOS Permission Button */}
        {(!permissionGranted && typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') && (
            <button 
                onClick={requestCompassPermission}
                className="absolute bottom-44 bg-gold text-stone-900 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-glow animate-pulse"
            >
                Enable Compass
            </button>
        )}
      </div>

      {/* Immersive Overlay only on Home */}
      <DarshanOverlay visible={isAligned} />
    </div>
  );
};