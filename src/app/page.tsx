'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import PlayerCard from '@/components/PlayerCard';
import TaskCard from '@/components/TaskCard';
import MorningBriefing from '@/components/MorningBriefing';
import QuestLinePanel from '@/components/QuestLinePanel';
import ProgressChart from '@/components/ProgressChart';

type Tab = 'today' | 'quests' | 'stats';

export default function Home() {
  const initializeDay = useAppStore((s) => s.initializeDay);
  const tasks = useAppStore((s) => s.tasks);
  const questLines = useAppStore((s) => s.questLines);
  const player = useAppStore((s) => s.player);
  const dayLogs = useAppStore((s) => s.dayLogs);
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initializeDay();
  }, [initializeDay]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-2xl font-bold text-white animate-pulse">Loading quest data...</div>
      </div>
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const allDone = completedCount === totalTasks && totalTasks > 0;

  const fitnessTasks = tasks.filter((t) => t.questLine === 'fitness');
  const ecommerceTasks = tasks.filter((t) => t.questLine === 'ecommerce');
  const contentTasks = tasks.filter((t) => t.questLine === 'content');

  const totalDays = dayLogs.length;
  const perfectDays = dayLogs.filter((d) => d.allQuestsComplete).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚔️</span>
            <h1 className="text-xl font-bold text-white tracking-tight">GooberQuest</h1>
          </div>
          <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
            {(['today', 'quests', 'stats'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'today' ? 'Today' : tab === 'quests' ? 'Quests' : 'Stats'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {activeTab === 'today' && (
          <>
            <MorningBriefing />
            <PlayerCard />

            {allDone && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6 text-center glow-pulse">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-xl font-bold text-yellow-300">ALL MISSIONS COMPLETE</div>
                <div className="text-sm text-yellow-200/70 mt-1">You crushed it today. Rest up for tomorrow.</div>
              </div>
            )}

            {/* Progress bar */}
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Today&apos;s Progress</span>
                <span className="text-white font-bold">{completedCount}/{totalTasks}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    allDone
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-300'
                      : 'bg-gradient-to-r from-indigo-600 to-indigo-400'
                  }`}
                  style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Task sections */}
            {[
              { label: 'Operation Shredded', icon: '💪', tasks: fitnessTasks, color: 'text-red-400' },
              { label: 'The $10K Quest', icon: '💰', tasks: ecommerceTasks, color: 'text-green-400' },
              { label: 'Daily Upload', icon: '🎬', tasks: contentTasks, color: 'text-purple-400' },
            ].map((section) => (
              <div key={section.label}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`text-sm font-bold uppercase tracking-wider ${section.color}`}>
                    {section.icon} {section.label}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {section.tasks.filter((t) => t.completed).length}/{section.tasks.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {section.tasks.map((task, i) => (
                    <div key={task.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                      <TaskCard task={task} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'quests' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Quest Lines</h2>
              <p className="text-sm text-gray-400">Your long-term missions. Complete milestones for massive XP.</p>
            </div>
            {questLines.map((ql) => (
              <QuestLinePanel key={ql.id} questLine={ql} />
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Stats & Progress</h2>
              <p className="text-sm text-gray-400">See how you&apos;re tracking over time.</p>
            </div>

            <ProgressChart />

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/80 rounded-2xl p-5 border border-gray-700/50 text-center">
                <div className="text-3xl font-bold text-white">{totalDays}</div>
                <div className="text-sm text-gray-400 mt-1">Days Tracked</div>
              </div>
              <div className="bg-gray-900/80 rounded-2xl p-5 border border-gray-700/50 text-center">
                <div className="text-3xl font-bold text-yellow-400">{perfectDays}</div>
                <div className="text-sm text-gray-400 mt-1">Perfect Days</div>
              </div>
              <div className="bg-gray-900/80 rounded-2xl p-5 border border-gray-700/50 text-center">
                <div className="text-3xl font-bold text-orange-400">{player.longestStreak}</div>
                <div className="text-sm text-gray-400 mt-1">Best Streak</div>
              </div>
              <div className="bg-gray-900/80 rounded-2xl p-5 border border-gray-700/50 text-center">
                <div className="text-3xl font-bold text-indigo-400">{player.totalXP.toLocaleString()}</div>
                <div className="text-sm text-gray-400 mt-1">Lifetime XP</div>
              </div>
            </div>

            <div className="bg-gray-900/80 rounded-2xl p-5 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Milestone Progress</h3>
              {questLines.map((ql) => {
                const completed = ql.milestones.filter((m) => m.completed).length;
                const total = ql.milestones.length;
                const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                return (
                  <div key={ql.id} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-white">
                        {ql.icon} {ql.name}
                      </span>
                      <span className="text-gray-400">{completed}/{total}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: ql.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
