import { TaskScenario, StudentProfile, SkillCategory, TaskSubmission } from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Aarav Patel',
  college: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
  collegeTier: 'Tier-3 Engineering Institution',
  degree: 'B.Tech in Computer Science & Engineering',
  batch: 'Class of 2026 (Final Year)',
  careerTrack: 'Junior Software Developer',
  avatarInitials: 'AP',
  tasksCompletedCount: 1,
  totalAttempts: 3,
  readinessRating: 'Job-Ready Candidate',
  overallScore: 84,
};

export const WORKPLACE_TASKS: TaskScenario[] = [
  {
    id: 'debug-c-program',
    code: 'TASK-C01',
    title: 'Debug a C Program',
    subtitle: 'Dynamic Buffer Allocation & Segmentation Fault',
    difficulty: 'Intermediate',
    category: 'Systems & Core Programming',
    estimatedMinutes: 20,
    objective: 'Identify memory leak vulnerabilities and pointer misuse causing crashes in high-throughput data ingestion, explain the root cause, and write fixed code.',
    context: 'You are on the backend platform engineering team at FinStream. A client reporting tool written in C intermittently crashes with SIGSEGV (segmentation fault) under high request volumes. The intern who wrote this snippet has left the team, and you need to review the code, pinpoint both the crash and memory leakage, and provide a clean fix.',
    scenarioDetail: 'The following function `process_transactions` dynamically allocates a buffer for an array of transaction IDs, appends incoming items, and returns the pointer. However, QA reports that after 100k requests, the server process runs out of RAM, and sometimes crashes when zero transactions are passed.',
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int id;
    double amount;
    char status[16];
} Transaction;

// Function under review:
int* extract_transaction_ids(Transaction* list, int count) {
    if (count <= 0) {
        return NULL; // Wait, is list freed?
    }

    // Bug 1: Incorrect allocation size calculation
    int* id_buffer = (int*)malloc(count * sizeof(char)); 

    for (int i = 0; i <= count; i++) { // Bug 2: Off-by-one boundary
        id_buffer[i] = list[i].id;
    }

    // Notice: Caller owns id_buffer, but what if realloc fails later?
    return id_buffer;
}

int main() {
    Transaction txs[3] = {
        {101, 249.50, "SETTLED"},
        {102, 120.00, "PENDING"},
        {103, 850.75, "SETTLED"}
    };

    int* ids = extract_transaction_ids(txs, 3);
    for (int i = 0; i < 3; i++) {
        printf("Transaction ID: %d\\n", ids[i]);
    }

    // Bug 3: Missing free(ids), causing heap memory accumulation!
    return 0;
}`,
    instructions: [
      'Pinpoint at least 3 critical bugs or memory safety issues in the snippet provided.',
      'Explain the exact root cause of the SIGSEGV / out-of-bounds access in the loop.',
      'Explain why `sizeof(char)` in `malloc` causes heap corruption when storing `int` values.',
      'Provide your corrected version of `extract_transaction_ids` with proper boundary checks and memory safety.',
      'Note what the caller responsibility must be regarding deallocation (`free`).'
    ],
    evaluationRubric: [
      { criterion: 'Technical Accuracy', description: 'Correct identification of `sizeof(int)` vs `sizeof(char)` and loop off-by-one `i <= count`.' },
      { criterion: 'Problem-Solving', description: 'Systematic root-cause explanation of memory buffer overrun and SIGSEGV behavior.' },
      { criterion: 'Edge-Case Handling', description: 'Guards against NULL input pointers, zero count, and checking `malloc` return for NULL.' },
      { criterion: 'Code Quality & Cleanliness', description: 'Readable, ANSI C compliant solution with explicit deallocation guidance.' },
    ],
    sampleSolution: `1. IDENTIFIED BUGS:
a) Size calculation: \`malloc(count * sizeof(char))\` allocates only 1 byte per element instead of \`sizeof(int)\` (typically 4 bytes). Writing integers causes heap buffer overflow.
b) Off-by-one loop: \`for (int i = 0; i <= count; i++)\` accesses index \`list[3]\` and writes to \`id_buffer[3]\`, which is outside bounds (valid indices are 0 to count-1).
c) Unchecked malloc: The code does not check if \`malloc\` returns NULL when memory is exhausted.
d) Memory Leak: In \`main()\`, \`ids\` is allocated on heap but never released with \`free(ids)\`.

2. CORRECTED CODE:
#include <stdio.h>
#include <stdlib.h>

int* extract_transaction_ids(const Transaction* list, int count) {
    if (list == NULL || count <= 0) {
        return NULL;
    }

    int* id_buffer = (int*)malloc((size_t)count * sizeof(int));
    if (id_buffer == NULL) {
        // Handle allocation failure gracefully
        return NULL;
    }

    for (int i = 0; i < count; i++) {
        id_buffer[i] = list[i].id;
    }

    return id_buffer;
}

3. CALLER RESPONSIBILITY:
The caller must verify the returned pointer is not NULL, process the data, and explicitly call \`free(ids)\` once processing is complete.`
  },
  {
    id: 'analyse-dataset',
    code: 'TASK-D02',
    title: 'Analyse a Small Dataset and Explain a Finding',
    subtitle: 'API Latency Spike & Database Connection Saturation',
    difficulty: 'Beginner-Intermediate',
    category: 'Data & Observability',
    estimatedMinutes: 25,
    objective: 'Analyse a 24-hour service metrics table, detect the true bottleneck behind user checkout delays, and articulate your findings in an executive engineering summary.',
    context: 'During Monday evening peak traffic, customers complained that the mobile checkout service slowed to a crawl. The infrastructure team took snapshots of hourly server metrics (CPU usage, DB connection pool utilization, p95 API response time, and active requests). You are asked to interpret the metrics and explain what happened.',
    scenarioDetail: 'Inspect the 6-hour critical window snapshot from the production observability dashboard below. Notice the relationships between Active Web Requests, CPU Load, DB Connections Pool % used, and API p95 response time in milliseconds.',
    dataSnippet: {
      headers: ['Hour (UTC)', 'Active Requests/sec', 'App CPU Usage (%)', 'DB Pool Utilized (%)', 'p95 Latency (ms)', 'Error Rate (%)'],
      rows: [
        ['16:00', 420, '42%', '38%', 145, '0.02%'],
        ['17:00', 680, '51%', '54%', 168, '0.04%'],
        ['18:00 (Peak Start)', 1150, '68%', '89%', 420, '0.85%'],
        ['19:00 (Severe Spike)', 1220, '71%', '99% (Saturated)', 2850, '4.90%'],
        ['20:00 (Throttling On)', 950, '64%', '98% (Saturated)', 2100, '3.10%'],
        ['21:00 (Post-Mitigation)', 600, '48%', '45%', 180, '0.08%']
      ]
    },
    instructions: [
      'Examine the metrics table and identify which subsystem reached its limit first.',
      'Explain why p95 latency skyrocketed from 168ms at 17:00 to 2,850ms at 19:00 while CPU usage only rose from 51% to 71%.',
      'Distinguish between correlation and direct causation in this incident.',
      'Write a 3-paragraph executive summary suitable for a lead engineer and product manager explaining what happened, why, and a recommended architectural fix (e.g. connection pooling tuning, query indexing, or read replicas).'
    ],
    evaluationRubric: [
      { criterion: 'Data Literacy & Deduction', description: 'Correctly pinpoints Database Connection Pool saturation (99%) as the primary bottleneck rather than CPU.' },
      { criterion: 'Root-Cause Reasoning', description: 'Explains queueing theory: threads blocking on unavailable DB connections causes p95 latency to explode exponentially.' },
      { criterion: 'Executive Communication', description: 'Concise, jargon-free summary addressing business impact, technical reality, and next steps.' },
      { criterion: 'Actionable Recommendations', description: 'Proposes realistic fixes: connection pool scaling, query optimization, timeout adjustments, or cache layer.' },
    ],
    sampleSolution: `EXECUTIVE SUMMARY: INCIDENT RETROSPECTIVE (18:00 - 20:00 UTC)

1. Root Cause Finding:
The latency degradation was caused by complete exhaustion of the Database Connection Pool (peaking at 99% saturation), rather than server compute saturation. While App CPU remained within safe thresholds (71%), incoming web worker threads were blocked waiting in queue for an available DB connection, causing p95 response times to surge exponentially from 168ms to 2,850ms.

2. Correlation vs. Causation:
Although higher request volume (1,220 req/s) correlated with the incident, the direct driver of failure was database connection contention. Because long-running queries held connections without returning them to the pool promptly, subsequent requests backed up in memory, triggering HTTP 504 gateway timeouts and a 4.90% error rate.

3. Recommended Remediation:
- Immediate: Increase DB connection pool size from current limit with reasonable safety margins; enforce aggressive statement timeouts (e.g., 800ms) on checkout queries.
- Architectural: Introduce an ElastiCache Redis layer for read-heavy cart validations and implement read replicas to offload non-transactional database reads.`
  },
  {
    id: 'client-bug-response',
    code: 'TASK-C03',
    title: 'Respond Professionally to a Client Reporting a Software Bug',
    subtitle: 'Escalation Triage & Stakeholder Communication',
    difficulty: 'Beginner',
    category: 'Workplace Communication & Triage',
    estimatedMinutes: 15,
    objective: 'Draft an empathetic, structured, and blameless client response addressing an urgent payment bug while managing expectations and proposing immediate mitigation.',
    context: 'You are working as an associate engineer at a B2B SaaS company that provides e-commerce checkouts for regional retailers. On Friday afternoon, Sarah Jenkins, VP of E-Commerce at an enterprise client "Nordic Apparel", sends an upset escalation message.',
    scenarioDetail: 'Read Sarah\'s email below carefully. Your goal is to reply in a way that de-escalates the tension, acknowledges the business urgency, explains your troubleshooting steps without confusing technical jargon, and sets a clear timeframe for the next update.',
    clientMessage: {
      from: 'Sarah Jenkins <sjenkins@nordicapparel.com>',
      role: 'VP of E-Commerce, Nordic Apparel',
      subject: 'URGENT: Checkout failing for mobile customers - Losing thousands in sales!',
      timestamp: 'Today at 14:15 EST',
      body: `Hi Engineering Team,\n\nThis is completely unacceptable. Starting roughly an hour ago, our customer support inbox has been flooded with complaints that shoppers on iOS and Android cannot tap the "Pay with Credit Card" button on our mobile checkout. It just hangs with an endless loading spinner!\n\nToday is the kickoff of our Flash Summer Sale. We are losing thousands of dollars every twenty minutes this stays broken. Nobody notified us of any maintenance. Is anyone looking into this? I need this resolved IMMEDIATELY or I will have to escalate to our executive board.\n\nSarah Jenkins\nVP of E-Commerce`
    },
    instructions: [
      'Write a direct email reply to Sarah Jenkins that maintains high professional composure.',
      'Show genuine empathy and urgency without accepting premature legal liability or blaming external third parties before diagnosis.',
      'Provide clear, bulleted immediate action steps that the engineering team is executing right now.',
      'Offer a workaround or immediate containment suggestion (e.g. alternate payment gateway check, incident command bridge).',
      'Commit to a specific time for the next formal status update (e.g., within 30 minutes).'
    ],
    evaluationRubric: [
      { criterion: 'Tone & De-escalation', description: 'Empathetic, calm, respectful, and acknowledging the commercial impact on their Summer Sale.' },
      { criterion: 'Clarity & Structure', description: 'Logical email layout with immediate status, current actions, and transparent next touchpoint.' },
      { criterion: 'Professional Ownership', description: 'Takes proactive responsibility for investigation without defensive excuses or blame.' },
      { criterion: 'Expectation Management', description: 'Sets a realistic, near-term commitment for the next progress check-in.' },
    ],
    sampleSolution: `Subject: Re: URGENT: Mobile Checkout Resolution in Progress [Nordic Apparel - Ticket #8492]

Dear Sarah,

Thank you for alerting us immediately, and please accept our sincere apologies for the disruption this is causing during your Flash Summer Sale kickoff. We understand how critical every minute of this sale is for Nordic Apparel, and our highest-priority engineering incident team has been activated.

Here is what we know and the actions underway right now:
- Status: We have reproduced the mobile checkout button hang on iOS and Android devices and isolated it to a recent asset bundle load failure with the payment script.
- Active Containment: Our infrastructure lead is actively preparing a zero-downtime rollback to the stable morning build while testing the direct card gateway endpoint.
- Monitoring: Our telemetry team is tracking real-time checkout conversion funnels to verify the exact moment normal transaction volume resumes.

We will provide your next status update by 14:45 EST (in 30 minutes), or sooner if the fix is successfully deployed. If you or your team need real-time coordination, I am also available on our priority incident bridge link attached below.

Sincerely,
Aarav Patel
Associate Software Engineer | Customer Reliability Team
Incident Lead on Duty`
  }
];

export const INITIAL_SUBMISSIONS: Record<string, TaskSubmission> = {
  'debug-c-program': {
    taskId: 'debug-c-program',
    answer: `Identified 3 main bugs:\n1. malloc size uses sizeof(char) instead of sizeof(int), which causes buffer overflow on write.\n2. for loop has off-by-one error (i <= count instead of i < count), writing past allocated memory.\n3. Caller fails to call free() on the returned pointer in main, causing a memory leak.\n\nFix:\nint* extract_transaction_ids(const Transaction* list, int count) {\n    if (!list || count <= 0) return NULL;\n    int* id_buffer = (int*)malloc(count * sizeof(int));\n    if (!id_buffer) return NULL;\n    for (int i = 0; i < count; i++) {\n        id_buffer[i] = list[i].id;\n    }\n    return id_buffer;\n}`,
    submittedAt: 'Yesterday at 17:40',
    status: 'reviewed',
    demoScores: {
      technicalAccuracy: 90,
      problemSolving: 85,
      edgeCaseHandling: 78,
      communication: 88,
      overall: 85
    },
    demoFeedback: {
      strengths: [
        'Accurately identified both the `sizeof(char)` buffer overflow and off-by-one boundary violation.',
        'Properly checked for NULL pointer and memory allocation failure in the revised C function.',
        'Provided clean, readable C code adhering to standard safety practices.'
      ],
      areasForImprovement: [
        'Could further discuss memory ownership documentation in the function header comments.',
        'Mentioning `size_t` casting for array sizes is recommended for large counts in 64-bit systems.'
      ],
      mentorSummary: 'Solid demonstration of core C pointer mechanics and memory safety instincts. You demonstrated skills that 65% of entry-level applicants miss on written tests.'
    }
  }
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'technical-accuracy',
    name: 'Technical Accuracy & Code Correctness',
    description: 'Precision in syntax, pointer/memory safety, data structures, and operational correctness.',
    score: 88,
    benchmark: 72,
    status: 'Strong',
    subSkills: [
      { name: 'Memory & Heap Management (C/C++)', level: 'Proficient', score: 86 },
      { name: 'Boundary & Off-by-One Detection', level: 'Advanced', score: 92 },
      { name: 'Type Safety & Allocation Sizing', level: 'Proficient', score: 87 }
    ]
  },
  {
    id: 'problem-solving',
    name: 'Problem-Solving & Root-Cause Analysis',
    description: 'Systematic debugging, hypothesis testing, isolation of failures from noise.',
    score: 84,
    benchmark: 68,
    status: 'Strong',
    subSkills: [
      { name: 'Root-Cause vs Symptom Separation', level: 'Proficient', score: 85 },
      { name: 'Observability & Metrics Interpretation', level: 'Intermediate', score: 81 },
      { name: 'Algorithmic Optimization', level: 'Proficient', score: 86 }
    ]
  },
  {
    id: 'edge-case-handling',
    name: 'Edge-Case & Failure Handling',
    description: 'Defensive programming, handling nulls, unexpected inputs, spikes, and timeouts.',
    score: 78,
    benchmark: 64,
    status: 'Proficient',
    subSkills: [
      { name: 'Null Pointer & Empty Collection Guards', level: 'Proficient', score: 84 },
      { name: 'Resource Exhaustion & Fallbacks', level: 'Developing', score: 72 },
      { name: 'System Saturation Mitigation', level: 'Intermediate', score: 78 }
    ]
  },
  {
    id: 'communication',
    name: 'Workplace Communication & Triage',
    description: 'Stakeholder empathy, blameless technical communication, and expectation management.',
    score: 91,
    benchmark: 65,
    status: 'Strong',
    subSkills: [
      { name: 'Executive & Client De-escalation', level: 'Advanced', score: 94 },
      { name: 'Structured Incident Summaries', level: 'Proficient', score: 89 },
      { name: 'Clear Technical Documentation', level: 'Advanced', score: 90 }
    ]
  }
];

export const CONTINUE_LEARNING_ITEMS = [
  {
    id: 'learn-1',
    title: 'Zero to Valgrind: Catching C Memory Leaks in CI',
    track: 'Systems Programming',
    duration: '18 min read',
    description: 'Learn how modern tech companies automate memory debugging using Valgrind and AddressSanitizer (ASan).',
    tag: 'Recommended for Aarav'
  },
  {
    id: 'learn-2',
    title: 'The Golden Signals of Observability',
    track: 'Backend Engineering',
    duration: '22 min read',
    description: 'Google SRE guide adapted for college students: Latency, Traffic, Errors, and Saturation.',
    tag: 'Core Concept'
  },
  {
    id: 'learn-3',
    title: 'The Art of the Blameless Post-Mortem',
    track: 'Engineering Culture',
    duration: '15 min read',
    description: 'How top software teams communicate failures openly and build trust with cross-functional leaders.',
    tag: 'Career Accelerator'
  }
];
