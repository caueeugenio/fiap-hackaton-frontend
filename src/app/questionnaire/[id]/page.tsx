"use client"
import QuestionBox from '@/components/QuestionBox'
import { Button } from '@/components/ui/button'
import { Roboto } from 'next/font/google'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useRouter, useParams} from 'next/navigation'
import axios from 'axios'



const roboto = Roboto({
  weight: ['400'],
  subsets: ['latin'],
})
const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
})

export default function Questionnaire() {
  const { id } = useParams() as { id: string };;
  
  const fetchQuizz = async (id: string) => {
    try{
    const response = await axios.get(`http://localhost:3001/questionnaire/${id}`)
    const questionnaire = response.data
    setText(questionnaire.content)
    setQuizz(questionnaire.questions)
    console.log(response.data)
    } catch (error) {
      console.error('Error posting data to Ollama API:', error)
    }
  }
  
  useEffect(()=>{
    if(id){
    fetchQuizz(id)
    }
  },[id])

const router = useRouter()
const [quizz, setQuizz] = useState([])
const [text, setText] = useState('')

   
     const QuizText = () => {
       const paragraphs = text.split('\n') 
       return (
        <div className="w-2/3">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={`${inter.className} text-gray-50 text-[18px] mt-5`}>
              {paragraph}
            </p>
          ))}
        </div>
      );
    }
    
    return (
        <div className='flex flex-row justify-center h-screen'>
            <div className="w-3/5 flex flex-col items-center  pt-10">
                <h1 className={`${inter.className} text-gray-100 text-[30px] mb-10`}>Biologia Celular - Organelas</h1>
                <QuizText/>
            </div>
        
        
            <div className="w-2/5 flex flex-col justify-between items-center bg-header_background pt-10">
                <div className='w-4/5 flex flex-col items-center'> 
                  <h1 className={`${inter.className} center text-gray-100 text-[30px] mb-10`}>Questões</h1>
                  

                  {quizz.map((question, index) => (
                    <span className='mb-5' key={index}>
                   <QuestionBox  question_id={index + 1} question={question.question} answer={question.answer} />
                    </span>))}
                </div>
                <span className='w-full flex flex-col items-center'>
                <Button
                className={`${roboto.className} text-[18px] col-span-2 p-6 w-full bg-button_primary  w-4/5 hover:bg-orange-500`}
                onClick={() => router.push('/new-questionnaire') }
                        >
                          Editar
                </Button>
                <Button
                className={`${roboto.className} text-[18px] col-span-2 p-6 w-full  bg-red-800 mt-4 mb-10 w-4/5 hover:bg-red-900`}
                type='submit'
                        >
                          Excluir
                </Button>
                </span>
            </div>
            
             </div>
    )
}