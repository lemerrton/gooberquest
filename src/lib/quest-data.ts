import { QuestLineConfig, DailyTask } from './types';
import {
  getTodaysWorkout,
  getTodaysMarketingMission,
  getTodaysStoreMission,
  getTodaysContentIdea,
} from './playbooks';
import { format } from 'date-fns';

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

export function generateDailyTasks(date: Date = new Date()): DailyTask[] {
  const dayOfWeek = date.getDay();
  const dateKey = format(date, 'yyyy-MM-dd');
  const isRestDay = dayOfWeek === 0 || dayOfWeek === 3; // Sunday and Wednesday rest
  const tasks: DailyTask[] = [];

  const workout = getTodaysWorkout(date);
  const marketingMission = getTodaysMarketingMission(date);
  const storeMission = getTodaysStoreMission(date);
  const contentIdea = getTodaysContentIdea(date);

  // Fitness tasks
  if (!isRestDay) {
    tasks.push({
      id: `fit-gym-${dateKey}`,
      questLine: 'fitness',
      title: `Gym: ${workout.name}`,
      description: workout.focus,
      xpReward: 40,
      completed: false,
      recurring: true,
      priority: 'critical',
      specificMission: workout.name,
      guide: {
        steps: workout.exercises.map(
          (e) => `${e.name} — ${e.sets}x${e.reps}${e.note ? ` (${e.note})` : ''}`
        ),
        proTip: workout.finisher,
        why: 'Progressive overload is the whole game: beat last week\'s weight or reps on at least one lift today.',
      },
    });
  } else {
    tasks.push({
      id: `fit-recovery-${dateKey}`,
      questLine: 'fitness',
      title: 'Active recovery',
      description: workout.focus,
      xpReward: 20,
      completed: false,
      recurring: true,
      priority: 'high',
      specificMission: workout.name,
      guide: {
        steps: workout.exercises.map(
          (e) => `${e.name} — ${e.sets}x${e.reps}${e.note ? ` (${e.note})` : ''}`
        ),
        proTip: workout.finisher,
        why: 'Muscle is built on rest days. Skipping recovery is skipping gains.',
      },
    });
  }

  tasks.push({
    id: `fit-cal-${dateKey}`,
    questLine: 'fitness',
    title: 'Hit calorie + protein target',
    description: 'Eat big to get big. Track everything.',
    xpReward: 30,
    completed: false,
    recurring: true,
    priority: 'critical',
    guide: {
      steps: [
        'Target: bodyweight (lbs) × 17 calories for a lean bulk. At 150 lbs that\'s ~2,550 cal. Adjust +200 if the scale hasn\'t moved in 2 weeks.',
        'Protein: 1g per lb of bodyweight, minimum. Spread across 4+ meals.',
        'Log food AS you eat it (MyFitnessPal or MacroFactor) — logging at night means forgetting half of it.',
        'Easy volume: whole milk, rice, peanut butter, olive oil on everything. A nightly shake (milk + oats + whey + banana + PB) is ~700 cal in 60 seconds.',
      ],
      proTip: 'Eat the same breakfast every day. Removing one decision removes one failure point.',
      why: 'You can\'t out-train an empty plate. The calorie surplus IS the bulk — the gym just tells the calories where to go.',
    },
  });

  tasks.push({
    id: `fit-sleep-${dateKey}`,
    questLine: 'fitness',
    title: '7+ hours of sleep',
    description: 'Recovery is where gains happen.',
    xpReward: 15,
    completed: false,
    recurring: true,
    priority: 'high',
    guide: {
      steps: [
        'Set a hard "screens off" alarm 30 min before target bedtime.',
        'Count backwards: need to be up at 7? In bed by 11:30, lights out by 11:45.',
        'Caffeine cutoff: nothing after 2 PM. It has a 6-hour half-life.',
        'Room: cold (65-68°F), dark, phone across the room.',
      ],
      proTip: 'Sleep is the most anabolic thing you do all day. Treat bedtime like a gym session you can\'t skip.',
      why: 'Growth hormone peaks during deep sleep. Cutting sleep cuts gains, recovery, and willpower for everything else on this list.',
    },
  });

  // E-commerce tasks
  tasks.push({
    id: `ecom-market-${dateKey}`,
    questLine: 'ecommerce',
    title: 'Marketing mission',
    description: `Today: ${marketingMission.title}`,
    xpReward: 35,
    completed: false,
    recurring: true,
    priority: 'critical',
    specificMission: `${marketingMission.title} (~${marketingMission.timeEstimate})`,
    guide: {
      steps: marketingMission.steps,
      why: marketingMission.why,
      proTip: `Category: ${marketingMission.category}. Block ${marketingMission.timeEstimate} and do only this — half-done marketing is zero-done marketing.`,
    },
  });

  tasks.push({
    id: `ecom-store-${dateKey}`,
    questLine: 'ecommerce',
    title: 'Store upgrade',
    description: `Today: ${storeMission.title}`,
    xpReward: 25,
    completed: false,
    recurring: true,
    priority: 'high',
    specificMission: `${storeMission.title} (~${storeMission.timeEstimate})`,
    guide: {
      steps: storeMission.steps,
      why: storeMission.why,
      proTip: `Category: ${storeMission.category}.`,
    },
  });

  tasks.push({
    id: `ecom-analytics-${dateKey}`,
    questLine: 'ecommerce',
    title: 'Check analytics & adjust',
    description: 'Five numbers, five minutes. Know your store.',
    xpReward: 15,
    completed: false,
    recurring: true,
    priority: 'medium',
    guide: {
      steps: [
        'Open Shopify Analytics → check: sessions, conversion rate, top traffic source, top product, abandoned checkouts.',
        'Write the session count somewhere you\'ll see tomorrow (a note is fine). Trend > snapshot.',
        'One question: "What single change would most increase tomorrow\'s number?" That becomes tomorrow\'s focus.',
        'Under 50 sessions/day? Ignore conversion rate — it\'s statistical noise. Focus 100% on traffic.',
      ],
      proTip: 'Don\'t check more than once a day. Dashboard-refreshing feels like work but isn\'t.',
      why: 'Stores die from guessing. Five minutes of real numbers beats an hour of vibes.',
    },
  });

  // Content tasks
  tasks.push({
    id: `content-film-${dateKey}`,
    questLine: 'content',
    title: 'Film today\'s video',
    description: `Today's idea: ${contentIdea.title}`,
    xpReward: 30,
    completed: false,
    recurring: true,
    priority: 'critical',
    specificMission: `Hook: ${contentIdea.hook}`,
    guide: {
      steps: [
        `Format: ${contentIdea.format}`,
        ...contentIdea.steps,
      ],
      proTip: 'Don\'t like today\'s idea? Fine — but film SOMETHING. The streak beats the concept. Done > perfect, every day.',
      why: 'The algorithm rewards consistency over quality for the first 100 videos. Your only job right now is to not miss.',
    },
  });

  tasks.push({
    id: `content-edit-${dateKey}`,
    questLine: 'content',
    title: 'Edit and post',
    description: 'Edit, add captions/music, and publish to TikTok/Reels/Shorts.',
    xpReward: 30,
    completed: false,
    recurring: true,
    priority: 'critical',
    guide: {
      steps: [
        'Edit in CapCut (free): trim dead air aggressively — cut every pause over half a second.',
        'Auto-captions ON, always. Most people watch muted.',
        'First 2 seconds: the hook text must be on screen immediately.',
        'Post natively to TikTok first, then Reels and Shorts (remove the TikTok watermark — use the CapCut export for each).',
        'Best posting windows: 12-2 PM or 7-9 PM. But posted-at-a-bad-time beats not-posted.',
      ],
      proTip: 'Keep edits under 20 minutes. If you\'re editing for an hour, the video is overcooked.',
      why: 'A daily post is a daily lottery ticket with compounding odds. Miss a day, lose the streak AND the ticket.',
    },
  });

  tasks.push({
    id: `content-engage-${dateKey}`,
    questLine: 'content',
    title: 'Engage for 15 min',
    description: 'Reply to comments, engage with similar creators, study what\'s trending.',
    xpReward: 15,
    completed: false,
    recurring: true,
    priority: 'medium',
    guide: {
      steps: [
        'Reply to EVERY comment on your recent posts — replies double your comment count and signal the algorithm.',
        'Leave 5 genuine comments on videos from creators in your niches (brewing, fitness, student business).',
        'Scroll your FYP for 5 minutes WITH PURPOSE: save 2-3 trending sounds or formats you could use this week.',
        'See a question in your comments? Screenshot it — that\'s tomorrow\'s reply-video material.',
      ],
      proTip: 'Set a 15-minute timer. Engagement work becomes doomscrolling at minute 16.',
      why: 'The algorithm pushes creators who create conversation. Engagement is free distribution.',
    },
  });

  return tasks;
}
