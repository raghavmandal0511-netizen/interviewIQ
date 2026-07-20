export type TestDifficulty = "easy" | "medium" | "hard";

export type TestCategory = {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
};

export type TestListItem = {
  _id: string;
  title: string;
  description: string;
  category: TestCategory;
  duration: number;
  totalQuestions: number;
  passingMarks: number;
  difficulty: TestDifficulty;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type QuestionOption = {
  optionId: string;
  text: string;
};

export type TestQuestion = {
  _id: string;
  question: string;
  options: QuestionOption[];
  explanation?: string;
  difficulty: TestDifficulty;
  marks: number;
  negativeMarks: number;
  timeLimit: number;
  questionType: "MCQ" | "TRUE_FALSE" | "MULTIPLE_CORRECT";
};

export type TestDetail = TestListItem & {
  questions: Array<{
    _id: string;
    order: number;
    marks: number;
    questionId: string;
    question: TestQuestion | null;
  }>;
};

export type UserAttempt = {
  _id: string;
  userId: string;
  testId: string;
  startedAt: string;
  endedAt?: string;
  score: number;
  percentage: number;
  accuracy: number;
  totalCorrect: number;
  totalWrong: number;
  unanswered: number;
  status: "STARTED" | "COMPLETED" | "EXPIRED";
  createdAt: string;
  updatedAt: string;
};

export type AttemptTimer = {
  startedAt: string;
  expiresAt: string;
  remainingSeconds: number;
  isExpired: boolean;
};

export type AttemptQuestion = {
  order: number;
  marks: number;
  questionId: string;
  question: TestQuestion;
  selectedOption: string | string[] | null;
  timeTaken: number;
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

export type AttemptQuestionReview = AttemptQuestion & {
  isCorrect: boolean;
  correctAnswer: string | string[];
  explanation: string;
};

export type AttemptSession = {
  attempt: UserAttempt;
  test: {
    _id: string;
    title: string;
    description: string;
    duration: number;
    totalQuestions: number;
    passingMarks: number;
    difficulty: TestDifficulty;
  };
  timer: AttemptTimer;
  questions: AttemptQuestion[];
};

export type ResumeAttemptResponse =
  | {
      autoSubmitted: false;
      attempt: UserAttempt;
      test: AttemptSession["test"];
      timer: AttemptTimer;
      questions: AttemptQuestion[];
    }
  | {
      autoSubmitted: true;
      attempt: UserAttempt;
      results: AttemptResults;
      questions: AttemptQuestionReview[];
    };

export type AttemptResult = {
  attempt: UserAttempt;
  test: { _id: string; title: string; passingMarks: number };
  results: AttemptResults;
  questions: AttemptQuestionReview[];
};
