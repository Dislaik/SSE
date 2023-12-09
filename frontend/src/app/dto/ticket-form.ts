import { TicketCategory } from "../entity/ticket-category";
import { TicketSubcategory } from "../entity/ticket-subcategory";

export class TicketForm {
  username: string;
  title: string;
  description: string;
  category: number;
  subcategory: number;


  constructor(username: string, title: string, description: string, category: number, subcategory: number) {
    this.username = username;
    this.title = title;
    this.description = description;
    this.category = category;
    this.subcategory = subcategory;
  }
}
