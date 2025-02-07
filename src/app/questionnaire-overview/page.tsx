"use client";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getAnswerCountsByQuestionnaire } from "@/api/answer";
import { useSearchParams } from "next/navigation";
import { AnswersCount, Question } from "./type";
import { getQuestionnaireById } from "@/api/questionnaire";

export default function QuizDashboard() {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalStudents: 0,
    avgScore: 0,
    highAccuracy: [0],
    lowAccuracy: [0],
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const loadQuestions = useCallback(async () => {
    const response = await getAnswerCountsByQuestionnaire(Number(id));
    const corrects: number[] = [];

    if (response.success && response.value.length > 0) {
      setQuestions(
        response.value.map((q: AnswersCount, index: number) => {
          const total = Number(q.true_count) + Number(q.false_count);

          corrects.push(
            q.correct_answer === true
              ? Number(q.true_count)
              : Number(q.false_count)
          );

          const percentage = Math.round(
            (q.correct_answer === true
              ? Number(q.true_count) / total
              : Number(q.false_count) / total) * 100
          );

          return {
            number: index + 1,
            question: q.question_text,
            percentage,
          };
        })
      );

      const totalQuestions = response.value.length;
      const totalStudents =
        Number(response.value[0].true_count) +
        Number(response.value[0].false_count);

      const maxValue = Math.max(...corrects);
      const minValue = Math.min(...corrects);

      const highAccuracy = corrects
        .map((num, index) => (num === maxValue ? index + 1 : -1))
        .filter((index) => index !== -1);

      const lowAccuracy = corrects
        .map((num, index) => (num === minValue ? index + 1 : -1))
        .filter((index) => index !== -1);

      setStats({
        totalQuestions,
        totalStudents,
        avgScore: corrects.reduce((acc, curr) => acc + curr, 0) / totalStudents,
        highAccuracy,
        lowAccuracy,
      });
    }
  }, [id]);

  const loadQuestionnaire = useCallback(async () => {
    const response = await getQuestionnaireById(Number(id));

    if (response.success) {
      setTitle(response.value.title);
    }
  }, [id]);

  const loadData = useCallback(async () => {
    await loadQuestionnaire();
    await loadQuestions();
  }, [loadQuestionnaire, loadQuestions]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id, loadData]);

  return (
    <div className="flex w-full min-h-screen bg-gray-900 text-white p-6 pl-20">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-center mb-12">{title}</h1>
        {questions.length === 0 ? (
          <div className="flex text-white m-auto w-full justify-center">
            Ainda não há respostas para este questionário
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {questions.map((q) => (
              <Card key={q.number} className="bg-white p-4">
                <CardContent>
                  <p className="text-center font-medium">Questão {q.number}</p>
                  <p className="text-gray-500 text-center text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    {q.question}
                  </p>
                  <Progress value={q.percentage} className="mt-6" />
                  <p className="text-center text-sm mt-1">
                    acertos {q.percentage}%
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <aside className="flex flex-col gap-8 w-80 bg-gray-800 p-6 rounded-lg ml-6">
        <p>
          <strong>Número de alunos que realizaram o quiz:</strong>{" "}
          {stats.totalStudents}
        </p>
        <p>
          <strong>Número de questões:</strong> {stats.totalQuestions}
        </p>
        <p>
          <strong>Média de acertos:</strong> {stats.avgScore} /{" "}
          {stats.totalQuestions}
        </p>
        <p>
          <strong>Questões com maior número de acertos:</strong>{" "}
          {stats.highAccuracy.join(", ")}
        </p>
        <p>
          <strong>Questões com menor número de acertos:</strong>{" "}
          {stats.lowAccuracy.join(", ")}
        </p>
        <div className="flex flex-col mt-8 gap-4">
          <a
            href={`/questionnaire/${id}`}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded text-center"
          >
            Ver quiz
          </a>
          {/* <a
            href={"#"}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded text-center"
          >
            Desempenho por aluno
          </a> */}
        </div>
      </aside>
    </div>
  );
}
