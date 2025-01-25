'use client'

import HeaderDetails from "@/components/HeaderDetails"
import InputText from "@/components/InputText"
import QuestionBox from "@/components/QuestionBox";
import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { useState } from "react";

// TODO: Handle errors in forms

const questionsMock = [
    {"id": 1, "question": "A biologia celular é o ramo da biologia que estuda os órgãos humanos.", "answer": false},
    {"id": 2, "question": "A biologia celular abrange tanto as celular procarióticas como eucarióticas.", "answer": true},
    {"id": 3, "question": "Os ribossomos são responsáveis pela síntese de proteína na célula.", "answer": true},
    {"id": 4, "question": "Os ribossomos são responsáveis pela síntese de proteína na célula.", "answer": true},
    {"id": 5, "question": "Os ribossomos são responsáveis pela síntese de proteína na célula.", "answer": true},
    {"id": 6, "question": "Os ribossomos são responsáveis pela síntese de proteína na célula.", "answer": true},
    {"id": 7, "question": "Os ribossomos são responsáveis pela síntese de proteína na célula.", "answer": true},
    {"id": 8, "question": "Os ribossomos são responsáveis pela síntese de proteína na célula.", "answer": true},
    {"id": 9, "question": "Os ribossomos são responsáveis pela síntese de proteína na célula.", "answer": true},
    {"id": 10, "question": "Os ribossomos são responsáveis pela síntese de proteína na célula.", "answer": true},
]

const topicsAvailableMock = [
    {"id": 1, "topic": "Biologia"},
    {"id": 2, "topic": "Matemática"},
    {"id": 3, "topic": "Geografia"}
]

const studentClassesMock = [
    {"id": 1, "studentYear": 5, "studentClass": "A"},
    {"id": 2, "studentYear": 5, "studentClass": "B"},
    {"id": 3, "studentYear": 5, "studentClass": "C"}
]

export default function NewQuestionnaire() {
    
    const [quizName, setQuizName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [questionsCount, setQuestionsCount] = useState<number>(0);
    const [showQuestions, setShowQuestions] = useState<boolean>(false);
    
    const [questions, setQuestions] = useState(questionsMock);
    
    const [topics, setTopics] = useState(topicsAvailableMock);
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [studentClasses, setStudentClasses] = useState(studentClassesMock);
    const [selectedStudentClass, setSelectedStudentClass] = useState<string>('');
    
    const { toast } = useToast();
    
    function handleGenerateQuestions(e: React.FormEvent) {
        e.preventDefault();
        if (questionsCount === 0 || quizName === "" || content === "") {
            toast({
                title: "Erro ao submeter",
                description: "Preencha todos os campos antes de gerar as questões.",
                variant: "destructive"
            });
            return
        }
        console.log({questionsCount, quizName, content});
        setShowQuestions(true);
    }
    
    function handleQuestionnaireSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (selectedTopic === "" || selectedStudentClass === "") {
            toast({
                title: "Erro ao submeter",
                description: "Selecione a Disciplina e a Classe dos estudantes.",
                variant: "destructive"
            });
            return
        }
        console.log("Questionário submetido!");
        console.log({selectedTopic, selectedStudentClass, questions});
        setSelectedTopic("");
        setSelectedStudentClass("");
        setQuestionsCount(0);
        setQuizName("");
        setContent("");
        setShowQuestions(false);
        
    }
    
    
    return (
        <main className="bg-tertiary_background flex flex-col items-center min-h-screen">
            <HeaderDetails title="Editar / Novo Questionário" />
            <form className="flex flex-col w-[800] my-5 gap-4">
                <InputText 
                    fieldName={"quiz_name"} 
                    content={"Nome do Questionário"} 
                    placeholder={""} 
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                />
                <TextArea 
                    fieldName={"content_class"} 
                    content={"Cole abaixo o conteúdo da aula que será a base para as questões:"} 
                    placeholder={""} 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex justify-end gap-4 items-center">
                    <p className="text-white">Número de Questões:</p>
                    <Select onValueChange={(val) => setQuestionsCount(parseInt(val))}>
                        <SelectTrigger className="bg-white border-none w-[120] align-center">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                            <SelectItem value="35">35</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                            <SelectItem value="45">45</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className='w-[200] bg-button_primary' type='submit' onClick={handleGenerateQuestions}>Gerar Questões</Button>
                </div>
                {
                    showQuestions ? (
                        <>
                            <div className="flex flex-col py-4 gap-4">
                                {
                                    questions.map((question) => {
                                        return <QuestionBox key={question.id} question_id={question.id} question={question.question} answer={question.answer} />
                                    })
                                }
                            </div>
                            <div className="flex gap-4">
                                <Select onValueChange={(val) => setSelectedTopic(val)}>
                                    <SelectTrigger className="bg-white border-none w-[200] align-center">
                                        <SelectValue placeholder="Selecione a Disciplina" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            topics.map((topic) => {
                                                return (
                                                    <SelectItem value={topic.topic} key={topic.id}>{topic.topic}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={(val) => setSelectedStudentClass(val)}>
                                    <SelectTrigger className="bg-white border-none w-[200] align-center">
                                        <SelectValue placeholder="Selecione a Turma" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            studentClasses.map((studentClass) => {
                                                return (
                                                    <SelectItem 
                                                        value={studentClass.studentYear + "a Série " + studentClass.studentClass}
                                                        key={studentClass.id}>
                                                            {studentClass.studentYear}a Série {studentClass.studentClass}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className='bg-button_primary' type='submit' onClick={handleQuestionnaireSubmit}>Salvar Edição / Criar Questionário</Button>
                        </>
                    ) : null
                }
                
            </form>
            
            
            
        </main>
        
        

    )
}