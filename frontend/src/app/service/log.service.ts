import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../entity/log';
import { CreateLog } from '../dto/create-log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  URL = "http://localhost:8080/log";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Log[]> {
    return this.httpClient.get<Log[]>(this.URL);
  }

  public create(createLog: CreateLog): Observable<Log> {
    return this.httpClient.post<Log>(this.URL, createLog);
  }
}
