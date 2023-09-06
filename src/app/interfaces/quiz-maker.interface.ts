export interface CategoryResponse {
  trivia_categories: CategoryOption[];
}

export interface CategoryOption {
  id: number;
  name: string;
}

export enum QuizDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface QuestionsResponse {
  response_code: number;
  results: Question[];
}

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  mixed_answers?: string[];
}

export interface AnswersForm {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}
