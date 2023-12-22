import { Component, OnInit } from '@angular/core';
import { TicketAnswer } from '../entity/ticket-answer';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { TicketService } from '../service/ticket.service';
import { jwtDecode } from 'jwt-decode';
import { Ticket } from '../entity/ticket';
import { TicketAnswerService } from '../service/ticket-answer.service';
import { TicketAnswerForm } from '../dto/ticket-answer-form';
import { KeyValue } from '@angular/common';
import { UpdateTicketStatus } from '../dto/update-ticket-status';
import { NotifierService } from 'angular-notifier';
import { CreateLog } from '../dto/create-log';
import { LogService } from '../service/log.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit{
  private readonly notifier: NotifierService;
  pageId: number;
  page: string;
  title: string;
  allPages: string;
  role: string;

  //ticket: Ticket;
  author: string;
  createdAt: string;
  description: string;
  status: number;
  answers: TicketAnswer[];
  answer: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private ticketService: TicketService,
    private ticketAnswerService: TicketAnswerService,
    private logService: LogService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.activatedRoute.params.subscribe( params =>
      this.pageId = params['id']
    );
  }
  
  ngOnInit(): void {
    document.body.style.marginLeft = '280px'

    if (this.tokenService.getToken()) {
      const tokenData = jwtDecode(this.tokenService.getToken())
      this.role = tokenData['role'][0].authority;
      this.answer = "";

      this.ticketService.getById(this.pageId).subscribe(
        data => {
          //this.ticket = data;
          this.title = data.title;
          this.author = data.user['firstName'] + ' ' + data.user['lastName'];
          this.createdAt = this.formatDate(new Date(data.createdAt))
          this.description = data.description;
          this.status = data.status.id;
          //this.ticket['date'] = this.formatDate(new Date(this.ticket.createdAt))
          
        },
        err => {
          console.log(err.error)
        }
      );

      this.page = "ticket/"+ this.pageId;
      const pages: { [i: number]: { page: string; url: string } } = {
        1: {page: 'Inicio', url: '/home'},
        2: {page: 'Solicitudes', url: '/tickets'},
        3: {page: 'Solicitud #' + this.pageId, url: '/' + this.page}
      };
      this.allPages = JSON.stringify(pages);

      this.ticketAnswerService.getByTicketId(this.pageId).subscribe(
        data => {
          console.log(data)
          this.answers = data;

          this.answers.forEach(element => {
            element['date'] = this.formatDate(new Date(element.createdAt))
          });

          console.log(this.answers)

          //this.answers.sort(this.compararPorFecha);
        },
        err => {

        }
      )
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnSubmit(): void {
    const tokenData = jwtDecode(this.tokenService.getToken())    
    let username = tokenData["username"];

    let ticketAnswerForm = new TicketAnswerForm(this.answer, username, this.pageId);
    this.ticketAnswerService.create(ticketAnswerForm).subscribe(
      data => {
        //this.notifier.notify('success', "La solicitud se ha creado con exito!");

        this.answer = "";
        data['date'] = this.formatDate(new Date(data.createdAt))
        this.answers.push(data)

        this.logService.create(new CreateLog("Se envio una respuesta en la solicitud " + this.pageId, 1)).subscribe(
          data => {
            console.log(data)
          },
          err => {

          }
        );
      },
      err => {
        //this.notifier.notify('error', err.error);
      }
    )
  }

  ngOnTicketSolved(): void {
    const solvedId = 3;
    const status = new UpdateTicketStatus(solvedId);

    this.ticketService.setStatus(this.pageId, status).subscribe(
      data => {
        this.status = solvedId;
        this.notifier.notify('success', "La solicitud cambio de estado con exito!");

        this.logService.create(new CreateLog("La solicitud " + this.pageId + " fue resuelta", 2)).subscribe(
          data => {
            console.log(data)
          },
          err => {

          }
        );
      },
      err => {
        console.log(err.error)
      }
    );
  };

  ngOnTicketClosed(): void {
    const solvedId = 2;
    const status = new UpdateTicketStatus(solvedId);

    this.ticketService.setStatus(this.pageId, status).subscribe(
      data => {
        this.status = solvedId;
        this.notifier.notify('success', "La solicitud cambio de estado con exito!");

        this.logService.create(new CreateLog("La solicitud " + this.pageId + " fue cerrada", 2)).subscribe(
          data => {
            console.log(data)
          },
          err => {

          }
        );
      },
      err => {
        console.log(err.error)
      }
    );
  };

  ngOnTicketDelete(): void {
    this.ticketService.delete(this.pageId).subscribe(
      data => {
        this.notifier.notify('success', "La solicitud fue eliminada con exito!");
        this.router.navigate(['/tickets']);

        this.logService.create(new CreateLog("La solicitud " + this.pageId + " fue eliminada", 3)).subscribe(
          data => {
            console.log(data)
          },
          err => {

          }
        );
      },
      err => {
        console.log(err.error)
      }
    );
  }

  ngOnTicketOpen(): void {
    const solvedId = 1;
    const status = new UpdateTicketStatus(solvedId);

    this.ticketService.setStatus(this.pageId, status).subscribe(
      data => {
        this.status = solvedId;
        this.notifier.notify('success', "La solicitud cambio de estado con exito!");

        this.logService.create(new CreateLog("La solicitud " + this.pageId + " fue abierta", 2)).subscribe(
          data => {
            console.log(data)
          },
          err => {

          }
        );
      },
      err => {
        console.log(err.error)
      }
    );
  };

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

  compararPorFecha(a: KeyValue<number,TicketAnswer>, b: KeyValue<number,TicketAnswer>): number {
    return new Date(a['createdAt']).getTime() - new Date(b['createdAt']).getTime();
  }
}
