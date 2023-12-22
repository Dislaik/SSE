import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Ticket } from '../entity/ticket';
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  role: string;
  page: string;
  title: string;
  allPages: string;
  firstName: string;
  lastName: string;

  tickets: Ticket[];

  lastTickets: Ticket[];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    document.body.style.marginLeft = '280px'

    if (this.tokenService.getToken()) {
      const tokenData = jwtDecode(this.tokenService.getToken())
      this.role = tokenData['role'][0].authority;
      this.page = "home";
      this.title = "Inicio";
      this.firstName = tokenData["first_name"];
      this.lastName = tokenData["last_name"];

      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: this.title, url: '/home'}
      };
      this.allPages = JSON.stringify(pages);

      if (this.role == 'admin' || this.role == 'superadmin') {
        this.ticketService.getAll().subscribe(
          data => {
            this.tickets = data;
            
            this.tickets.forEach(element => {
              element['date'] = this.formatDate(new Date(element.createdAt));
            });
  
            this.lastTickets = this.tickets.slice(-5).reverse();
          },
          err => {
            console.log(err.error)
          }
        );
      } else {
        this.ticketService.getByUserId(tokenData["id"]).subscribe(
          data => {
            this.tickets = data;
            
            this.tickets.forEach(element => {
              element['date'] = this.formatDate(new Date(element.createdAt));
            });
  
            this.lastTickets = this.tickets.slice(-5).reverse();
            
          },
          err => {
            console.log(err.error)
          }
        );
      }

    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnTicketDetails(ticket): void {
    console.log(ticket.value.id);
    this.router.navigate(['/ticket', ticket.value.id]);
  }

  formatDate(fecha: Date): string {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const año = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
  
    const diaFormateado = dia < 10 ? `0${dia}` : dia.toString();
    const mesFormateado = mes < 10 ? `0${mes}` : mes.toString();
    const horasFormateadas = horas < 10 ? `0${horas}` : horas.toString();
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos.toString();

    const fechaFormateada = `${diaFormateado}/${mesFormateado}/${año} ${horasFormateadas}:${minutosFormateados}`;
  
    return fechaFormateada;
  }
}
