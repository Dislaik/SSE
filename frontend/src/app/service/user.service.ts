import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from '../dto/register-user';
import { UpdateUser } from '../dto/update-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.URL);
  }

  public create(registerUser: RegisterUser): Observable<User> {
    return this.httpClient.post<User>(this.URL, registerUser);
  }

  public update(id: number, updateUser: UpdateUser): Observable<User> {
    return this.httpClient.put<User>(this.URL + '/by-id/' + id, updateUser);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + '/by-id/' + id);
  }
}
