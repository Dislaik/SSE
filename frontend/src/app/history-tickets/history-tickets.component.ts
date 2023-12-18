import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { Ticket } from '../entity/ticket';
import { TicketService } from '../service/ticket.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-history-tickets',
  templateUrl: './history-tickets.component.html',
  styleUrls: ['./history-tickets.component.css']
})
export class HistoryTicketsComponent implements OnInit {
  page: string;
  title: string;
  allPages: string;

  tickets: Ticket[];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    document.body.style.marginLeft = '280px'

    if (this.tokenService.getToken()) {
      const tokenData = jwtDecode(this.tokenService.getToken())

      this.page = "history-tickets";
      this.title = "Historial de solicitudes";
      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/' + this.page}
      };
      this.allPages = JSON.stringify(pages);

      

      this.ticketService.getByUserId(tokenData["id"]).subscribe(
        data => {
          console.log(data)

          this.tickets = data;
          
        },
        err => {
  
        }
      );




    } else {
      this.router.navigate(['/login']);
    }
  }


  ngOnTicketDetails(ticket): void {
    console.log(ticket.value.id);
    this.router.navigate(['/ticket', ticket.value.id]);
  }
}
