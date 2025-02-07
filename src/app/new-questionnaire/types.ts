export interface Subjects {
  id: string
  label: string
}

export interface Grades {
  id: string
  label: string
}

export interface Questionnaire {
    id?: string
    title: string
    yearId: string,
    gradeId: string,
    subjectId: string,
    authorId: number,
    content: string,
    questionsAmount: number,
    classes: string[],
    questions: Question[]
}

export interface Question {
    id: string
    question: string
    answer: boolean
}

export interface Classes { 
    id: string
}