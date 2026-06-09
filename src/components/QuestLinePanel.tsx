'use client';

import { useAppStore } from '@/lib/store';
import { QuestLineConfig } from '@/lib/types';
import { differenceInDays, format } from 'date-fns';

function MilestoneItem({
  milestone,
  questLineId,
  color,
}: {
  milestone: QuestLineConfig['milestones'][0];
  questLineId: string;
  color: string;
}) {
  const completeMilestone = useAppStore((s) => s.completeMilestone);
  const daysLeft = differenceInDays(new Date(milestone.targetDate), new Date());
  const overdue = daysLeft < 0 && !milestone.completed;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
        milestone.completed ? 'bg-green-500/10 opacity-60' : 'bg-gray-800/50 hover:bg-gray-800'
      }`}
    >
      <button
        onClick={() => completeMilestone(questLineId as 'fitness' | 'ecommerce' | 'content', milestone.id)}
        disabled={milestone.completed}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          milestone.completed
            ? 'bg-green-500 border-green-400'
            : 'border-gray-500 hover:border-white'
        }`}
      >
        {milestone.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium ${milestone.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {milestone.title}
        </div>
        <div className="text-xs text-gray-500">{milestone.description}</div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-xs text-yellow-400 font-bold">+{milestone.xpBonus} XP</div>
        <div className={`text-[10px] ${overdue ? 'text-red-400' : 'text-gray-500'}`}>
          {milestone.completed
            ? 'Done'
            : overdue
            ? `${Math.abs(daysLeft)}d overdue`
            : `${daysLeft}d left`}
        </div>
      </div>
    </div>
  );
}

export default function QuestLinePanel({ questLine }: { questLine: QuestLineConfig }) {
  const tasks = useAppStore((s) => s.tasks);
  const questTasks = tasks.filter((t) => t.questLine === questLine.id);
  const completed = questTasks.filter((t) => t.completed).length;
  const total = questTasks.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const completedMilestones = questLine.milestones.filter((m) => m.completed).length;

  return (
    <div className="bg-gray-900/80 rounded-2xl border border-gray-700/50 overflow-hidden">
      <div className="p-5" style={{ borderTop: `3px solid ${questLine.color}` }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{questLine.icon}</span>
            <h3 className="text-lg font-bold text-white">{questLine.name}</h3>
          </div>
          <div className="text-sm text-gray-400">
            {completedMilestones}/{questLine.milestones.length} milestones
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">{questLine.goalDescription}</p>

        {/* Today's progress for this quest */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Today&apos;s missions</span>
            <span>{completed}/{total}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${percent}%`, backgroundColor: questLine.color }}
            />
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quest Milestones</div>
          {questLine.milestones.map((m) => (
            <MilestoneItem key={m.id} milestone={m} questLineId={questLine.id} color={questLine.color} />
          ))}
        </div>
      </div>
    </div>
  );
}
