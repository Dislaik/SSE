import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { Ticket } from '../entity/ticket';
import { TicketService } from '../service/ticket.service';
import { jwtDecode } from 'jwt-decode';
import { TicketAnswerService } from '../service/ticket-answer.service';
import { TicketAnswer } from '../entity/ticket-answer';

@Component({
  selector: 'app-history-tickets',
  templateUrl: './history-tickets.component.html',
  styleUrls: ['./history-tickets.component.css']
})
export class HistoryTicketsComponent implements OnInit {
  page: string;
  title: string;
  allPages: string;
  role: string;
  userId: number;

  tickets: Ticket[];
  ticketsFromAnswer: any[];

  pagination: number;
  paginationShowTickets: Ticket[];
  paginationLengh: number;
  paginationMax: number;
  paginationList: number[];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private ticketService: TicketService,
    private ticketAnswerService: TicketAnswerService
  ) {}

  ngOnInit(): void {
    document.body.style.marginLeft = '280px'

    if (this.tokenService.getToken()) {
      const tokenData = jwtDecode(this.tokenService.getToken());
      this.role = tokenData['role'][0].authority;
      this.userId = tokenData["id"];
      this.pagination = 1;

      this.page = "history-tickets";
      this.title = "Historial de solicitudes";
      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: this.title, url: '/' + this.page}
      };
      this.allPages = JSON.stringify(pages);

      
      if (this.role == 'admin') {
        this.ticketAnswerService.getByUserId(this.userId).subscribe(
          data => {
            this.ticketsFromAnswer = data;

            //DISLAIK - Ver si se puede arreglar el tema de historial para ver lso ticket que personal administrativo a respondido, si no, eliminar


            //console.log(this.tickets[0]['ticket']);

            //this.mostrarPagina(this.tickets, this.pagination, 10)
            //this.paginationMax = this.obtenerPaginasTotales(this.tickets, 10)
            //this.paginationList = this.createRange(this.paginationMax);
          },
          err => {

          }
        )

      } else {
        this.ticketService.getByUserId(this.userId).subscribe(
          data => {
            this.tickets = data.reverse();
            
            this.tickets.forEach(element => {
              element['date'] = this.formatDate(new Date(element.createdAt));
            });
  
            this.mostrarPagina(this.tickets, this.pagination, 10)
            this.paginationMax = this.obtenerPaginasTotales(this.tickets, 10)
            this.paginationList = this.createRange(this.paginationMax);
            
          },
          err => {
    
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

  ngOnPaginationNext(): void {
    this.pagination += 1;

    this.mostrarPagina(this.tickets, this.pagination, 10)
  }

  ngOnPaginationBack(): void {
    this.pagination -= 1;

    this.mostrarPagina(this.tickets, this.pagination, 10)
  }

  ngOnPaginationItem(index: number): void {
    this.mostrarPagina(this.tickets, index, 10)
    this.pagination = index;
    console.log(index);
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

  mostrarPagina(list: Ticket[], page: number, elementByPage: number): void {
    const start = (page - 1) * elementByPage;
    const end = start + elementByPage;
    
    this.paginationShowTickets = list.slice(start, end);
    this.paginationLengh = this.paginationShowTickets.length;
  }

  obtenerPaginasTotales(lista: Ticket[], elementosPorPagina: number): number {
    return Math.ceil(lista.length / elementosPorPagina);
  }

  createRange(number){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
