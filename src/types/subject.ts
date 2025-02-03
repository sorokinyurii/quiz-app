export interface Question {
  question: string,
  options: string[],
  answer: string
}

export interface Subject {
  name: string,
  image: string,
  questions: Question[]
}