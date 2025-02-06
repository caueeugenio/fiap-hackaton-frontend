import { Category, User } from "@/types/globals";

export interface Student extends User {
  gradeId: string;
  gradeLabel: string;
  classId: string;
  classLabel: string;
  yearId: string;
}

export interface SubjectScore {
  subjectId: string;
  subjectName: string;
  avgScore: number;
}

export interface Subject {
  label: string;
}

export interface Author {
  name: string;
}

export interface PendingQuestionnaire {
  questionnaireId: number;
  title: string;
  content: string;
  questionsAmount: number;
  subject: string;
  author: string;
}

export interface FinishedQuestionnaire {
  userId: number;
  questionnaireId: number;
  score: string;
  date: string;
  questionnaire: {
    title: string;
    questionsAmount: number;
    year: Category;
    subject: Subject;
    author: Author;
  };
}
