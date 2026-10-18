export type Page = 'landing' | 'dashboard' | 'tasks' | 'assessment' | 'passport';

export type TaskDifficulty = 'Beginner' | 'Beginner-Intermediate' | 'Intermediate' | 'Advanced';

export type TaskCategory = 'Systems & Core Programming' | 'Data & Observability' | 'Workplace Communication & Triage';

export interface TaskScenario {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  difficulty: TaskDifficulty;
  category: TaskCategory;
  estimatedMinutes: number;
  objective: string;
  context: string;
  scenarioDetail: string;
  codeSnippet?: string;
  dataSnippet?: {
    headers: string[];
    rows: (string | number)[][];
  };
  clientMessage?: {
    from: string;
    role: string;
    subject: string;
    timestamp: string;
    body: string;
  };
  instructions: string[];
  evaluationRubric: {
    criterion: string;
    description: string;
  }[];
  sampleSolution: string;
}

export interface TaskSubmission {
  taskId: string;
  answer: string;
  submittedAt: string;
  status: 'submitted' | 'reviewed';
  demoScores: {
    technicalAccuracy: number;
    problemSolving: number;
    edgeCaseHandling: number;
    communication: number;
    overall: number;
  };
  demoFeedback: {
    strengths: string[];
    areasForImprovement: string[];
    mentorSummary: string;
  };
}

export interface StudentProfile {
  name: string;
  college: string;
  collegeTier: string;
  degree: string;
  batch: string;
  careerTrack: string;
  avatarInitials: string;
  tasksCompletedCount: number;
  totalAttempts: number;
  readinessRating: string;
  overallScore: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  score: number;
  benchmark: number; // Tier-1 college / industry median benchmark
  status: 'Strong' | 'Proficient' | 'Developing';
  subSkills: {
    name: string;
    level: string;
    score: number;
  }[];
}
