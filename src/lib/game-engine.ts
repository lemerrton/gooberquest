import { PlayerStats, QuestLine } from './types';

const LEVEL_TITLES = [
  'Newbie',
  'Apprentice',
  'Hustler',
  'Grinder',
  'Warrior',
  'Champion',
  'Elite',
  'Legend',
  'Mythic',
  'Goober God',
];

export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function getTitleForLevel(level: number): string {
  const index = Math.min(level - 1, LEVEL_TITLES.length - 1);
  return LEVEL_TITLES[index] || LEVEL_TITLES[LEVEL_TITLES.length - 1];
}

export function calculateComboMultiplier(questLinesHitToday: QuestLine[]): number {
  const unique = new Set(questLinesHitToday).size;
  if (unique >= 3) return 3.0;
  if (unique === 2) return 1.5;
  return 1.0;
}

export function applyXP(player: PlayerStats, baseXP: number, comboMultiplier: number): PlayerStats {
  const xpGained = Math.floor(baseXP * comboMultiplier);
  let newXP = player.currentXP + xpGained;
  let newLevel = player.level;
  let newTotal = player.totalXP + xpGained;
  let xpNeeded = player.xpToNextLevel;

  while (newXP >= xpNeeded) {
    newXP -= xpNeeded;
    newLevel++;
    xpNeeded = xpForLevel(newLevel);
  }

  return {
    ...player,
    level: newLevel,
    currentXP: newXP,
    totalXP: newTotal,
    xpToNextLevel: xpNeeded,
    title: getTitleForLevel(newLevel),
    comboMultiplier,
  };
}

export function updateStreak(player: PlayerStats, todayStr: string, allTasksDone: boolean): PlayerStats {
  const last = player.lastActiveDate;
  const today = new Date(todayStr);
  const lastDate = last ? new Date(last) : null;

  let newStreak = player.currentStreak;

  if (lastDate) {
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      newStreak = 0;
    }
  }

  if (allTasksDone) {
    newStreak++;
  }

  return {
    ...player,
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, player.longestStreak),
    lastActiveDate: todayStr,
  };
}

export function getStreakBonus(streak: number): number {
  if (streak >= 30) return 50;
  if (streak >= 14) return 30;
  if (streak >= 7) return 20;
  if (streak >= 3) return 10;
  return 0;
}

export function getProgressPercent(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}
