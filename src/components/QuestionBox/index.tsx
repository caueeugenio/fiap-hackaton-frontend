import { Pencil, CircleX } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast'; 


interface Props {
    question_id: number,
    question: string,
    answer: boolean,
    page: string,
    deletedQuestions: ((questions: any) => any);
}

export default function QuestionBox({question_id, question, answer, page, deletedQuestions}: Props) {
    
    useEffect(()=>{
        const storageUser = localStorage.getItem("user")
        if (storageUser) {
          const parsedUser = JSON.parse(storageUser);
      
          if (parsedUser.role == "teacher") {
            setTeacher(true)
          }
        }
      },[])

    
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [teacher, setTeacher] = useState(false)
    const [newQuestionContent, setNewQuestionContent] = useState<string>('');
    const [newQuestionAnswer, setNewQuestionAnswer] = useState<boolean | null>(null);
    const [studentAnswer, setStudentAnswer] = useState<boolean>(false)
    const { toast } = useToast();
    
    function handleQuestionUpdate(e: FormEvent) {
        e.preventDefault();
        if (newQuestionContent === "" || newQuestionAnswer === null) {
            toast({
                title: "Erro ao submeter",
                description: "Preencha todos os campos antes de salvar.",
                variant: "destructive"
            });            
            return 
        }
        console.log({ question_id, newQuestionContent, newQuestionAnswer })
        setOpenEditDialog(false);
        
    }
    
    function handleDeleteQuestion(e: FormEvent) {
        e.preventDefault();
        deletedQuestions((questions:any) => {
            const temp = questions;
            const questionExcluded = questions.find((q: any) => q.question_id !== question_id);
            return temp.filter((q: any) => q !== questionExcluded);
        });
    }
    
    
    return (
        <div key={question_id} className="flex flex-col">
            <div className="flex items-center">
                <div className="bg-[#CD6700] mr-10 text-primary-foreground p-2 flex rounded-sm items-center">
                    <div className="flex-1 w-full">{question_id}. {question}</div>
                    <div className="flex p-2 gap-2">
                    {page !== '/questionnaire' && <div className="flex p-2 gap-2">
                    {/* <Pencil className="h-5 w-5  text-white text-sm cursor-pointer" onClick={() => setOpenEditDialog(true)} /> */}
                    <CircleX className="h-5 w-5  text-white text-sm cursor-pointer" onClick={() => setOpenDeleteDialog(true)} />
                                </div>}
                    </div>
                </div>
                <div className="gap-2 flex max-h-14">
                    {
                      !teacher ? (
                        <>
                            <span onClick={()=>{
                                setStudentAnswer(true)}
                                } 
                                className={`${studentAnswer ? (
                                "bg-[#CD6700] p-4 text-primary-foreground rounded-sm cursor-pointer"
                            ) : (
                                "bg-white p-4 rounded-sm cursor-pointer")
                                }`}>V</span>
                            <span onClick={()=>{
                                setStudentAnswer(false)}
                                } 
                                className={`${studentAnswer ? (
                                    "bg-white p-4 rounded-sm cursor-pointer"
                                 ) : (
                                    "bg-[#CD6700] p-4 text-primary-foreground rounded-sm cursor-pointer")
                                    }`}>F</span>
                        </>
                      ):(answer ? (
                        <>
                            <span className="bg-[#CD6700] p-4 text-primary-foreground rounded-sm">V</span>
                            <span className="bg-white p-4 rounded-sm">F</span>
                        </>
                        ):(
                        <>
                            <span className="bg-white p-4 rounded-sm">V</span>
                            <span className="bg-[#CD6700] p-4 text-primary-foreground rounded-sm">F</span>
                        </>
                     ) 
                    )
                    }
                </div>
                
            </div>
            
            <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogContent className="bg-white">
                    
                    <DialogHeader>
                        <DialogTitle>Editar Questão</DialogTitle>
                        <DialogDescription>Edite o enunciado da questão e a resposta abaixo:</DialogDescription>
                    </DialogHeader>
                    
                    <p><strong>ID: </strong>{question_id}</p>
                    <p><strong>Pergunta: </strong>{question}</p>
                    <p><strong>Resposta: </strong>{answer ? "Verdadeiro" : "Falso"}</p>
                    
                    <input 
                        type="text" 
                        name="updateQuestion" 
                        value={newQuestionContent} 
                        placeholder="Digite a nova questão"
                        className="flex-1 p-2 rounded-sm bg-slate-100"
                        onChange={(e) => setNewQuestionContent(e.target.value)} 
                    />

                    <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="verdadeiro" onClick={() => setNewQuestionAnswer(true)} />
                            <Label htmlFor="verdadeiro">Verdadeiro</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="falso" onClick={() => setNewQuestionAnswer(false)} />
                            <Label htmlFor="falso">Falso</Label>
                        </div>
                    </RadioGroup>

                   <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" variant="secondary">Fechar</Button>
                        </DialogClose>
                        <Button type="submit" className='bg-button_primary' onClick={handleQuestionUpdate}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogContent className="bg-white">
                    
                    <DialogHeader>
                        <DialogTitle>Excluir Questão</DialogTitle>
                        <DialogDescription>Tem certeza que deseja excluir essa questão?</DialogDescription>
                    </DialogHeader>
                    
                    <p><strong>ID: </strong>{question_id}</p>
                    <p><strong>Pergunta: </strong>{question}</p>
                    <p><strong>Resposta: </strong>{answer ? "Verdadeiro" : "Falso"}</p>
                    
                   <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" variant="secondary">Fechar</Button>
                        </DialogClose>
                        <Button type="submit" className='bg-red-500' onClick={handleDeleteQuestion}>Excluir</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            
        </div>
    )
}