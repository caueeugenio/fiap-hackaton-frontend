"use client"
import QuestionBox from '@/components/QuestionBox'
import { Button } from '@/components/ui/button'
import { Roboto } from 'next/font/google'
import { Inter } from 'next/font/google'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter, useParams, usePathname} from 'next/navigation'
import axios from 'axios'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { title } from 'process'



const roboto = Roboto({
  weight: ['400'],
  subsets: ['latin'],
})
const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
})

export default function Questionnaire() {
  const { id } = useParams() as { id: string };
  const pathName = usePathname()
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const cleanPath = pathName.split('/').slice(0, -1).join('/') || '/';
  const fetchQuizz = async (id: string) => {
    try{
    const response = await axios.get(`http://localhost:3001/questionnaire/${id}`)
    const questionnaire = response.data
    setTitle(questionnaire.title)
    setText(questionnaire.content)
    setQuizz(questionnaire.questions)
    console.log(response.data)
    } catch (error) {
      console.error('Error posting data to Ollama API:', error)
    }
  }
  
  useEffect(()=>{
    const storageUser = localStorage.getItem("user")
    if(id){
    fetchQuizz(id)
    }
    if (storageUser) {
      const parsedUser = JSON.parse(storageUser);
      
    if (parsedUser.role == "teacher") {
            setTeacher(true)
      }
        }
  },[id])

const router = useRouter()
const [quizz, setQuizz] = useState([])
const [teacher, setTeacher] = useState(false)
const [title, setTitle] = useState('')
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

    function handleDeleteQuizz(e: FormEvent) {
            e.preventDefault();
            axios.delete(`http://localhost:3001/questionnaire/${id}`)
            router.push('/teacher')
        }
    
    return (
        <div className='flex flex-row justify-center h-screen'>
            <div className="w-3/5 flex flex-col items-center  pt-10">
                <h1 className={`${inter.className} text-gray-100 text-[30px] mb-10`}>{title}</h1>
                <QuizText/>
            </div>
        
        
            <div className="w-2/5 flex flex-col justify-between items-center bg-header_background pt-10">
                <div className='w-4/5 flex flex-col items-center'> 
                  <h1 className={`${inter.className} center text-gray-100 text-[30px] mb-10`}>Questões</h1>
                  

                  {quizz.map((question, index) => (
                    <span className='mb-5' key={index}>
                   <QuestionBox  question_id={index + 1} question={question.question} answer={question.answer} page={cleanPath} />
                    </span>))}
                </div>
                <span className='w-full flex flex-col items-center'>
                  {teacher ? (
                    <>
                <Button
                className={`${roboto.className} text-[18px] col-span-2 p-6 w-full bg-button_primary  w-4/5 hover:bg-orange-500`}
                onClick={() => router.push(`/new-questionnaire/${id}`) }
                        >
                          Editar
                </Button>
                <Button
                className={`${roboto.className} text-[18px] col-span-2 p-6 w-full  bg-red-800 mt-4 mb-10 w-4/5 hover:bg-red-900`}
                onClick={() => setOpenDeleteDialog(true)}
                        >
                          Excluir
                </Button>
                  </>
                ):(
                <Button
                className={`${roboto.className} text-[18px] col-span-2 p-6 w-full bg-button_primary mb-10  w-4/5 hover:bg-orange-500`}
                        >
                          Enviar
                </Button>)}
                </span>
            </div>
            
            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogContent className="bg-white">
                    
                    <DialogHeader>
                        <DialogTitle>Excluir Quizz</DialogTitle>
                        <DialogDescription>Tem certeza que deseja excluir esse Quizz?</DialogDescription>
                    </DialogHeader>
                    
                    <p><strong>Nome do quizz: </strong>{title}</p>
                    
                   <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" variant="secondary">Fechar</Button>
                        </DialogClose>
                        <Button type="submit" className='bg-red-500' onClick={handleDeleteQuizz}>Excluir</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>      
            
             </div>
    )
}