'use client';

import {
  getTodaysWorkout,
  getTodaysMarketingMission,
  getTodaysStoreMission,
  getTodaysContentIdea,
  getWeeklyFocus,
} from '@/lib/playbooks';
import { format } from 'date-fns';

export default function WarRoom() {
  const today = new Date();
  const workout = getTodaysWorkout(today);
  const marketing = getTodaysMarketingMission(today);
  const store = getTodaysStoreMission(today);
  const idea = getTodaysContentIdea(today);
  const focus = getWeeklyFocus(today);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">⚔️ War Room</h2>
        <p className="text-sm text-gray-400">
          Today&apos;s exact battle plan — {format(today, 'EEEE, MMMM d')}. New missions rotate in daily.
        </p>
      </div>

      {/* Weekly focus banner */}
      <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 rounded-2xl p-5 border border-amber-500/20">
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
          This Week&apos;s Focus
        </div>
        <div className="text-lg font-bold text-white">{focus.theme}</div>
        <div className="text-sm font-medium text-amber-200 mt-0.5">🎯 {focus.target}</div>
        <p className="text-sm text-gray-300 mt-2">{focus.detail}</p>
      </div>

      {/* Today's workout */}
      <div className="bg-gray-900/80 rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-5" style={{ borderTop: '3px solid #ef4444' }}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-white">💪 {workout.name}</h3>
            <span className="text-xs text-gray-500">{workout.exercises.length} exercises</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">{workout.focus}</p>

          <div className="space-y-2">
            {workout.exercises.map((ex, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-3 py-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">{ex.name}</div>
                  {ex.note && <div className="text-xs text-gray-500">{ex.note}</div>}
                </div>
                <div className="text-sm font-bold text-red-300 flex-shrink-0">
                  {ex.sets}×{ex.reps}
                </div>
              </div>
            ))}
          </div>

          {workout.finisher && (
            <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-sm text-red-200">
              <span className="font-bold">Finisher:</span> {workout.finisher}
            </div>
          )}
        </div>
      </div>

      {/* E-com missions */}
      <div className="bg-gray-900/80 rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-5" style={{ borderTop: '3px solid #22c55e' }}>
          <h3 className="text-lg font-bold text-white mb-4">💰 Store Operations</h3>

          {[
            { tag: 'MARKETING MISSION', mission: marketing },
            { tag: 'STORE UPGRADE', mission: store },
          ].map(({ tag, mission }) => (
            <div key={tag} className="mb-5 last:mb-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/15 text-green-300 border border-green-500/30">
                  {tag}
                </span>
                <span className="text-[10px] text-gray-500">
                  {mission.category} · ~{mission.timeEstimate}
                </span>
              </div>
              <div className="text-base font-bold text-white mb-1">{mission.title}</div>
              <p className="text-xs text-gray-400 italic mb-3">{mission.why}</p>
              <ol className="space-y-1.5">
                {mission.steps.map((step, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-gray-300">
                    <span className="font-bold text-green-400 flex-shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* Content idea */}
      <div className="bg-gray-900/80 rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-5" style={{ borderTop: '3px solid #8b5cf6' }}>
          <h3 className="text-lg font-bold text-white mb-1">🎬 Today&apos;s Video</h3>
          <div className="text-base font-bold text-purple-300 mb-2">{idea.title}</div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2.5 mb-3">
            <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">
              The Hook (first 2 seconds)
            </div>
            <div className="text-sm text-purple-100 font-medium">{idea.hook}</div>
          </div>

          <div className="text-xs text-gray-500 mb-3">Format: {idea.format}</div>

          <ol className="space-y-1.5">
            {idea.steps.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-gray-300">
                <span className="font-bold text-purple-400 flex-shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
