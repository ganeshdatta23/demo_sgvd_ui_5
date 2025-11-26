import React from 'react';
import { Navigation, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

interface CompassProps {
  heading: number;
  bearing: number;
  isAligned: boolean;
  angleDiff: number;
  isDarkMode: boolean;
}

export const Compass: React.FC<CompassProps> = ({ heading, bearing, isAligned, angleDiff, isDarkMode }) => {
  // Normalize angles for smooth rotation
  const compassRotation = -heading;
  const arrowRotation = bearing - heading;

  // Instruction Logic
  let instruction = "";
  let InstructionIcon = null;
  let instructionColor = "";
  let containerClass = "";

  if (isAligned) {
      instruction = "GO FORWARD";
      InstructionIcon = ArrowUp;
      instructionColor = "text-emerald-400";
      containerClass = isDarkMode 
        ? "border-emerald-900/50 bg-emerald-950/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]" 
        : "border-emerald-400/30 bg-emerald-900/20 shadow-[0_0_40px_rgba(52,211,153,0.3)]";
  } else if (angleDiff > 0) {
      instruction = "TURN RIGHT";
      InstructionIcon = ArrowRight;
      instructionColor = "text-gold";
      containerClass = isDarkMode 
        ? "border-stone-800 bg-stone-900/60" 
        : "border-white/10 bg-black/20";
  } else {
      instruction = "TURN LEFT";
      InstructionIcon = ArrowLeft;
      instructionColor = "text-gold";
      containerClass = isDarkMode 
        ? "border-stone-800 bg-stone-900/60" 
        : "border-white/10 bg-black/20";
  }

  return (
    <div className="flex flex-col items-center">
      {/* Heads Up Direction Instruction */}
      <div className={`mb-12 flex items-center gap-4 px-8 py-4 rounded-full border backdrop-blur-xl transition-all duration-500 shadow-lg ${containerClass}`}>
          {InstructionIcon && (
              <InstructionIcon 
                className={`${instructionColor} ${isAligned ? 'animate-bounce' : 'animate-pulse'}`} 
                size={32} 
              />
          )}
          <span className={`text-2xl font-display font-bold tracking-widest drop-shadow-md ${instructionColor}`}>
              {instruction}
          </span>
      </div>

      <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
        {/* Outer Glow Ring (active when aligned) */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-1000 blur-3xl
          ${isAligned ? 'bg-emerald-500/20 opacity-100 scale-110' : 'bg-gold/10 opacity-30 scale-100'}`}
        />

        {/* Main Compass Dial Container */}
        <div 
          className="absolute w-full h-full transition-transform duration-200 ease-out will-change-transform"
          style={{ transform: `rotate(${compassRotation}deg)` }}
        >
          {/* SVG Compass Dial */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            {/* Background Disc */}
            <circle 
                cx="50" cy="50" r="48" 
                fill={isDarkMode ? "#1c1917" : "rgba(0,0,0,0.25)"} 
                stroke={isDarkMode ? "#444" : "rgba(255,255,255,0.15)"} 
                strokeWidth="0.5" 
            />
            
            {/* Ticks */}
            {[...Array(72)].map((_, i) => {
              const isMajor = i % 18 === 0; // Cardinal
              const isSemi = i % 6 === 0 && !isMajor; 
              const angle = i * 5;
              // Colors
              const majorColor = isDarkMode ? "#FCD34D" : "#FFFFFF";
              const minorColor = isDarkMode ? "#57534e" : "rgba(255,255,255,0.25)";
              
              return (
                <line
                  key={i}
                  x1="50" y1={isMajor ? "4" : isSemi ? "7" : "9"}
                  x2="50" y2={isMajor ? "14" : "11"}
                  stroke={isMajor ? majorColor : minorColor}
                  strokeWidth={isMajor ? "1.2" : "0.4"}
                  strokeLinecap="round"
                  transform={`rotate(${angle} 50 50)`}
                />
              );
            })}

            {/* Cardinal Directions */}
            <text x="50" y="24" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold" fontFamily="sans-serif" style={{filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.5))'}}>N</text>
            <text x="82" y="52" textAnchor="middle" fill={isDarkMode ? "#a8a29e" : "#cbd5e1"} fontSize="5" fontWeight="600" fontFamily="sans-serif">E</text>
            <text x="50" y="82" textAnchor="middle" fill={isDarkMode ? "#a8a29e" : "#cbd5e1"} fontSize="5" fontWeight="600" fontFamily="sans-serif">S</text>
            <text x="18" y="52" textAnchor="middle" fill={isDarkMode ? "#a8a29e" : "#cbd5e1"} fontSize="5" fontWeight="600" fontFamily="sans-serif">W</text>
          </svg>
        </div>

        {/* Target Pointer Arrow (The "Qibla" Pointer) */}
        <div 
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-500 ease-out will-change-transform z-10"
          style={{ transform: `rotate(${arrowRotation}deg)` }}
        >
          <div className={`relative -top-[92px] transition-all duration-500 ${isAligned ? 'scale-110 drop-shadow-glow' : 'scale-100 opacity-90'}`}>
              <svg width="32" height="48" viewBox="0 0 30 45">
                  <defs>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                      </filter>
                  </defs>
                  <path 
                      d="M15 0 L30 40 L15 30 L0 40 Z" 
                      fill={isAligned ? "#34d399" : "#fbbf24"} 
                      stroke={isAligned ? "#a7f3d0" : "#fff"}
                      strokeWidth="1.5"
                      filter="url(#glow)"
                  />
              </svg>
          </div>
        </div>

        {/* Center Hub (Digital Readout) */}
        <div className={`absolute z-20 w-32 h-32 rounded-full border flex flex-col items-center justify-center shadow-2xl backdrop-blur-2xl transition-colors duration-500
            ${isDarkMode ? 'bg-stone-950/80 border-stone-800' : 'bg-black/30 border-white/10'}`}>
          
          <div className="text-stone-400 text-[8px] tracking-[0.2em] uppercase mb-1">Heading</div>
          <div className="text-3xl font-bold text-white font-mono drop-shadow-lg">{Math.round(heading)}°</div>
          
          <div className="w-12 h-[1px] bg-white/10 my-2"></div>
          
          <div className={`flex items-center gap-1.5 ${isAligned ? 'text-emerald-400' : 'text-gold'}`}>
              <Navigation size={12} className={isAligned ? '' : 'rotate-45'} fill="currentColor" />
              <span className="text-xs font-bold tracking-wider">{Math.round(bearing)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};