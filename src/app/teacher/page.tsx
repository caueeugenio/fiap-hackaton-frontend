"use client";

import Header from "@/components/Header";
import QuizList from "@/components/QuizList";
import { useUserContext } from "@/context/userContext";

export default function Home() {
  const { user } = useUserContext();

  return (
    <div className="flex min-h-screen h-full bg-gray-900 pl-14">
      <div className="flex-1 flex flex-col">
        <div className="pt-6 bg-header_background">
          <Header
            isTeacher
            userName={user.name}
            photo="https://github.com/shadcn.png"
          />
        </div>
        <QuizList />
      </div>
    </div>
  );
}
