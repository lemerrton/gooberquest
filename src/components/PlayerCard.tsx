'use client';

import { useAppStore } from '@/lib/store';
import { getStreakBonus } from '@/lib/game-engine';

export default function PlayerCard() {
  const player = useAppStore((s) => s.player);
  const xpPercent = Math.round((player.currentXP / player.xpToNextLevel) * 100);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">Level {player.level}</div>
          <div className="text-2xl font-bold text-white">{player.title}</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-yellow-400">{player.totalXP.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Total XP</div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{player.currentXP} / {player.xpToNextLevel} XP</span>
          <span>Level {player.level + 1}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-800/50 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-orange-400">🔥 {player.currentStreak}</div>
          <div className="text-xs text-gray-400 mt-1">Day Streak</div>
          {getStreakBonus(player.currentStreak) > 0 && (
            <div className="text-xs text-orange-300 mt-1">+{getStreakBonus(player.currentStreak)} bonus XP</div>
          )}
        </div>
        <div className="bg-gray-800/50 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-purple-400">⚡ {player.comboMultiplier}x</div>
          <div className="text-xs text-gray-400 mt-1">Combo</div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">🏆 {player.longestStreak}</div>
          <div className="text-xs text-gray-400 mt-1">Best Streak</div>
        </div>
      </div>
    </div>
  );
}
