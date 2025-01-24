import { Pencil, CircleX } from 'lucide-react';

interface Props {
    question_id: number,
    question: string,
    answer: boolean
}

export default function QuestionBox({question_id, question, answer}: Props) {
    return (
        <div key={question_id} className="flex flex-col">
            <div className="flex gap-4">
                <div className="bg-[#CD6700] text-primary-foreground p-2 flex w-full rounded-sm justify-between items-center">
                    <div className="flex-1">{question_id}. {question}</div>
                    <div className="flex p-2 gap-2">
                        <Pencil className="h-5 w-5  text-white text-sm" />
                        <CircleX className="h-5 w-5  text-white text-sm" />
                    </div>
                </div>
                <div className="gap-2 flex align-center justify-center">
                    {
                        answer ? (
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
                    }
                </div>
                
            </div>
            
        </div>
    )
}