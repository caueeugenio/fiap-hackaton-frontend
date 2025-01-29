import {
  Edit as EditIcon,
  BarChart2 as BarChartIcon,
  Trash2 as TrashIcon,
} from "react-feather";

const quizzes = [
  { title: "Biologia Celular - Organelas", status: "10 / 35" },
  { title: "Biologia Celular - Organelas", status: "★ novo" },
  { title: "Biologia Celular - Organelas", status: "Finalizado" },
  { title: "Biologia Celular - Membrana Plasmática", status: "" },
  { title: "Biologia Celular - Divisão Celular", status: "" },
  { title: "Biologia Celular - Divisão Celular", status: "" },
  { title: "Biologia Celular - Citoplasma", status: "" },
];

const QuizList = () => {
  return (
    <div className="mx-auto p-6 w-full max-w-screen-2xl">
      <div className="flex flex-col gap-4 my-4">
        <div className="flex justify-between">
          <h2 className="text-white text-lg font-bold mb-4">QUESTIONÁRIOS</h2>
          <button className="bg-orange-600 text-white px-4 py-2 rounded">
            Novo
          </button>
        </div>
        <input type="text" placeholder="Pesquisar quizz" className="input" />
        <div className="flex gap-2 mb-4">
          <select className="input">
            <option value="">Selecione o ano</option>
          </select>
          <select className="input">
            <option value="">Selecione a série</option>
          </select>
          <select className="input">
            <option value="">Selecione a turma</option>
          </select>
          <button className="bg-red-800 text-white px-4 py-2 rounded">
            Filtrar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="bg-red-800 p-4 rounded flex justify-between items-center"
          >
            <span className="text-white">{quiz.title}</span>
            <div className="flex gap-2">
              {quiz.status && (
                <span className="text-gray-300 text-sm">{quiz.status}</span>
              )}
              <button className="text-white">
                <EditIcon />
              </button>
              <button className="text-white">
                <BarChartIcon />
              </button>
              <button className="text-white">
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
