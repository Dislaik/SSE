import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { TicketService } from '../service/ticket.service';
import { jwtDecode } from 'jwt-decode';
import { Ticket } from '../entity/ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{
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

      this.page = "tickets";
      this.title = "Solicitudes";
      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/' + this.page}
      };
      this.allPages = JSON.stringify(pages);

      

      this.ticketService.getAll().subscribe(
        data => {
          this.tickets = data;
          
          this.tickets.forEach(element => {
            element['date'] = this.formatDate(new Date(element.createdAt));
          });
          
        },
        err => {
  
        }
      );




    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnTicketDetails(ticket): void {
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
  
    // Formatear la fecha como "dd/mm/aaaa hh:mm"
    const fechaFormateada = `${diaFormateado}/${mesFormateado}/${año} ${horasFormateadas}:${minutosFormateados}`;
  
    return fechaFormateada;
  }
}
