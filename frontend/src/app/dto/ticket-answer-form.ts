export class TicketAnswerForm {
  answer: string;
  username: string;
  ticketId: number;

  constructor(answer: string, username: string, ticketId: number) {
    this.answer = answer;
    this.username = username;
    this.ticketId = ticketId;
  }
}
