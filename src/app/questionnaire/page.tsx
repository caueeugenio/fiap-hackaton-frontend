"use client"
import QuestionBox from '@/components/QuestionBox'
import { Button } from '@/components/ui/button'
import { Roboto } from 'next/font/google'
import { Inter } from 'next/font/google'
import { useState } from 'react'




const roboto = Roboto({
  weight: ['400'],
  subsets: ['latin'],
})
const inter = Inter({
  weight: ['400'],
  subsets: ['latin'],
})

export default function Questionnaire() {

const [quizz, setQuizz] = useState([
    { question_id: 1, question: 'A biologia celular é o ramo da biologia que estuda os órgãos humanos.'},
    { question_id: 2, question: 'A biologia celular abrange tantos as células procarióticas como eucarióticas. ...Lorem ipsum odor amet, consectetuer adipiscing elit. Metus velit quisque ante convallis ridiculus. Nostra nibh risus fermentum posuere magna ipsum maximus nostra.'},
    { question_id: 3, question: 'Os ribossomos são responsáveis pela síntese de proteína na célula.'},
  ])



    const text = `Lorem ipsum odor amet, consectetuer adipiscing elit. Metus velit quisque ante convallis ridiculus. Nostra nibh risus fermentum posuere magna ipsum maximus nostra. Cubilia fusce nam diam ridiculus cras est eleifend dictumst praesent. Erat cras duis volutpat sociosqu morbi. Varius libero suscipit himenaeos nascetur taciti mus vestibulum mi. Nascetur faucibus mi mauris vestibulum libero cubilia.
    Tempus accumsan risus sollicitudin augue donec. Risus cubilia vulputate nisl orci non efficitur pretium. Quisque dictum penatibus nisl porttitor nisl faucibus ad. Non pharetra congue consectetur, fusce cursus blandit habitant fusce. Fames eu scelerisque lobortis velit turpis porttitor parturient dolor leo. Facilisis euismod lectus scelerisque mi adipiscing. Faucibus ultrices magnis; cursus maximus platea fames torquent mattis. Tempor ex hac ad a ullamcorper massa etiam consectetur. Mauris nunc commodo etiam bibendum consequat eros neque. Eu urna nisi aliquam lorem amet platea varius.
    Dignissim ante nulla elit vehicula molestie netus taciti maecenas. Ut luctus mauris dictum curabitur sapien facilisi vitae id. Suspendisse interdum lacus per nec sed metus imperdiet neque. Sapien fermentum dui taciti tempor pharetra vestibulum dolor tortor maximus. Potenti ligula taciti a commodo vel quisque blandit egestas sem. Placerat leo tortor in dignissim in id. Congue ultrices id montes ultrices cras. Finibus fringilla nascetur eget placerat diam ante. Ultricies nibh bibendum est ridiculus sapien quam donec neque?
    `

   
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
                   <QuestionBox  question_id={question.question_id} question={question.question} />
                    </span>))}
                </div>
                <Button
                className={`${roboto.className} text-[18px] col-span-2 p-6 w-full mt-7 bg-button_primary mb-10 w-4/5 hover:bg-orange-500`}
                type='submit'
                        >
                          Finalizar quizz
                </Button>
            </div>
            
             </div>
    )
}