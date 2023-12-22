import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../entity/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  URL = "http://localhost:8080/role";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.URL);
  }
}
