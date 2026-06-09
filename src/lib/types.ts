export type QuestLine = 'fitness' | 'ecommerce' | 'content';

export interface DailyTask {
  id: string;
  questLine: QuestLine;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  completedAt?: string;
  recurring: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface QuestLineConfig {
  id: QuestLine;
  name: string;
  icon: string;
  color: string;
  goalDescription: string;
  deadline?: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  xpBonus: number;
}

export interface PlayerStats {
  level: number;
  currentXP: number;
  totalXP: number;
  xpToNextLevel: number;
  title: string;
  currentStreak: number;
  longestStreak: number;
  comboMultiplier: number;
  lastActiveDate: string;
}

export interface DayLog {
  date: string;
  tasksCompleted: number;
  totalTasks: number;
  xpEarned: number;
  questLinesHit: QuestLine[];
  allQuestsComplete: boolean;
}

export interface AppState {
  player: PlayerStats;
  tasks: DailyTask[];
  dayLogs: DayLog[];
  questLines: QuestLineConfig[];
  initialized: boolean;
}
