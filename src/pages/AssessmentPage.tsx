import React, { useState, useEffect } from 'react';
import { Page, TaskScenario, TaskSubmission } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Info,
  Copy,
  ChevronRight,
  ChevronLeft,
  Code2,
  BookOpen,
  Send,
  Award,
  Terminal,
  Database,
  Mail,
  HelpCircle,
  FileText,
  ListOrdered
} from 'lucide-react';

interface AssessmentPageProps {
  task: TaskScenario;
  allTasks: TaskScenario[];
  onSelectTask: (taskId: string) => void;
  onNavigate: (page: Page) => void;
  onSubmit: (taskId: string, answer: string) => void;
  existingSubmission?: TaskSubmission;
  allSubmissions: Record<string, TaskSubmission>;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  task,
  allTasks,
  onSelectTask,
  onNavigate,
  onSubmit,
  existingSubmission,
  allSubmissions,
}) => {
  const [answer, setAnswer] = useState(existingSubmission?.answer || '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(!!existingSubmission);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeTab, setActiveTab] = useState<'material' | 'rubric' | 'hints'>('material');

  const currentIndex = allTasks.findIndex((t) => t.id === task.id);
  const prevTask = currentIndex > 0 ? allTasks[currentIndex - 1] : null;
  const nextTask = currentIndex < allTasks.length - 1 ? allTasks[currentIndex + 1] : null;

  useEffect(() => {
    if (existingSubmission) {
      setAnswer(existingSubmission.answer);
      setShowConfirmation(true);
    } else {
      setAnswer('');
      setShowConfirmation(false);
    }
    setErrorMessage(null);
    setActiveTab('material');
  }, [task.id, existingSubmission]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Input Validation
    const trimmed = answer.trim();
    if (!trimmed) {
      setErrorMessage('Please enter your solution before submitting. Submissions cannot be empty.');
      return;
    }

    if (trimmed.length < 20) {
      setErrorMessage('Please provide a complete explanation or solution (minimum 20 characters) to demonstrate workplace competency.');
      return;
    }

    setErrorMessage(null);
    onSubmit(task.id, trimmed);
    setShowConfirmation(true);
  };

  const handleLoadSample = () => {
    setAnswer(task.sampleSolution);
    setErrorMessage(null);
  };

  const handleInsertOutline = () => {
    let outline = '';
    if (task.id === 'debug-c-program') {
      outline = `1. IDENTIFIED BUGS & ROOT CAUSE:\n- Bug 1: \n- Bug 2: \n- Bug 3: \n\n2. CORRECTED C CODE:\n\n\n3. MEMORY OWNERSHIP & DEALLOCATION:\n- `;
    } else if (task.id === 'analyse-dataset') {
      outline = `EXECUTIVE INCIDENT SUMMARY:\n\n1. ROOT BOTTLENECK IDENTIFIED:\n- \n\n2. CORRELATION VS CAUSATION:\n- \n\n3. RECOMMENDED MITIGATION:\n- Immediate: \n- Architectural: `;
    } else {
      outline = `Subject: Re: URGENT: Mobile Checkout Resolution in Progress [Nordic Apparel]\n\nDear Sarah,\n\n1. EMPATHY & STATUS:\n\n2. IMMEDIATE ACTIONS UNDERWAY:\n- Action 1: \n- Action 2: \n\n3. NEXT FORMAL UPDATE TIME: Within 30 minutes (by 14:45 EST)\n\nSincerely,\n`;
    }
    setAnswer(outline);
    setErrorMessage(null);
  };

  const handleCopyCode = () => {
    if (task.codeSnippet) {
      navigator.clipboard.writeText(task.codeSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const charCount = answer.length;

  return (
    <div className="bg-[#FAF0F3] text-[#2D1822] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* FAST-SWITCH TASK BAR (Ultra-efficient navigation between the 3 tasks) */}
        <div className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-2.5 sm:p-3 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-serif font-bold text-[#7A5060] uppercase tracking-wider px-2 shrink-0">
              Tasks:
            </span>
            {allTasks.map((t, idx) => {
              const isCurrent = t.id === task.id;
              const isDone = !!allSubmissions[t.id];
              return (
                <button
                  key={t.id}
                  onClick={() => onSelectTask(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#9E3D58] text-white shadow-sm'
                      : 'bg-[#FFF8FA] text-[#5C3B48] hover:bg-[#FCE8EE] border border-[#ECCCD5]'
                  }`}
                >
                  <span className="font-mono text-[11px] opacity-80">{t.code}</span>
                  <span>Task {idx + 1}</span>
                  {isDone && <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-[#9E3D58]'}`} />}
                </button>
              );
            })}
          </div>

          {/* Quick Prev / Next Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end text-xs">
            {prevTask && (
              <button
                onClick={() => onSelectTask(prevTask.id)}
                className="px-2.5 py-1 rounded-lg text-[#5C3B48] hover:bg-[#FFF0F4] border border-[#ECCCD5] flex items-center gap-1 font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Task</span>
              </button>
            )}
            {nextTask && (
              <button
                onClick={() => onSelectTask(nextTask.id)}
                className="px-2.5 py-1 rounded-lg text-[#8C2E47] hover:bg-[#FFF0F4] border border-[#ECC2CE] bg-[#FCE8EE] flex items-center gap-1 font-semibold"
              >
                <span>Next: {nextTask.code}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => onNavigate('tasks')}
              className="text-xs text-[#7A5060] hover:text-[#2D1822] px-2 py-1"
            >
              All Tasks
            </button>
          </div>
        </div>

        {/* SUBMISSION CONFIRMATION & DEMO RESULT BANNER */}
        {showConfirmation && (
          <div className="bg-[#FFFFFF] border-2 border-[#D68EA1] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2D7DE] pb-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#9E3D58] shrink-0" />
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2D1822]">
                    Submission Accepted & Stored in Session
                  </h3>
                  <p className="text-xs text-[#7A5060]">
                    Evaluated against the junior engineer rubric (sample demonstration score).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {nextTask && (
                  <button
                    onClick={() => onSelectTask(nextTask.id)}
                    className="bg-[#9E3D58] hover:bg-[#862E45] text-white font-semibold px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-1 shadow-sm"
                  >
                    <span>Proceed to Next Task</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => onNavigate('passport')}
                  className="bg-[#FFF0F4] hover:bg-[#FCE8EE] text-[#8C2E47] border border-[#ECC2CE] font-semibold px-3 py-1.5 rounded-xl text-xs"
                >
                  View Skill Passport
                </button>
              </div>
            </div>

            {/* Compact 4-score metric row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="bg-[#FFF8FA] border border-[#ECCCD5] p-2.5 rounded-xl">
                <div className="text-[11px] text-[#7A5060]">Technical Accuracy</div>
                <div className="text-xl font-serif font-bold text-[#9E3D58]">88/100</div>
              </div>
              <div className="bg-[#FFF8FA] border border-[#ECCCD5] p-2.5 rounded-xl">
                <div className="text-[11px] text-[#7A5060]">Problem-Solving</div>
                <div className="text-xl font-serif font-bold text-[#9E3D58]">85/100</div>
              </div>
              <div className="bg-[#FFF8FA] border border-[#ECCCD5] p-2.5 rounded-xl">
                <div className="text-[11px] text-[#7A5060]">Edge-Case Handling</div>
                <div className="text-xl font-serif font-bold text-[#9E3D58]">80/100</div>
              </div>
              <div className="bg-[#FFF8FA] border border-[#ECCCD5] p-2.5 rounded-xl">
                <div className="text-[11px] text-[#7A5060]">Communication</div>
                <div className="text-xl font-serif font-bold text-[#9E3D58]">92/100</div>
              </div>
            </div>
          </div>
        )}

        {/* TASK HEADER CARD - COMPACT & HIGH-SIGNAL */}
        <div className="bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#9E3D58] font-bold text-xs bg-[#FFF0F4] px-2.5 py-0.5 rounded-full border border-[#ECC2CE]">
                  {task.code}
                </span>
                <span className="text-xs text-[#7A5060] bg-[#FFF8FA] px-2 py-0.5 rounded-full border border-[#ECCCD5]">
                  {task.difficulty}
                </span>
                <span className="text-xs text-[#7A5060] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#9E3D58]" />
                  {task.estimatedMinutes} mins
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1822]">
                {task.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C3B48]">
                {task.objective}
              </p>
            </div>
          </div>
        </div>

        {/* WORKSPACE: LEFT (MATERIAL / INSTRUCTIONS / HINTS) & RIGHT (EDITOR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: TABBED MATERIAL FOR ZERO SCROLL FATIGUE */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl overflow-hidden shadow-sm">
            {/* Tabs */}
            <div className="flex items-center border-b border-[#F2D7DE] bg-[#FFF8FA] px-4 pt-2 gap-2 text-xs">
              <button
                onClick={() => setActiveTab('material')}
                className={`pb-2.5 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'material'
                    ? 'border-[#9E3D58] text-[#9E3D58]'
                    : 'border-transparent text-[#7A5060] hover:text-[#2D1822]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Source Material & Context</span>
              </button>

              <button
                onClick={() => setActiveTab('rubric')}
                className={`pb-2.5 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'rubric'
                    ? 'border-[#9E3D58] text-[#9E3D58]'
                    : 'border-transparent text-[#7A5060] hover:text-[#2D1822]'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Instructions ({task.instructions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('hints')}
                className={`pb-2.5 px-3 font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'hints'
                    ? 'border-[#9E3D58] text-[#9E3D58]'
                    : 'border-transparent text-[#7A5060] hover:text-[#2D1822]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Engineering Hints</span>
              </button>
            </div>

            {/* Tab 1: Source Material */}
            {activeTab === 'material' && (
              <div className="p-5 space-y-4">
                <div className="text-xs text-[#5C3B48] leading-relaxed bg-[#FFF8FA] p-3 rounded-xl border border-[#ECCCD5]">
                  <strong className="text-[#2D1822] font-semibold block mb-0.5">Scenario Context:</strong>
                  {task.context}
                </div>

                {task.codeSnippet && (
                  <div className="bg-[#24151C] rounded-xl overflow-hidden border border-[#522938]">
                    <div className="bg-[#1C0F16] px-3.5 py-2 border-b border-[#3D1E2A] flex items-center justify-between text-xs">
                      <span className="font-mono text-[#ECCCD5] text-[11px]">transaction_buffer.c</span>
                      <button
                        onClick={handleCopyCode}
                        className="text-[#DDA5B5] hover:text-white flex items-center gap-1 text-[11px] bg-[#331923] px-2 py-0.5 rounded"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedSnippet ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre className="p-3.5 text-xs font-mono text-[#F7CED8] overflow-x-auto leading-relaxed max-h-[320px]">
                      <code>{task.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {task.dataSnippet && (
                  <div className="border border-[#ECCCD5] rounded-xl overflow-hidden">
                    <div className="bg-[#FFF5F8] px-3 py-1.5 border-b border-[#ECCCD5] text-xs font-mono font-semibold text-[#8C2E47]">
                      production_metrics_snapshot.log (6 Hours)
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#FFF0F4] border-b border-[#ECCCD5] text-[#5C3B48]">
                            {task.dataSnippet.headers.map((h, i) => (
                              <th key={i} className="p-2 whitespace-nowrap font-semibold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F2D7DE] font-mono text-[11px]">
                          {task.dataSnippet.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={String(row[3]).includes('Saturated') ? 'bg-[#FCE8EE] text-[#8C2E47] font-bold' : ''}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 whitespace-nowrap">
                                  {String(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {task.clientMessage && (
                  <div className="border border-[#ECCCD5] rounded-xl overflow-hidden bg-[#FFF8FA] p-4 text-xs space-y-2">
                    <div className="border-b border-[#F2D7DE] pb-2 text-[#7A5060]">
                      <div><strong>From:</strong> {task.clientMessage.from}</div>
                      <div><strong>Subject:</strong> <span className="text-[#2D1822] font-semibold">{task.clientMessage.subject}</span></div>
                    </div>
                    <p className="whitespace-pre-line text-[#5C3B48] leading-relaxed bg-[#FFFFFF] p-3 rounded-lg border border-[#ECCCD5]">
                      {task.clientMessage.body}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Instructions & Rubrics */}
            {activeTab === 'rubric' && (
              <div className="p-5 space-y-4">
                <h4 className="text-xs font-serif font-bold text-[#8C2E47] uppercase tracking-wider">
                  Specific Deliverables:
                </h4>
                <ul className="space-y-2 text-xs text-[#5C3B48]">
                  {task.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#FCE8EE] text-[#8C2E47] border border-[#ECC2CE] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-xs font-serif font-bold text-[#8C2E47] uppercase tracking-wider pt-2 border-t border-[#F2D7DE]">
                  Evaluation Criteria:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {task.evaluationRubric.map((r, i) => (
                    <div key={i} className="bg-[#FFF8FA] border border-[#ECCCD5] p-2.5 rounded-xl">
                      <div className="font-serif font-bold text-[#8C2E47]">{r.criterion}</div>
                      <div className="text-[11px] text-[#7A5060]">{r.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Hints */}
            {activeTab === 'hints' && (
              <div className="p-5 space-y-3">
                <div className="bg-[#FFF5F8] border border-[#ECC2CE] p-3.5 rounded-xl text-xs text-[#73293D] space-y-2">
                  <h4 className="font-serif font-bold text-[#8C2E47] text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#9E3D58]" />
                    <span>Senior Engineer Guidance</span>
                  </h4>
                  <p className="leading-relaxed">
                    In technical interviews and first-year performance reviews, senior engineers look for two key things:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li><strong>Explicit edge-case defense:</strong> What happens if input size is 0 or NULL?</li>
                    <li><strong>Ownership clarity:</strong> Who deallocates memory, or what is the exact timeline for the next client update?</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: FAST SUBMISSION EDITOR WITH HELPER BUTTONS */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#ECCCD5] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#F2D7DE] pb-2.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#9E3D58]" />
                <h3 className="font-serif font-bold text-[#2D1822] text-base">Your Solution Workspace</h3>
              </div>
              <div className="text-xs text-[#7A5060]">
                <span className="font-mono text-[#9E3D58] font-bold">{wordCount}</span> words
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleInsertOutline}
                className="px-3 py-1.5 rounded-lg bg-[#FFF8FA] hover:bg-[#FCE8EE] text-[#5C3B48] border border-[#ECCCD5] font-medium flex items-center gap-1 transition-colors"
                title="Inserts a structured response outline"
              >
                <ListOrdered className="w-3.5 h-3.5 text-[#9E3D58]" />
                <span>Insert Answer Outline</span>
              </button>

              <button
                type="button"
                onClick={handleLoadSample}
                className="px-3 py-1.5 rounded-lg bg-[#FCE8EE] hover:bg-[#F8D7E0] text-[#8C2E47] border border-[#ECC2CE] font-semibold flex items-center gap-1 transition-colors"
                title="Loads sample answer for instant testing"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#9E3D58]" />
                <span>Auto-Fill Sample</span>
              </button>

              <button
                type="button"
                onClick={() => setAnswer('')}
                className="text-xs text-[#7A5060] hover:text-[#2D1822] px-2 py-1 ml-auto"
              >
                Clear
              </button>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                rows={12}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Write your explanation, code fix, or client message here..."
                className="w-full bg-[#FFFDFD] border border-[#ECCCD5] rounded-xl p-3.5 text-xs sm:text-sm font-mono text-[#2D1822] placeholder-[#A88291] focus:outline-none focus:border-[#9E3D58] focus:ring-1 focus:ring-[#9E3D58] leading-relaxed resize-y min-h-[260px]"
              />

              {errorMessage && (
                <div className="bg-[#FFF0F4] border border-[#E5899F] rounded-xl p-2.5 flex items-center gap-2 text-xs text-[#8C2E47]">
                  <AlertCircle className="w-4 h-4 text-[#9E3D58] shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#7A5060]">
                  Validated & saved to application state
                </span>

                <button
                  type="submit"
                  className="bg-[#9E3D58] hover:bg-[#862E45] text-white font-semibold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md transition-all border border-[#7D263B]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
