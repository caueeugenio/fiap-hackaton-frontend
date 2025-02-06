"use client";

import { getQuestionnairesByStudent } from "@/api/questionnaire";
import QuizCard from "@/components/QuizCard/page";
import { useUserContext } from "@/context/userContext";
import { useCallback, useEffect, useState } from "react";
import { StudentQuestionnaire } from "./types";

export default function MyQuizzesPage() {
  const [questionnaires, setQuestionnaires] = useState<StudentQuestionnaire[]>(
    []
  );

  const { user } = useUserContext();

  const loadQuestionnaires = useCallback(async () => {
    const response = await getQuestionnairesByStudent(user.id);
    if (response.success) {
      setQuestionnaires(response.value as StudentQuestionnaire[]);
    }
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      loadQuestionnaires();
    }
  }, [loadQuestionnaires, user.id]);

  return (
    <div className="bg-tertiary_background flex items-center justify-center min-h-screen pl-14">
      <div className="flex flex-col items-center max-w-screen-2xl px-16">
        <h1 className="text-white text-4xl mb-auto font-bold pb-4">
          Meus Quizzes
        </h1>
        <div className="flex gap-4 flex-wrap w-full">
          {questionnaires.length === 0 ? (
            <div className="text-white m-auto">
              Nenhum questionário realizado
            </div>
          ) : (
            questionnaires.map((q) => (
              <QuizCard
                key={q.questionnaireId}
                title={q.questionnaire.title}
                rate={q.score}
                description={`${q.questionnaire.questionsAmount} questões`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
