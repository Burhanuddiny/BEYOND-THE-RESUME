/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Page, TaskSubmission, StudentProfile } from './types';
import {
  WORKPLACE_TASKS,
  INITIAL_SUBMISSIONS,
  INITIAL_STUDENT_PROFILE,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { SkillPassportPage } from './pages/SkillPassportPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(WORKPLACE_TASKS[0].id);

  // Application state storing submissions in memory & local storage for session resilience
  const [submissions, setSubmissions] = useState<Record<string, TaskSubmission>>(() => {
    try {
      const saved = localStorage.getItem('btr_submissions');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback to initial mock submissions
    }
    return INITIAL_SUBMISSIONS;
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('btr_submissions', JSON.stringify(submissions));
    } catch {
      // Ignore local storage errors if disabled
    }
  }, [submissions]);

  // Handle task selection
  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCurrentPage('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle submission of a workplace task
  const handleSubmitTask = (taskId: string, answerText: string) => {
    const task = WORKPLACE_TASKS.find((t) => t.id === taskId);
    if (!task) return;

    const newSubmission: TaskSubmission = {
      taskId,
      answer: answerText,
      submittedAt: 'Just now',
      status: 'submitted',
      demoScores: {
        technicalAccuracy: taskId === 'debug-c-program' ? 90 : taskId === 'analyse-dataset' ? 88 : 92,
        problemSolving: taskId === 'debug-c-program' ? 86 : taskId === 'analyse-dataset' ? 90 : 84,
        edgeCaseHandling: taskId === 'debug-c-program' ? 80 : taskId === 'analyse-dataset' ? 82 : 88,
        communication: taskId === 'debug-c-program' ? 88 : taskId === 'analyse-dataset' ? 89 : 94,
        overall: taskId === 'debug-c-program' ? 86 : taskId === 'analyse-dataset' ? 87 : 89,
      },
      demoFeedback: {
        strengths: [
          'Directly addresses the scenario requirements with high technical clarity.',
          'Demonstrates solid discipline in edge-case boundaries and root-cause analysis.',
          'Maintains professional engineering communication standards.'
        ],
        areasForImprovement: [
          'Consider documenting assumptions in a standard RFC / PR format.',
          'Further detail on telemetry verification post-deployment is beneficial.'
        ],
        mentorSummary:
          'Excellent practical execution. Your response reflects real-world engineering judgment that distinguishes candidates during technical reviews.'
      }
    };

    setSubmissions((prev) => ({
      ...prev,
      [taskId]: newSubmission,
    }));

    // Update profile metrics count
    setStudentProfile((prev) => ({
      ...prev,
      tasksCompletedCount: Object.keys({ ...submissions, [taskId]: newSubmission }).length,
      totalAttempts: prev.totalAttempts + 1,
    }));
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTask = WORKPLACE_TASKS.find((t) => t.id === selectedTaskId) || WORKPLACE_TASKS[0];
  const completedCount = Object.keys(submissions).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF0F3] text-[#2D1822] selection:bg-[#FCE8EE] selection:text-[#8C2E47] font-sans">
      {/* Universal Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        completedTasksCount={completedCount}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onSelectTask={handleSelectTask}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onSelectTask={handleSelectTask}
            submissions={submissions}
            studentProfile={studentProfile}
          />
        )}

        {currentPage === 'tasks' && (
          <TasksPage
            onNavigate={handleNavigate}
            onSelectTask={handleSelectTask}
            submissions={submissions}
          />
        )}

        {currentPage === 'assessment' && (
          <AssessmentPage
            task={currentTask}
            allTasks={WORKPLACE_TASKS}
            onSelectTask={handleSelectTask}
            onNavigate={handleNavigate}
            onSubmit={handleSubmitTask}
            existingSubmission={submissions[currentTask.id]}
            allSubmissions={submissions}
          />
        )}

        {currentPage === 'passport' && (
          <SkillPassportPage
            onNavigate={handleNavigate}
            onSelectTask={handleSelectTask}
            submissions={submissions}
            studentProfile={studentProfile}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
