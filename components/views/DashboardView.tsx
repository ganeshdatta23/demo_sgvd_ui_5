import React, { useState, useEffect } from 'react';
import { Sparkles, User, MapPin, Compass as CompassIcon, CircleDashed, Wind, Eye, UserCircle, LogOut } from 'lucide-react';
import { LocationTarget, Coordinates, BaseViewProps, Tab } from '../../types';
import { COLORS } from '../../constants';

interface DashboardViewProps extends BaseViewProps {
  target: LocationTarget;
  coords: Coordinates | null;
  distance: number;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  onNavigate: () => void;
  formatDistance: (km: number) => string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  isDarkMode,
  target,
  coords,
  distance,
  isLoggedIn,
  setIsLoggedIn,
  onNavigate,
  formatDistance
}) => {
  const [dashboardSlide, setDashboardSlide] = useState<'appaji' | 'user'>('appaji');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadStats();
    }
  }, [isLoggedIn]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const { apiClient } = await import('../../api/client');
      const data = await apiClient.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { apiClient } = await import('../../api/client');
    apiClient.logout();
    setIsLoggedIn(false);
    setStats(null);
  };
  
  const cardClass = isDarkMode ? COLORS.dark.card : COLORS.light.card;
  const subTextClass = isDarkMode ? COLORS.dark.subText : COLORS.light.subText;
  const headingClass = isDarkMode ? COLORS.dark.heading : COLORS.light.heading;

  return (
    <div className="flex-1 flex flex-col w-full px-6 pt-12 pb-24 animate-slide-up overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-6 pt-safe">
          <h2 className="text-3xl font-display font-bold text-white drop-shadow-lg">Dashboard</h2>
      </div>

      {/* Slide Toggle */}
      <div className={`flex p-1.5 rounded-2xl mb-8 border transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-black/20 border-white/10 backdrop-blur-md'}`}>
          <button 
            onClick={() => setDashboardSlide('appaji')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2
            ${dashboardSlide === 'appaji' 
                ? (isDarkMode ? 'bg-stone-800 text-gold shadow-md' : 'bg-white/10 text-white shadow-inner border border-white/10') 
                : (isDarkMode ? 'text-stone-500' : 'text-white/60')}`}
          >
            <Sparkles size={16} /> Appaji
          </button>
          <button 
            onClick={() => setDashboardSlide('user')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2
            ${dashboardSlide === 'user' 
                ? (isDarkMode ? 'bg-stone-800 text-white shadow-md' : 'bg-white/10 text-white shadow-inner border border-white/10') 
                : (isDarkMode ? 'text-stone-500' : 'text-white/60')}`}
          >
            <User size={16} /> My Journey
          </button>
      </div>
      
      {dashboardSlide === 'appaji' ? (
          <div className="animate-fade-in space-y-6">
              {/* Appaji's Card */}
              <div className={`rounded-3xl overflow-hidden relative border transition-all duration-500 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-md'}`}>
                  <div className="h-36 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-saffron/40 to-transparent mix-blend-overlay"></div>
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                      <div className={`w-28 h-28 rounded-full border-4 absolute -bottom-14 left-1/2 -translate-x-1/2 overflow-hidden shadow-2xl z-10 ${isDarkMode ? 'border-stone-900 bg-stone-800' : 'border-white/20 bg-white/10'}`}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Sri_Ganapathy_Sachchidananda_Swamiji.jpg" alt="Swamiji" className="w-full h-full object-cover" />
                      </div>
                  </div>
                  <div className="pt-16 pb-8 px-6 text-center">
                      <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-gold' : 'text-white drop-shadow-md'}`}>Sri Swamiji</h3>
                      <p className={`text-xs mt-1 uppercase tracking-widest font-medium ${subTextClass}`}>Avadhoota Datta Peetham</p>
                      
                      <div className={`mt-6 text-left p-5 rounded-2xl border relative overflow-hidden ${isDarkMode ? 'bg-stone-950/50 border-stone-800' : 'bg-black/20 border-white/10'}`}>
                          <Sparkles className="absolute top-3 right-3 text-gold/20" size={40} />
                          <p className={`text-sm leading-relaxed italic relative z-10 ${isDarkMode ? 'text-stone-300' : 'text-white/90'}`}>
                              "Music is the language of God. It is the bridge between the individual soul and the universal soul."
                          </p>
                      </div>
                  </div>
              </div>

              <div className={`rounded-3xl p-6 border ${cardClass}`}>
                  <div className="flex justify-between items-center mb-5">
                      <h4 className={`font-bold flex items-center gap-2 ${headingClass}`}>
                          <div className="w-1 h-5 bg-gold rounded-full shadow-glow"></div>
                          Target Details
                      </h4>
                      <button 
                          onClick={onNavigate}
                          className="text-[10px] font-bold text-stone-900 bg-gold px-4 py-2 rounded-full hover:bg-yellow-400 transition-all flex items-center gap-1 shadow-glow active:scale-95"
                      >
                          <CompassIcon size={12} /> NAVIGATE
                      </button>
                  </div>
                  <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-gold shrink-0 shadow-lg border ${isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-black/30 border-white/10'}`}>
                            <MapPin size={20} />
                          </div>
                          <div className="flex-1 pt-1">
                              <h5 className={`text-base font-bold leading-tight ${headingClass}`}>{target.name}</h5>
                              <p className={`text-xs mt-1 leading-snug ${subTextClass}`}>{target.description || "Ashram Location"}</p>
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-stone-950/50 border-stone-800' : 'bg-black/20 border-white/10'}`}>
                            <div className={`text-[9px] uppercase tracking-wider mb-1 opacity-60 ${subTextClass}`}>Latitude</div>
                            <div className="text-sm font-mono text-gold">{target.coords.latitude.toFixed(5)}°N</div>
                        </div>
                        <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-stone-950/50 border-stone-800' : 'bg-black/20 border-white/10'}`}>
                            <div className={`text-[9px] uppercase tracking-wider mb-1 opacity-60 ${subTextClass}`}>Longitude</div>
                            <div className="text-sm font-mono text-gold">{target.coords.longitude.toFixed(5)}°E</div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-stone-800/30 border-stone-800' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex items-center gap-2">
                            <CompassIcon size={16} className="text-gold/70" />
                            <span className={`text-xs font-medium ${subTextClass}`}>Direct Path</span>
                        </div>
                        <span className="text-base font-bold text-white font-mono">{coords ? formatDistance(distance) : '--'}</span>
                      </div>
                  </div>
              </div>
          </div>
      ) : (
          <div className="animate-fade-in space-y-6">
              {/* Header with Login Toggle for Demo */}
              <div className="flex justify-between items-center px-2">
                  <h3 className={`text-lg font-bold ${headingClass}`}>My Profile</h3>
                  {isLoggedIn && (
                    <button 
                        onClick={handleLogout}
                        className="text-xs font-medium px-3 py-1 rounded-full border transition-colors bg-red-500/20 border-red-500/30 text-red-200 flex items-center gap-1"
                    >
                        <LogOut size={12} /> Sign Out
                    </button>
                  )}
              </div>

              {/* Your Details (Location) */}
              <div className={`rounded-3xl p-6 border ${cardClass}`}>
                  <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 shadow-lg ${isDarkMode ? 'bg-stone-800 border-stone-700' : 'bg-white/10 border-white/20'}`}>
                          <UserCircle size={40} className={isDarkMode ? 'text-stone-400' : 'text-white/80'} />
                      </div>
                      <div>
                          <h4 className={`text-xl font-bold ${headingClass}`}>{isLoggedIn ? "Sadhaka" : "Guest User"}</h4>
                          <div className={`flex items-center gap-1.5 text-xs mt-1 ${subTextClass}`}>
                              <div className={`w-2 h-2 rounded-full ${coords ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></div>
                              {coords ? "Live Tracking Active" : "Location Unavailable"}
                          </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                      <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-stone-950/50 border-stone-800' : 'bg-black/20 border-white/10'}`}>
                          <div className={`text-[9px] uppercase tracking-wider mb-1 opacity-60 ${subTextClass}`}>My Latitude</div>
                          <div className="text-sm font-mono text-gold">{coords ? coords.latitude.toFixed(5) : '--'}</div>
                      </div>
                      <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-stone-950/50 border-stone-800' : 'bg-black/20 border-white/10'}`}>
                          <div className={`text-[9px] uppercase tracking-wider mb-1 opacity-60 ${subTextClass}`}>My Longitude</div>
                          <div className="text-sm font-mono text-gold">{coords ? coords.longitude.toFixed(5) : '--'}</div>
                      </div>
                  </div>
              </div>

              {/* Logged In Data */}
              {isLoggedIn ? (
                  <>
                      <h4 className={`text-sm font-bold uppercase tracking-widest opacity-80 px-2 ${subTextClass}`}>Spiritual Progress</h4>
                      
                      {/* Japa Streak */}
                      <div className={`p-5 rounded-3xl border ${cardClass}`}>
                          <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-amber-900/20 text-amber-500' : 'bg-amber-500/20 text-amber-200'}`}>
                                        <CircleDashed size={24} />
                                    </div>
                                    <div>
                                        <div className={`text-2xl font-display font-bold ${headingClass}`}>{stats?.japa_count || 0} <span className="text-xs font-sans font-medium opacity-60">total</span></div>
                                        <div className={`text-xs font-medium ${subTextClass}`}>Japa Count</div>
                                    </div>
                              </div>
                              <div className="text-right">
                                  <div className="text-xs text-emerald-400 font-bold">+12%</div>
                                  <div className={`text-[10px] ${subTextClass}`}>vs last month</div>
                              </div>
                          </div>
                          <button 
                              onClick={async () => {
                                  try {
                                      const { apiClient } = await import('../../api/client');
                                      await apiClient.logJapa(108);
                                      await loadStats();
                                  } catch (error) {
                                      console.error('Failed to log japa:', error);
                                  }
                              }}
                              className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-sm font-medium transition-colors border border-amber-500/30"
                          >
                              + Log 108 Japa
                          </button>
                      </div>

                      {/* Pranayama & Darshan Grid */}
                      <div className="grid grid-cols-2 gap-4">
                          {/* Pranayama */}
                          <div className={`p-4 rounded-3xl border flex flex-col ${cardClass}`}>
                              <div className="flex justify-between items-start mb-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-500/20 text-blue-200'}`}>
                                      <Wind size={20} />
                                  </div>
                                  <span className="text-xs font-mono opacity-50">CYC</span>
                              </div>
                              <div className="mb-3">
                                  <div className={`text-2xl font-display font-bold ${headingClass}`}>{stats?.pranayama_count || 0}</div>
                                  <div className={`text-xs font-medium ${subTextClass}`}>Pranayama</div>
                              </div>
                              <button 
                                  onClick={async () => {
                                      try {
                                          const { apiClient } = await import('../../api/client');
                                          await apiClient.logPranayama(1);
                                          await loadStats();
                                      } catch (error) {
                                          console.error('Failed to log pranayama:', error);
                                      }
                                  }}
                                  className="w-full py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-xs font-medium transition-colors border border-blue-500/30"
                              >
                                  + Log
                              </button>
                          </div>

                          {/* Darshan */}
                          <div className={`p-4 rounded-3xl border flex flex-col ${cardClass}`}>
                              <div className="flex justify-between items-start mb-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-500/20 text-purple-200'}`}>
                                      <Eye size={20} />
                                  </div>
                                  <span className="text-xs font-mono opacity-50">VIS</span>
                              </div>
                              <div className="mb-3">
                                  <div className={`text-2xl font-display font-bold ${headingClass}`}>{stats?.darshan_count || 0}</div>
                                  <div className={`text-xs font-medium ${subTextClass}`}>Darshanam</div>
                              </div>
                              <button 
                                  onClick={async () => {
                                      try {
                                          const { apiClient } = await import('../../api/client');
                                          await apiClient.logDarshan();
                                          await loadStats();
                                      } catch (error) {
                                          console.error('Failed to log darshan:', error);
                                      }
                                  }}
                                  className="w-full py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs font-medium transition-colors border border-purple-500/30"
                              >
                                  + Log
                              </button>
                          </div>
                      </div>
                      
                      {/* Recent Visits */}
                      <div className={`rounded-3xl p-6 mt-2 border ${cardClass}`}>
                          <h4 className={`font-bold mb-4 text-lg ${headingClass}`}>Recent Visits</h4>
                          <div className="space-y-4">
                              <div className={`flex justify-between items-center text-sm border-b pb-3 ${isDarkMode ? 'border-stone-800' : 'border-white/10'}`}>
                                  <span className={`font-medium ${isDarkMode ? 'text-stone-300' : 'text-white/90'}`}>Nada Mantapa</span>
                                  <span className={`text-xs ${subTextClass}`}>2 days ago</span>
                              </div>
                              <div className={`flex justify-between items-center text-sm border-b pb-3 ${isDarkMode ? 'border-stone-800' : 'border-white/10'}`}>
                                  <span className={`font-medium ${isDarkMode ? 'text-stone-300' : 'text-white/90'}`}>Dattatreya Temple</span>
                                  <span className={`text-xs ${subTextClass}`}>5 days ago</span>
                              </div>
                          </div>
                      </div>
                  </>
              ) : (
                  <div className={`p-8 rounded-3xl border text-center ${cardClass}`}>
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <UserCircle size={32} className="opacity-50" />
                      </div>
                      <h3 className={`text-lg font-bold mb-2 ${headingClass}`}>Track Your Sadhana</h3>
                      <p className={`text-sm mb-6 ${subTextClass}`}>Sign in to view your Japa, Pranayama, and Darshan streaks.</p>
                      <button 
                          onClick={() => setIsLoggedIn(true)}
                          className="bg-gold text-stone-950 px-6 py-3 rounded-xl font-bold text-sm shadow-glow hover:scale-105 transition-transform"
                      >
                          Sign In to Continue
                      </button>
                  </div>
              )}
          </div>
      )}
    </div>
  );
};
