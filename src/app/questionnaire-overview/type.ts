export interface AnswersCount {
  question_id: number
  question_text: string
  correct_answer: boolean
  true_count: string
  false_count: string
}

export interface Question {
  number: number
  question: string
  percentage: number
}

export interface Stats {
  totalQuestions: number
  totalStudents: number
  avgScore: number
  highAccuracy: number[]
  lowAccuracy: number[]
}