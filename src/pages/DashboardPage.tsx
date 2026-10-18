import React from 'react';
import { Page, TaskSubmission, StudentProfile } from '../types';
import {
  WORKPLACE_TASKS,
  SKILL_CATEGORIES,
  CONTINUE_LEARNING_ITEMS
} from '../data/mockData';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Award,
  BookOpen,
  Info,
  Sparkles,
  ChevronRight,
  Target,
  Play
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
  onSelectTask: (taskId: string) => void;
  submissions: Record<string, TaskSubmission>;
  studentProfile: StudentProfile;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onSelectTask,
  submissions,
  studentProfile,
}) => {
  const completedCount = Object.keys(submissions).length;
  const nextIncompleteTask = WORKPLACE_TASKS.find((t) => !submissions[t.id]) || WORKPLACE_TASKS[0];
  const allCompleted = completedCount >= WORKPLACE_TASKS.length;

  return (
    <div className="bg-[#FAF0F3] text-[#2D1822] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* DEMONSTRATION NOTICE - COMPACT */}
        <div className="bg-[#FFF5F8] border border-[#ECC2CE] rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2 text-[#7E2940]">
            <Info className="w-4 h-4 text-[#9E3D58] shrink-0" />
            <span>
              <strong>Demonstration Preview:</strong> All scores and progress are simulated sample values to illustrate candidate profiling.
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-[#8C2E47] bg-[#FCE8EE] px-2.5 py-0.5 rounded border border-[#ECC2CE]">
            Simulated Rubric
          </span>
        </div>

        {/* WELCOME HEADER & QUICK NEXT-STEP ACTION (High Efficiency) */}
        <div className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="uppercase font-bold tracking-wider text-[#8C2E47] bg-[#FCE8EE] px-2.5 py-0.5 rounded-full border border-[#ECC2CE] text-[10px]">
                {studentProfile.careerTrack}
              </span>
              <span className="text-[#7A5060]">• {studentProfile.collegeTier}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1822]">
              Welcome back, {studentProfile.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#5C3B48]">
              {studentProfile.degree} • {studentProfile.college}
            </p>
          </div>

          {/* Quick Resume Card - Direct 1-Click Launch */}
          <div className="bg-[#FFF8FA] border border-[#ECCCD5] p-4 rounded-xl flex items-center justify-between gap-4 lg:w-96 shadow-inner">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-[#9E3D58] tracking-wider block">
                {allCompleted ? 'Completed All 3 Tasks' : 'Recommended Next Task'}
              </span>
              <div className="text-sm font-serif font-bold text-[#2D1822] truncate max-w-[200px]">
                {allCompleted ? 'Review Skill Passport' : nextIncompleteTask.title}
              </div>
              <span className="text-[11px] text-[#7A5060]">
                {allCompleted ? 'Verified Score: 87%' : `${nextIncompleteTask.estimatedMinutes} mins est.`}
              </span>
            </div>

            <button
              onClick={() => {
                if (allCompleted) {
                  onNavigate('passport');
                } else {
                  onSelectTask(nextIncompleteTask.id);
                }
              }}
              className="bg-[#9E3D58] hover:bg-[#862E45] text-white font-semibold px-4 py-2 rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0 shadow-sm border border-[#7D263B]"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>{allCompleted ? 'View' : 'Start'}</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFFFFF] border border-[#ECCCD5] p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#7A5060] mb-1 font-medium">
              <span>Completed Tasks</span>
              <CheckCircle2 className="w-4 h-4 text-[#9E3D58]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1822]">
              {completedCount} <span className="text-xs font-sans text-[#7A5060]">/ 3</span>
            </div>
            <div className="text-[11px] text-[#9E3D58] font-medium mt-0.5">
              {allCompleted ? 'All tasks finished!' : `${3 - completedCount} tasks remaining`}
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#ECCCD5] p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#7A5060] mb-1 font-medium">
              <span>Total Attempts</span>
              <Clock className="w-4 h-4 text-[#B86B77]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1822]">
              {studentProfile.totalAttempts + (completedCount > 1 ? completedCount - 1 : 0)}
            </div>
            <div className="text-[11px] text-[#7A5060] mt-0.5">
              Iterative submissions
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#ECCCD5] p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#7A5060] mb-1 font-medium">
              <span>Skill Readiness</span>
              <Award className="w-4 h-4 text-[#C27C38]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1822]">
              {studentProfile.overallScore}%
            </div>
            <div className="text-[11px] text-[#8C2E47] font-semibold mt-0.5">
              ★ {studentProfile.readinessRating}
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#ECCCD5] p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#7A5060] mb-1 font-medium">
              <span>Skill Passport</span>
              <Sparkles className="w-4 h-4 text-[#9E3D58]" />
            </div>
            <div className="text-lg font-serif font-bold text-[#9E3D58]">
              Verified
            </div>
            <button
              onClick={() => onNavigate('passport')}
              className="text-[11px] text-[#9E3D58] hover:text-[#78283E] font-semibold mt-0.5 inline-flex items-center gap-0.5"
            >
              <span>View Report</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* WORKPLACE TASKS - CLEAN & DIRECT */}
        <div className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F2D7DE] pb-3">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2D1822]">
                Workplace Simulations
              </h2>
              <p className="text-xs text-[#7A5060]">
                Choose any scenario to solve in the assessment console.
              </p>
            </div>

            <button
              onClick={() => onNavigate('tasks')}
              className="text-xs font-semibold text-[#9E3D58] hover:text-[#78283E] inline-flex items-center gap-1"
            >
              <span>View all details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WORKPLACE_TASKS.map((task) => {
              const isSubmitted = !!submissions[task.id];
              const submission = submissions[task.id];

              return (
                <div
                  key={task.id}
                  className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                    isSubmitted
                      ? 'bg-[#FFF8FA] border-[#DDA5B5]'
                      : 'bg-[#FFFFFF] border-[#ECCCD5] hover:border-[#DDA5B5]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#9E3D58] font-bold text-[11px]">
                        {task.code}
                      </span>
                      {isSubmitted ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#8C2E47] bg-[#FCE8EE] px-2 py-0.5 rounded-full border border-[#ECC2CE]">
                          <CheckCircle2 className="w-3 h-3" />
                          Done ({submission.demoScores.overall}%)
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#7A5060] bg-[#FFF0F4] px-2 py-0.5 rounded-full border border-[#ECCCD5]">
                          {task.estimatedMinutes}m • {task.difficulty}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-[#2D1822] text-base leading-snug">
                      {task.title}
                    </h3>
                    <p className="text-xs text-[#5C3B48] line-clamp-2 leading-relaxed">
                      {task.objective}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#F2D7DE] flex items-center justify-between text-xs">
                    <span className="text-[#7A5060] text-[11px]">{task.category.split('&')[0]}</span>
                    <button
                      onClick={() => onSelectTask(task.id)}
                      className={`font-semibold text-xs px-3 py-1 rounded-lg inline-flex items-center gap-1 transition-colors ${
                        isSubmitted
                          ? 'bg-[#FCE8EE] text-[#8C2E47] hover:bg-[#F8D7E0] border border-[#ECC2CE]'
                          : 'bg-[#9E3D58] hover:bg-[#862E45] text-white shadow-sm'
                      }`}
                    >
                      <span>{isSubmitted ? 'Review' : 'Solve'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SKILL PROGRESS & CONTINUE LEARNING IN A BALANCED TWO-COLUMN ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Skill Progress Bar (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#F2D7DE] pb-2.5">
              <h2 className="text-lg font-serif font-bold text-[#2D1822]">
                Core Competency Progress
              </h2>
              <button
                onClick={() => onNavigate('passport')}
                className="text-xs font-semibold text-[#9E3D58] hover:text-[#78283E] inline-flex items-center gap-1"
              >
                <span>Full Passport</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3 pt-1">
              {SKILL_CATEGORIES.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2D1822]">{skill.name}</span>
                    <span className="font-mono font-bold text-[#9E3D58]">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-[#FCE8EE] rounded-full h-2 overflow-hidden border border-[#ECC2CE]">
                    <div
                      className="bg-gradient-to-r from-[#9E3D58] to-[#C8647E] h-2 rounded-full transition-all"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Learning (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-5 sm:p-6 space-y-3 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-[#F2D7DE] pb-2.5">
                <BookOpen className="w-4 h-4 text-[#9E3D58]" />
                <h2 className="text-lg font-serif font-bold text-[#2D1822]">
                  Quick Engineering Guides
                </h2>
              </div>
              <div className="space-y-2.5 pt-2">
                {CONTINUE_LEARNING_ITEMS.slice(0, 2).map((item) => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-[#FFF8FA] border border-[#ECCCD5] text-xs">
                    <div className="flex items-center justify-between text-[10px] text-[#9E3D58] font-semibold mb-0.5">
                      <span>{item.track}</span>
                      <span className="text-[#7A5060]">{item.duration}</span>
                    </div>
                    <div className="font-serif font-bold text-[#2D1822] text-sm">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('tasks')}
              className="w-full text-center py-2 bg-[#FCE8EE] hover:bg-[#F8D7E0] text-[#8C2E47] font-semibold text-xs rounded-xl border border-[#ECC2CE] transition-colors mt-2"
            >
              Practice What You Learn in Tasks →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
