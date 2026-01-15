import React, { useState } from 'react';
import { Sparkles, User, MapPin, Compass as CompassIcon, CircleDashed, Wind, Eye, UserCircle, LogOut } from 'lucide-react';
import { LocationTarget, Coordinates, BaseViewProps } from '../../types';
import { COLORS } from '../../constants';
import {
    useSpiritualGetSpiritualStats,
    useSpiritualLogJapa,
    useSpiritualLogPranayama,
    useSpiritualLogDarshan
} from '../../src/generated/hooks/useSpiritual';
import { TokenManager } from '../../api/config';

interface DashboardViewProps extends BaseViewProps {
    target: LocationTarget;
    coords: Coordinates | null;
    distance: number;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
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
    const { data: stats, refetch: refetchStats } = useSpiritualGetSpiritualStats({ enabled: isLoggedIn });

    const japaMutation = useSpiritualLogJapa({ onSuccess: () => refetchStats() });
    const pranayamaMutation = useSpiritualLogPranayama({ onSuccess: () => refetchStats() });
    const darshanMutation = useSpiritualLogDarshan({ onSuccess: () => refetchStats() });

    const cardClass = isDarkMode ? COLORS.dark.card : COLORS.light.card;
    const subTextClass = isDarkMode ? COLORS.dark.subText : COLORS.light.subText;

    const handleLogout = () => {
        TokenManager.removeToken();
        setIsLoggedIn(false);
    };

    const handleLogJapa = (count: number) => {
        japaMutation.mutate({ requestBody: { count } });
    };

    const handleLogPranayama = (count: number) => {
        pranayamaMutation.mutate({ requestBody: { count } });
    };

    const handleLogDarshan = () => {
        darshanMutation.mutate({ requestBody: { count: 1 } });
    };

    if (!isLoggedIn) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/20">
                    <UserCircle className="text-gold" size={40} />
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-2">Sign in to track progress</h2>
                <p className={`${subTextClass} mb-8 max-w-xs`}>
                    Join our community to log your spiritual activities and see your growth.
                </p>
                <button
                    onClick={() => setIsLoggedIn(true)}
                    className="bg-gold text-stone-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-glow"
                >
                    Get Started
                </button>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto w-full px-6 py-8 pb-32">
            {/* Header with User Info */}
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-1">My Progress</h2>
                    <div className="flex items-center gap-2 text-gold">
                        <Sparkles size={14} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">{stats?.active_days_count || 0} Day Streak</span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className={`p-3 rounded-2xl border transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white' : 'bg-white/10 border-white/20 text-white/60 hover:text-white'}`}
                >
                    <LogOut size={20} />
                </button>
            </div>

            {/* Target Status Card */}
            <div className={`rounded-3xl border p-6 mb-8 relative overflow-hidden group ${cardClass}`}>
                <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shadow-glow">
                            <MapPin className="text-stone-900" size={24} />
                        </div>
                        <div>
                            <p className={subTextClass}>Current Target</p>
                            <h3 className="text-xl font-bold text-white">{target.name}</h3>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-mono font-bold text-white">{coords ? formatDistance(distance) : '--'}</p>
                        <button
                            onClick={onNavigate}
                            className="text-gold text-xs font-bold uppercase tracking-widest mt-1 hover:underline"
                        >
                            Adjust Path
                        </button>
                    </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors" />
            </div>

            {/* Stats Summary Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
                <div className={`rounded-3xl border p-5 ${cardClass}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                            <CircleDashed size={18} />
                        </div>
                        <span className={subTextClass}>Japa</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">{stats?.total_japa || 0}</div>
                    <p className="text-[10px] text-stone-500 mt-1">Total Rounds</p>
                </div>

                <div className={`rounded-3xl border p-5 ${cardClass}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
                            <Wind size={18} />
                        </div>
                        <span className={subTextClass}>Pranayama</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">{stats?.total_pranayama || 0}</div>
                    <p className="text-[10px] text-stone-500 mt-1">Total Cycles</p>
                </div>
            </div>

            {/* Action Sections */}
            <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 ml-2">Quick Log</h4>

                {/* Japa Log */}
                <div className={`rounded-3xl border p-6 ${cardClass}`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <CircleDashed className="text-amber-500" size={20} />
                            <span className="font-bold text-white">Japa Counting</span>
                        </div>
                        <span className="text-xs font-mono text-stone-500">108 = 1 Round</span>
                    </div>
                    <div className="flex gap-2">
                        {[1, 4, 8, 16].map(num => (
                            <button
                                key={num}
                                onClick={() => handleLogJapa(num)}
                                disabled={japaMutation.isPending}
                                className="flex-1 bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/10 text-white p-3 rounded-2xl transition-all font-mono font-bold active:scale-95 disabled:opacity-50"
                            >
                                +{num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pranayama Log */}
                <div className={`rounded-3xl border p-6 ${cardClass}`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Wind className="text-sky-500" size={20} />
                            <span className="font-bold text-white">Pranayama</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {[5, 10, 20].map(num => (
                            <button
                                key={num}
                                onClick={() => handleLogPranayama(num)}
                                disabled={pranayamaMutation.isPending}
                                className="flex-1 bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/10 text-white p-3 rounded-2xl transition-all font-mono font-bold active:scale-95 disabled:opacity-50"
                            >
                                +{num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Darshan Log */}
                <div className={`rounded-3xl border p-6 ${cardClass}`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Eye className="text-emerald-500" size={20} />
                            <span className="font-bold text-white">Darshan Tracking</span>
                        </div>
                        {stats?.darshan_count_today > 0 && (
                            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold">COMPLETED TODAY</span>
                        )}
                    </div>
                    <button
                        onClick={handleLogDarshan}
                        disabled={darshanMutation.isPending || stats?.darshan_count_today > 0}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 border
              ${stats?.darshan_count_today > 0
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500/50 cursor-not-allowed'
                                : 'bg-gold border-gold text-stone-900 shadow-glow hover:bg-yellow-400'}`}
                    >
                        <CompassIcon size={20} />
                        {stats?.darshan_count_today > 0 ? 'Darshan Logged' : 'Log Daily Darshan'}
                    </button>
                    <p className="text-center text-[10px] text-stone-500 mt-4 leading-relaxed">
                        Darshan can only be logged once per day to maintain accuracy of your spiritual journey.
                    </p>
                </div>
            </div>
        </div>
    );
};
