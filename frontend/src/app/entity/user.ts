export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  id_role: any;

  constructor(username: string, password: string, email: string, first_name: string, last_name: string, id_role: any) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.first_name = first_name;
      this.last_name = last_name;
      this.id_role = id_role;
  }
}
