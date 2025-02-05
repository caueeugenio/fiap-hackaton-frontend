import { Category } from "@/types/globals";

export interface Author {
  name: string;
}

export interface Questionnaire {
  title: string;
  year: Category;
  subject: Category;
  author: Author;
  questionsAmount: number;
}

export interface StudentQuestionnaire {
  userId: number;
  questionnaireId: number;
  score: string;
  date: string;
  questionnaire: Questionnaire;
}