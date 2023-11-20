export enum QuizMode {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export const TimeByMode: Record<QuizMode, number> = {
  [QuizMode.Easy]: 60,
  [QuizMode.Medium]: 30,
  [QuizMode.Hard]: 12,
};

export interface Quiz {
  questions: Question[];
  mode: QuizMode;
}

export interface Question {
  id: string;
  mode: QuizMode;
  question: string;
  variants: string[];
  answer: string;
}

export interface QuizResult {
  date: string;
  result: number;
  time: number;
}

export interface QuizState {
  quiz: Quiz;
  quizResults: QuizResult[];
  quizLastResult: QuizResult;
}