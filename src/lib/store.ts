import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, DailyTask, DayLog, QuestLine, PlayerStats } from './types';
import { QUEST_LINES, generateDailyTasks } from './quest-data';
import { applyXP, calculateComboMultiplier, updateStreak, xpForLevel, getStreakBonus } from './game-engine';
import { format } from 'date-fns';

function initialPlayer(): PlayerStats {
  return {
    level: 1,
    currentXP: 0,
    totalXP: 0,
    xpToNextLevel: xpForLevel(1),
    title: 'Newbie',
    currentStreak: 0,
    longestStreak: 0,
    comboMultiplier: 1.0,
    lastActiveDate: '',
  };
}

function todayStr(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

interface Actions {
  initializeDay: () => void;
  completeTask: (taskId: string) => void;
  uncompleteTask: (taskId: string) => void;
  completeMilestone: (questLineId: QuestLine, milestoneId: string) => void;
  resetApp: () => void;
}

export const useAppStore = create<AppState & Actions>()(
  persist(
    (set, get) => ({
      player: initialPlayer(),
      tasks: [],
      dayLogs: [],
      questLines: QUEST_LINES,
      initialized: false,

      initializeDay: () => {
        const today = todayStr();
        const state = get();
        const existingLog = state.dayLogs.find((l) => l.date === today);

        if (existingLog && state.tasks.length > 0) {
          return;
        }

        const dayOfWeek = new Date().getDay();
        const newTasks = generateDailyTasks(dayOfWeek);

        let player = state.player;
        player = updateStreak(player, today, false);

        set({
          tasks: newTasks,
          player,
          initialized: true,
        });
      },

      completeTask: (taskId: string) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === taskId);
        if (!task || task.completed) return;

        const updatedTasks = state.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
        );

        const completedQuestLines = [
          ...new Set(updatedTasks.filter((t) => t.completed).map((t) => t.questLine)),
        ] as QuestLine[];

        const comboMultiplier = calculateComboMultiplier(completedQuestLines);
        let player = applyXP(state.player, task.xpReward, comboMultiplier);

        const allDone = updatedTasks.every((t) => t.completed);
        if (allDone) {
          const streakBonus = getStreakBonus(player.currentStreak + 1);
          player = applyXP(player, streakBonus, 1);
          player = updateStreak(player, todayStr(), true);
        }

        const today = todayStr();
        const completedCount = updatedTasks.filter((t) => t.completed).length;
        const existingLogIndex = state.dayLogs.findIndex((l) => l.date === today);
        const xpEarned = Math.floor(task.xpReward * comboMultiplier);

        let dayLogs = [...state.dayLogs];
        if (existingLogIndex >= 0) {
          dayLogs[existingLogIndex] = {
            ...dayLogs[existingLogIndex],
            tasksCompleted: completedCount,
            xpEarned: dayLogs[existingLogIndex].xpEarned + xpEarned,
            questLinesHit: completedQuestLines,
            allQuestsComplete: allDone,
          };
        } else {
          dayLogs.push({
            date: today,
            tasksCompleted: completedCount,
            totalTasks: updatedTasks.length,
            xpEarned,
            questLinesHit: completedQuestLines,
            allQuestsComplete: allDone,
          });
        }

        set({ tasks: updatedTasks, player, dayLogs });
      },

      uncompleteTask: (taskId: string) => {
        const state = get();
        const updatedTasks = state.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: false, completedAt: undefined } : t
        );
        set({ tasks: updatedTasks });
      },

      completeMilestone: (questLineId: QuestLine, milestoneId: string) => {
        const state = get();
        const updatedQuestLines = state.questLines.map((ql) => {
          if (ql.id !== questLineId) return ql;
          return {
            ...ql,
            milestones: ql.milestones.map((m) => {
              if (m.id !== milestoneId) return m;
              return { ...m, completed: true };
            }),
          };
        });

        const milestone = state.questLines
          .find((ql) => ql.id === questLineId)
          ?.milestones.find((m) => m.id === milestoneId);

        let player = state.player;
        if (milestone && !milestone.completed) {
          player = applyXP(player, milestone.xpBonus, 1);
        }

        set({ questLines: updatedQuestLines, player });
      },

      resetApp: () => {
        set({
          player: initialPlayer(),
          tasks: [],
          dayLogs: [],
          questLines: QUEST_LINES,
          initialized: false,
        });
      },
    }),
    {
      name: 'goober-quest-storage',
    }
  )
);
