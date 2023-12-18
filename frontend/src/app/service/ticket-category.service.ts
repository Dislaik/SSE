import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketCategory } from '../entity/ticket-category';

@Injectable({
  providedIn: 'root'
})
export class TicketCategoryService {

  URL = "http://localhost:8080/ticket/category";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<TicketCategory[]> {
    return this.httpClient.get<TicketCategory[]>(this.URL)
  }
}
