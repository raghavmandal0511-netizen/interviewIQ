export type DashboardData = {
  welcome: {
    greeting: string;
    userName: string;
    profilePicture?: string;
    message: string;
  };
  dailyStreak: {
    currentStreak: number;
    longestStreak: number;
    todayCompleted: boolean;
  };
  overallProgress: {
    totalTopics: number;
    completedTopics: number;
    completionPercentage: number;
  };
  learningProgress: Array<{
    moduleName: string;
    completed: number;
    total: number;
    percentage: number;
  }>;
  continueLearning: {
    topicId: string;
    topicName: string;
    moduleName: string;
    categoryName: string;
    lastVisited?: string;
  } | null;
  recentActivity: Array<{
    type: string;
    title: string;
    timestamp: string;
    meta?: Record<string, unknown>;
  }>;
  quickActions: Array<{
    title: string;
    icon: string;
    route: string;
  }>;
  weakTopics: Array<{
    topicId: string;
    topicName: string;
    accuracy: number;
    completionPercentage: number;
    totalAttempts: number;
  }>;
  strongTopics: Array<{
    topicId: string;
    topicName: string;
    accuracy: number;
    completionPercentage: number;
    totalAttempts: number;
  }>;
  testStatistics: {
    testsAttempted: number;
    testsCompleted: number;
    averageScore: number;
    highestScore: number;
    averageAccuracy: number;
  };
  hrStatistics: {
    questionsAnswered: number;
    latestAnswerDate?: string;
  };
  recommendations: Array<{
    topicId: string;
    topicName: string;
    reason: string;
    accuracy?: number;
  }>;
  dashboardSummary: {
    questionsSolved: number;
    theoryCompleted: number;
    exercisesCompleted: number;
    testsTaken: number;
    hoursPracticed: number;
  };
};

export type OnlineTest = {
  _id: string;
  title: string;
  category: string;
  duration: number;
  passingMarks: number;
  description?: string;
  totalQuestions?: number;
  difficulty?: string;
  isPublished?: boolean;
};

export type AttemptQuestion = {
  questionId: string;
  order: number;
  marks?: number;
  question: string;
  options: Array<{ optionId: string; text: string }>;
  selectedOption?: string | null;
  timeLimit?: number;
};

export type AttemptSession = {
  attempt: {
    _id: string;
    testId: string | OnlineTest;
    status: "STARTED" | "COMPLETED" | "EXPIRED";
    score?: number;
    startedAt?: string;
  };
  test: OnlineTest;
  timer: {
    startedAt: string;
    expiresAt: string;
    remainingSeconds: number;
    isExpired: boolean;
  };
  questions: AttemptQuestion[];
  autoSubmitted?: boolean;
  results?: AttemptResults;
};

export type AttemptResults = {
  score: number;
  percentage: number;
  accuracy: number;
  totalCorrect: number;
  totalWrong: number;
  unanswered: number;
  totalTimeTaken: number;
  totalPossibleMarks: number;
  passed: boolean;
};

export type HrCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  isPublished?: boolean;
};

export type HrQuestion = {
  _id: string;
  categoryId: string | HrCategory;
  question: string;
  sampleAnswer?: string;
  keyPoints?: string[];
  commonMistakes?: string[];
  interviewerTips?: string[];
  isPublished?: boolean;
};
