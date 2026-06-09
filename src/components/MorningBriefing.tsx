'use client';

import { useAppStore } from '@/lib/store';
import { format, differenceInDays } from 'date-fns';

export default function MorningBriefing() {
  const player = useAppStore((s) => s.player);
  const tasks = useAppStore((s) => s.tasks);
  const questLines = useAppStore((s) => s.questLines);

  const today = new Date();
  const fitnessQuest = questLines.find((q) => q.id === 'fitness');
  const daysUntilSDSU = fitnessQuest?.deadline
    ? differenceInDays(new Date(fitnessQuest.deadline), today)
    : null;

  const completedCount = tasks.filter((t) => t.completed).length;
  const criticalTasks = tasks.filter((t) => t.priority === 'critical' && !t.completed);

  const greetings = [
    "Let's get it.",
    "No days off.",
    "Time to work.",
    "Grind don't stop.",
    "Another day, another W.",
    "Lock in.",
    "You know what to do.",
  ];
  const greeting = greetings[today.getDate() % greetings.length];

  return (
    <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-6 border border-indigo-500/20">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-indigo-300 font-medium">
            {format(today, 'EEEE, MMMM d')}
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Morning Briefing
          </h2>
        </div>
        <div className="text-3xl">☀️</div>
      </div>

      <p className="text-indigo-200 text-lg font-medium mb-4 italic">
        &ldquo;{greeting}&rdquo;
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-black/20 rounded-xl p-3">
          <div className="text-2xl font-bold text-white">{tasks.length - completedCount}</div>
          <div className="text-xs text-indigo-300">Missions Today</div>
        </div>
        {daysUntilSDSU !== null && (
          <div className="bg-black/20 rounded-xl p-3">
            <div className="text-2xl font-bold text-red-400">{daysUntilSDSU}</div>
            <div className="text-xs text-indigo-300">Days Until SDSU</div>
          </div>
        )}
      </div>

      {criticalTasks.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
          <div className="text-xs font-bold text-red-400 uppercase mb-2">🎯 Critical Missions</div>
          {criticalTasks.map((t) => (
            <div key={t.id} className="text-sm text-red-200 flex items-center gap-2 py-0.5">
              <span className="text-xs">▸</span> {t.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
