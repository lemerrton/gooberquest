'use client';

import { useState } from 'react';
import { DailyTask } from '@/lib/types';
import { useAppStore } from '@/lib/store';

const QUEST_COLORS: Record<string, string> = {
  fitness: 'border-red-500/40 hover:border-red-400',
  ecommerce: 'border-green-500/40 hover:border-green-400',
  content: 'border-purple-500/40 hover:border-purple-400',
};

const QUEST_GLOW: Record<string, string> = {
  fitness: 'shadow-red-500/20',
  ecommerce: 'shadow-green-500/20',
  content: 'shadow-purple-500/20',
};

const QUEST_ICONS: Record<string, string> = {
  fitness: '💪',
  ecommerce: '💰',
  content: '🎬',
};

const QUEST_ACCENT: Record<string, string> = {
  fitness: 'text-red-400',
  ecommerce: 'text-green-400',
  content: 'text-purple-400',
};

const PRIORITY_BADGES: Record<string, { label: string; className: string }> = {
  critical: { label: 'CRITICAL', className: 'bg-red-500/20 text-red-300 border border-red-500/30' },
  high: { label: 'HIGH', className: 'bg-orange-500/20 text-orange-300 border border-orange-500/30' },
  medium: { label: 'MED', className: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
  low: { label: 'LOW', className: 'bg-gray-500/20 text-gray-300 border border-gray-500/30' },
};

export default function TaskCard({ task }: { task: DailyTask }) {
  const completeTask = useAppStore((s) => s.completeTask);
  const uncompleteTask = useAppStore((s) => s.uncompleteTask);
  const player = useAppStore((s) => s.player);
  const [expanded, setExpanded] = useState(false);

  const priorityBadge = PRIORITY_BADGES[task.priority];
  const hasGuide = task.guide && task.guide.steps.length > 0;

  const handleCheckbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (task.completed) {
      uncompleteTask(task.id);
    } else {
      completeTask(task.id);
    }
  };

  return (
    <div
      onClick={() => hasGuide && setExpanded(!expanded)}
      className={`
        relative cursor-pointer rounded-xl border-2 transition-all duration-300
        ${task.completed
          ? 'border-gray-600/30 bg-gray-800/30 opacity-60'
          : `${QUEST_COLORS[task.questLine]} bg-gray-800/80 shadow-lg ${QUEST_GLOW[task.questLine]} hover:shadow-xl`
        }
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={handleCheckbox}
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
            className={`
              mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all
              ${task.completed
                ? 'bg-green-500 border-green-400 text-white'
                : 'border-gray-500 hover:border-white hover:bg-white/10'
              }
            `}
          >
            {task.completed && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-lg">{QUEST_ICONS[task.questLine]}</span>
              <span className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                {task.title}
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${priorityBadge.className}`}>
                {priorityBadge.label}
              </span>
            </div>
            <p className={`text-sm ${task.completed ? 'text-gray-600' : 'text-gray-400'}`}>
              {task.description}
            </p>
            {hasGuide && !expanded && (
              <div className={`text-xs mt-1.5 font-medium ${QUEST_ACCENT[task.questLine]}`}>
                Tap for the exact game plan ▾
              </div>
            )}
          </div>

          {/* XP reward */}
          <div className={`flex-shrink-0 text-right ${task.completed ? 'text-gray-600' : 'text-yellow-400'}`}>
            <div className="text-sm font-bold">
              +{task.xpReward}
              {player.comboMultiplier > 1 && !task.completed && (
                <span className="text-purple-400 text-xs ml-1">x{player.comboMultiplier}</span>
              )}
            </div>
            <div className="text-[10px] text-gray-500">XP</div>
          </div>
        </div>
      </div>

      {/* Expanded guide */}
      {expanded && hasGuide && task.guide && (
        <div className="px-4 pb-4 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
          <div className="border-t border-gray-700 pt-3 space-y-3">
            {task.specificMission && (
              <div className={`text-sm font-bold ${QUEST_ACCENT[task.questLine]} bg-black/30 rounded-lg px-3 py-2`}>
                🎯 {task.specificMission}
              </div>
            )}

            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                The Game Plan
              </div>
              <ol className="space-y-2">
                {task.guide.steps.map((step, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-gray-300">
                    <span className={`font-bold flex-shrink-0 ${QUEST_ACCENT[task.questLine]}`}>
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {task.guide.proTip && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2 text-sm text-yellow-200">
                <span className="font-bold">💡 Pro tip:</span> {task.guide.proTip}
              </div>
            )}

            {task.guide.why && (
              <div className="text-xs text-gray-500 italic">
                Why this matters: {task.guide.why}
              </div>
            )}

            {!task.completed && (
              <button
                onClick={handleCheckbox}
                className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-colors"
              >
                ✓ Mission Complete (+{task.xpReward} XP)
              </button>
            )}

            <button
              onClick={() => setExpanded(false)}
              className="w-full text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Collapse ▴
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
