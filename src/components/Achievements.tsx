'use client';

import { useAppStore } from '@/lib/store';

interface Achievement {
  id: string;
  icon: string;
  name: string;
  desc: string;
  earned: boolean;
}

export default function Achievements() {
  const player = useAppStore((s) => s.player);
  const dayLogs = useAppStore((s) => s.dayLogs);
  const questLines = useAppStore((s) => s.questLines);

  const totalTasksCompleted = dayLogs.reduce((sum, d) => sum + d.tasksCompleted, 0);
  const perfectDays = dayLogs.filter((d) => d.allQuestsComplete).length;
  const hitTripleCombo = dayLogs.some((d) => d.questLinesHit.length >= 3);
  const milestonesCompleted = questLines.reduce(
    (sum, ql) => sum + ql.milestones.filter((m) => m.completed).length,
    0
  );

  const achievements: Achievement[] = [
    { id: 'first-blood', icon: '🩸', name: 'First Blood', desc: 'Complete your first mission', earned: totalTasksCompleted >= 1 },
    { id: 'triple-threat', icon: '⚡', name: 'Triple Threat', desc: 'Hit all 3 quest lines in one day', earned: hitTripleCombo },
    { id: 'perfect-day', icon: '🌟', name: 'Perfect Day', desc: 'Complete every mission in a day', earned: perfectDays >= 1 },
    { id: 'on-a-roll', icon: '🔥', name: 'On a Roll', desc: 'Reach a 3-day streak', earned: player.longestStreak >= 3 },
    { id: 'week-warrior', icon: '🗡️', name: 'Week Warrior', desc: 'Reach a 7-day streak', earned: player.longestStreak >= 7 },
    { id: 'unstoppable', icon: '🚀', name: 'Unstoppable', desc: 'Reach a 14-day streak', earned: player.longestStreak >= 14 },
    { id: 'iron-will', icon: '🛡️', name: 'Iron Will', desc: 'Reach a 30-day streak', earned: player.longestStreak >= 30 },
    { id: 'level-5', icon: '⭐', name: 'Rising Star', desc: 'Reach Level 5 (Warrior)', earned: player.level >= 5 },
    { id: 'level-10', icon: '👑', name: 'Goober God', desc: 'Reach Level 10', earned: player.level >= 10 },
    { id: 'half-century', icon: '💯', name: 'Half Century', desc: 'Complete 50 total missions', earned: totalTasksCompleted >= 50 },
    { id: 'double-century', icon: '🏛️', name: 'Double Century', desc: 'Complete 200 total missions', earned: totalTasksCompleted >= 200 },
    { id: 'milestone-hunter', icon: '🏔️', name: 'Milestone Hunter', desc: 'Complete 3 quest milestones', earned: milestonesCompleted >= 3 },
    { id: 'perfect-week', icon: '💎', name: 'Perfect Week', desc: '7 perfect days total', earned: perfectDays >= 7 },
    { id: 'xp-5k', icon: '🧙', name: 'XP Hoarder', desc: 'Earn 5,000 lifetime XP', earned: player.totalXP >= 5000 },
  ];

  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div className="bg-gray-900/80 rounded-2xl p-5 border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">🏅 Achievements</h3>
        <span className="text-sm text-gray-400">{earnedCount}/{achievements.length} unlocked</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`rounded-xl p-3 border text-center transition-all ${
              a.earned
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : 'bg-gray-800/40 border-gray-700/40 opacity-50 grayscale'
            }`}
          >
            <div className="text-2xl mb-1">{a.icon}</div>
            <div className={`text-xs font-bold ${a.earned ? 'text-yellow-300' : 'text-gray-400'}`}>
              {a.name}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">{a.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
