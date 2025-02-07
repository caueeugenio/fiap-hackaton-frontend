export type Result<T> = 
  | { success: true; value: T }
  | { success: false; error: string };

export type Role = 'student' | 'teacher' | 'admin';

export type Category = {
  id: string;
  label: string;
};

export type User = {
  id: number;
  name: string;
  role: string;
  email: string;
};

export type Question = {
  id: number;
  question: string;
  answer: boolean;
};

export type QuestionnaireBase = {
  id: number; 
  title: string;
  year: Category;
  grade: Category;
  classes: Category[];
  questionsAmount: number;
  subject: Category;
};

export interface Questionnaire extends QuestionnaireBase {
  content: string;
  author: User;
  questions: Question[];
};
