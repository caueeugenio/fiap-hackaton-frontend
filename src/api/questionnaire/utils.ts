import { Questionnaire } from "@/types/globals";

export const mapQuestionnaire = (questionnaires: Questionnaire[]) => questionnaires.map(questionnaire => {
  return {
    id: questionnaire.id,
    title: questionnaire.title,
    content: questionnaire.content,
    questionsAmount: questionnaire.questionsAmount,
    year: questionnaire.year.label,
    grade: questionnaire.grade.label,
    subject: questionnaire.subject.label,
    author: questionnaire.author.name,
    classes: questionnaire.classes.map(cls => cls.label),
    questions: questionnaire.questions.map(q => ({
      question: q.question,
      answer: q.answer
    }))
  }
})

export const mapPendingQuestionnaires = (
  questionnaires: {
    id: number;
    title: string;
    content: string;
    questionsAmount: number;
    subject: { label: string };
    author: { name: string }
  }[]) => {
  return questionnaires.map(questionnaire => ({
    questionnaireId: questionnaire.id,
    title: questionnaire.title,
    content: questionnaire.content,
    questionsAmount: questionnaire.questionsAmount,
    subject: questionnaire.subject.label,
    author: questionnaire.author.name
  }));
};
