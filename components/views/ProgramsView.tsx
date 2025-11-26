import React, { useState, useEffect } from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import { BaseViewProps } from '../../types';
import { COLORS } from '../../constants';

export const ProgramsView: React.FC<BaseViewProps> = ({ isDarkMode }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const cardClass = isDarkMode ? COLORS.dark.card : COLORS.light.card;
  const subTextClass = isDarkMode ? COLORS.dark.subText : COLORS.light.subText;

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { apiClient } = await import('../../api/client');
      const data = await apiClient.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate(),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };
  };

  return (
    <div className="flex-1 flex flex-col w-full p-6 pt-12 pb-24 animate-slide-up overflow-y-auto no-scrollbar">
      <h2 className="text-3xl font-display font-bold text-white mb-8 drop-shadow-lg pt-safe">Upcoming Events</h2>
      <div className="space-y-4">
          {loading ? (
            <div className={`p-8 rounded-2xl border text-center ${cardClass}`}>
              <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto mb-3"></div>
              <p className={`text-sm ${subTextClass}`}>Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            events.map((event) => {
              const { month, day, time } = formatDate(event.event_date);
              return (
                <div key={event.id} className={`rounded-2xl p-5 flex gap-5 items-center active:scale-95 transition-transform border ${cardClass}`}>
                  <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold border shadow-lg ${isDarkMode ? 'bg-stone-800 border-stone-700 text-gold' : 'bg-black/30 border-white/10 text-white backdrop-blur-md'}`}>
                    <span className={`text-[10px] uppercase tracking-wider opacity-80 mb-0.5`}>{month}</span>
                    <span className="text-2xl leading-none font-display">{day}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg leading-tight">{event.title}</h3>
                    <p className={`text-xs mt-1.5 ${subTextClass}`}>{event.location_name || 'Location TBA'} • {time}</p>
                  </div>
                  <ChevronRight size={20} className="opacity-40" />
                </div>
              );
            })
          ) : (
            <div className={`p-8 rounded-2xl border text-center ${cardClass}`}>
              <Calendar size={40} className="mx-auto mb-3 opacity-30" />
              <p className={`text-sm ${subTextClass}`}>No upcoming events</p>
            </div>
          )}
      </div>
    </div>
  );
};
