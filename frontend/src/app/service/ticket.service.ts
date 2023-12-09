import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TicketForm } from '../dto/ticket-form';
import { Ticket } from '../entity/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  ticketURL = "http://localhost:8080/ticket";

  constructor(private httpClient: HttpClient) { }
  
  public findAll(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.ticketURL)
  }

  public getByUserId(id: number): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.ticketURL + '/by-user/' + id)
  }

  public create(ticketForm: TicketForm): Observable<any> {
    return this.httpClient.post<any>(this.ticketURL, ticketForm)
  }
}