import { Role } from "../entity/role";

export class RegisterUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: number;

  constructor(username: string, password: string, email: string, firstName: string, lastName: string, role: number) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
