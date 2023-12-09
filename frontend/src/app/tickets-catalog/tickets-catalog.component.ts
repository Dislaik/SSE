import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-tickets-catalog',
  templateUrl: './tickets-catalog.component.html',
  styleUrls: ['./tickets-catalog.component.css']
})
export class TicketsCatalogComponent implements OnInit{
  page: string;
  title: string;
  allPages: string;

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    document.body.style.marginLeft = '280px'
    
    if (this.tokenService.getToken()) {
      this.page = 'tickets-catalog';
      this.title = 'Catálogo de solicitudes'
      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/tickets-catalog'}
      };
      this.allPages = JSON.stringify(pages);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
