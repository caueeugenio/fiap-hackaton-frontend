"use client";

import { useState } from "react";
import {
  Edit as EditIcon,
  BarChart2 as BarChartIcon,
  Trash2 as TrashIcon,
} from "react-feather";
import { useConfirmationModal } from "@/components/ConfirmationModal/hooks/useConfirmationModal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { debounce } from "@/lib/utils";

const quizzes = [
  {
    title: "Biologia Celular - Organelas",
    status: "10 / 35",
    year: "2020",
    grade: "5EF",
    class: "A",
    id: "1",
  },
  {
    title: "Biologia Celular - Organelas",
    status: "★ novo",
    year: "2020",
    grade: "5EF",
    class: "B",
    id: "2",
  },
  {
    title: "Biologia Celular - Organelas",
    status: "Finalizado",
    year: "2020",
    grade: "5EF",
    class: "C",
    id: "3",
  },
  {
    title: "Biologia Celular - Membrana Plasmática",
    status: "",
    year: "2020",
    grade: "5EF",
    class: "A",
    id: "4",
  },
  {
    title: "Biologia Celular - Divisão Celular",
    status: "",
    year: "2020",
    grade: "6EF",
    class: "A",
    id: "5",
  },
  {
    title: "Biologia Celular - Divisão Celular",
    status: "",
    year: "2020",
    grade: "6EF",
    class: "B",
    id: "6",
  },
  {
    title: "Biologia Celular - Citoplasma",
    status: "",
    year: "2020",
    grade: "6EF",
    class: "A",
    id: "7",
  },
];
const yearsList = [
  { label: 2025, value: 2025 },
  { label: 2024, value: 2024 },
  { label: 2023, value: 2023 },
  { label: 2022, value: 2022 },
  { label: 2021, value: 2021 },
  { label: 2020, value: 2020 },
];
const gradesList = [
  { label: "1ª Série", value: "1EF" },
  { label: "2ª Série", value: "2EF" },
  { label: "3ª Série", value: "3EF" },
  { label: "4ª Série", value: "4EF" },
  { label: "5ª Série", value: "5EF" },
  { label: "6ª Série", value: "6EF" },
  { label: "7ª Série", value: "7EF" },
  { label: "8ª Série", value: "8EF" },
  { label: "1ª Ano", value: "1EM" },
  { label: "2ª Ano", value: "2EM" },
  { label: "3ª Ano", value: "3EM" },
];
const classesList = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
  { label: "G", value: "G" },
  { label: "H", value: "H" },
];

const QuizList = () => {
  const [quizList, setQuizList] = useState(quizzes);
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [class_, setClass] = useState("");

  const handleFilter = ({
    fyear,
    fgrade,
    fclass,
    fsearchTerm,
  }: {
    fyear?: string;
    fgrade?: string;
    fclass?: string;
    fsearchTerm?: string;
  }) => {
    setQuizList(quizzes);

    if (fsearchTerm ?? searchTerm) {
      setQuizList((prev) =>
        prev.filter((item) => item.title.includes(fsearchTerm ?? searchTerm))
      );
    }
    if (fyear ?? year) {
      setQuizList((prev) =>
        prev.filter((item) => item.year === (fyear ?? year))
      );
    }
    if (fgrade ?? grade) {
      setQuizList((prev) =>
        prev.filter((item) => item.grade === (fgrade ?? grade))
      );
    }
    if (fclass ?? class_) {
      setQuizList((prev) =>
        prev.filter((item) => item.class == (fclass ?? class_))
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
    const name = e.currentTarget.name as "year" | "grade" | "class";

    const setParam =
      name === "year" ? setYear : name === "grade" ? setGrade : setClass;

    setParam(value);
    const fname = `f${[name]}`;
    handleFilter({ [fname]: value }), 0;
  };

  const handleDeleteItem = async (id: string) => {
    setQuizList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCleanFilter = () => {
    setSearchTerm("");
    setYear("");
    setGrade("");
    setClass("");
    setQuizList(quizzes);
  };

  const { isModalOpen, handleCloseModal, handleConfirm, handleOpenModal } =
    useConfirmationModal(handleDeleteItem);

  return (
    <div className="mx-auto py-6 px-12 w-full max-w-screen-2xl">
      <div className="flex flex-col gap-4 my-4">
        <div className="flex justify-between">
          <h2 className="text-white text-lg font-bold mb-4">QUESTIONÁRIOS</h2>
          <a
            className="bg-orange-600 text-white px-4 py-2 rounded"
            href="/new-questionnaire"
          >
            Novo
          </a>
        </div>
        <input
          type="text"
          placeholder="Pesquisar quizz"
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
          >
            <option value="">Selecione o ano</option>
            {yearsList.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            name="grade"
            className="input"
            onChange={handleSelect}
            value={grade}
          >
            <option value="">Selecione a série</option>
            {gradesList.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            name="class"
            className="input"
            onChange={handleSelect}
            value={class_}
          >
            <option value="">Selecione a turma</option>
            {classesList.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button
            className="bg-red-800 text-white px-4 py-2 rounded"
            onClick={() => handleFilter({})}
          >
            Filtrar
          </button>
          <button
            className="bg-red-800 text-white px-4 py-2 rounded"
            onClick={handleCleanFilter}
          >
            Limpar
          </button>
        </div>
      </div>

      {quizList.length === 0 ? (
        <div className="flex flex-col mx-auto py-6 px-12 w-full h-full text-white">
          <div
            className={`mx-auto ${
              quizzes.length === 0 ? "my-auto" : "mt-auto"
            }`}
          >
            Nenhum questionário encontrado. Tente novamente.
          </div>
          {quizzes.length > 0 && (
            <button
              className="mx-auto mb-auto bg-red-800 text-white px-4 py-2 rounded mt-4"
              onClick={handleCleanFilter}
            >
              Limpar o filtro
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {quizList.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-red-800 p-4 rounded flex justify-between items-center"
            >
              <span className="text-white">{quiz.title}</span>
              <div className="flex gap-2">
                {quiz.status && (
                  <span className="text-gray-300 text-sm">{quiz.status}</span>
                )}
                <a
                  className="text-white"
                  href={`/new-questionnaire?id=${quiz.id}`}
                >
                  <EditIcon />
                </a>
                <a
                  className="text-white"
                  href={`/questionnaire-overview?id=${quiz.id}`}
                >
                  <BarChartIcon />
                </a>
                <button
                  className="text-white"
                  onClick={handleOpenModal(quiz.id)}
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
        title="Excluir quiz"
        actionName="Excluir"
      />
    </div>
  );
};

export default QuizList;
