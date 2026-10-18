import React, { useState } from 'react';
import { Page, TaskSubmission, StudentProfile } from '../types';
import { SKILL_CATEGORIES, WORKPLACE_TASKS } from '../data/mockData';
import {
  ShieldCheck,
  Info,
  Share2,
  CheckCircle2,
  FileCheck2,
  ChevronRight,
  Copy,
  Sparkles
} from 'lucide-react';

interface SkillPassportPageProps {
  onNavigate: (page: Page) => void;
  onSelectTask: (taskId: string) => void;
  submissions: Record<string, TaskSubmission>;
  studentProfile: StudentProfile;
}

export const SkillPassportPage: React.FC<SkillPassportPageProps> = ({
  onNavigate,
  onSelectTask,
  submissions,
  studentProfile,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence'>('overview');

  const shareableUrl = `https://beyondtheresume.org/passport/aarav-patel-8941`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyResumeSnippet = () => {
    const summaryText = `Beyond the Resume — Verified Engineering Candidate Summary\nCandidate: ${studentProfile.name} (#BTR-2026-8941)\nTrack: ${studentProfile.careerTrack}\nOverall Readiness Score: ${studentProfile.overallScore}%\n- Technical Accuracy & Memory Safety: 88%\n- Problem-Solving & Anomaly Root Cause: 84%\n- Edge-Case & Boundary Defense: 78%\n- Stakeholder Communication & Incident Triage: 91%\nVerified Simulations: Debug C Heap Buffer, Analyze Production Latency Spike, Client Bug De-escalation.\nVerify: ${shareableUrl}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="bg-[#FAF0F3] text-[#2D1822] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* COMPACT DEMO NOTICE */}
        <div className="bg-[#FFF5F8] border border-[#ECC2CE] rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-sm text-xs">
          <div className="flex items-center gap-2 text-[#7E2940]">
            <Info className="w-4 h-4 text-[#9E3D58] shrink-0" />
            <span>
              <strong>Demonstration Report:</strong> Scores represent rubric evaluations for simulation purposes.
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-[#8C2E47] bg-[#FCE8EE] px-2.5 py-0.5 rounded border border-[#ECC2CE]">
            AI Semantic Engine: V2
          </span>
        </div>

        {/* CANDIDATE PASSPORT HEADER CARD */}
        <div className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-[#F2D7DE]">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9E3D58] to-[#78283E] text-white font-serif font-bold text-2xl flex items-center justify-center shrink-0 shadow-md shadow-[#9E3D58]/20 border-2 border-[#FCE2E9]">
                {studentProfile.avatarInitials}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1822]">
                    {studentProfile.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FCE8EE] text-[#8C2E47] border border-[#ECC2CE]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9E3D58]" />
                    Verified Skill Passport
                  </span>
                </div>
                <p className="text-xs text-[#5C3B48]">
                  {studentProfile.degree} • {studentProfile.college}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A5060]">
                  <span>Track: <strong className="text-[#9E3D58]">{studentProfile.careerTrack}</strong></span>
                  <span>•</span>
                  <span>ID: <code className="text-[#9E3D58] font-mono">#BTR-2026-8941</code></span>
                </div>
              </div>
            </div>

            {/* Quick Actions for Candidate & Recruiter */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleCopyResumeSnippet}
                className="bg-[#FFF8FA] hover:bg-[#FCE8EE] text-[#8C2E47] border border-[#ECC2CE] font-semibold px-3.5 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm"
                title="Copy ready-to-paste text for your LinkedIn or Resume"
              >
                <Copy className="w-3.5 h-3.5 text-[#9E3D58]" />
                <span>{copiedSummary ? '✓ Copied Summary!' : 'Copy Resume Snippet'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="bg-[#FFFFFF] hover:bg-[#FFF5F8] text-[#5C3B48] border border-[#ECCCD5] font-semibold px-3.5 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5 text-[#9E3D58]" />
                <span>{copiedLink ? '✓ Copied Link!' : 'Share Passport Link'}</span>
              </button>

              <button
                onClick={() => onNavigate('tasks')}
                className="bg-[#9E3D58] hover:bg-[#862E45] text-white font-semibold px-4 py-2 rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-1 transition-all shadow-md border border-[#7D263B]"
              >
                <span>Take Tasks</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
            <div className="bg-[#FFF8FA] p-3 rounded-xl border border-[#ECCCD5]">
              <div className="text-[11px] text-[#7A5060]">Readiness Score</div>
              <div className="text-2xl font-serif font-bold text-[#2D1822]">{studentProfile.overallScore}%</div>
              <div className="text-[10px] text-[#9E3D58] font-semibold">Job-Ready Benchmark</div>
            </div>
            <div className="bg-[#FFF8FA] p-3 rounded-xl border border-[#ECCCD5]">
              <div className="text-[11px] text-[#7A5060]">Simulations Done</div>
              <div className="text-2xl font-serif font-bold text-[#2D1822]">{Object.keys(submissions).length} / {WORKPLACE_TASKS.length}</div>
              <div className="text-[10px] text-[#7A5060]">Recorded in Session</div>
            </div>
            <div className="bg-[#FFF8FA] p-3 rounded-xl border border-[#ECCCD5]">
              <div className="text-[11px] text-[#7A5060]">Campus Median</div>
              <div className="text-2xl font-serif font-bold text-[#2D1822]">67%</div>
              <div className="text-[10px] text-[#8C2E47] font-semibold">+17% Over Average</div>
            </div>
            <div className="bg-[#FFF8FA] p-3 rounded-xl border border-[#ECCCD5]">
              <div className="text-[11px] text-[#7A5060]">Evaluation Status</div>
              <div className="text-sm font-serif font-bold text-[#9E3D58] mt-1">Demonstration Ready</div>
              <div className="text-[10px] text-[#7A5060]">Audited Rubrics</div>
            </div>
          </div>
        </div>

        {/* TAB TOGGLE: OVERVIEW VS EVIDENCE */}
        <div className="flex items-center gap-2 border-b border-[#ECCCD5] pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-[#9E3D58] text-white shadow-sm'
                : 'text-[#5C3B48] hover:text-[#2D1822] hover:bg-[#FFF0F4]'
            }`}
          >
            4-Pillar Competencies
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'evidence'
                ? 'bg-[#9E3D58] text-white shadow-sm'
                : 'text-[#5C3B48] hover:text-[#2D1822] hover:bg-[#FFF0F4]'
            }`}
          >
            Recorded Answers ({Object.keys(submissions).length})
          </button>
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SKILL_CATEGORIES.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-5 space-y-3 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-serif font-bold text-[#2D1822]">
                          {skill.name}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FCE8EE] text-[#8C2E47] border border-[#ECC2CE]">
                          {skill.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C3B48] mt-0.5 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xl font-serif font-bold text-[#9E3D58]">
                        {skill.score}%
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-[#FCE8EE] rounded-full h-2.5 overflow-hidden border border-[#ECC2CE]">
                      <div
                        className="bg-gradient-to-r from-[#9E3D58] to-[#C8647E] h-2.5 rounded-full transition-all"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#7A5060]">
                      <span>Campus Benchmark: {skill.benchmark}%</span>
                      <span className="text-[#8C2E47] font-semibold">Candidate: {skill.score}%</span>
                    </div>
                  </div>

                  {/* Compact Sub-skills */}
                  <div className="pt-2 border-t border-[#F2D7DE] space-y-1">
                    {skill.subSkills.map((sub, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-[#FFF8FA]"
                      >
                        <span className="text-[#3D202B]">{sub.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#8C2E47] font-semibold">{sub.level}</span>
                          <span className="font-mono text-xs font-bold w-8 text-right text-[#9E3D58]">{sub.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Recruiter Trust Note */}
            <div className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-5 shadow-sm space-y-2">
              <h3 className="text-base font-serif font-bold text-[#2D1822] flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#9E3D58]" />
                <span>Why Recruiters Value Verified Workplace Simulations</span>
              </h3>
              <p className="text-xs text-[#5C3B48] leading-relaxed">
                Rather than evaluating buzzwords on a PDF resume, engineering leads inspect how the candidate handles pointers, identifies bottlenecks in production logs, and writes structured client responses.
              </p>
            </div>
          </div>
        ) : (
          /* EVIDENCE TAB */
          <div className="space-y-4">
            {Object.keys(submissions).length === 0 ? (
              <div className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-8 text-center space-y-3 shadow-sm">
                <p className="text-xs text-[#5C3B48]">No submissions recorded yet. Complete a task to view your evidence here.</p>
                <button
                  onClick={() => onNavigate('tasks')}
                  className="bg-[#9E3D58] text-white px-4 py-2 rounded-xl text-xs uppercase font-semibold"
                >
                  Start A Workplace Task
                </button>
              </div>
            ) : (
              Object.values(submissions).map((sub) => {
                const task = WORKPLACE_TASKS.find((t) => t.id === sub.taskId);
                if (!task) return null;

                return (
                  <div
                    key={sub.taskId}
                    className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-5 space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-[#F2D7DE] pb-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#9E3D58] font-bold bg-[#FFF0F4] px-2 py-0.5 rounded border border-[#ECC2CE]">
                          {task.code}
                        </span>
                        <h3 className="font-serif font-bold text-[#2D1822] text-base">{task.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#9E3D58] text-base">{sub.demoScores.overall}%</span>
                        <button
                          onClick={() => onSelectTask(task.id)}
                          className="bg-[#FFF8FA] hover:bg-[#FFF0F4] text-[#5C3B48] border border-[#ECCCD5] px-2.5 py-1 rounded-lg text-xs"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <pre className="bg-[#FFF8FA] border border-[#ECCCD5] rounded-xl p-3 text-xs font-mono text-[#2D1822] whitespace-pre-wrap max-h-48 overflow-y-auto">
                      {sub.answer}
                    </pre>

                    <div className="bg-[#FFF5F8] border border-[#ECC2CE] p-3 rounded-xl text-xs text-[#5C3B48]">
                      <strong className="text-[#8C2E47] block mb-0.5">Mentor Demonstration Note:</strong>
                      {sub.demoFeedback.mentorSummary}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
