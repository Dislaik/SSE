import { TicketCategory } from "./ticket-category";

export class TicketSubcategory {
  id: number;
  subcategory: string;
  category: TicketCategory;

  constructor(subcategory: string, category: TicketCategory) {
    this.subcategory = subcategory;
    this.category = category;
  }
}
