'use client'
import QuizCard from '@/components/QuizCard/page'
import { useState } from 'react'

export default function MyQuizzesPage() {
  const [quizzes, setQuizzes] = useState([
    { title: 'Biologia Celular - Organelas', average: 7.5 },
    { title: 'Biologia Celular - Organelas', average: 7.5 },
    { title: 'Biologia Celular - Organelas', average: 7.5 },
    { title: 'Biologia Celular - Organelas', average: 7.5 },
    { title: 'Biologia Celular - Organelas', average: 7.5 },
    { title: 'Biologia Celular - Organelas', average: 7.5 },
  ])
  const subject = 'Biologia'

  return (
    <div className='bg-tertiary_background flex items-center justify-center min-h-screen  '>
      <div className='flex flex-col items-center'>
        <h1 className='text-white text-4xl font-bold text-center pb-4'>
          Meus Quizzes
        </h1>
        <h2 className='text-left text-white pb-4 text-lg'>{subject}</h2>
        <div className='grid lg:grid-cols-3 gap-4'>
          {quizzes.map((quiz, index) => (
            <QuizCard key={index} title={quiz.title} content={quiz.average} />
          ))}
        </div>
      </div>
    </div>
  )
}
