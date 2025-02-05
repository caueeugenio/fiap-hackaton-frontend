export const mapQuestionnaireAnswers = (responses: {
  answer: boolean;
  question: {
    id: number;
    question: string;
    answer: boolean
  };
  user: {
    id: number;
    name: string
  } }[]) => {
  return responses.map(response => ({
    userId: response.user.id,
    userAnswer: response.answer,
    questionId: response.question.id,
    correctAnswer: response.question.answer
  }));
};