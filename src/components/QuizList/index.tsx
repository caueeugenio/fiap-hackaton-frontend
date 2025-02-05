"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Edit as EditIcon,
  BarChart2 as BarChartIcon,
  Trash2 as TrashIcon,
} from "react-feather";
import { useConfirmationModal } from "@/components/ConfirmationModal/hooks/useConfirmationModal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { debounce } from "@/lib/utils";
import { getClasses, getGrades, getSubjects, getYears } from "@/api/category";
import { Category, QuestionnaireBase } from "@/types/globals";
import {
  deleteQuestionnaire,
  getQuestionnairesByTeacher,
} from "@/api/questionnaire";
import { useUserContext } from "@/context/userContext";
import { getTeacher } from "@/api/user";

const QuestionnaireList = () => {
  const [isLoading, setLoading] = useState(false);
  const [questionnaireList, setQuestionnaireList] = useState<
    QuestionnaireBase[]
  >([]);
  const [questionnaireFiltered, setQuestionnaireFiltered] = useState<
    QuestionnaireBase[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [class_, setClass] = useState("");
  const [subject, setSubject] = useState("");
  const [filtersLists, setFiltersLists] = useState<{ [x: string]: Category[] }>(
    {
      years: [],
      grades: [],
      classes: [],
      subjects: [],
    }
  );

  const { user } = useUserContext();

  const loadFilters = useCallback(async () => {
    setLoading(true);
    const yearsResp = await getYears();
    const gradesResp = await getGrades();
    const classesResp = await getClasses();
    const subjectsResp = await getSubjects();
    const teacher = await getTeacher(user.id);

    if (yearsResp.success) {
      setFiltersLists((prev) => ({ ...prev, years: yearsResp.value }));
    }

    if (gradesResp.success) {
      setFiltersLists((prev) => ({ ...prev, grades: gradesResp.value }));
    }

    if (classesResp.success) {
      setFiltersLists((prev) => ({ ...prev, classes: classesResp.value }));
    }

    if (subjectsResp.success && teacher.success) {
      const teacherSubjects = teacher.value.teacherSubjects.map(
        ({ subjectId }: { subjectId: string }) => ({
          id: subjectId,
          label: subjectsResp.value.find(({ id }) => id === subjectId)?.label,
        })
      );
      setFiltersLists((prev) => ({ ...prev, subjects: teacherSubjects }));
    } else if (subjectsResp.success) {
      setFiltersLists((prev) => ({ ...prev, subjects: subjectsResp.value }));
    }

    setLoading(false);
  }, [user.id]);

  const loadQuestionnaires = useCallback(async () => {
    setLoading(true);
    const questionnairesResp = await getQuestionnairesByTeacher(user.id);

    console.log(questionnairesResp);
    if (questionnairesResp.success) {
      setQuestionnaireList(questionnairesResp.value);
      setQuestionnaireFiltered(questionnairesResp.value);
    }

    setLoading(false);

    if (!filtersLists?.year?.length) {
      loadFilters();
    }
  }, [filtersLists?.year?.length, loadFilters, user.id]);

  useEffect(() => {
    if (user.id) loadQuestionnaires();
  }, [loadQuestionnaires, user.id]);

  const handleFilter = ({
    fyear,
    fgrade,
    fclass,
    fsubject,
    fsearchTerm,
  }: {
    fyear?: string;
    fgrade?: string;
    fclass?: string;
    fsubject?: string;
    fsearchTerm?: string;
  }) => {
    setQuestionnaireFiltered(questionnaireList);

    if (fsearchTerm ?? searchTerm) {
      setQuestionnaireFiltered((prev) =>
        prev.filter((item) => item.title.includes(fsearchTerm ?? searchTerm))
      );
    }
    if (fyear ?? year) {
      setQuestionnaireFiltered((prev) =>
        prev.filter((item) => item.year.id === (fyear ?? year))
      );
    }
    if (fgrade ?? grade) {
      setQuestionnaireFiltered((prev) =>
        prev.filter((item) => item.grade.id === (fgrade ?? grade))
      );
    }
    if (fsubject ?? subject) {
      setQuestionnaireFiltered((prev) =>
        prev.filter((item) => item.subject.id === (fsubject ?? subject))
      );
    }
    if (fclass ?? class_) {
      setQuestionnaireFiltered((prev) =>
        prev.filter((item) =>
          item.classes.map(({ id }) => id).includes(fclass ?? class_)
        )
      );
    }
  };

  const handleSearchBar: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    debounce(() => {
      handleFilter({ fsearchTerm: value });
    }, 600)();
  };

  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name as "year" | "grade" | "class" | "subject";

    const setParam =
      name === "year"
        ? setYear
        : name === "grade"
        ? setGrade
        : name === "subject"
        ? setSubject
        : setClass;

    setParam(value);
    const fname = `f${[name]}`;

    handleFilter({ [fname]: value });
  };

  const handleDeleteItem = async (id: string) => {
    const response = await deleteQuestionnaire(Number(id));
    if (response.success) {
      await loadQuestionnaires();
    } else {
      console.error("Error deleting questionnaire:", response.error);
    }
  };

  const handleCleanFilter = () => {
    setSearchTerm("");
    setYear("");
    setGrade("");
    setClass("");
    setSubject("");
    setQuestionnaireFiltered(questionnaireList);
  };

  const { isModalOpen, handleCloseModal, handleConfirm, handleOpenModal } =
    useConfirmationModal(handleDeleteItem);

  return (
    <div className="mx-auto py-6 px-12 w-full max-w-screen-2xl">
      <div className="flex flex-col gap-4 my-4">
        <div className="flex justify-between">
          <h2 className="text-white text-lg font-bold mb-4">QUESTIONÁRIOS</h2>
          <a
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
            href="/new-questionnaire"
          >
            Novo
          </a>
        </div>
        <input
          type="text"
          placeholder="Pesquisar questionário"
          className="input"
          value={searchTerm}
          onChange={handleSearchBar}
        />
        <div className="flex gap-3 mb-4">
          <select
            name="year"
            className="input"
            onChange={handleSelect}
            value={year}
            disabled={isLoading}
          >
            <option value="">Selecione o ano</option>
            {filtersLists.years.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <select
            name="grade"
            className="input"
            onChange={handleSelect}
            value={grade}
            disabled={isLoading}
          >
            <option value="">Selecione a série</option>
            {filtersLists.grades.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <select
            name="class"
            className="input"
            onChange={handleSelect}
            value={class_}
            disabled={isLoading}
          >
            <option value="">Selecione a turma</option>
            {filtersLists.classes.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <select
            name="subject"
            className="input"
            onChange={handleSelect}
            value={subject}
            disabled={isLoading}
          >
            <option value="">Selecione a matéria</option>
            {filtersLists.subjects.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <button
            className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded"
            onClick={() => handleFilter({})}
          >
            Filtrar
          </button>
          <button
            className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded"
            onClick={handleCleanFilter}
          >
            Limpar
          </button>
        </div>
      </div>

      {questionnaireFiltered.length === 0 ? (
        <div className="flex flex-col mx-auto py-6 px-12 w-full h-full text-white">
          <div
            className={`mx-auto ${
              questionnaireFiltered.length === 0 ? "my-auto" : "mt-auto"
            }`}
          >
            Nenhum questionário encontrado. Tente novamente.
          </div>
          {questionnaireFiltered.length > 0 && (
            <button
              className="mx-auto mb-auto bg-red-800 hover:bg-red-950 text-white px-4 py-2 rounded mt-4 "
              onClick={handleCleanFilter}
            >
              Limpar o filtro
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {questionnaireFiltered.map((questionnaire) => (
            <div
              key={questionnaire.id}
              className="bg-red-800 p-4 rounded flex justify-between items-center"
            >
              <span className="text-white">{questionnaire.title}</span>
              <div className="flex gap-2">
                <span className="text-gray-300 text-sm mr-2">
                  {questionnaire.questionsAmount} questões
                </span>
                <a
                  className="text-white hover:text-red-950"
                  href={`/new-questionnaire?id=${questionnaire.id}`}
                >
                  <EditIcon />
                </a>
                <a
                  className="text-white hover:text-red-950"
                  href={`/questionnaire-overview?id=${questionnaire.id}`}
                >
                  <BarChartIcon />
                </a>
                <button
                  className="text-white hover:text-red-950"
                  onClick={handleOpenModal(String(questionnaire.id))}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="Excluir Questionnaire"
        actionName="Excluir"
      />
    </div>
  );
};

export default QuestionnaireList;
