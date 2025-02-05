export type Year = {
  id: string;
  label: string;
};

export type Grade = {
  id: string;
  label: string;
};

export type Subject = {
  id: string;
  label: string;
};

export type User = {
  id: number;
  name: string;
  role: string;
  email: string;
};

export type Class = {
  id: string;
  label: string;
};

export type Question = {
  id: number;
  question: string;
  answer: boolean;
};

export type Questionnaire = {
  id: number;
  title: string;
  content: string;
  questionsAmount: number;
  year: Year;
  grade: Grade;
  subject: Subject;
  author: User;
  classes: Class[];
  questions: Question[];
};
