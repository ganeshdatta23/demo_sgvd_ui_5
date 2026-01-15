import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import { BaseViewProps } from '../../types';
import { COLORS } from '../../constants';
import { useEventsListEvents } from '../../src/generated/hooks/useEvents';

export const ProgramsView: React.FC<BaseViewProps> = ({ isDarkMode }) => {
  const { data: events = [], isLoading: loading } = useEventsListEvents();
  const cardClass = isDarkMode ? COLORS.dark.card : COLORS.light.card;
  const subTextClass = isDarkMode ? COLORS.dark.subText : COLORS.light.subText;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto w-full px-6 py-8 pb-32">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gold/10 border border-gold/20">
          <Calendar className="text-gold" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Programs</h2>
          <p className={subTextClass}>Upcoming events & sessions</p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => {
          const { day, month, time } = formatDate(event.event_date);
          return (
            <div
              key={event.id}
              className={`group relative overflow-hidden rounded-3xl border p-5 transition-all duration-300 hover:scale-[1.02] active:scale-95 ${cardClass}`}
            >
              <div className="flex gap-5">
                {/* Date Badge */}
                <div className="flex flex-col items-center justify-center min-w-[64px] h-[64px] rounded-2xl bg-gold/10 border border-gold/20">
                  <span className="text-gold text-2xl font-bold leading-none">{day}</span>
                  <span className="text-gold/60 text-[10px] font-bold uppercase tracking-wider mt-1">{month}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-lg text-white truncate group-hover:text-gold transition-colors">
                      {event.title}
                    </h3>
                    <ChevronRight className="text-white/20 group-hover:text-gold transition-colors" size={20} />
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gold/80 font-medium">{time}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className={`${subTextClass} truncate`}>{event.location_name}</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          );
        })}

        {events.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Calendar className="text-white/20" size={32} />
            </div>
            <p className="text-white/40">No upcoming programs scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
};
