import { Ticket } from "./ticket";
import { User } from "./user";

export class TicketAnswer {
  id: number;
  answer: string;
  ticket: Ticket;
  user: User;
  createdAt: Date;

  constructor(answer: string, ticket: Ticket, user: User, createdAt: Date) {
    this.answer = answer;
    this.ticket = ticket;
    this.user = user;
    this.createdAt = createdAt;
  }
}
