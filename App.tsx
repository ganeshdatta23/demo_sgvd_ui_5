import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useSensors } from './hooks/useSensors';
import { useBearing } from './hooks/useBearing';
import { DEFAULT_TARGET, COLORS } from './constants';
import { LocationTarget, Tab } from './types';
import { BottomNav } from './components/BottomNav';
import { LoginModal } from './components/LoginModal';

// Views
import { HomeView } from './components/views/HomeView';
import { DashboardView } from './components/views/DashboardView';
import { ProgramsView } from './components/views/ProgramsView';
import { SettingsView } from './components/views/SettingsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [target, setTarget] = useState<LocationTarget>(DEFAULT_TARGET);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check if user is logged in on mount
  React.useEffect(() => {
    import('./api/config').then(({ TokenManager }) => {
      setIsLoggedIn(TokenManager.isAuthenticated());
    });
  }, []);
  const [sunriseAlarm, setSunriseAlarm] = useState(false);
  
  // Global Sensor State
  const { coords, heading, error, requestCompassPermission, permissionGranted } = useSensors();
  const { bearing, distance, isAligned, angleDiff } = useBearing(coords, target.coords, heading);

  const formatDistance = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(2)} km`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            isDarkMode={isDarkMode}
            target={target}
            heading={heading}
            coords={coords}
            bearing={bearing}
            distance={distance}
            isAligned={isAligned}
            angleDiff={angleDiff}
            permissionGranted={permissionGranted}
            requestCompassPermission={requestCompassPermission}
            formatDistance={formatDistance}
          />
        );

      case 'dashboard':
        return (
          <DashboardView 
            isDarkMode={isDarkMode}
            target={target}
            coords={coords}
            distance={distance}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={(value) => {
              setIsLoggedIn(value);
              if (!value) setShowLoginModal(true);
            }}
            onNavigate={() => setActiveTab('home')}
            formatDistance={formatDistance}
          />
        );

      case 'programs':
        return (
          <ProgramsView isDarkMode={isDarkMode} />
        );

      case 'settings':
        return (
          <SettingsView 
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode}
            sunriseAlarm={sunriseAlarm}
            setSunriseAlarm={setSunriseAlarm}
          />
        );
    }
  };

  return (
    <div className={`relative w-full h-screen flex flex-col items-center overflow-hidden font-sans transition-all duration-1000 ease-in-out
        ${isDarkMode ? COLORS.dark.background : COLORS.light.background} 
        ${isDarkMode ? 'text-stone-100' : 'text-white'}`}>
      
      {/* Background Effects */}
      {!isDarkMode && (
          <>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%] bg-amber-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          </>
      )}
      
      {/* Dark Mode Ambient Glow */}
      {isDarkMode && (
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-stone-900/80 via-stone-950 to-black pointer-events-none"></div>
      )}

      {/* Error Banner */}
      {error && (
         <div className="absolute top-24 z-50 bg-red-500/90 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-3 shadow-xl backdrop-blur-md animate-slide-down border border-red-400/30">
           <AlertTriangle size={16} />
           {error}
         </div>
      )}

      {renderContent()}

      <BottomNav currentTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode} />
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => setIsLoggedIn(true)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
