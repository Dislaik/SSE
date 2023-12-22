import { QuestionAnswer } from "./question-answer";

export class Question {
  id: number;
  question: string;
  answer: QuestionAnswer;

  constructor(question: string, answer: QuestionAnswer) {
    this.question = question;
    this.answer = answer;
  }
}
