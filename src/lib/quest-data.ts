import { QuestLineConfig, DailyTask } from './types';

export const QUEST_LINES: QuestLineConfig[] = [
  {
    id: 'fitness',
    name: 'Operation Shredded',
    icon: '💪',
    color: '#ef4444',
    goalDescription: 'Get shredded for SDSU by late August 2026. Bulk up with muscle while staying lean.',
    deadline: '2026-08-22',
    milestones: [
      { id: 'f1', title: 'Gym 5x/week for 2 weeks', description: 'Build the habit', targetDate: '2026-06-22', completed: false, xpBonus: 200 },
      { id: 'f2', title: 'Hit calorie target 14 days straight', description: 'Nutrition is king', targetDate: '2026-06-29', completed: false, xpBonus: 300 },
      { id: 'f3', title: 'Add 10lbs to a compound lift', description: 'Progressive overload working', targetDate: '2026-07-13', completed: false, xpBonus: 250 },
      { id: 'f4', title: 'Visible abs check-in', description: 'Photo comparison time', targetDate: '2026-08-01', completed: false, xpBonus: 500 },
      { id: 'f5', title: 'SDSU Ready', description: 'Walk in looking like a different person', targetDate: '2026-08-22', completed: false, xpBonus: 1000 },
    ],
  },
  {
    id: 'ecommerce',
    name: 'The $10K Quest',
    icon: '💰',
    color: '#22c55e',
    goalDescription: 'Get the brewing e-commerce store (or a new store) printing $10K/month.',
    milestones: [
      { id: 'e1', title: 'First consistent $100 day', description: 'Proof of concept', targetDate: '2026-07-01', completed: false, xpBonus: 300 },
      { id: 'e2', title: '$1K week', description: 'Scaling up', targetDate: '2026-07-20', completed: false, xpBonus: 400 },
      { id: 'e3', title: '$5K month', description: 'Halfway there', targetDate: '2026-08-15', completed: false, xpBonus: 600 },
      { id: 'e4', title: '$10K month', description: 'The goal. You did it.', targetDate: '2026-10-01', completed: false, xpBonus: 2000 },
    ],
  },
  {
    id: 'content',
    name: 'Daily Upload',
    icon: '🎬',
    color: '#8b5cf6',
    goalDescription: 'Post one short-form video every single day. TikTok / Reels / Shorts. No excuses.',
    milestones: [
      { id: 'c1', title: '7-day posting streak', description: 'First full week', targetDate: '2026-06-15', completed: false, xpBonus: 200 },
      { id: 'c2', title: '30-day posting streak', description: 'One full month, no misses', targetDate: '2026-07-08', completed: false, xpBonus: 500 },
      { id: 'c3', title: 'First viral video (10K+ views)', description: 'Algorithm noticed you', targetDate: '2026-08-01', completed: false, xpBonus: 400 },
      { id: 'c4', title: '90-day posting streak', description: 'You are the algorithm now', targetDate: '2026-09-06', completed: false, xpBonus: 1000 },
    ],
  },
];

export function generateDailyTasks(dayOfWeek: number): DailyTask[] {
  const isRestDay = dayOfWeek === 0 || dayOfWeek === 3; // Sunday and Wednesday rest
  const tasks: DailyTask[] = [];

  // Fitness tasks
  if (!isRestDay) {
    tasks.push({
      id: `fit-gym-${Date.now()}`,
      questLine: 'fitness',
      title: 'Hit the gym',
      description: 'Complete your workout. Push hard.',
      xpReward: 40,
      completed: false,
      recurring: true,
      priority: 'critical',
    });
  }

  tasks.push({
    id: `fit-cal-${Date.now()}`,
    questLine: 'fitness',
    title: 'Hit calorie + protein target',
    description: 'Eat big to get big. Track everything.',
    xpReward: 30,
    completed: false,
    recurring: true,
    priority: 'critical',
  });

  tasks.push({
    id: `fit-sleep-${Date.now()}`,
    questLine: 'fitness',
    title: '7+ hours of sleep',
    description: 'Recovery is where gains happen.',
    xpReward: 15,
    completed: false,
    recurring: true,
    priority: 'high',
  });

  // E-commerce tasks
  tasks.push({
    id: `ecom-market-${Date.now()}`,
    questLine: 'ecommerce',
    title: 'Marketing action',
    description: 'Run an ad, post on social, email blast, influencer outreach — pick one and execute.',
    xpReward: 35,
    completed: false,
    recurring: true,
    priority: 'critical',
  });

  tasks.push({
    id: `ecom-product-${Date.now()}`,
    questLine: 'ecommerce',
    title: 'Store improvement',
    description: 'Optimize a listing, add a product, improve photos, tweak pricing, or update copy.',
    xpReward: 25,
    completed: false,
    recurring: true,
    priority: 'high',
  });

  tasks.push({
    id: `ecom-analytics-${Date.now()}`,
    questLine: 'ecommerce',
    title: 'Check analytics & adjust',
    description: 'Review traffic, conversion rates, ad performance. What\'s working? Double down.',
    xpReward: 15,
    completed: false,
    recurring: true,
    priority: 'medium',
  });

  // Content tasks
  tasks.push({
    id: `content-film-${Date.now()}`,
    questLine: 'content',
    title: 'Film today\'s video',
    description: 'Shoot your short-form content. Don\'t overthink it, just press record.',
    xpReward: 30,
    completed: false,
    recurring: true,
    priority: 'critical',
  });

  tasks.push({
    id: `content-edit-${Date.now()}`,
    questLine: 'content',
    title: 'Edit and post',
    description: 'Edit, add captions/music, and publish to TikTok/Reels/Shorts.',
    xpReward: 30,
    completed: false,
    recurring: true,
    priority: 'critical',
  });

  tasks.push({
    id: `content-engage-${Date.now()}`,
    questLine: 'content',
    title: 'Engage for 15 min',
    description: 'Reply to comments, engage with similar creators, study what\'s trending.',
    xpReward: 15,
    completed: false,
    recurring: true,
    priority: 'medium',
  });

  return tasks;
}
