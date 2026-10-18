import React, { useState } from 'react';
import { Page, TaskScenario, TaskSubmission } from '../types';
import { WORKPLACE_TASKS } from '../data/mockData';
import {
  Code2,
  Clock,
  ArrowRight,
  CheckCircle2,
  Info,
  Terminal,
  Database,
  Mail,
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';

interface TasksPageProps {
  onNavigate: (page: Page) => void;
  onSelectTask: (taskId: string) => void;
  submissions: Record<string, TaskSubmission>;
}

export const TasksPage: React.FC<TasksPageProps> = ({
  onNavigate,
  onSelectTask,
  submissions,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'coding' | 'data' | 'communication'>('all');

  const filteredTasks = WORKPLACE_TASKS.filter((task) => {
    if (selectedFilter === 'coding') return task.id === 'debug-c-program';
    if (selectedFilter === 'data') return task.id === 'analyse-dataset';
    if (selectedFilter === 'communication') return task.id === 'client-bug-response';
    return true;
  });

  const getTaskIcon = (taskId: string) => {
    switch (taskId) {
      case 'debug-c-program':
        return <Terminal className="w-6 h-6 text-[#9E3D58]" />;
      case 'analyse-dataset':
        return <Database className="w-6 h-6 text-[#9E3D58]" />;
      case 'client-bug-response':
        return <Mail className="w-6 h-6 text-[#9E3D58]" />;
      default:
        return <Code2 className="w-6 h-6 text-[#9E3D58]" />;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-[#FFF0F4] text-[#8C2E47] border-[#ECC2CE]';
      case 'Beginner-Intermediate':
        return 'bg-[#FCE8EE] text-[#8C2E47] border-[#ECC2CE]';
      case 'Intermediate':
        return 'bg-[#FFF2EA] text-[#A84518] border-[#F0CEBE]';
      default:
        return 'bg-[#FFF0F4] text-[#7A5060] border-[#ECCCD5]';
    }
  };

  return (
    <div className="bg-[#FAF0F3] text-[#2D1822] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* PAGE HEADER */}
        <div className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE8EE] border border-[#ECC2CE] text-[#8C2E47] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#9E3D58]" />
                <span>Junior Software Developer Track</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D1822]">
                Workplace Job Simulations
              </h1>
              <p className="text-sm text-[#5C3B48] max-w-2xl mt-1 leading-relaxed">
                Step into authentic engineering scenarios. Select a task below to read the system context, analyze the requirements, and submit your workplace solution.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#FFF8FA] border border-[#ECCCD5] p-3.5 rounded-2xl shadow-inner">
              <div className="text-right">
                <div className="text-xs text-[#7A5060] font-medium">Session Progress</div>
                <div className="text-sm font-serif font-bold text-[#2D1822]">
                  {Object.keys(submissions).length} of {WORKPLACE_TASKS.length} Completed
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#FCE8EE] border border-[#ECC2CE] flex items-center justify-center font-serif font-bold text-[#8C2E47] text-base">
                {Math.round((Object.keys(submissions).length / WORKPLACE_TASKS.length) * 100)}%
              </div>
            </div>
          </div>

          {/* FILTER PILLS */}
          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-[#F2D7DE]">
            <span className="text-xs text-[#7A5060] mr-2 flex items-center gap-1 font-medium">
              <Filter className="w-3.5 h-3.5 text-[#9E3D58]" /> Filter by:
            </span>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#9E3D58] text-white shadow-sm'
                  : 'bg-[#FFF8FA] text-[#5C3B48] hover:bg-[#FCE8EE] border border-[#ECCCD5]'
              }`}
            >
              All Tasks ({WORKPLACE_TASKS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('coding')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedFilter === 'coding'
                  ? 'bg-[#9E3D58] text-white shadow-sm'
                  : 'bg-[#FFF8FA] text-[#5C3B48] hover:bg-[#FCE8EE] border border-[#ECCCD5]'
              }`}
            >
              Systems & C Debugging
            </button>
            <button
              onClick={() => setSelectedFilter('data')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedFilter === 'data'
                  ? 'bg-[#9E3D58] text-white shadow-sm'
                  : 'bg-[#FFF8FA] text-[#5C3B48] hover:bg-[#FCE8EE] border border-[#ECCCD5]'
              }`}
            >
              Data & Observability
            </button>
            <button
              onClick={() => setSelectedFilter('communication')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                selectedFilter === 'communication'
                  ? 'bg-[#9E3D58] text-white shadow-sm'
                  : 'bg-[#FFF8FA] text-[#5C3B48] hover:bg-[#FCE8EE] border border-[#ECCCD5]'
              }`}
            >
              Workplace Communication
            </button>
          </div>
        </div>

        {/* DEMONSTRATION NOTICE */}
        <div className="bg-[#FFF8FA] border border-[#ECC2CE] p-4 rounded-xl flex items-center gap-3 text-xs text-[#5C3B48]">
          <Info className="w-4 h-4 text-[#9E3D58] shrink-0" />
          <span>
            <strong>Simulation Note:</strong> Submissions are validated and stored in your browser application state. You can review your submitted responses at any time or update them.
          </span>
        </div>

        {/* THREE SELECTABLE TASK CARDS */}
        <div className="space-y-6">
          {filteredTasks.map((task) => {
            const isSubmitted = !!submissions[task.id];
            const submission = submissions[task.id];

            return (
              <div
                key={task.id}
                className={`bg-[#FFFFFF] border rounded-2xl p-6 sm:p-8 transition-all shadow-sm hover:shadow-md ${
                  isSubmitted
                    ? 'border-[#D68EA1] bg-gradient-to-r from-[#FFFFFF] via-[#FFF8FA] to-[#FFF0F4]'
                    : 'border-[#ECCCD5] hover:border-[#DDA5B5]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Column: Metadata & Details */}
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono text-[#9E3D58] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF0F4] border border-[#ECC2CE]">
                        {task.code}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full font-semibold border ${getDifficultyBadge(task.difficulty)}`}>
                        Difficulty: {task.difficulty}
                      </span>
                      <span className="text-[#7A5060] flex items-center gap-1 bg-[#FFF8FA] px-2.5 py-0.5 rounded-full border border-[#ECCCD5]">
                        <Clock className="w-3 h-3 text-[#9E3D58]" />
                        Est. Time: {task.estimatedMinutes} mins
                      </span>
                      <span className="text-[#7A5060]">
                        Category: <strong className="text-[#2D1822]">{task.category}</strong>
                      </span>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF0F4] border border-[#ECC2CE] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {getTaskIcon(task.id)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-[#2D1822]">
                          {task.title}
                        </h2>
                        <p className="text-sm text-[#9E3D58] font-serif italic mt-0.5">
                          {task.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 bg-[#FFF8FA] border border-[#ECCCD5] rounded-xl p-4 text-xs sm:text-sm">
                      <div className="font-serif font-bold text-[#2D1822]">
                        Task Objective:
                      </div>
                      <p className="text-[#5C3B48] leading-relaxed">
                        {task.objective}
                      </p>
                    </div>

                    {/* Key skills tested */}
                    <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                      <span className="text-[#7A5060] font-medium">Key Competencies Tested:</span>
                      {task.evaluationRubric.map((r, i) => (
                        <span
                          key={i}
                          className="bg-[#FFF0F4] text-[#8C2E47] px-3 py-1 rounded-full border border-[#ECC2CE] text-[11px] font-medium"
                        >
                          {r.criterion}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Submission Status & Action CTA */}
                  <div className="lg:w-72 shrink-0 flex flex-col justify-between p-5 rounded-2xl bg-[#FFF8FA] border border-[#ECCCD5] space-y-4">
                    <div>
                      <div className="text-xs text-[#7A5060] uppercase tracking-wider font-semibold mb-1">
                        Task Status
                      </div>
                      {isSubmitted ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[#8C2E47] font-serif font-bold text-base">
                            <CheckCircle2 className="w-4 h-4 text-[#9E3D58]" />
                            <span>Submitted & Reviewed</span>
                          </div>
                          <div className="text-xs text-[#5C3B48]">
                            Demo Score:{' '}
                            <strong className="text-[#9E3D58] font-serif text-lg">
                              {submission.demoScores.overall}%
                            </strong>
                          </div>
                          <div className="text-[11px] text-[#7A5060]">
                            Submitted: {submission.submittedAt}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="text-[#C27C38] font-semibold text-sm flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#C27C38]"></span>
                            <span>Ready to Start</span>
                          </div>
                          <p className="text-xs text-[#5C3B48] leading-relaxed">
                            Instructions and workplace data are ready for your review.
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectTask(task.id)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all shadow-md ${
                        isSubmitted
                          ? 'bg-[#FCE8EE] hover:bg-[#F8D7E0] text-[#8C2E47] border border-[#ECC2CE]'
                          : 'bg-[#9E3D58] hover:bg-[#862E45] text-white border border-[#7D263B]'
                      }`}
                    >
                      <span>{isSubmitted ? 'Review Submission' : 'Start Assessment'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
