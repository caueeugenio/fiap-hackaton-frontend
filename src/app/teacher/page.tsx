import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import QuizList from "@/components/QuizList";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1 flex flex-col">
        <Header
          userName="João da Silva"
          className="Professor"
          grade="Biologia"
          photo="https://github.com/shadcn.png"
        />
        <QuizList />
      </div>
    </div>
  );
}
