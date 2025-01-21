'use client'
import CardComponent from '@/components/Card'
import Header from '@/components/Header'
import { ProgressBar } from '@/components/ProgressBar'
import 'react-circular-progressbar/dist/styles.css'
import { useState } from 'react'

export default function Home() {
  const [subjects, setSubjects] = useState([
    { name: 'Português', progress: 100 },
    { name: 'Matemática', progress: 80 },
    { name: 'História', progress: 60 },
    { name: 'Geografia', progress: 80 },
    { name: 'Educação física', progress: 90 },
    { name: 'Artes', progress: 100 },
    { name: 'Biologia', progress: 60 },
    { name: 'Química', progress: 60 },
    { name: 'Física', progress: 60 },
  ])

  const [tests, setTests] = useState([
    { name: 'Prova 1', grade: 7, average: 7.5 },
    { name: 'Prova 2', grade: 7, average: 7.5 },
    { name: 'Prova 3', grade: 7, average: 7.5 },
    { name: 'Prova 4', grade: 7, average: 7.5 },
  ])
  const [questions, setQuestions] = useState([
    { name: 'Questão 1', correctAnswers: 59 },
    { name: 'Questão 2', correctAnswers: 59 },
    { name: 'Questão 3', correctAnswers: 59 },
    { name: 'Questão 4', correctAnswers: 59 },
    { name: 'Questão 5', correctAnswers: 59 },
    { name: 'Questão 6', correctAnswers: 59 },
    { name: 'Questão 7', correctAnswers: 59 },
    { name: 'Questão 8', correctAnswers: 59 },
    { name: 'Questão 9', correctAnswers: 59 },
  ])
  return (
    <main className='sm:ml-14 h-screen'>
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 h-full'>
        <div className='p-6 shadow-md bg-header_background'>
          <Header />
        </div>
        <div className='p-6 shadow-md bg-quaternary_background'>
          <h2 className='text-white text-xl font-bold mb-2 text-center'>
            Overview Escolar
          </h2>
          <div className='grid grid-cols-2  gap-2'>
            {tests.map((test, index) => (
              <CardComponent
                key={index}
                title={test.name}
                description={`Nota ${test.grade} | Média ${test.average}`}
              />
            ))}
          </div>
        </div>
        <div className='bg-background p-6 shadow-md items-center w-full'>
          <h2 className='text-white text-xl font-bold mb-2 text-center'>
            Status por disciplina
          </h2>
          <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-4 lg:h-full sm:pb-6 lg:pb-0'>
            {subjects.map((subject, index) => (
              <div
                key={index}
                className='flex flex-col justify-center items-center'
              >
                <p className='text-gray-400 text-center text-lg'>
                  {subject.name}
                </p>
                <ProgressBar targetProgress={subject.progress} />
              </div>
            ))}
          </div>
        </div>
        <div className=' p-6 shadow-md bg-tertiary_background'>
          <h2 className='text-white text-xl font-bold mb-2 text-center'>
            Prova 1
          </h2>
          <div className='grid grid-cols-3  gap-2'>
            {questions.map((question, index) => (
              <CardComponent
                key={index}
                title={question.name}
                description={`${question.correctAnswers}% de acertos`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
