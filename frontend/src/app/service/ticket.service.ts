import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TicketForm } from '../dto/ticket-form';
import { Ticket } from '../entity/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  URL = "http://localhost:8080/ticket";

  constructor(private httpClient: HttpClient) { }
  
  public getAll(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.URL)
  }

  public getById(id: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(this.URL + '/by-id/' + id)
  }

  public getByUserId(id: number): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.URL + '/by-user-id/' + id)
  }

  public create(ticketForm: TicketForm): Observable<Ticket> {
    return this.httpClient.post<Ticket>(this.URL, ticketForm)
  }
}