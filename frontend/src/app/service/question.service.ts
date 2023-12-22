import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../entity/question';
import { CreateQuestion } from '../dto/create-question';
import { UpdateQuestion } from '../dto/update-question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  URL = "http://localhost:8080/question";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.URL);
  }

  public create(createQuestion: CreateQuestion): Observable<Question> {
    return this.httpClient.post<Question>(this.URL, createQuestion);
  }

  public update(id: number, updateQuestion: UpdateQuestion): Observable<Question> {
    return this.httpClient.put<Question>(this.URL + '/by-id/' + id, updateQuestion);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL + '/by-id/' + id);
  }

}
