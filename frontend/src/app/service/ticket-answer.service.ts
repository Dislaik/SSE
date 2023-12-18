import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketAnswer } from '../entity/ticket-answer';
import { Observable } from 'rxjs';
import { TicketAnswerForm } from '../dto/ticket-answer-form';

@Injectable({
  providedIn: 'root'
})
export class TicketAnswerService {

  URL = "http://localhost:8080/ticket/answer";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<TicketAnswer[]> {
    return this.httpClient.get<TicketAnswer[]>(this.URL)
  }

  public getByTicketId(id: number): Observable<TicketAnswer[]> {
    return this.httpClient.get<TicketAnswer[]>(this.URL + '/by-ticket-id/' + id)
  }

  public create(ticketAnswerForm: TicketAnswerForm): Observable<TicketAnswer> {
    return this.httpClient.post<TicketAnswer>(this.URL, ticketAnswerForm)
  }
}
