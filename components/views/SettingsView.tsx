import React, { useEffect, useState } from 'react';
import { Moon, Sun, AlarmClock, AlertTriangle } from 'lucide-react';
import { BaseViewProps } from '../../types';
import { COLORS, APP_VERSION } from '../../constants';
import { TokenManager } from '../../api/config';

interface SettingsViewProps extends BaseViewProps {
  setIsDarkMode: (v: boolean) => void;
  sunriseAlarm: boolean;
  setSunriseAlarm: (v: boolean) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDarkMode,
  setIsDarkMode,
  sunriseAlarm,
  setSunriseAlarm
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cardClass = isDarkMode ? COLORS.dark.card : COLORS.light.card;

  useEffect(() => {
    setIsLoggedIn(TokenManager.isAuthenticated());
  }, []);

  const savePreferences = async () => {
    if (!isLoggedIn) return;
    try {
      const { apiClient } = await import('../../api/client');
      await apiClient.updateProfile({
        preferred_theme: isDarkMode ? 'dark' : 'light',
        sunrise_alarm_enabled: sunriseAlarm,
        haptic_feedback_enabled: true
      });
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full p-6 pt-12 pb-24 animate-slide-up overflow-y-auto no-scrollbar">
        <h2 className="text-3xl font-display font-bold text-white mb-8 drop-shadow-lg pt-safe">Settings</h2>
        
        <div className={`rounded-3xl overflow-hidden border mb-6 ${cardClass}`}>
              <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-stone-800' : 'border-white/10'}`}>
                <span className={`font-medium flex items-center gap-3 text-base ${isDarkMode ? 'text-stone-300' : 'text-white'}`}>
                    {isDarkMode ? <Moon size={20} className="text-blue-300" /> : <Sun size={20} className="text-gold" />}
                    Dark Mode
                </span>
                <button 
                    onClick={() => {
                      setIsDarkMode(!isDarkMode);
                      setTimeout(savePreferences, 100);
                    }}
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 relative ${isDarkMode ? 'bg-stone-700' : 'bg-black/30'}`}
                >
                    <div className={`w-6 h-6 rounded-full shadow-md absolute top-1 transition-transform duration-300 flex items-center justify-center
                        ${isDarkMode ? 'translate-x-6 bg-stone-900 border border-stone-600' : 'translate-x-0 bg-white'}`}>
                    </div>
                </button>
            </div>

            {/* Swamiji Sunrise Alarm */}
            <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-stone-800' : 'border-white/10'}`}>
                <div className="flex flex-col">
                      <span className={`font-medium flex items-center gap-3 text-base ${isDarkMode ? 'text-stone-300' : 'text-white'}`}>
                        <AlarmClock size={20} className={sunriseAlarm ? "text-saffron" : "text-stone-400"} />
                        Swamiji Sunrise Alarm
                    </span>
                    <span className={`text-[10px] ml-8 mt-0.5 ${isDarkMode ? 'text-stone-500' : 'text-white/50'}`}>
                        Notification at Brahma Muhurta
                    </span>
                </div>
                <button 
                    onClick={() => {
                      setSunriseAlarm(!sunriseAlarm);
                      setTimeout(savePreferences, 100);
                    }}
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 relative ${isDarkMode ? 'bg-stone-700' : 'bg-black/30'}`}
                >
                    <div className={`w-6 h-6 rounded-full shadow-md absolute top-1 transition-transform duration-300 flex items-center justify-center
                        ${sunriseAlarm 
                            ? `translate-x-6 ${isDarkMode ? 'bg-saffron' : 'bg-saffron'}` 
                            : 'translate-x-0 bg-white'}`}>
                    </div>
                </button>
            </div>

            <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-stone-800' : 'border-white/10'}`}>
                <span className={`font-medium text-base ${isDarkMode ? 'text-stone-300' : 'text-white'}`}>Haptic Feedback</span>
                <div className={`w-12 h-7 rounded-full p-1 relative cursor-pointer ${isDarkMode ? 'bg-stone-700' : 'bg-black/20'}`}>
                    <div className="w-5 h-5 bg-emerald-400 rounded-full absolute right-1 shadow-md"></div>
                </div>
            </div>
            <div className="p-5 flex justify-between items-center">
                <span className={`font-medium text-base ${isDarkMode ? 'text-stone-300' : 'text-white'}`}>Distance Units</span>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${isDarkMode ? 'bg-stone-800 text-gold' : 'bg-white/10 text-white border border-white/10'}`}>METRIC</span>
            </div>
        </div>
        
        <div className="p-5 bg-red-900/20 border border-red-500/20 rounded-2xl flex gap-4 backdrop-blur-xl">
            <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-red-100/80 leading-relaxed">
                Please pay attention to your surroundings. Do not walk while staring at the compass.
            </div>
        </div>

        <div className="mt-auto pt-10 text-center">
            <p className={`text-xs font-medium opacity-50 ${isDarkMode ? 'text-stone-600' : 'text-white'}`}>{APP_VERSION}</p>
        </div>
    </div>
  );
};
