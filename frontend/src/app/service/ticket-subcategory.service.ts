import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketSubcategory } from '../entity/ticket-subcategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketSubcategoryService {

  URL = "http://localhost:8080/ticket/category/subcategory";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<TicketSubcategory[]> {
    return this.httpClient.get<TicketSubcategory[]>(this.URL)
  }
}
