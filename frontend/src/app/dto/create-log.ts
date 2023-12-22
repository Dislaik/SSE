export class CreateLog {
  description: string;
  type: number;

  constructor(description: string, type: number) {
    this.description = description;
    this.type = type;
  }
}
