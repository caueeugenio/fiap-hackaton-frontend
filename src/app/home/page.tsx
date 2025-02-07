"use client";
import CardComponent from "@/components/Card";
import Header from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { useCallback, useEffect, useState } from "react";
import QuizCard from "@/components/QuizCard/page";
import { Roboto } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import {
  getPendingQuestionnairesByStudent,
  getQuestionnairesByStudent,
  getStudentScoresGroupedBySubject,
} from "@/api/questionnaire";
import { getStudent } from "@/api/user";
import {
  FinishedQuestionnaire,
  PendingQuestionnaire,
  Student,
  SubjectScore,
} from "./types";
import { getClasses, getGrades, getSubjects } from "@/api/category";
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const { user } = useUserContext();

  const [student, setStudent] = useState<Student>({
    ...user,
    gradeId: "",
    gradeLabel: "",
    classId: "",
    classLabel: "",
    yearId: "",
  });
  const [studentScores, setStudentScores] = useState<SubjectScore[]>([]);
  const [finishedQuestionnaires, setFinishedQuestionnaires] = useState<
    FinishedQuestionnaire[]
  >([]);
  const [pendingQuestionnaires, setPendingQuestionnaires] = useState<
    PendingQuestionnaire[]
  >([]);

  const loadLabels = useCallback(async () => {
    const classesResponse = await getClasses();
    if (classesResponse.success) {
      const studentClassLabel =
        classesResponse.value.find((c) => c.id === student.classId)?.label ||
        "";
      setStudent((prev) => ({ ...prev, classLabel: studentClassLabel }));
    }

    const gradesResponse = await getGrades();
    if (gradesResponse.success) {
      const studentGradeLabel =
        gradesResponse.value.find((g) => g.id === student.gradeId)?.label || "";
      setStudent((prev) => ({ ...prev, gradeLabel: studentGradeLabel }));
    }
  }, [student.classId, student.gradeId]);

  const loadStudent = useCallback(async () => {
    const response = await getStudent(user.id);
    if (response.success) {
      setStudent(response.value.student);
      loadLabels();
    }
  }, [loadLabels, user.id]);

  const loadStudentScores = useCallback(async () => {
    const subjectsResponse = await getSubjects();
    const scoresResponse = await getStudentScoresGroupedBySubject(user.id);

    if (subjectsResponse.success && scoresResponse.success) {
      const subjects = subjectsResponse.value;

      setStudentScores(
        subjects.map((subject) => {
          const avgScore =
            scoresResponse.value?.find(
              (sub: { subjectid: string }) => sub.subjectid === subject.id
            )?.totalscore || "0.0";

          return {
            subjectId: subject.id,
            subjectName: subject.label,
            avgScore: Number(avgScore),
          };
        })
      );
    }
  }, [user.id]);

  const loadFinishedQuestionnaires = useCallback(async () => {
    const response = await getQuestionnairesByStudent(user.id);
    if (response.success) {
      const lastQuestionnaires = response.value.sort(
        (a: FinishedQuestionnaire, b: FinishedQuestionnaire) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setFinishedQuestionnaires(lastQuestionnaires);
    }
  }, [user.id]);

  const loadPendingQuestionnaires = useCallback(async () => {
    const response = await getPendingQuestionnairesByStudent(
      user.id,
      student.yearId,
      student.gradeId,
      student.classId
    );
    if (response.success) {
      setPendingQuestionnaires(response.value as PendingQuestionnaire[]);
    }
  }, [student.classId, student.gradeId, student.yearId, user.id]);

  const loadData = useCallback(async () => {
    if (user.id) {
      await loadStudent();
      loadStudentScores();
      loadFinishedQuestionnaires();
      loadPendingQuestionnaires();
    }
  }, [
    loadPendingQuestionnaires,
    loadStudent,
    loadFinishedQuestionnaires,
    loadStudentScores,
    user.id,
  ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const router = useRouter();
  return (
    <main className="sm:ml-14 h-screen">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  h-full">
        <div className="p-6 sm:p-6 shadow-md bg-header_background flex justify-center items-center">
          <Header
            userName={user?.name || ""}
            className={student.classLabel}
            grade={student.gradeLabel}
            photo="https://github.com/shadcn.png"
            isTeacher={false}
          />
        </div>
        <div className="p-6 shadow-md bg-quaternary_background">
          <h2
            className={`${roboto.className} text-white text-[30px] font-bold mb-2 text-center pb-6 mt-4`}
          >
            Últimos questionários
          </h2>
          <div className="flex justify-center flex-col w-full max-w-xl gap-6 m-auto">
            <div className="flex flex-col mb-auto gap-4">
              {finishedQuestionnaires.length === 0 ? (
                <div className="text-white m-auto">
                  Nenhum questionário realizado
                </div>
              ) : (
                finishedQuestionnaires.map(
                  ({ score, questionnaire }, index) => (
                    <QuizCard
                      key={index}
                      title={questionnaire.title}
                      rate={score}
                      description={` ${questionnaire.questionsAmount} questões`}
                    />
                  )
                )
              )}
            </div>
            <Button
              onClick={() => router.push("/my-quizzes")}
              className={`${roboto.className} text-[18px] col-span-2 p-6 w-full mt-7 bg-button_primary`}
              type="submit"
              disabled={finishedQuestionnaires.length === 0}
            >
              Ver todos
            </Button>
          </div>
        </div>
        <div className="bg-background p-6 shadow-md flex flex-col items-center">
          <h2
            className={`${roboto.className} text-[30px] text-white font-bold mb-4 text-center mt-4`}
          >
            Desempenho por disciplina
          </h2>
          <div className="flex justify-center flex-col pt-8 pb-6 w-full max-w-xl">
            {studentScores.map((subject, index) => (
              <div key={index} className="flex items-center gap-4">
                <p className="text-gray-400 text-lg w-[150px] text-right">
                  {subject.subjectName}
                </p>
                <ProgressBar
                  targetProgress={Math.round(Number(subject.avgScore) * 10)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" p-6 shadow-md bg-tertiary_background overflow-y-auto">
          <h2
            className={`${roboto.className}  mt-4 text-[30px] text-white text-center pb-4 font-bold mb-2 text-center'`}
          >
            Pendências
          </h2>
          <div className="flex flex-col max-w-xl w-full m-auto gap-3 ">
            {pendingQuestionnaires.length === 0 ? (
              <div className="text-white m-auto">
                Nenhum questionário pendente
              </div>
            ) : (
              pendingQuestionnaires.map((task) => (
                <div
                  key={task.questionnaireId}
                  className="flex justify-center items-center"
                >
                  <CardComponent
                    title={task.title}
                    description={task.title}
                    customHeight="50px"
                  />
                  <a
                    className="bg-primary_background hover:bg-orange-700 text-white p-3 rounded ml-4 text-center"
                    href={`/questionnaire/id=${task.questionnaireId}`}
                  >
                    Iniciar Questionário
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
