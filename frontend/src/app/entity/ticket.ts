import { TicketStatus } from "./ticket-status";
import { TicketSubcategory } from "./ticket-subcategory";
import { User } from "./user";

export class Ticket {
  id: number;
  title: string;
  description: string;
  user: User;
  status: TicketStatus;
  subcategory: TicketSubcategory;
  createdAt: Date;
  updatedAt: Date;

  constructor(title: string, description: string, user: User, status: TicketStatus, subcategory: TicketSubcategory, createdAt: Date, updatedAt: Date) {
    this.title = title;
    this.description = description;
    this.user = user;
    this.status = status;
    this.subcategory = subcategory;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
