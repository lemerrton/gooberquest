'use client';

import { useAppStore } from '@/lib/store';

export default function ProgressChart() {
  const dayLogs = useAppStore((s) => s.dayLogs);

  const last7 = dayLogs.slice(-7);
  const maxXP = Math.max(...last7.map((d) => d.xpEarned), 100);

  if (last7.length === 0) {
    return (
      <div className="bg-gray-900/80 rounded-2xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-bold text-white mb-2">📊 Progress</h3>
        <p className="text-gray-400 text-sm">Complete your first day to see progress data here.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-bold text-white mb-4">📊 Weekly XP</h3>
      <div className="flex items-end gap-2 h-32">
        {last7.map((day, i) => {
          const height = Math.max(8, (day.xpEarned / maxXP) * 100);
          const dateLabel = day.date.slice(5);
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              <div className="text-[10px] text-yellow-400 font-bold">
                {day.xpEarned > 0 ? day.xpEarned : ''}
              </div>
              <div
                className={`w-full rounded-t-md transition-all duration-500 ${
                  day.allQuestsComplete
                    ? 'bg-gradient-to-t from-yellow-500 to-yellow-300'
                    : 'bg-gradient-to-t from-indigo-600 to-indigo-400'
                }`}
                style={{ height: `${height}%` }}
              />
              <div className="text-[10px] text-gray-500">{dateLabel}</div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-3 text-[10px] text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-indigo-500" />
          <span>Partial</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-yellow-400" />
          <span>All Complete</span>
        </div>
      </div>
    </div>
  );
}
