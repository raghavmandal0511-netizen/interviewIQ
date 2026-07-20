export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
};

export type LearningModule = {
  _id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
};

export type Topic = {
  _id: string;
  moduleId: string;
  name: string;
  slug: string;
  description?: string;
  estimatedTime?: number;
  difficulty?: "easy" | "medium" | "hard";
  order?: number;
  isPublished?: boolean;
};

export type TheoryFormula = { title?: string; content: string };
export type TheoryTip = { title?: string; tip: string };
export type TheoryExample = {
  problem: string;
  solution: string;
  steps?: string[];
};

export type Theory = {
  _id: string;
  topicId: string;
  introduction?: string;
  explanation?: string;
  formulas?: TheoryFormula[];
  shortcutTips?: TheoryTip[];
  solvedExamples?: TheoryExample[];
  references?: { title?: string; url?: string }[];
};

export type Exercise = {
  _id: string;
  topicId: string;
  title: string;
  description?: string;
  order?: number;
  isPublished?: boolean;
};

export type QuestionOption = {
  optionId: string;
  text: string;
};

export type Question = {
  _id: string;
  exerciseId: string;
  question: string;
  options: QuestionOption[];
  correctAnswer?: string | string[];
  explanation?: string;
  difficulty?: string;
  marks?: number;
  timeLimit?: number;
  tags?: string[];
  questionType?: string;
};

export type TopicProgress = {
  _id: string;
  userId: string;
  topicId: string;
  completedTheory: boolean;
  completedExercise: boolean;
  completedQuestions?: number;
  completionPercentage?: number;
  accuracy?: number;
  averageTime?: number;
  totalAttempts?: number;
  lastVisited?: string;
};
