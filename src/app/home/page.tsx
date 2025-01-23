'use client'
import CardComponent from '@/components/Card'
import Header from '@/components/Header'
import { ProgressBar } from '@/components/ProgressBar'
import 'react-circular-progressbar/dist/styles.css'
import { useState } from 'react'
import QuizCard from '@/components/QuizCard/page'
import { Roboto } from 'next/font/google'
import { Inter } from 'next/font/google'
import { Button } from '@/components/ui/button'
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})
const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
})
export default function Home() {
  const [subjects, setSubjects] = useState([
    { name: 'Português', progress: 100 },
    { name: 'Matemática', progress: 80 },
    { name: 'História', progress: 70 },
    { name: 'Geografia', progress: 80 },
    { name: 'Educação física', progress: 90 },
    { name: 'Artes', progress: 100 },
    { name: 'Biologia', progress: 60 },
    { name: 'Química', progress: 30 },
    { name: 'Física', progress: 40 },
  ])

  const [latestQuizzes, setTests] = useState([
    { name: 'Biologia Celular - Organelas', grade: '7.0', average: 7.5 },
    { name: 'Biologia Celular - Organelas', grade: '7.0', average: 7.5 },
    { name: 'Biologia Celular - Organelas', grade: '7.0', average: 7.5 },
    { name: 'Biologia Celular - Organelas', grade: '7.0', average: 7.5 },
  ])
  const [pending, setQuestions] = useState([
    {
      title: 'Biologia Celular - Organelas',
      description: 'Disciplina: Biologia | Professor João',
    },
    {
      title: 'Biologia Celular - Organelas',
      description: 'Disciplina: Biologia | Professor João',
    },
  ])
  return (
    <main className='sm:ml-14 h-screen'>
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 h-full'>
        <div className='p-6 shadow-md bg-header_background'>
          <Header />
        </div>
        <div className='p-6 shadow-md bg-quaternary_background'>
          <h2
            className={`${roboto.className} text-white text-[30px] font-bold mb-2 text-center pb-6`}
          >
            Últimos quizzes
          </h2>
          <div className='grid grid-cols-2 gap-6'>
            {latestQuizzes.map((quiz, index) => (
              <QuizCard
                key={index}
                title={quiz.name}
                rate={quiz.grade}
                customWidth='w-[433px]'
                description={`Média ${quiz.average}`}
              />
            ))}
            <Button
              className={`${roboto.className} text-[18px] col-span-2 p-6 w-full mt-7 bg-button_primary`}
              type='submit'
            >
              Ver todos
            </Button>
          </div>
        </div>
        <div className='bg-background p-6 shadow-md flex flex-col items-center'>
          <h2
            className={`${roboto.className} text-[30px] text-white font-bold mb-4 text-center`}
          >
            Desempenho por disciplina
          </h2>
          <div className='grid grid-cols-1 pb-6 w-full'>
            {subjects.map((subject, index) => (
              <div key={index} className='flex items-center justify-center'>
                <p className='text-gray-400 text-lg w-1/2 text-center'>
                  {subject.name}
                </p>
                <ProgressBar targetProgress={subject.progress} />
              </div>
            ))}
          </div>
        </div>
        <div className=' p-6 shadow-md bg-tertiary_background'>
          <h2
            className={`${roboto.className} text-white text-center pb-4 text-[30px] text-white text-xl font-bold mb-2 text-center'`}
          >
            Pendências
          </h2>
          <div className='grid grid-cols-1 gap-3'>
            {pending.map((task, index) => (
              <CardComponent
                key={index}
                title={task.title}
                description={task.description}
                customHeight='h-[100px]'
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
