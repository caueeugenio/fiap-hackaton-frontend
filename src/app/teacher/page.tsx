import Header from "@/components/Header";
import QuizList from "@/components/QuizList";

export default function Home() {
  return (
    <div className="flex min-h-screen h-full bg-gray-900 pl-14">
      <div className="flex-1 flex flex-col">
        <div className="pt-6 bg-header_background">
          <Header
            isTeacher
            userName="João da Silva"
            photo="https://github.com/shadcn.png"
          />
        </div>
        <QuizList />
      </div>
    </div>
  );
}
